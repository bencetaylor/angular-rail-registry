import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WagonService } from '../../service/wagon.service';
import { Wagon } from '../wagon/wagon';
import { TracknumberPipe } from '../../pipes/tracknumber.pipe';
import { SiteService } from '../../service/site.service';
import { switchMap } from 'rxjs/operators';

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
  constructor(
    private wagonService: WagonService,
    private siteService: SiteService
  ) {}

  displayedColumns: string[] = ['serial', 'trackNr', 'siteId', 'actions'];
  $wagons: Observable<Wagon[]>;
  wagons: any[];
  showDeleted: boolean = false;
  sites: any[];

  initializeWagons() {
    this.$wagons = this.wagonService.getWagons(this.showDeleted);
    this.$wagons.subscribe((result) => {
      this.wagons = result.filter((wagon) => wagon.status);
    });
  }

  ngOnInit() {
    this.initializeWagons();
  }

  onDelete(wagon: Wagon): void {
    wagon.status = false;
    this.$wagons = this.wagonService
      .deleteWagon(wagon)
      .pipe(switchMap((res) => this.wagonService.getWagons(this.showDeleted)));
    this.$wagons.subscribe((res) => {
      this.wagons = res;
    });
  }
}
