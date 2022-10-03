import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CardsService } from "../../services/cards.service";

@Component({
  selector: 'app-archetypes',
  templateUrl: './archetypes.component.html',
  styleUrls: ['./archetypes.component.scss']
})
export class ArchetypesComponent implements OnInit {
  archetypes: any[] = [];

  constructor(
    private apiService: ApiService,
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.apiService.getArchetypes().subscribe(re => {
      this.archetypes = re;
      for (const archetype of this.archetypes) {
        archetype.names = archetype._id.map((cardCode: string) => this.cardsService.getChampionName(cardCode));
      }
    });
  }

}
