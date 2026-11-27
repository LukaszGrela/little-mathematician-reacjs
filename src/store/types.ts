/*
   Copyright 2026 Łukasz 'Severiaan' Grela GrelaDesign

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

import type { Action, Dispatch, Store } from "redux";
import type reducer from "../reducers";

// The root state is derived from the combined reducer, never from the store
// instance: `Store.ts` needs the state type for `createStore`, so asking the
// store for its own state type creates a circular alias (TS2456/TS7022).
export type TRootState = ReturnType<typeof reducer>;

export type TStore = Store<TRootState>;
export type TAppDispatch = Dispatch<Action>;
