import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-denuncia',
  templateUrl: './menu-denuncia.component.html',
  styleUrls: ['./menu-denuncia.component.css']
})
export class MenuDenunciaComponent implements OnInit {
  showMenuDenuncio: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  isUrlMenu(): boolean{
    const arrayUrl = window.location.href.split('/');
    let index = arrayUrl.indexOf('menu-denuncio');
    let arr = arrayUrl.splice(index + 1);

    return arr.length  == 0 ? true : false;
  }
}
