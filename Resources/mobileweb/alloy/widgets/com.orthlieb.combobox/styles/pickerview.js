function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.orthlieb.combobox/" + s : s.substring(0, index) + "/com.orthlieb.combobox/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0031,
    key: "popover",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0032,
    key: "pickerview",
    style: {
        right: 0,
        bottom: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#D1D1D1"
    }
}, {
    isId: true,
    priority: 100000.0033,
    key: "toolbar",
    style: {
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: 45,
        barColor: "#26688b"
    }
}, {
    isId: true,
    priority: 100000.0034,
    key: "cancel",
    style: {
        top: 5,
        left: 5,
        width: Ti.UI.SIZE,
        height: 35
    }
}, {
    isId: true,
    priority: 100000.0035,
    key: "done",
    style: {
        top: 5,
        right: 5,
        width: Ti.UI.SIZE,
        height: 35,
        systemButton: Ti.UI.iPhone.SystemButton.DONE
    }
}, {
    isId: true,
    priority: 100000.0036,
    key: "pickerPopoverWrapper",
    style: {
        top: 45,
        left: 0,
        width: Ti.UI.FILL,
        height: 215
    }
}, {
    isId: true,
    priority: 100000.0037,
    key: "picker",
    style: {
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: 215,
        selectionIndicator: true,
        type: Ti.UI.PICKER_TYPE_PLAIN
    }
} ];