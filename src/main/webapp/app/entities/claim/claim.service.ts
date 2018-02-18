import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Claim } from './claim.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClaimService {

    private resourceUrl =  SERVER_API_URL + 'api/claims';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(claim: Claim): Observable<Claim> {
        const copy = this.convert(claim);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(claim: Claim): Observable<Claim> {
        const copy = this.convert(claim);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Claim> {
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
     * Convert a returned JSON object to Claim.
     */
    private convertItemFromServer(json: any): Claim {
        const entity: Claim = Object.assign(new Claim(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Claim to a JSON which can be sent to the server.
     */
    private convert(claim: Claim): Claim {
        const copy: Claim = Object.assign({}, claim);

        copy.date = this.dateUtils.toDate(claim.date);
        return copy;
    }
}
