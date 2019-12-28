import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AlbumService } from '../../../services/album.service';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GLOBAL} from '../../../services/GLOBAL';


@Component({
  selector: 'app-album-index',
  templateUrl: './album-index.component.html',
  styleUrls: ['./album-index.component.css']
})
export class AlbumIndexComponent implements OnInit {

  public identity;
  public albumes;
  public _id;
  public paginaActual :number = 1;
  public buscar;
  
  public imagePath;
  imgURL: any;
  public message: string;
  public search = '';

  constructor(
    private  _userSerice : UserService,
    private _albumService: AlbumService,
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
          this.buscar = params['titulo'];
        });
       
        this._albumService.listar(this.buscar).subscribe(
          response =>{
            this.albumes = response.albumes;
            
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

  update_albumes(){
    if(this.identity.role == "ADMIN"){
      this._route.params.subscribe(params=>{
        this.buscar = params['titulo'];
      });
     
      this._albumService.listar(this.buscar).subscribe(
        response =>{
          this.albumes = response.albumes;
      
        },
        error=>{

        }
      );
    }
    else{
      this._router.navigate(['login']);
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
        ),
        this._albumService.eliminar(id,img).subscribe(
            response =>{
            
              this.update_albumes();
            },
            error =>{
          
            }
          );
        }
    });
    
  }

  onSubmit(){
    this._router.navigate(['albumes/',this.search]);
    this._albumService.listar(this.search).subscribe(
      response =>{
        this.albumes = response.albumes;
       
      },
      error=>{

      }
    );
  }
}
