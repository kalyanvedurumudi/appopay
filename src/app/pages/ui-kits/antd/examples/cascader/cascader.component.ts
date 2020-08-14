import { Component, OnInit } from '@angular/core'

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true,
          },
        ],
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true,
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true,
          },
        ],
      },
    ],
  },
]

const otherOptions = [
  {
    value: 'fujian',
    label: 'Fujian',
    children: [
      {
        value: 'xiamen',
        label: 'Xiamen',
        children: [
          {
            value: 'Kulangsu',
            label: 'Kulangsu',
            isLeaf: true,
          },
        ],
      },
    ],
  },
  {
    value: 'guangxi',
    label: 'Guangxi',
    children: [
      {
        value: 'guilin',
        label: 'Guilin',
        children: [
          {
            value: 'Lijiang',
            label: 'Li Jiang River',
            isLeaf: true,
          },
        ],
      },
    ],
  },
]

@Component({
  selector: 'air-antd-cascader-example',
  templateUrl: './cascader.component.html',
  styles: [
    `
      .ant-cascader-picker {
        width: 300px;
      }
      .change-options {
        display: inline-block;
        font-size: 12px;
        margin-top: 8px;
      }
    `,
  ],
})
export class AirAntdCascaderExampleComponent implements OnInit {
  nzOptions: any[] | null = null
  values: any[] | null = null

  ngOnInit(): void {
    setTimeout(() => {
      this.nzOptions = options
    }, 100)
  }

  changeNzOptions(): void {
    if (this.nzOptions === options) {
      this.nzOptions = otherOptions
    } else {
      this.nzOptions = options
    }
  }

  onChanges(values: any): void {
    console.log(values, this.values)
  }
}
