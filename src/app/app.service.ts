import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URL }  from '../contants';

@Injectable()
export class AppService {
    constructor(private http: Http) {

    }
    getChuckJokes(): Observable<any> {
        const url = URL;
        return this.http.get(url);

    }
}