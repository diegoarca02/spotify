import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User'
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  public user : User;
  public token;
  public identity;


  constructor(
    private _http : HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  registrar(user):Observable<any>{
    var obj = {
      nombre:user.nombre,
      apellidos:user.apellidos,
      email:user.email,
      password:user.password,
      role:'USUARIO'
    }
    console.log(obj);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'registro',obj,{headers:headers});
  }

  login(user,gettoken = null):Observable<any>{
    let json = user;
    if(gettoken != null){
      user.gettoken = true;
    }
   
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login',json,{headers:headers});
  }

  getCancion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'dataplayer/'+id,{headers:headers});
  }

  getCanciones(buscar):Observable<any>{
    let search;
    if(buscar == undefined){
      search = "";
    }
    else{
      search = buscar;
    } 
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'dataplayerlist/'+search,{headers:headers});
  }

  getToken(){
    let token = localStorage.getItem('token'); 
    if(token){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity){
      this.identity = identity;
    }
    else{
      this.identity = null;
    }

    return this.identity;
  }

  
}
