import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArchetypesComponent } from './pages/archetypes/archetypes.component';
import { HttpClientModule } from "@angular/common/http";
import { ArchetypeComponent } from './pages/archetype/archetype.component';

@NgModule({
  declarations: [
    AppComponent,
    ArchetypesComponent,
    ArchetypeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
