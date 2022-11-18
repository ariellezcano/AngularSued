import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Calle } from 'src/app/models/index.models';
import { CalleService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-buscador-calle',
  templateUrl: './fil-buscador-calle.component.html',
  styleUrls: ['./fil-buscador-calle.component.scss']
})
export class FilBuscadorCalleComponent implements OnInit {

  @Output() emmit: EventEmitter<Calle> = new EventEmitter();

  busqueda: any;

  item: Calle;
  items: Calle[];
  constructor(private wsdl: CalleService) {
    this.busqueda = '';
    this.item = new Calle();
    this.items = []
   }

  ngOnInit(): void {
  }

  async filtrar() {
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdl.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.items = [];
          this.items = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la busqueda realizada');
        }
      }
    } catch (error) {}
  }

  capturar(event: Calle) {
    if (event != undefined) {
      this.busqueda = event.nombre;
      this.emmit.emit(event)
    }
  }

}
