import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesRoutingModule } from './sites-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SiteComponent } from './site/site.component';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteUpdateComponent } from './site-update/site-update.component';
import { SiteService } from '../service/site.service';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { CreateSiteComponent } from './create-site/create-site.component';
import { WagonService } from '../service/wagon.service';

@NgModule({
  imports: [
    CommonModule,
    SitesRoutingModule,
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
    SiteComponent,
    SiteListComponent,
    SiteUpdateComponent,
    CreateSiteComponent,
  ],
  providers: [SiteService, WagonService],
  exports: [MatSortModule, MatInputModule],
})
export class SitesModule {}
