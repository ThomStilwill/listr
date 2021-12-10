import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { ListItem } from '../../models/list-item.model';
import { AppState } from '../../store/app-state.model';
import * as Actions from '../../store/list.actions';

@Component({
  selector: 'listr-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  items$ = this.store.select(store => store.items.list);
  loading$ = this.store.select(store => store.items.loading);
  error$ = this.store.select(store => store.items.error);

  items: ListItem[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.items$
      .pipe(
        filter(data => !!data),
        map(items => items.map(item => new ListItem(item.id,item.name,item.selected))
        )
      ).subscribe(array =>         
        this.items = array
      );

    this.store.dispatch(Actions.LoadItems({loading:'loading'}));
  }

  reset(){
    this.items.forEach(item => item.dirty = false)
  }

}
