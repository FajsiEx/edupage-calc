import { Component } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'edupage-calc';

  subjects = ["sasa", "sasa"];

  constructor() {
  }

  async ngOnInit() {
    let tabs = await new Promise(resolve => chrome.tabs.query({ active: true, currentWindow: true }, (data)=>resolve(data)));
    let response:any = await new Promise(resolve => chrome.tabs.sendMessage(tabs[0].id, { data: 'fetch' }, (response)=>resolve(response)));
    this.subjects = response.data;
    console.log(this.subjects);

    setInterval(()=>{
      console.log(this.subjects);
    }, 5000);
  }
}
