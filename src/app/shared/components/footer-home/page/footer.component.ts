import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  urlImage: string = "../../../../../assets/svg-social-media/";
  urlImageMetLife: string = "../../../../../assets/MetLife.png";

  constructor() { }

  ngOnInit(): void {
  }

}
