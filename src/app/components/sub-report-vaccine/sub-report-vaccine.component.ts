import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from 'src/app/services/mock-data.service';
import * as Highcharts from 'highcharts';
import { iSerail } from '../vaccine-import/Ichart-vaccine.interface';

// HC_exporting(Highcharts);

@Component({
  selector: 'app-sub-report-vaccine',
  templateUrl: './sub-report-vaccine.component.html',
  styleUrls: ['./sub-report-vaccine.component.css']
})
export class SubReportVaccineComponent implements OnDestroy, OnInit {
  sub$;
  chw: any;
  amp: any;
  tmp: any;
  item_person!: any;
  item_persontypename: any;
  vaccine_plans: Object[] = [];
  report_types: any[] = [];

  series:any[] = [];
  categories:any[] = [];
  target:iSerail = {name:'เป้าหมาย', type: 'column', data:[]};
  vac1:iSerail = {name:'เข็ม1',type: 'column',data:[]};
  vac2:iSerail = {name:'เข็ม2',type: 'column',data:[]};
  vac3:iSerail = {name:'เข็ม3',type: 'column',data:[]};
  vac4:iSerail = {name:'เข็ม4',type: 'column',data:[]};

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  chartOptions: Highcharts.Options = { };

  constructor(
    private mockdata: MockDataService,
    private Activatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.sub$ = this.Activatedroute.paramMap.subscribe((params) => {
      this.chw = params.get('chw');
      this.amp = params.get('amp');
      this.tmp = params.get('tmp');
      // console.log('chw = ',this.chw);
      // console.log('amp = ', this.amp);
      // console.log('tmp = ',this.tmp);

    });
  }

  ngOnInit(): void {
    if (this.mockdata.vaccine_data.length <= 0) this.router.navigate(['/vaccine-import']);

    this.item_person = this.mockdata.vaccine_data.filter((e: any) => {
      return (e.chw_code === this.chw) && (e.amp_code === this.amp) && (e.tmb_code === this.tmp);
    });

    // console.log("item_person", this.item_person);

    this.item_persontypename = this.item_person
      .map((e: any) => e.person_type_name).reduce((unique: any, item: any) => (unique.includes(item) ? unique : [...unique, item]), []).sort();
    // console.log('item_persontypename',this.item_persontypename);
    this.report_types = []
    this.item_person.reduce((res: any, obj: any) => {
      if (!res[obj.person_type_name]) {
        let person_type_name = (typeof obj.person_type_name !== 'undefined') ? obj.person_type_name : null;
        res[obj.person_type_name] = {
          person_type_name,
          target1: 0, vaccine_plan_1Y: 0, vaccine_plan_1N: 0, vaccine_plan_1PC: 0,
          target2: 0, vaccine_plan_2Y: 0, vaccine_plan_2N: 0, vaccine_plan_2PC: 0,
          target3: 0, vaccine_plan_3Y: 0, vaccine_plan_3N: 0, vaccine_plan_3PC: 0,
          target4: 0, vaccine_plan_4Y: 0, vaccine_plan_4N: 0, vaccine_plan_4PC: 0
        }
        this.report_types.push(res[obj.person_type_name]);
      }
      res[obj.person_type_name].target1 += 1; //เป้าเข็ม 1
      res[obj.person_type_name].target2 += (obj.vaccine_plan_1 === 'Y') ? 1 : 0; //เป้าเข็ม 2
      res[obj.person_type_name].target3 += (obj.vaccine_plan_2 === 'Y') ? 1 : 0; //เป้าเข็ม 3
      res[obj.person_type_name].target4 += (obj.vaccine_plan_3 === 'Y') ? 1 : 0; //เป้าเข็ม 4
      res[obj.person_type_name].vaccine_plan_1Y += (obj.vaccine_plan_1 === 'Y') ? 1 : 0; //ฉีดเข็ม1
      res[obj.person_type_name].vaccine_plan_2Y += (obj.vaccine_plan_2 === 'Y') ? 1 : 0; //ฉีดเข็ม2
      res[obj.person_type_name].vaccine_plan_3Y += (obj.vaccine_plan_3 === 'Y') ? 1 : 0; //ฉีดเข็ม3
      res[obj.person_type_name].vaccine_plan_4Y += (obj.vaccine_plan_4 === 'Y') ? 1 : 0; //ฉีดเข็ม4
      res[obj.person_type_name].vaccine_plan_1N += (obj.vaccine_plan_1 === 'N') ? 1 : 0; //ไม่ฉีดเข็ม1
      res[obj.person_type_name].vaccine_plan_2N += (obj.vaccine_plan_2 === 'N') ? 1 : 0; //ไม่ฉีดเข็ม2
      res[obj.person_type_name].vaccine_plan_3N += (obj.vaccine_plan_3 === 'N') ? 1 : 0; //ไม่ฉีดเข็ม3
      res[obj.person_type_name].vaccine_plan_4N += (obj.vaccine_plan_4 === 'N') ? 1 : 0; //ไม่ฉีดเข็ม4
      return res;

    }, {});

    this.report_types.sort((a, b) => a.person_type_name - b.person_type_name);
    console.log(this.report_types);

    this.categories = this.report_types.map((e:any)=>e.person_type_name);
    this.series = [];
    this.target.data = this.report_types.map((e:any)=>e.target1);
    this.vac1.data = this.report_types.map((e:any)=> e.vaccine_plan_1Y);
    this.vac2.data = this.report_types.map((e:any)=> e.vaccine_plan_2Y);
    this.vac3.data = this.report_types.map((e:any)=> e.vaccine_plan_3Y);
    this.vac4.data = this.report_types.map((e:any)=> e.vaccine_plan_4Y);

    this.series.push(this.target, this.vac1,this.vac2,this.vac3,this.vac4);
    // console.log(this.series);
    this.createChart();
  }


  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }

  createChart(){
    this.chartOptions.series = this.series;
    this.chartOptions.xAxis = {
      categories: this.categories
    };
    this.chartOptions.subtitle = {
      text:this.toThaiDateString(new Date())
    };
    this.chartOptions.title = {
      text:'อัตราการฉีดเทียบจำนวนเข็ม'
    }
    this.updateFlag = true;
  }

  toThaiDateString(date: Date) {
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

}


