import { Component, Input, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ListItem } from '../../models/list-item.model';
import { InterComponentService } from '../../services/inter-component.service';

@Component({
  selector: 'listr-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy  {

  @Output() saveItem = new EventEmitter<ListItem>();
  @Output() deleteItem = new EventEmitter<ListItem>();
  @Output() addItem = new EventEmitter<ListItem>();
  @Output() resetAdd = new EventEmitter();

  @Input() item: ListItem;
  originalItem: ListItem;
  dirty = false;
  subscription: Subscription;

  constructor(private service : InterComponentService) { 

  }

  ngOnInit(): void {
    this.originalItem = new ListItem(this.item.id, this.item.name, this.item.selected);
    
    this.subscription =  this.service.observable$.subscribe(event => {
        //console.log(`subject called with: ${this.item.name} ${event}`);
         this.reset();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

