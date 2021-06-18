import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>( `${ this.baseUrl }/heroes` );
  }

  getHeroeId(id:string):Observable<Heroe>{
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  getSugerencias( termino:string ):Observable<Heroe[]>{
    return this.http.get<Heroe[]>( `${this.baseUrl}/heroes?q=${ termino }&_limit=6` );
  }


  // CRUD
  agregarHeroe( heroe: Heroe ):Observable<Heroe>{

    // tenemos que especificar que lo que va a regresar es un dato de tipo Heroe
    return this.http.post<Heroe>( `${ this.baseUrl }/heroes`, heroe );
  }
  

}
