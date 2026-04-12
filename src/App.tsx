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
import { useCallback, useState } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// pages
import NoMatch from "./pages/NoMatch";
import Menu from "./pages/Menu";
import About from "./pages/About";
import MathGame from "./pages/MathGame";
import Config from "./pages/Config";

// components
import Footer from "./components/Footer";

import MediaQuery from "react-responsive";

// css
import "./App.scss";
import "./DropDown.scss";

import LogoIcon from "./icons/LogoIcon";
import IconArrowBack from "./icons/IconArrowBack";
import IconInfo from "./icons/IconInfo";
import IconSettings from "./icons/IconSettings";

import {
  GAME_ADDITION,
  GAME_SUBTRACTION,
  GAME_MULTIPLICATION,
  GAME_DIVISION,
  type TGameType,
} from "./gameTypes";
import { IconMore } from "./icons/IconMore";
import { classNames } from "./utils/classNames";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [ddMenuOpen, setDdMenuOpen] = useState(false);

  const handleDropDown = useCallback(() => {
    console.log("Show menu");
    setDdMenuOpen(true);
  }, []);

  /**
   * Handles navigation requests, updates state
   * @param {string} action Navigation ID
   */
  const handleNavigationAction = useCallback(
    (action?: TGameType | "about" | "config") => {
      console.log("App", action);
      let to = "/";
      switch (action) {
        case GAME_ADDITION:
          to = "/game" + GAME_ADDITION;
          break;
        case GAME_SUBTRACTION:
          to = "/game" + GAME_SUBTRACTION;
          break;
        case GAME_MULTIPLICATION:
          to = "/game" + GAME_MULTIPLICATION;
          break;
        case GAME_DIVISION:
          to = "/game" + GAME_DIVISION;

          break;

        case "about":
          to = "/about";
          break;
        case "config":
          to = "/config";
          break;

        default:
          to = "/";
          break;
      }
      // this.props.history.push(to);
      // this.setState({ location: to, ddMenuOpen: false });
      setDdMenuOpen(false);
      navigate(to);
    },
    [navigate],
  );

  /**
   * Returns title fragment (JSX element) used in header based on location
   * @returns {JSX.Element|null} JSX fragment
   */
  const getTitleFragment = useCallback(() => {
    const { pathname } = location;
    let title = "";

    switch (pathname) {
      case "/game" + GAME_ADDITION:
        title = "Addition";
        break;

      case "/game" + GAME_SUBTRACTION:
        title = "Subtraction";
        break;

      case "/game" + GAME_MULTIPLICATION:
        title = "Multiplication";
        break;

      case "/game" + GAME_DIVISION:
        title = "Division";
        break;

      case "/config":
        title = "Config";
        break;

      case "/about":
        title = "About";
        break;

      case "/":
      default:
        title = "";
        break;
    }

    console.log("getTitle", pathname, title);

    if (title !== "") return <h3>{title}</h3>;
    else return null;
  }, [location]);

  /**
   * Returns content of left icon slot in header
   * @returns {JSX.Element|null} JSX fragment
   */
  const getLeftIconSlotFragment = useCallback(() => {
    if (location.pathname !== "/") {
      return (
        <button
          onClick={() => {
            handleNavigationAction();
          }}
        >
          <IconArrowBack />
        </button>
      );
    } else {
      return <LogoIcon />;
    }
  }, [handleNavigationAction, location.pathname]);

  /**
   * Returns content of right icon slot in header
   * @returns {JSX.Element|null} JSX fragment
   */
  const getRightIconSlotFragment = useCallback(() => {
    if (location.pathname === "/") {
      return [
        <MediaQuery minDeviceWidth={410} key={"media-query"}>
          {(matches) => {
            if (matches) {
              return [
                <button
                  key={"about-btn"}
                  className="button-about"
                  onClick={() => {
                    handleNavigationAction("about");
                  }}
                >
                  <IconInfo />
                </button>,
                <button
                  key={"settings-btn"}
                  className="button-settings"
                  onClick={() => {
                    handleNavigationAction("config");
                  }}
                >
                  <IconSettings />
                </button>,
              ];
            } else {
              return [
                <button
                  key={"dd-menu-btn"}
                  className="dd-button-menu"
                  onClick={() => {
                    handleDropDown();
                  }}
                >
                  <IconMore />
                </button>,
                <div
                  key={"dd-menu-box"}
                  className={"dd-menu" + (ddMenuOpen ? " open" : " close")}
                >
                  <div
                    className="cloak"
                    onClick={() => {
                      setDdMenuOpen(false);
                    }}
                  ></div>
                  <div className="dd-menu-container">
                    <button
                      key={"about-btn"}
                      className="button-about"
                      onClick={() => {
                        handleNavigationAction("about");
                      }}
                    >
                      <IconInfo />
                      <span className="label">About</span>
                    </button>
                    <button
                      key={"settings-btn"}
                      className="button-settings"
                      onClick={() => {
                        handleNavigationAction("config");
                      }}
                    >
                      <IconSettings />
                      <span className="label">Config</span>
                    </button>
                  </div>
                </div>,
              ];
            }
          }}
        </MediaQuery>,
      ];
    }
    // else if (location === '/config') {}
    return null;
  }, [ddMenuOpen, handleDropDown, handleNavigationAction, location.pathname]);

  return (
    <div
      className={classNames(
        "App",
        location.pathname !== "/" ? "in-page" : "in-menu",
      )}
    >
      <header
        className={classNames(
          "App-header",
          location.pathname !== "/" ? "in-page" : "in-menu",
        )}
      >
        <h1 className="App-title">Little Mathematician</h1>
        {getTitleFragment()}
        <div className="leftIconSlot">{getLeftIconSlotFragment()}</div>

        <div className="rightIconSlot">{getRightIconSlotFragment()}</div>
      </header>
      <section className="content">
        <Routes>
          <Route
            path="/"
            Component={() => <Menu onAction={handleNavigationAction} />}
          />

          <Route
            path="/game:type"
            Component={() => (
              <MathGame
                // {...p.match.params}
                onAction={(userAnswer: unknown) => {
                  console.log("userAnswer", userAnswer);
                  handleNavigationAction();
                }}
              />
            )}
          />

          <Route path="/config" Component={Config} />
          <Route path="/about" Component={About} />
          <Route Component={NoMatch} />
        </Routes>
      </section>
      <Footer />
    </div>
  );
};

export default App;
