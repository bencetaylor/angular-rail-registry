import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      id: '',
      name: '',
      owner: '',
      address: '',
      zip: '',
      status: '',
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
}
