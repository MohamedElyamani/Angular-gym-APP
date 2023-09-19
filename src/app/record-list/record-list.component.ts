import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';
import { APIsService } from '../service/apis.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss'],
})
export class RecordListComponent implements OnInit {
  users!: User[];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'num',
    'firstName',
    'lastName',
    'email',
    'phone',
    'bmiResult',
    'gender',
    'package',
    'date',
    'action',
  ];

  constructor(private API: APIsService, private router: Router, private toast:NgToastService, private confirm:NgConfirmService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.API.getRecords().subscribe((res) => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(error=>{
      console.log(error);

    }));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // update record
  updateUser(id: number) {
    this.router.navigate(['update', id]);
  }

  //delete record
  deleteUser(index:any){
     this.confirm.showConfirm("Are you sure want to Delete this record?",
    () => {
     this.API.deleteRecord(index).subscribe(res=>{
      this.toast.success({detail:"SUCCESS",summary:'Record Deleted Successfly',duration:2000, position:'topRight'});
      this.getUsers()
     })
   },
   () => {
     //do nothing just close
   })
  }
}
