import { Component, Input, OnInit } from '@angular/core';
import { Medio, PrevAmpliacion, PrevCaratula, Preventivo, PreventivoMedio, PrevInculpado, PrevModalidad, PrevObjeto, PrevSnic, PrevVictima } from 'src/app/models/index.models';
import {
  PreSnicService,
  PrevAmpliacionService,
  PrevCaratulaService,
  PreventivoMedioService,
  PreventivoService,
  PrevInculpadoService,
  PrevModalidadService,
  PrevObjetoService,
  PrevVictimaService,
} from 'src/app/services/index.service';

@Component({
  selector: 'app-abm-detalle-preventivo',
  templateUrl: './abm-detalle-preventivo.component.html',
  styleUrls: ['./abm-detalle-preventivo.component.scss'],
})
export class AbmDetallePreventivoComponent implements OnInit {
  
  //ID CAPTURADO Y ENVIADO DEL OTRO FORMULARIO
  @Input()
  id: number;

  //ITEMS DE LOS OBJETOS QUE VAN A SER MOSTRADOS EN LA VISTA
  itemPrev: Preventivo;

  itemMedio: PreventivoMedio;
  itemsMedio: PreventivoMedio[];

  itemAmpliacion: PrevAmpliacion;
  itemsAmpliacion: PrevAmpliacion[];

  itemCaratula: PrevCaratula;
  itemsCaratula: PrevCaratula[];

  itemSnic: PrevSnic;

  itemObjeto: PrevObjeto;
  itemsObjeto: PrevObjeto[];

  itemModal: PrevModalidad;
  itemsModal: PrevModalidad[];

  itemVict: PrevVictima;
  itemsVict: PrevVictima[];

  itemInculpado: PrevInculpado;
  itemsInculpado: PrevInculpado[];


  constructor(
    private wsdlMedio: PreventivoMedioService,
    private wsdlCaratula: PrevCaratulaService,
    private wsdlSnic: PreSnicService,
    private wsdlObjeto: PrevObjetoService,
    private wsdlModalidad: PrevModalidadService,
    private wsdlPreventivo: PreventivoService,
    private wsdlVictimas: PrevVictimaService,
    private wsdlInculpado: PrevInculpadoService,
    private wsdlAmpliacion: PrevAmpliacionService
  ) {
    this.itemPrev = new Preventivo();
    this.itemAmpliacion = new PrevAmpliacion();
    this.itemsAmpliacion = [];
    this.itemCaratula = new PrevCaratula();
    this.itemsCaratula = [];
    this.itemInculpado = new PrevInculpado();
    this.itemsInculpado = [];
    this.itemMedio = new PreventivoMedio();
    this.itemsMedio = [];
    this.itemModal = new PrevModalidad();
    this.itemsModal = [];
    this.itemObjeto = new PrevObjeto();
    this.itemsObjeto = [];
    this.itemVict = new PrevVictima();
    this.itemsVict = [];
    this.itemSnic = new PrevSnic();

    this.id = 0;
  }

  ngOnInit(): void {
    this.obtenerPreventivo();
    this.obtenerMedio();
    this.obtenerCaratulas();
    this.obtenerAmpliaciones();
    this.obtenerObjeto();
    this.obtenerModalidad();
    this.obtenerVictimas();
    this.obtenerInculpados();
    this.obtenerSnic();
  }


  valor(item: any) {
    item = item;
    let valor = '';
    if (item) {
      valor = 'Si';
    } else {
      valor = 'No';
    }
    return valor;
  }


 async obtenerPreventivo() {
    try {
      let data = await this.wsdlPreventivo.getFindId(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == 200){
        this.itemPrev = result.dato;
      }
    } catch (error) {
    }
  }

  async obtenerMedio() {
    try {
      let data = await this.wsdlMedio.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == 200){
        this.itemsMedio = result.data;
      }
    } catch (error) {
    }
  }

  async obtenerCaratulas() {
    try {
      let data = await this.wsdlCaratula.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == 200){
        this.itemsCaratula = result.data;
      }
    } catch (error) {
    }
  }

  async obtenerAmpliaciones() {
    try {
      let data = await this.wsdlAmpliacion.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == 200){
        this.itemsAmpliacion = result.data;
      }
    } catch (error) {
    }
  }
  async obtenerObjeto() {
    try {
      let data = await this.wsdlObjeto.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == 200){
        this.itemsObjeto = result.data;
      }
    } catch (error) {
    }
  }
  async obtenerModalidad() {
    try {
      let data = await this.wsdlModalidad.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == 200){
        this.itemsModal = result.data;
      }
    } catch (error) {
    }
  }
  async obtenerVictimas() {
    try {
      let data = await this.wsdlVictimas.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == 200){
        this.itemsVict = result.data;
      }
    } catch (error) {
    }
  }
  async obtenerInculpados() {
    try {
      let data = await this.wsdlInculpado.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == 200){
        this.itemsInculpado = result.data;
      }
    } catch (error) {
    }
  }

  async obtenerSnic() {
    try {
      let data = await this.wsdlSnic.getFindId(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == 200){
        this.itemSnic = result.dato;
        
      }
    } catch (error) {
    }
  }
}
  
