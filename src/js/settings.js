/*******************************************************************************

    µBlock - a Chromium browser extension to block requests.
    Copyright (C) 2014 Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

/* global vAPI, uDom */
'use strict';

/******************************************************************************/

uDom.onLoad(function() {

/******************************************************************************/

var messager = vAPI.messaging.channel('settings.js');

/******************************************************************************/

var changeUserSettings = function(name, value) {
    messager.send({
        what: 'userSettings',
        name: name,
        value: value
    });
};

/******************************************************************************/

// TODO: use data-* to declare simple settings

var onUserSettingsReceived = function(details) {
    uDom('#collapse-blocked')
        .prop('checked', details.collapseBlocked === true)
        .on('change', function(){
            changeUserSettings('collapseBlocked', this.checked);
        });

    uDom('#icon-badge')
        .prop('checked', details.showIconBadge === true)
        .on('change', function(){
            changeUserSettings('showIconBadge', this.checked);
        });

    uDom('#context-menu-enabled')
        .prop('checked', details.contextMenuEnabled === true)
        .on('change', function(){
            changeUserSettings('contextMenuEnabled', this.checked);
        });

    uDom('#experimental-enabled')
        .prop('checked', details.experimentalEnabled === true)
        .on('change', function(){
            changeUserSettings('experimentalEnabled', this.checked);
        });
};

messager.send({ what: 'userSettings' }, onUserSettingsReceived);

/******************************************************************************/

});
