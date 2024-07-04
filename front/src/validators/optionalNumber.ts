import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Optional Number
 */
export function optionalNumber(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const numberRegex = new RegExp('^[\\d,.]*$')
    const isValid = numberRegex.test(control.value);
    return isValid ? null : { 'optionalNumber': { value: control.value } };
  };
}
