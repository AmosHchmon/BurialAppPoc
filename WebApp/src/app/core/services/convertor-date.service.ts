import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertorDateService {

constructor() { }

public getDateObject(timeFormat:string) : Date{

  const timeArr = timeFormat.split(':');

  let result = new Date();

  result.setHours(parseInt(timeArr[0]));

  result.setMinutes(parseInt(timeArr[1]));

  return result;

  }
}
