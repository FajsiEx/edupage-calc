import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EdupageService {

  constructor() { }

  async getGrades() {
    const tabs = await new Promise(resolve => 
      chrome.tabs.query({ active: true, currentWindow: true }, (data) => 
        resolve(data)
      )
    );

    const response: any = await new Promise(resolve =>
      chrome.tabs.sendMessage(tabs[0].id, { data: 'fetch' }, (response) =>
        resolve(response)
      )
    );

    if (!response) { return false; }

    return response.data;
  }
}
