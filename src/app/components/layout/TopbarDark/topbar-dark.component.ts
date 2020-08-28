import { Component } from '@angular/core'
import { ApiProvider } from '@app/services/api-provider';

@Component({
  selector: 'air-topbar-dark',
  templateUrl: './topbar-dark.component.html',
  styleUrls: ['./topbar-dark.component.scss'],
})
export class TopbarDarkComponent {
  constructor(public apiProvider: ApiProvider) {}
}
