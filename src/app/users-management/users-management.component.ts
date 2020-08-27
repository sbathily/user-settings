import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {

  usersList = [];
  rolesList = [];
  entitiesList = [];

  currentEntitiesList  = ["Dapibus ac facilisis in","Vestibulum at eros","Morbi leo risus"];
  currentRolesList = ["r1","r2","r3"];
  currentUserId: string = "";
  tmpUserId = "";

  isSubmitted: boolean = false;
  newUser: string = "";
  clonedUser: string = "";

  selectedUsers: string = "";
  selectedEntities: string[];
  selectedRoles: string = "";

  constructor(private data: DataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.usersList = this.data.getUsers();
    this.rolesList  = this.data.getRoles();
    this.entitiesList = this.data.getEntities();
  }

  open(addUserModal){
    this.modalService.open(addUserModal, {ariaLabelledBy: 'modal-basic-title'})/*.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })*/;
  }

  updateUserID(){
    console.log("UserID submitted : " + this.tmpUserId);
    if (this.currentUserId !== this.tmpUserId){
      this.currentUserId = this.tmpUserId;
      this.isSubmitted = true;
    }else{
      this.isSubmitted = false;
    }
    console.log("isSubmitted : " + this.isSubmitted);
  }

  /************************************************* */
    //Entities Management **************************
  /************************************************* */

  addEntity(): void{
    console.log("add Entity");
    console.log(this.selectedEntities);
    if (this.selectedEntities.length !== 0){
      //let splitted = this.selectedEntities.split(",");
      //console.log(splitted);

      console.log("Selected Entities :" + this.selectedEntities);
      this.selectedEntities.forEach((val)=>{
        this.currentEntitiesList.indexOf(val) === -1 ? this.currentEntitiesList.push(val) : console.log("This entity already exists");
      })
      //this.currentEntitiesList.indexOf(this.selectedEntities) === -1 ? this.currentEntitiesList.push(this.selectedEntities) : console.log("This entity already exists");
      console.log(this.currentEntitiesList);
      this.selectedEntities = [];
    }
  }

  filterEntities(entitiesArray, value){
     return entitiesArray.filter(function(ele){return ele != value;});
  }

  removeEntity(): void{
    console.log("Remove Entity");
    if (this.selectedEntities.length !== 0){
      console.log("Selected Entities :" + this.selectedEntities);
      this.selectedEntities.forEach((val)=>{
        this.currentEntitiesList = this.filterEntities(this.currentEntitiesList, val);
      })
      //this.currentEntitiesList = this.filterEntities(this.currentEntitiesList, this.selectedEntities);
      console.log(this.currentEntitiesList);
      this.selectedEntities = [];
    }
  }

  addEntitiesByRoles(role: string){
    console.log("Add entities by role");
    //TODO
  }

  removeEntitiesByRoles(role: string){
    console.log("Remove entities by role");
    //TODO
  }

  /************************************************* */
    //Role Management **************************
  /************************************************* */

  addRole(): void{
    console.log("Add Role");
    if (this.selectedRoles != ""){
      console.log("Selected Roles :" + this.selectedRoles);
      this.currentRolesList.indexOf(this.selectedRoles) === -1 ? this.currentRolesList.push(this.selectedRoles) : console.log("This role already exists");
      console.log(this.currentRolesList);
      this.addEntitiesByRoles(this.selectedRoles);
      this.selectedRoles = "";
    }
  }

  filterRoles(rolesArray, value){
     return rolesArray.filter(function(ele){return ele != value;});
  }

  removeRole(value : string): void{
    console.log("Remove Role : " + value);
    this.currentRolesList = this.filterRoles(this.currentRolesList, value);
    this.removeEntitiesByRoles(value);
    console.log(this.currentRolesList);
  }

  /************************************************* */
    //User Management **************************
  /************************************************* */

  addUser(newUserID: string): void{
    console.log("Add User");
    this.data.addUser(newUserID);
    //TODO
  }

  addUserByClone(newUserID: string, clonedUserID: string): void{
    console.log("Add User by Clone");
    this.data.addUserByClone(newUserID,clonedUserID);
    //TODO
  }

  removeUser(userID: string): void{
    console.log("Remove User");
    this.data.removeUser(userID);
    //TODO
  }

  updateUserSetting(){
    console.log("Update User Settings");
    //TODO
  }

}
