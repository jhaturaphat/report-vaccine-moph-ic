import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from 'src/app/services/mock-data.service';
import {IpersonTypeName} from './person_type_name.interface'

@Component({
  selector: 'app-sub-report-vaccine',
  templateUrl: './sub-report-vaccine.component.html',
  styleUrls: ['./sub-report-vaccine.component.css']
})
export class SubReportVaccineComponent implements  OnDestroy, OnInit {
  sub$;
  chw:any;
  amp:any;
  tmp:any;
  item_person:any;
  item_persontypename:any;
  vaccine_plans:Object[] = [];
 constructor(
  private mockdata:MockDataService,
  private Activatedroute: ActivatedRoute,
  ){
  this.sub$ = this.Activatedroute.paramMap.subscribe((params) => {    
    this.chw = params.get('chw');
    this.amp = params.get('amp');
    this.tmp = params.get('tmp');  
    console.log('chw = ',this.chw);
    console.log('amp = ', this.amp);
    console.log('tmp = ',this.tmp);
    
  });
 } 

  ngOnInit(): void {
    this.item_person = this.mockdata.vaccine_data.filter((e:any)=> {
      return (e.chw_code === this.chw) && (e.amp_code === this.amp) && (e.tmb_code === this.tmp);
    });
    console.log("item_person", this.item_person);
    
    this.item_persontypename = this.item_person
    .map((e:any)=>e.person_type_name).reduce((unique:any, item:any)=>(unique.includes(item) ? unique : [...unique, item]),[]).sort();        
    console.log('item_persontypename',this.item_persontypename);

  }

  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }

}
