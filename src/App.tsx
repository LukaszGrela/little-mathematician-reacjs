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
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router";

// pages
import NoMatch from "./pages/NoMatch";
import Menu from "./pages/Menu";
import About from "./pages/About";
import MathGame from "./pages/MathGame";
import Config from "./pages/Config";
import History from "./pages/History";

// components
import Footer from "./components/Footer";

import { useMediaQuery } from "react-responsive";

// css
import "./App.scss";
import "./DropDown.scss";

import LogoIcon from "./icons/LogoIcon";
import IconArrowBack from "./icons/IconArrowBack";
import IconInfo from "./icons/IconInfo";
import IconSettings from "./icons/IconSettings";
import IconGrade from "./icons/IconGrade";

import {
  GAME_ADDITION,
  GAME_SUBTRACTION,
  GAME_MULTIPLICATION,
  GAME_DIVISION,
  type TGameType,
} from "./gameTypes";
import { IconMore } from "./icons/IconMore";
import { classNames } from "./utils/classNames";
import type { TAppDispatch, TRootState } from "./store/types";
import { newGame, quitGame } from "./actions/mathGameActions";
import GameOverPage from "./pages/GameOverPage";
import { MIN_DEVICE_WIDTH } from "./utils/constants";

type TNarrowMenuAction = "about" | "config" | "history";

interface INarrowMenuProps {
  onNavigate: (action: TNarrowMenuAction) => void;
}

/**
 * Dropdown used by the narrow layout only. It owns its open state, so the wide
 * layout unmounts it and every switch back to the narrow layout starts with a
 * closed menu - no effect has to reset that state.
 */
const NarrowMenu = ({ onNavigate }: INarrowMenuProps) => {
  const [ddMenuOpen, setDdMenuOpen] = useState(false);
  const ddMenuToggleRef = useRef<HTMLButtonElement | null>(null);
  const ddMenuContainerRef = useRef<HTMLDivElement | null>(null);

  const handleDropDown = useCallback(() => {
    setDdMenuOpen((open) => !open);
  }, []);

  const handleSelect = useCallback(
    (action: TNarrowMenuAction) => {
      setDdMenuOpen(false);
      onNavigate(action);
    },
    [onNavigate],
  );

  // move focus into the menu as soon as it opens
  useEffect(() => {
    if (!ddMenuOpen) return;
    ddMenuContainerRef.current
      ?.querySelector<HTMLElement>('[role="menuitem"]')
      ?.focus();
  }, [ddMenuOpen]);

  /**
   * Keyboard support for the narrow-layout dropdown: Escape closes it and
   * returns focus to the toggle, arrows/Home/End move between the entries and
   * Tab is trapped inside the open menu.
   */
  const handleDdMenuKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      const items = Array.from(
        ddMenuContainerRef.current?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]',
        ) ?? [],
      );
      if (!items.length) return;

      const index = items.indexOf(document.activeElement as HTMLElement);

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          setDdMenuOpen(false);
          ddMenuToggleRef.current?.focus();
          break;
        case "ArrowDown":
          event.preventDefault();
          items[index === items.length - 1 ? 0 : index + 1].focus();
          break;
        case "ArrowUp":
          event.preventDefault();
          items[index <= 0 ? items.length - 1 : index - 1].focus();
          break;
        case "Home":
          event.preventDefault();
          items[0].focus();
          break;
        case "End":
          event.preventDefault();
          items[items.length - 1].focus();
          break;
        case "Tab":
          if (event.shiftKey && index <= 0) {
            event.preventDefault();
            items[items.length - 1].focus();
          } else if (!event.shiftKey && index === items.length - 1) {
            event.preventDefault();
            items[0].focus();
          }
          break;
      }
    },
    [],
  );

  return (
    <>
      <button
        ref={ddMenuToggleRef}
        className="dd-button-menu"
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={ddMenuOpen}
        aria-controls="dd-menu"
        onClick={() => {
          handleDropDown();
        }}
      >
        <IconMore />
      </button>
      <div
        id="dd-menu"
        className={"dd-menu" + (ddMenuOpen ? " open" : " close")}
      >
        <div
          className="cloak"
          aria-hidden="true"
          onClick={() => {
            setDdMenuOpen(false);
          }}
        ></div>
        <div
          className="dd-menu-container"
          ref={ddMenuContainerRef}
          role="menu"
          aria-label="Main menu"
          onKeyDown={handleDdMenuKeyDown}
        >
          <button
            role="menuitem"
            className="button-history"
            onClick={() => {
              handleSelect("history");
            }}
          >
            <IconGrade />
            <span className="label">History</span>
          </button>
          <button
            role="menuitem"
            className="button-about"
            onClick={() => {
              handleSelect("about");
            }}
          >
            <IconInfo />
            <span className="label">About</span>
          </button>
          <button
            role="menuitem"
            className="button-settings"
            onClick={() => {
              handleSelect("config");
            }}
          >
            <IconSettings />
            <span className="label">Config</span>
          </button>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<TAppDispatch>();
  const config = useSelector((state: TRootState) => state.config);

  const isWideLayout = useMediaQuery({ minDeviceWidth: MIN_DEVICE_WIDTH });

  /**
   * Handles navigation requests, updates state
   * @param {string} action Navigation ID
   */
  const handleNavigationAction = useCallback(
    (action?: TGameType | "about" | "config" | "history") => {
      let to = "/";
      switch (action) {
        case GAME_ADDITION:
          to = "/game/" + GAME_ADDITION;
          dispatch(
            newGame({
              ...config,
              type: action,
            }),
          );
          break;
        case GAME_SUBTRACTION:
          to = "/game/" + GAME_SUBTRACTION;
          dispatch(
            newGame({
              ...config,
              type: action,
            }),
          );
          break;
        case GAME_MULTIPLICATION:
          to = "/game/" + GAME_MULTIPLICATION;
          dispatch(
            newGame({
              ...config,
              type: action,
            }),
          );
          break;
        case GAME_DIVISION:
          to = "/game/" + GAME_DIVISION;
          dispatch(
            newGame({
              ...config,
              type: action,
            }),
          );
          break;

        case "about":
          to = "/about";
          break;
        case "config":
          to = "/config";
          break;
        case "history":
          to = "/history";
          break;

        default:
          to = "/";
          if (location.pathname.indexOf("/game/") !== -1) {
            dispatch(quitGame());
          }
          break;
      }

      navigate(to);
    },
    [config, dispatch, location, navigate],
  );

  /**
   * Returns title fragment (JSX element) used in header based on location
   * @returns {JSX.Element|null} JSX fragment
   */
  const getTitleFragment = useCallback(() => {
    const { pathname } = location;
    let title = "";

    switch (pathname) {
      case "/game/" + GAME_ADDITION:
        title = "Addition";
        break;

      case "/game/" + GAME_SUBTRACTION:
        title = "Subtraction";
        break;

      case "/game/" + GAME_MULTIPLICATION:
        title = "Multiplication";
        break;

      case "/game/" + GAME_DIVISION:
        title = "Division";
        break;

      case "/config":
        title = "Config";
        break;

      case "/about":
        title = "About";
        break;

      case "/history":
        title = "History";
        break;

      case "/":
      default:
        title = "";
        break;
    }

    if (title !== "") return <h3>{title}</h3>;
    else return null;
  }, [location]);

  /**
   * Returns content of left icon slot in header
   * @returns {JSX.Element|null} JSX fragment
   */
  const getLeftIconSlotFragment = useCallback(() => {
    if (location.pathname.indexOf("/game-over") !== -1) {
      return null;
    } else if (location.pathname !== "/") {
      return (
        <button
          onClick={() => {
            handleNavigationAction();
          }}
          aria-label="Back"
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
    if (location.pathname !== "/") {
      // else if (location === '/config') {}
      return null;
    }

    if (isWideLayout) {
      return [
        <button
          key={"history-btn"}
          className="button-history"
          aria-label="History"
          onClick={() => {
            handleNavigationAction("history");
          }}
        >
          <IconGrade />
        </button>,
        <button
          key={"about-btn"}
          className="button-about"
          aria-label="About"
          onClick={() => {
            handleNavigationAction("about");
          }}
        >
          <IconInfo />
        </button>,
        <button
          key={"settings-btn"}
          className="button-settings"
          aria-label="Settings"
          onClick={() => {
            handleNavigationAction("config");
          }}
        >
          <IconSettings />
        </button>,
      ];
    }

    return [<NarrowMenu key={"dd-menu"} onNavigate={handleNavigationAction} />];
  }, [handleNavigationAction, isWideLayout, location.pathname]);

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

          <Route path="/game/:type" Component={MathGame} />

          <Route path="/game/:type/game-over" Component={GameOverPage} />

          <Route path="/config" Component={Config} />
          <Route path="/about" Component={About} />
          <Route path="/history" Component={History} />
          <Route path="*" Component={NoMatch} />
        </Routes>
      </section>
      <Footer />
    </div>
  );
};

export default App;
