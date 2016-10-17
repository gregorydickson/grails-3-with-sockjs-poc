import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'Github Users';
  users = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
  }

  activate() {
    var socket = new SockJS("/stomp");
    var client = Stomp.over(socket);
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => this.users = users);
  }
}
