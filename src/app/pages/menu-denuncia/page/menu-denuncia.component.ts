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
    const response = arrayUrl.includes('crear-denuncio');

    return !response;
  }
}
