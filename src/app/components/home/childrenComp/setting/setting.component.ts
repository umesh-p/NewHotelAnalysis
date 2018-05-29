import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/childServices/login.service';
import { CategoryService } from '../../../../services/childServices/category.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {


  tableNumber: number;
  allCategories: any;
  newCategory: string;

  constructor(private loginService: LoginService , private categoryService: CategoryService , public toastr: ToastsManager) { }

  ngOnInit() {
    this.tableNumber = parseInt(sessionStorage.getItem('tableCount'));

    this.categoryService.getAll().subscribe((result) => {
      this.allCategories = result['data'];
    });

  }

  addTableCount(tableCount) {
    this.tableNumber = tableCount;

    this.loginService.put(tableCount).subscribe((result) => {
          sessionStorage.setItem('tableCount', tableCount.toString());
          this.toastr.success('Table Count Updated Successfully' , 'Success' , {showCloseButton : true});
    });

  }

  addNewFoodCategory(categoryInput) {

      const newCategory: object = {};

      newCategory['id'] = this.allCategories.length + 1;
      newCategory['name'] = categoryInput.value;

      this.categoryService.post(categoryInput.value).subscribe((result) => {

          this.allCategories.push(newCategory);
          this.toastr.success('New Food Category Added Successfully' , 'Success' , {showCloseButton : true});
      });

      categoryInput.value = '';
  }

}
