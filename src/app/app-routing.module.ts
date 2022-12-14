import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch : 'full'},
  {path: 'home', loadChildren : ()=> import('./pages/home/home.module').then(m => m.HomeModule) },
  {path: 'login', loadChildren : ()=> import('./pages/login/login.module').then(m => m.LoginModule) },
  {path: 'menu-denuncio', loadChildren : ()=> import('./pages/menu-denuncia/menu-denuncia.module').then(m => m.MenuDenunciaModule) },
  {path: '**', redirectTo: 'home', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
