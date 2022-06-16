import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Wagon } from '../wagons/wagon/wagon';
import { RequestService } from './request.service';

const WAGON_URL = 'api/wagons';

@Injectable()
export class WagonService {
  constructor(private requestService: RequestService) {}

  getWagons(showDeleted: boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var url = `${WAGON_URL}`;
    if (!showDeleted) {
      url = `${WAGON_URL}/?status=true`;
    }
    return this.requestService.get<any>(url, httpOptions);
  }

  getWagonsBySite(siteId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log('Filter wagons by sites');
    return this.getWagons(true).pipe(filter((wagon) => wagon.siteId == siteId));
  }

  getWagon(wagonId: number): Observable<any> {
    return this.requestService.get(`${WAGON_URL}/${wagonId}`);
  }

  updateWagon(wagon: Wagon): Observable<any> {
    console.log('Update wagon');
    console.log(wagon);
    return this.requestService.put(`${WAGON_URL}`, wagon);
  }

  createWagon(wagon: Wagon): Observable<any> {
    console.log('Create wagon');
    console.log(wagon);
    return this.requestService.post(`${WAGON_URL}`, wagon);
  }

  deleteWagon(wagon: Wagon) {
    wagon = Object.assign({}, wagon, { status: false });
    return this.updateWagon(wagon);
  }

  serialExists(serial: string): Observable<boolean> {
    return this.getWagons(true).pipe(
      map((wagons) => {
        return wagons.findIndex((wagon) => wagon.serial === serial) !== -1;
      })
    );
  }
}
