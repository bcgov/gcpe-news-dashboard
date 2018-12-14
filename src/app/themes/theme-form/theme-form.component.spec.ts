import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ThemeFormComponent } from './theme-form.component';
import { MessagesService } from 'src/app/services/messages.service';
import { NavmenuService } from 'src/app/services/navmenu.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Message } from '../../view-models/message';

@Injectable()
class MockMessagesService {
  addMessage() {}
}

@Injectable()
class MockRouter {
  data = of({});
  navigate(route, opts) {}
}

@Injectable()
class MockRoute {
  data = of({title: 'test'});
}

const FakeEmptyMessage = {
  title: '',
  description: '',
  isHighlighted: false,
  isPublished: false
} as Message;

describe('ThemeFormComponent', () => {
  let component: ThemeFormComponent;
  let fixture: ComponentFixture<ThemeFormComponent>;
  let messagesService: MessagesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ThemeFormComponent ],
      providers: [
        NavmenuService,
        FormBuilder,
        { provide: MessagesService, useClass: MockMessagesService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: { data: of(FakeEmptyMessage) } },
      ]
    });
  }));
  beforeEach(() => {
    spyOn(TestBed.get(NavmenuService), 'hide');
    spyOn(TestBed.get(NavmenuService), 'show');
    fixture = TestBed.createComponent(ThemeFormComponent);
    messagesService = TestBed.get(MessagesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create as new', () => {
    expect(component).toBeTruthy();
    expect(component.isNew).toBeTruthy();
  });

  it('should hide nav', () => {
    expect(TestBed.get(NavmenuService).hide).toHaveBeenCalled();
  });

  it('should show nav when destroyed', () => {
    fixture.destroy();
    expect(TestBed.get(NavmenuService).show).toHaveBeenCalled();
  });

  it('should not save if invalid', () => {
    spyOn(component, 'create');
    fixture.detectChanges();
    component.save();
    expect(component.create).not.toHaveBeenCalled();
  });

  it('should save if valid', () => {
    spyOn(component, 'create');
    component.themeForm.patchValue({title: 'Test'});
    component.save()
    expect(component.create).toHaveBeenCalled();
  });

  it('should add message', async(async() => {
    const observe = of(FakeEmptyMessage);
    spyOn(messagesService, 'addMessage').and.returnValue(observe);
    spyOn(component, 'close');
    
    component.create(FakeEmptyMessage);
    await observe.toPromise();

    expect(messagesService.addMessage).toHaveBeenCalledWith(FakeEmptyMessage);
    expect(component.close).toHaveBeenCalled();
  }));

  it('should toggle published and create', async(async() => {
    spyOn(component, 'create');
    component.themeForm.patchValue({title: "Publish me!"});
    
    component.togglePublished();

    expect(component.create).toHaveBeenCalledWith({
      'title': 'Publish me!',
      'description': '',
      isHighlighted: false,
      isPublished: true
    });
  }));

  it('should not toggle published if invalid', async(async() => {
    spyOn(component, 'create');
    component.togglePublished();
    expect(component.create).not.toHaveBeenCalled();
  }));

  it('should navigate to proper route on close', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');

    component.close();
    expect(router.navigate).toHaveBeenCalledWith(['themes'], { queryParams: { type: 'Drafts' }});

    component.theme.isPublished = true;
    component.close();

    expect(router.navigate).toHaveBeenCalledWith(['themes'], { queryParams: { type: 'Published' }});
  });
});
