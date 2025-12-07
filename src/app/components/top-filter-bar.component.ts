import { Component, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-top-filter-bar',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  template: `
    <mat-tab-group [(selectedIndex)]="selectedTabIndex" (selectedIndexChange)="onSelectedTabChange()">
      <mat-tab label="Any Trip"></mat-tab>
      <mat-tab label="Wilderness"></mat-tab>
      <mat-tab label="Spring Break"></mat-tab>
      <mat-tab label="Study Abroad"></mat-tab>
      <mat-tab label="Student Led"></mat-tab>
    </mat-tab-group>
  `,
  styles: [`
    .active-tags {
      margin-top: 8px;
      font-size: 14px;
      font-weight: 500;
    }
  `]
})
export class TopFilterBarComponent {
  selectedFilter = output<string>();
  selectedTabIndex = 0;
  tabLabels = ['any', 'wilderness', 'Spring Break', 'Study Abroad', 'Student Led'];
  onSelectedTabChange = () => {
    this.selectedFilter.emit(this.tabLabels[this.selectedTabIndex]);
  }
    ngOnInit() {
    this.onSelectedTabChange();
  }
}
