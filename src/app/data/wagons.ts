import { Wagon } from '../wagons/wagon/wagon';

export class WagonTable {
  public static wagons: Wagon[] = [
    {
      id: 1,
      serial: 'Bhv',
      productionDate: '1987-10-12',
      trackNr: '505520055557',
      owner: 'MÁV',
      siteId: 1,
      status: true,
    },
    {
      id: 2,
      serial: 'BDbhv',
      productionDate: '1973-05-30',
      trackNr: '505520055557',
      owner: 'MÁV',
      siteId: 1,
      status: true,
    },
    {
      id: 3,
      serial: 'AcBc',
      productionDate: '1991-03-21',
      trackNr: '505520055557',
      owner: 'MÁV',
      siteId: 2,
      status: false,
    },
    {
      id: 4,
      serial: 'HsGssa',
      productionDate: '1983-12-02',
      trackNr: '505520055557',
      owner: 'MÁV',
      siteId: 2,
      status: true,
    },
  ];
}
