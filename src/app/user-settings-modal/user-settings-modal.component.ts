import { DataService } from '../data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-settings-modal',
  templateUrl: './user-settings-modal.component.html',
  styleUrls: ['./user-settings-modal.component.scss']
})
export class UserSettingsModalComponent implements OnInit {

  userObjList = [];
  
  clientsObj = {"clientName":"","entitiesList":[]};

  userObject = {
    "userId":"",
    "rolesList":[],
    "entitiesList":[]
  }; //test purpose

  usersList = [];
  clientsList = [];
  rolesList = [];
  entitiesList = [];

  currentEntitiesList  = ["Dapibus ac facilisis in","Vestibulum at eros","Morbi leo risus"];
  currentRolesList = ["r1","r2","r3"];
  currentUserId: string = "";
  tmpUserId = "";

  isSubmitted: boolean = false;
  isNewUser: boolean = false;
  newUser: string = "";
  clonedUser: string = "";

  selectedUsers: string = "";
  selectedEntities: string[];
  selectedRoles: string = "";
  selectedClientAction: string =  "";

  constructor(private data: DataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.usersList = this.data.getUsers();
    this.rolesList  = this.data.getRoles();
    this.entitiesList = this.data.getEntities();
    this.clientsList = ["AIA", "AIA2", "AIA3"];
  }

  /************************************************* */
  /* Function to open the Modal screen */
  /************************************************* */
  open(addUserModal){
    this.modalService.open(addUserModal, {ariaLabelledBy: 'modal-basic-title'})/*.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })*/;
  }

  /************************************************* */
  /* Entities Management */
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

  updateEntitiesByRoles(role: string){
    console.log("Add entities by role");
    //TODO
  }

  removeEntitiesByRoles(role: string){
    console.log("Remove entities by role");
    //TODO
  }

  /************************************************* */
  /* Role Management */
  /************************************************* */

  addRole(): void{
    console.log("Add Role");
    if (this.selectedRoles != ""){
      console.log("Selected Roles :" + this.selectedRoles);
      this.currentRolesList.indexOf(this.selectedRoles) === -1 ? this.currentRolesList.push(this.selectedRoles) : console.log("This role already exists");
      console.log(this.currentRolesList);
      this.updateEntitiesByRoles(this.selectedRoles);
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
  /* User Management */
  /************************************************* */

  addUserByClone(newUserID: string, clonedUserID: string): void{
    console.log("Add User by Clone => new user :" + newUserID + " from : " + clonedUserID);
    //this.data.addUserByClone(newUserID,clonedUserID);
    //TODO
  }

  removeUser(userID: string): void{
    console.log("Remove User : "+ userID);
    this.data.removeUser(userID);
    //TODO
  }

  /************************************************* */
  /* SUBMIT ACTION */
  /************************************************* */

  submitNewUser(newUserID: string): void{
    console.log("New user submitted : " + this.tmpUserId);
    this.userObject["userId"]= newUserID;    
    this.userObject["rolesList"]=[];  
    this.userObject["entitiesList"]=[]; 
    //TEST
    //this.data.addUser(newUserID);
    //TEST
    // ====> syncData
    if (! this.usersList.includes(newUserID)){
      // Set the new user in the visualization section
      this.usersList.push(newUserID);
      this.tmpUserId = newUserID;
      this.submitEditUser(true);
    }else{
      console.log("UserID already exists.")
    }
  }

  submitNewUserCloned(newUserID: string, clonedUserID: string): void{
    console.log("Add User by Clone => new user :" + newUserID + " from : " + clonedUserID);
    //TODO
  }

  submitEditUser(isNew: boolean){
    console.log("UserID submitted : " + this.tmpUserId);
    console.log("Refresh screen for existing user");

    if (this.currentUserId !== this.tmpUserId && this.usersList.includes(this.tmpUserId)){
      this.currentUserId = this.tmpUserId;
      if (isNew){
        console.log("Refresh screen for new user");
        this.currentRolesList = []; // lead to clean entities list
        this.currentEntitiesList = [];
      }else{
        console.log("Refresh screen for existing user")
        // Update roles and entities
        // this.syncUserDatas(this.currentUserId);
        this.userObject = this.data.syncDatas(this.userObject["userId"]);
        this.currentRolesList = this.userObject["rolesList"];
        this.currentRolesList.forEach((role)=>{
          this.entitiesList.push(this.updateEntitiesByRoles(role));
        });
        //this.rolesList = 
        this.currentEntitiesList = this.userObject["entitiesList"];
      }
      this.isSubmitted = true;
      this.tmpUserId = "";
    }else{
      console.log("Unkown user");
      this.isSubmitted = false;
    }
    console.log("isSubmitted : " + this.isSubmitted);
  }

  updateUserSetting(){
    console.log("Update User Settings");
    if (this.usersList.includes(this.currentUserId)){
      console.log("Save changes of userID = " + this.currentUserId);
      this.userObject["userId"] = this.currentUserId;
      this.userObject["rolesList"] = this.currentRolesList;
      this.userObject["entitiesList"] = this.currentEntitiesList;
      console.log("userObject = " + JSON.stringify(this.userObject));
    }else{
      console.log("ERROR");
    }
  }

  emptyUser(){

  }

  //syncUserDatas(user : any){
  //  console.log("Sync user datas : " + user["userId"]);
  //}
}


