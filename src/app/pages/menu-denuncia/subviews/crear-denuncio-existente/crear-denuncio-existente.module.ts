import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearDenuncioExistenteRoutingModule } from './crear-denuncio-existente-routing.module';
import { CrearDenuncioExistenteComponent } from './page/crear-denuncio-existente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CrearDenuncioExistenteComponent
  ],
  imports: [
    CommonModule,
    CrearDenuncioExistenteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CrearDenuncioExistenteModule { }
