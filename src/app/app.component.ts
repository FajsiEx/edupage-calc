import { Component } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'edupage-calc';

  subjects = [];

  constructor() {
  }

  async ngOnInit() {
    let tabs = await new Promise(resolve => chrome.tabs.query({ active: true, currentWindow: true }, (data)=>resolve(data)));
    let response:any = await new Promise(resolve => chrome.tabs.sendMessage(tabs[0].id, { data: 'fetch' }, (response)=>resolve(response)));
    this.subjects = response.data;
    this.calculateAvgs();
    console.log(this.subjects);

    setInterval(()=>{
      console.log(this.subjects);
    }, 5000);
  }

  onInput() {
    console.log("There we go");
    this.calculateAvgs();
  }

  calculateAvgs() {
    for (let subject of this.subjects) {
      let sum = 0;
      let total = 0;

      let gradesType = subject.grades[0].type;

      for (let grade of subject.grades) {
        if (gradesType === 'points') {
          sum += parseFloat(grade.reached);
          total += parseFloat(grade.total);
        } else if (gradesType === 'grade') {
          sum += parseFloat(grade.grade);
          total++;
        }
      }

      if (gradesType === 'points') {
        subject.grades.average = Math.round(sum / total * 100 * 100) / 100;
      } else if (gradesType === 'grade') {
        subject.grades.average = Math.round(sum / total * 100) / 100;
      }

      subject.grades.type = gradesType;
    }
  }
}
