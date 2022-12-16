import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators/validators.service';
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


  constructor(private router: Router, private formBuilder: FormBuilder, private validatorService: ValidatorsService) {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      rut: ['', [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
      serie: [ null,  [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]]
    });
  }

  ngOnInit(): void {
  }

  openModal(): void{
    this.showModal = true;
  }

  login(formValues: any): void{
    if(!this.aFormGroup.valid) return ;

    this.router.navigate(['menu-denuncio']);
  }

  handleSuccess($event: any){
    //console.log($event)
  }

  validateOnlyNumber($event: any){
    return this.validatorService.validateOnlyNumber($event);
  }

}
