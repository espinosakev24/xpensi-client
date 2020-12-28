import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor() { }

  convertIsoDate(date: string) {
    const isoDate = new Date(date);
    const year = isoDate.getFullYear();
    const month = isoDate.getMonth() + 1;
    const dt = isoDate.getDate();
    return dt + '/' + month + '/' + year;
  }
  toTimestamp(reg_date: string) {
    const date = new Date(reg_date);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeStampFormat = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

    console.log(timeStampFormat);
    return timeStampFormat;
  }
}
