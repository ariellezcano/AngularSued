import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import {
  Barrio,
  Calle,
  Estudio,
  IdentidadGenero,
  Localidad,
  Naciones,
  Ocupacion,
  Preventivo,
  PrevInculpado,
  Provincia,
  Sexo,
  Vinculo,
} from 'src/app/models/index.models';
import {
  CalleService,
  NacionesService,
  OcupacionService,
  PreventivoService,
  PrevInculpadoService,
} from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { ComboEstudioComponent } from '../../component/combo-estudio/combo-estudio.component';
import { ComboIdentidadGeneroComponent } from '../../component/combo-identidad-genero/combo-identidad-genero.component';
import { ComboProvinciaComponent } from '../../component/combo-provincia/combo-provincia.component';
import { ComboSexoComponent } from '../../component/combo-sexo/combo-sexo.component';
import { ComboVinculoComponent } from '../../component/combo-vinculo/combo-vinculo.component';
import { FilBuscadorBarrioComponent } from '../../component/fil-buscador-barrio/fil-buscador-barrio.component';
import { FilBuscadorCalleComponent } from '../../component/fil-buscador-calle/fil-buscador-calle.component';
import { FilBuscadorLocalidadComponent } from '../../component/fil-buscador-localidad/fil-buscador-localidad.component';

@Component({
  selector: 'app-abm-prev-inculpado',
  templateUrl: './abm-prev-inculpado.component.html',
  styleUrls: ['./abm-prev-inculpado.component.scss'],
})
export class AbmPrevInculpadoComponent implements OnInit {
  @ViewChild(FilBuscadorCalleComponent, { static: false })
  filCalle!: FilBuscadorCalleComponent;
  @ViewChild(FilBuscadorBarrioComponent, { static: false })
  filBarrio!: FilBuscadorBarrioComponent;
  @ViewChild(FilBuscadorLocalidadComponent, { static: false })
  filLocalidad!: FilBuscadorLocalidadComponent;

  @ViewChild(ComboProvinciaComponent, { static: false })
  comboProvincia!: ComboProvinciaComponent;
  @ViewChild(ComboSexoComponent, { static: false })
  comboSexo!: ComboSexoComponent;
  @ViewChild(ComboIdentidadGeneroComponent, { static: false })
  comboGenero!: ComboIdentidadGeneroComponent;
  @ViewChild(ComboVinculoComponent, { static: false })
  comboVinculo!: ComboVinculoComponent;
  @ViewChild(ComboEstudioComponent, { static: false })
  comboEstudio!: ComboEstudioComponent;

  @ViewChild('closeNacion') cerrarNacion!: ElementRef;
  @ViewChild('closeBarr') cerrarBarr!: ElementRef;
  @ViewChild('closeCalleInc') cerrarCalleInc!: ElementRef;
  @ViewChild('closeOcupacion') cerrarOcup!: ElementRef;
  @ViewChild('closeLocalid') cerrarLocal!: ElementRef;
  @ViewChild('closeCall') cerrarCall!: ElementRef;
  
  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;
  dnpc: boolean;
  //boton
  mostrarBtnModif: boolean;
  //id seleccion tabla
  idSeleccion!: number;
  //input de busqueda de los filtros
  busqueda;
  busquedaOc;
  busquedaCalle;
  busquedaBarrio;
  verificar: Boolean;
  verSexo: boolean;
  verGenero: boolean;
  verVinculo: boolean;
  verEstudio: boolean;
  verProv: boolean;
  verLocalidad: boolean;
  //verificar
  //vista previa del preventivo
  prev: Preventivo;
  prevInc: PrevInculpado;

  //Se usa para la carga en tabla de prevVictima
  item: PrevInculpado;
  items: PrevInculpado[];

  //ocupado en el filtro naciones
  Nitems: Naciones[];
  Nitem: Naciones;

  //ocupado en el filtro calle
  CItems: Calle[];
  Citem: Calle;

  //ocupado en el filtro ocupacion
  Oitems: Ocupacion[];
  Oitem: Ocupacion;
  guardando: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PrevInculpadoService,
    private wsdlOcupacion: OcupacionService,
    private wsdlNacionalidad: NacionesService,
    private wsdlCalle: CalleService,
    private wsdlPreventivo: PreventivoService,
    private formBuilder: FormBuilder,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('es'); //fecha en español, datepicker
    this.item = new PrevInculpado();
    this.items = [];
    this.prev = new Preventivo();
    this.prevInc = new PrevInculpado();
    this.busqueda = '';
    this.busquedaOc = '';
    this.busquedaCalle = '';
    this.busquedaBarrio = '';
    this.verificar = false;
    this.verSexo = false;
    this.verGenero = false;
    this.verVinculo = false;
    this.verEstudio = false;
    this.verProv = false;
    this.verLocalidad = false;
    this.Nitem = new Naciones();
    this.Nitems = [];
    this.Oitem = new Ocupacion();
    this.Oitems = [];
    this.Citem = new Calle();
    this.CItems = [];
    this.mostrarBtnModif = false;
    this.guardando = false;
    this.dnpc = false;
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
    this.findId();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async findId() {
    if (this.id > 0) {
      try {
        let data = await this.wsdlPreventivo.getFindId(this.id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.prev = result.dato;
          if (this.prev.delitoNavigation?.id == 3) {
            this.dnpc = true;
          }
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

  async actualizarDatos(obj: PrevInculpado) {
    if (this.item.fechaDetencion !== undefined) {
      this.item.fechaDetencion = moment(this.item.fechaDetencion, 'DD/MM/YYYY');
    }
    this.guardando = true;
    try {
      let data = await this.wsdl.doUpdate(obj.id, obj).then();
      ////console.log(data)
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        this.idSeleccion = 0;
        this.mostrarBtnModif = false;
        this.verificar = false;
        this.verSexo = false;
        this.verGenero = false;
        this.verVinculo = false;
        this.verEstudio = false;
        this.verProv = false;
        this.verLocalidad = false;
        this.busqueda = '';
        this.busquedaCalle = '';
        this.busquedaOc = '';
        this.busquedaBarrio = '';
        // this.filBarrio.busqueda = '';
        // this.filBarrio.item = new Barrio();
        // this.filBarrio.items = [];
        // this.filCalle.busqueda = '';
        // this.filCalle.item = new Calle();
        // this.filCalle.items = [];
        // this.filLocalidad.busqueda = '';
        // this.filLocalidad.item = new Localidad();
        // this.filLocalidad.items = [];
        this.item = new PrevInculpado();
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

  // async agregarDato() {
  //   for (let index = 0; index < this.items.length; index++) {
  //     this.prevInc = new PrevInculpado();
  //     this.prevInc = this.items[index];
  //     if (this.prevInc.id == undefined) {
  //       this.item = new PrevInculpado();
  //       this.item = this.prevInc;
  //       this.guardar();
  //     }
  //   }
  // }

  async guardar() {
    this.guardando = true;
    this.item.preventivo = this.id;
    if(this.item.edad == undefined){
      this.item.edad = 0;
    }
    if(this.item.sexo == undefined){
      this.item.sexo = 5;
    }
    try {
      let data = await this.wsdl.doInsert(this.item).then();
      ////console.log("data", data)
      const result = JSON.parse(JSON.stringify(data));
      //console.log("res", result)
      if (result.code == "200") {
        //console.error("sin error", result.code)
        this.guardando = false;
        this.busqueda = '';
        this.busquedaOc = '';
        this.busquedaCalle = '';
        //this.filBarrio.busqueda = '';
        this.busquedaBarrio = '';
        // this.filBarrio.item = new Barrio();
        // this.filBarrio.items = [];
        // this.filCalle.busqueda = '';
        // this.filCalle.item = new Calle();
        // this.filCalle.items = [];
        // this.filLocalidad.busqueda = '';
        // this.filLocalidad.item = new Localidad();
        // this.filLocalidad.items = [];
        //this.comboProvincia.emitir.closed();
        this.comboProvincia.item = new Provincia();
        this.comboSexo.item = new Sexo();
        this.comboGenero.item = new IdentidadGenero();
        this.comboVinculo.item = new Vinculo();
        this.comboEstudio.item = new Estudio();

        this.item = new PrevInculpado();
        this.obtenerDetalle();
       } 
      //else if (result.code == 204) {
      //   this.guardando = false;
      //   Swal.fire({
      //     icon: 'info',
      //     title: 'Alerta...',
      //     text: 'El dato ya existe en la base de datos',
      //   });
      // }
    } catch (error) {
      console.error(error)
      this.guardando = false;
      Swal.fire({
        icon: 'error',
        title: 'Alerta...',
        text: 'No se pudo insertar los datos',
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
          this.mostrarBtnModif = true;
          ////console.log("verificar datos", result.dato)
          this.idSeleccion = result.dato.id;
          if (this.item.fechaDetencion != null) {
            this.item.fechaDetencion = moment(this.item.fechaDetencion).format(
              'DD-MM-YYYY'
            );
          }
          if (result.dato.ocupacion > 0) {
            this.busquedaOc = result.dato.ocupacionNavigation?.descripcion;
          }
          if (result.dato.nacionalidad > 0) {
            this.busqueda = result.dato.nacionalidadNavigation?.nacionalidad;
          }
          if (result.dato.dirCalle > 0) {
            this.item.capturadirCalle = result.dato.dirCalleNavigation?.nombre;
          }
          if (result.dato.dirBarrio > 0) {
            this.busquedaBarrio = result.dato.barrioNavigation?.nombre;
          }
          if (result.dato.provincia > 0) {
            this.verificar = true;
          }
          if (result.dato.sexo > 0) {
            this.verSexo = true;
          }
          if (result.dato.genero > 0) {
            this.verGenero = true;
          }
          if (result.dato.vinculo > 0) {
            this.verVinculo = true;
          }
          if (result.dato.estudios > 0) {
            this.verEstudio = true;
          }
          if (result.dato.provDetencion > 0) {
            this.verProv = true;
          }
          if (result.dato.localidad > 0) {
            this.item.capturaLocalidad =
              result.dato.localidadNavigation?.nombre;
            //this.verLocalidad = true;
          }
          if (result.dato.calle > 0) {
            this.busquedaCalle = result.dato.calleNavigation?.nombre;
          }
        }
      } catch (error) {}
    }
  }

  //cancelar modificacion
  cancelarModificacion() {
    this.busqueda = '';
    this.busquedaOc = '';
    this.busquedaCalle = '';
    this.busquedaBarrio = '';
    // this.filBarrio.busqueda = '';
    // this.filBarrio.item = new Barrio();
    // this.filBarrio.items = [];
    // this.filCalle.busqueda = '';
    // this.filCalle.item = new Calle();
    // this.filCalle.items = [];
    this.item = new PrevInculpado();
    // this.filLocalidad.busqueda = '';
    // this.filLocalidad.item = new Localidad();
    // this.filLocalidad.items = [];
    this.verificar = false;
    this.verSexo = false;
    this.verGenero = false;
    this.verVinculo = false;
    this.verEstudio = false;
    this.verProv = false;
    this.verLocalidad = false;
    this.mostrarBtnModif = false;
  }

  //captura localidad
  // doFoundLocalidad(event: Localidad){
  //   if (event != undefined) {
  //     this.item.localidad = event.id;
  //     //alert(this.item.localidad);
  //   }
  // }

  //filtra y captura nacionalidad
  // async filtrarNacionalidad() {
  //   this.Nitems = [];
  //   try {
  //     if (this.busqueda != '' && this.busqueda != undefined) {
  //       let data = await this.wsdlNacionalidad.doFilter(this.busqueda).then();
  //       const result = JSON.parse(JSON.stringify(data));
  //       if (result.code == 200) {
  //         this.Nitems = result.data;
  //       } else if (result.code == 204) {
  //         Swal.fire({
  //           icon: 'warning',
  //           text: 'Verifique el dato ingresado!',
  //           footer: '<b>No existe la búsqueda realizada...</b>'
  //         })
  //       }
  //     }
  //   } catch (error) {}
  // }

  capturar(event: Naciones) {
    if (event != undefined) {
      this.busqueda = event.nacionalidad;
      this.item.nacionalidad = event.id;
      this.item.capturaNacionalidad = event.nacionalidad;
    }
    this.cerrarNacion.nativeElement.click();
  }
  //filtra y captura ocupacion
  // async filtrarOcupacion() {
  //   this.Oitems = [];
  //   try {
  //     if (this.busquedaOc != '' && this.busquedaOc != undefined) {
  //       let data = await this.wsdlOcupacion.doFilter(this.busquedaOc).then();
  //       const result = JSON.parse(JSON.stringify(data));
  //       if (result.code == 200) {
  //         this.Oitems = result.data;
  //       } else if (result.code == 204) {
  //         Swal.fire({
  //           icon: 'warning',
  //           text: 'Verifique el dato ingresado!',
  //           footer: '<b>No existe la búsqueda realizada...</b>',
  //         });
  //       }
  //     }
  //   } catch (error) {}
  // }

  capturarOc(event: Ocupacion) {
    if (event != undefined) {
      this.busquedaOc = event.descripcion;
      this.item.ocupacion = event.id;
      this.item.capturaOcupacion = event.descripcion;
    }
    this.cerrarOcup.nativeElement.click();
  }

  //agrega fila en memoria
  // addRow() {
  //   this.busqueda = '';
  //   this.busquedaOc = '';
  //   this.busquedaCalle = '';
  //   this.items.unshift(this.item);
  //   this.item = new PrevInculpado();
  // }

  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

  // se utiliza para pintar la fila en memoria
  colores(item: PrevInculpado) {
    let color = '';

    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }

    return color;
  }

  // mayus(e: any) {
  //   e.value = e.value.toUpperCase();
  // }

  preDelete(item: PrevInculpado) {
    this.item = new PrevInculpado();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        // item.medioNavigation.descripcion +
        '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.busqueda = '';
        this.busquedaOc = '';
        this.busquedaCalle = '';
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
        this.item = new PrevInculpado();
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

  //filtro calle
  // async filtrarCalle() {
  //   this.CItems = [];
  //   try {
  //     if (this.busquedaCalle != '' && this.busquedaCalle != undefined) {
  //       let data = await this.wsdlCalle.doFilter(this.busquedaCalle).then();
  //       const result = JSON.parse(JSON.stringify(data));
  //       if (result.code == 200) {
  //         this.CItems = result.data;
  //       } else if (result.code == 204) {
  //         Swal.fire({
  //           icon: 'warning',
  //           text: 'Verifique el dato ingresado!',
  //           footer: '<b>No existe la búsqueda realizada...</b>',
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     Swal.fire('Error al obtener el dato');
  //   }
  // }
  //captura el dato
  capturarCalle(event: Calle) {
    if (event != undefined) {
      this.item.calle = event.id;
      this.busquedaCalle = event.nombre;
    }
    this.cerrarCall.nativeElement.click();
  }

  //captura el dato del combo
  seleccionSexo(event: Sexo) {
    if (event != undefined) {
      this.item.sexo = event.id;
      this.item.capturaSexo = event.descripcion;
    }
  }
  //captura el dato del combo
  seleccionEstudio(event: Estudio) {
    if (event != undefined) {
      this.item.estudios = event.id;
      this.item.capturaEstudio = event.descripcion;
    }
  }

  //captura el dato del combo
  seleccionIdentidad(event: IdentidadGenero) {
    if (event != undefined) {
      this.item.genero = event.id;
    }
  }

  //captura el dato del combo
  seleccionVinculo(event: Estudio) {
    if (event != undefined) {
      this.item.vinculo = event.id;
      this.item.capturaVinculo = event.descripcion;
    }
  }
  //captura el dato del filtro/combo
  seleccionLocalidad(event: Localidad) {
    if (event != undefined) {
      this.item.localidad = event.id;
      this.item.capturaLocalidad = event.nombre;
    }
    this.cerrarLocal.nativeElement.click();
  }
  //captura el dato del combo
  seleccionProvincia(event: Provincia) {
    if (event != undefined) {
      this.item.provincia = event.id;
      //alert(this.item.provincia)
      this.item.capturaProvincia = event.nombre;
    }
  }
  //seleccion provincia detencion
  seleccionProvDetencion(event: Provincia) {
    if (event != undefined) {
      this.item.provDetencion = event.id;
    }
  }
  //captura la calle
  doFoundCalle(event: Calle) {
    if(event != undefined){
      this.item.dirCalle = event.id;
      this.item.capturadirCalle = event.nombre;
    }
    this.cerrarCalleInc.nativeElement.click();
  }

  //captura el barrio
  doFoundBarrio(event: Barrio) {
    if (event != undefined) {
      this.item.dirBarrio = event.id;
      this.busquedaBarrio = event.nombre;
      //this.item.capturaBarrio = event.nombre;
    }
    this.cerrarBarr.nativeElement.click();
  }

  //cambia el valor del booleano para mostrar en la vista
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
