import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

   areaExpandida: boolean;
    areaPlanillas: boolean;
    collapseNavMenu: boolean;

  constructor() {
    this.areaExpandida = false;
    this.areaPlanillas = false;
    this.collapseNavMenu = true;
   }


    ToggleNavMenu()
    {
        this.collapseNavMenu = !this.collapseNavMenu;
    }

  ngOnInit(): void {
  }

}
