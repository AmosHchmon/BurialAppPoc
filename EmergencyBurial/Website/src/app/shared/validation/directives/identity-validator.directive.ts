import {Directive} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';
import {ValidationService} from '../services/validation.service';

@Directive({
  selector: '[identityvalidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IdentityValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
  standalone: false,
})

export class IdentityValidatorDirective implements Validator {


  validator: ValidatorFn;

  constructor(private validationService: ValidationService) {
    this.validator = this.identityValidator()
  }


  validate(c: FormControl) {
    return this.validator(c);
  }


  identityValidator(): ValidatorFn {
    return (c: FormControl) => {
      let isValid = this.validationService.ValidIdentityNumber(c.value);

      if (isValid) {
        return null;
      } else {
        return {
          identityvalidator: {
            valid: false
          }
        };
      }

    }
  }
}
