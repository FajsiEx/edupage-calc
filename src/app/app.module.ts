import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GradeForAvgComponent } from './modals/grade-for-avg/grade-for-avg.component';

@NgModule({
  declarations: [
    AppComponent,
    GradeForAvgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
