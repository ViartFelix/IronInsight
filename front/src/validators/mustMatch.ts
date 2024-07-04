import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn
{
  return (control: AbstractControl): ValidationErrors | null  => {

    const pwd = control.get(controlName);
    const matchingControl = control.get(matchingControlName);

    if(!pwd || !matchingControl) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (pwd.value !== matchingControl.value) {
      return { mustMatch: true };
    }

    return null;
  };
}
