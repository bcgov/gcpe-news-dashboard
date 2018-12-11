import { Component, OnInit } from '@angular/core';
import { Message } from '../../view-models/message';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {
  themes: Message[];

  constructor(private route: ActivatedRoute,  private messagesService: MessagesService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.themes = data['themelist'];
    });
  }

  unpublishTheme(theme: Message) {
    this.messagesService.updateMessage(theme.id, {...theme, isPublished: false})
    .subscribe(
      () => { this.removeThemeFromList(theme.id) },
      () => { this.handleError("Failed to unpublish theme") }
    );
  }

  handleError(message: string) {
    console.log(message);
  }

  removeThemeFromList(themeId: string) {
    this.themes = this.themes.filter(x => x.id !== themeId);
  }

  sortEventReceived(event) {
    const index = this.themes.findIndex(x => x.id === event.themeId);
    if (event.direction === 'up') {
      if (index - 1 < 0) { return }
      this.swapSortOrders(index, index - 1);
    } else if (event.direction === 'down') {
      if (index + 1 >= this.themes.length) { return }
      this.swapSortOrders(index, index + 1);
    }
  }

  swapSortOrders(firstThemeIndex: number, secondThemeIndex: number) {
    let firstTheme = this.themes[firstThemeIndex];
    let secondTheme = this.themes[secondThemeIndex];

    var firstCall = this.messagesService.updateMessage(firstTheme.id, {...firstTheme, sortOrder: secondTheme.sortOrder});
    var secondCall = this.messagesService.updateMessage(secondTheme.id, {...secondTheme, sortOrder: firstTheme.sortOrder });

    // Subscribe to both update calls
    forkJoin(firstCall, secondCall).subscribe(results => {
      this.themes[secondThemeIndex] = results[0] as Message;
      this.themes[firstThemeIndex] = results[1] as Message;
    }, () => {
      this.handleError("Failed to change order of themes");
    });
  }
}
