import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonCard, IonItem, IonInput, IonText, IonButton, IonImg, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { Publication } from 'src/app/models/publication-model';
import { Camera, CameraResultType } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publication-manager-component',
  templateUrl: './publication-manager.component.html',
  styleUrls: ['./publication-manager.component.scss'],
  standalone: true,
  imports: [IonIcon, IonCol, IonRow, IonGrid, IonImg, IonButton, IonText, IonCard, IonItem, IonInput, FormsModule, RouterLink, CommonModule]
})
export class PublicationManagerComponent  implements OnInit {

  //Stores user input.
  title:string = ""
  image:string = ""
  imageTaken:boolean = false //Manages visibility state of the image shown in screen in case it's been taken.
  description:string= ""

  //Instance of Publication which will be constructed with user inputs.
  newPublication!: Publication

  //EventEmitter that will Output the Publication object to parent made with user inputs.
  @Output() onCreate = new EventEmitter<Publication>()

  constructor(
  ) { 
    //Instances icon for the camera button.
    addIcons({camera})
  }

  ngOnInit() {}

  //Fires off getPhoto() method from Camera plugin. 
  //If the photo stored in base64image is not null or undefined, it will be assigned to the image property and be shown on screen by changing value of imageTaken.
  async takePhoto() {
	  const image = await Camera.getPhoto({
	    quality: 90,
	    allowEditing: false,
	    resultType: CameraResultType.Base64
	  })
	 
	  const base64image = image.base64String
    if (base64image != null || base64image != undefined){
      this.image = base64image
      this.imageTaken = true
    }
	}

  //Creates a new Publication object, prints it in console for debugging, and emits it to parent for storing.
  createPublication() {
    this.newPublication = {title: this.title, image: this.image, description: this.description, date: new Date()}
    console.log(this.newPublication)
    this.onCreate.emit(this.newPublication)
  }
}
