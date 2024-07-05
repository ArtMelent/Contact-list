import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];

  constructor() {
    this.loadContacts();
    if (this.contacts.length === 0) {
      this.seedData();
    }
  }

  private saveContacts(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    } else {
      console.error('localStorage is not available. Unable to save contacts.');
    }
  }

  private loadContacts(): void {
    if (typeof localStorage !== 'undefined') {
      const contactsJson = localStorage.getItem('contacts');
      if (contactsJson) {
        this.contacts = JSON.parse(contactsJson);
      }
    } else {
      console.error('localStorage is not available. Unable to load contacts.');
    }
  }

  private seedData(): void {
    const sampleContacts: Contact[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', birthDate: new Date('1990-01-01'), address: '123 Main St, Anytown, USA' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', birthDate: new Date('1985-05-15'), address: '456 Oak Ave, Another Town, USA' },
      { id: 3, firstName: 'Michael', lastName: 'Johnson', phoneNumber: '555-555-5555', email: 'michael.johnson@example.com', birthDate: new Date('1982-08-20'), address: '789 Elm Blvd, Yet Another City, USA' }
    ];

    this.contacts = sampleContacts;
    this.saveContacts();
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContact(id: number): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  addContact(contact: Contact): void {
    const newId = this.contacts.length > 0 ? this.contacts[this.contacts.length - 1].id + 1 : 1;
    contact.id = newId;
    this.contacts.push(contact);
    this.saveContacts();
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
      this.saveContacts();
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
    this.saveContacts();
  }
  
  isPhoneNumberDuplicate(phoneNumber: string): boolean {
    return this.contacts.some(contact => contact.phoneNumber === phoneNumber);
  }
}
