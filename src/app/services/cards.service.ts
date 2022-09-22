import { Injectable } from '@angular/core';
import * as championsJSON from "../../assets/champions.json";

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
}
