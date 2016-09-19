/*
 * This module is used to force the default phone locale.
 * Created by Karthi(http://titaniumtutorial.com) and Naga Harish(http://shareourideas.com)
 * 
 * Please add locale string file for English and Spanish and the locale string key is "welcome_message"
 * Please make sure everything works fine in your application. Unit testing is must.
 */

var showLocaleWelcomeMessage = function() {
	Ti.API.info("should be en, was = " + Ti.Locale.currentLanguage);
	Ti.API.info("welcome_message = " + Ti.Locale.getString("welcome_message"));
	alert(Ti.Locale.getString("welcome_message"));
	labelWelcomeText.text = Ti.Locale.getString("welcome_message");
};

var win = Ti.UI.createWindow({
	backgroundColor : 'white',
	layout : "vertical"
});

var labelWelcomeText = Ti.UI.createLabel({
	text : L("welcome_message"),
	font : {
		fontSize : "28px"
	},
	color : "#4285F4",
	top : "20dp"
});
win.add(labelWelcomeText);

var buttonEN = Ti.UI.createButton({
	title : "English",
	width : "150dp",
	top : "20dp"
});

buttonEN.addEventListener("click", function(e) {
	locale.setLocale("en");
	showLocaleWelcomeMessage();
});

win.add(buttonEN);

var buttonES = Ti.UI.createButton({
	title : "Spanish",
	width : "150dp",
	top : "20dp"
});

buttonES.addEventListener("click", function(e) {
	locale.setLocale("es");
	showLocaleWelcomeMessage();
});

win.add(buttonES);

if (Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad") {
	var buttonReset = Ti.UI.createButton({
		title : "Reset Locale",
		width : "150dp",
		top : "20dp"
	});

	buttonReset.addEventListener("click", function(e) {
		locale.resetLoclae();
		showLocaleWelcomeMessage();
	});

	win.add(buttonReset);
}

//Loading locale module
var locale = require('com.shareourideas.locale');
Ti.API.info("module is => " + locale);
//locale.setLocale("es");  //-- You can force locale by calling this method. But please call before rendering UI

win.open();
