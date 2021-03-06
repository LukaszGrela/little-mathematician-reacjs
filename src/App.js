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

import MediaQuery from 'react-responsive';

// css
import './App.scss';
import './DropDown.scss';

import LogoIcon from './icons/LogoIcon';
import IconArrowBack from './icons/IconArrowBack';
import IconInfo from './icons/IconInfo';
import IconSettings from './icons/IconSettings';

import { GAME_ADDITION, GAME_SUBTRACTION, GAME_MULTIPLICATION, GAME_DIVISION } from './gameTypes';
import { IconMore } from './icons/IconMore';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      location: props.location.pathname || '/',
      ddMenuOpen: false
    }
    // 
    this.handleNavigationAction = this.handleNavigationAction.bind(this);
  }


  /**
   * Returns title fragment (JSX element) used in header based on location
   * @returns {JSX.Element|null} JSX fragment
   */
  getTitleFragment() {

    const { pathname } = this.props.location;
    let title = '';

    switch (pathname) {
      case '/game' + GAME_ADDITION:
        title = 'Addition';
        break;

      case '/game' + GAME_SUBTRACTION:
        title = 'Subtraction';
        break;

      case '/game' + GAME_MULTIPLICATION:
        title = 'Multiplication';
        break;

      case '/game' + GAME_DIVISION:
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
        <MediaQuery minDeviceWidth={410} key={'media-query'}>
          {(matches) => {
            if (matches) {
              return [
                <button key={'about-btn'} className='button-about' onClick={() => { this.handleNavigationAction('about') }}><IconInfo /></button>,
                <button key={'settings-btn'} className='button-settings' onClick={() => { this.handleNavigationAction('config') }}><IconSettings /></button>
              ]
            } else {
              return [
                <button key={'dd-menu-btn'} className='dd-button-menu' onClick={() => { this.handleDropDown() }}><IconMore /></button>,
                <div key={'dd-menu-box'} className={'dd-menu' + (this.state.ddMenuOpen ? ' open' : ' close')}>
                  <div className='cloak' onClick={() => { this.setState({ ddMenuOpen: false }) }}></div>
                  <div className='dd-menu-container'>
                    <button key={'about-btn'} className='button-about' onClick={() => { this.handleNavigationAction('about') }}><IconInfo /><span className='label'>About</span></button>
                    <button key={'settings-btn'} className='button-settings' onClick={() => { this.handleNavigationAction('config') }}><IconSettings /><span className='label'>Config</span></button>
                  </div>
                </div>
              ]
            }
          }}
        </MediaQuery>
      ];
    }
    // else if (location === '/config') {}
    return null;
  }

  handleDropDown() {
    console.log('Show menu');
    this.setState({ ddMenuOpen: true });
  }


  /**
   * Handles navigation requests, updates state
   * @param {string} action Navigation ID
   */
  handleNavigationAction(action) {
    console.log("App", action);
    let to = '/';
    switch (action) {
      case GAME_ADDITION:
        to = '/game' + GAME_ADDITION;
        break;
      case GAME_SUBTRACTION:
        to = '/game' + GAME_SUBTRACTION;
        break;
      case GAME_MULTIPLICATION:
        to = '/game' + GAME_MULTIPLICATION;
        break;
      case GAME_DIVISION:
        to = '/game' + GAME_DIVISION;

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
    this.setState({ location: to, ddMenuOpen: false })
  }

  render() {
    return (
      <div className={"App" + (this.state.location !== '/' ? " in-page" : " in-menu")}>
        <header className={"App-header" + (this.state.location !== '/' ? " in-page" : " in-menu")}>
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
            />} />

            <Route path='/game:type' component={(p) => <MathGame {...p.match.params}

              onAction={(userAnswer) => {
                this.handleNavigationAction()
              }
              } />}
            />

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
