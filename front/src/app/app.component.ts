import { Component,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'front';
  public identity;
  

  constructor(
    private router : Router,
    private _userService : UserService,
  ){
    this.identity = this._userService.getIdentity();
   
  }
  
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }
}
