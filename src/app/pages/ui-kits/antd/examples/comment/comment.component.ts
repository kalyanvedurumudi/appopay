import { Component } from '@angular/core'
import { distanceInWords } from 'date-fns'

@Component({
  selector: 'air-antd-comment-example',
  templateUrl: './comment.component.html',
  styles: [
    `
      .count {
        padding-left: 8px;
        cursor: auto;
      }
    `,
  ],
})
export class AirAntdCommentExampleComponent {
  likes = 0
  dislikes = 0
  time = distanceInWords(new Date(), new Date())

  like(): void {
    this.likes = 1
    this.dislikes = 0
  }

  dislike(): void {
    this.likes = 0
    this.dislikes = 1
  }
}
