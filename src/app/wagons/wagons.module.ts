import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WagonsRoutingModule } from './wagons-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WagonComponent } from './wagon/wagon.component';
import { WagonListComponent } from './wagon-list/wagon-list.component';
import { WagonUpdateComponent } from './wagon-update/wagon-update.component';
import { WagonCreateComponent } from './wagon-create/wagon-create.component';
import { WagonService } from '../service/wagon.service';
import { TracknumberPipe } from '../pipes/tracknumber.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTableModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    // StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.booksReducer),
    // EffectsModule.forFeature([BookEffects])
  ],
  declarations: [
    WagonComponent,
    WagonListComponent,
    WagonUpdateComponent,
    WagonCreateComponent,
    TracknumberPipe,
  ],
  providers: [WagonService],
})
export class WagonsModule {}
