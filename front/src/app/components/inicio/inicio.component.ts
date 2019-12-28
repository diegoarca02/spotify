import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/GLOBAL';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public canciones;
  public url;
  public current_titulo;
  public current_portada;
  public current_artista;
  public current_file;
  public data;


  constructor(
    private _userService : UserService,
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._userService.getCanciones("").subscribe(
      response =>{
        this.canciones = response.canciones;
        
      },
      err =>{

      }
    )
  }

  player(id){
    this._userService.getCancion(id).subscribe(
      response =>{
        
        this.data = response.canciones;
        this.current_artista = this.data.album.artista.nombres;
        this.current_file = this.url+'cancion/mp3/'+this.data.file;
        this.current_portada =  this.url+'album/img/'+this.data.album.portada;
        this.current_titulo  = this.data.nombre;

        localStorage.setItem('song',this.data);

        document.getElementById('file-mp3').setAttribute('src',this.current_file);
        
        (document.getElementById('player') as any).load();
        (document.getElementById('player') as any).play();
        document.getElementById('portada-album').setAttribute('src',this.current_portada);
        $('#titulo-cancion').text(this.current_titulo);
        $('#artista-cancion').text(this.current_artista);
      },
      err=> {

      }
    )
  }

}
