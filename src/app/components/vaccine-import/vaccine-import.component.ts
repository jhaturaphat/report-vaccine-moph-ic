import { Component } from '@angular/core';
import readXlsxFile from 'read-excel-file';

@Component({
  selector: 'app-vaccine-import',
  templateUrl: './vaccine-import.component.html',
  styleUrls: ['./vaccine-import.component.css']
})
export class VaccineImportComponent {
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
    // console.log(this.ampDropdownList);
    this.amp_result = this.chw_result.filter((e:any) => e.amp_code === item);  //กรอกให้เหลือแต่อำเภอที่เลือกมา
    this.amp_result.reduce((res:any, obj:any)=>{
      if(!res[obj.tmb_code]){
        let tmp_name = (typeof obj.full_addr_name !== 'undefined')? obj.full_addr_name.split(' ')[0]:null;        
        let tmp_code = (typeof obj.tmb_code !== 'undefined')? parseInt(obj.tmb_code):0;        
        res[obj.tmb_code] = {tmp_code:tmp_code, tmp_name:tmp_name, target:0, vaccine_plan_1y:0, vaccine_plan_2y:0, vaccine_plan_3y:0, vaccine_plan_4y:0}
        this.data_amp_result.push(res[obj.tmb_code]);
      }
      res[obj.tmb_code].target += 1;
      res[obj.tmb_code].vaccine_plan_1y += (obj.vaccine_plan_1 === 'Y')? 1 : 0;
      res[obj.tmb_code].vaccine_plan_2y += (obj.vaccine_plan_2 === 'Y')? 1 : 0;
      res[obj.tmb_code].vaccine_plan_3y += (obj.vaccine_plan_3 === 'Y')? 1 : 0;
      res[obj.tmb_code].vaccine_plan_4y += (obj.vaccine_plan_4 === 'Y')? 1 : 0;
      return res;
    }, {})    
    this.data_amp_result.sort((a, b) => a.tmp_code - b.tmp_code);
    console.log(this.data_amp_result);       
  }
  delete(item:any){
    this.removeObjectWithId(this.data_amp_result, item);
  }

  removeObjectWithId(objs:any, id:any) {
    const objWithIdIndex = objs.findIndex((obj:any) => obj.tmp_code === id);  
    if (objWithIdIndex > -1) {
      objs.splice(objWithIdIndex, 1);
    }
  
    return objs;
  }

}
