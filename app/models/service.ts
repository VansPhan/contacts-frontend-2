import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

	constructor(private http: Http) {}
	
	getContacts() {
		return this.http.get('https://contacts-backend.herokuapp.com/contacts')
			.map(response => <Contact[]>response.json());
	}

	contacts = [];

}