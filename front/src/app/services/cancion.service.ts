import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  public url;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  registro(cancion):Observable<any>{
    const fd = new FormData();
    fd.append('numero',cancion.numero);
    fd.append('nombre',cancion.nombre);
    fd.append('duracion',cancion.duracion);
    fd.append('file',cancion.file);
    fd.append('album',cancion.album);
    return this._http.post(this.url+'cancion/create',fd);
  }

  listar(buscar):Observable<any>{
    let search;
    if(buscar ==  undefined){
      search = "";
    }
    else{
      search = buscar;
    } 
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'canciones/'+search,{headers:headers});
  }

  get_cancion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'cancion/'+id,{headers:headers});
  }

  update_cancion(cancion):Observable<any>{  
    
    const fd = new FormData();
    fd.append('numero',cancion.numero);
    fd.append('nombre',cancion.nombre);
    fd.append('duracion',cancion.duracion);
    fd.append('file',cancion.file);
    fd.append('album',cancion.album);

    return this._http.put<any>(this.url+'cancion/edit/'+cancion.id,fd);
  }
  
}
