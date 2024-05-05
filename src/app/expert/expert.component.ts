import { Component, OnInit } from '@angular/core';
import { TherapyService } from '../therapy.service';
import { Category } from '../models/Category';
import { Objective } from '../models/Objective';
import { lastValueFrom, switchMap } from 'rxjs';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {
  constructor(private therapyService: TherapyService) { }
  ngOnInit(): void {
this.toggleSection('objectives');
this.retrieveCategories();
this.retrieveStudents();
  }
  defultCategorie:Category={
    idCategorie:0,
    etudiants:[],
   nomCategory:'',
   objectives:[] 
    
  }
   showEtudiants: boolean = false;
  showCategorieEtudiant: boolean = false
  showObjectives: boolean = false;
  objectives: Objective[] = []; // Initialize objectives array
  newObjective: Objective = {
    idObjective: 0,
    objectiveTitle: '',
    objectiveDescription: '',
    missions: [],
    categoryEtudiant: this.defultCategorie, // Initialize categoryEtudiant property
    goal: 0
  };
  students= [
    {'name': 'Alice',
      'category':'Informatique'},
     {'name': 'Bob','category':'Physique'}
  
  ]
  categories: Category[] = [];
  // Modal variables  
  missionTitle: string = '';
  missionValue: number = 0;
  missionDescription: string = '';
  mission: string = '';
  idCategory:number=0;

   addNewForm() {
    this.objectives.push({
      idObjective: 0,
      objectiveTitle: '',
      objectiveDescription: '',
      categoryEtudiant: this.defultCategorie,
      missions: [],
      goal: 0
    });
  }
  retrieveStudents() {
    this.therapyService.getAllEtudiants().subscribe(
      (students: any[]) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  openeditModal() {
    
    const editModal = document.getElementById('editModal');
    if (editModal) {
      editModal.style.display = 'block';
    }
}
selectedCategoryTitle: string = 'Please select your category';

selectCategory(category: Category) {
  this.newObjective.categoryEtudiant = category;
}

  closeeditModal(){
    // Close the mission modal
    this.selectedCategoryTitle = '';
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

  saveObjective(newObjective: Objective) {
     // Provide a default value
  
    this.therapyService.assignObjectiveToCategory(newObjective.categoryEtudiant.idCategorie, newObjective.idObjective)
       this.therapyService.addObjective(newObjective)
      .subscribe(
       async (addedObjective: Objective) => {
          let response=await lastValueFrom(this.therapyService.assignObjectiveToCategory(newObjective.categoryEtudiant.idCategorie, addedObjective.idObjective));
          // Clear the form for the next entry
          this.newObjective = {
            idObjective: 0,
            objectiveTitle: '',
            objectiveDescription: '',
            categoryEtudiant: this.defultCategorie,
            missions: [],
            goal: 0
          };
          console.log('Objective added successfully:', addedObjective);
        },
        (error) => {
          console.error('Error adding objective:', error);
        }
      );
  }

  
  deleteObjective(index: number) {
    this.objectives.splice(index, 1);
  }
  // In your component.ts file
isDropdownOpen: boolean = false;
newCategoryTitle: string = ''; // To store the title of the new category

  
retrieveCategories() {
  this.therapyService.retrieveAllCategories().subscribe(
    (categories: Category[]) => {
      this.categories = categories;
    },
    (error) => {
      console.error('Error fetching categories:', error);
    }
  );
}

addCategory() {
    const newCategory: Category = {
      idCategorie: 0, // This will be assigned by the backend
      nomCategory: this.newCategoryTitle, // Set the title to the value of newCategoryTitle
      etudiants:[],
      objectives: []
    };

    this.therapyService.addCategory(newCategory).subscribe(
    (addedCategory: Category) => {
      this.categories.push(addedCategory);
      this.newCategoryTitle = ''; // Clear input field
      
    },
    (error) => {
      console.error('Error adding category:', error);
    }
  );
  this.retrieveCategories();
}

deleteCategory(id: number) {
  this.therapyService.removeCategory(id).subscribe(
    () => {
      this.categories = this.categories.filter((category) => category.idCategorie !== id);
    },
    (error) => {
      console.error('Error deleting category:', error);
    }
  );
}

}
