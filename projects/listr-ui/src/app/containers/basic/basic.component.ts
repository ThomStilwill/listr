import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { filter, map} from 'rxjs/operators';
import { ListItem } from '../../models/list-item.model';
import { AppState } from '../../store/app-state.model';
import * as actions from '../../store/list.actions';
import * from '../../store/list.selectors';
import { InterComponentService } from '../../services/inter-component.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';

@AutoUnsubscribe
@Component({
  selector: 'listr-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  
  items$ = this.store.select(list);
  lists$ = this.store.select(store => store.items.lists);
  loading$ = this.store.select(store => store.items.loading);
  error$ = this.store.select(store => store.items.error);
  selectedList$ = this.store.select(store => store.items.selectedList);

  items: ListItem[];
  itemToAdd: ListItem = null;
  lists: string[];
  selectedList: string = '';

  dirtyCount = 0;
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
        map(items => items.map(item => new ListItem(item.id,item.name,item.selected))
        )
      ).subscribe(array =>         
        this.items = array
      );

    this.selectedList$
      .subscribe(list =>         
        this.selectedList = list
      );

    this.store.dispatch(actions.Lists());  
  }

  onStateChange(isDirty: boolean){
    this.dirtyCount += isDirty?1:-1;
    if (this.dirtyCount < 0) { this.dirtyCount == 0}
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
