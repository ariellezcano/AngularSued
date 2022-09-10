import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
  },
  

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/pages-routing.module').then((m) => m.PagesRoutingModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
