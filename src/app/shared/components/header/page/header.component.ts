import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  urlImage: string = environment.urlImageLogo;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  closeSession(){
    this.router.navigate(['login']);
  }
}
