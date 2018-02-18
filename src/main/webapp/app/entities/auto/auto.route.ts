import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AutoComponent } from './auto.component';
import { AutoDetailComponent } from './auto-detail.component';
import { AutoPopupComponent } from './auto-dialog.component';
import { AutoDeletePopupComponent } from './auto-delete-dialog.component';

export const autoRoute: Routes = [
    {
        path: 'auto',
        component: AutoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.auto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'auto/:id',
        component: AutoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.auto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const autoPopupRoute: Routes = [
    {
        path: 'auto-new',
        component: AutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.auto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'auto/:id/edit',
        component: AutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.auto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'auto/:id/delete',
        component: AutoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.auto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
