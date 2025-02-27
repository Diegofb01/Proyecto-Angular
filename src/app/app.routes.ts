import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { ContentComponent } from './content/content.component';
import { AdminPlacesComponent } from './admin-places/admin-places.component';
import { AddEditPlaceComponent } from './add-edit-place/add-edit-place.component';
import { ContentcardComponent } from './contentcard/contentcard.component';
import { UserGuard } from './utils/user-guard.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegFormComponent },
    { path: 'contenido', component: ContentComponent },
    { path: 'admin-places', component: AdminPlacesComponent, canActivate: [UserGuard] }, // 🔒 Protección con UserGuard
    { path: 'add-edit-place', component: AddEditPlaceComponent },
    { path: 'inicio', component: ContentcardComponent },
    { path: 'sitios/:id', component: ContentComponent },
    { path: '**', redirectTo: 'inicio' } 
];
