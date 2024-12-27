import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    FormsModule,
    MatSortModule,
    MatIconModule,
  ]
})
export class BaseListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  title!: string;
  columns!: { label: string; visibility: boolean; }[];
  dataSource!: MatTableDataSource<any>;
  selectedIds: Set<string> = new Set<string>();
  pageSizeOptions!: number[];
  filterValues: { [key: string]: string } = {};
  currentPage: number = 1;
  currentPageIndex: number = this.currentPage - 1;
  totalPages: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  // TODO ADD data variavel

  isCheckboxAll: boolean = false;
  isLoading: boolean = true;
  protected changeDetectorRef: ChangeDetectorRef;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }

  // constructor(private changeDetectorRef: ChangeDetectorRef) { }

  setup(
    title: string,
    columns: { label: string; visibility: boolean }[],
    data: any[],
    pageSizeOptions: number[] = [5, 10, 20]
  ) {
    this.title = title;
    this.columns = columns;
    this.dataSource = new MatTableDataSource(data);
    this.pageSizeOptions = pageSizeOptions;

    this.fillFilters();
    this.updateFilterPredicate();

    this.calculateTotalPages();
  }

  fillFilters() {
    // this.columns.forEach(column => {
    //   this.filterValues[column.label] = '';
    // });
  }

  updateFilterPredicate() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filters = JSON.parse(filter);
      console.log(filters)
      return Object.keys(filters).every(key => {
        return data[key].toString().toLowerCase().includes(filters[key].toLowerCase());
      });
    };
  }

  toggleColumn(columnLabel: string) { // TODO change name toggleColumnVisibility
    const column = this.columns.find(c => c.label === columnLabel);
    if (column) {
      column.visibility = !column.visibility;
    }
  }

  getVisibleColumns(): string[] {
    return this.columns.filter(column => column.visibility).map(column => column.label);
  }

  getCurrentRowIds(): string[] {
    if (!this.paginator || !this.sort) return [];

    const sortedData = this.dataSource.sortData(this.dataSource.filteredData, this.sort);
    return sortedData.map(item => String(item.id));
  }

  toggleSelectAll(checked: boolean) {
    this.getCurrentRowIds().forEach((id: string) => {
      if (checked) {
        this.selectedIds.add(id);
      } else {
        this.selectedIds.delete(id);
      }
    });
  }

  toggleSelection(id: string) {
    const idString = String(id); // TODO REMOVE
    if (this.selectedIds.has(idString)) {
      this.selectedIds.delete(idString);
    } else {
      this.selectedIds.add(idString);
    }
    //this.isAllCheckboxesChecked()
  }

  isSelected(id: string): boolean {
    return this.selectedIds.has(id.toString());
  }

  isAllCheckboxesChecked(): boolean {
    return this.getCurrentRowIds().every(item => this.selectedIds.has(item));
  }

  getAllColumns(): string[] {
    return ['select', ...this.getVisibleColumns(), 'actions'];
  }

  applyFilterByColumn(event: Event, column: string) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterValues[column] = inputValue;

    this.dataSource.filter = JSON.stringify(this.filterValues); // Converte o objeto filterValues para string e aplica

    this.calculateTotalPages(); // Atualiza total de páginas e a página atual
    this.currentPage = 1; // Reseta para a primeira página após aplicar o filtro

    this.calculateTotalPages();
    this.loadData(0, this.pageSize, this.filterValues);
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;

      this.calculateTotalPages();
      this.changeDetectorRef.detectChanges(); // Notifica mudanças
    }
    if (this.sort) {
      this.dataSource.sort = this.sort; // Atribuindo o MatSort à dataSource

      // Adicionando um listener para o evento de alteração de ordenação
      this.sort.sortChange.subscribe(() => {
        this.onSortChange();
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; // Ajusta para exibição user-friendly
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.calculateTotalPages();
    this.loadData(event.pageIndex, this.pageSize);
  }

  onSortChange() {
    // Atualize o estado do checkbox "Selecionar Todos"
    console.log("before onSortChange: " + this.isCheckboxAll)
    //this.isCheckboxAll = this.allSelected(); // Verifica se todos os itens visíveis estão selecionados
    console.log("after onSortChange: " + this.isCheckboxAll)
  }

  calculateTotalPages() {
    if (this.paginator) {
      this.totalElements = this.dataSource.filteredData.length;
      this.totalPages = Math.ceil(this.totalElements / this.paginator.pageSize);
    }
  }

  onInputPageChange() {
    if (this.paginator && this.sort) {
      this.paginator.pageIndex = this.currentPage - 1;
      this.loadData(this.paginator.pageIndex, this.pageSize);
    }
  }

  viewDetails(element: any) {
    console.log('Visualizando detalhes do item:', element);
  }

  editItem(element: any) {
    console.log('Editando item:', element);
  }

  deleteItem(id: string) {
    console.log('Excluindo item com id:', id);
  }

  loadData(currentPageIndex: number, pageSize: number, filters: { [key: string]: string } = {}) { }

  deleteItems() {
    if (this.selectedIds.size === 0) {
      console.log("Nenhum item selecionado para exclusão.");
      return;
    }

    const itemsToDelete = Array.from(this.selectedIds);
    console.log("Deleting items with ids: ", itemsToDelete);
  }

  clearSelection() {
    this.selectedIds.clear();
  }

  clearFilters() {
    this.filterValues = {};
    this.dataSource.filter = '';
    this.calculateTotalPages();
    this.currentPage = 1;
    this.currentPageIndex = 0;
    this.loadData(this.currentPageIndex, this.pageSize, this.filterValues);
  }
}
