import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../services/childServices/inventory.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {


  inventoryArray:any[];
  lessQtyItems:any[];
  orderedItems:any[];

  updatedItem:any;
  isUpdateItem= false;

  allUnits = ['Kg','Gms','Liters'];

  constructor(private inventoryService : InventoryService , public toastr: ToastsManager) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    this.inventoryService.getAll().subscribe((result) => {
      this.inventoryArray  = result['data'];
      this.alertLessQtyItems();
      this.showOrderdItems();
    });
  }

  onSubmit(formData){
    this.isUpdateItem = false;
    this.inventoryService.post(formData.value).subscribe(result => {
      if(result.success){
        formData.value['id'] = result.data;
        let newItem = formData.value;

        this.inventoryArray.push();
        if((newItem.qtyPresent <= newItem.minQty ) && (newItem.orderedQty == 0)){
          this.lessQtyItems.push(newItem)
        }

        this.toastr.success('Item Added in inventory' ,"Success" , {showCloseButton : true});
        formData.reset();
      }else{
        this.toastr.error('Unable to add Item .. ' ,"Error" , {showCloseButton : true});
      }
    })
  }

  updateItem(itemToUpdate){
    this.updatedItem = itemToUpdate;
    this.isUpdateItem = true;
  }

  onUpdate(formData){
    this.inventoryService.put(formData.value).subscribe(result => {
      if(result.success){
        this.isUpdateItem = false;
        this.toastr.success('Item Updated Successfully in inventory' ,"Success" , {showCloseButton : true});
      }else{
        this.toastr.error('Unable to add Item .. ' ,"Error" , {showCloseButton : true});
      }
    })
    this.alertLessQtyItems();
  }

  deleteItem(id){
      this.inventoryService.delete(id).subscribe((result) => {
        if(result.success){
            this.inventoryArray = this.inventoryArray.filter( item => item.id !== id);
            this.lessQtyItems = this.lessQtyItems.filter( item => item.id !== id);
            this.orderedItems = this.orderedItems.filter( item => item.id !== id);

            this.toastr.info('Item removed from inventory' ,"Success" , {showCloseButton : true});
        }else{
            this.toastr.error('Unable to Delete Item .. ' ,"Error" , {showCloseButton : true});
        }
      })
  }

  alertLessQtyItems(): any {
    this.lessQtyItems = this.inventoryArray.filter(item =>((item.qtyPresent <= item.minQty ) && (item.orderedQty == 0)))
	}

  showOrderdItems():any{
      this.orderedItems = this.inventoryArray.filter(item => item.orderedQty > 0);
  }

  orderItem(item,orderedQuantity){

    let newOrderedQuantity = orderedQuantity.value;
    let itemId = item.id;

    let orderedQty = {
      'id':itemId,
      'orderedQty':parseFloat(newOrderedQuantity)
    }
    let objIndex = this.inventoryArray.findIndex((obj => obj.id == itemId));

    this.inventoryService.put(orderedQty).subscribe(result => {
      if(result.success){

        this.inventoryArray[objIndex].orderedQty = newOrderedQuantity;
        this.toastr.success('Item Ordered Successfully in inventory' ,"Success" , {showCloseButton : true});
        this.lessQtyItems = this.lessQtyItems.filter(item => item.id != itemId)
        this.orderedItems.push(this.inventoryArray[objIndex]);

      }else{
        this.toastr.error('Unable to add Item .. ' ,"Error" , {showCloseButton : true});
      }
    })

  }

  setArrivedQty(item,arrivedQuantity){

    let updatedOrderedQty = item.orderedQty - parseFloat(arrivedQuantity.value);
    let updatedPrsentQty = parseFloat(item.qtyPresent) + parseFloat(arrivedQuantity.value);
    let itemId = item.id;

    let arrivedQty = {
      'id':itemId,
      'orderedQty':updatedOrderedQty,
      'qtyPresent':updatedPrsentQty
    }

    let objIndex = this.inventoryArray.findIndex((obj => obj.id == itemId));


    this.inventoryService.put(arrivedQty).subscribe(result => {
      if(result.success){

        this.inventoryArray[objIndex].orderedQty = updatedOrderedQty;
        this.inventoryArray[objIndex].qtyPresent = updatedPrsentQty;
        this.toastr.success('Item Ordered Successfully in inventory' ,"Success" , {showCloseButton : true});
        arrivedQuantity.value = 0;

        if(updatedOrderedQty <= 0){
          this.orderedItems = this.orderedItems.filter(item => item.id != itemId)
        };

      }else{
        this.toastr.error('Unable to add Item .. ' ,"Error" , {showCloseButton : true});
      }
    })

  }

}
