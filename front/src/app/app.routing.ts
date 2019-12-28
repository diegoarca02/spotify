import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ArtistaCreateComponent } from './components/artista/artista-create/artista-create.component';
import { ArtistaIndexComponent } from './components/artista/artista-index/artista-index.component';
import { ArtistaEditComponent } from './components/artista/artista-edit/artista-edit.component';
import { AlbumIndexComponent } from './components/album/album-index/album-index.component';
import { AlbumCreateComponent } from './components/album/album-create/album-create.component';
import { AlbumEditComponent } from './components/album/album-edit/album-edit.component';
import { CancionIndexComponent } from './components/cancion/cancion-index/cancion-index.component';
import { CancionCreateComponent } from './components/cancion/cancion-create/cancion-create.component';
import { CancionEditComponent } from './components/cancion/cancion-edit/cancion-edit.component';

const appRoute : Routes = [
    
    {path:'registro',component: UserComponent},
    {path:'login',component: LoginComponent},
    {path:'inicio',component: InicioComponent},
    {path:'',component: InicioComponent},

    {path:'artistas',component: ArtistaIndexComponent},
    {path:'artistas/:nombres',component: ArtistaIndexComponent},
    {path:'artista/create',component: ArtistaCreateComponent},
    {path:'artista/edit/:id',component: ArtistaEditComponent},

    {path:'albumes',component: AlbumIndexComponent},
    {path:'albumes/:titulo',component: AlbumIndexComponent},
    {path:'album/create',component: AlbumCreateComponent},
    {path:'album/edit/:id',component: AlbumEditComponent},

    {path:'canciones',component: CancionIndexComponent},
    {path:'canciones/:nombre',component: CancionIndexComponent},
    {path:'cancion/create',component: CancionCreateComponent},
    {path:'cancion/edit/:id',component: CancionEditComponent},
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute); 


