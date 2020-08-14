import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-list-example',
  templateUrl: './list.component.html',
})
export class AirAntdListExampleComponent {
  loading = false
  data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]

  change(): void {
    this.loading = true
    if (this.data.length > 0) {
      setTimeout(() => {
        this.data = []
        this.loading = false
      }, 1000)
    } else {
      setTimeout(() => {
        this.data = [
          {
            title: 'Ant Design Title 1',
          },
          {
            title: 'Ant Design Title 2',
          },
          {
            title: 'Ant Design Title 3',
          },
          {
            title: 'Ant Design Title 4',
          },
        ]
        this.loading = false
      }, 1000)
    }
  }
}
