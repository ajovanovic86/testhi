import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Auto } from './auto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AutoService {

    private resourceUrl =  SERVER_API_URL + 'api/autos';

    constructor(private http: Http) { }

    create(auto: Auto): Observable<Auto> {
        const copy = this.convert(auto);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(auto: Auto): Observable<Auto> {
        const copy = this.convert(auto);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Auto> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Auto.
     */
    private convertItemFromServer(json: any): Auto {
        const entity: Auto = Object.assign(new Auto(), json);
        return entity;
    }

    /**
     * Convert a Auto to a JSON which can be sent to the server.
     */
    private convert(auto: Auto): Auto {
        const copy: Auto = Object.assign({}, auto);
        return copy;
    }
}
