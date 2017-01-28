'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './chat.routes';

export class ChatComponent {
  chats = [];
  newChat = '';


  /*@ngInject*/
  constructor($http,$scope,socket,User) {
    this.$http = $http;
    this.socket = socket;
    this.User = User.get();

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('chat');
    });
  }

  $onInit() {
      this.$http.get('/api/chats')
        .then(response => {
          console.log('got the chats data');
          this.chats = response.data;
          this.socket.syncUpdates('chat', this.chats);
        });
      // this.chats = [{"_id":"588b963e32d86075c236ca82","name":"Sani","message":"Test from robomongo","active":true},{"_id":"588c3295d2aece673e0157fa","name":"Khursani","message":"ada","__v":0},{"_id":"588c3baed2aece673e0157fe","name":"Khursani","message":"lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum","__v":0},{"_id":"588c7540d2aece673e015800","name":"user1","message":"hai waawaawdawda","__v":0}]
      // this.socket.syncUpdates('chat', this.chats);
  
}

    addChat() {
      console.log('Add chat :',this.name);
    if(this.newChat) {
      this.$http.post('/api/chats', {
        name: this.User.name,
        message: this.newChat
      });
      this.newChat = '';
    }
  }

  deleteChat(chat) {
    this.$http.delete(`/api/chats/${chat._id}`);
  }

}

export default angular.module('trainingApp.chat', [uiRouter])
  .config(routes)
  .component('chat', {
    template: require('./chat.html'),
    controller: ChatComponent,
    controllerAs: 'chatCtrl'
  })
  .name;
