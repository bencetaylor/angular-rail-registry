import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { WagonService } from '../../service/wagon.service';
import { Wagon } from '../wagon/wagon';
import { TracknumberPipe } from '../../pipes/tracknumber.pipe';
import { SiteService } from '../../service/site.service';
import { switchMap } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
export class WagonListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['serial', 'trackNr', 'siteName', 'actions'];
  dataSource = new MatTableDataSource<Wagon>();
  showDeleted: boolean = false;
  sites: any[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private wagonService: WagonService,
    private siteService: SiteService
  ) {}

  // $wagons: Observable<Wagon[]>;
  // wagons: any[];

  initializeWagons() {
    this.wagonService.getWagons(this.showDeleted).subscribe(
      (res) => (this.dataSource.data = res),
      (error) => console.log(error.message)
    );
    // this.$wagons = this.wagonService.getWagons(this.showDeleted);
    // this.$wagons.subscribe((result) => {
    //   this.wagons = result;
    //   // console.log(this.wagons);
    // });
  }

  ngOnInit() {
    this.initializeWagons();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  showDeletedFn(event: MatCheckboxChange) {
    this.showDeleted = event.checked;
    this.initializeWagons();
  }

  onDelete(wagon: Wagon): void {
    wagon.status = false;
    this.wagonService.deleteWagon(wagon).subscribe(
      (res) => (wagon = res),
      (error) => console.log(error.message)
    );
    this.initializeWagons();
  }

  // sortWagons(sort: Sort) {
  //   const data = this.wagons.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.wagons = data;
  //     return;
  //   }

  //   this.wagons = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'serial':
  //         return compare(a.serial, b.serial, isAsc);
  //       case 'trackNr':
  //         return compare(a.trackNr, b.trackNr, isAsc);
  //       case 'siteName':
  //         return compare(a.siteId, b.siteId, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });
  // }

  onFilter($event: any) {}

  filterWagonsBySite(wagon: any) {
    this.dataSource.data = this.dataSource.data.filter(
      (_wagon) => _wagon.siteId === Number(wagon.siteId)
    );
  }

  // filter: string = '';

  // doFilter(event: any) {
  //   this.filter = event.target.value;
  //   console.log('Debug: wagon-list searchFunction: ' + this.filter);
  //   this.wagons = this.wagons.filter((e) => {
  //     return (
  //       e.serial.toLowerCase() === this.filter.toLowerCase() ||
  //       e.serial.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 ||
  //       e.trackNr.toLowerCase() === this.filter.toLowerCase() ||
  //       e.trackNr.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 ||
  //       e.siteName.toLowerCase() === this.filter.toLowerCase() ||
  //       e.siteName.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
  //     );
  //   });

  //   if (this.filter === '') {
  //     this.resetFilters();
  //   }
  // }

  resetFilters() {
    this.initializeWagons();
  }
}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
