import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";
import { CardsService } from "../../services/cards.service";
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration } from "chart.js";

@Component({
  selector: 'app-archetype',
  templateUrl: './archetype.component.html',
  styleUrls: ['./archetype.component.scss']
})
export class ArchetypeComponent implements OnInit {
  archetype: string = "";
  heading: string = "";
  deckList: any[] = [];
  bgGreen = false;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  archetypeChartData: any = {
    labels: [],
    datasets: [{
      label: 'Playrate',
      yAxisID: 'yr',
      data: [],
      fill: true,
      tension: 0.3,
      pointRadius: 3,
      order: 999
    }, {
      label: 'Winrate',
      yAxisID: 'yl',
      data: [],
      tension: 0.3,
      pointRadius: 3,
    }]
  };

  archetypeChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks : {
          display: false
        }
      },
      yl: {
        position: "left",
        grid: {
          display: false
        }
      },
      yr: {
        position: "right",
        grid: {
          display: false
        }
      }
    }
  };


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.archetype = params['archetype_id'];
      this.heading = this.archetype.split(",").map(el => this.cardsService.getChampionName(el)).join(", ");
      this.makeChart();
      this.makeDeckList();
    });
  }


  makeChart() {
    this.apiService.getArchetypeStats(this.archetype).subscribe((stats: any[]) => {
      this.archetypeChartData.labels = stats.map(el => (new Date(el.date)).toLocaleDateString());
      this.chart?.update();

      setTimeout(() => {
        this.archetypeChartData.datasets[0].data = stats.map(el => el.play_rate * 100);
        this.archetypeChartData.datasets[1].data = stats.map(el => el.win_rate * 100);
        this.chart?.update();
      }, 100);
    });
  }


  makeDeckList() {
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
  }


  copyDeckCode(e: Event, deckCode: string) {
    e.stopPropagation();

    // TODO: navigator.clipboard.writeText(deckCode) is better, but needs https

    let input = document.createElement('textarea');
    input.innerHTML = deckCode;
    document.body.appendChild(input);
    input.select();
    let result = document.execCommand('copy');
    document.body.removeChild(input);

    this.bgGreen = true;
    setTimeout(() => {
      this.bgGreen = false;
    }, 300);
  }

}
