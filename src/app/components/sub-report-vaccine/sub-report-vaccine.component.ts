import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  item_person!:any;
  item_persontypename:any;
  vaccine_plans:Object[] = [];
  report_types:any[]= [];
 constructor(
  private mockdata:MockDataService,
  private Activatedroute: ActivatedRoute,
  private router:Router
  ){
  this.sub$ = this.Activatedroute.paramMap.subscribe((params) => {    
    this.chw = params.get('chw');
    this.amp = params.get('amp');
    this.tmp = params.get('tmp');  
    // console.log('chw = ',this.chw);
    // console.log('amp = ', this.amp);
    // console.log('tmp = ',this.tmp);
    
  });
 } 

  ngOnInit():void {    
    if(this.mockdata.vaccine_data.length <= 0) this.router.navigate(['/vaccine-import']);

    this.item_person = this.mockdata.vaccine_data.filter((e:any)=> {
      return (e.chw_code === this.chw) && (e.amp_code === this.amp) && (e.tmb_code === this.tmp);
    });
    
    // console.log("item_person", this.item_person);
    
    this.item_persontypename = this.item_person
    .map((e:any)=>e.person_type_name).reduce((unique:any, item:any)=>(unique.includes(item) ? unique : [...unique, item]),[]).sort();        
    // console.log('item_persontypename',this.item_persontypename);
    this.report_types= []
    this.item_person.reduce((res:any, obj:any) => {
      if(!res[obj.person_type_name]){
        let person_type_name = (typeof obj.person_type_name !== 'undefined')? obj.person_type_name:null; 
        res[obj.person_type_name] = { person_type_name, 
          target1:0, vaccine_plan_1Y:0, vaccine_plan_1N:0, vaccine_plan_1PC:0,
          target2:0, vaccine_plan_2Y:0, vaccine_plan_2N:0, vaccine_plan_2PC:0,
          target3:0, vaccine_plan_3Y:0, vaccine_plan_3N:0, vaccine_plan_3PC:0,
          target4:0, vaccine_plan_4Y:0, vaccine_plan_4N:0, vaccine_plan_4PC:0
        }
        this.report_types.push(res[obj.person_type_name]);
      }
      res[obj.person_type_name].target1 += 1; //เป้าเข็ม 1
      res[obj.person_type_name].target2 += (obj.vaccine_plan_1 === 'Y')? 1 : 0; //เป้าเข็ม 2
      res[obj.person_type_name].target3 += (obj.vaccine_plan_2 === 'Y')? 1 : 0; //เป้าเข็ม 3
      res[obj.person_type_name].target4 += (obj.vaccine_plan_3 === 'Y')? 1 : 0; //เป้าเข็ม 4
      res[obj.person_type_name].vaccine_plan_1Y += (obj.vaccine_plan_1 === 'Y')? 1 : 0; //ฉีดเข็ม1
      res[obj.person_type_name].vaccine_plan_2Y += (obj.vaccine_plan_2 === 'Y')? 1 : 0; //ฉีดเข็ม2
      res[obj.person_type_name].vaccine_plan_3Y += (obj.vaccine_plan_3 === 'Y')? 1 : 0; //ฉีดเข็ม3
      res[obj.person_type_name].vaccine_plan_4Y += (obj.vaccine_plan_4 === 'Y')? 1 : 0; //ฉีดเข็ม4
      res[obj.person_type_name].vaccine_plan_1N += (obj.vaccine_plan_1 === 'N')? 1 : 0; //ไม่ฉีดเข็ม1
      res[obj.person_type_name].vaccine_plan_2N += (obj.vaccine_plan_2 === 'N')? 1 : 0; //ไม่ฉีดเข็ม2
      res[obj.person_type_name].vaccine_plan_3N += (obj.vaccine_plan_3 === 'N')? 1 : 0; //ไม่ฉีดเข็ม3
      res[obj.person_type_name].vaccine_plan_4N += (obj.vaccine_plan_4 === 'N')? 1 : 0; //ไม่ฉีดเข็ม4
      return res;
      
    },{})
    this.report_types.sort((a, b) => a.person_type_name - b.person_type_name);
    console.log(this.report_types);
    

  }
  

 
  

  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }

}
