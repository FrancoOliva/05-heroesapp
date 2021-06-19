import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroe):string {

    if ( !heroe.id && !heroe.alt_img ){ // si no existe el id y la url img, mostramos la siguiente img

      return 'assets/no-image.png';

    } else if ( heroe.alt_img ){ // si la url img existe, utilizamos esa url para mostrar la img

      return heroe.alt_img;

    } else { // traemos la img que coincide con el id del heroe
      
      return `assets/heroes/${heroe.id}.jpg`;
    }
    

  }

}
