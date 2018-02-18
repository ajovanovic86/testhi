import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Automobile } from './automobile.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AutomobileService {

    private resourceUrl =  SERVER_API_URL + 'api/automobiles';

    constructor(private http: Http) { }

    create(automobile: Automobile): Observable<Automobile> {
        const copy = this.convert(automobile);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(automobile: Automobile): Observable<Automobile> {
        const copy = this.convert(automobile);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Automobile> {
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
     * Convert a returned JSON object to Automobile.
     */
    private convertItemFromServer(json: any): Automobile {
        const entity: Automobile = Object.assign(new Automobile(), json);
        return entity;
    }

    /**
     * Convert a Automobile to a JSON which can be sent to the server.
     */
    private convert(automobile: Automobile): Automobile {
        const copy: Automobile = Object.assign({}, automobile);
        return copy;
    }
}
