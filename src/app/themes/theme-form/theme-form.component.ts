import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NavmenuService } from '../../services/navmenu.service';
import { MessagesService } from '../../services/messages.service';
import { Message } from 'src/app/view-models/message';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
})
export class ThemeFormComponent implements OnInit {
  themeId: string = "";
  isNew: boolean = true;
  theme = {
    title: '',
    description: '',
    isHighlighted: false,
    isPublished: false
  } as Message;
  themeForm: FormGroup;

  constructor(public nav: NavmenuService, private messagesService: MessagesService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.resetForm();
  }

  resetForm() {
    this.themeForm = this.fb.group({
      title: [this.theme.title, Validators.required],
      description: [this.theme.description],
      isHighlighted: [this.theme.isHighlighted],
      isPublished: [this.theme.isPublished]
    });
  }

  ngOnInit() {
    this.nav.hide();
    this.route.data.subscribe(data => {
      if (typeof data['theme'] !== 'undefined') {
        this.theme = <Message>{
          ...data['theme']
        };
        
        this.themeId = data['theme'].id;
        this.isNew = false;
        this.resetForm();
      }
    });
  }

  ngOnDestroy() {
    this.nav.show();
  }

  handleError(message) {
    console.log(message);
  }

  save() {
    if (this.themeForm.invalid) {
      return;
    }
    let theme: Message = this.themeForm.value;
    if (this.isNew) {
      this.create(theme);
    } else {
      this.update(theme);
    }
  }

  create(theme: Message) {
    this.messagesService.addMessage(theme)
    .subscribe(
      () => {
        this.close();
      },
      () => {
        this.handleError("Failed to create theme");
      }
    );
  }

  update(theme: Message) {
    this.messagesService.updateMessage(this.themeId, theme)
    .subscribe(
      () => {
        this.close();
      },
      () => {
        this.handleError("Failed to create theme");
      }
    );
  }

  togglePublished() {
    if (this.themeForm.invalid) {
      return;
    }
    this.theme = { ...this.themeForm.value, isPublished: !this.theme.isPublished };
    if (this.isNew) {
      this.create(this.theme);
    } else {
      this.update(this.theme);
    }
  }

  close() {
    if (this.theme.isPublished) {
      this.router.navigate(['themes'], { queryParams: { type: 'Published' }});
    } else {
      this.router.navigate(['themes'], { queryParams: { type: 'Drafts' }});
    }
  }

  delete() {
    if (this.isNew) {
      this.close();
      return;
    }
    this.messagesService.deleteMessage(this.theme.id)
    .subscribe(
      () => { this.close() },
      () => { this.handleError("Failed to delete theme") }
    );
  }
}
