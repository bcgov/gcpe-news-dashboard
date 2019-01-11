import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeletePostConfirmationModalComponent } from './delete-post-confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('DeletePostConfirmationModalComponent', () => {
  let component: DeletePostConfirmationModalComponent;
  let fixture: ComponentFixture<DeletePostConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePostConfirmationModalComponent ],
      providers: [
       NgbActiveModal
      ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePostConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
