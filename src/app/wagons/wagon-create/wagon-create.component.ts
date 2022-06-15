import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteService } from '../../service/site.service';
import { WagonService } from '../../service/wagon.service';
import { Site } from '../../sites/site/site';
import { TrackNumberValidator } from '../../validators/tracknumber.validator';
import { Wagon } from '../wagon/wagon';

@Component({
  selector: 'app-wagon-create',
  templateUrl: './wagon-create.component.html',
  styleUrls: ['./wagon-create.component.css'],
})
export class WagonCreateComponent implements OnInit {
  wagonForm: FormGroup;
  sites: Site[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private wagonService: WagonService,
    private siteService: SiteService,
    private tracknumberValidator: TrackNumberValidator
  ) {}

  ngOnInit() {
    this.wagonForm = this.formBuilder.group({
      id: '',
      serial: ['', [Validators.required, Validators.maxLength(6)]],
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
          validators: [Validators.required, Validators.maxLength(14)],
          asyncValidators: this.tracknumberValidator.tracknumberValidatorFn(),
          updateOn: 'blur',
        },
      ],
      owner: ['', [Validators.required, Validators.maxLength(50)]],
      siteId: ['', [Validators.required]],
      status: true,
      // siteName: ['', [Validators.required]],
    });

    this.siteService.getSites().subscribe((res) => {
      this.sites = res;
    });
  }

  onCreate(wagon: Wagon) {
    wagon.status = true;
    this.wagonService.createWagon(wagon).subscribe((res) => {
      console.log('form submitted' + JSON.stringify(wagon));
      this.wagonForm.reset();
      alert('Update was successful!');
      this.router.navigate(['/wagons']);
    });
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
        return 'You can enter at most 50 characters!';
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
}
