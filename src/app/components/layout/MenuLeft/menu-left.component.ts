import { Component, OnInit, Input } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { filter } from 'rxjs/operators'
import { transition, trigger, style, animate } from '@angular/animations'
import * as _ from 'lodash'
import { select, Store } from '@ngrx/store'
import { MenuService } from 'src/app/services/menu.service'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'air-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
  animations: [
    trigger('flyoutAnimation', [
      transition(':enter', [
        style({ transform: 'translate3d(0, calc(-50% + 40px), 0)' }),
        animate('100ms ease-in-out', style({ transform: 'translate3d(0, calc(-50% + 20px), 0)' })),
      ]),
    ]),
  ],
})
export class MenuLeftComponent implements OnInit {
  menuData: any = []
  isMobileView: boolean
  isMobileMenuOpen: boolean
  isMenuCollapsed: boolean
  isMenuUnfixed: boolean
  isMenuShadow: boolean
  isSidebarOpen: boolean
  menuType: string
  menuColor: string
  flyoutMenuColor: string
  menuLayoutType: string

  activeSubmenu: string = ''
  activeItem: string = ''
  renderedFlyoutItems: object = {}
  flyoutTimers: object = {}
  flyoutActive: boolean = false
  objectKeys = Object.keys

  constructor(
    private menuService: MenuService,
    private store: Store<any>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.menuService.getMenuData().subscribe(menuData => (this.menuData = menuData))
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.isMobileView = state.isMobileView
      this.isMobileMenuOpen = state.isMobileMenuOpen
      this.isMenuCollapsed = state.isMenuCollapsed
      this.isMenuUnfixed = state.isMenuUnfixed
      this.isMenuShadow = state.isMenuShadow
      this.menuType = state.menuType
      this.menuColor = state.menuColor
      this.flyoutMenuColor = state.flyoutMenuColor
      this.menuLayoutType = state.menuLayoutType
      this.isSidebarOpen = state.isSidebarOpen
      this.flyoutActive =
        (state.menuType === 'flyout' || state.menuType === 'compact' || state.isMenuCollapsed) &&
        !state.isMobileView
    })
    this.setActiveItems(this.router.url)
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.setActiveItems(event.url ? event.url : null)
      })
  }

  toggleMobileMenu() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMobileMenuOpen: !this.isMobileMenuOpen,
      }),
    )
  }

  toggleMenu() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMenuCollapsed: !this.isMenuCollapsed,
      }),
    )
  }

  toggleSettings() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSidebarOpen: !this.isSidebarOpen,
      }),
    )
  }

  handleSubmenuClick(key: string) {
    const currentKey = this.activeSubmenu
    if (this.flyoutActive) {
      return
    }
    this.activeSubmenu = currentKey === key ? '' : key
  }

  setActiveItems(pathname) {
    const menuData = this.menuData
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item)
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key))
        }
        return flattenedItems
      }, [])
    const activeItem = _.find(flattenItems(menuData, 'children'), ['url', pathname]) || {}
    const activeSubmenu = menuData.reduce((key, parent) => {
      if (Array.isArray(parent.children)) {
        parent.children.map(child => {
          if (child.key === activeItem.key) {
            key = parent
          }
          return ''
        })
      }
      return key
    })

    this.activeItem = activeItem.key
    this.activeSubmenu = activeSubmenu.key
  }

  handleFlyoutOver(event, key, items) {
    if (this.flyoutActive) {
      clearInterval(this.flyoutTimers[key])
      const item = event.currentTarget
      const itemDimensions = item.getBoundingClientRect()
      this.renderedFlyoutItems = {
        ...this.renderedFlyoutItems,
        [key]: {
          key,
          itemDimensions,
          items,
        },
      }
    }
  }

  handleFlyoutOut(key) {
    if (this.flyoutActive) {
      this.flyoutTimers[key] = setTimeout(() => {
        const updatedFlyoutItems = Object.assign({}, this.renderedFlyoutItems)
        delete updatedFlyoutItems[key]
        this.renderedFlyoutItems = {
          ...updatedFlyoutItems,
        }
      }, 100)
    }
  }

  handleFlyoutContainerOver(key) {
    clearInterval(this.flyoutTimers[key])
  }
}
