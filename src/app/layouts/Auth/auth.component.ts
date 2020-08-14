import { Component } from '@angular/core'

@Component({
  selector: 'layout-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class LayoutAuthComponent {
  backgroundNumber = 1
  backgroundEnabled = false

  changeBackground(): void {
    this.backgroundEnabled = true
    this.backgroundNumber === 5 ? (this.backgroundNumber = 1) : (this.backgroundNumber += 1)
  }

  toggleBackground(): void {
    this.backgroundEnabled = !this.backgroundEnabled
  }
}
