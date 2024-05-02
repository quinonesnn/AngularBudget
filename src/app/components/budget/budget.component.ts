import { Component, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table';
import { DragDropModule, CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray} from '@angular/cdk/drag-drop';


interface BudgetGroup {
  name: string;
  expanded: boolean;
  allowDrag?: boolean;
  items: BudgetItem[];
}

interface BudgetItem { 
  name: string;
  plannedAmount: string;
  spentAmount: number;
  selected: boolean;
  highlighted?: boolean;
  transactionList: []
}

interface Transaction {
  name: string;
  amount: number;
  date: string;
  account: string;
}


@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent implements OnInit {
  
  budgetGroups: BudgetGroup[] = [];
  transactions: Transaction[] = [];
  dataSource: BudgetItem[] = [];
  displayedColumns: string[] = ['delete','name', 'planned', 'spent']; // Represents the columns inside the mat-table for the BudgetItem[]
  constructor(){};

  ngOnInit(){
      this.budgetGroups.push({name: 'Income', expanded: false, allowDrag:false, items: []});
      this.budgetGroups.push({name: 'Debt', expanded: false, items: []});
      this.transactions.push({name: 'Burgers', amount: 12.99, date: '04/29/2024', account: 'Chase Credit Card'},
                             {name: 'Movies', amount: 10.99, date: '04/27/20234', account: 'King Account *1234'}
      );        
  }

  // Adds a new BudgetGroup 
  addGroup(){
    this.budgetGroups.push({name: 'Untitled Group', expanded: false, allowDrag: true, items: []});
  }

  // Removes a BudgetGroup
  removeGroup(groupIndex: number){
    this.budgetGroups.splice(groupIndex, 1);
  }

  // Adds a new untitled BudgetItem to the list in the current BudgetGroup
  addItem(groupIndex: number){
    this.budgetGroups[groupIndex].items = [
      ...this.budgetGroups[groupIndex].items,
      {name: 'Untitled Item', plannedAmount: '', spentAmount: 0.00, selected: false, transactionList: []}
    ]
    this.dataSource = this.budgetGroups[groupIndex].items;
  }

  // Removes the selected BudgetItem from the list in the current BudgetGroup
  removeItem(groupIdx: number, itemIdx: number){
    const newItems = [...this.budgetGroups[groupIdx].items];
    newItems.splice(itemIdx, 1);
    this.budgetGroups[groupIdx].items = newItems;
  }

  // Handles drop event of a BudgetGroup and updates the position in the BudgetGroup array
  dropGroup(event: CdkDragDrop<BudgetGroup[]>){
    moveItemInArray(
      this.budgetGroups,
      event.previousIndex,
      event.currentIndex
    );
  }

  // Handles drop event of a BudgetItem inside the current BudgetGroup and updates the position in the BudgetItem array
  dropItem(groupIdx: number, event: CdkDragDrop<BudgetItem[]>){
    const movedItems = [...this.budgetGroups[groupIdx].items];
    moveItemInArray(
      movedItems,
      event.previousIndex,
      event.currentIndex
    ); 
    this.budgetGroups[groupIdx].items = movedItems;
    this.dataSource = this.budgetGroups[groupIdx].items;
  }

  // Flips the BudgetItem's 'selected' property = true when clicked
  selectItem(groupIdx: number, rowIndex: number){
    this.budgetGroups[groupIdx].items.forEach(item => item.selected = false);
    this.budgetGroups[groupIdx].items[rowIndex].selected = true;
  }

  // Handles the drop event for a Transaction by adding the transaction to the BudgetItem's
  // transactionList array and increments the transactions amount to the BudgetItem's 'spentAmount' property
  onTransactionDrop(event: CdkDragDrop<Transaction[]>){
    console.log(event);
    if (event.previousContainer === event.container) {
      
      return;
    }

    const transaction = event.previousContainer.data[event.previousIndex];
    console.log(transaction)
    //this.budgetGroups[groupIdx].items[itemIdx].spentAmount += transaction.amount;
    //this.budgetGroups[groupIdx].items[itemIdx].highlighted = false;

  }

  // Flips the BudgetItem's 'highlighted' property = true when a Transaction is hovers over
  onDragEnter(event: CdkDragEnter<Transaction[]>, groupIdx: number, itemIdx: number){
    this.budgetGroups[groupIdx].items[itemIdx].highlighted = true;
  }

  // Flips the BudgetItem's 'highlighted' property = false when a Transaction is leaves the BudgetItem while hovering
  onDragLeave(event: CdkDragExit<Transaction[]>, groupIdx: number, itemIdx: number){
    this.budgetGroups[groupIdx].items[itemIdx].highlighted = false;
  }


}
