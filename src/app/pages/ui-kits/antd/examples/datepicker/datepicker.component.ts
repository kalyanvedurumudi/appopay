import { Component } from '@angular/core'
import { getISOWeek } from 'date-fns'
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n'

@Component({
  selector: 'air-antd-datepicker-example',
  templateUrl: './datepicker.component.html',
  styles: [
    `
      nz-date-picker,
      nz-month-picker,
      nz-year-picker,
      nz-range-picker,
      nz-week-picker {
        margin: 0 8px 12px 0;
      }
    `,
  ],
})
export class AirAntdDatePickerExampleComponent {
  date = null // new Date();
  dateRange = [] // [ new Date(), addDays(new Date(), 3) ];
  isEnglish = false

  constructor(private i18n: NzI18nService) {}

  onChange(result: Date): void {
    console.log('onChange: ', result)
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result))
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US)
    this.isEnglish = !this.isEnglish
  }
}
