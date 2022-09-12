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
    ],
    exports: [],
    imports: [
      BrowserModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      PagesRoutingModule,
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    bootstrap: [PagesComponent],
  })
  export class PagesModule {}