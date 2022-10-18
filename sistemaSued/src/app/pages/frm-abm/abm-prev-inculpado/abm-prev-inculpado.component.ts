import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Calle, Estudio, Localidad, Naciones, Ocupacion, Preventivo, PrevInculpado, Sexo } from 'src/app/models/index.models';
import { CalleService, NacionesService, OcupacionService, PreventivoService, PrevInculpadoService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-prev-inculpado',
  templateUrl: './abm-prev-inculpado.component.html',
  styleUrls: ['./abm-prev-inculpado.component.scss']
})
export class AbmPrevInculpadoComponent implements OnInit {

 
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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PrevInculpadoService,
    private wsdlPreventivo: PreventivoService,
    private wsdlOcupacion: OcupacionService,
    private wsdlNacionalidad: NacionesService,
    private wsdlCalle: CalleService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevInculpado();
    this.items = [];
    this.prev = new Preventivo();
    this.prevInc = new PrevInculpado();
    this.busqueda = '';
    this.busquedaOc = '';
    this.busquedaCalle = '';
    this.Nitem = new Naciones();
    this.Nitems = [];
    this.Oitem = new Ocupacion();
    this.Oitems = [];
    this.Citem = new Calle();
    this.CItems = [];
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
  //         this.obtenerDetalle()
  //       }
  //     } catch (error) {}
  //   }
  // }

  async obtenerDetalle() {
    try {
      let data = await this.wsdl.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      console.log("result", result);
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
    try {
      let data = await this.wsdl.doUpdate(this.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      console.log('result', result);
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

  async agregarDato() {
    for (let index = 0; index < this.items.length; index++) {
      this.prevInc = new PrevInculpado();
      this.prevInc = this.items[index];
      if (this.prevInc.id == undefined) {
        this.item = new PrevInculpado();
        this.item = this.prevInc;
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
      console.log("result", result);
      if (result.code == 200) {
        this.back();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato guardado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
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

//trae los datos para modificar
async traerDatos(id: number) {
  if (this.id > 0) {
    try {
      let data = await this.wsdl.getFindId(id).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        console.log(result.dato)
        this.item = result.dato;
        if(this.item.fechaDetencion != null){
          this.item.fechaDetencion = moment( this.item.fechaDetencion).format('YYYY-MM-DD');
        }
        this.idSeleccion = result.dato.id;
        this.busquedaOc = result.dato.ocupacionNavigation.descripcion;
        this.busqueda = result.dato.nacionalidadNavigation.nacionalidad;
        this.busquedaCalle = result.dato.calleNavigation.nombre;


        this.mostrarBtnModif = true;
      }
    } catch (error) {}
  }
}

//cancelar modificacion
cancelarModificacion() {
  this.busqueda = '';
  this.item = new PrevInculpado();
  this.mostrarBtnModif = false;
}

//filtra y captura nacionalidad
  async filtrarNacionalidad() {
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdlNacionalidad.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.Nitems = [];
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
    }
  }
  //filtra y captura ocupacion
  async filtrarOcupacion() {
    try {
      if (this.busquedaOc != '' && this.busquedaOc != undefined) {
        let data = await this.wsdlOcupacion.doFilter(this.busquedaOc).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.Oitems = [];
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
    }
  }

  //agrega fila en memoria
  addRow() {
    console.log("items en memoria", this.item);
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

  //filtro calle
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
//captura el dato
  capturarCalle(event: Calle) {
    if (event != undefined) {
      this.item.calle = event.id;
      this.busquedaCalle = event.nombre;
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
