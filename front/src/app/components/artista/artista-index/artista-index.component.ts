import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ArtistaService } from '../../../services/artista.service';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GLOBAL} from '../../../services/GLOBAL';



@Component({
  selector: 'app-artista-index',
  templateUrl: './artista-index.component.html',
  styleUrls: ['./artista-index.component.css']
})
export class ArtistaIndexComponent implements OnInit {

  public identity;
  public artistas;
  public _id;
  public paginaActual :number = 1;
  public buscar;
  
  
  public imagePath;
  imgURL: any;
  public message: string;
  public search = '';




  constructor(
    private  _userSerice : UserService,
    private _artistaService: ArtistaService,
    private _router : Router,
    private _route : ActivatedRoute,

    
  ) { 
    this.identity = this._userSerice.getIdentity();
    
    
  }

  ngOnInit() {
    
    if(!this.identity){
      this._router.navigate(['login']);
    }else{

      if(this.identity.role == "ADMIN"){
        this._route.params.subscribe(params=>{
          this.buscar = params['nombres'];
        });
       
        this._artistaService.listar(this.buscar).subscribe(
          response =>{
            this.artistas = response.artistas;
          
          },
          error=>{
  
          }
        );
      }
      else{
        this._router.navigate(['login']);
      }
      
    }
  }

  update_artistas(){
    if(!this.identity){
      this._router.navigate(['login']);
    }else{
      this._artistaService.listar(this.buscar).subscribe(
        response =>{
          this.artistas = response.artistas;
         
        },
        error=>{

        }
      );
     
    }
  }

  eliminar(id,img){
    Swal.fire({
      title: 'Desea eliminar el registro?',
      text: "Se eliminara definitivamente de nuestra bd",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'Tu registro se elimino',
          'success'
        ),this._artistaService.eliminar(id,img).subscribe(
          response =>{
           
            this.update_artistas()
          },
          error =>{
         
          }
        );
      }
    });
    
  }

  onSubmit(){
    this._router.navigate(['artistas/',this.search]);
    this._artistaService.listar(this.search).subscribe(
      response =>{
        this.artistas = response.artistas;
       
      },
      error=>{

      }
    );
  }
  


}
