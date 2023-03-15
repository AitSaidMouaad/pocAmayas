import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Navigate, RouterDataResolved, RouterState } from '@ngxs/router-plugin';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BuyerCreateInput, BuyerModel } from '../graphql/graphql';
import { SelectedBuyer, CreateBuyer, EditBuyer } from './buyer.dto';
import { BuyerState } from './buyer.state';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  buyerForm!: FormGroup;
  id?: number

  @Select(BuyerState.selectedBuyer) selectedBuyer$!: Observable<BuyerModel>;

  constructor(private formBuilder: FormBuilder, private store: Store,) {
    this.buyerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['']
    });
    this.store.select(RouterState).subscribe(({ state }) => {
      this.id = state.root.queryParams.id
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    if (this.id) {
      this.store.dispatch(new SelectedBuyer(this.id.toString()));
      this.selectedBuyer$.subscribe((buyer) => {
        if (buyer?.id) {
          const { firstName, lastName, country }= buyer;
          this.buyerForm = this.formBuilder.group({
            firstName: [firstName, Validators.required],
            lastName: [lastName, Validators.required],
            country: [country]
          });
        }

      })
    }
  }

  onSubmit() {
    const { firstName, lastName, country }: BuyerCreateInput = this.buyerForm.value;
    this.store.dispatch([!(this.id && country)? new CreateBuyer({ firstName, lastName, country }): new EditBuyer({ firstName, lastName, country, id: `${this.id}` },), new Navigate(['/buyers'])]);
  }

}