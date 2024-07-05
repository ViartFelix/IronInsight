import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileExtensionValidator(allowedExtensions: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value) {
            const fileExtension = control.value.split('.').pop().toLowerCase();
            if (allowedExtensions.findIndex(ext => ext.toLowerCase() === fileExtension) === -1) {
                return { 'invalidExtension': true };
            }
        }
        return null;
    };
}
