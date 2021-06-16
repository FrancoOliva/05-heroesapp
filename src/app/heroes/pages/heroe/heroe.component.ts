import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    // id del heroe
    // y mostrarlo en consola
    // this.activatedRoute.params.subscribe( ({id}) => console.log(id) );      forma 1
    this.activatedRoute.params.subscribe( p => {                              // forma 2
      console.log(p.id);
    });
  }

}
