import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalItems: number | null = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() pageSize: number = 1;
  pages: number[] = [];
  totalPages = 0;
  constructor() { }

  ngOnInit(): void {
    this.totalPages = this.totalItems && (this.totalItems % this.pageSize === 0 ? Math.floor(this.totalItems / this.pageSize) : Math.floor(this.totalItems / this.pageSize) + 1) || 0;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }
}
