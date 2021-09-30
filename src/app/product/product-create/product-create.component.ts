import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      img: new FormControl(''),
      price: new FormControl(0),
      status: new FormControl(true),
    })
  }

  createProduct() {
    this.http.post<Product>('http://localhost:8080/product/api', this.productForm.value).subscribe((data) => {
      alert("create thành công - " + data.name)
      this.router.navigate(["/product"])
    })
  }

}
