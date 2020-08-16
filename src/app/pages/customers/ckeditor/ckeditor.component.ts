import { Component, OnInit } from '@angular/core';
import * as Editor from './build.3/ckeditor';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss'],
  styles: [
    `
      nz-date-picker ::ng-deep .ant-calendar-picker {
        width: 100%;
      }

      nz-date-picker,
      nz-time-picker {
        width: 100%;
      }
    `,
  ],
})
export class CKEditorComponent implements OnInit {
  public Editor = Editor;
  public model = {
    editorData: '<p>In elementary algebra, the <strong>quadratic formula</strong> is the solution of the quadratic equation.</p><p><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>±</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math></p>'
  };
  

  constructor(
  ) { }

  ngOnInit() {
  }
}
