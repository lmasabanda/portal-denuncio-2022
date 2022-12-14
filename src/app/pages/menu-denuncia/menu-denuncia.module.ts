import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuDenunciaRoutingModule } from './menu-denuncia-routing.module';
import { MenuDenunciaComponent } from './page/menu-denuncia.component';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { CardMenuDenunciasComponent } from './component/card-menu-denuncias/card-menu-denuncias.component';

@NgModule({
  declarations: [
    MenuDenunciaComponent,
    CardMenuDenunciasComponent
  ],
  imports: [
    CommonModule,
    MenuDenunciaRoutingModule,
    HeaderModule
  ]
})
export class MenuDenunciaModule { }
