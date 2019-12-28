import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CancionService } from '../../../services/cancion.service';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GLOBAL} from '../../../services/GLOBAL';

@Component({
  selector: 'app-cancion-index',
  templateUrl: './cancion-index.component.html',
  styleUrls: ['./cancion-index.component.css']
})
export class CancionIndexComponent implements OnInit {

  public identity;
  public canciones;
  public _id;
  public paginaActual :number = 1;
  public buscar;
  
  public imagePath;
  imgURL: any;
  public message: string;
  public search = '';
  public url;

  constructor(
    private  _userSerice : UserService,
    private _cancionService: CancionService,
    private _router : Router,
    private _route : ActivatedRoute,
  ) { 
    this.identity = this._userSerice.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    if(!this.identity){
      this._router.navigate(['login']);
    }else{

      if(this.identity.role == "ADMIN"){
        this._route.params.subscribe(params=>{
          this.buscar = params['nombre'];
        });
       
        this._cancionService.listar(this.buscar).subscribe(
          response =>{
            this.canciones = response.canciones;
       
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

  onSubmit(){
    this._router.navigate(['canciones/',this.search]);
    this._cancionService.listar(this.search).subscribe(
      response =>{
        this.canciones = response.canciones;
       
      },
      error=>{

      }
    );
  }

}
