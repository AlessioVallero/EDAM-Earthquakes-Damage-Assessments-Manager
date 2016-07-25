function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.orthlieb.combobox/" + s : s.substring(0, index) + "/com.orthlieb.combobox/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100101.0038,
    key: "container",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100101.0039,
    key: "field",
    style: {
        left: 0,
        center: {
            y: "50%"
        },
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100101.004,
    key: "dropButton",
    style: {
        right: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        title: "▼",
        backgroundColor: "transparent"
    }
} ];