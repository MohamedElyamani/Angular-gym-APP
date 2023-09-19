import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatRecordComponent } from './creat-record/creat-record.component';
import { RecordListComponent } from './record-list/record-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'create-record', pathMatch: 'full' },
  { path: 'create-record', component: CreatRecordComponent },
  { path: 'list', component: RecordListComponent },
  { path: 'update/:id', component: CreatRecordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
