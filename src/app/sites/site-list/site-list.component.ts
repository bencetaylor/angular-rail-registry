import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SiteService } from '../../service/site.service';
import { Store, select } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';
import { Site } from '../site/site';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  name: string;
  owner: string;
  address: string;
  zip: number;
  status: boolean;
}

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'owner', 'address', 'zip', 'actions'];
  dataSource = new MatTableDataSource<Site>();

  @ViewChild(MatSort) sort: MatSort;

  $sites: Observable<Site[]>;
  sites: any[];

  constructor(private siteService: SiteService, private store: Store) {}

  initializeSites() {
    // this.$sites = this.siteService.getSites();
    // this.$sites.subscribe((result) => {
    //   this.sites = result;
    // });

    this.siteService.getSites().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  ngOnInit() {
    this.initializeSites();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // onDelete(site: Site) {
  //   this.siteService.deleteSite(site).subscribe(
  //     (res) => {
  //       site = res;
  //       this.initializeSites();
  //     },
  //     (error) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // onReset(site: Site) {
  //   site.status = true;
  //   this.siteService.updateSite(site).subscribe(
  //     (res) => {
  //       site = res;
  //     },
  //     (error) => console.log(error.message)
  //   );
  // }

  // @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  // @ViewChild(MatSort) sort: MatSort;

  // sortData(sort: Sort) {
  //   const data = this.sites.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sites = data;
  //     return;
  //   }

  //   this.sites = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name':
  //         return this.compare(a.name, b.name, isAsc);
  //       case 'owner':
  //         return this.compare(a.owner, b.owner, isAsc);
  //       case 'address':
  //         return this.compare(a.address, b.address, isAsc);
  //       case 'code':
  //         return this.compare(a.code, b.code, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });
  // }

  // private compare(a: number | string, b: number | string, isAsc: boolean) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }
}
