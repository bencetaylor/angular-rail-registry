import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class TrackNumberValidator {
  constructor() {}

  tracknumberValidatorFn(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      let digitArr = control.value.split('');
      let checksum = digitArr[11];

      for (let i = 0; i < 11; i++) {
        if (i % 2 == 0) {
          digitArr[i] *= 2;
        }
      }

      let newNr = Math.floor(digitArr.join('') / 10);

      var sum = 0;

      while (newNr) {
        sum += newNr % 10;
        newNr = Math.floor(newNr / 10);
      }

      let newChecksum = ((sum % 10) - 10) * -1;

      let valid = checksum == newChecksum;

      return new Observable((observer) => {
        setInterval(() => {
          observer.next(valid ? null : { trackNr: true });
        }, 2500);
      }).pipe(first());
    };
  }
}
