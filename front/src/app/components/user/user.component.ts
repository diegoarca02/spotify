import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/User';

import { UserService } from '../../services/user.service'
import { format } from 'url';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public v_email;
  public status = false;

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
      apellidos: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
    });
  }

  user: FormGroup;

  constructor(
    private _userService : UserService,
    private _router: Router,
  ) { 
    //this.user = new User(1,'','','Usuario','','',null);
    this.user = this.createFormGroup();
  }

  ngOnInit() {

  }

  onSubmit(){
    if (this.user.valid) {
      this._userService.registrar(this.user.value).subscribe(
        response =>{
        
          this.status = false;
          this._router.navigate(['login']);
        },
        error =>{
          this.v_email = error.error.message;
        
      
        }
      )
    } else {
      console.log('Not Valid');
      this.status = true;
    }
  }

  get nombre() { return this.user.get('nombre'); }
  get apellidos() { return this.user.get('apellidos'); }
  get email() { return this.user.get('email'); }
  get password() { return this.user.get('password'); }
}
