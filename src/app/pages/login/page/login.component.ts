import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showModal: boolean = false;
  urlImage: string = environment.urlImageLogo;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openModal(): void{
    this.showModal = true;
  }

  login(){
    this.router.navigate(['menu-denuncia']);
  }
}
