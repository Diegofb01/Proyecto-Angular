export interface PlaceModel {
  id?: string;
  name: string;
  description: string;
  parrafo1: string;
  parrafo2: string;
  imageUrl: string; 
  imageGallery?: string[]; 
  rating?: string[];
  comments?: string[];
  commentUser?: string[];
}

