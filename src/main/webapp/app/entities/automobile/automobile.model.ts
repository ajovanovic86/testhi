import { BaseEntity } from './../../shared';

export class Automobile implements BaseEntity {
    constructor(
        public id?: number,
        public color?: string,
        public autoTipId?: number,
        public claims?: BaseEntity[],
    ) {
    }
}
