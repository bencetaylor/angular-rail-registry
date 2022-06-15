import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class TrackNumberValidator {
  constructor() {}

  tracknumberValidatorFn(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      console.log(control.value);
      return of(map((exists) => (exists ? { eventName: true } : null)));
      // return this.eventService.eventNameExists(control.value).pipe(
      //   map((exists) => (exists ? { eventName: true } : null)),
      //   catchError(() => of(null))
      // );
    };
  }
}
