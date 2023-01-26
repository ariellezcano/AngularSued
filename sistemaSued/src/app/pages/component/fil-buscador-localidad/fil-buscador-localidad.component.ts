import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Localidad } from 'src/app/models/index.models';
import { LocalidadService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-buscador-localidad',
  templateUrl: './fil-buscador-localidad.component.html',
  styleUrls: ['./fil-buscador-localidad.component.scss']
})
export class FilBuscadorLocalidadComponent implements OnInit {

  @Output() emmit: EventEmitter<Localidad> = new EventEmitter();

  busqueda: any;

  item: Localidad;
  items: Localidad[];
  constructor(private wsdl: LocalidadService) {
    this.busqueda = '';
    this.item = new Localidad();
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

  capturar(event: Localidad) {
    if (event != undefined) {
      this.busqueda = event.nombre;
      this.emmit.emit(event)
    }
  }

}
