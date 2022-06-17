import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      id: '',
      name: '',
      owner: '',
      address: '',
      zip: '',
      status: '',
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
}
