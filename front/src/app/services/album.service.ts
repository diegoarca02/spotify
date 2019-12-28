import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public url;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  registro(album):Observable<any>{
    const fd = new FormData();
    fd.append('titulo',album.titulo);
    fd.append('descripcion',album.descripcion);
    fd.append('year',album.year);
    fd.append('artista',album.artista);
    fd.append('portada',album.portada);
    return this._http.post(this.url+'album/create',fd);
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
    return this._http.get(this.url+'albumes/'+search,{headers:headers});
  }

  get_album(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'album/'+id,{headers:headers});
  }

  update_album(album):Observable<any>{  
    
    const fd = new FormData();
    fd.append('titulo',album.titulo);
    fd.append('descripcion',album.descripcion);
    fd.append('year',album.year);
    fd.append('artista',album.artista);
    fd.append('portada',album.portada);

    return this._http.put<any>(this.url+'album/edit/'+album.id,fd);
  }

  eliminar(id,img):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'album/'+id+'/'+img,{headers:headers});
  }
 
}
