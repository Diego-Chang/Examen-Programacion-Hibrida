import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { PublicationManagerComponent } from "../../components/publication-manager/publication-manager.component";
import { PublicationDbService } from 'src/app/services/publication-db.service';
import { Publication } from 'src/app/models/publication-model';

@Component({
  selector: 'app-publication-manager',
  templateUrl: './publication-manager.page.html',
  styleUrls: ['./publication-manager.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, PublicationManagerComponent]
})
export class PublicationManagerPage implements OnInit {

  constructor(
    //Makes an instance of PublicationDBService for local DB CRUD usage.
    private publicationDBService: PublicationDbService
  ) { }

  ngOnInit() {
  }

  //Calls for addPublication() function from local DB with paramater $event to add a publication based on user input to storage.
  //Also prints said new publication for debugging purposes.
  async addPublication($event: Publication) {
    console.log($event)
    await this.publicationDBService.addPublication($event)
  }
}
