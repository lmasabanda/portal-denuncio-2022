import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-denuncio',
  templateUrl: './crear-denuncio.component.html',
  styleUrls: ['./crear-denuncio.component.css']
})
export class CrearDenuncioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //this.getObservable();
  }

  nextStep(step: string, numberStep: string, numberBox: string, numberTitle: string){
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

  getObservable(){
    let divPosition = "";
    const secciones = document.querySelectorAll('.content__crear__denuncio__item');

    const observe = new IntersectionObserver((entradas, observer)=>{
      entradas.forEach(entrada =>{
        if(entrada.isIntersecting){
          divPosition = entrada.target.id;
          window.location.hash = divPosition;
        }
      })
    },{
      rootMargin: '-80px 0px 0px 0px',
      threshold: .4
    })

    secciones.forEach(seccion => observe.observe(seccion));
  }
}
