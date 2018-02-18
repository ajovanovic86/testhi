import { BaseEntity } from './../../shared';

export class AutoTip implements BaseEntity {
    constructor(
        public id?: number,
        public brandName?: string,
        public model?: string,
    ) {
    }
}
