import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AutoTip } from './auto-tip.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AutoTipService {

    private resourceUrl =  SERVER_API_URL + 'api/auto-tips';

    constructor(private http: Http) { }

    create(autoTip: AutoTip): Observable<AutoTip> {
        const copy = this.convert(autoTip);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(autoTip: AutoTip): Observable<AutoTip> {
        const copy = this.convert(autoTip);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AutoTip> {
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
     * Convert a returned JSON object to AutoTip.
     */
    private convertItemFromServer(json: any): AutoTip {
        const entity: AutoTip = Object.assign(new AutoTip(), json);
        return entity;
    }

    /**
     * Convert a AutoTip to a JSON which can be sent to the server.
     */
    private convert(autoTip: AutoTip): AutoTip {
        const copy: AutoTip = Object.assign({}, autoTip);
        return copy;
    }
}
