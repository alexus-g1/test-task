import { Component, inject, ViewChild } from '@angular/core';
import { ElementsService } from '../elements.service';
import { Element } from '../element';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@Component({
  selector: 'app-watch-page',
  standalone: true,
  imports: [MatTableModule, MatMenuModule, MatButtonModule, DatePipe, MatTable],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  templateUrl: './watch-page.component.html',
  styleUrl: './watch-page.component.scss',
})
export class WatchPageComponent {
  readonly dialog = inject(MatDialog);
  @ViewChild(MatTable) table: MatTable<Element>;

  openDialog(element: Element) {
    this.dialog.open(WatchDialog, {
      data: element,
    });
  }

  elements: Element[] = [];
  displayedColumns: string[] = ['name', 'createdAt', 'completeIn', 'menu'];
  constructor(private elementsService: ElementsService) {}

  ngOnInit() {
    this.getElements();
  }
  getElements() {
    this.elements = this.elementsService.getElements();
  }

  moveElement(element: Element, direction: 'up' | 'down') {
    this.elementsService.moveElement(element, direction);
    this.table.renderRows();
  }
}

@Component({
  selector: 'watch-element-dialog',
  templateUrl: 'watch-element-dialog.html',
  styleUrls: ['./watch-page.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    DatePipe,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
})
export class WatchDialog {
  readonly data = inject<Element>(MAT_DIALOG_DATA);
  readonly name = this.data.name;
  readonly description = this.data.description;
  readonly completeIn = this.data.completeIn;
  readonly createdAt = this.data.createdAt;
}
