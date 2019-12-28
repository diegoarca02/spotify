import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = false;
  public identity;
  public token;

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
    });
  }

  user:FormGroup;

  constructor(

    private _router :Router,
    private  _userService : UserService,
  ) { 
    this.user = this.createFormGroup();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    if(this.identity){
      this._router.navigate(['inicio']);

    }
    
  }

  onSubmit(){
    if(this.user.valid){
      this.error = false;
      this._userService.login(this.user.value).subscribe(
        response =>{
          this.token = response.jwt;
          localStorage.setItem('token',this.token);

          this._userService.login(this.user.value,true).subscribe(
            response =>{
              localStorage.setItem('identity',JSON.stringify(response.user));
              if(response.user.role == 'ADMIN'){
                this._router.navigate(['canciones']);
              }
              else if(response.user.role == 'USUARIO'){
                this._router.navigate(['inicio']);
              }
            },
            error =>{
              console.log(<any>error);
            }
          );

        },
        error=>{
          console.log(<any>error);
        }
      );
    }else{
      this.error = true;
    }
  }

  

}
