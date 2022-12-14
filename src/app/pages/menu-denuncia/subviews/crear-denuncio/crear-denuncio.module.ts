import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearDenuncioRoutingModule } from './crear-denuncio-routing.module';
import { CrearDenuncioComponent } from './page/crear-denuncio.component';

@NgModule({
  declarations: [
    CrearDenuncioComponent
  ],
  imports: [
    CommonModule,
    CrearDenuncioRoutingModule
  ]
})
export class CrearDenuncioModule { }
