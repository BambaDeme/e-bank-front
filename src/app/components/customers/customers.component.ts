import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers$!: Observable<Customer[]>;
  //customers: any;
  errorMessage!: string;
  searchFormGroup! : FormGroup;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.searchFormGroup = this.formBuilder.group(
      {
        keyword: this.formBuilder.control("")
      }
    )

    this.customers$ = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(() => new Error(err));
      })
    );
    /*this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    })*/
  }

  handleSearchForm(){

    let searchKeyword = this.searchFormGroup.value.keyword;
    this.customers$ =  this.customerService.searchCustomers(searchKeyword).pipe(
      catchError(err => {
        this.errorMessage =  err.message;
        return throwError(() => new Error(err));
      })
    )

  }

  handleCreatedCustomer(){
    console.log("handling customer creation");
    this.customers$ = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(() => new Error(err));
      })
    );
  }

}
