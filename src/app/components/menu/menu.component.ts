import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from "../menu-item/menu-item.component";
import { MenuNavItem } from '../../models/menu-nav-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MenuItemComponent
],
})
export class MenuComponent {
  menuNavItems: MenuNavItem[] = [];

  constructor( private cdref: ChangeDetectorRef ) {}  
  
  ngOnInit() {
    this.menuNavItems = [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        route: '/home',
        action: () => console.log('Navigating to Dashboard'),
      },
      {
        title: 'Settings',
        icon: 'settings',
        children: [
          { title: 'Profile', icon: 'person', action: () => console.log('Profile clicked') },
          { title: 'Security', icon: 'security', action: () => console.log('Security clicked') },
        ],
      },
      {
        title: 'Settings 2',
        icon: 'settings',
        children: [
          { 
            title: 'Settings 2.1', 
            icon: 'person',          
            children: [ 
              {
                title: 'Profile 2.2', 
                icon: 'person', 
                action: () => console.log('Profile clicked'),
              }            
            ]
          },
        ],
      },    
      {
        title: 'Test 1',
        //icon: 'dashboard',
        //route: '/home',
        action: () => console.log('Test 1'),
        disabled: true
      },
      {
        title: 'Test 2',
        //icon: 'dashboard',
        //route: '/home',
        action: () => console.log('Test 2'),
        disabled: false,
        visible: false
      },
      {
        title: 'Help',
        icon: 'help',
        //route: '/home',
        action: () => console.log('Help'),            
      },
      {
        title: 'Logout',
        icon: 'logout',
        action: () => console.log('Logging out'),
      },
    ];
    this.cdref.detectChanges();

    console.log('Menu items:', this.menuNavItems);
  }

}