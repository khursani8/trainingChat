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
