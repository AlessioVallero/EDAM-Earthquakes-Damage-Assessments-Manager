/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2014 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 */

// WARNING!
//
// THIS MODULE WILL ONLY RUN ON AN IOS 8 DEVICE
// 

var TiTouchId = require('ti.touchid');

var win = Ti.UI.createWindow();

var btn = Ti.UI.createButton({
	title: 'authenticate'
});

win.add(btn);
win.open();

btn.addEventListener('click', function(){

	TiTouchId.authenticate({
		reason: 'We need your fingerprint to continue.',
		callback: function(e) {
			if (!e.success) {
				alert('Message: ' + e.error + '\nCode: ' + e.code);
				switch(e.code) {
					case TiTouchId.ERROR_AUTHENTICATION_FAILED: Ti.API.info('Error code is TiTouchId.ERROR_AUTHENTICATION_FAILED'); break;
					case TiTouchId.ERROR_USER_CANCEL: Ti.API.info('Error code is TiTouchId.ERROR_USER_CANCEL'); break;
					case TiTouchId.ERROR_USER_FALLBACK: Ti.API.info('Error code is TiTouchId.ERROR_USER_FALLBACK'); break;
					case TiTouchId.ERROR_SYSTEM_CANCEL: Ti.API.info('Error code is TiTouchId.ERROR_SYSTEM_CANCEL'); break;
					case TiTouchId.ERROR_PASSCODE_NOT_SET: Ti.API.info('Error code is TiTouchId.ERROR_PASSCODE_NOT_SET'); break;
					case TiTouchId.ERROR_TOUCH_ID_NOT_AVAILABLE: Ti.API.info('Error code is TiTouchId.ERROR_TOUCH_ID_NOT_AVAILABLE'); break;
					case TiTouchId.ERROR_TOUCH_ID_NOT_ENROLLED: Ti.API.info('Error code is TiTouchId.ERROR_TOUCH_ID_NOT_ENROLLED'); break;
					default: Ti.API.info('Error code is unknown'); break;
				}  
			} else {
			  	// do something useful
				alert('YAY! success');
			}
		}
	});

});
