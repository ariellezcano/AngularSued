import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
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
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilBuscadorLocalidadComponent } from '../../component/fil-buscador-localidad/fil-buscador-localidad.component';
import { FilBuscadorCalleComponent } from '../../component/fil-buscador-calle/fil-buscador-calle.component';
import { results } from 'src/app/models/resultsCoordenada';

@Component({
  selector: 'app-abm-preventivo',
  templateUrl: './abm-preventivo.component.html',
  styleUrls: ['./abm-preventivo.component.scss'],
})
export class AbmPreventivoComponent implements OnInit {
  @ViewChild(FilBuscadorLocalidadComponent, { static: false })
  filLocalidad!: FilBuscadorLocalidadComponent;
  @ViewChild(FilBuscadorCalleComponent, { static: false })
  filCalleInterseccion!: FilBuscadorCalleComponent;

  @ViewChild('close') cerrar!: ElementRef;

  @Input()
  public id!: number;

  @Output()
  latitud?: string;
  @Output()
  longitud?: string;

  // lstCoordenadas: results[];
  // seleccionCoordenada: results;

  map: boolean;
  //public id!: number;
  //valida el formulario
  form!: FormGroup;
  //imput filtros
  busqueda;
  busquedaLugar;
  busquedaCalle;
  busquedaCalleInterseccion;
  busquedaBarrio;
  //variable para verificar si fue enviado los datos
  enviado: boolean = false;
  automatico: boolean;
  manual: boolean;

  googleMaps: boolean;
  //variable para cortar la coordenada
  coordenadas: string;

  item: Preventivo;

  ditems: Delito[];
  ditem: Delito;

  lugarItems: Lugar[];
  litem: Lugar;

  CItems: Calle[];
  Citem: Calle;

  CItemsInters: Calle[];
  cItemInt: Calle;

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
    private formBuilder: FormBuilder,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('es'); //fecha en español, datepicker
    this.item = new Preventivo();
    this.busqueda = '';
    this.busquedaLugar = '';
    this.busquedaCalle = '';
    this.busquedaCalleInterseccion = '';
    this.busquedaBarrio = '';
    this.latitud = '';
    this.longitud = '';
    this.coordenadas = '';
    //this.lstCoordenadas = [];
    this.ditems = [];
    this.ditem = new Delito();
    this.lugarItems = [];
    this.litem = new Lugar();
    this.CItems = [];
    this.Citem = new Calle();
    this.CItemsInters = [];
    this.cItemInt = new Calle();
    this.BItems = [];
    this.Bitem = new Barrio();
    //this.seleccionCoordenada = new results();
    this.map = false;
    this.googleMaps = true;
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
          //console.log('this.itemPreventivo', this.item);
          if (this.item.fechaHecho != undefined) {
            this.item.fechaHecho = moment(this.item.fechaHecho).format(
              'DD-MM-YYYY'
            );
          }
          if (this.item.fechaPreventivo != undefined) {
            this.item.fechaPreventivo = moment(
              this.item.fechaPreventivo
            ).format('DD-MM-YYYY');
          }
          if (this.item.barrio != undefined) {
            this.busquedaBarrio = this.item.barrioNavigation?.nombre;
          }
          if (this.item.delito != undefined) {
            this.busqueda = this.item.delitoNavigation?.descripcion;
          }
          if (this.item.lugar != undefined) {
            this.busquedaLugar = this.item.lugarNavigation?.descripcion;
          }
          if (this.item.calle != undefined) {
            this.busquedaCalle = this.item.calleNavigation?.nombre;
            this.Citem.nombre = this.item.calleNavigation?.nombre;
          }
          if (this.item.calleInterseccion != undefined) {
            this.busquedaCalleInterseccion =
              this.item.calleInterseccionNavigation?.nombre;
            this.cItemInt.nombre =
              this.item.calleInterseccionNavigation?.nombre;
          }
          if (this.item.unidad != undefined) {
            this.item.nombreUnidad = this.item.unidadNavigation.nombre;
          }
          if (this.item.localidad != undefined) {
            //this.item.localidad = result.dato.Localidad;
            this.item.localidadCoordenada =
              this.item.localidadNavigation?.nombre;
            this.item.pais =
              this.item.localidadNavigation?.nacionNavigation?.nacion;
            this.item.cp = this.item.localidadNavigation?.codPostal;
            //this.filLocalidad.busqueda = this.item.localidadNavigation?.nombre;
          }
        }
      } catch (error) {
        Swal.fire(`Error al obtener los datos, ${error}`);
      }
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

  dividirFecha(){
    if(this.item.fechaPreventivo != undefined){
      const dia = this.item.fechaPreventivo.getFullYear();
      this.item.anio = dia;
    }
  }

  async actualizarDatos(obj: Preventivo) {
    if (this.item.fechaPreventivo != undefined) {
      this.item.fechaPreventivo = moment(
        this.item.fechaPreventivo,
        'DD/MM/YYYY'
      );
      console.log(this.item.fechaPreventivo);
    }

    if (this.item.fechaHecho != undefined) {
      this.item.fechaHecho = moment(this.item.fechaHecho, 'DD/MM/YYYY');
    }
    this.item.usuarioModifica = Number(UturuncoUtils.getSession('user'));
    try {
      let data = await this.wsdl.doUpdate(this.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
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

  async guardar() {
    if (
      this.item.unidad != undefined &&
      this.item.anio != undefined &&
      this.item.nro != undefined &&
      this.item.fechaPreventivo != undefined &&
      this.item.hora != undefined &&
      this.item.delito != undefined
    ) {
      if (
        Date.parse(this.item.fechaPreventivo) >=
        Date.parse(this.item.fechaHecho)
      ) {
        this.item.usuarioCrea = Number(UturuncoUtils.getSession('user'));
        //console.log("usuario crea", this.item.usuarioCrea)
        //var
        let hora = moment(this.item.hora, 'h:mm:ss A').format('HH:mm');
        //var convert = hora;
        //var Format = hora.replace(/[:]/g, '');
        this.item.hora = hora;

        // console.log(this.item);

        try {
          let data = await this.wsdl.doInsert(this.item).then();
          const result = JSON.parse(JSON.stringify(data));
          if (result.code == 200) {
            let idPreventivo: number = result.dato.id;
            this.linkearDetalle(idPreventivo);
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
          icon: 'warning',
          title: 'Oops...',
          text: 'Verifique fechas cargadas!',
          footer:
            '<CENTER><label><b>La fecha del hecho debe ser anterior o igual a la fecha del Preventivo. </b></label></CENTER>',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo validar los datos ingresados!',
        footer:
          '<CENTER><label><b>Recuerde que los datos obligatorios son: UNIDAD, AÑO, NRO., FECHA PREVENTIVO, HORA Y DELITO. </b></label></CENTER>',
      });
    }
  }

  async filtrarDelito() {
    this.ditems = [];
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdlDelito.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          Swal.fire(
            'Búsqueda realizada correctamente!',
            'Seleccione el dato encontrado del campo seleccionable!',
            'success'
          )
          this.ditems = result.data;
        } else if (result.code == 204) {
          Swal.fire({
            icon: 'warning',
            text: 'Verifique el dato ingresado!',
            footer: '<b>No existe la búsqueda realizada...</b>',
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Hubo un error al filtrar el dato!',
        //footer: '<b>No existe la búsqueda realizada...</b>',
      });
    }
  }

  capturar(event: Delito) {
    if (event != undefined) {
      this.item.delito = event.id;
      this.busqueda = event.descripcion;
    }
  }

  async filtrarLugar() {
    this.lugarItems = [];
    try {
      if (this.busquedaLugar != '' && this.busquedaLugar != undefined) {
        let data = await this.wsdlLugar.doFilter(this.busquedaLugar).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          Swal.fire(
            'Búsqueda realizada correctamente!',
            'Seleccione el dato encontrado del campo seleccionable!',
            'success'
          )
          this.lugarItems = result.data;
        } else if (result.code == 204) {
          Swal.fire({
            icon: 'warning',
            text: 'Verifique el dato ingresado!',
            footer: '<b>No existe la búsqueda realizada...</b>',
          });
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

  opcCalle = {
    individual: 'individual',
    interseccion: 'interseccion',
  };

  async filtrarCalle(tipoCalle: string) {
    let criterio = '';
    if (tipoCalle == this.opcCalle.individual) {
      this.CItems = [];
      criterio = this.busquedaCalle;
    } else if (tipoCalle == this.opcCalle.interseccion) {
      this.CItemsInters = [];
      criterio = this.busquedaCalleInterseccion;
    }
    try {
      if (criterio != '' && criterio != undefined) {
        let data = await this.wsdlCalle.doFilter(criterio).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          Swal.fire(
            'Búsqueda realizada correctamente!',
            'Seleccione el dato encontrado del campo seleccionable!',
            'success'
          )
          if (tipoCalle == this.opcCalle.individual) {
            this.CItems = result.data;
          } else if (tipoCalle == this.opcCalle.interseccion) {
            this.CItemsInters = result.data;
          }
        } else if (result.code == 204) {
          Swal.fire({
            icon: 'warning',
            text: 'Verifique el dato ingresado!',
            footer: '<b>No existe la búsqueda realizada...</b>',
          });
        }
      }
    } catch (error) {
      Swal.fire('Error al obtener el dato');
    }
  }

  //calle individual
  capturarCalle(event: Calle) {
    if (event != undefined) {
      this.item.calle = event.id;
      this.busquedaCalle = event.nombre;
    }
  }
  //calle interseccion
  capturarCalleInterseccion(event: Calle) {
    if (event != undefined) {
      this.item.calleInterseccion = event.id;
      this.busquedaCalleInterseccion = event.nombre;
    }
  }

  async filtrarBarrio() {
    //console.log(this.item.barrio)
    this.BItems = [];
    try {
      if (this.busquedaBarrio != '' && this.busquedaBarrio != undefined) {
        let data = await this.wsdlBarrio.doFilter(this.busquedaBarrio).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          Swal.fire(
            'Búsqueda realizada correctamente!',
            'Seleccione el dato encontrado del campo seleccionable!',
            'success'
          )
          this.BItems = result.data;
        } else if (result.code == 204) {
          // this.item.barrio = 0;
          Swal.fire({
            icon: 'warning',
            text: 'Verifique el dato ingresado!',
            footer: '<b>No existe la búsqueda realizada...</b>',
          });
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

  //seleccion localidad es del combo
  // seleccionLocalidad(event: Localidad) {
  //   this.item.localidadCoordenada = '';
  //   this.item.cp = '';
  //   this.item.pais = '';
  //   if (event != undefined) {
  //     this.item.localidad = event.id;
  //     this.item.localidadCoordenada = event.nombre;
  //     this.item.cp = event.codPostal;
  //     this.item.pais = event.nacionNavigation?.nacion;
  //   }
  // }

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
        //console.log(result.result);
        //if (result.results == 1) {
        this.item.latitud = '';
        this.item.longitud = '';
        this.latitud = '';
        this.longitud = '';
        this.item.latitud = result.results[0].lat;
        this.latitud = this.item.latitud;
        this.item.longitud = result.results[0].lon;
        this.longitud = this.item.longitud;
        this.map = true;
        // } else {
        //   this.lstCoordenadas = result.results;
        // }
      }
    } catch (error) {
      Swal.fire('Error al obtener el dato');
    }
  }

  // capturarCoordenada(event: any) {
  //   this.seleccionCoordenada = event;
  //   this.item.latitud = '';
  //   this.item.longitud = '';
  //   this.latitud = '';
  //   this.longitud = '';
  //   this.item.latitud = this.seleccionCoordenada.results.lat;
  //   this.latitud = this.item.latitud;
  //   this.item.longitud = event.results.lon;
  //   this.longitud = this.item.longitud;
  //   this.map = true;
  // }

  async enviarCoordenadas() {
    try {
      if (this.item.latitud != undefined && this.item.longitud != undefined) {
        let data = await this.wsdlGeo
          .obtenerGeo(this.item.latitud, this.item.longitud)
          .then();
      } else {
        Swal.fire('Agregue coordenadas a buscar!');
      }
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

  cortarCadena() {
    if (this.coordenadas.length > 0) {
      let nombreJunto = this.coordenadas;
      let cadena = nombreJunto.split(/,/);
      this.item.latitud = cadena[0];
      this.item.longitud = cadena[1];
      this.coordenadas = '';
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Agregue coordenadas',
      });
    }
  }

  //captura localidad
  doFoundLocalidad(event: Localidad) {
    this.item.localidadCoordenada = '';
    this.item.cp = '';
    this.item.pais = '';
    if (event != undefined) {
      this.item.localidad = event.id;
      //alert(this.item.localidad);
      this.item.localidadCoordenada = event.nombre;
      this.item.cp = event.codPostal;
      this.item.pais = event.nacionNavigation?.nacion;
    }
    this.cerrar.nativeElement.click();
  }

  // unidadEspecial(event: UnidadesSued) {
  //   this.item.unidadEspecial = event.id;
  //   this.item.nombreUniEspecial = event.nombre;
  // }

  ActivarCasilla(num: number) {
    if (num == 1) {
      this.manual = true;
      this.automatico = false;
      this.map = false;
    } else if (num == 2) {
      this.manual = false;
      this.automatico = true;
    }
  }

  verMapa() {
    if (this.item.latitud != undefined && this.item.longitud != undefined) {
      this.googleMaps = false;
      this.latitud = this.item.latitud;
      this.longitud = this.item.longitud;
      this.map = true;
    }
  }

  ocultarMap() {
    this.map = false;
    this.googleMaps = true;
  }

  linkearDetalle(id: Number) {
    this.router.navigateByUrl('lst-preventivo/detalle/' + id);
  }

  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
