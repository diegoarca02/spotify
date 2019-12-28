import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {
  public url;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

 /* registro(user):Observable<any>{
    
    let json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'artista/create',json,{headers:headers});
  }*/

  /*update_artista(user):Observable<any>{
    let json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'artista/edit/'+user._id,json,{headers:headers});
  }*/

  registro(nombres:string, descripcion:string, imagen:File){
    
    const fd = new FormData();
    fd.append('nombres',nombres);
    fd.append('descripcion',descripcion);
    fd.append('imagen',imagen);
    return this._http.post(this.url+'artista/create',fd);
  }

  update_artista(id:string,nombres:string, descripcion:string, imagen:File):Observable<any>{  
    const fd = new FormData();
    fd.append('nombres',nombres);
    fd.append('descripcion',descripcion);
    fd.append('imagen',imagen);

    return this._http.put<any>(this.url+'artista/edit/'+id,fd);
  }

  get_artista(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'artista/'+id,{headers:headers});
  }

  

  update_imagen(user):Observable<any>{
    let json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.put<any>(this.url+'artista/foto/'+user._id,json,{headers:headers});
  }

  listar(buscar):Observable<any>{
    let search;
    if(buscar ==  undefined){
      search = "";
    }
    else{
      search = buscar;
    } 

    console.log(search);

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'artistas/'+search,{headers:headers});
  }

  eliminar(id,img):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'artista/'+id+'/'+img,{headers:headers});
  }

}
