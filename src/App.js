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

import LogoIcon from './icons/LogoIcon';
import IconArrowBack from './icons/IconArrowBack';
import IconInfo from './icons/IconInfo';
import IconSettings from './icons/IconSettings';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: props.location.pathname || '/',
      gameName: ''
    }

    console.log('App', props.location);
    this.handleMenuAction = this.handleNavigationAction.bind(this);
  }

  handleNavigationAction(action) {
    console.log("App", action);
    let to = '/',
      gameName = '';
    switch (action) {
      case 'plus':
        to = '/game:addition';
        gameName = 'Addition';
        break;
      case 'minus':
        to = '/game:subtraction';
        gameName = 'Subtraction';
        break;
      case 'multiply':
        to = '/game:multiplication';
        gameName = 'Multiplication';
        break;
      case 'divide':
        to = '/game:division';
        gameName = 'Division';

        break;


      case 'about':
        gameName = 'About';
        to = '/about';
        break;
      case 'config':
        gameName = 'Config';
        to = '/config'
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
          {/*<img src='./assets/little-mathematician-logo.svg' />*/}
          <div className='leftIconSlot'>
            {this.state.location !== '/' ? <button onClick={() => { this.handleNavigationAction() }}>
              <IconArrowBack /></button> : <LogoIcon />}
          </div>
          {this.state.location === '/' ?
            <div className='rightIconSlot'>
              <button className='button-about' onClick={() => { this.handleNavigationAction('about') }}><IconInfo /></button>
              <button className='button-settings' onClick={() => { this.handleNavigationAction('config') }}><IconSettings /></button>
            </div>
            : null
          }
        </header>
        <section className='content'>
          <Switch>
            <Route exact path='/' component={() => <Menu onAction={this.handleNavigationAction} />} />

            <Route path='/game:type' component={(p) => <MathGame {...p.match.params}
              from={10} to={20} questionCount={25}
              onAction={this.handleNavigationAction} />} />

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
