import { Routes } from '@angular/router';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { WatchPageComponent } from './watch-page/watch-page.component';

export const routes: Routes = [
  { path: '', component: EditorPageComponent },
  { path: 'watch', component: WatchPageComponent },
];
