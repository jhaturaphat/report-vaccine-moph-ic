import { Component, OnInit } from '@angular/core';
import { MockDataService } from 'src/app/services/mock-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private mockdata:MockDataService){}

  ngOnInit(): void {    
    
  }

  

}
