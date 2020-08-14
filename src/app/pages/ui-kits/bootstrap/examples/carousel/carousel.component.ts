import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'air-bootstrap-carousel-example',
  templateUrl: './carousel.component.html',
  styles: [
    `
      img {
        width: 100%;
        height: auto;
      }
    `,
  ],
})
export class AirBootstrapCarouselExampleComponent implements OnInit {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`)

  constructor() {}

  ngOnInit() {}
}
