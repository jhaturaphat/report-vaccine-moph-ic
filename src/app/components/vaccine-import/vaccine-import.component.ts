import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import readXlsxFile from 'read-excel-file';

import HC_exporting from 'highcharts/modules/exporting';
import HC_Data from 'highcharts/modules/export-data';
import Accessbility from 'highcharts/modules/accessibility';

import { iSerail } from './Ichart-vaccine.interface';

HC_exporting(Highcharts);
HC_Data(Highcharts);
Accessbility(Highcharts);

@Component({
  selector: 'app-vaccine-import',
  templateUrl: './vaccine-import.component.html',
  styleUrls: ['./vaccine-import.component.css']
})
export class VaccineImportComponent {
  myOptions:any={};
  linechart:any;
  constructor(){ }

  chwDropdownList:any = {
    id:'',
    label:'รหัสจังหวัด',    
  }
  ampDropdownList:any = {
    id:'',
    label:'รหัสอำเภอ'
  }

  tmpDropdownList:any = {
    id:'',
    label:'รหัสตำบล'
  }


  isLoading:boolean = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = { }; // required
  updateFlag = false;
  categories:string[] = [];
  series:any[] = [];
  target:iSerail = {name:'เป้าหมาย', data:[]};
  vac1:iSerail = {name:'เข็ม1',data:[]};
  vac2:iSerail = {name:'เข็ม2',data:[]};
  vac3:iSerail = {name:'เข็ม3',data:[]};
  vac4:iSerail = {name:'เข็ม4',data:[]};


  result:any[] = [];  
  chw_code:any[] = [];
  amp_code:any[] = [];
  tmp_code:any[] = [];
  moo_code:any[] = [];

  chw_result:any = null;
  amp_result:any = null;
  tmp_result:any = null;
  moo_result:any = null;

  data_amp_result:any[] = [];

  async excelRead(e:any){
    this.isLoading = true;
    let fileReaded:any;
    fileReaded = e.target.files[0];
    let type = e.target.files[0].name.split('.').pop();
    let size = e.target.files[0].size;
    // console.log("ขนาด ",size);
    // console.log(new Date());

    // if(type !== 'xlsx') return; //ถ้าไม่ใช่ excel

    const schema = {
      'prefix': {        
        prop: 'prefix',
        type: String
      },
      'first_name': {
        prop: 'first_name',
        type: String
      },
      'last_name': {
        prop: 'last_name',
        type: String
      },
      'birth_date': {
        prop: 'birth_date',
        type: String
      },
      'gender_name': {
        prop: 'gender_name',
        type: String
      },
      'person_type_name': {
        prop: 'person_type_name',
        type: String
      },
      'vaccine_plan_1': {
        prop: 'vaccine_plan_1',
        type: String
      },
      'vaccine_plan_2': {
        prop: 'vaccine_plan_2',
        type: String
      },
      'vaccine_plan_3': {
        prop: 'vaccine_plan_3',
        type: String
      },
      'vaccine_plan_4': {
        prop: 'vaccine_plan_4',
        type: String
      },
      'vaccine_plan_5': {
        prop: 'vaccine_plan_5',
        type: String
      },
      'mobile_phone': {
        prop: 'mobile_phone',
        type: String
      },
      'addr_moo': {
        prop: 'addr_moo',
        type: String
      },
      'chw_code': {
        prop: 'chw_code',
        type: String
      },
      'amp_code': {
        prop: 'amp_code',
        type: String
      },
      'tmb_code': {
        prop: 'tmb_code',
        type: String
      },
      'full_addr_name': {
        prop: 'full_addr_name',
        type: String
      },
      'hospital_code': {
        prop: 'hospital_code',
        type: String
      },
      'hospital_name': {
        prop: 'hospital_name',
        type: String
      },
      'company_name': {
        prop: 'company_name',
        type: String
      },
      'hospital_chw_code': {
        prop: 'hospital_chw_code',
        type: String
      },
      'hospital_province_name': {
        prop: 'hospital_province_name',
        type: String
      }
    };
    await readXlsxFile(e.target.files[0], {schema}).then((data:any)=>{ 
      if(data.rows){
        for(let i of data.rows){
          this.result.push(i);
        }
        // console.log(new Date()); 
        this.chw_code = this.result.map((e:any)=>e.chw_code).reduce((unique:any, item:any)=>(unique.includes(item) ? unique : [...unique, item]),[]).sort();        
        // console.log(this.chw_code);        
      }    
      this.isLoading = false;      
    });
  }

  chwIsSelect(item:any){
    this.chwDropdownList.id = item;
    this.chwDropdownList.label = item;
    // console.log(item);    
    this.chw_result = this.result.filter((e:any) => e.chw_code === item);
    this.amp_code = this.chw_result.map((e:any)=>e.amp_code).reduce((unique:any, item:any)=>(unique.includes(item) ? unique : [...unique, item]),[]);
    // console.log(this.amp_code); 
    this.amp_code.sort((a, b) => a - b);
       



  }

  ampIsSelect(item:any):void{
    this.ampDropdownList.id = item;
    this.ampDropdownList.label = item;
    this.data_amp_result = [];
    console.log("ผลลัพธ์จังหวัด");    
    console.log(this.chw_result);
    this.amp_result = this.chw_result.filter((e:any) => e.amp_code === item);  //กรอกให้เหลือแต่อำเภอที่เลือกมา
    console.log("กรอกให้เหลือแต่อำเภอที่เลือกมา");    
    console.log(this.amp_result); 
    this.amp_result.reduce((res:any, obj:any)=>{
      if(!res[obj.tmb_code]){
        let tmp_name = (typeof obj.full_addr_name !== 'undefined')? obj.full_addr_name.split(' ')[0]:null;        
        let tmp_code = (typeof obj.tmb_code !== 'undefined')? parseInt(obj.tmb_code):0;        
        res[obj.tmb_code] = {tmp_code:tmp_code, tmp_name:tmp_name, 
          target1:0, vaccine_plan_1Y:0, vaccine_plan_1N:0, vaccine_plan_1PC:0,
          target2:0, vaccine_plan_2Y:0, vaccine_plan_2N:0, vaccine_plan_2PC:0,
          target3:0, vaccine_plan_3Y:0, vaccine_plan_3N:0, vaccine_plan_3PC:0,
          target4:0, vaccine_plan_4Y:0, vaccine_plan_4N:0, vaccine_plan_4PC:0
        }
        this.data_amp_result.push(res[obj.tmb_code]);
      }
      res[obj.tmb_code].target1 += 1; //เป้าเข็ม 1
      res[obj.tmb_code].target2 += (obj.vaccine_plan_1 === 'Y')? 1 : 0; //เป้าเข็ม 2
      res[obj.tmb_code].target3 += (obj.vaccine_plan_2 === 'Y')? 1 : 0; //เป้าเข็ม 3
      res[obj.tmb_code].target4 += (obj.vaccine_plan_3 === 'Y')? 1 : 0; //เป้าเข็ม 4
      res[obj.tmb_code].vaccine_plan_1Y += (obj.vaccine_plan_1 === 'Y')? 1 : 0; //ฉีดเข็ม1
      res[obj.tmb_code].vaccine_plan_2Y += (obj.vaccine_plan_2 === 'Y')? 1 : 0; //ฉีดเข็ม2
      res[obj.tmb_code].vaccine_plan_3Y += (obj.vaccine_plan_3 === 'Y')? 1 : 0; //ฉีดเข็ม3
      res[obj.tmb_code].vaccine_plan_4Y += (obj.vaccine_plan_4 === 'Y')? 1 : 0; //ฉีดเข็ม4
      res[obj.tmb_code].vaccine_plan_1N += (obj.vaccine_plan_1 === 'N')? 1 : 0; //ไม่ฉีดเข็ม1
      res[obj.tmb_code].vaccine_plan_2N += (obj.vaccine_plan_2 === 'N')? 1 : 0; //ไม่ฉีดเข็ม2
      res[obj.tmb_code].vaccine_plan_3N += (obj.vaccine_plan_3 === 'N')? 1 : 0; //ไม่ฉีดเข็ม3
      res[obj.tmb_code].vaccine_plan_4N += (obj.vaccine_plan_4 === 'N')? 1 : 0; //ไม่ฉีดเข็ม4
      return res;
    }, {})    
    this.data_amp_result.sort((a, b) => a.tmp_code - b.tmp_code);
    console.log(this.data_amp_result);  
    this.createReport();     
  }
  delete(item:any){
    this.removeObjectWithId(this.data_amp_result, item);
  }

  individual_tmp(item:any){
    console.log("individual_tmp");    
    console.log(this.amp_result);    
   let tmp_list = this.amp_result.filter((e:any) => e.tmb_code === item);
   console.log(tmp_list);
   
  }

  removeObjectWithId(objs:any, id:any) {
    const objWithIdIndex = objs.findIndex((obj:any) => obj.tmp_code === id);  
    if (objWithIdIndex > -1) {
      objs.splice(objWithIdIndex, 1);
    }  
    return objs;
  }

  item:any[]=[];

  createReport():void{
    this.categories = this.data_amp_result.map((e:any)=>e.tmp_name);
    this.target.data = this.data_amp_result.map((e:any)=>{
      return e.target1
    });
    this.vac1.data = this.data_amp_result.map((e:any)=>{
      return e.vaccine_plan_1Y
    });
    this.vac2.data = this.data_amp_result.map((e:any)=>{
      return e.vaccine_plan_2Y
    });
    this.vac3.data = this.data_amp_result.map((e:any)=>{
      return e.vaccine_plan_3Y
    });
    this.vac4.data = this.data_amp_result.map((e:any)=>{
      return e.vaccine_plan_4Y
    });

    this.series.push(this.target, this.vac1,this.vac2,this.vac3,this.vac4);
    this.updateFlag = true;
    // console.log(this.categories);    
    // console.log(this.series);    
  }

  toThaiDateString(date:Date) {
    let monthNames = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    let year = date.getFullYear() + 543;
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();

    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");

    return `${numOfDay} ${month} ${year} ` +
        `${hour}:${minutes}:${second} น.`;
}
    createChart(){
      this.createReport();
      console.log(this.categories);
      console.log(this.series);      
      
      this.linechart = {
        chart: {
          type: 'column', //bar, line, column
        },
        credits: {
          enabled: false, //How to remove Highcharts.com at right bottom corner in chart
        },
        title: {
          text: 'อัตราการฉีดเทียบจำนวนเข็มตำเมืองเดช อำเภอเดชอุดม',
        },
        subtitle: {
          text: this.toThaiDateString(new Date()),
        },
        xAxis: {
          categories: this.categories          
        },
        plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: this.series
      }
    }
    
}