import { Component, OnInit } from '@angular/core';
import { Wagon } from './wagon';

@Component({
  selector: 'app-wagon',
  templateUrl: './wagon.component.html',
  styleUrls: ['./wagon.component.css'],
})
export class WagonComponent implements OnInit {
  wagon: Wagon;

  constructor() {
    this.wagon = {
      id: 1,
      serial: 'BDbhv',
      productionDate: '1987',
      trackNr: '505520055557',
      owner: 'MÁV',
      siteId: 1,
      status: true,
    };
  }

  ngOnInit() {
    console.log('Wagon component initialized');
  }
}
