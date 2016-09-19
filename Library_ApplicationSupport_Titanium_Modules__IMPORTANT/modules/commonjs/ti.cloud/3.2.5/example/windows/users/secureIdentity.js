var WindowManager = require('helper/WindowManager');
var Utils = require('helper/Utils');
var Cloud = require('ti.cloud');
exports['Secure Identity'] = function (evt) {
    var win = WindowManager.createWindow({
        backgroundColor: 'white'
    });
    var content = Ti.UI.createScrollView({
        top: 0,
        contentHeight: 'auto',
        layout: 'vertical'
    });
    win.add(content);

	var btnSecureCreate = Ti.UI.createButton({
		title: 'Secure Create',
        top: 10 + Utils.u, left: 10 + Utils.u, right: 10 + Utils.u, bottom: 10 + Utils.u,
        height: 40 + Utils.u
	});
	content.add(btnSecureCreate);
	btnSecureCreate.addEventListener('click', secureCreate);

	var btnSecureLogin = Ti.UI.createButton({
		title: 'Secure Login',
        top: 10 + Utils.u, left: 10 + Utils.u, right: 10 + Utils.u, bottom: 10 + Utils.u,
        height: 40 + Utils.u
	});
	content.add(btnSecureLogin);
	btnSecureLogin.addEventListener('click', secureLogin);

	var btnLogoff = Ti.UI.createButton({
		title: 'Logoff',
        top: 10 + Utils.u, left: 10 + Utils.u, right: 10 + Utils.u, bottom: 10 + Utils.u,
        height: 40 + Utils.u
	});
	content.add(btnLogoff);
	btnLogoff.addEventListener('click', logoff);

	var btnCheckStatus = Ti.UI.createButton({
		title: 'Check Status',
        top: 10 + Utils.u, left: 10 + Utils.u, right: 10 + Utils.u, bottom: 10 + Utils.u,
        height: 40 + Utils.u
	});
	content.add(btnCheckStatus);
	btnCheckStatus.addEventListener('click', secureCheckStatus);

	function secureCreate() {
		Cloud.Users.secureCreate({
				title: 'Sign up here'
			}, function(e) {
				if (e.success) {
					getMe('Created!');
				} else {
					Utils.error(e);
				}
			}
		);
	}

	function secureLogin() {
		Cloud.Users.secureLogin({
				//title: 'Secure Login'
			}, function(e) {
				if (e.success) {
					getMe('Logged In!');
				} else {
					Utils.error(e);
				}
			}
		);
	}

	function secureCheckStatus() {
		if (Cloud.Users.secureStatus()) {
			alert ("Logged in");
		} else {
			alert ("Logged out");
		}
	}
	function logoff() {
		Cloud.Users.logout(function(e) {
			if (e.success) {
				alert ("Logged out!");
			} else {
				Utils.error(e);
			}
		});
	}

	function getMe(action) {
		Cloud.Users.showMe(function (e) {
            if (e.success) {
	            var user = e.users[0];
				alert(action + 'You are now logged in as ' + user.id);
            } else {
                Utils.error(e);
            }
        });
	}

    return win;
};
