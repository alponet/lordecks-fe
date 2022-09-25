import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchetypesComponent } from "./pages/archetypes/archetypes.component";
import { ArchetypeComponent } from "./pages/archetype/archetype.component";

const routes: Routes = [
  { path: 'archetypes', component: ArchetypesComponent },
  { path: 'archetype/:archetype_id', component: ArchetypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
