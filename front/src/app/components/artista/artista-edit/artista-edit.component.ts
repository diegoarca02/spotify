import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ArtistaService } from '../../../services/artista.service';
import { Router,ActivatedRoute } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GLOBAL } from '../../../services/GLOBAL';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-artista-edit',
  templateUrl: './artista-edit.component.html',
  styleUrls: ['./artista-edit.component.css']
})

export class ArtistaEditComponent implements OnInit {

  public url;
  public identity;
  public status;
  public get_artista = {};
  public file: File;
  public imgselected : String | ArrayBuffer;

  createFormGroup() {
    return new FormGroup({
      nombres: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
      descripcion: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(500)]),
     
    });
  }

  artista : FormGroup;

  constructor(
    private  _userSerice : UserService,
    private _artistaService: ArtistaService,
    private _router : Router,
    private _route : ActivatedRoute,
  ) {
    this.identity = this._userSerice.getIdentity();
    this.artista = this.createFormGroup();
    this.url = GLOBAL.url;
   }

  ngOnInit() {
    if(!this.identity){
      this._router.navigate(['login']);
    }else{

      this._route.params.subscribe(params=>{
        let id = params['id'];
        this._artistaService.get_artista(id).subscribe(
          response =>{
            this.get_artista = response.artista;
            this.imgselected = this.url+'artista/img/'+response.artista.imagen;
          },
          error =>{

          }
        );
      });
      
      
    }
  }

  onSubmit(){
    this._artistaService.update_artista(this.get_artista['_id'],this.get_artista['nombres'],this.get_artista['descripcion'],this.file).subscribe(
      response =>{
        this._router.navigate(['artistas']);
      },
      error =>{

      }
    );
  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgselected = reader.result;
      reader.readAsDataURL(this.file);
     
    }
  }

  get nombres() { return this.artista.get('nombres'); }
  get descripcion() { return this.artista.get('descripcion'); }

}
