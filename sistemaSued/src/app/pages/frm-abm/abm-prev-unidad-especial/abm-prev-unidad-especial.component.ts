import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Preventivo,
  PrevUnidadEspecial,
  UnidadesSued,
} from 'src/app/models/index.models';
import {
  PrevUnidadEspecialService,
  UnidadService,
} from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilAutocompletadoUnidadSuedComponent } from '../../component/fil-autocompletado-unidad-sued/fil-autocompletado-unidad-sued.component';

@Component({
  selector: 'app-abm-prev-unidad-especial',
  templateUrl: './abm-prev-unidad-especial.component.html',
  styleUrls: ['./abm-prev-unidad-especial.component.scss'],
})
export class AbmPrevUnidadEspecialComponent implements OnInit {
  @ViewChild(FilAutocompletadoUnidadSuedComponent, { static: false }) fil!: FilAutocompletadoUnidadSuedComponent;
  
  @Input()
  public id: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  busqueda;
  idSeleccion!: number;

  prev: Preventivo;
  prevCad: PrevUnidadEspecial;

  item: PrevUnidadEspecial;
  items: PrevUnidadEspecial[];

  mostrarBtnModif: boolean;
  guardando: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PrevUnidadEspecialService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevUnidadEspecial();
    this.items = [];
    this.prev = new Preventivo();
    this.prevCad = new PrevUnidadEspecial();
    this.busqueda = '';
    this.guardando = false;
    this.mostrarBtnModif = false;
    this.id = 0;
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
          this.idSeleccion = result.dato.id;
          this.item.nombreUnidad = result.dato.unidadEspNavigation.nombre;
          this.mostrarBtnModif = true;
        }
      } catch (error) {}
    }
  }

  async actualizarDatos(obj: PrevUnidadEspecial) {
    this.guardando = true;
    try {
      let data = await this.wsdl.doUpdate(this.item.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        this.idSeleccion = 0;
        this.mostrarBtnModif = false;
        this.item = new PrevUnidadEspecial();
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

  async guardar() {
    this.guardando = true;
    this.item.preventivo = this.id;
    if (this.item.unidadEspecial > 0) {
      try {
        let data = await this.wsdl.doInsert(this.item).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.guardando = false;
          this.item = new PrevUnidadEspecial();
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
      this.guardando = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese unidad interviniente!'
      })
    }
  }

  //cancelar modificacion
  cancelarModificacion() {
    this.item = new PrevUnidadEspecial();
    this.mostrarBtnModif = false;
  }

  preDelete(item: PrevUnidadEspecial) {
    this.item = new PrevUnidadEspecial();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        item.unidadEspNavigation.nombre +
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
        this.item = new PrevUnidadEspecial();
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

  unidad(event: UnidadesSued) {
    this.item.unidadEspecial = event.id;
    this.item.nombreUnidad = event.nombre;
  }

  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
