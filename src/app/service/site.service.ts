import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../sites/site/site';
import { RequestService } from './request.service';

const AUTHOR_URL = 'api/sites';

@Injectable()
export class SiteService {
  constructor(private requestService: RequestService) {}

  getSites(): Observable<Site[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Site[]>(
      `${AUTHOR_URL}/?deleted=false`,
      httpOptions
    );
  }

  getSite(siteId: number): Observable<any> {
    return this.requestService.get(`${AUTHOR_URL}/${siteId}`);
  }

  createSite(site: Site): Observable<any> {
    return this.requestService.post(`${AUTHOR_URL}/`, site);
  }

  updateSite(site: Site): Observable<any> {
    return this.requestService.put(`${AUTHOR_URL}/`, site);
  }

  // deleteAuthor(author: Site): Observable<any> {
  //   return this.booksService.getBooks().pipe(
  //     exhaustMap((res) => {
  //       if (res.filter((b) => b.authorId === author.id).length > 0) {
  //         throw new Error('Cannot delete author!');
  //       }
  //       author = Object.assign({}, author, { deleted: true });
  //       return this.updateAuthor(author);
  //     })
  //   );
  // }
}
