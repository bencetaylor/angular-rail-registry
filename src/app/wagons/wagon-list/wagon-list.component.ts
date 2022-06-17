import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WagonService } from '../../service/wagon.service';
import { Wagon } from '../wagon/wagon';
import { TracknumberPipe } from '../../pipes/tracknumber.pipe';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

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
  siteFilterId: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private wagonService: WagonService,
    private route: ActivatedRoute
  ) {}

  initializeWagons() {
    this.wagonService.getWagons(this.showDeleted).subscribe(
      (res) => {
        if (this.siteFilterId !== null)
          this.dataSource.data = res.filter(
            (wagon) => wagon.siteId === Number(this.siteFilterId)
          );
        else this.dataSource.data = res;
      },
      (error) => console.log(error.message)
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.siteFilterId = params.get('siteId');
    });

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

  onFilter($event: any) {
    this.dataSource.filter = $event.target.value.trim().toLocaleLowerCase();
  }

  filterWagonsBySite(siteId: any) {
    this.dataSource.data = this.dataSource.data.filter(
      (wagon) => wagon.siteId === Number(siteId)
    );
  }

  resetFilters() {
    this.initializeWagons();
  }
}
