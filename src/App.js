import React, { Component } from 'react';

import { Switch, Route, withRouter } from "react-router-dom";

// pages
import NoMatch from './pages/NoMatch'
import Menu from './pages/Menu'
import About from './pages/About'
import MathGame from './pages/MathGame'
import Config from './pages/Config';

// components
import Footer from './components/Footer'

// css
import './App.css';

import LogoIcon from './icons/LogoIcon';
import IconArrowBack from './icons/IconArrowBack';
import IconInfo from './icons/IconInfo';
import IconSettings from './icons/IconSettings';
import IconSave from './icons/IconSave';

class App extends Component {

  config = {};

  constructor(props) {
    super(props);
    this.state = {
      location: props.location.pathname || '/'
    }
    //  defaults
    this.config = {
      general: {
        questionCount: 10,
        from: 0,
        to: 10
      }
    };
    // 
    this.handleConfigSave = this.handleConfigSave.bind(this);
    this.handleNavigationAction = this.handleNavigationAction.bind(this);
  }


  getConfig(game) {
    let config = Object.assign({}, this.config.general);
    console.log('getConfig', game, config);
    switch (game) {
      case ':subtraction':
      
      break;
      
      case ':addition':
      default:
        break;
    }
    return config;
  }

  getTitleFragment() {

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

  getRightIconSlotFragment() {
    const { location } = this.state;
    if (location === '/') {
      return [
        <button key={'about-btn'} className='button-about' onClick={() => { this.handleNavigationAction('about') }}><IconInfo /></button>,
        <button key={'settings-btn'} className='button-settings' onClick={() => { this.handleNavigationAction('config') }}><IconSettings /></button>
      ];
    } else if (location === '/config') {
      return <button key={'save-btn'} className='button-settings-save' onClick={() => { this.handleConfigSave(); }}><IconSave /></button>

    }
    return null;
  }
  handleConfigSave() {
    let config = this.configView.getSettings();
    console.log('handleConfigSave', config);
    this.config = config;
    this.handleNavigationAction();
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
          {this.getTitleFragment()}
          <div className='leftIconSlot'>
            {this.state.location !== '/' ? <button onClick={() => { this.handleNavigationAction() }}>
              <IconArrowBack /></button> : <LogoIcon />}
          </div>

          <div className='rightIconSlot'>
            {
              this.getRightIconSlotFragment()
            }
          </div>
        </header>
        <section className='content'>
          <Switch>
            <Route exact path='/' component={() => <Menu onAction={this.handleNavigationAction} />} />

            <Route path='/game:type' component={(p) => <MathGame {...p.match.params}
              {...this.getConfig(p.match.params.type)}
              onAction={this.handleNavigationAction} />} />

            <Route path='/config' component={(p) => <Config ref={(ref) => this.configView = ref} {...this.config} />} />
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
