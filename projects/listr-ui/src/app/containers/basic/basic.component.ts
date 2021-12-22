import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { filter, map} from 'rxjs/operators';
import { ListItem } from '../../models/list-item.model';
import * as actions from '../../store/list.actions';
import * as listSelectors from '../../store';
import { InterComponentService } from '../../services/inter-component.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ListState } from '../../store/list.reducer';


@AutoUnsubscribe
@Component({
  selector: 'listr-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  
  items$ = this.store.select(listSelectors.items);
  lists$ = this.store.select(listSelectors.lists);
  loading$ = this.store.select(listSelectors.loading);
  error$ = this.store.select(listSelectors.error);
  selectedList$ = this.store.select(listSelectors.selectedList);

  items: ListItem[];
  itemToAdd: ListItem = null;
  lists: string[];
  selectedList: string;

  dirtyCount = 0;
  get dirty() { return this.dirtyCount != 0;}

  constructor(private store: Store<ListState>, 
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
      ).subscribe((lists:string[]) =>
        {
          this.lists = lists;
        }
      );

    this.items$
      .pipe(
        map((items:ListItem[]) => items.map(item => Object.assign({},item))
        )
      ).subscribe(items =>         
        this.items =  items.sort((a,b) => a.order-b.order)
      );

    this.selectedList$
      .subscribe((selectedList: string) =>         
        this.selectedList = selectedList
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
    this.itemToAdd = new ListItem(null,'',false, this.items.length);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    //console.log(event.previousIndex, event.currentIndex);

    const min = Math.min(event.previousIndex, event.currentIndex);
    const max = Math.max(event.previousIndex, event.currentIndex);

    for(let i=min;i <= max; i++) {
      if(this.items[i].order != i) {
        //console.log(this.items[i], i);
        const item = Object.assign({},this.items[i])
        item.order = i;
        this.store.dispatch(actions.EditItem({item: item}));
      }
    }
  }
}
