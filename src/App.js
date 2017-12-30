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
import Config from './pages/Config';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: props.location.pathname || '/'
    }

    this.handleMenuAction = this.handleNavigationAction.bind(this);
  }


  getTitle() {
    
    const { pathname } = this.props.location;
    let title = '';
    
    switch (pathname) {
      case '/game:addition':
      title = 'Addition';
      break;
      
      case '/game:subtraction':
      title = 'Subtraction';
      break;
      
      case '/game:multiplication':
      title = 'Multiplication';
      break;
      
      case '/game:division':
      title = 'Division';
      break;
      
      case '/config':
      title = 'Config';
      break;
      
      case '/about':
      title = 'About';
      break;
      
      case '/':
      default:
      title = '';
      break;
    }
    
    console.log('getTitle', pathname, title);

    if (title !== '')
      return <h3>{title}</h3>
    else return null;



  }

  handleNavigationAction(action) {
    console.log("App", action);
    let to = '/';
    switch (action) {
      case 'plus':
        to = '/game:addition';
        break;
      case 'minus':
        to = '/game:subtraction';
        break;
      case 'multiply':
        to = '/game:multiplication';
        break;
      case 'divide':
        to = '/game:division';

        break;

      case 'about':
        to = '/about';
        break;
      case 'config':
        to = '/config'
        break;

      default:
        to = '/';
        break;
    }
    this.props.history.push(to);
    this.setState({ location: to })
  }

  render() {
    return (
      <div className="App">
        <header className={"App-header" + (this.state.location !== '/' ? " in-page" : "")}>
          <h1 className="App-title">Little Mathematician</h1>
          {this.getTitle()}
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

            <Route path='/config' component={(p) => <Config />} />
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
