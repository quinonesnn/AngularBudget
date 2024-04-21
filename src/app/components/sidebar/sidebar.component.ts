import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';


export type SidebarItems = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  opened = true;
  collapsed = '';
  toggleSidebar(){
    this.opened = !this.opened;
    this.collapsed = this.opened ? '' : 'collapsed';
  }

  sidebarItems: SidebarItems[] =[
    {
      icon: 'space_dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'request_quote',
      label: 'Budget',
      route: 'budget',
    },
    {
      icon: 'analytics',
      label: 'Insight',
      route: 'insight'
    },
    {
      icon: 'account_box',
      label: 'Account',
      route: 'account',
    }
  ];

}
