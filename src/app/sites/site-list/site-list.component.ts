import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SiteService } from '../../service/site.service';
import { Store } from '@ngrx/store';
import { Site } from '../site/site';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WagonService } from '../../service/wagon.service';
import { Router } from '@angular/router';

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
  selectedSite: number;
  wagons: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private siteService: SiteService,
    private wagonService: WagonService,
    private router: Router,
    private store: Store
  ) {}

  initializeSites() {
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

  onDelete(site: Site) {
    this.siteService.deleteSite(site).subscribe(
      (res) => {
        site = res;
        this.initializeSites();
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  onReset(site: Site) {
    site.status = true;
    this.siteService.updateSite(site).subscribe(
      (res) => {
        site = res;
      },
      (error) => console.log(error.message)
    );
  }

  onFilter($event: any) {
    this.dataSource.filter = $event.target.value.trim().toLocaleLowerCase();
  }

  onSiteSelect(siteId: any) {
    this.router.navigate(['/wagons', siteId]);
    // this.wagonService.getWagons(true).subscribe(
    //   (res) => {
    //     this.wagons = JSON.stringify(
    //       res.filter((wagon) => wagon.siteId == siteId)
    //     );
    //     alert(this.wagons);
    //   },
    //   (error) => console.log(error.message)
    // );
  }
}
