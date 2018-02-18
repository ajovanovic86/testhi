import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MehanicarSharedModule } from '../../shared';
import {
    AutoService,
    AutoPopupService,
    AutoComponent,
    AutoDetailComponent,
    AutoDialogComponent,
    AutoPopupComponent,
    AutoDeletePopupComponent,
    AutoDeleteDialogComponent,
    autoRoute,
    autoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...autoRoute,
    ...autoPopupRoute,
];

@NgModule({
    imports: [
        MehanicarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AutoComponent,
        AutoDetailComponent,
        AutoDialogComponent,
        AutoDeleteDialogComponent,
        AutoPopupComponent,
        AutoDeletePopupComponent,
    ],
    entryComponents: [
        AutoComponent,
        AutoDialogComponent,
        AutoPopupComponent,
        AutoDeleteDialogComponent,
        AutoDeletePopupComponent,
    ],
    providers: [
        AutoService,
        AutoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MehanicarAutoModule {}
