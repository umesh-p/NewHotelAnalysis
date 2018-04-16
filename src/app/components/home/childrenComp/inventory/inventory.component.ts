import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../services/childServices/inventory.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  private inventoryArray = [];

  constructor(private inventoryService : InventoryService) { }




  ngOnInit() {

    //console.log(this.inventoryService.getAll().subscribe(result => console.log(result)))

    // let newItem =  {
    //   "id":5,
    //   "itemname": "Rock Salt"
    // }
    //
    // console.log(this.inventoryService.put(newItem).subscribe(result => console.log(result)))


    //console.log(this.inventoryService.delete(4).subscribe(result => console.log(result)))


  }

}
