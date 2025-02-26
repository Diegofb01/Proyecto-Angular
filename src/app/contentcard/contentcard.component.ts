import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SitiosService } from '../service/sitios.service';
import { PdfMakeWrapper, Txt, Img } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';

PdfMakeWrapper.setFonts(pdfFonts as any); 

@Component({
  selector: 'app-contentcard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,  
    MatGridListModule,  
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './contentcard.component.html',
  styleUrls: ['./contentcard.component.css']
})
export class ContentcardComponent implements OnInit {
  places: any[] = [];

  constructor(private placesService: SitiosService) { }

  ngOnInit(): void {
    this.placesService.getSites().subscribe(places => {
      console.log(places);
      this.places = places;
    });
  }

  calcularMedia(ratings: string[]): string {
    let valoracionesNumericas = ratings.map(rating => parseFloat(rating));
    let suma = valoracionesNumericas.reduce((total, rating) => total + rating, 0);
    return (suma / valoracionesNumericas.length).toFixed(2).toString();
  }

  descripcionMostrar(descripcion: string): string {
    const palabras = descripcion.split(' ');

    if (palabras.length <= 50) {
        return descripcion;
    }

    const primera50Palabras = palabras.slice(0, 50).join(' ');
    return `${primera50Palabras}...`;
  }

  async descargarPDF() {
    const pdf = new PdfMakeWrapper();

    for (const sitio of this.places) {
      pdf.add(new Txt(`Nombre: ${sitio.name}`).style('subtitulo').end);
      pdf.add(new Txt(sitio.descripcion).style('normal').end);
      pdf.add(new Txt(sitio.parrafo1).style('normal').end);
      pdf.add(new Txt(sitio.parrafo2).style('normal').end);

      // Todas las imágenes
      /*
      const imageUrls = [
        sitio.imageUrl, sitio.imageGallery?.[0], sitio.imageGallery?.[1], sitio.imageGallery?.[1], 
        sitio.imageGallery?.[3], sitio.imageGallery?.[4], sitio.imageGallery?.[5], sitio.imageGallery?.[6], 
        sitio.imageGallery?.[7], sitio.imageGallery?.[8]
      ];
      */

      // Sólo la imagen principal
      const imageUrls = [ sitio.imageUrl ];

      for (let i = 0; i < imageUrls.length; i++) {
        if (imageUrls[i]) {
          try {
            pdf.add(await new Img(imageUrls[i]).width(180).height(130).margin([0, 20, 0, 0]).build());
          } catch (error) {
            console.error(`Error al cargar la imagen ${imageUrls[i]}`, error);
          }
        }
      }

      if (this.places.indexOf(sitio) !== this.places.length - 1) {
        pdf.add({ text: '', pageBreak: 'after' });
      }
    }

    pdf.styles({
      titulo: { fontSize: 18, bold: true, margin: [0, 10, 0, 0] },
      subtitulo: { fontSize: 16, bold: true, margin: [0, 10, 0, 0] },
      normal: { fontSize: 12, margin: [0, 5, 0, 0] },
    });

    pdf.create().download('Cádiz_Listado.pdf');
  }
}
