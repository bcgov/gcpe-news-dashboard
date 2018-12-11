import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NavmenuService } from '../../services/navmenu.service';
import { ThemesService } from '../../services/themes.service';
import { Theme } from 'src/app/view-models/theme';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {
  themeId: string = "";
  isNew: boolean = true;
  theme: Theme = new Theme();
  themeForm: FormGroup;

  constructor(public nav: NavmenuService, private themesService: ThemesService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
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
        this.theme = <Theme>{
          ...data['theme']
        };
        this.resetForm();
        this.themeId = data['theme'].id;
        this.isNew = false;
      }
    });
  }

  ngOnDestroy() {
    this.nav.show();
  }

  save(e) {
    e.preventDefault();
    if (this.themeForm.invalid) {
      return;
    }
    let theme: Theme = this.themeForm.value;
    if (this.isNew) {
      this.create(theme);
    } else {
      this.update(theme);
    }
  }

  create(theme) {
    this.themesService.create(theme)
    .subscribe(
      () => {
        console.log("Created theme!");
        this.close();
      },
      () => {
        console.log("Failed to create theme");
      }
    );
  }

  update(theme) {
    this.themesService.update(this.themeId, theme)
    .subscribe(
      () => {
        console.log("Updated theme!");
        this.close();
      },
      () => {
        console.log("Failed to create theme");
      }
    );
  }

  togglePublished() {
    if (this.themeForm.invalid) {
      return;
    }
    let theme = this.themeForm.value;
    theme.isPublished = !this.theme.isPublished;
    if (this.isNew) {
      this.create(theme);
    } else {
      this.update(theme);
    }
  }

  close() {
    if (this.theme.isPublished) {
      this.router.navigate(['themes'], { queryParams: { type: 'Published' }});
    } else {
      this.router.navigate(['themes'], { queryParams: { type: 'Drafts' }});
    }
  }
}
