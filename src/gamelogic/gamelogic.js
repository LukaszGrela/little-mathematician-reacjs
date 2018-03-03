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
import { GAME_ADDITION, GAME_SUBTRACTION, GAME_MULTIPLICATION, GAME_DIVISION } from "../gameTypes";

export const generateGameObject = (config) => {
    //transform config
    const settings = mergeSettings(config, config.type);
    return {
        ...settings,
        type: config.type,
        history: []
    };
};

/**
 * Merges the general settings with settings specified by the game type (if exists).
 * @param {object} config game settings
 * @param {string} type Default GAME_ADDITION. Game type id
 */
const mergeSettings = (config, type = GAME_ADDITION) => {
    let sectionSettings;
    const { questionCount, from, to } = config.general;
    let settings = {
        questionCount,
        from,
        to,
    };

    switch (type) {
        case GAME_ADDITION:
        case GAME_SUBTRACTION:
        case GAME_MULTIPLICATION:
        case GAME_DIVISION:
            sectionSettings = config[type];
            break;

        default:
            break;
    }

    if (sectionSettings) {
        //combine if section settings exists
        settings = {
            ...settings,
            ...sectionSettings
        }
    }

    return settings;
}