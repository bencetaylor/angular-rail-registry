import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

const WAGON_URL = 'api/wagons';

@Injectable()
export class WagonService {
  constructor(private requestService: RequestService) {}

  getWagons(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<any>(`${WAGON_URL}`, httpOptions);
  }
}
