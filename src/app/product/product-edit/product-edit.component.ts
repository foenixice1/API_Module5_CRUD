import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private activeRoute: ActivatedRoute,
              private route: Router,
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
    this.activeRoute.params.subscribe((data) => this.productForm.value.id = data.id);
    this.showEdit(this.productForm.value.id);

  }

  product!: Product;

  showEdit(id: any) {
    this.http.get<Product>(`http://localhost:8080/product/api/${id}`).subscribe((data) => {
      this.productForm.get('id')?.setValue(data.id);
      this.productForm.get('name')?.setValue(data.name);
      this.productForm.get('img')?.setValue(data.img);
      this.productForm.get('price')?.setValue(data.price);
      this.productForm.get('status')?.setValue(data.status);
    })
  }

  saveProduct() {
    this.http.post<Product>('http://localhost:8080/product/api', this.productForm.value).subscribe((data) => {
      alert("Edit thành công - " + data.name)
      this.route.navigate(["/product"])
    })
  }
}
