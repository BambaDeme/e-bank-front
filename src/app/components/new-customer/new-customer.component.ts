import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
[x: string]: any;

  closeResult = '';

  newCustomerForm!: FormGroup;

	constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {}


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
  }
  

}
