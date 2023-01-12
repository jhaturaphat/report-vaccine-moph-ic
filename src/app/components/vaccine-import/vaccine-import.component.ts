import { Component } from '@angular/core';
import readXlsxFile from 'read-excel-file';

@Component({
  selector: 'app-vaccine-import',
  templateUrl: './vaccine-import.component.html',
  styleUrls: ['./vaccine-import.component.css']
})
export class VaccineImportComponent {
  constructor(){ }

  result:any[] = [];

  excelRead(e:any){
    let fileReaded:any;
    fileReaded = e.target.files[0];
    let type = e.target.files[0].name.split('.').pop();

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
      }
      
    };

    readXlsxFile(e.target.files[0], {schema}).then((data:any)=>{     
      console.log(data);
       
      if(data.rows){
        for(let i of data.rows){
          this.result.push(i);
        }
      }
      console.log(this.result);      
    })
  }

}
