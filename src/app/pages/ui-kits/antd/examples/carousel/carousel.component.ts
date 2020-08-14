import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-carousel-example',
  templateUrl: './carousel.component.html',
  styles: [
    `
      [nz-carousel-content] {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        color: #fff;
        overflow: hidden;
      }

      h3 {
        color: #fff;
      }
    `,
  ],
})
export class AirAntdCarouselExampleComponent {
  array = [1, 2, 3, 4]
  effect = 'scrollx'
}
