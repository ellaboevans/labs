import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fullEmailValidator(emailPattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const badEmail = !emailPattern.test(control.value);
    return badEmail ? { invalidEmail: { value: control.value } } : null;
  };
}
