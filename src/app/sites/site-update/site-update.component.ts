import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { SiteService } from '../../service/site.service';
import { Site } from '../site/site';

@Component({
  selector: 'app-site-update',
  templateUrl: './site-update.component.html',
  styleUrls: ['./site-update.component.css'],
})
export class SiteUpdateComponent implements OnInit {
  siteForm: FormGroup;
  site: Site;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private siteService: SiteService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => this.siteService.getSite(+params.get('siteId')))
      )
      .subscribe((site) => {
        this.site = site;
      });

    this.siteForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      owner: ['', [Validators.required, Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.maxLength(20)]],
      zip: [
        '',
        [
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(4),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      status: ['', Validators.required],
    });
  }

  onSubmit(site: any) {
    this.siteService.updateSite(site).subscribe(
      (res) => {
        alert('Update was successful!');
        this.router.navigate(['/sites']);
      },
      (error) => {
        alert('Update failed!');
        console.log(error);
      }
    );
  }

  /* Validators */
  get name() {
    return this.siteForm.get('name');
  }
  get owner() {
    return this.siteForm.get('owner');
  }
  get address() {
    return this.siteForm.get('address');
  }
  get zip() {
    return this.siteForm.get('zip');
  }

  /* Messages */

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('required')) return 'You must enter a value!';
      if (this.name.hasError('maxlength'))
        return 'You can enter maximum 20 characters!';
    }
    return '';
  }

  getOwnerErrorMessage() {
    if (this.owner.dirty || this.owner.touched) {
      if (this.owner.hasError('required')) return 'You must enter a value!';
      if (this.owner.hasError('maxlength'))
        return 'You can enter maximum 20 characters!';
    }
    return '';
  }

  getAddressErrorMessage() {
    if (this.address.dirty || this.address.touched) {
      if (this.address.hasError('required')) return 'You must enter a value!';
      if (this.address.hasError('maxlength'))
        return 'You can enter maximum 20 characters!';
      if (this.address.hasError('trackNr'))
        return 'Track number checksum failed!';
    }
    return '';
  }

  getZipErrorMessage() {
    if (this.zip.dirty || this.zip.touched) {
      if (this.zip.hasError('required')) return 'Please enter a zip code!';
      if (this.zip.hasError('maxlength') || this.zip.hasError('minlength'))
        return 'Please enter exactly 4 digits';
      if (this.zip.hasError('pattern')) return 'Please enter only numbers!';
    }
    return '';
  }
}
