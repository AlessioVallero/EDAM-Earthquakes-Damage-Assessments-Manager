function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppCheckBox/" + s : s.substring(0, index) + "/com.diseg.AppCheckBox/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0026,
    key: "lblAppCheckBox",
    style: {
        left: 0,
        width: 165,
        height: 50,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        textAlign: "right"
    }
}, {
    isId: true,
    priority: 100000.0027,
    key: "btnAppCheckBoxHelp",
    style: {
        left: 167,
        width: 32,
        title: "",
        height: 32,
        backgroundImage: "/images/help_normal.png",
        backgroundSelectedImage: "/images/help_pressed.png",
        backgroundDisabledImage: "/images/help_disabled.png"
    }
}, {
    isId: true,
    priority: 100000.0028,
    key: "cbAppCheckBox",
    style: {
        left: 207,
        width: 30,
        title: "",
        height: 30,
        borderColor: "#666",
        borderWidth: 2,
        borderRadius: 3,
        backgroundColor: "#aaa",
        backgroundImage: "none",
        color: "#fff",
        font: {
            fontSize: 22,
            fontWeight: "bold"
        },
        value: "0"
    }
} ];