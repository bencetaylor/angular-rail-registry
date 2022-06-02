import { Component, OnInit } from '@angular/core';
import { Site } from './site';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
})
export class SiteComponent implements OnInit {
  site: Site;

  constructor() {
    this.site = {
      id: 1,
      name: 'Budapest',
      owner: 'MÁV',
      address: 'Budapest',
      zip: 1000,
      status: true,
    };
  }

  ngOnInit() {
    console.log('Site component initialized');
  }
}
