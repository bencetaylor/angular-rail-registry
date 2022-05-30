import { Site } from '../sites/site/site';

export class SiteTable {
  public static sites: Site[] = [
    {
      id: 1,
      name: 'Budapest',
      owner: 'MÁV',
      address: 'Budapest',
      zip: 1000,
      status: true,
    },
    {
      id: 2,
      name: 'Debrecen',
      owner: 'MÁV',
      address: 'Debrecen',
      zip: 2000,
      status: true,
    },
  ];
}
