import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-autocomplete-example',
  templateUrl: './autocomplete.component.html',
})
export class AirAntdAutoCompleteExampleComponent {
  inputValue: string
  options: string[] = []

  onInput(value: string): void {
    this.options = value ? [value, value + value, value + value + value] : []
  }
}
