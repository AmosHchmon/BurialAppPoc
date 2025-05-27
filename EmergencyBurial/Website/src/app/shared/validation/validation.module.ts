import { NgModule } from '@angular/core';
import { ValidationService } from './services/validation.service';
import { IdentityValidatorDirective } from './directives/identity-validator.directive';

@NgModule({
  exports: [IdentityValidatorDirective],
  declarations: [IdentityValidatorDirective],
  providers: [ValidationService]
})
export class ValidationModule {}
