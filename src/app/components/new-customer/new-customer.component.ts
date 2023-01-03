import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
[x: string]: any;

  closeResult = '';

  newCustomerForm!: FormGroup;

  @Output() customerCreated = new EventEmitter<Customer>(); 

  

	constructor(private modalService: NgbModal, private formBuilder: FormBuilder,private customerService: CustomerService) {}


  ngOnInit(): void {
    this.newCustomerForm = this.formBuilder.group({
      name: this.formBuilder.control(""),
      email: this.formBuilder.control("")
    })
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
	}

  handleSaveCustomer(){
    console.log(this.newCustomerForm.value)
    let customer: Customer = this.newCustomerForm.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: data => {
        alert(`Customer "${data.name}" has been saved successfully`)
        this.customerCreated.emit(data);
      },
      error: err => {
        return throwError(()=> new Error(err.message))
      }

    })
  }
  

}
