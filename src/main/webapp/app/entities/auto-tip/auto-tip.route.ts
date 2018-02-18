import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AutoTipComponent } from './auto-tip.component';
import { AutoTipDetailComponent } from './auto-tip-detail.component';
import { AutoTipPopupComponent } from './auto-tip-dialog.component';
import { AutoTipDeletePopupComponent } from './auto-tip-delete-dialog.component';

export const autoTipRoute: Routes = [
    {
        path: 'auto-tip',
        component: AutoTipComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.autoTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'auto-tip/:id',
        component: AutoTipDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.autoTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const autoTipPopupRoute: Routes = [
    {
        path: 'auto-tip-new',
        component: AutoTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.autoTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'auto-tip/:id/edit',
        component: AutoTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.autoTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'auto-tip/:id/delete',
        component: AutoTipDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.autoTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
