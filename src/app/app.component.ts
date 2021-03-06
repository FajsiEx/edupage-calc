import { Component } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import { EdupageService } from './edupage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'edupage-calc';

  subjects = [];
  failed = false;

  selectedSubject: any;

  constructor(public edupage: EdupageService) {
  }

  async ngOnInit() {
    this.subjects = await this.edupage.getGrades();
    console.log("SUBJECTS", this.subjects);
    
    if (!this.subjects) { // CS returns false data if you're not on the right page
      this.failed = true;
      return;
    }
    this.calculateAvgs();
  }

  onInput() {
    this.calculateAvgs();
  }

  addGrade(grades) {
    if (grades.type === 'points') {
      grades.push({
        type: "points",
        reached: 0,
        total: 0,
        weight: 1,
        artif: true,
        og: {
          reached: 0,
          total: 0,
          weight: 1
        }
      });
    } else if (grades.type === 'grade') {
      grades.push({
        type: 'grade',
        grade: 1,
        weight: 1,
        artif: true,
        og: {
          grade: 1,
          weight: 1
        }
      });
    }

    this.calculateAvgs();
  }

  deleteGrade(grades, grade) {
    if (!grade.artif) {return false;}
    grades.splice(grades.indexOf(grade), 1);
    this.calculateAvgs();
    return false;
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
          sum += parseFloat(grade.grade) * parseFloat(grade.weight);
          total += parseFloat(grade.weight);
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
