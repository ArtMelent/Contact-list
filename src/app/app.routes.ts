import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    { path: 'contacts', component: ContactListComponent },
    { path: 'contacts/new', component: ContactFormComponent },
    { path: 'contacts/:id', component: ContactDetailComponent },
    { path: 'contacts/edit/:id', component: ContactFormComponent }
];
