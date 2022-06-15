import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { WagonService } from '../../service/wagon.service';
import { Wagon } from '../wagon/wagon';
import { TracknumberPipe } from '../../pipes/tracknumber.pipe';
import { SiteService } from '../../service/site.service';
import { switchMap } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource = new MatTableDataSource();
  showDeleted: boolean = false;
  sites: any[];

  // @ViewChild('empTbSort') empTbSort = new MatSort();

  initializeWagons() {
    this.$wagons = this.wagonService.getWagons(this.showDeleted);
    this.$wagons.subscribe((result) => {
      // this.dataSource = new MatTableDataSource(result);
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

  sortWagons(sort: Sort) {
    const data = this.wagons.slice();
    if (!sort.active || sort.direction === '') {
      this.wagons = data;
      return;
    }

    this.wagons = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'serial':
          return compare(a.serial, b.serial, isAsc);
        case 'trackNr':
          return compare(a.trackNr, b.trackNr, isAsc);
        case 'siteId':
          return compare(a.siteId, b.siteId, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
