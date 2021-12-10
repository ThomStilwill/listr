import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListItem } from '../models/list-item.model';
import { delay, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private list_URL = "http://localhost:3000/list"

  constructor(private http: HttpClient) { }

  getlistItems() {
    return this.http.get<Array<ListItem>>(this.list_URL)
      .pipe(
        //tap(()=> {throw new Error("something broke!")}),
        delay(500)
    )
  }

  addlistItem(newItem: ListItem) {
    return this.http.post(this.list_URL, newItem)
      .pipe(
        tap(x => console.log(x)),
        delay(500)
      )
  }

  editlistItem(item: ListItem) {
    return this.http.put(`${this.list_URL}/${item.id}`, item)
      .pipe(
        tap(x => console.log(x)),
        delay(500)
      )
  }

  deletelistItem(id: string) {
    return this.http.delete(`${this.list_URL}/${id}`)
      .pipe(
        delay(500)
      )
  }

}

