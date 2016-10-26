import { Component } from '@angular/core';
import { ContactsComponent } from './app.contact.component';
import { ContactService } from './models/service';
import { HTTP_PROVIDERS } from '@angular/http';


@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [ ContactsComponent ],
  providers: [ ContactService, HTTP_PROVIDERS ],
  styleUrls: ['app/app.component.css']
})

class AppComponent { 
	title = 'Contacts';
}

export { AppComponent };