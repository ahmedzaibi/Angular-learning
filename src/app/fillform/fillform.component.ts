import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-component',
  templateUrl: './fillform.component.html',
  styleUrls: ['./fillform.component.css']
})
export class FillformComponent implements OnInit {

  showEtudiantForm: boolean = false;
  showExpertForm: boolean = false;
  expertForms: any[] = [{ fromDate: '', toDate: '', where: '', jobTitle: '', jobDescription: '' }];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleEtudiantForm() {
    this.showEtudiantForm = true;
    this.showExpertForm = false;
  }

  toggleExpertForm() {
    this.showExpertForm = true;
    this.showEtudiantForm = false;
  }

  addExpertForm() {
    this.expertForms.push({ fromDate: '', toDate: '', where: '', jobTitle: '', jobDescription: '' });
  }

  deleteExpertForm(index: number) {
    this.expertForms.splice(index, 1);
  }

  submitEtudiantForm() {
    // Here you can submit the etudiant form data
    // For demonstration purposes, let's just navigate to the home page
    this.router.navigate(['/home']);
  }
  
  submitExpertForms() {
    // Here you can submit the expert form data
    // For demonstration purposes, let's just navigate to the home page
    this.router.navigate(['/home']);
  }
}
