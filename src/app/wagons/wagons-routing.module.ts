import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WagonComponent } from './wagon/wagon.component';
import { AuthGuard } from '../auth/auth.guard';
import { WagonListComponent } from './wagon-list/wagon-list.component';
import { WagonCreateComponent } from './wagon-create/wagon-create.component';
import { WagonUpdateComponent } from './wagon-update/wagon-update.component';

const routes: Routes = [
  {
    path: '',
    component: WagonComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: WagonListComponent,
          },
          {
            path: 'update/:wagonId',
            component: WagonUpdateComponent,
          },
          {
            path: 'create',
            component: WagonCreateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/wagons', pathMatch: 'full' },
  { path: '**', component: WagonListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WagonsRoutingModule {}
