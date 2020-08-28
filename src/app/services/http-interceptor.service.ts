import {
    Http, Request, RequestOptions,
    RequestOptionsArgs, Response, XHRBackend
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class HttpInterceptorService extends Http {


    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
        private router: Router,
        private storage: LocalStorageService,
        private notification: NzNotificationService
    ) {
        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).pipe(
            tap((res) => {
                if (res) {
                    const body = JSON.parse(res['_body']);
                    if (body && body.result === 'INVALID_PIN') {
                        this.notification.error('Error', 'Please enter valid pin');
                    }
                }
                return res;
            }),
            catchError(this.handleError)
        );
    }

    handleError = (error: Response) => {

        // Do messaging and error handling here
        if (error.status == 401 || error.status == 500) {
            if (error.status === 401) {
                this.notification.error('Error', 'Session has expired, Please re login');
                this.storage.clear();
                this.router.navigate(['system/login']);
            } else {
                this.notification.error('Error', 'Something went wrong.Please try after some time');
            }
            return Observable.throw(error);
        } else {
            return Observable.throw(error);
        }
    }
}
