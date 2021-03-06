import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img {
      width: 100%;
      height: auto;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];


  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',


  }

  constructor( 
    private heroesService: HeroesService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {

     }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ){ // si el url NO INCLUYE la palabra editar, que no haga nada
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroeId( id ) )
    )
    .subscribe( heroe => this.heroe = heroe);
  }

  guardar(){

    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if ( this.heroe.id ) {
      // actualizar
      this.heroesService.actualizarHeroe( this.heroe )
      .subscribe( heroe => this.mostrarSnakbar('Registro actualizado'));
    } else {

      // crear
      this.heroesService.agregarHeroe(this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnakbar('Registro creado');
      });

    }

    
  }

  borrarHeroe(){

    // para usar dialog es necesario crearnos un componente con el contenido que queremos mostrarle al usuario
    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    } );

    dialog.afterClosed().subscribe(
      (resultado) => {
        if ( resultado ){

          this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe( resp =>{
      
          this.router.navigate(['/heroes']); // despu??s de eliminar el h??roe, lleva al usuario a esta ruta
          });
        }
      }
    );

  }

  mostrarSnakbar( mensaje: string ){
    this.snackBar.open( mensaje, 'Cerrar', {
      duration: 2000
    });
  }

}
