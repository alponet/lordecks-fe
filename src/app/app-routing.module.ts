import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchetypesComponent } from "./pages/archetypes/archetypes.component";

const routes: Routes = [
  { path: 'archetypes', component: ArchetypesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
