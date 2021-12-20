import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { filter, map} from 'rxjs/operators';
import { ListItem } from '../../models/list-item.model';
import { AppState } from '../../store/app-state.model';
import * as actions from '../../store/list.actions';
import { InterComponentService } from '../../services/inter-component.service';
import { AutoUnsubscribe } from '../../shared/modules/material/auto-unsubscribe';

@AutoUnsubscribe
@Component({
  selector: 'listr-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  
  items$ = this.store.select(store => store.items.list);
  lists$ = this.store.select(store => store.items.lists);
  loading$ = this.store.select(store => store.items.loading);
  error$ = this.store.select(store => store.items.error);

  items: ListItem[];
  itemToAdd: ListItem = null;
  lists: string[];
  selectedList: string = '';

  private dirtyCount = 0;
  get dirty() { return this.dirtyCount != 0;}

  constructor(private store: Store<AppState>, 
              updates$: Actions,
              private service : InterComponentService) { 

    updates$.pipe(
      ofType(actions.SelectedList)
    )
    .subscribe(()=> {
      this.store.dispatch(actions.LoadItems({loading: 'Loading list...'}));  
    });

    updates$.pipe(
      ofType(actions.AddItemSuccess)
    )
    .subscribe(() => {
      this.itemToAdd = null;
    });
  }

  ngOnInit(): void {

    this.lists$
      .pipe(
        filter(data => !!data),
        map(lists => lists)
      ).subscribe(lists =>
        {
          this.lists = lists;
        }
      );

    this.items$
      .pipe(
        //filter(data => !!data),
        map(items => items.map(item => new ListItem(item.id,item.name,item.selected))
        )
      ).subscribe(array =>         
        this.items = array
      );

    this.store.dispatch(actions.Lists());  
    
  }

  onStateChange(isDirty: boolean){
    this.dirtyCount += isDirty?1:-1;
  }

  onSelectList(){
    this.store.dispatch(actions.SelectedList({selectedList: this.selectedList}));
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
