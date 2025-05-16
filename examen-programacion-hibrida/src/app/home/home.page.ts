import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonTabs, IonTabBar, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons'
import { PublicationsComponent } from "../components/publications/publications.component";
import { PublicationDbService } from '../services/publication-db.service';
import { Publication } from '../models/publication-model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonTabButton, IonTabBar, IonTabs, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, PublicationsComponent],
})
export class HomePage {

  //Publication list that receives all publications stored in local DB.
  publications: Publication[] = []
  
  constructor(
    //Makes an instance of PublicationDBService for local DB CRUD usage.
    private publicationDBService: PublicationDbService
  ) {
    //Instances icon for Add Post button.
    addIcons({addCircle});
  }

  //Starts local DB plugin on initiation.
  //Also calls for update() function on initiation.
  async ngOnInit() {
    await this.publicationDBService.startPlugin()
    await this.update()
  }

  //Starts local DB plugin before page is viewable.
  //Also calls for update() function before page is viewable.
  async ionViewWillEnter() {
    await this.publicationDBService.startPlugin()
    await this.update()
  }

  //Calls for getPublicationList() function from local DB and passes it's results to publications.
  async update(){
    this.publications = await this.publicationDBService.getPublicationList()
  }

  //Calls for deletePublication() function from local DB with parameter id from post selected by user.
  //Also calls for update() function to update list of publications viewable on page.
  async deletePublication($event: number) {
    await this.publicationDBService.deletePublication($event)
    await this.update()
  }
}
