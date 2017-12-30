/*
   Copyright 2018 Łukasz 'Severiaan' Grela GrelaDesign

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
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
  stats = {
    division: 0,
    addition: 0,
    multiplication: 0,
    subtraction: 0
  }

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
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
    this.handleNavigationAction = this.handleNavigationAction.bind(this);
  }

  /**
   * Returns configuration for the game.
   * @param {string} game Id of the game for which config needs to be prepared
   */
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

  /**
   * Returns title fragment (JSX element) used in header based on location
   * @returns {JSX.Element|null} JSX fragment
   */
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
  /**
   * Returns content of left icon slot in header
   * @returns {JSX.Element|null} JSX fragment
   */
  getLeftIconSlotFragment() {
    const { location } = this.state;
    if (location !== '/') {
      return <button onClick={() => { this.handleNavigationAction() }}>
        <IconArrowBack /></button>

    } else {
      return <LogoIcon />
    }
  }
  /**
   * Returns content of right icon slot in header
   * @returns {JSX.Element|null} JSX fragment
   */
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

  /**
   * Updates score stats
   * @param {number} score Points collected
   * @param {string} id Id of the game 
   */
  handleScoreUpdate(score, id) {

    switch (id) {
      case ':subtraction':
        this.stats.subtraction += score;
        break;

      case ':multiplication':
        this.stats.multiplication += score;
        break;

      case ':division':
        this.stats.division += score;
        break;

      case ':addition':
      default:
        this.stats.addition += score;
        break;

    }
  }

  /**
   * Click handler for button-settings-save, get's config object from config view and navigates to menu.
   */
  handleConfigSave() {
    let config = this.configView.getSettings();
    console.log('handleConfigSave', config);
    this.config = config;
    this.handleNavigationAction();
  }

  /**
   * Handles navigation requests, updates state
   * @param {string} action Navigation ID
   */
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
            {
              this.getLeftIconSlotFragment()
            }
          </div>

          <div className='rightIconSlot'>
            {
              this.getRightIconSlotFragment()
            }
          </div>
        </header>
        <section className='content'>
          <Switch>
            <Route exact path='/' component={() => <Menu
              onAction={this.handleNavigationAction}
              stats={this.stats} />} />

            <Route path='/game:type' component={(p) => <MathGame {...p.match.params}
              {...this.getConfig(p.match.params.type) }
              onScore={this.handleScoreUpdate}
              onAction={(userAnswer) => {
                this.handleNavigationAction()
              }
              } />}
            />

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
