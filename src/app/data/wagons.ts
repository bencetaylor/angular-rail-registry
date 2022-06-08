import { Wagon } from '../wagons/wagon/wagon';

export class WagonTable {
  public static wagons: Wagon[] = [
    {
      id: 1,
      serial: 'Bhv',
      productionDate: '1987',
      trackNr: '505520-05555-7',
      owner: 'MÁV',
      siteId: 1,
      status: false,
    },
    {
      id: 2,
      serial: 'BDbhv',
      productionDate: '1987',
      trackNr: '505520-05555-7',
      owner: 'MÁV',
      siteId: 1,
      status: true,
    },
    {
      id: 3,
      serial: 'AcBc',
      productionDate: '1987',
      trackNr: '505520-05555-7',
      owner: 'MÁV',
      siteId: 2,
      status: true,
    },
    {
      id: 4,
      serial: 'HsGssa',
      productionDate: '1987',
      trackNr: '505520-05555-7',
      owner: 'MÁV',
      siteId: 2,
      status: false,
    },
  ];
}
