import { Component, OnInit } from '@angular/core';
import { Message } from '../../view-models/message';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { forkJoin } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {
  themes: Message[];

  constructor(private route: ActivatedRoute,  private messagesService: MessagesService, private alerts: AlertsService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.parseThemes(data);
    });
  }

  parseThemes(data) {
    if(typeof data['themelist'] === 'undefined' || data['themelist'] === null) {
      this.handleError('An error occurred while retrieving themes');
      return;
    };
    this.themes = data['themelist'];
  }

  unpublishTheme(theme: Message) {
    this.messagesService.updateMessage(theme.id, {...theme, isPublished: false})
    .subscribe(
      () => { this.removeThemeFromList(theme.id); },
      () => { this.handleError('Failed to unpublish theme'); }
    );
  }

  handleError(message: string) {
    this.alerts.showError(message);
  }

  removeThemeFromList(themeId: string) {
    this.themes = this.themes.filter(x => x.id !== themeId);
  }

  sortEventReceived(event) {
    const index = this.themes.findIndex(x => x.id === event.themeId);
    if (event.direction === 'up') {
      if (index - 1 < 0) { return; }
      this.messagesService.updateMessage(this.themes[index].id, { ...this.themes[index], sortOrder: this.themes[index].sortOrder - 1 })
        .subscribe(result => {
          if (result.sortOrder >= this.themes[index].sortOrder) {
            alert("Another user is also currently changing the order of themes");
            return;
          }
          this.themes[index - 1].sortOrder = this.themes[index].sortOrder;
          this.themes[index] = this.themes[index - 1];
          this.themes[index - 1] = result;
        });
    } else if (event.direction === 'down') {
      if (index + 1 >= this.themes.length) { return; }
      this.messagesService.updateMessage(this.themes[index].id, { ...this.themes[index], sortOrder: this.themes[index].sortOrder + 1 })
        .subscribe(result => {
          if (result.sortOrder <= this.themes[index].sortOrder) {
            alert("Another user is also currently changing the order of themes");
            return;
          }
          this.themes[index + 1].sortOrder = this.themes[index].sortOrder;
          this.themes[index] = this.themes[index + 1];
          this.themes[index + 1] = result;
        });
    }
  }
}
