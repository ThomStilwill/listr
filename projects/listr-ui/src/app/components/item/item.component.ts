import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListItem } from '../../models/list-item.model';
import { InterComponentService } from '../../services/inter-component.service';
import { AutoUnsubscribe } from '../../shared/modules/material/auto-unsubscribe';

@AutoUnsubscribe
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

  @Output() setDirty = new EventEmitter<boolean>();

  @Input() item: ListItem;
  originalItem: ListItem;
  dirty = false;
  subscription: Subscription;

  constructor(private service : InterComponentService) {}

  ngOnInit(): void {
    this.originalItem = new ListItem(this.item.id, this.item.name, this.item.selected);
    
    this.subscription =  this.service.observable$.subscribe(event => {
         this.reset();
      });
  }

  modelChanges(value): void {
    if(this.dirty) {return}
    this.dirty = true;
    this.setDirty.emit(true);
  }
  
  save(){
    if(this.item.id) {
      this.saveItem.emit(this.item);
     } else {
      this.addItem.emit(this.item);
     }
     this.setDirty.emit(false);
  }

  delete(){
    this.deleteItem.emit(this.item);
  }

  reset(){
    this.dirty = false;
    this.item.name = this.originalItem.name;
    this.item.selected = this.originalItem.selected;
    this.setDirty.emit(false);
    this.resetAdd.emit();
  }
 
}

