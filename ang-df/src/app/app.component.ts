import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ang-df';
  itemSelected: any;

  ngOnInit() {
    this.itemSelected = null;
    // Dialogflow messenger selector
    const dfMessenger: any = document.querySelector('df-messenger');

    window.addEventListener('df-messenger-loaded', (event: any) => {
      // Messenger is now ready.
      console.log("Messenger Ready", event);
    });


    // df-messenger response
    window.addEventListener('df-response-received', (event:  any) => {
      console.log("Response received--", event);
      let intentName = event.detail.response.queryResult.intent.displayName;
      if (intentName === 'list-intent') {
        dfMessenger.renderCustomText('Rendering custom items list');

        // Render custom list
        let payload = [
          {type: "list", title: "Item 1", subtitle: "",
            event: {name: "", languageCode: "", parameters: {}}},
          {type: "divider"},
          {type: "list", title: "Item 2", subtitle: "",
            event: {name: "", languageCode: "", parameters: {}}},
          {type: "divider"},
          {type: "list", title: "Item 3", subtitle: "",
            event: {name: "", languageCode: "", parameters: {}}}
        ];
        dfMessenger.renderCustomCard(payload);
      }
    });
    
    // List element clicked
    window.addEventListener('df-list-element-clicked', (event: any) => {
      event.preventDefault(); // Dialogflow Messenger won't send the "event" request.
      console.log('List element clicked--', event);

      let itemSelected = event.detail.element.title_;
      this.itemSelected = itemSelected;
    });
  }
}
