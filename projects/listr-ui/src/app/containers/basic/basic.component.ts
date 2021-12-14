import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { filter, map, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ListItem } from '../../models/list-item.model';
import { AppState } from '../../store/app-state.model';
import * as actions from '../../store/list.actions';
import { InterComponentService } from '../../services/inter-component.service';

@Component({
  selector: 'listr-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<boolean>();
  
  items$ = this.store.select(store => store.items.list);
  loading$ = this.store.select(store => store.items.loading);
  error$ = this.store.select(store => store.items.error);

  items: ListItem[];
  itemToAdd: ListItem = null;

  constructor(private store: Store<AppState>, 
              updates$: Actions,
              private service : InterComponentService) { 
    updates$.pipe(
      ofType(actions.AddItemSuccess),
      takeUntil(this.destroyed$)
   )
   .subscribe(() => {
    this.itemToAdd = null;
   });

  }
  
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {

    this.items$
      .pipe(
        filter(data => !!data),
        map(items => items.map(item => new ListItem(item.id,item.name,item.selected))
        )
      ).subscribe(array =>         
        this.items = array
      );

    this.store.dispatch(actions.LoadItems({loading:'loading'}));

  }

  reset(){
    this.service.command('reset');
  }

  saveItem(item: ListItem){
    this.store.dispatch(actions.EditItem({item: item}));
  }

  saveNewItem(item: ListItem){
    this.store.dispatch(actions.AddItem({item: item}));
  }

  deleteItem(item: ListItem){
    this.store.dispatch(actions.DeleteItem({id: item.id}));
  }

  cancelAdd(){
    this.itemToAdd = null;
  }

  showNewItem(){
    this.itemToAdd = new ListItem(null,'',false);
  }

}
