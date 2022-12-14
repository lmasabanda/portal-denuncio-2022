import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators/validators.service';

@Component({
  selector: 'app-crear-denuncio-existente',
  templateUrl: './crear-denuncio-existente.component.html',
  styleUrls: ['./crear-denuncio-existente.component.css']
})
export class CrearDenuncioExistenteComponent implements OnInit {
  formGroupAsegurado!: FormGroup;
  formGroupSolicitante!: FormGroup;
  formGroupCuentaBancaria!: FormGroup;
  formGroupDocumentos!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private validatorService: ValidatorsService) { }

  ngOnInit(): void {
    this.getFormGroupAsegurado();
    this.getFormGroupSolicitante();
    this.getFormGroupCuentaBancaria();
    this.getFormGroupDocumentos();
  }

  getFormGroupAsegurado(){
    return this.formGroupAsegurado = this.formBuilder.group({
      fechaSiniestro: [ null,  [Validators.required]],
      rutAsegurado: [ null,  [Validators.required]],
      nombreAsegurado: [ null,  [Validators.required, Validators.pattern(/[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      apellidoAsegurado: [ null,  [Validators.required, Validators.pattern(/[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      polizaDenuncio: [ null,  [Validators.required]],
      coberturaAsegurado: [ null,  [Validators.required]],
      causaSiniestro: [ null,  [Validators.required]],
    });
  }

  getFormGroupSolicitante(){
    return  this.formGroupSolicitante = this.formBuilder.group({
      solicitante: [ null,  [Validators.required]],
      rutSolicitante: [ null,  [Validators.required]],
      nombreSolicitante: [ null,  [Validators.required, Validators.pattern(/[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      apellidoSolicitante: [ null,  [Validators.required, Validators.pattern(/[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      emailSolicitante: [ null,  [Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
      celularSolicitante: [ null,  [Validators.required]],
      telefonoSolicitante: [ null,  [Validators.required]],
      calleSolicitante: [ null,  [Validators.required]],
      numeroSolicitante: [ null,  [Validators.required]],
      deptSolicitante: [ null,  [Validators.required]],
      regionSolicitante: [ null,  [Validators.required]],
      comunaSolicitante: [ null,  [Validators.required]],
      ciudadSolicitante: [ null,  [Validators.required]]
    });
  }

  getFormGroupCuentaBancaria(){
    return this.formGroupCuentaBancaria = this.formBuilder.group({
      typeAccount: [ null,  [Validators.required]],
      banco: [ null,  [Validators.required]],
      numero_cuenta: [ null,  [Validators.required]],
      nombre_cuenta_bancaria: [ null,  [Validators.required]],
      rut_titular: [ null,  [Validators.required]],
    });
  }

  getFormGroupDocumentos(){
    return  this.formGroupDocumentos = this.formBuilder.group({
      serie: [ null,  [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]]
    });
  }

  nextStep(formValues: any, step: string, numberStep: string, numberBox: string, numberTitle: string){
    console.log(formValues.value)
    console.log(formValues.valid)
    if(formValues.value != undefined && !formValues.valid) return;
    if(formValues.emailSolicitante) {
      if(!this.validatorService.validateEmail(formValues.emailSolicitante)) return;
    }

    const divNumberStep = document.getElementById(`${numberStep}`);
    const divNumberBox = document.getElementById(`${numberBox}`);
    const divNumberTittle = document.getElementById(`${numberTitle}`);
    const divStepOverlay = document.getElementById(`${step}`);

    divStepOverlay!.style.visibility = "hidden";
    divNumberStep!.className = "active__step"
    divNumberBox!.classList.replace('inactive__step__box','active__step__box');
    divNumberBox!.classList.replace('inactive__step__box__last','active__step__box__last');
    divNumberTittle!.classList.replace('inactive__step__text','active__step__text');
  }

  backStep(step: string, numberStep: string, numberBox: string, numberTitle: string){
    const divNumberStep = document.getElementById(`${numberStep}`);
    const divNumberBox = document.getElementById(`${numberBox}`);
    const divNumberTittle = document.getElementById(`${numberTitle}`);
    const divStepOverlay = document.getElementById(`${step}`);

    divStepOverlay!.style.visibility = 'visible';
    divNumberStep!.className = "inactive__step"
    divNumberBox!.classList.replace('active__step__box','inactive__step__box');
    divNumberBox!.classList.replace('active__step__box__last','inactive__step__box__last');
    divNumberTittle!.classList.replace('active__step__text','inactive__step__text');
  }

  // getObservable(){
  //   let divPosition = "";
  //   const secciones = document.querySelectorAll('.content__crear__denuncio__item');

  //   const observe = new IntersectionObserver((entradas, observer)=>{
  //     entradas.forEach(entrada =>{
  //       if(entrada.isIntersecting){
  //         divPosition = entrada.target.id;
  //         window.location.hash = divPosition;
  //       }
  //     })
  //   },{
  //     rootMargin: '-80px 0px 0px 0px',
  //     threshold: .4
  //   })

  //   secciones.forEach(seccion => observe.observe(seccion));
  // }

  validateOnlyNumber($event: any){
    return this.validatorService.validateOnlyNumber($event);
  }

  validateOnlyWords(event: any) {
    return this.validatorService.validateOnlyWords(event);
  }

}
