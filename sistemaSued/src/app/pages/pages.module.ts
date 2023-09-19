import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FooterComponent } from "./compartido/footer/footer.component";
import { NavbarComponent } from "./compartido/navbar/navbar.component";
import { SidebarComponent } from "./compartido/sidebar/sidebar.component";
import { PagesComponent } from "./pages.component";
import { HttpClientModule } from "@angular/common/http";
import { PagesRoutingModule } from "./pages-routing.module";
import { LstDepartamentoComponent } from './lst/lst-departamento/lst-departamento.component';
import { FilDepartamentoComponent } from './filters/fil-departamento/fil-departamento.component';
import { AbmDepartamentoComponent } from './frm-abm/abm-departamento/abm-departamento.component';
import { LstBarrioComponent } from './lst/lst-barrio/lst-barrio.component';
import { AbmBarrioComponent } from './frm-abm/abm-barrio/abm-barrio.component';
import { FilBarrioComponent } from './filters/fil-barrio/fil-barrio.component';
import { FilCalleComponent } from './filters/fil-calle/fil-calle.component';
import { AbmCalleComponent } from './frm-abm/abm-calle/abm-calle.component';
import { LstCalleComponent } from './lst/lst-calle/lst-calle.component';
import { ComboBarrioComponent } from './component/combo-barrio/combo-barrio.component';
import { FilDelitoComponent } from './filters/fil-delito/fil-delito.component';
import { AbmDelitoComponent } from './frm-abm/abm-delito/abm-delito.component';
import { LstDelitoComponent } from './lst/lst-delito/lst-delito.component';
import { ComboArticuloComponent } from './component/combo-articulo/combo-articulo.component';
import { ComboDncpComponent } from './component/combo-dncp/combo-dncp.component';
import { FilDncpComponent } from './filters/fil-dncp/fil-dncp.component';
import { AbmDncpComponent } from './frm-abm/abm-dncp/abm-dncp.component';
import { LstDncpComponent } from './lst/lst-dncp/lst-dncp.component';
import { LstArticuloComponent } from './lst/lst-articulo/lst-articulo.component';
import { FilArticuloComponent } from './filters/fil-articulo/fil-articulo.component';
import { AbmArticuloComponent } from './frm-abm/abm-articulo/abm-articulo.component';
import { LstLugarComponent } from './lst/lst-lugar/lst-lugar.component';
import { FilLugarComponent } from './filters/fil-lugar/fil-lugar.component';
import { AbmLugarComponent } from './frm-abm/abm-lugar/abm-lugar.component';
import { ComboLugarComponent } from './component/combo-lugar/combo-lugar.component';
import { AbmMedioComponent } from './frm-abm/abm-medio/abm-medio.component';
import { FilMedioComponent } from './filters/fil-medio/fil-medio.component';
import { LstMedioComponent } from './lst/lst-medio/lst-medio.component';
import { FilLocalidadComponent } from './filters/fil-localidad/fil-localidad.component';
import { AbmLocalidadComponent } from './frm-abm/abm-localidad/abm-localidad.component';
import { LstLocalidadComponent } from './lst/lst-localidad/lst-localidad.component';
import { ComboNacionComponent } from './component/combo-nacion/combo-nacion.component';
import { ComboProvinciaComponent } from './component/combo-provincia/combo-provincia.component';
import { ComboDepartamentoComponent } from './component/combo-departamento/combo-departamento.component';
import { LstNacionesComponent } from './lst/lst-naciones/lst-naciones.component';
import { AbmNacionesComponent } from './frm-abm/abm-naciones/abm-naciones.component';
import { FilNacionesComponent } from './filters/fil-naciones/fil-naciones.component';
import { FilProvinciaComponent } from './filters/fil-provincia/fil-provincia.component';
import { AbmProvinciaComponent } from './frm-abm/abm-provincia/abm-provincia.component';
import { LstProvinciaComponent } from './lst/lst-provincia/lst-provincia.component';
import { FilObjetoComponent } from './filters/fil-objeto/fil-objeto.component';
import { AbmObjetoComponent } from './frm-abm/abm-objeto/abm-objeto.component';
import { LstObjetoComponent } from './lst/lst-objeto/lst-objeto.component';
import { LstModalidadComponent } from './lst/lst-modalidad/lst-modalidad.component';
import { FilModalidadComponent } from './filters/fil-modalidad/fil-modalidad.component';
import { AbmModalidadComponent } from './frm-abm/abm-modalidad/abm-modalidad.component';
import { LstEstudioComponent } from './lst/lst-estudio/lst-estudio.component';
import { AbmEstudioComponent } from './frm-abm/abm-estudio/abm-estudio.component';
import { FilEstudioComponent } from './filters/fil-estudio/fil-estudio.component';
import { LstOcupacionComponent } from './lst/lst-ocupacion/lst-ocupacion.component';
import { FilOcupacionComponent } from './filters/fil-ocupacion/fil-ocupacion.component';
import { AbmOcupacionComponent } from './frm-abm/abm-ocupacion/abm-ocupacion.component';
import { FilSexoComponent } from './filters/fil-sexo/fil-sexo.component';
import { AbmSexoComponent } from './frm-abm/abm-sexo/abm-sexo.component';
import { LstSexoComponent } from './lst/lst-sexo/lst-sexo.component';
import { FilVinculoComponent } from './filters/fil-vinculo/fil-vinculo.component';
import { AbmVinculoComponent } from './frm-abm/abm-vinculo/abm-vinculo.component';
import { LstVinculoComponent } from './lst/lst-vinculo/lst-vinculo.component';
import { FilArmaMarcaComponent } from './filters/fil-arma-marca/fil-arma-marca.component';
import { AbmArmaMarcaComponent } from './frm-abm/abm-arma-marca/abm-arma-marca.component';
import { LstArmaMarcaComponent } from './lst/lst-arma-marca/lst-arma-marca.component';
import { LstVehiculoMarcaComponent } from './lst/lst-vehiculo-marca/lst-vehiculo-marca.component';
import { AbmVehiculoMarcaComponent } from './frm-abm/abm-vehiculo-marca/abm-vehiculo-marca.component';
import { FilVehiculoMarcaComponent } from './filters/fil-vehiculo-marca/fil-vehiculo-marca.component';
import { FilModeloVehiculoComponent } from './filters/fil-modelo-vehiculo/fil-modelo-vehiculo.component';
import { AbmModeloVehiculoComponent } from './frm-abm/abm-modelo-vehiculo/abm-modelo-vehiculo.component';
import { LstModeloVehiculoComponent } from './lst/lst-modelo-vehiculo/lst-modelo-vehiculo.component';
import { ComboMarcaComponent } from './component/combo-marca/combo-marca.component';
import { LstPreventivoComponent } from './lst/lst-preventivo/lst-preventivo.component';
import { FilPreventivoComponent } from './filters/fil-preventivo/fil-preventivo.component';
import { AbmPreventivoComponent } from './frm-abm/abm-preventivo/abm-preventivo.component';
import { AbmPreventivoMedioComponent } from './frm-abm/abm-preventivo-medio/abm-preventivo-medio.component';
import { AbmPrevObjetoComponent } from './frm-abm/abm-prev-objeto/abm-prev-objeto.component';
import { AbmPrevModalidadComponent } from './frm-abm/abm-prev-modalidad/abm-prev-modalidad.component';
import { AbmPrevCaratulaComponent } from './frm-abm/abm-prev-caratula/abm-prev-caratula.component';
import { AbmSnicComponent } from './frm-abm/abm-snic/abm-snic.component';
import { ComboLocalidadComponent } from './component/combo-localidad/combo-localidad.component';
import { GeoMapComponent } from './component/geo-map/geo-map.component';
import { AbmPreVictimaComponent } from './frm-abm/abm-pre-victima/abm-pre-victima.component';
import { ComboSexoComponent } from './component/combo-sexo/combo-sexo.component';
import { ComboEstudioComponent } from './component/combo-estudio/combo-estudio.component';
import { AbmPrevInculpadoComponent } from './frm-abm/abm-prev-inculpado/abm-prev-inculpado.component';
import { ComboVinculoComponent } from './component/combo-vinculo/combo-vinculo.component';
import { AbmPrevAmpliacionComponent } from './frm-abm/abm-prev-ampliacion/abm-prev-ampliacion.component';
import { AbmDetallePreventivoComponent } from './frm-abm/abm-detalle-preventivo/abm-detalle-preventivo.component';
import { LstContravencionComponent } from './lst/lst-contravencion/lst-contravencion.component';
import { FilContravencionComponent } from './filters/fil-contravencion/fil-contravencion.component';
import { AbmContravencionComponent } from './frm-abm/abm-contravencion/abm-contravencion.component';
import { AbmArtContravencionComponent } from './frm-abm/abm-art-contravencion/abm-art-contravencion.component';
import { AbmDtallePreventivoComponent } from './frm-abm/abm-dtalle-preventivo/abm-dtalle-preventivo.component';
import { GeoLocalizacionInversaComponent } from './component/geo-localizacion-inversa/geo-localizacion-inversa.component';
import { LstUnidadesComponent } from './lst/lst-unidades/lst-unidades.component';
import { AbmUnidadesComponent } from './frm-abm/abm-unidades/abm-unidades.component';
import { FilUnidadesComponent } from './filters/fil-unidades/fil-unidades.component';
import { FilUnidadAutocompletadoComponent } from "./component/fil-unidad-autocompletado/fil-unidad-autocompletado.component";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FilAutocompletadoUnidadSuedComponent } from './component/fil-autocompletado-unidad-sued/fil-autocompletado-unidad-sued.component';
import { FilArmaComponent } from './component/fil-arma/fil-arma.component';
import { FilModeloAutoComponent } from './component/fil-modelo-auto/fil-modelo-auto.component';
import { LstUsuariosComponent } from "./lst/lst-usuarios/lst-usuarios.component";
import { FiUsuariosSuedComponent } from './filters/fi-usuarios-sued/fi-usuarios-sued.component';
import { FilUsuariosComponent } from "./filters/fil-usuarios/fil-usuarios.component";
import { AbmConsultaUsuarioComponent } from "./frm-abm/abm-consulta-usuario/abm-consulta-usuario.component";
import { AbmRegistroCivilComponent } from "./frm-abm/abm-registro-civil/abm-registro-civil.component";
import { AbmPrevHomicidioComponent } from './frm-abm/abm-prev-homicidio/abm-prev-homicidio.component';
import { AbmPrevSuicidioComponent } from './frm-abm/abm-prev-suicidio/abm-prev-suicidio.component';
import { FilMarcaMotoComponent } from './filters/fil-marca-moto/fil-marca-moto.component';
import { FilModeloMotoComponent } from './filters/fil-modelo-moto/fil-modelo-moto.component';
import { LstMarcaMotoComponent } from './lst/lst-marca-moto/lst-marca-moto.component';
import { LstModeloMotoComponent } from './lst/lst-modelo-moto/lst-modelo-moto.component';
import { AbmMarcaMotoComponent } from './frm-abm/abm-marca-moto/abm-marca-moto.component';
import { AbmModeloMotoComponent } from './frm-abm/abm-modelo-moto/abm-modelo-moto.component';
import { ComboMarcaMotoComponent } from './component/combo-marca-moto/combo-marca-moto.component';
import { FilBuscadorModeloMotoComponent } from './component/fil-buscador-modelo-moto/fil-buscador-modelo-moto.component';
import { FilIdentidadGeneroComponent } from './filters/fil-identidad-genero/fil-identidad-genero.component';
import { AbmIdentidadGeneroComponent } from './frm-abm/abm-identidad-genero/abm-identidad-genero.component';
import { LstIdentidadGeneroComponent } from './lst/lst-identidad-genero/lst-identidad-genero.component';
import { ComboIdentidadGeneroComponent } from './component/combo-identidad-genero/combo-identidad-genero.component';
import { FilBuscadorCalleComponent } from './component/fil-buscador-calle/fil-buscador-calle.component';
import { FilBuscadorBarrioComponent } from './component/fil-buscador-barrio/fil-buscador-barrio.component';
import { FilTipoMonedaComponent } from './filters/fil-tipo-moneda/fil-tipo-moneda.component';
import { AbmTipoMonedaComponent } from './frm-abm/abm-tipo-moneda/abm-tipo-moneda.component';
import { LstTipoMonedaComponent } from './lst/lst-tipo-moneda/lst-tipo-moneda.component';
import { ComboMonedaComponent } from './component/combo-moneda/combo-moneda.component';
import { AbmPrevUnidadEspecialComponent } from './frm-abm/abm-prev-unidad-especial/abm-prev-unidad-especial.component';
import { AbmPlanillaHDComponent } from './frm-abm/component/abm-planilla-hd/abm-planilla-hd.component';
import { FilBuscadorDelitoComponent } from './component/fil-buscador-delito/fil-buscador-delito.component';
import { ComboRolComponent } from './component/combo-rol/combo-rol.component';
import { VerificacionComponent } from './compartido/verificacion/verificacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { FilBuscadorLocalidadComponent } from './component/fil-buscador-localidad/fil-buscador-localidad.component';
import { VentanaLstAbmMediosComponent } from './component/ventana-lst-abm-medios/ventana-lst-abm-medios.component';
import { VentanaLstAbmObjetoComponent } from './component/ventana-lst-abm-objeto/ventana-lst-abm-objeto.component';
import { AbmHomicidiosDolososComponent } from './frm-abm/component/abm-homicidios-dolosos/abm-homicidios-dolosos.component';
import { PlanillaExcelComponent } from './frm-abm/component/abm-homicidios-dolosos/planillas/planilla-excel/planilla-excel.component';
import { AbmSuicidioComponent } from './frm-abm/component/abm-suicidio/abm-suicidio.component';
import { PlanillaExcelSuicidioComponent } from './frm-abm/component/abm-suicidio/planillas/planilla-excel-suicidio/planilla-excel-suicidio.component';
import { AbmMuertesVialesComponent } from './frm-abm/component/abm-muertes-viales/abm-muertes-viales.component';
import { PlanillaExcelMuertesVialesComponent } from './frm-abm/component/abm-muertes-viales/planillas/planilla-excel-muertes-viales/planilla-excel-muertes-viales.component';
import { FiltroLocalidadesComponent } from './component/filtro-localidades/filtro-localidades.component';
import { FiltroDelitoComponent } from './component/filtro-delito/filtro-delito.component';
import { FiltroLugarComponent } from './component/filtro-lugar/filtro-lugar.component';
import { FiltroBarrioComponent } from './component/filtro-barrio/filtro-barrio.component';
import { FiltroCalleComponent } from './component/filtro-calle/filtro-calle.component';
import { FiltroObjetoComponent } from './component/filtro-objeto/filtro-objeto.component';
defineLocale('es', esLocale);

@NgModule({
    declarations: [
      PagesComponent,
      SidebarComponent,
      FooterComponent,
      NavbarComponent,
      LstDepartamentoComponent,
      FilDepartamentoComponent,
      AbmDepartamentoComponent,
      LstBarrioComponent,
      AbmBarrioComponent,
      FilBarrioComponent,
      FilCalleComponent,
      AbmCalleComponent,
      LstCalleComponent,
      ComboBarrioComponent,
      FilDelitoComponent,
      AbmDelitoComponent,
      LstDelitoComponent,
      ComboArticuloComponent,
      ComboDncpComponent,
      FilDncpComponent,
      AbmDncpComponent,
      LstDncpComponent,
      LstArticuloComponent,
      FilArticuloComponent,
      AbmArticuloComponent,
      LstLugarComponent,
      FilLugarComponent,
      AbmLugarComponent,
      ComboLugarComponent,
      AbmMedioComponent,
      FilMedioComponent,
      LstMedioComponent,
      FilLocalidadComponent,
      AbmLocalidadComponent,
      LstLocalidadComponent,
      ComboNacionComponent,
      ComboProvinciaComponent,
      ComboDepartamentoComponent,
      LstNacionesComponent,
      AbmNacionesComponent,
      FilNacionesComponent,
      FilProvinciaComponent,
      AbmProvinciaComponent,
      LstProvinciaComponent,
      FilObjetoComponent,
      AbmObjetoComponent,
      LstObjetoComponent,
      LstModalidadComponent,
      FilModalidadComponent,
      AbmModalidadComponent,
      LstEstudioComponent,
      AbmEstudioComponent,
      FilEstudioComponent,
      LstOcupacionComponent,
      FilOcupacionComponent,
      AbmOcupacionComponent,
      FilSexoComponent,
      AbmSexoComponent,
      LstSexoComponent,
      FilVinculoComponent,
      AbmVinculoComponent,
      LstVinculoComponent,
      FilArmaMarcaComponent,
      AbmArmaMarcaComponent,
      LstArmaMarcaComponent,
      LstVehiculoMarcaComponent,
      AbmVehiculoMarcaComponent,
      FilVehiculoMarcaComponent,
      FilModeloVehiculoComponent,
      AbmModeloVehiculoComponent,
      LstModeloVehiculoComponent,
      ComboMarcaComponent,
      LstPreventivoComponent,
      FilPreventivoComponent,
      AbmPreventivoComponent,
      AbmPreventivoMedioComponent,
      AbmPrevObjetoComponent,
      AbmPrevModalidadComponent,
      AbmPrevCaratulaComponent,
      AbmSnicComponent,
      ComboLocalidadComponent,
      GeoMapComponent,
      AbmPreVictimaComponent,
      ComboSexoComponent,
      ComboEstudioComponent,
      AbmPrevInculpadoComponent,
      ComboVinculoComponent,
      AbmPrevAmpliacionComponent,
      AbmDetallePreventivoComponent,
      LstContravencionComponent,
      FilContravencionComponent,
      AbmContravencionComponent,
      AbmArtContravencionComponent,
      AbmDtallePreventivoComponent,
      GeoLocalizacionInversaComponent,
      LstUnidadesComponent,
      AbmUnidadesComponent,
      FilUnidadesComponent,
      FilUnidadAutocompletadoComponent,
      FilAutocompletadoUnidadSuedComponent,
      FilArmaComponent,
      FilModeloAutoComponent,
      LstUsuariosComponent,
      FiUsuariosSuedComponent,
      FilUsuariosComponent,
      AbmConsultaUsuarioComponent,
      AbmRegistroCivilComponent,
      AbmPrevHomicidioComponent,
      AbmPrevSuicidioComponent,
      FilMarcaMotoComponent,
      FilModeloMotoComponent,
      LstMarcaMotoComponent,
      LstModeloMotoComponent,
      AbmMarcaMotoComponent,
      AbmModeloMotoComponent,
      ComboMarcaMotoComponent,
      FilBuscadorModeloMotoComponent,
      FilIdentidadGeneroComponent,
      AbmIdentidadGeneroComponent,
      LstIdentidadGeneroComponent,
      ComboIdentidadGeneroComponent,
      FilBuscadorCalleComponent,
      FilBuscadorBarrioComponent,
      FilTipoMonedaComponent,
      AbmTipoMonedaComponent,
      LstTipoMonedaComponent,
      ComboMonedaComponent,
      AbmPrevUnidadEspecialComponent,
      AbmPlanillaHDComponent,
      FilBuscadorDelitoComponent,
      ComboRolComponent,
      VerificacionComponent,
      FilBuscadorLocalidadComponent,
      VentanaLstAbmMediosComponent,
      VentanaLstAbmObjetoComponent,
      AbmHomicidiosDolososComponent,
      PlanillaExcelComponent,
      AbmSuicidioComponent,
      PlanillaExcelSuicidioComponent,
      AbmMuertesVialesComponent,
      PlanillaExcelMuertesVialesComponent,
      FiltroLocalidadesComponent,
      FiltroDelitoComponent,
      FiltroLugarComponent,
      FiltroBarrioComponent,
      FiltroCalleComponent,
      FiltroObjetoComponent,
      
    ],
    exports: [],
    imports: [
      BrowserModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      PagesRoutingModule,
      AutocompleteLibModule,
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    bootstrap: [PagesComponent],
  })
  export class PagesModule {}