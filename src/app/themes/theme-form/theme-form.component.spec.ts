import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ThemeFormComponent } from './theme-form.component';
import { MessagesService } from 'src/app/services/messages.service';
import { NavmenuService } from 'src/app/services/navmenu.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';

@Injectable()
class MockMessagesService {
  addMessage() {}
  updateMessage() {}
  deleteMessage() {}
}

@Injectable()
class MockRouter {
  navigate(route, opts) {}
}

const FakeEditRoute = {
  theme: {
    id: '12345-12345',
    title: 'Test Theme',
    description: 'big long description',
    isPublished: true,
    isHighlighted: false,
    sortOrder: 0,
    timestamp: new Date()
  }
};

describe('ThemeFormComponent', () => {
  let component: ThemeFormComponent;
  let fixture: ComponentFixture<ThemeFormComponent>;
  let messagesService: MessagesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ThemeFormComponent ],
      providers: [
        AlertsService,
        NavmenuService,
        FormBuilder,
        { provide: MessagesService, useClass: MockMessagesService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: { data: of({}) } },
      ]
    });
  }));

  describe('New Theme', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ThemeFormComponent);
      spyOn(TestBed.get(AlertsService), 'showError');
      spyOn(TestBed.get(NavmenuService), 'hide');
      spyOn(TestBed.get(NavmenuService), 'show');
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
      component.save();
      expect(component.create).toHaveBeenCalled();
    });

    it('should add message using message service', async(async() => {
      const observe = of({});
      spyOn(messagesService, 'addMessage').and.returnValue(observe);
      spyOn(component, 'close');

      component.create({ title: 'test title' });
      await observe.toPromise();

      expect(messagesService.addMessage).toHaveBeenCalledWith({
        title: 'test title'
      });
      expect(component.close).toHaveBeenCalled();
    }));

    it('should toggle published and create', async(async() => {
      spyOn(component, 'create');
      component.themeForm.patchValue({title: 'Publish me!'});

      component.togglePublished();

      expect(component.create).toHaveBeenCalledWith({
        title: 'Publish me!',
        description: '',
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

    it('should close on delete message', () => {
      spyOn(messagesService, 'deleteMessage').and.returnValue(of({}));
      spyOn(component, 'close');

      component.delete();

      expect(component.close).toHaveBeenCalled();
      expect(messagesService.deleteMessage).not.toHaveBeenCalled();
    });

    it('should show alert on create error', () => {
      spyOn(component, 'handleError');
      spyOn(messagesService, 'addMessage').and.returnValue(throwError('error'));
      
      component.create({title: 'title'})
      
      expect(component.handleError).toHaveBeenCalled();
    });
  });

  describe('Edit Theme', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: { data: of(FakeEditRoute) } });
      spyOn(TestBed.get(NavmenuService), 'hide');
      spyOn(TestBed.get(NavmenuService), 'show');
      fixture = TestBed.createComponent(ThemeFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create as not new', () => {
      expect(component).toBeTruthy();
      expect(component.isNew).toBeFalsy();
      expect(component.themeId).toBe(FakeEditRoute.theme.id);
    });

    it('should save if valid', () => {
      spyOn(component, 'update');
      component.themeForm.patchValue({title: 'Test'});
      component.save();
      expect(component.update).toHaveBeenCalled();
    });

    it('should update message using messages service', async(async() => {
      const observe = of({});
      spyOn(TestBed.get(MessagesService), 'updateMessage').and.returnValue(observe);
      spyOn(component, 'close');

      component.update({ title: 'test title' });
      await observe.toPromise();

      expect(TestBed.get(MessagesService).updateMessage).toHaveBeenCalledWith(FakeEditRoute.theme.id, {
        title: 'test title'
      });
      expect(component.close).toHaveBeenCalled();
    }));

    it('should toggle published and update', async(async() => {
      spyOn(component, 'update');
      component.themeForm.patchValue({title: 'unPublish me!'});

      component.togglePublished();

      expect(component.update).toHaveBeenCalledWith({
        title: 'unPublish me!',
        description: 'big long description',
        isPublished: false,
        isHighlighted: false,
      });
    }));

    it('should delete message', () => {
      spyOn(TestBed.get(MessagesService), 'deleteMessage').and.returnValue(of({}));
      spyOn(component, 'close');

      component.delete();

      expect(component.close).toHaveBeenCalled();
      expect(TestBed.get(MessagesService).deleteMessage).toHaveBeenCalledWith(component.theme.id);
    });

    it('should show alert on delete error', () => {
      spyOn(component, 'handleError');
      spyOn(TestBed.get(MessagesService), 'deleteMessage').and.returnValue(throwError('error'));
      
      component.delete()
      
      expect(component.handleError).toHaveBeenCalled();
    });

    it('should show alert on update error', () => {
      spyOn(component, 'handleError');
      spyOn(TestBed.get(MessagesService), 'updateMessage').and.returnValue(throwError('error'));
      
      component.update({title: 'title'})
      
      expect(component.handleError).toHaveBeenCalled();
    });
  });
});
