import React, { Component } from 'react';

import { Switch, Route, withRouter } from "react-router-dom";

// pages
import NoMatch from './pages/NoMatch'
import Menu from './pages/Menu'
import About from './pages/About'
import MathGame from './pages/MathGame'

// components
import Footer from './components/Footer'

// css
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: props.location.pathname || '/',
      gameName: ''
    }

    console.log('App', props.location);
    this.handleMenuAction = this.handleMenuAction.bind(this);
  }

  handleMenuAction(action) {
    console.log("App", action);
    let to = '/',
      gameName = '';
    switch (action) {
      case 'plus':
        to = '/game:addition';
        gameName = 'Addition';
        break;
      case 'minus':
        to = '/game:subtraction'
        gameName = 'Subtraction';
        break;
      case 'multiply':
        gameName = 'Multiplication';
        break;
      case 'divide':
        gameName = 'Division';

        break;

      default:
        to = '/';
        break;
    }
    this.props.history.push(to);
    this.setState({ location: to, gameName })
  }

  render() {
    return (
      <div className="App">
        <header className={"App-header" + (this.state.location !== '/' ? " in-page" : "")}>
          <h1 className="App-title">Little Mathematician</h1>
          {this.state.gameName !== '' ? <h3>{this.state.gameName}</h3> : null}
          <img src='./assets/little-mathematician-logo.svg' />
          {this.state.location !== '/' ? <button onClick={() => { this.handleMenuAction() }}>Back</button> : null}
        </header>
        <section>
          <Switch>
            <Route exact path='/' component={() => <Menu onAction={this.handleMenuAction} />} />

            <Route path='/game:type' component={(p) => <MathGame {...p.match.params} onAction={this.handleMenuAction} />} />

            <Route path='/about' component={About} />
            <Route component={NoMatch} />
          </Switch>
        </section>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
