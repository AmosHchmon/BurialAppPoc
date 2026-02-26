import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
    constructor() {

  }

  SecurityRegxPatterns = {
    IdentityNumberPattern: /^[0-9]{5,9}|$/,
    PhoneNumberPattern: /^((\+|00)?972\-?|0)(([23489]|[57]\d)\-?\d{7})$/,
       /*/^0\d([\d]{0,1})([-]{0,1})\d{7}$/,*/
  }

  public ValidIdentityNumber(idNum:string): boolean {

    if (idNum == null || idNum == undefined)
        return true;

    if (!this.SecurityRegxPatterns.IdentityNumberPattern.test(idNum)) {
      return false;
    }


    // The number is too short - add leading 0000
    if (idNum.length < 9) {
      while (idNum.length < 9) {
        idNum = '0' + idNum;
      }
    }

    // Check the ID number
    var mone = 0, incNum;
    for (var i = 0; i < 9; i++) {
      incNum = Number(String(idNum).charAt(i));
      incNum *= (i % 2) + 1;
      if (incNum > 9)
        incNum -= 9;
      mone += incNum;
    }
    if (mone % 10 === 0)
      return true;
    else
      return false;
  };

  public ValidPhoneNumber(phoneNum:string): boolean {

    if (phoneNum == null || phoneNum == undefined)
      return true;

    if (!this.SecurityRegxPatterns.PhoneNumberPattern.test(phoneNum)) {
      return false;
    }
    else {
      return true;
    }
  }

}
