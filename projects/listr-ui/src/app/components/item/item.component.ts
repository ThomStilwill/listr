import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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

  @Output() saveItem = new EventEmitter<ListItem>();
  @Output() deleteItem = new EventEmitter<ListItem>();
  @Output() addItem = new EventEmitter<ListItem>();
  @Output() resetAdd = new EventEmitter();

  @Input()
  item: ListItem;
  originalItem: ListItem;
  dirty = false;

  constructor() { 

  }

  ngOnInit(): void {
    this.originalItem = new ListItem(this.item.id, this.item.name, this.item.selected);
  }

  modelChanges(value): void {
    if(this.dirty) {return}
    this.dirty = true;
  }
  
  save(){
    if(this.item.id) {
      this.saveItem.emit(this.item);
     } else {
      this.addItem.emit(this.item);
     }
  }

  delete(){
    this.deleteItem.emit(this.item);
  }

  reset(){
    this.dirty = false;
    this.item.name = this.originalItem.name;
    this.item.selected = this.originalItem.selected;
    this.resetAdd.emit();
  }
 
}

