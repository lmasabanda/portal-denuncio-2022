import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearDenuncioRoutingModule } from './crear-denuncio-routing.module';
import { CrearDenuncioComponent } from './page/crear-denuncio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CrearDenuncioComponent
  ],
  imports: [
    CommonModule,
    CrearDenuncioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CrearDenuncioModule { }
