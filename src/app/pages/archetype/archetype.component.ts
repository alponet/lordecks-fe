import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-archetype',
  templateUrl: './archetype.component.html',
  styleUrls: ['./archetype.component.scss']
})
export class ArchetypeComponent implements OnInit {
  private archetype: string = "";
  deckList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.archetype = params['archetype_id'];
      this.apiService.getPlayedDecks(this.archetype).subscribe(decks => {
        this.deckList = decks;
      });
    });
  }

}
