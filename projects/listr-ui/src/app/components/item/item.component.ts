import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListItem } from '../../models/list-item.model';
import { AppState } from '../../store/app-state.model';
import * as Actions from '../../store/list.actions';

@Component({
  selector: 'listr-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit  {

  @Input()
  item: ListItem;
  dirty = false;

  constructor(private store: Store<AppState>) { }

  modelChanges(value): void {
    
    this.dirty = true;
  }

  ngOnInit(): void {
  }

  save(){
    this.store.dispatch(Actions.EditItem({item: this.item}));
  }

  delete(){
    this.store.dispatch(Actions.DeleteItem({id: this.item.id}));
  }

}

