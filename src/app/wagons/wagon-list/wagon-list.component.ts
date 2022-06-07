import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WagonService } from '../../service/wagon.service';
import { Wagon } from '../wagon/wagon';

export interface PeriodicElement {
  serial: string;
  productionDate: string;
  trackNr: string;
  owner: string;
}

@Component({
  selector: 'app-wagon-list',
  templateUrl: './wagon-list.component.html',
  styleUrls: ['./wagon-list.component.css'],
})
export class WagonListComponent implements OnInit {
  constructor(private wagonService: WagonService) {}

  displayedColumns: string[] = [
    'id',
    'serial',
    'productionDate',
    'trackNr',
    'owner',
    'siteId',
    'status',
  ];
  $wagons: Observable<Wagon[]>;
  wagons: any[];

  initializeWagons() {
    this.$wagons = this.wagonService.getWagons();
    this.$wagons.subscribe((result) => {
      this.wagons = result;
    });
  }

  ngOnInit() {
    this.initializeWagons();
  }
}
