import { Component, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import {
  Barrio,
  Calle,
  Delito,
  Localidad,
  Lugar,
  Preventivo,
  UnidadesSued,
} from 'src/app/models/index.models';
import {
  BarrioService,
  CalleService,
  DelitoService,
  GeolocalizacionService,
  LugarService,
  PreventivoService,
} from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-preventivo',
  templateUrl: './abm-preventivo.component.html',
  styleUrls: ['./abm-preventivo.component.scss'],
})
export class AbmPreventivoComponent implements OnInit {
  @Output()
  latitud?: string;
  @Output()
  longitud?: string;

  map: boolean;
  public id!: number;
  //valida el formulario
  form!: FormGroup;
  //imput filtros
  busqueda;
  busquedaLugar;
  busquedaCalle;
  busquedaBarrio;
  //variable para verificar si fue enviado los datos
  enviado: boolean = false;
  automatico: boolean;
  manual: boolean;

  item!: Preventivo;

  ditems: Delito[];
  ditem: Delito;

  lugarItems: Lugar[];
  litem: Lugar;

  CItems: Calle[];
  Citem: Calle;

  BItems: Barrio[];
  Bitem: Barrio;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdlGeo: GeolocalizacionService,
    private wsdl: PreventivoService,
    private wsdlLugar: LugarService,
    private wsdlDelito: DelitoService,
    private wsdlCalle: CalleService,
    private wsdlBarrio: BarrioService,
    private formBuilder: FormBuilder
  ) {
    this.item = new Preventivo();
    this.busqueda = '';
    this.busquedaLugar = '';
    this.busquedaCalle = '';
    this.busquedaBarrio = '';
    this.latitud = '';
    this.longitud = '';
    this.ditems = [];
    this.ditem = new Delito();
    this.lugarItems = [];
    this.litem = new Lugar();
    this.CItems = [];
    this.Citem = new Calle();
    this.BItems = [];
    this.Bitem = new Barrio();
    this.map = false;
    this.automatico = false;
    this.manual = true;
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      //codigo: ['', Validators.required],
      //descripcion: ['', Validators.required],
    });

    //captura el id que viene en el url
    this.id = this.route.snapshot.params['id'];
    this.findId();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async findId() {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(this.id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
          if (this.item.fechaHecho != undefined) {
            this.item.fechaHecho = moment(this.item.fechaHecho).format(
              'YYYY-MM-DD'
            );
          }
          if (this.item.fechaPreventivo != undefined) {
            this.item.fechaPreventivo = moment(
              this.item.fechaPreventivo
            ).format('YYYY-MM-DD');
          }
          if (this.item.barrio != undefined) {
            this.busquedaBarrio = this.item.barrioNavigation.nombre;
          }
          if (this.item.delito != undefined) {
            this.busqueda = this.item.delitoNavigation.descripcion;
          }
          if (this.item.lugar != undefined) {
            this.busquedaLugar = this.item.lugarNavigation.descripcion;
          }
          if (this.item.calle != undefined) {
            this.busquedaCalle = this.item.calleNavigation.nombre;
            this.Citem.nombre = this.item.calleNavigation.nombre;
          }
          if(this.item.unidad != undefined){
            this.item.nombreUnidad = this.item.unidadNavigation.nombre;
          }
          if(this.item.localidad != undefined){
            this.item.localidadCoordenada = this.item.localidadNavigation?.nombre;
            this.item.pais = this.item.localidadNavigation?.nacionNavigation?.nacion;
            this.item.cp = this.item.localidadNavigation?.codPostal;
          }
          if(this.item.unidadEspecial != undefined){
            this.item.nombreUniEspecial = this.item?.unidadEspecialNavigation?.nombre;
          }
        }
      } catch (error) {}
    }
  }

  // doAction() {
  //   this.enviado = true;
  //   //if (this.form.valid) {
  //   if (this.id > 0) {
  //     this.actualizarDatos(this.item);
  //   } else {
  //     this.guardar();
  //   }
  //   //}
  // }

  async actualizarDatos(obj: Preventivo) {
    alert(this.item.calle);
    try {
      let data = await this.wsdl.doUpdate(this.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.back();
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

  async guardar() {
    if (
      this.item.unidad != undefined &&
      this.item.anio != undefined &&
      this.item.nro != undefined &&
      this.item.fechaPreventivo != undefined &&
      this.item.hora != undefined &&
      this.item.delito != undefined
    ) {
      var hora = moment(this.item.hora, 'h:mm:ss A').format('HH:mm');
      //var convert = hora;
      //var Format = hora.replace(/[:]/g, '');
      this.item.hora = hora;

      console.log(this.item);

      try {
        let data = await this.wsdl.doInsert(this.item).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.back();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Dato guardado correctamente!',
            showConfirmButton: false,
            timer: 1500,
          });
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo validar los datos ingresados!',
        footer: '<CENTER><label><b>Recuerde que los datos obligatorios son: UNIDAD, AÑO, NRO., FECHA PREVENTIVO, HORA Y DELITO. </b></label></CENTER>'
      })
    }
  }

  async filtrarDelito() {
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdlDelito.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.ditems = [];
          this.ditems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la busqueda realizada');
        }
      }
    } catch (error) {}
  }

  capturar(event: Delito) {
    if (event != undefined) {
      this.item.delito = event.id;
      this.busqueda = event.descripcion;
    }
  }

  async filtrarLugar() {
    try {
      if (this.busquedaLugar != '' && this.busquedaLugar != undefined) {
        let data = await this.wsdlLugar.doFilter(this.busquedaLugar).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.lugarItems = [];
          this.lugarItems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la búsqueda realizada');
        }
      }
    } catch (error) {
      Swal.fire('Error al obtener el dato');
    }
  }

  capturarLugar(event: Lugar) {
    if (event != undefined) {
      this.item.lugar = event.id;
      this.busquedaLugar = event.descripcion;
    }
  }

  async filtrarCalle() {
    try {
      if (this.busquedaCalle != '' && this.busquedaCalle != undefined) {
        let data = await this.wsdlCalle.doFilter(this.busquedaCalle).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.CItems = [];
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
    }
  }

  async filtrarBarrio() {
    try {
      if (this.busquedaBarrio != '' && this.busquedaBarrio != undefined) {
        let data = await this.wsdlBarrio.doFilter(this.busquedaBarrio).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.BItems = [];
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
    }
  }

  seleccionLocalidad(event: Localidad) {
    this.item.localidadCoordenada = '';
    this.item.cp = '';
    this.item.pais = '';
    if (event != undefined) {
      this.item.localidad = event.id;
      this.item.localidadCoordenada = event.nombre;
      this.item.cp = event.codPostal;
      this.item.pais = event.nacionNavigation?.nacion;
    }
  }

  async buscarCoordenadas() {
    this.map = false;
    try {
      let data = await this.wsdlGeo
        .geolocalizacion(
          this.Citem.nombre,
          this.item.dirNro,
          this.item.cp,
          this.item.localidadCoordenada,
          this.item.pais
        )
        .then();
      const result = JSON.parse(JSON.stringify(data));
      console.log(result);
      if (result.results != undefined) {
        this.item.latitud = '';
        this.item.longitud = '';
        this.latitud = '';
        this.longitud = '';
        this.item.latitud = result.results[0].lat;
        this.latitud = this.item.latitud;
        this.item.longitud = result.results[0].lon;
        this.longitud = this.item.longitud;
        this.map = true;
      }
    } catch (error) {
      Swal.fire('Error al obtener el dato');
    }
  }

  async enviarCoordenadas() {
    try {
      let data = await this.wsdlGeo
        .obtenerGeo(this.item.latitud, this.item.longitud)
        .then();
      //const result = JSON.parse(JSON.stringify(data));
    } catch (error) {
      if (
        this.latitud == undefined ||
        (this.latitud == '' && this.longitud == undefined) ||
        this.longitud == ''
      ) {
        Swal.fire('No se pudo capturar el dato');
      }
    }
  }

  unidad(event: UnidadesSued) {
    this.item.unidad = event.id;
    this.item.nombreUnidad = event.nombre;
  }

  unidadEspecial(event: UnidadesSued) {
    this.item.unidadEspecial = event.id;
    this.item.nombreUniEspecial = event.nombre;
  }

  ActivarCasilla(num: number){
    if(num == 1){
      this.manual = true;
      this.automatico = false;
      this.map = false;
    }else if(num == 2){
      this.manual = false;
      this.automatico = true;
    }
  }

  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
