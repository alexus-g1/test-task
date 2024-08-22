import { Component, inject, model, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Element } from '../element';
import { ElementsService } from '../elements.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);
@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatTable,
    DatePipe,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss',
})
export class EditorPageComponent {
  constructor(private elementsService: ElementsService) {}
  displayedColumns: string[] = ['name', 'createdAt', 'completeIn', 'btngroup'];

  getElements() {
    this.elements = this.elementsService.getElements();
  }
  ngOnInit() {
    this.getElements();
  }
  elements: Element[] = [];

  @ViewChild(MatTable) table: MatTable<Element>;

  readonly dialog = inject(MatDialog);

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddElementDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.elementsService.addElement({
          id: 0,
          name: result.name,
          description: result.description,
          completeIn: new Date(result.completeIn),
          createdAt: new Date(),
        });
        this.table.renderRows();
      }
    });
  }

  openUpdateDialog(element: Element): void {
    const dialogRef = this.dialog.open(UpdateElementDialog, {
      data: {
        id: element.id,
        name: element.name,
        description: element.description,
        completeIn: element.completeIn,
        createdAt: element.createdAt,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.elementsService.updateElement({
          id: result.id,
          name: result.name,
          description: result.description,
          completeIn: new Date(result.completeIn),
          createdAt: result.createdAt,
        });
      }

      this.table.renderRows();
    });
  }

  copyElement(element: Element) {
    this.elementsService.addElement(element);
    this.table.renderRows();
  }

  deleteElement(element: Element) {
    this.elementsService.deleteElement(element);
    this.table.renderRows();
  }
}

@Component({
  selector: 'add-element-dialog',
  templateUrl: 'add-element-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class AddElementDialog {
  readonly dialogRef = inject(MatDialogRef<AddElementDialog>);
  readonly data = inject<Element>(MAT_DIALOG_DATA);
  readonly name = signal('');
  readonly description = signal('');
  readonly completeIn = signal<Date | null>(null);

  getData() {
    return {
      name: this.name(),
      description: this.description(),
      completeIn: this.completeIn(),
    };
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'add-element-dialog',
  templateUrl: 'add-element-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class UpdateElementDialog {
  readonly dialogRef = inject(MatDialogRef<AddElementDialog>);

  readonly data = inject<Element>(MAT_DIALOG_DATA);
  readonly id = model(this.data.id);
  readonly name = model(this.data.name);
  readonly description = model(this.data.description);
  readonly completeIn = model(this.data.completeIn);
  readonly createdAt = model(this.data.createdAt);

  getData() {
    return {
      id: this.id(),
      name: this.name(),
      description: this.description(),
      completeIn: this.completeIn(),
      createdAt: this.createdAt(),
    };
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
