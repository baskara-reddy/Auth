import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, CardSection, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
   if (!firebase.apps.length) { 
    firebase.initializeApp({
      apiKey: "AIzaSyBBGQrJthZ7kpVdC4iAuhZjmG9CYSj4aLo",
      authDomain: "auth-9c8d4.firebaseapp.com",
      databaseURL: "https://auth-9c8d4.firebaseio.com",
      projectId: "auth-9c8d4",
      storageBucket: "auth-9c8d4.appspot.com",
      messagingSenderId: "756917719451"
    });
  }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
   
  }


renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
             <Button onPress={() => firebase.auth().signOut()}>
               Sign Out
             </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  } 
}
export default App;