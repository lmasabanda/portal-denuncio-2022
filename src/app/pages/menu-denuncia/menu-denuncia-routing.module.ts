import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDenunciaComponent } from './page/menu-denuncia.component';

const routes: Routes = [
  { path:'', component: MenuDenunciaComponent, pathMatch : 'full'},
  { path:'**' , redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuDenunciaRoutingModule { }
