import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MenuNavItem } from '../../models/menu-nav-item.model';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  imports: [
    RouterModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
  ],  
})
export class MenuItemComponent implements OnInit {
  @Input() items!: MenuNavItem[];
  @ViewChild('childMenu') public childMenu: any;

  constructor(public router: Router) {}

  ngOnInit() {
  }

}
