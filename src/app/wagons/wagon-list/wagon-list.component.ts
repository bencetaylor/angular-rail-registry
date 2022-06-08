import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WagonService } from '../../service/wagon.service';
import { Wagon } from '../wagon/wagon';
import { TracknumberPipe } from '../../pipes/tracknumber.pipe';

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

  displayedColumns: string[] = ['serial', 'trackNr', 'siteId', 'actions'];
  $wagons: Observable<Wagon[]>;
  wagons: any[];
  showDeleted: boolean = false;

  initializeWagons() {
    this.$wagons = this.wagonService.getWagons(this.showDeleted);
    this.$wagons.subscribe((result) => {
      this.wagons = result.filter((wagon) => wagon.status);
    });
  }

  // listWagons() {
  //   this.wagons.forEach((wagon) => console.log(wagon));
  // }

  ngOnInit() {
    this.initializeWagons();
  }

  onDelete(wagon: Wagon) {
    console.log('Delete wagon: ' + wagon.id);
  }
}
