import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Barrio,
  Calle,
  Estudio,
  IdentidadGenero,
  Naciones,
  Ocupacion,
  Preventivo,
  PrevVictima,
  Provincia,
  Sexo,
} from 'src/app/models/index.models';
import {
  BarrioService,
  CalleService,
  NacionesService,
  OcupacionService,
  PreventivoService,
  PrevVictimaService,
} from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-pre-victima',
  templateUrl: './abm-pre-victima.component.html',
  styleUrls: ['./abm-pre-victima.component.scss'],
})
export class AbmPreVictimaComponent implements OnInit {

  @Output() emmitProvincia: EventEmitter<Provincia> = new EventEmitter();

  public id!: number;

  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;
  //habilita campos al modificar "muestra los datos guardados en bd"
  verSexo: boolean;
  verGenero: boolean;
  verEstudio: boolean;
  verProvincia: boolean;
  //input de busqueda de los filtros
  busqueda;
  busquedaOc;
  busquedaBarrio;
  busquedaCalle;

  idSeleccion!: number;
  //vista previa del preventivo
  prev: Preventivo;
  prevVic: PrevVictima;

  //Se usa para la carga en tabla de prevVictima
  item: PrevVictima;
  items: PrevVictima[];

  //ocupado en el filtro naciones
  Nitems: Naciones[];
  Nitem: Naciones;

  //se ocupa para el filtro calle
  CItems: Calle[];
  Citem: Calle;

  BItems: Barrio[];
  Bitem: Barrio;

  //ocupado en el filtro ocupacion
  Oitems: Ocupacion[];
  Oitem: Ocupacion;

  mostrarBtnModif: boolean;
  guardando: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PrevVictimaService,
    private wsdlPreventivo: PreventivoService,
    private wsdlOcupacion: OcupacionService,
    private wsdlNacionalidad: NacionesService,
    private wsdlBarrio: BarrioService,
    private wsdlCalle: CalleService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevVictima();
    this.items = [];
    this.prev = new Preventivo();
    this.prevVic = new PrevVictima();
    this.busqueda = '';
    this.busquedaOc = '';
    this.busquedaBarrio = '';
    this.busquedaCalle = '';
    this.Nitem = new Naciones();
    this.Nitems = [];
    this.Oitem = new Ocupacion();
    this.Oitems = [];
    this.Bitem = new Barrio();
    this.BItems = [];
    this.Citem = new Calle();
    this.CItems = [];
    this.mostrarBtnModif = false;
    this.guardando = false;
    this.verSexo = false;
    this.verGenero = false;
    this.verEstudio = false;
    this.verProvincia = false;
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
          if (
            result.dato.delitoNavigation?.id == 1 ||
            result.dato.delitoNavigation?.id == 2 ||
            result.dato.delitoNavigation?.id == 5 ||
            result.dato.delitoNavigation?.id == 6
          ) {
            this.item.fallecio = true;
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

  async actualizarDatos(obj: PrevVictima) {
    this.guardando = true;
    try {
      let data = await this.wsdl.doUpdate(obj.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        //this.back();
        this.guardando = false;
        this.idSeleccion = 0;
        this.mostrarBtnModif = false;
        this.verEstudio = false;
        this.verGenero = false;
        this.verProvincia = false;
        this.verSexo = false;
        this.busqueda = '';
        this.busquedaOc = '';
        this.busquedaBarrio = '';
        this.busquedaCalle = '';
        this.item = new PrevVictima();
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
  //     this.prevVic = new PrevVictima();
  //     this.prevVic = this.items[index];
  //     if (this.prevVic.id == undefined) {
  //       this.item = new PrevVictima();
  //       this.item = this.prevVic;
  //       this.guardar();
  //     }
  //   }
  // }

  async guardar() {
    this.guardando = true;
    this.item.preventivo = this.id;
    try {
      let data = await this.wsdl.doInsert(this.item).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        this.busquedaBarrio = '';
        this.busquedaCalle = '';
        this.busqueda = '';
        this.busquedaOc = '';
        this.item = new PrevVictima();
        this.obtenerDetalle();
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: 'Dato guardado correctamente!',
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
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
  }

  //trae los datos para modificar de la tabla de victimas
  async traerDatos(id: number) {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
          //console.log("victimas",this.item);
          this.idSeleccion = result.dato.id;
          this.mostrarBtnModif = true;

          //console.log("id seleccionado y btn", this.idSeleccion, this.mostrarBtnModif)
          
          if (this.item.nacionalidad > 0) {
            this.busqueda = result.dato.nacionNavigation.nacionalidad;
          }
          if (this.item.ocupacion > 0) {
            this.busquedaOc = result.dato.ocupacionNavigation.descripcion;
          }
          if (this.item.barrio > 0) {
            //console.log("barrio tiene")
            this.busquedaBarrio = result.dato.barrioNavigation?.nombre;
          }
          if (this.item.calle > 0) {
            this.busquedaCalle = result.dato.calleNavigation?.nombre;
          }
          if (this.item.sexo > 0) {
            //console.log("RECUPERO SEXO PERSONA")
            //alert("ACTIVADO SEXO")
            this.item.capturaSexo = result.dato.sexoNavigation?.descripcion;
            this.verSexo = true;
          }
          if (this.item.genero > 0) {
            //console.log("RECUPERO GENERO")
            //alert("ACTIVADO GENERO")
            
            this.item.capturaGenero = result.dato.identidadNavigation?.autoPercepcion;
              this.verGenero = true;
            }
          if (this.item.estudios > 0) {
            this.item.capturaEstudio =
              result.dato.estudioNavigation?.descripcion;
              this.verEstudio = true;
            }
          if (this.item.provincia > 0) {
            //this.emmitProvincia.emit(this.item.provinciaNavigation);
            this.item.capturaProvincia =
              result.dato.provinciaNavigation?.nombre;
              this.verProvincia = true;
          }
          
        }
      } catch (error: any) {
        Swal.fire('Error al obtener los datos', error);
      }
    }
  }

  //filtra y captura nacionalidad
  async filtrarNacionalidad() {
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdlNacionalidad.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.Nitems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la busqueda realizada');
        }
      }
    } catch (error) {}
  }

  capturar(event: Naciones) {
    if (event != undefined) {
      this.busqueda = event.nacionalidad;
      this.item.nacionalidad = event.id;
      this.item.capturaNacionalidad = event.nacionalidad;
      this.Nitems = [];
    }
  }
  //filtra y captura ocupacion
  async filtrarOcupacion() {
    try {
      if (this.busquedaOc != '' && this.busquedaOc != undefined) {
        let data = await this.wsdlOcupacion.doFilter(this.busquedaOc).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.Oitems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la busqueda realizada');
        }
      }
    } catch (error) {}
  }

  capturarOc(event: Ocupacion) {
    if (event != undefined) {
      this.busquedaOc = event.descripcion;
      this.item.ocupacion = event.id;
      this.item.capturaOcupacion = event.descripcion;
      this.Oitems = [];
    }
  }

  //filtro calle
  async filtrarCalle() {
    try {
      if (this.busquedaCalle != '' && this.busquedaCalle != undefined) {
        let data = await this.wsdlCalle.doFilter(this.busquedaCalle).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.CItems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la búsqueda realizada');
        }
      }
    } catch (error) {
      Swal.fire('Error al obtener el dato');
    }
  }

  capturarCalle(event: Calle) {
    if (event != undefined) {
      this.item.calle = event.id;
      this.busquedaCalle = event.nombre;
      this.CItems = [];
    }
  }

  //filtro barrio
  async filtrarBarrio() {
    try {
      if (this.busquedaBarrio != '' && this.busquedaBarrio != undefined) {
        let data = await this.wsdlBarrio.doFilter(this.busquedaBarrio).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.BItems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la búsqueda realizada');
        }
      }
    } catch (error) {
      Swal.fire('Error al obtener el dato');
    }
  }

  capturarBarrio(event: Barrio) {
    if (event != undefined) {
      this.item.barrio = event.id;
      this.busquedaBarrio = event.nombre;
      this.BItems = [];
    }
  }

  //agrega fila en memoria
  // addRow() {
  //   this.busqueda = '';
  //   this.busquedaOc = '';
  //   this.items.unshift(this.item);
  //   this.item = new PrevVictima();
  // }

  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

  // se utiliza para pintar la fila en memoria
  colores(item: PrevVictima) {
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
    this.busquedaOc = '';
    this.busquedaBarrio = '';
    this.busquedaCalle = '';
    this.verEstudio = false;
    this.verGenero = false;
    this.verProvincia = false;
    this.verSexo = false;
    this.item = new PrevVictima();
    this.mostrarBtnModif = false;
  }

  preDelete(item: PrevVictima) {
    this.item = new PrevVictima();
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
        this.item = new PrevVictima();
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

  //captura el dato del combo
  seleccionSexo(event: Sexo) {
    if (event != undefined) {
      this.item.sexo = event.id;
      //this.item.capturaSexo = event.descripcion;
    }
  }
  //captura el dato del combo
  seleccionEstudio(event: Estudio) {
    if (event != undefined) {
      this.item.estudios = event.id;
      //this.item.capturaEstudio = event.descripcion;
    }
  }
  //captura el dato del combo
  seleccionIdentidad(event: IdentidadGenero) {
    if (event != undefined) {
      this.item.genero = event.id;
      //this.item.capturaGenero = event.autoPercepcion;
    }
  }

  //captura provincia
  seleccionProvincia(event: Provincia) {
    if (event != undefined) {
      this.item.provincia = event.id;
    }
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
