import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { TITLE } from '../contants';
import {app} from './app.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
  title = TITLE;
  jokes = [];
  jokesSelected = [];
  interval: any;

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    const localStorageValue = localStorage.getItem('jokes');
    const parsedValue = (localStorageValue !=='') ? JSON.parse(localStorageValue) : '';
    if(parsedValue !== '') this.jokesSelected = parsedValue;
    this.appService.getChuckJokes().subscribe(response => {
      if (response._body) {
        var json = JSON.parse(response._body);
        this.jokes = json.value;
      }
    });
  }
   
  ngOnDestroy(){
   
  }

  @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander() {
      if(this.jokesSelected.length >0){
        localStorage.setItem('jokes', JSON.stringify(this.jokesSelected));
      } else {
        localStorage.setItem('jokes', '');
      }
    }

  checkBoxClick(value: string) {
    let index = this.jokesSelected.indexOf(value);
    if (index === -1) {
      this.jokesSelected.push(value);
    }
  }

  removeFromFavorites(value: string) {
    let index = this.jokesSelected.indexOf(value);
    this.jokesSelected.splice(index, 1);
  }

  autoPopulateFavorites() {
    this.jokesSelected = [];
    this.jokes.forEach(f => {
      this.jokesSelected.push(f.joke);
    })

  }

  removePopulateFavorites() {
    this.jokesSelected = [];
  }

  timeAddFavorites() {
    this.interval = setInterval(() => {
      this.jokes.forEach(f => {
        let index = this.jokesSelected.indexOf(f.joke);
        if (index === -1) {
          this.jokesSelected.push(f.joke);
        }
      });
      if(this.jokesSelected.length === 10){
          clearInterval(this.interval);
      }
    }, 5000)
  }

  stopAutoPopulate(){
    clearInterval(this.interval);
  }
}
