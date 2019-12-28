import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ArtistaService } from '../../../services/artista.service';
import { Router } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GLOBAL } from '../../../services/GLOBAL';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-artista-create',
  templateUrl: './artista-create.component.html',
  styleUrls: ['./artista-create.component.css']
})
export class ArtistaCreateComponent implements OnInit {

  public identity;
  public status;
  public file: File;
  public imgselected : String | ArrayBuffer;
  public url;
  public json_artista;

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
  ) {
    this.identity = this._userSerice.getIdentity();
    this.artista = this.createFormGroup();
    this.url = GLOBAL.url;
   }

  ngOnInit() {  
    if(!this.identity){
      this._router.navigate(['login']);
    }else{
     
    }
  }

  onSubmit(){
    this.json_artista = this.artista.value;
    
    this._artistaService.registro(this.json_artista.nombres,this.json_artista.descripcion,this.file).subscribe(
      response =>{
        this.artista.reset();
        this.imgselected = this.url+"/artista/img/null";
        this.status = "success";
      },
      error=>{
        console.log("error");
        this.status = "error";
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
