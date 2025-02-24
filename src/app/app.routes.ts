import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { ContentComponent } from './content/content.component';
import { AdminPlacesComponent } from './admin-places/admin-places.component';
import { AddEditPlaceComponent } from './add-edit-place/add-edit-place.component';

export const routes: Routes = [
    {path:'',component:ContentComponent},
    { path: 'login', component: LoginComponent },
    { path: 'reg-form', component: RegFormComponent },
    { path: 'content', component: ContentComponent },
    { path: 'admin-places', component: AdminPlacesComponent },
    { path: 'add-edit-place', component: AddEditPlaceComponent },
];
