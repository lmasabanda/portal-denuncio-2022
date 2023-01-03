import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators/validators.service';
import { CrearDenuncioService } from '../service/crear.denuncio.service';
import { IClaim, InsurePerson, IClaimPerson, RequestCommune, 
         City,  Region, Commune, Login, RequestPolicies, Policies,
         RequestCoverages, Coverages } from '@models/interfaces';
         
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-crear-denuncio',
  templateUrl: './crear-denuncio.component.html',
  styleUrls: ['./crear-denuncio.component.css']
})
export class CrearDenuncioComponent implements OnInit {
  formGroupAsegurado!: FormGroup;
  formGroupSolicitante!: FormGroup;
  formGroupCuentaBancaria!: FormGroup;
  formGroupDocumentos!: FormGroup;

  submitted : boolean = false;
  claim : IClaim = {} as IClaim;
  insurePerson : InsurePerson= {} as InsurePerson;
  claimPerson: IClaimPerson = {} as IClaimPerson;
  inputCommune: RequestCommune = {} as RequestCommune ;
  ListCities: City[] = [];
  ListRegions: Region[] = [];
  ListCommunes: Commune[] = [];
  currentUser: Login = {} as Login ;
  ListPolicies: Policies[] = [];
  inputPolicies: RequestPolicies = {} as RequestPolicies;
  ListCoverages: Coverages[] = [];
  inputCoverages: RequestCoverages = {} as RequestCoverages;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private validatorService: ValidatorsService,
    private crearDenuncioService: CrearDenuncioService
    ) {}

  ngOnInit(): void {
    //this.getObservable();
    this.getRegions();
    this.getCities();
    this.getCommunes();

    this.getFormGroupAsegurado();
    this.getFormGroupSolicitante();
    this.getFormGroupCuentaBancaria();
    this.getFormGroupDocumentos();
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroupAsegurado.controls; }

  polizaSelected(){
    console.log(this.f.polizaDenuncio.value)
  }

  getPolicies(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.inputPolicies.ClaimantRUT =  this.currentUser.rut;
    this.inputPolicies.InsuredRUT =  this.f.rutAsegurado.value;
    this.inputPolicies.OcurrenceDate = this.f.fechaSiniestro.value;

    this.crearDenuncioService.getPolicies(this.inputPolicies).subscribe((response)=>{
      console.log(response);
      if(response.Code == 0 && response.Message == 'OK'){
          this.ListPolicies = response.ListPolicies;
      }
    });
  }

  getCoverages(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.inputCoverages.ClaimantRUT   = this.currentUser.rut;
    this.inputCoverages.InsuredRUT    = this.f.rutAsegurado.value;
    this.inputCoverages.OcurrenceDate = this.f.fechaSiniestro.value;
    this.inputCoverages.Core          = environment.REGION_CORE;
    this.inputCoverages.Policy        = "123456789";

    this.crearDenuncioService.getCoverages(this.inputCoverages).subscribe((response)=>{
      console.log(response);
      if(response.Code == 0 && response.Message == 'OK'){
          this.ListCoverages = response.ListCoverages;
      }
    });
  } 

  getCommunes(){
     
    this.inputCommune.Id="08414";
    this.inputCommune.Name="ALTO BIOBIO";
    this.crearDenuncioService.getCommunes(this.inputCommune).subscribe((response)=>{
      console.log(response);
      if(response.Code == 0 && response.Message == 'OK'){
          this.ListCommunes = response.ListCommunes;
      }
    });
  }

  getCities(){
    this.crearDenuncioService.getCities().subscribe((response)=>{
      console.log(response);
      if(response.Code == 0 && response.Message == 'OK'){
          this.ListCities = response.ListCities;
      }
    });
  }

  getRegions(){
    this.crearDenuncioService.getRegions().subscribe((response)=>{
      console.log(response);
      if(response.Code == 0 && response.Message == 'OK'){
          this.ListRegions = response.ListRegions;
      }
    });
  }

  createClaim(){
    const data = {
      //id_user : this.user.id_user
    }
    console.log("ingreso...")
    return;
    this.crearDenuncioService.createClaim(data).subscribe((response) =>{
     // this.groupOrderByIdOrder(response);
    });
  }
  validateData(){
    this.submitted = true;

    //Validar el celular
    /*if(this.phoneUser.replace(/\s+/g, '') == this.phoneAux){ 
      this.user.user_phone = `(+593)${this.phoneUser}`
    }else{
      this.user.user_phone = `(+593)${this.phoneUser.replace(/\s+/g, '')}`
      this.employeeService.updateEmployee(this.user).subscribe((r : any) => r);
    }*/

    
    if (this.insurePerson.Name && this.insurePerson.LastName && this.insurePerson.RUT && this.claim.OcurrenceDate 
      && this.claim.Policy && this.claim.Coverage &&  this.claim.Description &&
      this.claimPerson.RUT && this.claimPerson.Name && this.claimPerson.LastName && this.claimPerson.Email
      && this.claimPerson.CellPhone && this.claimPerson.Phone && this.claimPerson.Address &&
      this.claimPerson.Region && this.claimPerson.Commune && this.claimPerson.City) {

      this.createClaim();
      return ;
    }

    return ;
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

    this.getPolicies();
  
    /*if(formValues.value != undefined && !formValues.valid) return;
    if(formValues.emailSolicitante) {
      if(!this.validatorService.validateEmail(formValues.emailSolicitante)) return;
    }*/

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
