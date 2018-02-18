import { BaseEntity } from './../../shared';

export class Auto implements BaseEntity {
    constructor(
        public id?: number,
        public color?: string,
        public length?: number,
    ) {
    }
}
