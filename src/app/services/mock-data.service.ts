import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {

  constructor() { }
  public vaccine_data:Object[] = [];
}