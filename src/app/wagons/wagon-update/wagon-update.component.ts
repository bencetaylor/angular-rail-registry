import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SiteService } from '../../service/site.service';
import { WagonService } from '../../service/wagon.service';
import { Wagon } from '../wagon/wagon';

@Component({
  selector: 'app-wagon-update',
  templateUrl: './wagon-update.component.html',
  styleUrls: ['./wagon-update.component.css'],
})
export class WagonUpdateComponent implements OnInit {
  wagonForm: FormGroup;
  wagon: Wagon;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private wagonService: WagonService,
    private router: Router /*private store: Store*/
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

    this.wagonForm = this.formBuilder.group({
      id: '',
      serial: ['', [Validators.required, Validators.maxLength(50)]],
      productionDate: ['', [Validators.required]],
      trackNr: ['', [Validators.required, Validators.maxLength(50)]],
      owner: ['', [Validators.required, Validators.maxLength(50)]],
      siteId: ['', [Validators.required]],
      status: '',
      // siteName: ['', [Validators.required]],
    });
  }

  onSubmit(wagonData: any) {
    console.log(wagonData);
  }
}
