import { NgIf } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import {
  ArmaMarca,
  Medio,
  Preventivo,
  PreventivoMedio,
  PrevMedioArma,
} from 'src/app/models/index.models';
import {
  MedioService,
  PreventivoMedioService,
  PrevMedArmaService,
} from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilArmaComponent } from '../../component/fil-arma/fil-arma.component';
import { VentanaLstAbmMediosComponent } from '../../component/ventana-lst-abm-medios/ventana-lst-abm-medios.component';

@Component({
  selector: 'app-abm-preventivo-medio',
  templateUrl: './abm-preventivo-medio.component.html',
  styleUrls: ['./abm-preventivo-medio.component.scss'],
})
export class AbmPreventivoMedioComponent implements OnInit {
  @ViewChild(FilArmaComponent, { static: false }) fil!: FilArmaComponent;
  @ViewChild(VentanaLstAbmMediosComponent, { static: false }) ventanaMedio!: VentanaLstAbmMediosComponent;


  @ViewChild('closeMedio') cerrarMedio!: ElementRef;

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  idPrevMed!: number;
  idMedio!: number;
  //variable para verificar si fue enviado los datos
  enviado = false;
  mostrar: boolean;
  arma: boolean;
  botonModifArma: boolean;

  mostrarModal: boolean;

  busqueda;

  prev: Preventivo;
  prevMed: PreventivoMedio;

  item: PreventivoMedio;
  items: PreventivoMedio[];
  itemsPM: PreventivoMedio[];

  Mitems: Medio[];
  Mitem: Medio;

  idSeleccion!: number;
  mostrarBtnModif: boolean;
  idPrevMedio: any;

  prevArma: PrevMedioArma;
  itemArma: PrevMedioArma;
  itemsArma: PrevMedioArma[];

  seleccionID: any;

  guardando: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdlMedioArma: PrevMedArmaService,
    private wsdl: PreventivoMedioService,
    private wsdlMedio: MedioService,
    private formBuilder: FormBuilder,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('es');//fecha en español, datepicker
    this.item = new PreventivoMedio();
    this.items = [];
    this.prev = new Preventivo();
    this.prevMed = new PreventivoMedio();
    this.busqueda = '';
    this.Mitem = new Medio();
    this.Mitems = [];
    this.mostrarBtnModif = false;
    this.mostrar = false;
    this.arma = false;
    this.prevArma = new PrevMedioArma();
    this.itemArma = new PrevMedioArma();
    this.itemsArma = [];
    this.itemsPM = [];
    this.botonModifArma = false;
    this.guardando = false;
    this.mostrarModal = false;
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
        let data = await this.wsdlMedioArma.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.itemArma = result.dato;
          this.itemArma.marcaArma = result.dato.armaNavigation?.descripcion;
        }else{
          this.itemArma.prevMedio = id
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

  //trae los datos para modificar
  async traerDatos(id: number) {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
          this.idSeleccion = result.dato.id;
          this.busqueda = result.dato.medioNavigation?.descripcion;
          if(this.item.medioNavigation?.descripcion == 'GANADO MAYOR Y MENOR'){
            this.item.capturaDescripcion = this.item.medioNavigation?.descripcion;
          }
          
          if (this.item.fecha != undefined) {
            this.item.fecha = moment(this.item.fecha).format('YYYY-MM-DD');
          }
          this.mostrarBtnModif = true;
        }
      } catch (error) {}
    }
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

  async actualizarDatos(obj: PreventivoMedio) {
    
    this.guardando = true;
    
    if(this.item.fecha !== undefined){
      this.item.fecha = moment(this.item.fecha,"DD/MM/YYYY");
    }
  
    try {
      let data = await this.wsdl.doUpdate(this.item.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.idSeleccion = 0;
        this.mostrarBtnModif = false;
        this.guardando = false;
        this.busqueda = '';
        this.item = new PreventivoMedio();
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

  async actualizarArmas(obj: PrevMedioArma) {
    try {
      let data = await this.wsdlMedioArma.doUpdate(this.itemArma.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.fil.busqueda='';
        this.itemArma = new PrevMedioArma();
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

  //recorre el bucle para insertar los datos de preventivo medio
  // agregarDato() {
  //   for (let index = 0; index < this.items.length; index++) {
  //     this.prevMed = new PreventivoMedio();
  //     this.prevMed = this.items[index];
  //     if (this.prevMed.id == undefined) {
  //       this.item = new PreventivoMedio();
  //       this.item = this.prevMed;
  //       this.guardar();
  //     }
  //   }
  // }

  //guarda el preventivo medio en la base de datos
  async guardar() {
    this.guardando = true;
    this.item.preventivo = this.id;
    try {
      let data = await this.wsdl.doInsert(this.item).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        this.busqueda='';
        this.item = new PreventivoMedio();
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
  }

  //inserta el arma en la base de datos
  async guardarArma() {
    try {
      let data = await this.wsdlMedioArma.doInsert(this.itemArma).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.fil.busqueda='';
        this.fil.item = new ArmaMarca();
        this.itemArma = new PrevMedioArma();
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
  }

  //filtro de medios y captura
  // async filtrarMedio() {
  //   //alert("ACA ESTO")
  //   this.Mitems = [];
  //   try {
  //     if (this.busqueda != '' && this.busqueda != undefined) {
  //       let data = await this.wsdlMedio.doFilter(this.busqueda).then();
  //       const result = JSON.parse(JSON.stringify(data));
  //       if (result.code == 200) {
  //         Swal.fire(
  //           'Búsqueda realizada correctamente!',
  //           'Seleccione el dato encontrado del campo seleccionable!',
  //           'success'
  //         );
  //         //this.Mitems = [];
  //         this.Mitems = result.data;
  //       } else if (result.code == 204) {
  //         // Swal.fire({
  //         //   title: '¡No existe el dato buscado!',
  //         //   text: "Desea crearlo!",
  //         //   icon: 'warning',
  //         //   showCancelButton: true,
  //         //   confirmButtonColor: '#3085d6',
  //         //   cancelButtonColor: '#d33',
  //         //   confirmButtonText: 'Crear!',
  //         //   cancelButtonText: 'Cancelar'
  //         // }).then((result) => {
  //         //   if (result.isConfirmed) {
              
  //         //     this.mostrarModal = true;
  //         //   }
  //         // })
  //         Swal.fire({
  //           icon: 'warning',
  //           text: 'El criterio ingresado no existe!',
  //           footer: '<CENTER><b>Si desea crearlo o verificar su existencia, abra la ventana de medios...</b></CENTER>'
  //         })
  //         this.mostrarModal = true;
  //       }
  //     }
  //   } catch (error) {}
  // }

  capturar(event: Medio) {
    if (event != undefined) {
      this.busqueda = event.descripcion;
      this.item.medioUtilizado = event.id;
      this.item.capturaDescripcion = event.descripcion;
      this.item.codigo = event.codTipo + '-' + event.codMedio;
    }
    this.cerrarMedio.nativeElement.click();
  }

  //captura el arma
  doFound(event: ArmaMarca) {
    this.itemArma.arma = event.id;
    this.itemArma.marcaArma = event.descripcion;
  }

  cancelar(){
    this.itemArma = new PrevMedioArma();
    this.fil.busqueda='';
    this.fil.item = new ArmaMarca();
  }

  //agrega fila en memoria
  addRow() {
    this.busqueda = '';
    this.items.unshift(this.item);
    this.item = new PreventivoMedio();
  }

  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

  // se utiliza para pintar la fila en memoria
  colores(item: any) {
    let color = '';
    if (item.id == undefined) {
      color = 't-success';
    }else {
      color = 't-default';
    }
    return color;
  }

  //cancelar modificacion
  cancelarModificacion() {
    this.busqueda = '';
    this.item = new PreventivoMedio();
    this.mostrarBtnModif = false;
  }

  preDelete(item: PreventivoMedio) {
    this.item = new PreventivoMedio();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        item.medioNavigation.descripcion +
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
        this.item = new PreventivoMedio();
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

  cancelVentMedio(){
    this.busqueda = '';
    this.ventanaMedio.item = new Medio();
    this.mostrarModal = false;
  }

  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
