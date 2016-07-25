function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.orthlieb.combobox/" + s : s.substring(0, index) + "/com.orthlieb.combobox/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100101.0041,
    key: "viewDisabler",
    style: {
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        borderColor: "transparent",
        backgroundColor: "transparent",
        zIndex: 1
    }
} ];