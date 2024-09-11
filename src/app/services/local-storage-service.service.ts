import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(itemKey:string) { return localStorage.getItem(itemKey);}

  setItem(itemKey:string, item:any){ localStorage.setItem(itemKey,item);}

  removeItem(itemKey:string){ localStorage.removeItem(itemKey); }

  clearAll(){ localStorage.clear(); }





}
