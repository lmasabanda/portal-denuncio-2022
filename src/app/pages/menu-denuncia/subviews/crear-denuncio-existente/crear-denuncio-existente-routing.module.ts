import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearDenuncioExistenteComponent } from './page/crear-denuncio-existente.component';

const routes: Routes = [
  { path:'', component: CrearDenuncioExistenteComponent},
  { path:'**' , redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearDenuncioExistenteRoutingModule { }
