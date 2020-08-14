import {
    Http, Request, RequestOptions,
    RequestOptionsArgs, Response, XHRBackend
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class HttpInterceptorService extends Http {


    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
        private router: Router,
        private toastr: ToastrService

    ) {
        super(backend, options);
    }


    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    handleError = (error: Response) => {

        // Do messaging and error handling here
        if (error.status == 401 || error.status == 500) {
            const errMessage = '';
            if (error.status === 401) {
               this.toastr.error('Session has expired, Please re login');
            } else {
               this.toastr.error('Something went wrong.Please try after some time');
            }
            this.router.navigate(['/login']);

        } else {
            return Observable.throw(error);
        }
    }
}
