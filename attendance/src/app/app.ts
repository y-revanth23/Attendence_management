import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  // 🔐 LOGIN STATE
  isLoggedIn = false;

  studentName = '';
  rollNum = '';
  admNum = '';
  selectedDept = '';
  selectedYear = '';
  searchQuery = '';

  uploadDate: string = '';
  currentView: string = 'dashboard';

  masterList: any[] = [];

  departments = ['CSE', 'IT', 'AIDS', 'ECE', 'MECH', 'CIVIL', 'MCA', 'ME', 'BTECH', 'BARCH', 'MBA', 'BME'];

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('auth') === 'true';
    this.uploadDate = new Date().toISOString().split('T')[0];
  }

  // 🔐 LOGOUT
  logout() {
    localStorage.removeItem('auth');
    window.location.reload();
  }

  setView(view: string) {
    this.currentView = view;
  }

  addStudent() {
    if (!this.studentName || !this.selectedDept || !this.selectedYear) {
      alert("Fill all required fields!");
      return;
    }

    this.masterList.unshift({
      name: this.studentName,
      roll: this.rollNum,
      dept: this.selectedDept,
      year: this.selectedYear,
      date: this.uploadDate,
      displayDate: new Date(this.uploadDate).toLocaleDateString('en-GB')
    });

    this.resetForm();
  }

  resetForm() {
    this.studentName = '';
    this.rollNum = '';
  }

  getFilteredDepts() {
    let list = this.masterList.filter(s => s.date === this.uploadDate);

    if (this.searchQuery) {
      list = list.filter(s => s.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    const depts = [...new Set(list.map(s => s.dept))];

    return depts.map(d => ({
      name: d,
      years: [...new Set(list.filter(s => s.dept === d).map(s => s.year))],
      total: list.filter(s => s.dept === d).length
    }));
  }

  getStudents(dept: string, year: string) {
    return this.masterList.filter(s =>
      s.dept === dept &&
      s.year === year &&
      s.date === this.uploadDate
    );
  }

  getReports() {
    const dates = [...new Set(this.masterList.map(s => s.date))];

    return dates.map(d => ({
      date: d,
      displayDate: new Date(d).toLocaleDateString('en-GB'),
      students: this.masterList.filter(s => s.date === d)
    }));
  }

  downloadCSV(students: any[], date: string) {
    let csv = "Name,Roll,Department,Year,Date\n";

    students.forEach(s => {
      csv += `${s.name},${s.roll},${s.dept},${s.year},${s.displayDate}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Attendance_${date}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);
  }
}