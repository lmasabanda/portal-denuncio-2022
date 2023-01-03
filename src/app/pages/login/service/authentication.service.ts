import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
//import { ResponseRegions, ResponseCities, RequestCommune, ResponseCommunes } from '@models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    url : string = environment.API;
  
    constructor(private _http : HttpClient) { }

  
    login(data : any) : Observable<any>{
        return this._http.post<any>(`${this.url}/users/authenticate`, data)
       /* .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
          }

          return user;
      }));*/
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
  }
  