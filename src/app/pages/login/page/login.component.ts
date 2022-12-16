import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  siteKey: string = environment.keyRecaptcha;
  urlImageBlue: string = environment.urlImageBlue;
  aFormGroup: FormGroup;


  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  openModal(): void{
    this.showModal = true;
  }

  login(){
    // if(!this.aFormGroup.valid) return ;

    this.router.navigate(['menu-denuncio']);
  }

  handleSuccess($event: any){
    console.log($event)
  }

}
