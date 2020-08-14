import { Component, OnInit } from '@angular/core'
import { MenuService } from 'src/app/services/menu.service'

@Component({
  selector: 'air-topbar-dark-menu-pages',
  templateUrl: './menu-pages.component.html',
  styleUrls: ['./menu-pages.component.scss'],
})
export class TopbarDarkMenuPagesComponent implements OnInit {
  menuData: any = []

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.getMenuData().subscribe(menuData => (this.menuData = menuData))
  }
}
