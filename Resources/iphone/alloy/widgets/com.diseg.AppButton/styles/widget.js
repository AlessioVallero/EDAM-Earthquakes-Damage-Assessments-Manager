function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppButton/" + s : s.substring(0, index) + "/com.diseg.AppButton/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0015,
    key: "btnAppButton",
    style: {
        top: 0,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        borderRadius: 4,
        height: 60,
        width: 60
    }
}, {
    isId: true,
    priority: 100000.0016,
    key: "lblAppButton",
    style: {
        top: 60,
        width: 60,
        height: 28,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "11"
        },
        color: "#000",
        textAlign: "center"
    }
} ];