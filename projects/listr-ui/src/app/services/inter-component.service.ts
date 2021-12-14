import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterComponentService {

  private subject = new Subject<string>();

  observable$ = this.subject.asObservable();

  constructor() { }

  command(text: string) {
    this.subject.next(text);
  }
}
