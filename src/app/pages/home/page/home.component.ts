import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  urlImage: string = environment.urlImageLogo;
  urlImageBlue: string = environment.urlImageBlue;

  constructor(private navigateURL : Router) { }

  ngOnInit(): void {
  }

  redirectLogin(){
    this.navigateURL.navigate(['/login'])
  }
}
