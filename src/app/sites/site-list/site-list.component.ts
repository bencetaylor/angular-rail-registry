import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../service/site.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  // $sites: Observable<Site[]> = this.store.pipe(select(selectSites));

  $sites: Observable<Site[]>;

  constructor(private siteService: SiteService, private store: Store) {}

  ngOnInit() {
    this.$sites.subscribe(this.siteService.getSites);
    this.$sites.forEach((list) => {
      list.forEach((s) => console.log(s));
    });
  }

  // onDelete(site: Site): void {
  //   this.store.dispatch(siteDeleteAction({site}));
  // }
}
