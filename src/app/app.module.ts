import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArchetypesComponent } from './pages/archetypes/archetypes.component';
import { HttpClientModule } from "@angular/common/http";
import { ArchetypeComponent } from './pages/archetype/archetype.component';
import { HomeComponent } from './pages/home/home.component';
import { NgChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    ArchetypesComponent,
    ArchetypeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
