import { Injectable } from '@angular/core';
import * as championsJSON from "../../assets/champions.json";
import { CardCodeAndCount, Deck, getDeckFromCode } from "lor-deckcodes-ts";


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  champions: any[] = [];

  constructor() {
    this.champions = Object.values(championsJSON);
  }

  getName(cardCode: string): string {
    const champion = this.champions.find(i => i.cardCode === cardCode);
    return champion ? champion.name : "None";
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
