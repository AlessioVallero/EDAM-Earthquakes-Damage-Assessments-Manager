function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppTextArea/" + s : s.substring(0, index) + "/com.diseg.AppTextArea/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.002,
    key: "lblAppTextArea",
    style: {
        top: 0,
        left: 0,
        width: "90%",
        height: 40,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        textAlign: "left"
    }
}, {
    isId: true,
    priority: 100000.0021,
    key: "btnAppTextAreaSpeechRecognition",
    style: {
        top: 60,
        left: 0,
        width: 32,
        title: "",
        height: 32,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        borderRadius: 4,
        backgroundImage: "/images/speech_recognition_normal.png",
        backgroundSelectedImage: "/images/speech_recognition_pressed.png",
        backgroundDisabledImage: "/images/speech_recognition_disabled.png"
    }
}, {
    isId: true,
    priority: 100000.0022,
    key: "txtAppTextArea",
    style: {
        backgroundColor: "#ffffff",
        color: "black",
        top: 60,
        left: 35,
        width: "90%",
        height: 300,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 15
        },
        textAlign: "left",
        bubbleParent: false
    }
} ];