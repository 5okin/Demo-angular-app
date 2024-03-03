import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import dotenv from 'dotenv'
import path from 'path';

import { environment } from '../../environments/environment.development';

@Component({
  selector: 'DataComponent',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  landmarks: any[] = [];
  error: string;
  modalOpen = false;              // Image modal
  lmodalOpen = false;             // Full info modal
  selectedImageUrl = '';
  selectedImageUrlCaption = '';
  curr_landmark: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.makeHttpRequest();
  }

  makeHttpRequest(query: string = '') {
    let url = environment.SERVER_URL + '/classes/Landmark';
    let query_string: string = '';
    const headers = new HttpHeaders()
      .set('X-Parse-Application-Id', environment.APP_ID)
      .set('X-Parse-Master-Key', environment.MASTER_KEY);

      if (query){
        query_string = `/?where={"title":{"$regex":"(?i)${query}"}}`;
      }

      this.http.get<any>(url+query_string, { headers })
      
      .subscribe(
        (data) => {
          if (data.results) {
            this.landmarks = this.orderByOrderField(data.results);
            console.log('Response:', this.landmarks);
          } else {
            console.error('Invalid response:', data);
          }
        },
        (error) => {
          this.error = error;
          console.error('Error occurred:', this.error);
        }
      );
  }

  orderByOrderField(data: any[]): any[] {
    return data.sort((a, b) => a.order - b.order);
  }

  openModal(url: string, title: string) {
    this.selectedImageUrl = url;
    this.selectedImageUrlCaption = title;
    this.modalOpen = true;
  }

  // Close all the modals
  closeModal() {
    this.modalOpen = false;
    this.lmodalOpen = false;
  }

  openLandmarkModal(index: number){
    this.lmodalOpen = true;
    this.curr_landmark = this.landmarks[index];
    
  }

  onSearch(query: string) {
    this.makeHttpRequest(query);
  }
}
