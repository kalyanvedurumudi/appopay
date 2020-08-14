import { Component, Input, OnChanges } from '@angular/core'

@Component({
  selector: 'air-general-16',
  templateUrl: './16.component.html',
  styleUrls: ['./16.component.scss'],
})
export class AirGeneral16Component implements OnChanges {
  @Input() isNew: boolean
  @Input() isFavorite: boolean
  @Input() image: string
  @Input() name: string
  @Input() price: string
  @Input() oldPrice: string
  setFavorite() {
    this.isFavorite = !this.isFavorite
  }
  ngOnChanges() {}
}
