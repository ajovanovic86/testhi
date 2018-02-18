import { BaseEntity } from './../../shared';

export class Claim implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public date?: any,
        public automobileId?: number,
    ) {
    }
}
