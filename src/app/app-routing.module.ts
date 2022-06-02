import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'sites',
    loadChildren: () =>
      import('./sites/sites.module').then((m) => m.SitesModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'wagons',
    loadChildren: () =>
      import('./wagons/wagons.module').then((m) => m.WagonsModule),
    canLoad: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
