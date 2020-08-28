import { Component } from '@angular/core'
import { ApiProvider } from '@app/services/api-provider';

@Component({
  selector: 'air-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {

  constructor(public apiProvider: ApiProvider) {}
}
