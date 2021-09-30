import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {
  products: Product[] = [];
  productForm!: FormGroup;


  constructor(private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.getAllApi();
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      img: new FormControl(''),
      price: new FormControl(0),
      status: new FormControl(true),
    })
  }

  getAllApi() {
    this.http.get<Product[]>('http://localhost:8080/product/api').subscribe((data) => {
      this.products = data;
    })
  }

  deleteProduct(id: any) {
    this.http.delete(`http://localhost:8080/product/api/${id}`).subscribe((data) => {
      alert("Xóa thành công");
      this.getAllApi();
    })
  }
}
