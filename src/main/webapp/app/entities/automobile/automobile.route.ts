import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AutomobileComponent } from './automobile.component';
import { AutomobileDetailComponent } from './automobile-detail.component';
import { AutomobilePopupComponent } from './automobile-dialog.component';
import { AutomobileDeletePopupComponent } from './automobile-delete-dialog.component';

export const automobileRoute: Routes = [
    {
        path: 'automobile',
        component: AutomobileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.automobile.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'automobile/:id',
        component: AutomobileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.automobile.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const automobilePopupRoute: Routes = [
    {
        path: 'automobile-new',
        component: AutomobilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.automobile.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'automobile/:id/edit',
        component: AutomobilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.automobile.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'automobile/:id/delete',
        component: AutomobileDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mehanicarApp.automobile.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
