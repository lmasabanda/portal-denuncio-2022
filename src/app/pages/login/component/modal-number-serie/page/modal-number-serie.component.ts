import { hostViewClassName } from '@angular/compiler';
import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { LoginComponent } from '../../../page/login.component';

@Component({
  selector: 'app-modal-number-serie',
  templateUrl: './modal-number-serie.component.html',
  styleUrls: ['./modal-number-serie.component.css']
})
export class ModalNumberSerieComponent implements OnInit {
  @Input() showModal:boolean = false;
  urlImage: string = "../../../../../../assets/number-serie/";

  constructor(@Host() @Optional() private loginComponent: LoginComponent) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.loginComponent.showModal = false;
  }
}
