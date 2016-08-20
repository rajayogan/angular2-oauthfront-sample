import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-books',
  templateUrl: 'books.component.html',
  styleUrls: ['books.component.css']
})
export class BooksComponent implements OnInit {
  book = {
    name: '',
    type: '',
    quantity: ''
  };
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  
  addbook(newbook) {
    let bookresult = this.auth.addbook(newbook);
      bookresult.then(() => {
        console.log('Book added');
      })
  }

}
