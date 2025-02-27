import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SitiosService } from '../service/sitios.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-top-rated-places',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './top-rated-places.component.html',
  styleUrls: ['./top-rated-places.component.css']
})
export class TopRatedPlacesComponent implements OnInit {
  topRatedPlaces: any[] = [];

  constructor(private placesService: SitiosService) {}

  ngOnInit(): void {
    this.placesService.getSites().subscribe(places => {
      this.topRatedPlaces = places
        .filter(place => place.rating && Array.isArray(place.rating) && place.rating.length > 0)
        .map(place => ({
          ...place,
          avgRating: this.calcularMedia(place.rating ?? [])
        }))
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 5);
    });
  }

  calcularMedia(ratings: string[]): number {
    const valores = ratings.map(r => parseFloat(r)).filter(r => !isNaN(r));
    return valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
  }
}