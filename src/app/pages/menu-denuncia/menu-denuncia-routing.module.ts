import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDenunciaComponent } from './page/menu-denuncia.component';

const routes: Routes = [
  { path:'', component: MenuDenunciaComponent,
    children:[
      {path: 'crear-denuncio', loadChildren : ()=> import('./subviews/crear-denuncio/crear-denuncio.module').then( m => m.CrearDenuncioModule)},
    ]
  },
  { path:'**' , redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuDenunciaRoutingModule { }
