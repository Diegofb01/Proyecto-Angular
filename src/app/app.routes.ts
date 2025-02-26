import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { ContentComponent } from './content/content.component';
import { AdminPlacesComponent } from './admin-places/admin-places.component';
import { AddEditPlaceComponent } from './add-edit-place/add-edit-place.component';
import { ContentcardComponent } from './contentcard/contentcard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'contententcard', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegFormComponent },
    { path: 'contenido', component: ContentComponent },
    { path: 'admin-places', component: AdminPlacesComponent },
    { path: 'add-edit-place', component: AddEditPlaceComponent },
    {path:'inicio',component:ContentcardComponent},
    {path:'sitios/:id',component:ContentComponent},
];

