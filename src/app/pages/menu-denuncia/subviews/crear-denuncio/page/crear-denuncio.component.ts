import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators/validators.service';
import { CrearDenuncioService } from '../service/crear.denuncio.service';
import { RequestClaim, InsurePerson, IClaimPerson, RequestCommune, 
         City,  Region, Commune, Login, RequestPolicies, Policies,
         RequestCoverages, Coverages } from '@models/interfaces';
         
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-crear-denuncio',
  templateUrl: './crear-denuncio.component.html',
  styleUrls: ['./crear-denuncio.component.css']
})
export class CrearDenuncioComponent implements OnInit {
  documentList: any[] = [];
  formGroupAsegurado!: FormGroup;
  formGroupSolicitante!: FormGroup;
  formGroupCuentaBancaria!: FormGroup;
  formGroupDocumentos!: FormGroup;

  submitted : boolean = false;
  public requestClaim : RequestClaim =  {} as RequestClaim ; 
  insurePerson: InsurePerson = {} as InsurePerson;
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
  placeholder_file_one = 'Subir archivo';
  placeholder_file_two =  'Subir archivo';
  placeholder_file_tree = 'Subir archivo';
  placeholder_file_four = 'Subir archivo';

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private validatorService: ValidatorsService,
    private crearDenuncioService: CrearDenuncioService
    ) {}

  ngOnInit(): void {
    //Validacion al momento de iniciar componente se inicializa con valor por default (Selectores)  
    if(this.ListPolicies.length == 0) {
      this.ListPolicies.push({ProductCode: "0", ProductName: "Sin datos", ProductDescription: "N/a"});
    }
    
    if(this.ListCoverages.length == 0) { 
      this.ListCoverages.push({CoverageCode: "0", CoverageName: "Sin datos"}); 
    }

    if(this.ListCities.length == 0) {
      this.ListCities.push({Id: "0", Name: "Sin datos"});
    }

    if(this.ListRegions.length == 0) {
      this.ListRegions.push({Id: "0", Name: "Sin datos"})
    }

    if(this.ListCommunes.length == 0) {
      this.ListCommunes.push({Id: "0", Name: "Sin datos"})
    }

    
    //LLamado a la API para poblar los selectores 
    this.getRegions();
    this.getCities();
    this.getCommunes();

    //Incorporar validaciones a los input forms
    this.getFormGroupAsegurado();
    this.getFormGroupSolicitante();
    this.getFormGroupCuentaBancaria();
    this.getFormGroupDocumentos();
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroupAsegurado.controls; }

  polizaSelected(){
    console.log(this.f.polizaDenuncio.value);
    const polizaSelected = this.f.polizaDenuncio.value;
    if(polizaSelected && polizaSelected !== null ) {
      this.requestClaim.Policy = this.f.polizaDenuncio.value;
      let poliza = polizaSelected.split("|")[0]; //Poliza

      this.getCoverages(poliza);
    }
    
  }

  coverageSelected(){
    console.log(this.f.coberturaAsegurado.value);
    const coverageSelected = this.f.coberturaAsegurado.value;
    if(coverageSelected && coverageSelected !== null ) {
      this.requestClaim.Coverage = this.f.polizaDenuncio.value;
    }
  }


  getPolicies(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.inputPolicies.ClaimantRUT =  this.currentUser.rut;
    this.inputPolicies.InsuredRUT =  this.f.rutAsegurado.value;
    this.inputPolicies.OcurrenceDate = this.f.fechaSiniestro.value;

   /* this.inputPolicies.ClaimantRUT = "15781665-9";
    this.inputPolicies.InsuredRUT = "15781665-9";
    this.inputPolicies.OcurrenceDate = "2022-12-30";+*/

    console.log(this.inputPolicies);

    this.crearDenuncioService.getPolicies(this.inputPolicies).subscribe((response)=>{
      console.log(response);
      if(response.Code == 0 && response.Message == 'OK'){
          this.ListPolicies = response.ListPolicies;
      } else {
        this.ListPolicies.push({ProductCode: "0", ProductName: "Sin datos", ProductDescription: "N/a"});
      } 
    });
  }

  getCoverages(poliza: string){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.inputCoverages.ClaimantRUT   = this.currentUser.rut;
    this.inputCoverages.InsuredRUT    = this.f.rutAsegurado.value;
    this.inputCoverages.OcurrenceDate = this.f.fechaSiniestro.value;
    this.inputCoverages.Core          = environment.CORE_COVERAGES;
    this.inputCoverages.Policy        = poliza;

    console.log(this.inputCoverages);
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

  deleteNoData(list: any) {

  }

  validateData(){
    this.submitted = true;

    //Validar el celular
    /*if(this.requestClaim.InsurePerson.Name && this.requestClaim.InsurePerson.LastName && this.requestClaim.InsurePerson.RUT && 
      this.requestClaim.OcurrenceDate && this.requestClaim.Policy && this.requestClaim.Coverage &&  this.requestClaim.Description &&
      this.requestClaim.ClaimPerson.RUT && this.requestClaim.ClaimPerson.Name && this.requestClaim.ClaimPerson.LastName && 
      this.requestClaim.ClaimPerson.Email && this.requestClaim.ClaimPerson.CellPhone && this.requestClaim.ClaimPerson.Phone && 
      this.requestClaim.ClaimPerson.Address && this.requestClaim.ClaimPerson.Region && this.requestClaim.ClaimPerson.Commune && 
      this.requestClaim.ClaimPerson.City) {

      
      this.createClaim();
      return ;
    }*/

    console.log(this.insurePerson);
    console.log(this.claimPerson);

    this.requestClaim.SponsorRUT  = this.insurePerson.RUT;
    this.requestClaim.ProcessType = "1";
    this.insurePerson.Type  = "1";

    var insureRUT = this.insurePerson.RUT;
    this.insurePerson.DV    = insureRUT.slice(-1);

    this.claimPerson.Type   = "1"

    this.requestClaim.InsurePerson = this.insurePerson;
    this.requestClaim.ClaimPerson = this.claimPerson;

    console.log(this.requestClaim);
    this.createClaim(this.requestClaim);

  }

  createClaim(data : RequestClaim){
    this.crearDenuncioService.createClaim(data).subscribe((response) =>{
      console.log(response);
      if(response.Code == 0 && response.Message == 'OK'){
         console.log(response);
         alert("Denuncio guardado de manera satisfactoria!");
      } else {
        console.log("Ocurrio un error");
         alert("Ocurrio un error al tratar de guardar denuncuio.");
      } 
    });
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

  //linea 26 html (keypress)="validateOnlyNumber($event)"

  onFocusNombreAsegurado($event: any){
    if(this.ListPolicies.length > 0){
      this.ListPolicies =  this.ListPolicies.filter(item => item.ProductName !== "Sin datos");
    }

    if(this.f.rutAsegurado.value != null &&  this.ListPolicies.length == 0){
      this.getPolicies();
    }
  }

  validateOnlyNumber($event: any){
    return this.validatorService.validateOnlyNumber($event);
  }

  validateOnlyWords(event: any) {
    return this.validatorService.validateOnlyWords(event);
  }

  showInsureName(){
    return this.requestClaim.InsurePerson.Name || this.requestClaim.InsurePerson.LastName ; 
  }

  resumeInsureRUT(){
    if( this.requestClaim.InsurePerson?.RUT && this.requestClaim.InsurePerson?.RUT !== undefined){
      return "(RUT "+ this.requestClaim.InsurePerson.RUT +" )";
    }
    return "";
  }

  showClaimName(){
    return  this.requestClaim.ClaimPerson.Name ||  this.requestClaim.ClaimPerson.LastName ; 
  }

  resumeClaimRUT(){
    if(  this.requestClaim.ClaimPerson?.RUT &&  this.requestClaim.ClaimPerson?.RUT !== undefined){
      return "(RUT "+  this.requestClaim.ClaimPerson.RUT +" )";
    }

    return "";
  }
  
  resumePolicy(){
    if(  this.requestClaim.Policy &&  this.requestClaim.Policy !== undefined){
      return  this.requestClaim.Policy.split("|")[0];
    }
    return "";
  }

  resumeCoverge(){
    if(  this.requestClaim.Coverage &&  this.requestClaim.Coverage !== undefined){
      return  this.requestClaim.Coverage;
    }
    return "";
  }

  onFileSelectedOne(){
    const input = document.getElementById('file__one') as HTMLInputElement; 
    const file = input.files?.[0];
    const fileName = file?.name;
    const fileType = file?.type;
    const fileSize = file?.size;

    const fileSizeKb = (fileSize !== undefined) ?  Math.round(fileSize / 1024) : 0;

    console.log ('Name: ' + fileName + "\n" + 
    'Type: ' + fileType + "\n" +
    'Size: ' + fileSizeKb + " KB");

  if (fileSizeKb > environment.MAX_FILE_SIZE_KB ){
    alert("Advertencia! El archivo cargado " +fileName + "excede el tamaño maximo permitido de " +
    environment.MAX_FILE_SIZE_MB + " " + environment.EXTENSION_FILE);
  } else {
    this.placeholder_file_one = file != null ? file.name : "";
    this.documentList.push({index: 0, 
      fileName: fileName, 
      fileType:  fileType}
     );
  } 
}

onFileSelectedTwo(){
  const input = document.getElementById('file__two') as HTMLInputElement; 
  const file = input.files?.[0];
  const fileName = file?.name;
  const fileType = file?.type;
  const fileSize = file?.size;

  const fileSizeKb = (fileSize !== undefined) ?  Math.round(fileSize / 1024) : 0;
  
  console.log ('Name: ' + fileName + "\n" + 
    'Type: ' + fileType + "\n" +
    'Size: ' + fileSizeKb + " KB");

    if (fileSizeKb > environment.MAX_FILE_SIZE_KB ){
      alert("Advertencia! El archivo cargado " +fileName + "excede el tamaño maximo permitido de " +
      environment.MAX_FILE_SIZE_MB + " " + environment.EXTENSION_FILE);
    } else {
      this.placeholder_file_two = file != null ? file.name : "";
  
      this.documentList.push({index: 1, 
                              fileName: file?.name, 
                              fileType:  fileType}
                            );
    }
}

onFileSelectedTree(){

  const input = document.getElementById('file__tree') as HTMLInputElement; 
  const file = input.files?.[0];
  const fileName = file?.name;
  const fileType = file?.type;
  const fileSize = file?.size;
  
  const fileSizeKb = (fileSize !== undefined) ?  Math.round(fileSize / 1024) : 0;
  
  console.log ('Name: ' + fileName + "\n" + 
    'Type: ' + fileType + "\n" +
    'Size: ' + fileSizeKb + " KB");

  if (fileSizeKb > environment.MAX_FILE_SIZE_KB ){
    alert("Advertencia! El archivo cargado " +fileName + "excede el tamaño maximo permitido de " +
    environment.MAX_FILE_SIZE_MB + " " + environment.EXTENSION_FILE);
  } else {
    this.placeholder_file_tree = file != null ? file.name : "";
    this.documentList.push({index: 2, 
                            fileName: file?.name, 
                            fileType:  fileType}
                           );
  }
}

onFileSelectedFour(){
  const input = document.getElementById('file__four') as HTMLInputElement; 
  const file = input.files?.[0];
  const fileName = file?.name;
  const fileType = file?.type;
  const fileSize = file?.size;
  
  const fileSizeKb = (fileSize !== undefined) ?  Math.round(fileSize / 1024) : 0;
  
  console.log ('Name: ' + fileName + "\n" + 
    'Type: ' + fileType + "\n" +
    'Size: ' + fileSizeKb + " KB");

    if (fileSizeKb > environment.MAX_FILE_SIZE_KB ){
      alert("Advertencia! El archivo cargado " +fileName + "excede el tamaño maximo permitido de " +
      environment.MAX_FILE_SIZE_MB + " " + environment.EXTENSION_FILE);
    } else {
      this.placeholder_file_four = file != null ? file.name : "";
      this.documentList.push({index: 3, 
        fileName: file?.name, 
        fileType:  fileType}
       );
    }
  


}
 
  
}
