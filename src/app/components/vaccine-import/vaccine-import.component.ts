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


  
  result:any[] = [];
  isLoading:boolean = false;
  chw_code:any[] = [];
  amp_code:String[] = [];
  tmp_code:String[] = [];
  moo_code:String[] = [];

  chw_result:any = null;
  amp_result:any = null;
  tmp_result:any = null;
  moo_result:any = null;
  async excelRead(e:any){
    let fileReaded:any;
    fileReaded = e.target.files[0];
    let type = e.target.files[0].name.split('.').pop();
    let size = e.target.files[0].size;
    console.log("ขนาด ",size);
    console.log(new Date());

    if(type !== 'xlsx') return; //ถ้าไม่ใช่ excel

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
        this.chw_code = this.result.map((e:any)=>e.chw_code).reduce((unique, item)=>(unique.includes(item) ? unique : [...unique, item]),[]).sort();

        
        console.log(this.chw_code);
        
      }          
    });
  }

  chwIsSelect(item:any){
    console.log(item);
    
    this.amp_code = this.result.find((e:any) => e.amp_code === item);
    console.log(this.amp_code);
    
  }


}
