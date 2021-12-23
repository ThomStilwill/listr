import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListItem } from '../../models/list-item.model';
import { InterComponentService } from '../../services/inter-component.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';

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
  @Output() onStateChange = new EventEmitter<boolean>();

  @Input() item: ListItem;

  editingId: string;
  originalItem: ListItem;
  dirty = false;
  subscription: Subscription;

  constructor(private service : InterComponentService) {}

  ngOnInit(): void {
    this.originalItem = new ListItem(this.item.id, this.item.name, this.item.selected);
    this.subscription =  this.service.observable$.subscribe(event => {
         
      switch(event) {
        case "reset" : 
          this.reset();
          break;
        default:  
          this.editingId = event;
          break;
      }
    });
  }

  modelChanges(value): void {
    if(this.dirty) {return}
    const command = this.item.id;
    this.service.command(command);

    this.dirty = true;
    this.onStateChange.emit(true);
    console.log('change: ' , value);
  }
  
  readonly(){
    return this.editingId && this.editingId !== this.item.id;
  }

  save(){
    if(this.item.id) {
      this.saveItem.emit(this.item);
     } else {
      this.addItem.emit(this.item);
     }
     this.onStateChange.emit(false);
     this.service.command('');
  }

  delete(){
    this.deleteItem.emit(this.item);
  }

  reset(){
    if(!this.dirty) {return}
    this.service.command('');
    this.dirty = false;
    this.item.name = this.originalItem.name;
    this.item.selected = this.originalItem.selected;
    this.resetAdd.emit();
    console.log('reset: ', this.item.name);
    this.onStateChange.emit(false);
  }
}
