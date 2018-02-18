import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MehanicarSharedModule } from '../../shared';
import {
    AutomobileService,
    AutomobilePopupService,
    AutomobileComponent,
    AutomobileDetailComponent,
    AutomobileDialogComponent,
    AutomobilePopupComponent,
    AutomobileDeletePopupComponent,
    AutomobileDeleteDialogComponent,
    automobileRoute,
    automobilePopupRoute,
} from './';

const ENTITY_STATES = [
    ...automobileRoute,
    ...automobilePopupRoute,
];

@NgModule({
    imports: [
        MehanicarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AutomobileComponent,
        AutomobileDetailComponent,
        AutomobileDialogComponent,
        AutomobileDeleteDialogComponent,
        AutomobilePopupComponent,
        AutomobileDeletePopupComponent,
    ],
    entryComponents: [
        AutomobileComponent,
        AutomobileDialogComponent,
        AutomobilePopupComponent,
        AutomobileDeleteDialogComponent,
        AutomobileDeletePopupComponent,
    ],
    providers: [
        AutomobileService,
        AutomobilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MehanicarAutomobileModule {}
