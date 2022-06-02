import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { AuthGuard } from '../auth/auth.guard';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteUpdateComponent } from './site-update/site-update.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: SiteListComponent,
          },
          {
            path: 'edit/:authorId',
            component: SiteUpdateComponent,
          },
          // {
          //   path: 'create',
          //   component: AuthorsCreateComponent
          // }
        ],
      },
    ],
  },
  { path: '', redirectTo: '/sites', pathMatch: 'full' },
  { path: '**', component: SiteListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitesRoutingModule {}
