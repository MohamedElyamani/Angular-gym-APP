import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIsService } from '../service/apis.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-creat-record',
  templateUrl: './creat-record.component.html',
  styleUrls: ['./creat-record.component.scss']
})
export class CreatRecordComponent implements OnInit {
  addUser!: User[]
  traineeOpt: string[] = ['Yes', 'No'];
  gender: string[] = ['Male', 'Female'];
  packages: string[] = ['Monthely', 'Yearly'];
  lists: string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ];
  isUpdate:boolean = false;
  userIdToUpdate!:number
  //price:number = 700;
  constructor(private API:APIsService, private toast:NgToastService, private router:Router, private activateRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.addRecord.controls['height'].valueChanges.subscribe(res=>{
      this.calcBMI(res)
    })
    this.toNavigateWithFillForm()
  }
  addRecord: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    bmi: new FormControl(''),
    bmiResult: new FormControl(''),
    gender: new FormControl('', Validators.required),
    requireTrainer: new FormControl('', Validators.required),
    package: new FormControl('', Validators.required),
    importantList: new FormControl('', Validators.required),
    haveGymBefore: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  })

  // method to add new record
  submition(){
      if(this.addRecord.valid){
        this.API.addRecoed(this.addRecord.value).subscribe(res=>{

          this.toast.success({detail:"SUCCESS",summary:'Record Added Successfly',duration:2000, position:'topRight'});
          this.addRecord.reset()
        })
      }
}
calcBMI(heightval:number){
  let weight = this.addRecord.value.weight;
  let height = heightval;
  let bmi = weight / (height * height)
  this.addRecord.controls['bmi'].patchValue(bmi)
  switch (true) {
    case bmi < 18.5:
      this.addRecord.controls['bmiResult'].patchValue("Underweight");
      break;
    case (bmi >= 18.5 && bmi < 25):
      this.addRecord.controls['bmiResult'].patchValue("Normal");
      break;
    case (bmi >= 25 && bmi < 30):
      this.addRecord.controls['bmiResult'].patchValue("Overweight");
      break;

    default:
      this.addRecord.controls['bmiResult'].patchValue("Obese");
      break;
  }
}
fillFormToUpdate(user: User){
  this.addRecord.setValue({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    weight: user.weight,
    height: user.height,
    bmi: user.bmi,
    bmiResult: user.bmiResult,
    gender: user.gender,
    requireTrainer: user.requireTrainer,
    package: user.package,
    importantList: user.importantList,
    haveGymBefore: user.haveGymBefore,
    date: user.date
  })
}
toNavigateWithFillForm(){
   this.activateRoute.params.subscribe(val=>{
    this.userIdToUpdate = val['id'];
    this.API.detailsRecord(this.userIdToUpdate).subscribe(res=>{
      this.fillFormToUpdate(res);
      this.isUpdate = true
    })
  })
}
 updateUser(){
   this.API.updateRecord(this.addRecord.value, this.userIdToUpdate).subscribe(res=>{
    this.toast.success({detail:"SUCCESS",summary:'Record Updated Successfly',duration:2000, position:'topRight'});
    this.router.navigate(['/list'])
  })
}
}
