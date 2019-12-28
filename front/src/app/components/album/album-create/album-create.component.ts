import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ArtistaService } from '../../../services/artista.service';
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
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {

  public identity;
  public status;
  public file: File;
  public imgselected : String | ArrayBuffer;
  public url;
  public json_album;
  public artistas;

  createFormGroup() {
    return new FormGroup({
      titulo: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
      descripcion: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(500)]),
      year: new FormControl('', [Validators.required]),
      artista: new FormControl('', [Validators.required]),
    });
  }

  album : FormGroup;

  constructor(
    private  _userSerice : UserService,
    private _artistaService: ArtistaService,
    private _albumService: AlbumService,
    private _router : Router,
  ) { 
    this.identity = this._userSerice.getIdentity();
    this.album = this.createFormGroup();
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
        this._artistaService.listar("").subscribe(
          response =>{
            this.artistas = response.artistas;
            
          },
          error =>{

          }
        );
      }else{
        this._router.navigate(['login']);
        
      }
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
    this.json_album = {
      titulo: this.album.value.titulo,
      descripcion: this.album.value.descripcion,
      year: this.album.value.year,
      artista: this.album.value.artista,
      portada: this.file
    }
    console.log(this.json_album);
    if(this.album.valid){
      this._albumService.registro(this.json_album).subscribe(
        response =>{
          this.album.reset();
          this.imgselected = this.url+"/album/img/null";
          this.status = "success";
        },
        error=>{
          console.log(error);
          this.status = "error";
        }
      );
    }else{
      this.status = "error";
    }
  
  }

  get titulo() { return this.album.get('titulo'); }
  get descripcion() { return this.album.get('descripcion'); }
  get year() { return this.album.get('year'); }
  get artista() { return this.album.get('artista'); }
}
