import { Injectable } from '@angular/core';
import * as championsJSON from "../../assets/champions.json";
import * as cardsJSON from "../../assets/cards.json";
import { CardCodeAndCount, Deck, getDeckFromCode } from "lor-deckcodes-ts";
import { ApiService } from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  champions: any[] = [];
  cards: any[] = [];

  constructor(private apiService: ApiService) {
    this.champions = Object.values(championsJSON);
    this.cards = Object.values(cardsJSON);
  }

  getChampionName(cardCode: string): string {
    const champion = this.champions.find(i => i.cardCode === cardCode);
    return champion ? champion.name : "None";
  }

  getCardName(cardCode: string): string {
    const card = this.cards.find(i => i.cardCode === cardCode);
    if (card) {
      return card.name;
    }
    this.apiService.postCardError(cardCode).subscribe();
    return "None";
  }

  getDeck(deckCode: string): Deck {
    return getDeckFromCode(deckCode).sort((a, b) => a.cardCode.localeCompare(b.cardCode));
  }

  getDiff(deck1: string, deck2: string) {
    let d1 = this.getDeck(deck1);
    let d2 = this.getDeck(deck2);

    let diff: Array<CardCodeAndCount> = [];

    for (const card of d1) {
      const d2Card = d2.find(c => c.cardCode === card.cardCode);
      if (d2Card && d2Card.count !== card.count) {
        diff.push({ cardCode: card.cardCode, count: d2Card.count - card.count });
        continue;
      }
      if (!d2Card) {
        diff.push({ cardCode: card.cardCode, count: -card.count });
      }
    }
    let added = d2.filter(card => !d1.find(d1card => d1card.cardCode === card.cardCode));
    diff = diff.concat(added);

    return diff;
  }
}
