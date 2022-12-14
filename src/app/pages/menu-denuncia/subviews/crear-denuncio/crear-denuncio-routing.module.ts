import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearDenuncioComponent } from './page/crear-denuncio.component';

const routes: Routes = [
  { path:'', component: CrearDenuncioComponent},
  { path:'**' , redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearDenuncioRoutingModule { }
