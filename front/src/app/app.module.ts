import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { routing,appRoutingProviders } from './app.routing';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ArtistaCreateComponent } from './components/artista/artista-create/artista-create.component';
import { ArtistaIndexComponent } from './components/artista/artista-index/artista-index.component';
import { ArtistaEditComponent } from './components/artista/artista-edit/artista-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {NgxPaginationModule} from 'ngx-pagination';
import { AlbumIndexComponent } from './components/album/album-index/album-index.component';
import { AlbumCreateComponent } from './components/album/album-create/album-create.component';
import { AlbumEditComponent } from './components/album/album-edit/album-edit.component';
import { CancionEditComponent } from './components/cancion/cancion-edit/cancion-edit.component';
import { CancionCreateComponent } from './components/cancion/cancion-create/cancion-create.component';
import { CancionIndexComponent } from './components/cancion/cancion-index/cancion-index.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    UserComponent,
    LoginComponent,
    InicioComponent,
    ArtistaCreateComponent,
    ArtistaIndexComponent,
    ArtistaEditComponent,
    AlbumIndexComponent,
    AlbumCreateComponent,
    AlbumEditComponent,
    CancionEditComponent,
    CancionCreateComponent,
    CancionIndexComponent,
    PlayerComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,

    
    
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
