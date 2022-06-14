import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteService } from '../../service/site.service';
import { WagonService } from '../../service/wagon.service';
import { Site } from '../../sites/site/site';
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
    private siteService: SiteService
  ) {}

  ngOnInit() {
    this.wagonForm = this.formBuilder.group({
      id: '',
      serial: ['', [Validators.required, Validators.maxLength(50)]],
      productionDate: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      trackNr: ['', [Validators.required, Validators.maxLength(50)]],
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
}
