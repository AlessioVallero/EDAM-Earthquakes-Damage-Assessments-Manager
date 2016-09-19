// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
win.add(label);
win.open();

// TODO: write your module tests here
var LocaleHelper = require('com.obscure.localehelper');
Ti.API.info("module is => " + LocaleHelper);

LocaleHelper.locale = "es";
label.text = L("key1");