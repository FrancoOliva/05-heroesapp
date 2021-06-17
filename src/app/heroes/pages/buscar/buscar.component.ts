import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];

  heroeSeleccionado!: Heroe;

  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){

    this.heroesService.getSugerencias( this.termino )
    .subscribe( heroes => this.heroes = heroes);

  }

  opcionSeleccionada( evento:MatAutocompleteSelectedEvent ){
    const heroe: Heroe = evento.option.value;
    this.termino = heroe.superhero;

    // seleccionamos al héroe de nuestra búsqueda y traemos los datos de la api de ESE HÉROE
    this.heroesService.getHeroeId( heroe.id! )
    .subscribe( heroe => this.heroeSeleccionado = heroe );
  }

}
