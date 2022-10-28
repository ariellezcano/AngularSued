import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import {
  ArmaMarca,
  Medio,
  Preventivo,
  PreventivoMedio,
} from 'src/app/models/index.models';
import {
  MedioService,
  PreventivoMedioService,
  PreventivoService,
} from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilArmaComponent } from '../../component/fil-arma/fil-arma.component';

@Component({
  selector: 'app-abm-preventivo-medio',
  templateUrl: './abm-preventivo-medio.component.html',
  styleUrls: ['./abm-preventivo-medio.component.scss'],
})
export class AbmPreventivoMedioComponent implements OnInit {

  @ViewChild(FilArmaComponent, { static: false }) fil!: FilArmaComponent;

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  idPrevMed!: number;
  //variable para verificar si fue enviado los datos
  enviado = false;
  mostrar: boolean;
  arma: boolean;

  busqueda;

  prev: Preventivo;
  prevMed: PreventivoMedio;

  item: PreventivoMedio;
  items: PreventivoMedio[];

  Mitems: Medio[];
  Mitem: Medio;

  idSeleccion!: number;
  mostrarBtnModif: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PreventivoMedioService,
    private wsdlMedio: MedioService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PreventivoMedio();
    this.items = [];
    this.prev = new Preventivo();
    this.prevMed = new PreventivoMedio();
    this.busqueda = '';
    this.Mitem = new Medio();
    this.Mitems = [];
    this.mostrarBtnModif = false;
    this.mostrar = false;
    this.arma = false;
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      //codigo: ['', Validators.required],
      //descripcion: ['', Validators.required]
    });

    //captura el id que viene en el url
    this.id = this.route.snapshot.params['id'];
    this.obtenerDetalle();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async findId(id: number) {
    if (id > 0) {
      try {
        let data = await this.wsdl.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
        }
      } catch (error) {}
    }
  }

  async obtenerDetalle() {
    try {
      let data = await this.wsdl.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.items = result.data;
      } else {
        this.items = [];
      }
    } catch (error) {}
  }


  //trae los datos para modificar
  async traerDatos(id: number) {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
          if(this.item.arma != undefined){
            this.mostrar = true;
            this.arma = true;
          }
          this.idSeleccion = result.dato.id;
          this.busqueda = result.dato.medioNavigation.descripcion;
          if(this.item.fecha != undefined){
            this.item.fecha = moment(this.item.fecha).format('YYYY-MM-DD');
          }
          this.mostrarBtnModif = true;
        }
      } catch (error) {}
    }
  }
  // doAction() {
  //   this.enviado = true;
  //   if (this.form.valid) {
  //     if (this.id > 0) {
  //       this.actualizarDatos(this.item);
  //     } else {
  //       this.guardar();
  //     }
  //   }
  // }

  async actualizarDatos(obj: PreventivoMedio) {
    try {
      let data = await this.wsdl.doUpdate(this.item.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      console.log('result', result);
      if (result.code == 200) {
        this.idSeleccion=0;
        this.mostrarBtnModif =false;
        this.busqueda = '';
        this.item = new PreventivoMedio();
        this.obtenerDetalle();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato actualizado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.code == 204) {
      }
    } catch (error) {}
  }

  //recorre el bucle para insertar los datos de preventivo medio
  async agregarDato() {
    for (let index = 0; index < this.items.length; index++) {
      this.prevMed = new PreventivoMedio();
      this.prevMed = this.items[index];
      if (this.prevMed.id == undefined) {
        this.item = new PreventivoMedio();
        this.item = this.prevMed;
        this.guardar();
      }
    }
  }


  async guardar() {
    this.item.preventivo = this.id;
    try {
      let data = await this.wsdl.doInsert(this.item).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.item = new PreventivoMedio();
        this.obtenerDetalle();
      } else if(result.code == 204) {
        Swal.fire({
          icon: 'info',
          title: 'Alerta...',
          text: 'El dato ya existe en la base de datos',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Alerta...',
        text: 'No se pudo insertar los datos',
      });
    }
  }

  //filtro de medios
  async filtrarMedio() {
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdlMedio.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.Mitems = [];
          this.Mitems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la busqueda realizada');
        }
      }
    } catch (error) {}
  }

  capturar(event: Medio) {
    if (event != undefined) {
      this.busqueda = event.descripcion;
      this.item.medioUtilizado = event.id;
      this.item.capturaDescripcion = event.descripcion;
      this.item.codigo = event.codTipo + '-' + event.codMedio;

      if(this.item.capturaDescripcion == "REVOLVER"){
        this.mostrar=true;
      }
    }
  }

  //captura el arma
  doFound(event: ArmaMarca){
    this.item.arma = event.id;
  }

  //agrega fila en memoria
  addRow() {
    if(this.fil.busqueda != ''){
    this.fil.busqueda = '';
    }
    this.busqueda = '';
    this.items.unshift(this.item);
    this.item = new PreventivoMedio();
  }

  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }
  // se utiliza para pintar la fila en memoria
  colores(item: any) {
    let color = '';

    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }

    return color;
  }

  //cancelar modificacion
  cancelarModificacion() {
    this.busqueda = '';
    this.item = new PreventivoMedio();
    this.mostrarBtnModif = false;
  }

  preDelete(item: PreventivoMedio) {
    this.item = new PreventivoMedio();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        item.medioNavigation.descripcion +
        '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.delete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Utils.showToas('Tu archivo esta seguro :)', 'warning');
      }
    });
  }

  async delete() {
    try {
      let res = await this.wsdl.doDelete(this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));

      if (result.code == 200) {
        this.item = new PreventivoMedio();
        this.obtenerDetalle();
        Utils.showToas('Eliminado exitosamente!', 'success');
      } else {
        Utils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      Utils.showToas('Excepción: ' + error.message, 'error');
    } finally {
    }
  }

  valor(item: any) {
    item = item;
    let valor = '';
    if (item) {
      valor = 'Si';
    }else{
      valor = 'No';
    }
    return valor;
  }

  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
