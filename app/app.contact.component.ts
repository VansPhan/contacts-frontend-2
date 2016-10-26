import { Component } from '@angular/core';
import { Contact } from './models/contact';
import { SearchComponent } from './app.search.component';
import { ContactService } from './models/service'


@Component({
	selector: 'contact',
	templateUrl: 'app/app.contact.component.html',
	directives: [ SearchComponent ],
	styleUrls: ['app/app.contact.component.css']
})

class ContactsComponent {
	contacts: Contact[];

	constructor(private contactService: ContactService) {

	}

	ngOnInit() {
		this.contactService.getContacts()
			.subscribe(contacts => this.contacts = contacts);
	}
}

export { ContactsComponent };
