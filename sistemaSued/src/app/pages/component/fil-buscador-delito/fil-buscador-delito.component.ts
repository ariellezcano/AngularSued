import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Delito } from 'src/app/models/index.models';
import { DelitoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-buscador-delito',
  templateUrl: './fil-buscador-delito.component.html',
  styleUrls: ['./fil-buscador-delito.component.scss']
})
export class FilBuscadorDelitoComponent implements OnInit {

  @Output() emmit: EventEmitter<Delito> = new EventEmitter();

  busqueda: any;

  item: Delito;
  items: Delito[];
  constructor(private wsdl: DelitoService) {
    this.busqueda = '';
    this.item = new Delito();
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

  capturar(event: Delito) {
    if (event != undefined) {
      this.busqueda = event.descripcion;
      this.emmit.emit(event)
      
    }
  }
}
