function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppTextField/" + s : s.substring(0, index) + "/com.diseg.AppTextField/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0017,
    key: "lblAppTextField",
    style: {
        top: 0,
        left: 0,
        width: 80,
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
    priority: 100000.0018,
    key: "btnAppTextFieldSpeechRecognition",
    style: {
        left: 90,
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
    priority: 100000.0019,
    key: "txtAppTextField",
    style: {
        backgroundColor: "#ffffff",
        color: "black",
        left: 125,
        right: 10,
        height: 50
    }
} ];