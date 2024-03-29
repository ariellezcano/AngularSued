import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Modalidad,
  Preventivo,
  PrevModalidad,
  PrevObjeto,
} from 'src/app/models/index.models';
import {
  ModalidadService,
  PrevModalidadService,
} from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-prev-modalidad',
  templateUrl: './abm-prev-modalidad.component.html',
  styleUrls: ['./abm-prev-modalidad.component.scss'],
})
export class AbmPrevModalidadComponent implements OnInit {

  @ViewChild('closeModalidad') cerrarModal!: ElementRef;

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  busqueda;
  idSeleccion!: number;

  prev: Preventivo;
  prevMod: PrevModalidad;

  item: PrevModalidad;
  items: PrevModalidad[];

  Mitems: Modalidad[];
  Mitem: Modalidad;

  mostrarBtnModif: boolean;
  guardando: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PrevModalidadService,
    private wsdlModalidad: ModalidadService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevModalidad();
    this.items = [];
    this.prev = new Preventivo();
    this.prevMod = new PrevModalidad();
    this.busqueda = '';
    this.Mitem = new Modalidad();
    this.Mitems = [];
    this.mostrarBtnModif = false;
    this.guardando = false;
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
  //         this.obtenerDetalle()
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

  async actualizarDatos(obj: PrevModalidad) {
    this.guardando = true;
    try {
      let data = await this.wsdl.doUpdate(this.item.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        this.idSeleccion = 0;
        this.mostrarBtnModif = false;
        this.busqueda = '';
        this.item = new PrevModalidad();
        this.obtenerDetalle();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato actualizado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.code == 204) {
        this.guardando = false;
      }
    } catch (error) {
      this.guardando = false;
    }
  }

  async agregarDato() {
    for (let index = 0; index < this.items.length; index++) {
      this.prevMod = new PrevModalidad();
      this.prevMod = this.items[index];
      if (this.prevMod.id == undefined) {
        this.item = new PrevModalidad();
        this.item = this.prevMod;
        this.guardar();
      }
    }
  }

  async guardar() {
    if (this.item.modalidad !== undefined) {
      this.guardando = true;
      this.item.preventivo = this.id;
      try {
        let data = await this.wsdl.doInsert(this.item).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.guardando = false;
          this.busqueda = '';
          this.Mitems = [];
          this.item = new PrevModalidad();
          this.obtenerDetalle();
        } else if (result.code == 204) {
          this.guardando = false;
          Swal.fire({
            icon: 'info',
            title: 'Alerta...',
            text: 'El dato ya existe en la base de datos',
          });
        }
      } catch (error) {
        this.guardando = false;
        Swal.fire({
          icon: 'error',
          title: 'Alerta...',
          text: 'No se pudo insertar los datos',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe ingresar datos a guardar!',
        footer: '<b>DATO REQUERIDO: "MODALIDAD"</b>',
      });
    }
  }

  //trae los datos para modificar
  async traerDatos(id: number) {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
          this.idSeleccion = result.dato.id;
          this.busqueda = result.dato.modalidadNavigation.descripcion;
          this.mostrarBtnModif = true;
        }
      } catch (error) {}
    }
  }

  async filtrarModalidad() {
    this.Mitems = [];
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdlModalidad.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.Mitems = result.data;
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

  capturar(event: Modalidad) {
    if (event != undefined) {
      this.busqueda = event.descripcion;
      this.item.modalidad = event.id;
      this.item.capturaDescripcion = event.descripcion;
      this.item.codigo = event.codigo;
      
    }
    this.cerrarModal.nativeElement.click();
  }

  //agrega fila en memoria
  addRow() {
    this.busqueda = '';
    this.items.unshift(this.item);
    this.item = new PrevModalidad();
  }

  //cancelar modificacion
  cancelarModificacion() {
    this.busqueda = '';
    this.item = new PrevModalidad();
    this.mostrarBtnModif = false;
  }

  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

  // se utiliza para pintar la fila en memoria
  colores(item: PrevModalidad) {
    let color = '';
    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }
    return color;
  }

  preDelete(item: PrevModalidad) {
    this.item = new PrevModalidad();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        item.modalidadNavigation.descripcion +
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
        this.item = new PrevModalidad();
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
    } else {
      valor = 'No';
    }
    return valor;
  }

  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
