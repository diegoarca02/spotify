import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AlbumService } from '../../../services/album.service';
import { Router,ActivatedRoute } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GLOBAL } from '../../../services/GLOBAL';
import { ArtistaService } from 'src/app/services/artista.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

  public url;
  public identity;
  public status;
  public get_album = {};
  public file: File;
  public imgselected : String | ArrayBuffer;
  public artistas;
  public edit_album;

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
    private _albumService: AlbumService,
    private _artistaService :ArtistaService,
    private _router : Router,
    private _route : ActivatedRoute,
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

      this._route.params.subscribe(params=>{
        let id = params['id'];
        this._albumService.get_album(id).subscribe(
          response =>{
            
            this.get_album = response.album;
            this.imgselected = this.url+'album/img/'+response.album.portada;
            this._artistaService.listar("").subscribe(
              response =>{
                this.artistas = response.artistas;
                
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
    this.edit_album = {
      id: this.get_album["_id"],
      titulo : this.album.value.titulo,
      descripcion : this.album.value.descripcion,
      year: this.album.value.year,
      artista : this.album.value.artista,
      portada : this.file,
    }
    if(this.album.valid){
      this._albumService.update_album(this.edit_album).subscribe(
        response =>{
          this._router.navigate(['albumes']);
        }, 
        error =>{
          console.log(<any>error);
        }
      )
    }
  }

  get titulo() { return this.album.get('titulo'); }
  get descripcion() { return this.album.get('descripcion'); }
  get year() { return this.album.get('year'); }
  get artista() { return this.album.get('artista'); }

}
