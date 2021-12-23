import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs/operators';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { ListItem } from '../models/list-item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/list.reducer';
import * as listSelectors from '../state';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  delayMs: number = this.config.endpointDelayMs ?? 0;
  url = this.config.endpoint;
  selectedList = '';

  selectedList$ = this.store.select(listSelectors.selectedList);

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig,
              private store: Store<AppState> ) {

    this.selectedList$
    .pipe(
      map(selectedList => selectedList)
    ).subscribe((selectedList: string) =>
      {
        this.selectedList = selectedList
      }
    );
  }

  getlistItems() {
    const endpoint = `${this.url}/${this.selectedList}`;

    if(!this.selectedList) {
      const emptyList = new Array<ListItem>()
      return of(emptyList);
    }

    return this.http.get<Array<ListItem>>(endpoint)
      .pipe(
        delay(this.delayMs)
    )
  }

  addlistItem(newItem: ListItem) {
    const endpoint = `${this.url}/${this.selectedList}`;
    return this.http.post(endpoint, newItem)
      .pipe(
        delay(this.delayMs)
      )
  }

  editlistItem(item: ListItem) {
    const endpoint = `${this.url}/${this.selectedList}`;
    return this.http.put(`${endpoint}/${item.id}`, item)
      .pipe(
        delay(this.delayMs)
      )
  }

  deletelistItem(id: string) {
    const endpoint = `${this.url}/${this.selectedList}`;
    return this.http.delete(`${endpoint}/${id}`)
      .pipe(
        delay(this.delayMs)
      )
  }

  getAllLists() {
    const endpoint = `${this.url}/lists`;
    return this.http.get<string[]>(endpoint)
      .pipe(
        delay(this.delayMs)
    )
  }
}
