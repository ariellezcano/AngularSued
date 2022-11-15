import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ArmaMarca, MarcaMoto, ModeloMoto, ModeloVehiculo, Objeto, Preventivo, PrevObjArma, PrevObjAuto, PrevObjeto, PrevObjMoto } from 'src/app/models/index.models';
import { ObjetoService, PreventivoService, PrevMedArmaService, PrevObjAutoService, PrevObjetoArmaService, PrevObjetoService, PrevObjMotoService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilArmaComponent } from '../../component/fil-arma/fil-arma.component';
import { FilBuscadorModeloMotoComponent } from '../../component/fil-buscador-modelo-moto/fil-buscador-modelo-moto.component';
import { FilModeloAutoComponent } from '../../component/fil-modelo-auto/fil-modelo-auto.component';
import { FilArmaMarcaComponent } from '../../filters/fil-arma-marca/fil-arma-marca.component';

@Component({
  selector: 'app-abm-prev-objeto',
  templateUrl: './abm-prev-objeto.component.html',
  styleUrls: ['./abm-prev-objeto.component.scss']
})
export class AbmPrevObjetoComponent implements OnInit {
  @ViewChild(FilArmaComponent, { static: false }) fil!: FilArmaComponent;
  @ViewChild(FilModeloAutoComponent, { static: false }) filAuto!: FilModeloAutoComponent;
  @ViewChild(FilBuscadorModeloMotoComponent, { static: false }) filMoto!: FilBuscadorModeloMotoComponent;

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;
  arma: boolean;
  auto: boolean;
  moto: boolean;

  busqueda;
  idSeleccion!: number;
  idSeleccionMoto!: number;
  idSeleccionAuto!: number;
  idSeleccionArma!: number;
  idSeleccionado!: number;
  
  prev: Preventivo;
  prevObj: PrevObjeto;

  item: PrevObjeto;
  items: PrevObjeto[];

  itemArma: PrevObjArma;
  itemsArma: PrevObjArma[];
  itemAuto: PrevObjAuto;
  itemsAuto: PrevObjAuto[];
  itemMoto: PrevObjMoto;
  itemsMoto: PrevObjMoto[];

  Oitems: Objeto[];
  Oitem: Objeto;

  mostrarBtnModif: Boolean;
  mostrarBtnModifMoto: Boolean;
  mostrarBtnModifAuto: Boolean;
  mostrarBtnModifArma: Boolean;

  verValor: boolean;

  cantidadSecuestrada: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PrevObjetoService,
    private wsdlObjArma: PrevObjetoArmaService,
    private wsdlObjAuto: PrevObjAutoService,
    private wsdlObjMoto: PrevObjMotoService,
    private wsdlMedio: ObjetoService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevObjeto();
    this.items = [];
    this.prev = new Preventivo();
    this.prevObj = new PrevObjeto();
    this.busqueda = '';
    this.Oitem = new Objeto();
    this.Oitems = [];
    this.mostrarBtnModif = false;
    this.mostrarBtnModifMoto = false;
    this.mostrarBtnModifAuto = false;
    this.mostrarBtnModifArma = false;
    this.arma = false;
    this.auto = false;
    this.moto = false;
    this.verValor = false;
    this.itemArma = new PrevObjArma();
    this.itemsArma = [];
    this.itemAuto = new PrevObjAuto();
    this.itemsAuto = [];
    this.itemMoto = new PrevObjMoto();
    this.itemsMoto = [];
    this.cantidadSecuestrada = 0;
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

  //selecciona el id del medio y envia el id a la funcion de busqueda del arma
  seleccionado(item: PrevObjeto){
    this.arma = true;
    this.idSeleccionado = item.id;
    this.cantidadSecuestrada = item.cantSecuestro;
    if(this.cantidadSecuestrada > 1){
      this.filterArma();
    }else if(this.cantidadSecuestrada == 1){
      this.findIdArma(item.id);
    }
  }

  //filtro de busqueda de  la lista de armas
  async filterArma(){
    if(this.idSeleccionado > 0 && this.idSeleccionado != undefined){
      try {
        let data = await this.wsdlObjArma.doFilter(this.idSeleccionado).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemsArma = result.data;
        }
      } catch (error) {
        Swal.fire("Error al obtener los datos," + error);
      }
    }
  }

  //realiza la busqueda del arma con el id del medio
  async findIdArma(id: number) {
    if (id > 0) {
      try {
        let data = await this.wsdlObjArma.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemArma = result.dato;
          this.itemArma.marcaArma = result.dato.armaNavigation?.descripcion;
        }
      } catch (error) {}
    }
  }

  //selecciona la moto
  seleccionadoMoto(item: PrevObjeto){
    this.moto = true;
    this.idSeleccionado = item.id;
    this.cantidadSecuestrada = item.cantSecuestro;
    if(this.cantidadSecuestrada > 1){
      this.filterMoto();
    }else if(this.cantidadSecuestrada == 1){
      this.findIdMoto(item.id);
    }
  }
//filtras las motos en el modal
  async filterMoto(){
    if(this.idSeleccionado > 0 && this.idSeleccionado != undefined){
      try {
        let data = await this.wsdlObjMoto.doFilter(this.idSeleccionado).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemsMoto = result.data;
        }
      } catch (error) {
        Swal.fire("Error al obtener los datos," + error);
      }
    }

  }
  //realiza la busqueda del moto con el id del objeto
  async findIdMoto(id: number) {
    if (id > 0) {
      try {
        let data = await this.wsdlObjMoto.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemMoto = result.dato;
          this.itemMoto.marcaModeloMoto = result.dato.modeloMotoNavigation?.nombre;
          this.itemMoto.marcaMoto = result.dato.modeloMotoNavigation?.marcaMotoNavigation?.nombre;
        }
      } catch (error) {}
    }
  }


  seleccionadoAuto(item: PrevObjeto){
    this.auto = true;
    this.idSeleccionado = item.id;
    this.cantidadSecuestrada = item.cantSecuestro;
    if(this.cantidadSecuestrada > 1){
      this.filterAuto();
    }else if(this.cantidadSecuestrada == 1){
      this.findIdAuto(item.id);
    }
  }

  async filterAuto(){
    if(this.idSeleccionado > 0 && this.idSeleccionado != undefined){
      try {
        let data = await this.wsdlObjAuto.doFilter(this.idSeleccionado).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemsAuto = result.data;
        }
      } catch (error) {
        Swal.fire("Error al obtener los datos," + error);
      }
    }
  }
  //realiza la busqueda del automovil con el id del objeto
  async findIdAuto(id: number) {
    if (id > 0) {
      try {
        let data = await this.wsdlObjAuto.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemAuto = result.dato;
          console.log("detalles del auto",this.itemAuto)
          this.itemAuto.marcaModeloAuto = result.dato.modeloNavigation?.descripcion;
          this.itemAuto.marcaAuto = result.dato.modeloNavigation?.VehiculoMarcaNavigation?.descripcion;
         }
      } catch (error) {}
    }
  }

  //obtiene los datos del prevobjeto
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

//modifica los datos del prevObjeto
  async actualizarDatos(obj: PrevObjeto) {
    try {
      let data = await this.wsdl.doUpdate(this.item.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.idSeleccion = 0;
        this.mostrarBtnModif = false;
        this.busqueda = '';
        this.item = new PrevObjeto();
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

  //actualiza el objeto arma
  async actualizarArmas(obj: PrevObjArma) {
    try {
      let data = await this.wsdlObjArma.doUpdate(this.itemArma.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.fil.busqueda='';
        this.fil.item = new ArmaMarca();
        this.idSeleccionArma = 0;
        this.mostrarBtnModifArma = false
        this.filterArma();
        this.itemArma = new PrevObjArma();
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

  //actualiza el objeto auto
  async actualizarAuto(obj: PrevObjAuto) {
    try {
      let data = await this.wsdlObjAuto.doUpdate(this.itemAuto.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.filAuto.busqueda = '';
        this.filAuto.item = new ModeloVehiculo();
        this.idSeleccionAuto = 0;
        this.mostrarBtnModifAuto = false
        this.filterAuto();
        this.itemAuto = new PrevObjAuto();
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

  //actualiza el objeto auto
  async actualizarMoto(obj: PrevObjMoto) {
    try {
      let data = await this.wsdlObjMoto.doUpdate(this.itemMoto.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.filMoto.busqueda = '';
        this.filMoto.item = new ModeloMoto();
        this.idSeleccionMoto = 0;
        this.mostrarBtnModifMoto = false
        this.filterMoto();
        this.itemMoto = new PrevObjMoto();
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
    this.item.preventivo = this.id;
    console.log("data", this.item)
    try {
      let data = await this.wsdl.doInsert(this.item).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.busqueda = '';
        this.item = new PrevObjeto();
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
  //inserta el arma a la base de datos
  async guardarArma() {
    this.itemArma.prevObjeto = this.idSeleccionado;
    try {
      let data = await this.wsdlObjArma.doInsert(this.itemArma).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.fil.busqueda='';
        this.fil.item = new ArmaMarca();
        this.filterArma();
        this.itemArma = new PrevObjArma();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato guardado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato creado correctamente!',
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
  }

  //inserta el objeto auto creado a la base de datos
  async guardarAuto() {
    this.itemAuto.prevObjeto = this.idSeleccionado;
    try {
      let data = await this.wsdlObjAuto.doInsert(this.itemAuto).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.filAuto.busqueda='';
        this.filAuto.item = new ModeloVehiculo();
        this.filterAuto();
        this.itemAuto = new PrevObjAuto();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato creado correctamente!',
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
  }

  //inserta el objeto auto creado a la base de datos
  async guardarMoto() {
    this.itemMoto.prevObjeto = this.idSeleccionado;
    try {
      let data = await this.wsdlObjMoto.doInsert(this.itemMoto).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.filMoto.busqueda='';
        this.filMoto.item = new ModeloMoto();
        this.filterMoto();
        this.itemMoto = new PrevObjMoto();
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

  //trae los datos para modificar
  async traerDatos(id: number) {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
          this.idSeleccion = result.dato.id;
          if(this.item.fecha != undefined){
            this.item.fecha = moment(this.item.fecha).format('YYYY-MM-DD');
          }
          this.busqueda = result.dato.objetoNavigation.descripcion;
          this.mostrarBtnModif = true;
        }
      } catch (error) {}
    }
  }

  //trae los datos para modificar de la moto en el modal
  async traerDatosMoto(id: number) {
    if (id > 0) {
      try {
        let data = await this.wsdlObjMoto.getIdObj(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemMoto = result.dato;
          this.idSeleccionMoto = result.dato.id;
         // this.busqueda = result.dato.objetoNavigation.descripcion;
          this.mostrarBtnModifMoto = true;
        }
      } catch (error) {}
    }
  }
  //trae los datos para modificar el auto en el modal
  async traerDatosAuto(id: number) {
    if (id > 0) {
      try {
        let data = await this.wsdlObjAuto.getIdObj(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemAuto = result.dato;
          this.idSeleccionAuto = result.dato.id;
         // this.busqueda = result.dato.objetoNavigation.descripcion;
          this.mostrarBtnModifAuto = true;
        }
      } catch (error) {}
    }
  }
//trae los datos para modificar el auto en el modal
async traerDatosArma(id: number) {
  if (id > 0) {
    try {
      let data = await this.wsdlObjArma.getIdObj(id).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.itemArma = result.dato;
        this.idSeleccionArma = result.dato.id;
       // this.busqueda = result.dato.objetoNavigation.descripcion;
        this.mostrarBtnModifArma = true;
      }
    } catch (error) {}
  }
}

  async filtrarObjeto() {
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdlMedio.doFilter(this.busqueda).then();
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

  capturar(event: Objeto) {
    if (event != undefined) {
      this.busqueda = event.descripcion;
      this.item.objeto = event.id;
      this.item.capturaObj = event.descripcion;
      this.item.codigo = event.codTipo + '-' + event.codSubTipo;
    }
  }

  //agrega fila en memoria
  // addRow() {
  //   this.busqueda = '';
  //   this.items.unshift(this.item);
  //   this.item = new PrevObjeto();
  // }

  //captura el arma
  doFound(event: ArmaMarca) {
    this.itemArma.arma = event.id;
    this.itemArma.marcaArma = event.descripcion;
  }

  //captura el modelo
  doFoundModelo(event: ModeloVehiculo){
    this.itemAuto.modelo = event.id;
    this.itemAuto.marcaModeloAuto = event.descripcion;
  }

  //captura el modelo
  doFoundModeloMoto(event: ModeloMoto){
    this.itemMoto.modelo = event.id;
    this.itemMoto.marcaModeloMoto = event.nombre;
  }

  //cancela el modal arma
  cancelar(){
    this.idSeleccionado = 0;
    this.cantidadSecuestrada = 0;
    this.itemArma = new PrevObjArma();
    this.fil.busqueda='';
    this.fil.item = new ArmaMarca();
  }

  //cancela el modal auto
  cancelarAuto(){
    this.idSeleccionado = 0;
    this.cantidadSecuestrada = 0;
    this.itemAuto = new PrevObjAuto();
    this.filAuto.busqueda='';
    this.filAuto.item = new ModeloVehiculo();
  }

  //cancela el modal moto
  cancelarMoto(){
    this.idSeleccionado = 0;
    this.cantidadSecuestrada = 0;
    this.itemMoto = new PrevObjMoto();
    this.filMoto.busqueda='';
    this.filMoto.item = new ModeloMoto();
  }

  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

//cancela modificacion
  cancelarModificacion() {
    this.busqueda = '';
    this.item = new PrevObjeto();
    this.mostrarBtnModif = false;
  }

  //cancela modificacion
  cancelarModificacionMoto() {
    this.filMoto.busqueda='';
    this.filMoto.item = new ModeloMoto();
    this.itemMoto = new PrevObjMoto();
    this.idSeleccionMoto = 0;
    this.mostrarBtnModifMoto = false;
  }

  //cancela modificacion
  cancelarModificacionArma() {
    this.fil.busqueda='';
    this.fil.item = new ArmaMarca();
    this.itemArma = new PrevObjArma();
    this.idSeleccionArma = 0;
    this.mostrarBtnModifArma = false;
  }

  cancelarModificacionAuto() {
    this.filAuto.busqueda='';
    this.filAuto.item = new ModeloVehiculo();
    this.itemAuto = new PrevObjAuto();
    this.idSeleccionAuto = 0;
    this.mostrarBtnModifAuto = false;
  }


  // se utiliza para pintar la fila en memoria
  colores(item: PrevObjeto) {
    let color = '';
    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }
    return color;
  }

  preDelete(item: PrevObjeto) {
    this.item = new PrevObjeto();
    this.item = item;
    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        item.objetoNavigation.descripcion +
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
        this.item = new PrevObjeto();
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

  preDeleteMoto(item: PrevObjMoto) {
    this.itemMoto = new PrevObjMoto();
    this.itemMoto = item;
    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.deleteMoto();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.filMoto.busqueda = '';
        this.filMoto.item = new ModeloMoto();
        this.filMoto.items = []; 
        this.itemMoto = new PrevObjMoto();
        Utils.showToas('Tu archivo esta seguro :)', 'warning');
      }
    });
  }

  async deleteMoto() {
    try {
      
      let res = await this.wsdlObjMoto.doDelete(this.itemMoto.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        this.filMoto.busqueda = '';
        this.filMoto.item = new ModeloMoto();
        this.filMoto.items = []; 
        this.filterMoto();
        this.itemMoto = new PrevObjMoto();
        Utils.showToas('Eliminado exitosamente!', 'success');
      } else {
        Utils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      Utils.showToas('Excepción: ' + error.message, 'error');
    } finally {
    }
  }

  preDeleteAuto(item: PrevObjAuto) {
    this.itemAuto = new PrevObjAuto();
    this.itemAuto = item;
    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.deleteAuto();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.filAuto.busqueda = '';
        this.filAuto.item = new ModeloVehiculo();
        this.filAuto.items = []; 
        this.itemAuto = new PrevObjAuto();
        Utils.showToas('Tu archivo esta seguro :)', 'warning');
      }
    });
  }

  async deleteAuto() {
    try {
      let res = await this.wsdlObjAuto.doDelete(this.itemAuto.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        this.filAuto.busqueda = '';
        this.filAuto.item = new ModeloVehiculo();
        this.filAuto.items = []; 
        this.filterAuto();
        this.itemAuto = new PrevObjAuto();
        Utils.showToas('Eliminado exitosamente!', 'success');
      } else {
        Utils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      Utils.showToas('Excepción: ' + error.message, 'error');
    } finally {
    }
  }

  preDeleteArma(item: PrevObjArma) {
    this.itemArma = new PrevObjArma();
    this.itemArma = item;
    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.deleteArma();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.fil.busqueda = '';
        this.fil.item = new ArmaMarca();
        this.fil.items = []; 
        this.itemArma = new PrevObjArma();
        Utils.showToas('Tu archivo esta seguro :)', 'warning');
      }
    });
  }

  async deleteArma() {
    try {
      let res = await this.wsdlObjArma.doDelete(this.itemArma.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        this.fil.busqueda = '';
        this.fil.item = new ArmaMarca();
        this.fil.items = []; 
        this.filterArma();
        this.itemArma = new PrevObjArma();
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
