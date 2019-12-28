import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AlbumService } from '../../../services/album.service';
import { Router,ActivatedRoute } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GLOBAL } from '../../../services/GLOBAL';
import { CancionService } from 'src/app/services/cancion.service';

declare var jQuery:any;
declare var $:any;

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-cancion-edit',
  templateUrl: './cancion-edit.component.html',
  styleUrls: ['./cancion-edit.component.css']
})

export class CancionEditComponent implements OnInit {

  public url;
  public identity;
  public status;
  public get_cancion = {};
  public file: File;
  public imgselected : String | ArrayBuffer;
  public albumes;
  public edit_cancion;

  createFormGroup() {
    return new FormGroup({
      numero: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      duracion: new FormControl('', [Validators.required]),
      album: new FormControl('', [Validators.required]),
    });
  }

  cancion : FormGroup;

  constructor(
    private  _userSerice : UserService,
    private _albumService: AlbumService,
    private _cancionService :CancionService,
    private _router : Router,
    private _route : ActivatedRoute,
  ) { 
    this.identity = this._userSerice.getIdentity();
    this.cancion = this.createFormGroup();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
     // Material Select Initialization
     $(document).ready(function() {
      $('.mdb-select').materialSelect();
    });
    
    if(!this.identity){
      this._router.navigate(['login']);
    }else{

      this._route.params.subscribe(params=>{
        let id = params['id'];
        this._cancionService.get_cancion(id).subscribe(
          response =>{
            
            this.get_cancion = response.cancion;

            
            this.imgselected = this.url+'cancion/mp3/'+response.cancion.file;
            
            console.log(this.imgselected);

            this._albumService.listar("").subscribe(
              response =>{
                this.albumes = response.albumes;
                
              },
              error =>{
    
              }
            );
          },
          error =>{

          }
        );
      }); 
    }
  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgselected = reader.result;
      reader.readAsDataURL(this.file);
     
    }
  }

  onSubmit(){
    this.edit_cancion = {
      id: this.get_cancion["_id"],
      numero: this.cancion.value.numero,
      nombre: this.cancion.value.nombre,
      duracion: this.cancion.value.duracion,
      album: this.cancion.value.album,
      file: this.file
    }
    if(this.cancion.valid){
      this._cancionService.update_cancion(this.edit_cancion).subscribe(
        response =>{
          this._router.navigate(['canciones']);
        }, 
        error =>{
          console.log(<any>error);
        }
      )
    }
  }
 

  get numero() { return this.cancion.get('numero'); }
  get nombre() { return this.cancion.get('nombre'); }
  get duracion() { return this.cancion.get('duracion'); }
  get album() { return this.cancion.get('album'); }

}
