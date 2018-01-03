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
import { CHANGE_NUMBER_OF_QUESTIONS, ConfigType, CHANGE_RANGE_FROM, CHANGE_RANGE_TO } from "../actions/actions";

export default function reducer(state = {
    general: {
        questionCount: 10,
        from: 0,
        to: 10
    }
}, action) {

    const { payload, type } = action;
    let questionCount, configType, value;
    switch (type) {
        case CHANGE_NUMBER_OF_QUESTIONS:
            questionCount = payload.questionCount;
            configType = payload.configType;
            switch (configType) {
                case ConfigType.GENERAL:
                default:
                    return Object.assign({}, state, {
                        general: { ...state.general, questionCount }
                    });
            }
        // break;
        case CHANGE_RANGE_FROM:
            value = payload.value;
            configType = payload.configType;
            switch (configType) {
                case ConfigType.GENERAL:
                default:
                    return Object.assign({}, state, {
                        general: { ...state.general, from: value }
                    });
            }
        // break;
        case CHANGE_RANGE_TO:
            value = payload.value;
            configType = payload.configType;
            switch (configType) {
                case ConfigType.GENERAL:
                default:
                    return Object.assign({}, state, {
                        general: { ...state.general, to: value }
                    });
            }
        // break;

        default:
            break;
    }

    return state;
}