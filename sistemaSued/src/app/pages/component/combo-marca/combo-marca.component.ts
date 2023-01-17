import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModeloVehiculo, VehiculoMarca } from 'src/app/models/index.models';
import { VehiculoMarcaService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-marca',
  templateUrl: './combo-marca.component.html',
  styleUrls: ['./combo-marca.component.scss']
})
export class ComboMarcaComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<VehiculoMarca> = new EventEmitter<VehiculoMarca>();


  item: VehiculoMarca;
  items: VehiculoMarca[];


  constructor(private wsdl: VehiculoMarcaService) {
    this.item = new VehiculoMarca();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: VehiculoMarca) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: VehiculoMarca, c2: VehiculoMarca): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  async listar() {
   await this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data;
      this.items.sort((x: any, y: any) => {
        if (x.nombre > y.nombre) {
          return 1;
        }
        if (x.nombre < y.nombre) {
          return -1;
        }
        return 0;
      });
    });
  }

}
