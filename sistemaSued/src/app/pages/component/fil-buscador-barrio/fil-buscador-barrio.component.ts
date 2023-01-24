import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Barrio } from 'src/app/models/index.models';
import { BarrioService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-buscador-barrio',
  templateUrl: './fil-buscador-barrio.component.html',
  styleUrls: ['./fil-buscador-barrio.component.scss']
})
export class FilBuscadorBarrioComponent implements OnInit {

  @Output() emmit: EventEmitter<Barrio> = new EventEmitter();

  busqueda: any;

  item: Barrio;
  items: Barrio[];
  constructor(private wsdl: BarrioService) {
    this.busqueda = '';
    this.item = new Barrio();
    this.items = []
   }

  ngOnInit(): void {
  }

  async filtrar() {
    this.items = [];
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdl.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.items = result.data;
        } else if (result.code == 204) {
          Swal.fire({
            icon: 'warning',
            text: 'Verifique el dato ingresado!',
            footer: '<b>No existe la búsqueda realizada...</b>'
          })
        }
      }
    } catch (error) {}
  }

  capturar(event: Barrio) {
    if (event != undefined) {
      this.busqueda = event.nombre;
      this.emmit.emit(event)
      
    }
  }
}
