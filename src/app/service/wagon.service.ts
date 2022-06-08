import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
