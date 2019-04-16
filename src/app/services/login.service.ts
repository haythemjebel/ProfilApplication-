import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public Mylogin : EventEmitter<any>;

  constructor( ) { 
    this.Mylogin = new EventEmitter();
  }
}
