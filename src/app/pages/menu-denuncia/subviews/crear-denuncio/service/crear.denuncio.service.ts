import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseRegions, ResponseCities, RequestCommune, ResponseCommunes,
         RequestPolicies, ResponsePolicies, RequestCoverages, ResponseCoverages } from '@models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CrearDenuncioService {

  url : string = environment.API;

  constructor(private _http : HttpClient) { }

  getPolicies(data: RequestPolicies )  : Observable<ResponsePolicies>{
    return this._http.post<any>(`${this.url}/Claim/GetPolicies`, data);
  }

  getCoverages(data: RequestCoverages )  : Observable<ResponseCoverages>{
    return this._http.post<any>(`${this.url}/Claim/GetCoverages`, data);
  }
  
  getCommunes(data : RequestCommune) : Observable<ResponseCommunes>{
    return this._http.post<ResponseCommunes>(`${this.url}/Client/GetCommunes`,data);
  }

  getCities(): Observable<ResponseCities>{
    return this._http.get<ResponseCities>(`${this.url}/Client/GetCities`);
  }

  getRegions() : Observable<ResponseRegions>{
    let params = new HttpParams().set('core', environment.REGION_CORE);
    return this._http.get<ResponseRegions>(`${this.url}/Client/GetRegions/core`,   { params: params });
  }
  createClaim(data : any) : Observable<any>{
    return this._http.post<any>(`${this.url}/Claim/AddClaim`, data);
  }
}
