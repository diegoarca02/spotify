import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/GLOBAL';
import { UserService } from '../../services/user.service';
import { CancionService } from '../../services/cancion.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public url;
  public cancion;

  constructor(
    private _cancionService: CancionService,
  ) 
  {
    this.url = GLOBAL.url;
    this.cancion = {
      nombre : 'Meet me Halfway',
      
    }
    console.log(this.cancion);
    
   }

  ngOnInit() {
  }

}
