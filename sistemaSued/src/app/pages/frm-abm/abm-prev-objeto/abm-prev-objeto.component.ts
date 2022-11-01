import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ArmaMarca, ModeloVehiculo, Objeto, Preventivo, PrevObjArma, PrevObjAuto, PrevObjeto } from 'src/app/models/index.models';
import { ObjetoService, PreventivoService, PrevMedArmaService, PrevObjAutoService, PrevObjetoArmaService, PrevObjetoService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilArmaComponent } from '../../component/fil-arma/fil-arma.component';

@Component({
  selector: 'app-abm-prev-objeto',
  templateUrl: './abm-prev-objeto.component.html',
  styleUrls: ['./abm-prev-objeto.component.scss']
})
export class AbmPrevObjetoComponent implements OnInit {
  @ViewChild(FilArmaComponent, { static: false }) fil!: FilArmaComponent;

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;
  arma: boolean

  busqueda;
  idSeleccion!: number;
  
  prev: Preventivo;
  prevObj: PrevObjeto;

  item: PrevObjeto;
  items: PrevObjeto[];

  itemAuto: PrevObjAuto;

  Oitems: Objeto[];
  Oitem: Objeto;

  itemArma: PrevObjArma;

  mostrarBtnModif: Boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PrevObjetoService,
    private wsdlObjArma: PrevObjetoArmaService,
    private wsdlObjAuto: PrevObjAutoService,
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
    this.arma = false;
    this.itemArma = new PrevObjArma();
    this.itemAuto = new PrevObjAuto();
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
  seleccionado(id: number){
    this.arma = true;
    if(id != undefined){
      this.findIdArma(id);
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
        }else{
          this.itemArma.prevObjeto = id
        }
      } catch (error) {}
    }
  }

  seleccionadoAuto(id: number){
    this.arma = true;
    if(id != undefined){
      this.findIdAuto(id);
    }
  }

  //realiza la busqueda del arma con el id del medio
  async findIdAuto(id: number) {
    if (id > 0) {
      try {
        let data = await this.wsdlObjAuto.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemAuto = result.dato;
          this.itemAuto.marcaModeloAuto = result.dato.armaNavigation?.descripcion;
        }else{
          this.itemAuto.prevObjeto = id
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

  async actualizarDatos(obj: PrevObjeto) {
    try {
      let data = await this.wsdl.doUpdate(this.item.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      console.log('result', result);
      if (result.code == 200) {
        this.idSeleccion=0;
        this.mostrarBtnModif =false;
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

  async actualizarArmas(obj: PrevObjArma) {
    try {
      let data = await this.wsdlObjArma.doUpdate(this.itemArma.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      console.log('result', result);
      if (result.code == 200) {
        this.fil.busqueda='';
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

  async agregarDato() {
    for (let index = 0; index < this.items.length; index++) {
      this.prevObj = new PrevObjeto();
      this.prevObj = this.items[index];
      if (this.prevObj.id == undefined) {
        this.item = new PrevObjeto();
        this.item = this.prevObj;
        this.guardar();
      }
    }
  }

  async guardar() {
    this.item.preventivo = this.id;
    try {
      let data = await this.wsdl.doInsert(this.item).then(
        /*data => {
          console.log("data de data", data)
        }*/
      );
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
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
  
  async guardarArma() {
    try {
      let data = await this.wsdlObjArma.doInsert(this.itemArma).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.fil.busqueda='';
        this.fil.item = new ArmaMarca();
        this.itemArma = new PrevObjArma();
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
  addRow() {
    this.busqueda = '';
    this.items.unshift(this.item);
    this.item = new PrevObjeto();
  }

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

  //cancela el modal
  cancelar(){
    this.itemArma = new PrevObjArma();
    this.fil.busqueda='';
    this.fil.item = new ArmaMarca();
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
