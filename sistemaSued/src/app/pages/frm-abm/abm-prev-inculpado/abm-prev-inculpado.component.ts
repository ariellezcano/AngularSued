import { Call } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Barrio, Calle, Estudio, IdentidadGenero, Localidad, Naciones, Ocupacion, Preventivo, PrevInculpado, Provincia, Sexo } from 'src/app/models/index.models';
import { CalleService, NacionesService, OcupacionService, PreventivoService, PrevInculpadoService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilBuscadorBarrioComponent } from '../../component/fil-buscador-barrio/fil-buscador-barrio.component';
import { FilBuscadorCalleComponent } from '../../component/fil-buscador-calle/fil-buscador-calle.component';

@Component({
  selector: 'app-abm-prev-inculpado',
  templateUrl: './abm-prev-inculpado.component.html',
  styleUrls: ['./abm-prev-inculpado.component.scss']
})
export class AbmPrevInculpadoComponent implements OnInit {

  @ViewChild(FilBuscadorCalleComponent, { static: false }) filCalle!: FilBuscadorCalleComponent;
  @ViewChild(FilBuscadorBarrioComponent, { static: false }) filBarrio!: FilBuscadorBarrioComponent;
 
  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;
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
    private formBuilder: FormBuilder,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('es');//fecha en español, datepicker
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

  async actualizarDatos(obj: PrevInculpado) {
    if(this.item.fechaDetencion !== undefined){
      this.item.fechaDetencion = moment(this.item.fechaDetencion,"DD/MM/YYYY");
    }
    
    this.guardando = true;
    try {
      let data = await this.wsdl.doUpdate(obj.id, obj).then();
      //console.log(data)
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        this.idSeleccion=0;
        this.mostrarBtnModif=false;
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
        this.filBarrio.busqueda = '';
        this.filBarrio.item = new Barrio();
        this.filBarrio.items = [];
        this.filCalle.busqueda = '';
        this.filCalle.item = new Calle();
        this.filCalle.items = [];
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
    try {
      let data = await this.wsdl.doInsert(this.item).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        this.busqueda = '';
        this.busquedaOc = '';
        this.busquedaCalle = '';
        this.filBarrio.busqueda = '';
        this.filBarrio.item = new Barrio();
        this.filBarrio.items = [];
        this.filCalle.busqueda = '';
        this.filCalle.item = new Calle();
        this.filCalle.items = [];
        this.item = new PrevInculpado();
        this.obtenerDetalle()
      } else if(result.code == 204) {
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

//trae los datos para modificar
async traerDatos(id: number) {
  if (this.id > 0) {
    try {
      let data = await this.wsdl.getFindId(id).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.item = result.dato;
        this.mostrarBtnModif = true;
        //console.log("verificar datos", result.dato)
        this.idSeleccion = result.dato.id;
        if(this.item.fechaDetencion != null){
          this.item.fechaDetencion = moment( this.item.fechaDetencion).format('DD-MM-YYYY');
        }
        if(result.dato.ocupacion > 0){
          this.busquedaOc = result.dato.ocupacionNavigation?.descripcion;
        }
        if(result.dato.nacionalidad > 0){
          this.busqueda = result.dato.nacionalidadNavigation?.nacionalidad;
        }
        if(result.dato.dirCalle > 0){
          this.filCalle.busqueda = result.dato.dirCalleNavigation?.nombre;
        }
        if(result.dato.dirBarrio > 0){
          this.filBarrio.busqueda = result.dato.barrioNavigation?.nombre;
        }
        if(result.dato.provincia > 0){
          this.verificar = true;
        }
        if(result.dato.sexo > 0){
          this.verSexo = true;
        }
        if(result.dato.genero > 0){
          this.verGenero = true;
        }
        if(result.dato.vinculo > 0){
          this.verVinculo = true;
        }
        if(result.dato.estudios > 0){
          this.verEstudio = true;
        }
        if(result.dato.provDetencion > 0){
        this.verProv = true;
        }
        if(result.dato.localidad > 0){
          this.verLocalidad = true;
        }
        if(result.dato.calle > 0){
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
  this.filBarrio.busqueda = '';
  this.filBarrio.item = new Barrio();
  this.filBarrio.items = [];
  this.filCalle.busqueda = '';
  this.filCalle.item = new Calle();
  this.filCalle.items = [];
  this.item = new PrevInculpado();
  this.verificar = false;
  this.verSexo = false;
  this.verGenero = false;
  this.verVinculo = false;
  this.verEstudio = false;
  this.verProv = false;
  this.verLocalidad = false;
  this.mostrarBtnModif = false;
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

  //agrega fila en memoria
  addRow() {
    this.busqueda = '';
    this.busquedaOc = '';
    this.busquedaCalle = '';
    this.items.unshift(this.item);
    this.item = new PrevInculpado();
  }

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

  mayus(e: any) {
    e.value = e.value.toUpperCase();
  }

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
//captura el dato
  capturarCalle(event: Calle) {
    if (event != undefined) {
      this.item.calle = event.id;
      this.busquedaCalle = event.nombre;
      this.CItems = [];
    }
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
  //captura el dato del combo
  seleccionLocalidad(event: Localidad) {
    if (event != undefined) {
      this.item.localidad = event.id;
      this.item.capturaLocalidad = event.nombre;
    }
  }
  //captura el dato del combo
  seleccionProvincia(event: Provincia) {
    if (event != undefined) {
      this.item.provincia = event.id;
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
  doFoundCalle(event: Calle){
    this.item.dirCalle = event.id;
    this.item.capturadirCalle = event.nombre;
  }

  //captura el barrio
  doFoundBarrio(event: Barrio){
    this.item.dirBarrio = event.id;
    this.item.capturaBarrio = event.nombre;
  }

  //cambia el valor del booleano para mostrar en la vista
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
