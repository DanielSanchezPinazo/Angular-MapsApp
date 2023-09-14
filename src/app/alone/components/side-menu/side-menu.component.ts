import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  name: string,
  route: string
}

@Component({
  selector: 'side-menu',
  standalone: true,
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { route: "/maps/fullscreen", name: "FullScreen" },
    { route: "/maps/zoom-range", name: "ZoomRange" },
    { route: "/maps/markers", name: "Markers" },
    { route: "/maps/properties", name: "Houses" },
    { route: "/maps/alone", name: "Alone Page" }
  ];


}
