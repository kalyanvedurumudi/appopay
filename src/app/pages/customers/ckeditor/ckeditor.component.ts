import { Component, OnInit } from '@angular/core';
import * as Editor from './build.3/ckeditor';
import { CKEditorService } from '@app/services/ckeditor.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

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
    editorData: 'Enter your question'
  };
  
  questions = [
    {
      inner: "<p>In elementary algebra, the <strong>quadratic formula</strong> is the solution of the quadratic equation.</p><p><math xmlns='http://www.w3.org/1998/Math/MathML'><mi>x</mi><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>±</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math></p>",
      marks: "10 Marks"
    }, {
      inner: "<p>Can you explain, the <strong>chemical formula</strong> given below.</p><p>&nbsp;&nbsp;<math class='wrs_chemistry' xmlns='http://www.w3.org/1998/Math/MathML'><mi>Fe</mi><mo>(</mo><mi mathvariant='normal'>s</mi><mo>)</mo><mo>&nbsp;</mo><mo>+</mo><mi mathvariant='normal'>H</mi><mn>2</mn><mi mathvariant='normal'>O</mi><mo>(</mo><mi mathvariant='normal'>g</mi><mo>)</mo><mo>&nbsp;</mo><mo>=</mo><mo>&nbsp;</mo><mi>Fe</mi><mn>3</mn><mi mathvariant='normal'>O</mi><mn>4</mn><mo>&nbsp;</mo><mo>+</mo><mo>&nbsp;</mo><mi mathvariant='normal'>H</mi><mn>2</mn><mo>(</mo><mi mathvariant='normal'>g</mi><mo>)</mo></math></p><p>&nbsp;</p>",
      marks: "15 Marks"
    }, {
      inner: "<p>What is the <strong>chemical equation</strong> for</p><p><math class='wrs_chemistry' xmlns='http://www.w3.org/1998/Math/MathML'><mi>MnO</mi><mn>2</mn><mo>&nbsp;</mo><mo>+</mo><mo>&nbsp;</mo><mi>HCL</mi><mo>&nbsp;</mo><mo>=</mo><mo>&nbsp;</mo><mi>MnCl</mi><mn>2</mn><mo>&nbsp;</mo><mo>+</mo><mo>&nbsp;</mo><mi>Cl</mi><mn>2</mn><mo>&nbsp;</mo><mo>+</mo><mo>&nbsp;</mo><mi mathvariant='normal'>H</mi><mn>2</mn><mi mathvariant='normal'>O</mi></math></p>",
      marks: "20 Marks"
    }
  ];

  dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];


  onFilterChange(value: string): void {
    console.log('filter:', value);
  }

  constructor(
    private service: CKEditorService
  ) { }

  ngOnInit(): void {
    this.items = this.service.getBooks();
  }
}
