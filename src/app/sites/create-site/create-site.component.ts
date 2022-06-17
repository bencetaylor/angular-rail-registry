import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteService } from '../../service/site.service';
import { Site } from '../site/site';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.css'],
})
export class CreateSiteComponent implements OnInit {
  siteForm: FormGroup;
  IdGenerator: number = 4;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private siteService: SiteService
  ) {}

  ngOnInit() {
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

  onSubmit(site: Site) {
    site.status = true;
    site.id = this.IdGenerator++;
    this.siteService.createSite(site).subscribe((res) => {
      alert('Create was successful!');
      this.siteForm.reset();
      this.router.navigate(['/sites']);
    });
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
      if (this.name.hasError('required')) return 'Please enter a name!';
      if (this.name.hasError('maxlength'))
        return 'You can enter maximum 20 characters!';
    }
    return '';
  }

  getOwnerErrorMessage() {
    if (this.owner.dirty || this.owner.touched) {
      if (this.owner.hasError('required')) return 'Please enter an owner!';
      if (this.owner.hasError('maxlength'))
        return 'You can enter maximum 20 characters!';
    }
    return '';
  }

  getAddressErrorMessage() {
    if (this.address.dirty || this.address.touched) {
      if (this.address.hasError('required')) return 'Please enter an address!';
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
