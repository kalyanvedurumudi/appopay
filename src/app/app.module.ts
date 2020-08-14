import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { IconDefinition } from '@ant-design/icons-angular'
import * as AllIcons from '@ant-design/icons-angular/icons'
import { NZ_ICONS } from 'ng-zorro-antd'
import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from './store/reducers'


/**
 * Locale Registration
 */
import { NgImageSliderModule } from 'ng-image-slider';
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { NZ_I18N, en_US as localeZorro } from 'ng-zorro-antd'
import { ApiProvider } from './services/api-provider';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')
/**
 * AntDesign Icons
 */
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition
}
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

/**
 * Firebase Config
 */
const firebaseConfig = {
  apiKey: 'AIzaSyA2LHKgdr2GQb_QUBYfhMOaxgOuGjw1z5E',
  authDomain: 'airui-a4b63.firebaseapp.com',
  databaseURL: 'https://airui-a4b63.firebaseio.com',
  projectId: 'airui-a4b63',
  storageBucket: 'airui-a4b63.appspot.com',
  messagingSenderId: '1039460737420',
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TranslateModule.forRoot(),
    /**
     * NgRx Store
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),

    /**
     * Nprogress Modules
     */
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,

    /**
     * Firebase Modules
     */
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

    /**
     * Routing Module
     */
    AppRoutingModule,
    NgImageSliderModule,
    // Storage
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    ...LOCALE_PROVIDERS,
    { provide: NZ_ICONS, useValue: icons },
    { provide: FirestoreSettingsToken, useValue: {} },
    ApiProvider,
    HttpInterceptorService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
