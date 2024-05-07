// Add this code to your etudiant.component.ts file
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { TherapyService } from '../therapy.service';
import { Mission } from '../models/Mission';
import { Objective } from '../models/Objective';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  constructor(private therapyService: TherapyService ) { 
    
  }
  showCards: boolean = true;
  TitreObjective: string = "";
  missionTitle: String="";
  objectif:any;
  omissions:Mission[]=[];

  categories: Category[] = [];
  category:any;
  mymission: any;
  
  ngOnInit(): void {
    this.retrieveCategories();
    this.getObjectivesOfCategory();
  }
  getMissionColor(difficulty: String): String {
    switch (difficulty) {
      case 'FACILE':
        return 'green';
      case 'MOYEN':
        return 'orange';
      case 'SEVERE':
        return 'red';
      default:
        return 'black'; // Default color if difficulty is not recognized
    }
  }
 
  retrieveCategories() {
    this.therapyService.retrieveAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }objectiveTitle: String ="";

  showMissions(objective: Objective) {
    this.showCards = false;
    this.therapyService.getMissionsByObjective(objective.idObjective).subscribe(
      (missions: Mission[]) => {
        this.omissions = missions;
        this.TitreObjective=objective.objectiveTitle;
      },
      (error) => {
        console.error('Error fetching missions for the objective:', error);
      }
    );
  }
  returntoObjectives() {
    this.showCards = true;
    this.omissions = [];
  }
  closeMissionModal() {
    // Close the mission modal
    const missionModal = document.getElementById('missionModal');
    if (missionModal) {
      missionModal.style.display = 'none';
    }
  }
  openMissionModal(mission:any) {
    // Display the mission modal
    const missionModal = document.getElementById('missionModal');
    this.missionTitle=mission.missionTitle;
    this.points=mission.missionValue;
    this.points = this.getPointsFromLocalStorage();
    if (missionModal) {
      missionModal.style.display = 'block';
    }
  }
  
  objectives: Objective[] = [];

  Categoryobjectives :Objective[]=[];
  getObjectivesOfCategory():Objective[]{
    this.therapyService.getByCategory().subscribe(
      (Categoryobjectives: Objective[]) => {
        this.Categoryobjectives = Categoryobjectives;
        console.log(this.Categoryobjectives)
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }

    );
    return this.Categoryobjectives;
  }
  
  getPointsFromLocalStorage(): number {
    const points = localStorage.getItem('points');
    return points ? parseInt(points, 10) : 0; // Parse points as integer, default to 0 if not found
  }
  points: number = this.getPointsFromLocalStorage();
  savePointsToLocalStorage() {
    localStorage.setItem('points', (this.points).toString());
  }
  saveMission() {
    // Add points of the current mission to the total points
    this.savePointsToLocalStorage();
    // Optionally, update the displayed points in the modal
    this.points = this.getPointsFromLocalStorage();
  }
  
}
