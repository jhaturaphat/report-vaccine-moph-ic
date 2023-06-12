import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { 
  NgbAlertModule,
  NgbDropdown, 
  NgbModule, 
  NgbPopoverModule
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaccineImportComponent } from './components/vaccine-import/vaccine-import.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HighchartsChartModule  } from 'highcharts-angular';
import { SubReportVaccineComponent } from './components/sub-report-vaccine/sub-report-vaccine.component';
import { ImmunizationTargetComponent } from './components/immunization-target/immunization-target.component';
import { LoginMophicComponent } from './components/login/login-mophic/login-mophic.component';


@NgModule({
  declarations: [
    AppComponent,
    VaccineImportComponent,
    DashboardComponent,
    SubReportVaccineComponent,
    ImmunizationTargetComponent,
    LoginMophicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HighchartsChartModule,
    NgbModule,
    NgbDropdown,
    NgbAlertModule,
    NgbPopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
