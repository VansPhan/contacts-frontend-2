import { Component } from '@angular/core';
import { Contact } from './models/contact';
import { ContactService } from './models/service'

@Component({
	selector: 'search',
	templateUrl: 'app/app.search.component.html',
	styleUrls: ['app/app.search.component.css']
})

class SearchComponent {
	contacts: Contact[];
	original: Contact[];

	constructor(private contactService: ContactService) {
		
	}

	ngOnInit() {
		this.contactService.getContacts()
			.subscribe(contacts => {
				this.contacts = contacts;
				if (Array.isArray(this.contacts)) {
					for (let contact of this.contacts) {
						//Regex to remove everything but number to have a pure integer string for easy search for phone numbers
						contact['number'] = contact['phone_number'].replace(/\D/g,'');
						//Check if phone number is international by having the string lead with 1-
						if (contact['phone_number'].split("")[0].match("1") && contact['phone_number'].split("")[1].match("-")) {
							contact['international'] = true;
						}
						else {
							contact['international'] = false;
						}
						//Checking if the number has an extention
						if (contact['phone_number'].match("x")) {
							contact['ext'] = true;
						}
						else {
							contact['ext'] = false;
						}
					}
				}
				this.original = this.contacts;
			})
	}

	filter(radio) {
		//Empty array to add filtered out contacts that met the following conditions, will be use to display the new contacts
		var arr = []
		//switch case that decides which radio is checked and sorts the data accordingly
		switch (radio) {
			case "all":
				this.contacts = this.original;
			break;
			case "international":
				for (let contact of this.original) {
					if(contact["international"] == true) {
						arr.push(contact);
					}
				}
				this.contacts = arr;
				console.log(this.contacts);
			break;
			case "ext":
				for (let contact of this.original) {
					if(contact["ext"] == true) {
						arr.push(contact);
					}
				}
				this.contacts = arr;
			break;
			case "com":
				for (let contact of this.original) {
					if(contact["email_address"].match(".com")) {
						arr.push(contact);
					}
				}
				this.contacts = arr;
				console.log(this.contacts);
			break;
			case "email":
				//I push each object into array in order to make an immutable copy of contacts array
				for (let contact of this.original) {
					arr.push(contact);
				}
				this.contacts = arr;
			break;
			default:
			break;
		}
	}

}

export { SearchComponent };
