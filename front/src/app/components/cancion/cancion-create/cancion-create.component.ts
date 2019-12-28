import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CancionService } from '../../../services/cancion.service';
import { AlbumService } from '../../../services/album.service';
import { Router } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GLOBAL } from '../../../services/GLOBAL';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-cancion-create',
  templateUrl: './cancion-create.component.html',
  styleUrls: ['./cancion-create.component.css']
})
export class CancionCreateComponent implements OnInit {


  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();

  public identity;
  public status;
  public file: File;
  public imgselected : String | ArrayBuffer;
  public url;
  public json_cancion;
  public canciones;
  public albumes;

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
    private _cancionService: CancionService,
    private _albumService: AlbumService,
    private _router : Router,
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
 
      if(this.identity.role == "ADMIN"){
        this._albumService.listar("").subscribe(
          response =>{
            this.albumes = response.albumes;
            console.log(this.albumes);
          },
          error =>{

          }
        );
      }else{
        this._router.navigate(['login']);
        
      }
    }
  }

  onSubmit(){
    this.json_cancion = {
      numero: this.cancion.value.numero,
      nombre: this.cancion.value.nombre,
      duracion: this.cancion.value.duracion,
      album: this.cancion.value.album,
      file: this.file
    }
    if(this.album.valid){
      this._cancionService.registro(this.json_cancion).subscribe(
        response =>{
          this.cancion.reset();
          this.status = "success";
        },
        error=>{
          console.log("error");
          this.status = "error";
        }
      );
    }else{
      this.status = "error";
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

  get numero() { return this.cancion.get('numero'); }
  get nombre() { return this.cancion.get('nombre'); }
  get duracion() { return this.cancion.get('duracion'); }
  get album() { return this.cancion.get('album'); }
}
