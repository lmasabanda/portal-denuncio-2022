import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  validateOnlyNumber($event: any){
    return $event.charCode >= 48 && $event.charCode < 58;
  }

  validateOnlyWords(event: any){
    var inp = String.fromCharCode(event.keyCode);

    if (/[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  validateEmail(email: string){
    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

     return regexEmail.test(email);
  }
}
