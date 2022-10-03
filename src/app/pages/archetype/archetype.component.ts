import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";
import { CardsService } from "../../services/cards.service";

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
    private apiService: ApiService,
    public cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.archetype = params['archetype_id'];
      this.apiService.getPlayedDecks(this.archetype).subscribe(decks => {
        this.deckList = decks;
        for (const deck of this.deckList) {
          deck.cards = this.cardsService.getDeck(deck._id);
          deck.showCards = false;
        }

        this.deckList[0].info = "most popular";

        for (let i = 1; i < this.deckList.length; i++) {
          const diff = this.cardsService.getDiff(this.deckList[0]._id, this.deckList[i]._id);
          const additions = diff.filter(i => i.count > 0).sort((a, b) =>  b.count - a.count );
          const info = additions.map(i => this.cardsService.getCardName(i.cardCode));
          this.deckList[i].info = info.slice(0, 3).join(', ');
        }
      });
    });
  }

}
