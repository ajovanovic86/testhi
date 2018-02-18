import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MehanicarSharedModule } from '../../shared';
import {
    AutoTipService,
    AutoTipPopupService,
    AutoTipComponent,
    AutoTipDetailComponent,
    AutoTipDialogComponent,
    AutoTipPopupComponent,
    AutoTipDeletePopupComponent,
    AutoTipDeleteDialogComponent,
    autoTipRoute,
    autoTipPopupRoute,
} from './';

const ENTITY_STATES = [
    ...autoTipRoute,
    ...autoTipPopupRoute,
];

@NgModule({
    imports: [
        MehanicarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AutoTipComponent,
        AutoTipDetailComponent,
        AutoTipDialogComponent,
        AutoTipDeleteDialogComponent,
        AutoTipPopupComponent,
        AutoTipDeletePopupComponent,
    ],
    entryComponents: [
        AutoTipComponent,
        AutoTipDialogComponent,
        AutoTipPopupComponent,
        AutoTipDeleteDialogComponent,
        AutoTipDeletePopupComponent,
    ],
    providers: [
        AutoTipService,
        AutoTipPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MehanicarAutoTipModule {}
