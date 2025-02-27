import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SitiosService } from '../service/sitios.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-random-comments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './random-comments.component.html',
  styleUrls: ['./random-comments.component.css']
})
export class RandomCommentsComponent implements OnInit {
  randomComments: { place: string; text: string; rating?: number }[] = [];

  constructor(private sitiosService: SitiosService) {} 

  ngOnInit(): void {
    this.sitiosService.getComments().subscribe(comments => { 
      if (!comments || comments.length === 0) return;
      this.randomComments = comments.sort(() => 0.5 - Math.random()).slice(0, 5);
    });
  }
}
