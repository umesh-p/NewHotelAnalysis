import { Component, OnInit} from '@angular/core';
import { InventoryService } from '../../../../services/childServices/inventory.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { materialObject }  from "../../../../common/interfaces/interfaces";
import { MenuItemService } from '../../../../services/childServices/menu-item.service';

import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.scss']
})
export class MenuManagement implements OnInit {

  allMenuItems:any = [];
	menuDetails: any = {};

  availableAtOptions = ["BreakFast" , "Lunch" ,"Dinner" ,"All-Time"]

  menuItemMaterials:any = [];
  menuMaterialObject:any = {};
  allMaterialNames:any = [];
  allMaterialsData:any = [];

	itemIndex: number = -1;
  viewAddNewMenuPanel:boolean = false;
  isEditMaterial:boolean = false;
  allUnits = ['Kg','Gms','Liters'];
  totalPricePerPlate:number = 0;

  constructor(private inventoryService : InventoryService , public toastr: ToastsManager , private menuService:MenuItemService ) { }

  ngOnInit() {
    this.inventoryService.getAll().subscribe((result) => {
      this.allMaterialNames = result.data.map(value => value.itemname);
      this.allMaterialsData = result.data;
    });

    this.allMenuItems = this.menuService.getMenuData();

  }

  onSubmit(formData){

    let newMenuItem = Object.assign({}, formData.value);
    newMenuItem['materialUsed'] = this.menuItemMaterials;

    if(!newMenuItem.id){
        newMenuItem["id"] = "";

        this.menuService.post(newMenuItem).subscribe((result) => {
            newMenuItem['id'] = result.data;
            this.allMenuItems.push(newMenuItem);
            this.toastr.success('Menu Item Added' ,"Success" , {showCloseButton : true});
            this.menuItemMaterials = [];
            formData.reset();
        })
    }else{

      let objIndex = this.allMenuItems.findIndex((obj => obj.id == newMenuItem.id));

      let UpdatedItems = newMenuItem;
      UpdatedItems['materialUsed'] = this.menuItemMaterials;

      this.menuService.put(UpdatedItems).subscribe((result) => {
          this.toastr.success('Menu Item Updated Successfully' ,"Success" , {showCloseButton : true});
          this.allMenuItems[objIndex] = newMenuItem;
          this.menuItemMaterials = [];
          formData.reset();
      })
    }
    this.openMenuItemPanel()

  }

  updateMenuItem(item){

    this.menuDetails = item;
    this.menuItemMaterials = item['materialUsed'];
    this.viewAddNewMenuPanel = true;
    this.calculateCost();
  }

  deleteMenuItem(itemId){
    this.menuService.delete(itemId).subscribe((result) =>{
          this.allMenuItems = this.allMenuItems.filter(item => itemId !== item.id);
          this.toastr.success('Menu Item Deleted' ,"Success" , {showCloseButton : true});
    })

  }

  openMenuItemPanel(){
      this.viewAddNewMenuPanel = !this.viewAddNewMenuPanel;
  }

  addMaterial(materialData){

    if(!this.isEditMaterial)
      this.menuItemMaterials.push(materialData.value);
    else{
      this.menuItemMaterials[this.itemIndex] = materialData.value;
      this.itemIndex = -1;
    }
    this.calculateCost();
    this.isEditMaterial = false;
    materialData.reset();
  }

  editMaterialItem(matrialItem , index){
    this.menuMaterialObject = matrialItem;
    this.itemIndex = index;
    this.isEditMaterial = true;
  }

  removeMaterial(index){
    this.menuItemMaterials.splice(index,1);
    this.calculateCost();
  }

  calculateCost(){

    this.totalPricePerPlate = 0;

    for(let i in this.menuItemMaterials){

      let item = this.menuItemMaterials[i];
      let itemDetails = this.allMaterialsData.filter((material) => material['itemname'] == item['materialname'] )[0];

      if(itemDetails.unit == item.unit){
        this.totalPricePerPlate = this.totalPricePerPlate + (item['qtyused']*itemDetails["perunitprice"])
      }
      else if(itemDetails.unit == "Kg" && item.unit == "Gms"){
        this.totalPricePerPlate = this.totalPricePerPlate + ((item['qtyused']/1000)*itemDetails["perunitprice"])
      }
      else if(itemDetails.unit == "Gms" && item.unit == "Kg"){
        this.totalPricePerPlate = this.totalPricePerPlate + ((item['qtyused']*1000)*itemDetails["perunitprice"])
      }

    }

    this.totalPricePerPlate = this.totalPricePerPlate / parseInt(this.menuDetails.platesperday);

  }

}
