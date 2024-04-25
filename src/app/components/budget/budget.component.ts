import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table';
import { DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


interface BudgetGroup {
  name: string;
  expanded: boolean;
  allowDrag?: boolean; // Optional for future drag-and-drop functionality
  items: BudgetItem[];
}

interface BudgetItem { 
  name: string;
  plannedAmount: string;
  spentAmount: number;
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
  dataSource: BudgetItem[] = [];
  displayedColumns: string[] = ['delete','name', 'planned', 'spent'];
  constructor(){};

  ngOnInit(){
      this.budgetGroups.push({name: 'Income', expanded: false, allowDrag:false, items: []});
      this.budgetGroups.push({name: 'Debt', expanded: false, allowDrag:true, items: []});
  }

  addGroup(){
    this.budgetGroups.push({name: '', expanded: false, allowDrag: true, items: []});
  }

  removeGroup(groupIndex: number){
    this.budgetGroups.splice(groupIndex, 1);
  }

  addItem(groupIndex: number){
    this.budgetGroups[groupIndex].items = [
      ...this.budgetGroups[groupIndex].items,
      {name: 'New Item', plannedAmount: '', spentAmount: 0.00}
    ]
  }

  removeItem(groupIdx: number, itemIdx: number){
    const newItems = [...this.budgetGroups[groupIdx].items];
    newItems.splice(itemIdx, 1);
    this.budgetGroups[groupIdx].items = newItems;
  }

  dropGroup(event: CdkDragDrop<string[]>){
    moveItemInArray(
      this.budgetGroups,
      event.previousIndex,
      event.currentIndex
    );
  }
}
