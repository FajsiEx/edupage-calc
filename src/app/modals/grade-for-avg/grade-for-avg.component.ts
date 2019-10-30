import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grade-for-avg',
  templateUrl: './grade-for-avg.component.html',
  styleUrls: ['./grade-for-avg.component.scss']
})
export class GradeForAvgComponent implements OnInit {
  @Input() subject: any;

  constructor() { }

  ngOnInit() {
  }

  calculateAvgs(subject: any) {
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
