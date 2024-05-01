import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {
  ngOnInit(): void {
this.toggleSection('objectives')

  }
   showEtudiants: boolean = false;
  showCategorieEtudiant: boolean = false
  showObjectives: boolean = false;
  newObjective: any = { title: '', description: '' };
  objectives: any[] = [];
  selectedCategoryTitle: string = '';
  students= [
    {'name': 'Alice',
      'category':'Informatique'},
     {'name': 'Bob','category':'Physique'}
  
  ]
  categories = [
    {
        id: 1,
        title: 'Categorie title 1',
        image: '/assets/Front/images/team/images.jpg',
        objectives: ['Objective 1', 'Objective 2', 'Objective 3']
    },
    {
        id: 2,
        title: 'Categorie title 2',
        image: '/assets/Front/images/team/images (1).jpg',
        objectives: ['Objective A', 'Objective B', 'Objective C']
    },
    // Add more categories as needed
];

  // Modal variables
  missionTitle: string = '';
  missionValue: number = 0;
  missionDescription: string = '';
  mission: string = '';

  

  openeditModal() {
    
    const editModal = document.getElementById('editModal');
    if (editModal) {
      editModal.style.display = 'block';
    }
}
  closeeditModal(){
    // Close the mission modal
    const editModal   = document.getElementById('editModal');
    if (editModal) {
      editModal.style.display = 'none';
    }
  }
  openCategorieModal(categoryTitle: string) {
    // Set the title of the selected category
    this.selectedCategoryTitle = categoryTitle;

    // Display the category modal
    const categorieModal = document.getElementById('categorieModal');
    if (categorieModal) {
        categorieModal.style.display = 'block';
    }
}
  openMissionModal() {
    // Display the mission modal
    const missionModal = document.getElementById('missionModal');
    if (missionModal) {
      missionModal.style.display = 'block';
    }
  }
  closeCategorieModal() {
    // Close the mission modal
    const categorieModal   = document.getElementById('categorieModal');
    if (categorieModal) {
      categorieModal.style.display = 'none';
    }
  }

  closeMissionModal() {
    // Close the mission modal
    const missionModal = document.getElementById('missionModal');
    if (missionModal) {
      missionModal.style.display = 'none';
    }
  }

  submitMission() {
    // Handle form submission here
    console.log('Mission submitted');
    // Close the mission modal after submission
    this.closeMissionModal();
  }

  toggleSection(section: string) {
    
    this.showEtudiants = section === 'etudiants';
    this.showCategorieEtudiant = section === 'categorieEtudiant';
    this.showObjectives = section === 'objectives';
  }

  addObjective() {
    this.objectives.push({ title: '', description: '' });
    // Scroll to the new objective
    setTimeout(() => {
      const element = document.getElementById('newObjectiveCard');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }, 100);
  }

  deleteObjective(index: number) {
    this.objectives.splice(index, 1);
  }
  // In your component.ts file
isDropdownOpen: boolean = false;



}
