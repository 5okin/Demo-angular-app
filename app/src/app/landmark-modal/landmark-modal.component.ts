import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-landmark-modal',
  templateUrl: './landmark-modal.component.html',
  styleUrl: './landmark-modal.component.css'
})
export class LandmarkModalComponent {
  @Input() showModal: boolean = false;
  @Input() landmark: any;

  test: string;
  
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.showModal = false;
    this.closeModal.emit();
  }

}
