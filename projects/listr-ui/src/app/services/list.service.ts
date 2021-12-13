import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { ListItem } from '../models/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  delayMs: number = this.config.endpointDelayMs ?? 0;

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig ) { }

  getlistItems() {
    return this.http.get<Array<ListItem>>(this.config.endpoint)
      .pipe(
        delay(this.delayMs)
    )
  }

  addlistItem(newItem: ListItem) {
    return this.http.post(this.config.endpoint, newItem)
      .pipe(
        delay(this.delayMs)
      )
  }

  editlistItem(item: ListItem) {
    return this.http.put(`${this.config.endpoint}/${item.id}`, item)
      .pipe(
        delay(this.delayMs)
      )
  }

  deletelistItem(id: string) {
    return this.http.delete(`${this.config.endpoint}/${id}`)
      .pipe(
        delay(this.delayMs)
      )
  }

}

