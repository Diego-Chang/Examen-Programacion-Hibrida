import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonList, IonButton, IonItem, IonIcon, IonCard, IonModal, IonCardTitle, IonCardSubtitle, IonText, IonGrid, IonCol, IonRow, IonImg, IonCardHeader, IonCardContent } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons'
import { trashOutline, bookOutline } from 'ionicons/icons'
import { Publication } from 'src/app/models/publication-model'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
  standalone: true,
  imports: [IonCardContent, RouterModule, IonCardContent, IonCardHeader, IonImg, IonRow, IonCol, IonGrid, IonText, IonCardSubtitle, IonCardTitle, IonModal, IonIcon, IonItem, IonList, IonButton, IonCard, CommonModule] 
})
export class PublicationsComponent {

  //List of Publication objects which receives Input from parent with a list of publications stored in local DB.
  @Input() publicationsList: Publication [] = []

  //Booleans that manage modal status.
  modalPost: boolean = false
  modalConfirmation: boolean = false

  //Publication object which saves selected publication from user for it's visualization in modal.
  modalPostPublication!: Publication
  
  //Number which stores id of selected publication from user for it's deletion.
  id: number = 0
  //EventEmitter that will Output the id to parent for deletion.
  @Output() onDelete = new EventEmitter<number>()

  constructor(
  ) { 
    //Instances icons for Delete and Read buttons.
    addIcons({trashOutline, bookOutline})
  }

  //Gets data of selected publication by the user and stores it in modalPostPublication.
  getPost(modalPublication: Publication) {
    this.modalPostPublication = modalPublication
  }

  //Sets value of modal state correspondent to Read Modal.
  setModalPost(modalValue: boolean) {
    this.modalPost = modalValue
  }

  //Gets id of selected publication by the user and stores it in id.
  getId(id: number) {
    this.id = id
  }

  //Sets value of modal state correspondent to Delete Modal.
  setModalConfirmation(modalValue:boolean) {
    this.modalConfirmation = modalValue
  }

  //Emits id to parent for deletion.
  deletePublicationButton() {
    this.onDelete.emit(this.id)
  }
}
