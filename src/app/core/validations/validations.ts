import { FormGroup } from '@angular/forms';

export class CustomValidators {
  static match(
    firstControlName: any,
    secondControlName: any,
    customError = 'mismatch'
  ) {
    return (fg: FormGroup) => {
      return fg.get(firstControlName)?.value ===
        fg.get(secondControlName)?.value
        ? null
        : { [customError]: true };
    };
  }
}
