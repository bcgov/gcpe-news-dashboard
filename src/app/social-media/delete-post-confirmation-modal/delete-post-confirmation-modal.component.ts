import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-delete-post-confirmation-modal',
  templateUrl: './delete-post-confirmation-modal.component.html',
  styleUrls: ['./delete-post-confirmation-modal.component.scss']
})
export class DeletePostConfirmationModalComponent implements OnInit {

  @Input() url;

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit() {
  }

}
