var WindowManager = require('helper/WindowManager');
var Utils = require('helper/Utils');
var Cloud = require('ti.cloud');
exports['Key Values'] = function (evt) {
    var win = WindowManager.createWindow({
        backgroundColor: 'white'
    });
    var content = Ti.UI.createScrollView({
        top: 0,
        contentHeight: 'auto',
        layout: 'vertical'
    });
    win.add(content);

    var name = Ti.UI.createTextField({
        hintText: 'Name',
        top: 10 + Utils.u, left: 10 + Utils.u, right: 10 + Utils.u,
        height: 40 + Utils.u,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false
    });
    content.add(name);

    var value = Ti.UI.createTextField({
        hintText: 'Value',
        top: 10 + Utils.u, left: 10 + Utils.u, right: 10 + Utils.u,
        height: 40 + Utils.u,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false
    });
    content.add(value);

    var setButton = Ti.UI.createButton({
        title: 'Set',
        top: 10 + Utils.u, left: 10 + Utils.u, right: 10 + Utils.u, bottom: 10 + Utils.u,
        height: 40 + Utils.u
    });
    setButton.addEventListener('click', function submitForm() {
        Cloud.KeyValues.set({
            name: name.value,
            value: value.value
        }, function (e) {
            if (e.success) {
                alert('Set!');
            }
            else {
                Utils.error(e);
            }
        });
    });
    content.add(setButton);

    var getButton = Ti.UI.createButton({
        title: 'Get',
        top: 0, left: 10 + Utils.u, right: 10 + Utils.u, bottom: 10 + Utils.u,
        height: 40 + Utils.u
    });
    getButton.addEventListener('click', function (evt) {
        Cloud.KeyValues.get({
            name: name.value
        }, function (e) {
            if (e.success) {
                value.value = e.keyvalues[0].value;
                alert('Got!');
            }
            else {
                Utils.error(e);
            }
        });
    });
    content.add(getButton);

    var appendButton = Ti.UI.createButton({
        title: 'Append',
        top: 0, left: 10 + Utils.u, right: 10 + Utils.u, bottom: 10 + Utils.u,
        height: 40 + Utils.u
    });
    appendButton.addEventListener('click', function (evt) {
        Cloud.KeyValues.append({
            name: name.value,
            value: value.value
        }, function (e) {
            if (e.success) {
                alert('Appended!');
            }
            else {
                Utils.error(e);
            }
        });
    });
    content.add(appendButton);

    var incrementButton = Ti.UI.createButton({
        title: 'Increment',
        top: 0, left: 10 + Utils.u, right: 10 + Utils.u, bottom: 10 + Utils.u,
        height: 40 + Utils.u
    });
    incrementButton.addEventListener('click', function (evt) {
    	var incrby = parseInt(value.value, 10);
    	if (isNaN(incrby)) {
    		alert('Enter a valid number for the increment');
    		value.focus();
    		return;
    	}
        Cloud.KeyValues.increment({
            name: name.value,
            value: incrby
        }, function (e) {
            if (e.success) {
                alert('Incremented!');
            }
            else {
                Utils.error(e);
            }
        });
    });
    content.add(incrementButton);

    var removeButton = Ti.UI.createButton({
        title: 'Remove',
        top: 0, left: 10 + Utils.u, right: 10 + Utils.u, bottom: 10 + Utils.u,
        height: 40 + Utils.u
    });
    removeButton.addEventListener('click', function (evt) {
        Cloud.KeyValues.remove({
            name: name.value
        }, function (e) {
            if (e.success) {
                alert('Removed!');
                value.value = '';
            }
            else {
                Utils.error(e);
            }
        });
    });
    content.add(removeButton);

    win.addEventListener('open', function () {
        name.focus();
    });
    return win;
};