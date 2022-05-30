import { Injectable } from '@angular/core';
import { SiteTable } from '../data/sites';
import { WagonTable } from '../data/wagons';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const db = {
      sites: SiteTable.sites,
      wagons: WagonTable.wagons,
    };
    return db;
  }
}
