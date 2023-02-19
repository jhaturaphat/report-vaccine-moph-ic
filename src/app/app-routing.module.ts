import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SubReportVaccineComponent } from './components/sub-report-vaccine/sub-report-vaccine.component';
import { VaccineImportComponent } from './components/vaccine-import/vaccine-import.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'vaccine-import',component:VaccineImportComponent},
  {path:'tmp_report/:chw/:amp/:tmp', component:SubReportVaccineComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
