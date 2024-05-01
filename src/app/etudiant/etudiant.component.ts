// Add this code to your etudiant.component.ts file
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  showCards: boolean = true;
  TitreObjective: string = "";
  missionTitle: String="";
  objectif:any;
  omissions:Mission[]=[];
  points:number=0;
  categories = [
    {
      id: 1,
      title: 'Categorie title 1',
      image: '/assets/Front/images/team/images.jpg',
      objectives: [
        { 
          title: 'Objective 1',
          missions: [
            { missionTitle: 'Mission 1', missionValue: 60, missionDescription: 'Description for Mission 1', mission: 'Mission A' },
            { missionTitle: 'Mission 2', missionValue: 40, missionDescription: 'Description for Mission 2', mission: 'Mission B' }
          ]
        },
        { 
          title: 'Objective 2',
          missions: [
            { missionTitle: 'Mission 3', missionValue: 30, missionDescription: 'Description for Mission 3', mission: 'Mission C' },
            { missionTitle: 'Mission 4', missionValue: 70, missionDescription: 'Description for Mission 4', mission: 'Mission D' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Categorie title 2',
      image: '/assets/Front/images/team/images (1).jpg',
      objectives: [
        { 
          title: 'Objective A',
          missions: [
            { missionTitle: 'Mission 5', missionValue: 20, missionDescription: 'Description for Mission 5', mission: 'Mission E' },
            { missionTitle: 'Mission 6', missionValue: 80, missionDescription: 'Description for Mission 6', mission: 'Mission F' }
          ]
        },
        { 
          title: 'Objective B',
          missions: [
            { missionTitle: 'Mission 7', missionValue: 50, missionDescription: 'Description for Mission 7', mission: 'Mission G' },
            { missionTitle: 'Mission 8', missionValue: 50, missionDescription: 'Description for Mission 8', mission: 'Mission H' }
          ]
        }
      ]
    },
    // Add more categories as needed

  ];
  category:any;
  mymission: any;
  
  ngOnInit(): void {
    this.category=this.categories[0];
  }
  exploreCategory(category: any) {
    // Add logic to handle exploration of the selected category
    console.log('Exploring category:', category.title);
    // You can navigate to a new route, display more information, etc.
  }
  getObjectives(id:number){
    return this.categories.find(c => c.id == id)?.objectives;
  }

  showMissions(objective:any){
    this.showCards= !this.showCards ;
    this.omissions= objective?.missions;
    this.TitreObjective=objective.title;

  }
  returntoObjectives(){
    this.showCards= !this.showCards ;
    this.omissions=[];
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
    if (missionModal) {
      missionModal.style.display = 'block';
    }
  }
  
}
interface Mission {
  missionTitle: string;
  missionValue: number;
  missionDescription: string;
  mission: string;
}