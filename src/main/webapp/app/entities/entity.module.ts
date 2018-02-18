import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MehanicarAutoModule } from './auto/auto.module';
import { MehanicarAutomobileModule } from './automobile/automobile.module';
import { MehanicarAutoTipModule } from './auto-tip/auto-tip.module';
import { MehanicarClaimModule } from './claim/claim.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MehanicarAutoModule,
        MehanicarAutomobileModule,
        MehanicarAutoTipModule,
        MehanicarClaimModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MehanicarEntityModule {}
