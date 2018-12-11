import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  themeId = "";
  isNew = true;
  themeForm = this.fb.group(new Theme());

  constructor(public nav: NavmenuService, private themesService: ThemesService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.nav.hide();
    this.route.data.subscribe(data => {
      if (typeof data['theme'] !== 'undefined') {
        this.themeForm = this.fb.group(<Theme>{
          ...data['theme']
        });
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
    if (this.themeForm.valid) {
      let theme: Theme = this.themeForm.value;
      if (this.isNew) {
        this.create(theme);
      } else {
        this.update(theme);
      }
    }
    // console.log(this.themeForm);
    // create if new
    // update if not new
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


  close() {
    this.router.navigate(['themes']);
  }
}
