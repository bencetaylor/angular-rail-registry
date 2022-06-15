import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { WagonService } from '../../service/wagon.service';
import { Wagon } from '../wagon/wagon';
import { TracknumberPipe } from '../../pipes/tracknumber.pipe';
import { Site } from '../../sites/site/site';
import { SiteService } from '../../service/site.service';
import { TrackNumberValidator } from '../../validators/tracknumber.validator';

@Component({
  selector: 'app-wagon-update',
  templateUrl: './wagon-update.component.html',
  styleUrls: ['./wagon-update.component.css'],
})
export class WagonUpdateComponent implements OnInit {
  wagonForm: FormGroup;
  wagon: Wagon;
  sites: Site[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private wagonService: WagonService,
    private siteService: SiteService,
    private router: Router /*private store: Store*/,
    private tracknumberValidator: TrackNumberValidator
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.wagonService.getWagon(+params.get('wagonId'))
        )
      )
      .subscribe((wagon) => {
        this.wagon = wagon;
      });

    this.siteService.getSites().subscribe((res) => {
      this.sites = res.filter((site) => site.status);
    });

    this.wagonForm = this.formBuilder.group({
      id: [''],
      serial: ['', [Validators.required, Validators.maxLength(12)]],
      productionDate: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      trackNr: [
        '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(12),
            Validators.minLength(12),
          ],
          asyncValidators: this.tracknumberValidator.tracknumberValidatorFn(),
          updateOn: 'blur',
        },
      ],
      owner: ['', [Validators.required, Validators.maxLength(50)]],
      siteId: ['', [Validators.required]],
      status: '',
      // siteName: ['', [Validators.required]],
    });
  }

  onSubmit(wagonData: any) {
    this.wagonService.updateWagon(wagonData).subscribe(
      (res) => {
        this.wagon = res;
        alert('Update was successful!');
        this.router.navigate(['/wagons']);
      },
      (error) => {
        alert('Update failed!');
        console.log(error);
      }
    );
  }

  /* Validators */
  get serial() {
    return this.wagonForm.get('serial');
  }
  get owner() {
    return this.wagonForm.get('owner');
  }
  get trackNr() {
    return this.wagonForm.get('trackNr');
  }
  get productionDate() {
    return this.wagonForm.get('productionDate');
  }
  get siteId() {
    return this.siteId.get('siteId');
  }
  // get siteName() {
  //   return this.siteName.get('siteName');
  // }

  /* Messages */

  getSerialErrorMessage() {
    if (this.serial.dirty || this.serial.touched) {
      if (this.serial.hasError('required')) return 'You must enter a value!';
      if (this.serial.hasError('maxlength'))
        return 'You can enter at most 5 characters!';
    }
    return '';
  }

  getOwnerErrorMessage() {
    if (this.owner.dirty || this.owner.touched) {
      if (this.owner.hasError('required')) return 'You must enter a value!';
      if (this.owner.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getTrackNrErrorMessage() {
    if (this.trackNr.dirty || this.trackNr.touched) {
      if (this.trackNr.hasError('required')) return 'You must enter a value!';
      if (this.trackNr.hasError('maxlength'))
        return 'You have to enter 12 digits!';
      if (this.trackNr.hasError('minlength'))
        return 'You have to enter 12 digits!';
      if (this.trackNr.hasError('trackNr'))
        return 'Track number checksum failed!';
    }
    return '';
  }

  getProductionDateErrorMessage() {
    if (this.productionDate.dirty || this.productionDate.touched) {
      if (this.productionDate.hasError('required'))
        return 'Please enter a date!';
      if (this.productionDate.hasError('pattern'))
        return 'Please enter the date in YYYY-MM-DD format!';
    }
    return '';
  }

  getSiteIdErrorMessage() {
    if (this.siteId.dirty || this.siteId.touched) {
      if (this.siteId.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }

  // getSiteNameErrorMessage() {
  //   //console.log('Debug wagon-list getSiteNameErrorMessage called');
  //   if (this.siteName.dirty || this.siteName.touched) {
  //     if (this.siteName.hasError('required')) return 'You must enter a value!';
  //   }
  //   return '';
  // }
}
