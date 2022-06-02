import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WagonsRoutingModule } from './wagons-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WagonComponent } from './wagon/wagon.component';
import { WagonListComponent } from './wagon-list/wagon-list.component';
import { WagonUpdateComponent } from './wagon-update/wagon-update.component';
import { WagonCreateComponent } from './wagon-create/wagon-create.component';
import { WagonService } from '../service/wagon.service';

@NgModule({
  imports: [
    CommonModule,
    WagonsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    // StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.booksReducer),
    // EffectsModule.forFeature([BookEffects])
  ],
  declarations: [
    WagonComponent,
    WagonListComponent,
    WagonUpdateComponent,
    WagonCreateComponent,
  ],
  providers: [WagonService],
})
export class WagonsModule {}
