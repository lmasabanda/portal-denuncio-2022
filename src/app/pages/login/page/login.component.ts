import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators/validators.service';
import { environment } from 'src/environments/environment.prod';
import { Login } from '@models/interfaces';
import { AuthenticationService } from '../service/authentication.service';
//Fuente
//https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial
/*
"Quiero que se elimine el token cuando se cierre el navegador".
localStorageguarda la sesión para siempre, pero SessionStorage cierra la sesión cuando se cierra un navegador.*/

//linea 20 html (keypress)="validateOnlyNumber($event)"
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
  loginDto: Login = {} as Login ;


  constructor(private router: Router, 
              private formBuilder: FormBuilder, 
              private validatorService: ValidatorsService,
              private authenticationService: AuthenticationService) {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      rut: ['', [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
      serie: [ null,  [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]]
    });
    this.authenticationService= authenticationService;
  }

  ngOnInit(): void {
  }

  openModal(): void{
    this.showModal = true;
  }

   // convenience getter for easy access to form fields
   get f() { return this.aFormGroup.controls; }

  login(formValues: any): void{
    // stop here if form is invalid
    if(!this.aFormGroup.valid) return ;

    this.loginDto.rut=this.f.rut.value;
    this.loginDto.serie=this.f.serie.value;

    localStorage.setItem('currentUser', JSON.stringify(this.loginDto));

    this.router.navigate(['menu-denuncio']);

    /*this.authenticationService.login(this.loginDto)
    .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
        */
  }

  handleSuccess($event: any){
    //console.log($event)
  }

  validateOnlyNumber($event: any){
    return this.validatorService.validateOnlyNumber($event);
  }

}
