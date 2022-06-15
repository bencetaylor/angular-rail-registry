import { Injectable } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WagonService } from '../service/wagon.service';

@Injectable()
export class WagonSerialValidator {
  constructor(private wagonService: WagonService) {}

  serialValidatorFn(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.wagonService.serialExists(control.value).pipe(
        map((exists) => (exists ? { serial: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
