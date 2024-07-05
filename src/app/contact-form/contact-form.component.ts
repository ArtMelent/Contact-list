import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contact: Contact = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    birthDate: new Date(),
    address: ''
  };
  isEdit: boolean = false;
  duplicatePhoneNumber = false;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const contact = this.contactService.getContact(Number(id));
      if (contact) {
        this.contact = contact;
        this.isEdit = true;
      }
    }
  }
  
  validatePhoneNumber(phoneNumber: string): boolean {
    return /^\d{3}-\d{3}-\d{4}$/.test(phoneNumber);
  }

  checkDuplicatePhoneNumber(phoneNumber: string): boolean {
    const contacts = this.contactService.getContacts();
    return contacts.some(contact => contact.phoneNumber === phoneNumber && contact.id !== this.contact.id);
  }

  onSubmit(contactForm: NgForm): void {
    if (this.checkDuplicatePhoneNumber(this.contact.phoneNumber)) {
      this.duplicatePhoneNumber = true;
      return;
    }

    this.duplicatePhoneNumber = false;
    if (this.isEdit) {
      this.contactService.updateContact(this.contact);
    } else {
      this.contactService.addContact(this.contact);
    }
    this.router.navigate(['/contacts']);
  }
  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}