import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../service/site.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Site } from '../site/site';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'birthYear',
    'nationality',
    'actions',
  ];

  $sites: Observable<Site[]>;
  sites: any[];

  constructor(private siteService: SiteService, private store: Store) {}

  initializeSites() {
    this.$sites = this.siteService.getSites();
    this.$sites.subscribe((result) => {
      this.sites = result;
    });
  }

  ngOnInit() {
    this.initializeSites();
    // this.$sites.forEach((site) => console.log(site));
  }

  // onDelete(site: Site): void {
  //   this.store.dispatch(siteDeleteAction({site}));
  // }
}
