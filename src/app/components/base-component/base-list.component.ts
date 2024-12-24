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
  totalPages: number = 0;
  isCheckboxAll: boolean = false;
  // constructor(title: string, columns: { label: string; visibility: boolean }[], data: any[], pageSizeOptions: number[] = [5, 10, 20]) {
  //   this.title = title;
  //   this.columns = columns;
  //   this.dataSource = new MatTableDataSource(data);
  //   this.pageSizeOptions = pageSizeOptions;

  //   this.fillFilters();
  //   this.updateFilterPredicate();
  // }

  constructor(private changeDetectorRef: ChangeDetectorRef) { }
  
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
    this.columns.forEach(column => {
      this.filterValues[column.label] = '';
    });
  }

  updateFilterPredicate() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filters = JSON.parse(filter);
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

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;

    const currentPageData = sortedData.slice(startIndex, endIndex);
    const visibleIds = currentPageData.map(item => String(item.id));    
    return visibleIds;
  }

  toggleSelectAll(checked: boolean) {
    console.log("getCurrentRowIds(): "+ this.getCurrentRowIds())
    this.getCurrentRowIds().forEach((id: string) => {
      if (checked) {        
        this.selectedIds.add(id);
      } else {
        this.selectedIds.delete(id);
      }
    });
    console.log("toggleSelectAll: " + Array.from(this.selectedIds))
    //this.isCheckboxAll = !checked;
    //this.isCheckboxAll = this.allSelected(); // Verifica se todos os itens da página atual estão selecionados



    // if (!this.paginator) return;

    // const currentPageData = this.dataSource.filteredData.slice(
    //   this.paginator.pageIndex * this.paginator.pageSize,
    //   this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize
    // );
    // console.log("currentPageData: " + JSON.stringify(currentPageData))

    // currentPageData.forEach(item => {
    //   if (checked) {
    //     this.selectedIds.add(item.id);
    //   } else {
    //     this.selectedIds.delete(item.id);
    //   }
    // });




    // const querySelector = document.querySelectorAll('td.mat-column-id');
    // querySelector.forEach(item => {      
    //   let id: string = (item.textContent?.trim() || '');
    //   console.log("id: " + id)
    //   if (checked) {
    //     this.selectedIds.add(id);
    //   } else {
    //     this.selectedIds.delete(id);
    //   }
    // });
    // console.log("this.selectedIds: " + JSON.stringify(Array.from(this.selectedIds)));


    // const matCheckboxes = document.querySelectorAll('mat-checkbox.checkbox-item');

    // matCheckboxes.forEach(checkbox => {
    //   const input = checkbox.querySelector('input');
    //   if (input) {
        
    //      if (checked) {
    //        //this.selectedIds.add(item.id);
    //        input.checked = true;
    //      } else {
    //        //this.selectedIds.delete(item.id);
    //        input.checked = false;
    //      }
    //   }
    // });

    // // Se o paginator não estiver definido, saia da função
    // if (!this.paginator) return;

    // const checkboxes = document.querySelectorAll('mat-checkbox.checkbox-item'); // 'input[type="checkbox"]'  /  '.checkbox-item'
    // console.log("element: " + JSON.stringify(checkboxes.length));
    // checkboxes.forEach(item => {
    //   console.log("element: " + JSON.stringify(item));
    //   // if (checked) {
    //   //   this.selectedIds.add(item.id);
    //   // } else {
    //   //   this.selectedIds.delete(item.id);
    //   // }
    // });

    // this.dataSource.data.forEach(item => {
    //   console.log("item: "+  JSON.stringify(item))
    //   if (checked) {
    //     this.selectedIds.add(item.id);
    //   } else {
    //     this.selectedIds.delete(item.id); 
    //   }
    // });
  }

  toggleSelection(id: string) {
    console.log("toggleSelection")
    const idString = String(id); // TODO REMOVE
    if (this.selectedIds.has(idString)) {
      this.selectedIds.delete(idString);
    } else {
      this.selectedIds.add(idString);
    }

    //this.isAllCheckboxesChecked()
  }

  isSelected(id: string): boolean {    
    //console.log("isSelected: " + id + " | " + this.selectedIds.has(String(id)))
    return this.selectedIds.has(id.toString());
  }

  //isAllCheckboxesChecked
  isAllCheckboxesChecked(): boolean {
    // console.log("allSelected")
    // if (!this.paginator) return false;

    // const currentPageData = this.dataSource.filteredData.slice(
    //   this.paginator.pageIndex * this.paginator.pageSize,
    //   this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize
    // );
    // return currentPageData.every(item => this.selectedIds.has(item.id));

    console.log("isAllCheckboxesChecked: " + this.getCurrentRowIds().every(item => this.selectedIds.has(String(item))))
    console.log("this.getCurrentRowIds(): " + this.getCurrentRowIds())
    console.log("this.selectedIds: " + Array.from(this.selectedIds))

    return this.getCurrentRowIds().every(item => this.selectedIds.has(item));
  }


  getAllColumns(): string[] {
    return ['select', ...this.getVisibleColumns()];
  }

  logSelectedIds() {
    console.log("IDs selecionados:", Array.from(this.selectedIds));
  }





  applyFilterByColumn(event: Event, column: string) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterValues[column] = inputValue;

    // Aplica o filtro acumulativo
    this.dataSource.filter = JSON.stringify(this.filterValues); // Converte o objeto filterValues para string e aplica

    
    this.calculateTotalPages(); // Atualiza total de páginas e a página atual
    this.currentPage = 1; // Reseta para a primeira página após aplicar o filtro

    //this.isCheckboxAll = this.allSelected(); // Verifica se todos os itens da nova página estão selecionados
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;

      this.calculateTotalPages(); // Chama aqui para garantir que o paginator está definido
      this.changeDetectorRef.detectChanges(); // Notifica mudanças
    }
    if (this.sort) {
      this.dataSource.sort = this.sort; // Atribuindo o MatSort à dataSource

      // Adicione um listener para o evento de alteração de ordenação
      this.sort.sortChange.subscribe(() => {
        this.onSortChange();
      });
    }
    
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; // Ajusta para exibição user-friendly
    this.calculateTotalPages();

    //this.isCheckboxAll = this.allSelected(); // Verifica se todos os itens da página atual estão selecionados
  }

  onSortChange() {
    // Atualize o estado do checkbox "Selecionar Todos"
    console.log("before onSortChange: " + this.isCheckboxAll)
    //this.isCheckboxAll = this.allSelected(); // Verifica se todos os itens visíveis estão selecionados
    console.log("after onSortChange: " + this.isCheckboxAll)    
  }

  calculateTotalPages() {
    if (this.paginator) {
    //  this.totalPages = Math.ceil(this.dataSource.data.length / this.paginator.pageSize);    
      this.totalPages = Math.ceil(this.dataSource.filteredData.length / this.paginator.pageSize);  
    }
  }
}
