import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { PrevAmpliacion, Preventivo } from 'src/app/models/index.models';
import {
  PrevAmpliacionService,
  PreventivoService,
} from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-prev-ampliacion',
  templateUrl: './abm-prev-ampliacion.component.html',
  styleUrls: ['./abm-prev-ampliacion.component.scss'],
})
export class AbmPrevAmpliacionComponent implements OnInit {
  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  busqueda;

  idSeleccion!: number;
  
  prev: Preventivo;
  prevAmp: PrevAmpliacion;

  item: PrevAmpliacion;
  items: PrevAmpliacion[];

  mostrarBtnModif: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PrevAmpliacionService,
    private wsdlPreventivo: PreventivoService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevAmpliacion();
    this.items = [];
    this.prev = new Preventivo();
    this.prevAmp = new PrevAmpliacion();
    this.busqueda = '';
    this.mostrarBtnModif = false;
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

  // async findId() {
  //   if (this.id > 0) {
  //     try {
  //       let data = await this.wsdlPreventivo.getFindId(this.id).then();
  //       const result = JSON.parse(JSON.stringify(data));
  //       if (result.code == 200) {
  //         this.prev = result.dato;
  //         this.obtenerDetalle();
  //       }
  //     } catch (error) {}
  //   }
  // }

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

  //trae los datos para modificar
  async traerDatos(id: number) {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
          this.idSeleccion = result.dato.id;
          if (this.item.fechaAmpliacion != undefined) {
            this.item.fechaAmpliacion = moment(
              this.item.fechaAmpliacion
            ).format('YYYY-MM-DD');
          }
          this.mostrarBtnModif = true;
        }
      } catch (error) {}
    }
  }

  async actualizarDatos(obj: PrevAmpliacion) {
    try {
      let data = await this.wsdl.doUpdate(this.item.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      console.log('result', result);
      if (result.code == 200) {
        //this.back();
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

  async agregarDato() {
    for (let index = 0; index < this.items.length; index++) {
      this.prevAmp = new PrevAmpliacion();
      this.prevAmp = this.items[index];
      if (this.prevAmp.id == undefined) {
        this.item = new PrevAmpliacion();
        this.item = this.prevAmp;
        this.guardar();
      }
    }
  }

  async guardar() {
    this.item.preventivo = this.id;
    console.log('items', this.item);
    try {
      let data = await this.wsdl.doInsert(this.item).then();
      const result = JSON.parse(JSON.stringify(data));
      console.log('result', result);
      if (result.code == 200) {
        //this.back();
        this.obtenerDetalle();
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: 'Dato guardado correctamente!',
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      } else if (result.code == 204) {
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

  //agrega fila en memoria
  addRow() {
    this.busqueda = '';
    this.items.unshift(this.item);
    this.item = new PrevAmpliacion();
  }

  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

  //cancelar modificacion
  cancelarModificacion() {
    this.item = new PrevAmpliacion();
    this.mostrarBtnModif = false;
  }

  // se utiliza para pintar la fila en memoria
  colores(item: PrevAmpliacion) {
    let color = '';

    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }

    return color;
  }

  //pregunta accion a realizar si quiere eliminar
  preDelete(item: PrevAmpliacion) {
    this.item = new PrevAmpliacion();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text: '¡No podrás recuperar este archivo ' + '!',
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

  //elimina el dato
  async delete() {
    try {
      let res = await this.wsdl.doDelete(this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        location.reload();
        Utils.showToas('Eliminado exitosamente!', 'success');
      } else {
        Utils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      Utils.showToas('Excepción: ' + error.message, 'error');
    } finally {
    }
  }

  //cambia valor booleano del preventivo
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

  //vuelve al listado de preventivo
  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
