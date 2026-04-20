import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  studentName = ''; rollNum = ''; admNum = '';
  selectedDept = ''; selectedYear = ''; selectedClass = ''; selectedSec = '';
  selectedStatus = ''; reason = ''; searchQuery = '';
  
  uploadDate: string = ''; 
  currentView: string = 'dashboard'; // NEW: Tracks 'dashboard' or 'reports'
  masterList: any[] = [];
  departments = ['CSE', 'IT', 'AIDS', 'ECE', 'MECH', 'CIVIL', 'MCA', 'ME', 'BTECH', 'BARCH', 'MBA', 'BME'];

  ngOnInit() {
    this.uploadDate = new Date().toISOString().split('T')[0];
  }

  // NEW: Function to switch views
  setView(view: string) {
    this.currentView = view;
  }

  setStatus(status: string) {
    this.selectedStatus = status;
    this.reason = '';
  }

  addStudent() {
    if (!this.studentName || !this.selectedDept) {
      alert("Error: Name and Department are required!"); return;
    }
    
    this.masterList.unshift({
      name: this.studentName, 
      roll: this.rollNum, 
      dept: this.selectedDept, 
      year: this.selectedYear, 
      status: this.selectedStatus, 
      reason: this.reason || '-',
      savedDate: this.uploadDate,
      displayDate: new Date(this.uploadDate).toLocaleDateString('en-GB', { 
        day: '2-digit', month: 'short', year: 'numeric' 
      })
    });
    this.resetForm();
  }

  resetForm() {
    this.studentName = ''; this.rollNum = ''; this.selectedStatus = ''; this.reason = '';
  }

  getFilteredDepts() {
    let list = this.masterList.filter(s => s.savedDate === this.uploadDate);
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
      s.dept === dept && s.year === year && s.savedDate === this.uploadDate
    );
  }
}
