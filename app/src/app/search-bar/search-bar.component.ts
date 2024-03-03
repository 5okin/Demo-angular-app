import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  
  @Output() searchEvent = new EventEmitter<string>();

  onSubmit(searchQuery: string='') {
    console.log('From searchbar:', searchQuery);
    this.searchEvent.emit(searchQuery);
    // Here you can handle the search functionality, e.g., make an API call with the search query
  }
}
