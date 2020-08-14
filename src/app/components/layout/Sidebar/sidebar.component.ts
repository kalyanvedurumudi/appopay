import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'air-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isSidebarOpen: boolean
  isMenuCollapsed: boolean
  isMenuShadow: boolean
  isMenuUnfixed: boolean
  menuLayoutType: string
  menuType: string
  menuColor: string
  flyoutMenuColor: string
  systemLayoutColor: string
  isTopbarFixed: boolean
  isFooterDark: boolean
  isContentNoMaxWidth: boolean
  isAppMaxWidth: boolean
  isGrayBackground: boolean
  isGrayTopbar: boolean
  isCardShadow: boolean
  isSquaredBorders: boolean
  isBorderless: boolean
  routerAnimation: string
  locale: string

  constructor(private store: Store<any>) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.isSidebarOpen = state.isSidebarOpen
      this.isMenuCollapsed = state.isMenuCollapsed
      this.isMenuShadow = state.isMenuShadow
      this.isMenuUnfixed = state.isMenuUnfixed
      this.menuLayoutType = state.menuLayoutType
      this.menuType = state.menuType
      this.menuColor = state.menuColor
      this.flyoutMenuColor = state.flyoutMenuColor
      this.systemLayoutColor = state.systemLayoutColor
      this.isTopbarFixed = state.isTopbarFixed
      this.isFooterDark = state.isFooterDark
      this.isContentNoMaxWidth = state.isContentNoMaxWidth
      this.isAppMaxWidth = state.isAppMaxWidth
      this.isGrayBackground = state.isGrayBackground
      this.isGrayTopbar = state.isGrayTopbar
      this.isCardShadow = state.isCardShadow
      this.isSquaredBorders = state.isSquaredBorders
      this.isBorderless = state.isBorderless
      this.routerAnimation = state.routerAnimation
      this.locale = state.locale
    })
  }

  toggle() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSidebarOpen: !this.isSidebarOpen,
      }),
    )
  }

  settingChange(value: boolean, setting: string) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        [setting]: value,
      }),
    )
  }

  selectMenuType(e) {
    console.log(e)
    const { value } = e.target
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        menuType: value,
      }),
    )
  }
}
