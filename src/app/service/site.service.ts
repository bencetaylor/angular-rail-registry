import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable } from 'rxjs';
import { Site } from '../sites/site/site';
import { RequestService } from './request.service';
import { WagonService } from './wagon.service';

const SITE_URL = 'api/sites';

@Injectable()
export class SiteService {
  constructor(
    private requestService: RequestService,
    private wagonService: WagonService
  ) {}

  getSites(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<any>(`${SITE_URL}`, httpOptions);
  }

  getSite(siteId: number): Observable<any> {
    return this.requestService.get(`${SITE_URL}/${siteId}`);
  }

  createSite(site: Site): Observable<any> {
    return this.requestService.post(`${SITE_URL}/`, site);
  }

  updateSite(site: Site): Observable<any> {
    return this.requestService.put(`${SITE_URL}/`, site);
  }

  deleteSite(site: Site): Observable<any> {
    console.log('Delete site');
    return this.wagonService.getWagons(true).pipe(
      exhaustMap((res) => {
        if (res.filter((b) => b.siteId === site.id).length > 0) {
          throw new Error('Cannot delete site!');
        }
        site = Object.assign({}, site, { status: false });
        return this.updateSite(site);
      })
    );
  }
}
