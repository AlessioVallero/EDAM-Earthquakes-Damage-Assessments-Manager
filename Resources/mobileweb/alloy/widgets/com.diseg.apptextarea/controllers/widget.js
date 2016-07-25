function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppTextArea/" + s : s.substring(0, index) + "/com.diseg.AppTextArea/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnBtnSpeechRecognition_Click() {
        var ispeech = require("ti.ispeech");
        ispeech.setAPIKey("d5a9d3cda1b1b8c6e4fe90bd8e897db1");
        var dictate = ispeech.createDictation();
        ispeech.requestPermission() ? ispeech.isAvailable() ? dictate.isRecording() ? alert(L("generic_voice_recognition_already_recording_msg")) : dictate.start({
            locale: Ti.Locale.currentLocale,
            onComplete: function(event_args) {
                event_args.success && $.set_text_value(event_args.text);
            }
        }) : alert(L("generic_voice_recognition_disabled_msg")) : alert(L("generic_voice_recognition_no_microphone_permission_msg"));
    }
    new (require("alloy/widget"))("com.diseg.AppTextArea");
    this.__widgetId = "com.diseg.AppTextArea";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.lblAppTextArea = Ti.UI.createLabel({
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
        textAlign: "left",
        id: "lblAppTextArea"
    });
    $.__views.lblAppTextArea && $.addTopLevelView($.__views.lblAppTextArea);
    $.__views.btnAppTextAreaSpeechRecognition = Ti.UI.createButton({
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
        backgroundDisabledImage: "/images/speech_recognition_disabled.png",
        id: "btnAppTextAreaSpeechRecognition"
    });
    $.__views.btnAppTextAreaSpeechRecognition && $.addTopLevelView($.__views.btnAppTextAreaSpeechRecognition);
    OnBtnSpeechRecognition_Click ? $.__views.btnAppTextAreaSpeechRecognition.addEventListener("click", OnBtnSpeechRecognition_Click) : __defers["$.__views.btnAppTextAreaSpeechRecognition!click!OnBtnSpeechRecognition_Click"] = true;
    $.__views.txtAppTextArea = Ti.UI.createTextArea({
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
        id: "txtAppTextArea"
    });
    $.__views.txtAppTextArea && $.addTopLevelView($.__views.txtAppTextArea);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.init = function(text_msg, on_textarea_change, keyboardType, voice_recognition_disabled) {
        try {
            $.lblAppTextArea.setText(text_msg + " ");
            $.txtAppTextArea.setHintText(text_msg);
            on_textarea_change && $.txtAppTextArea.addEventListener("change", on_textarea_change);
            if (keyboardType) {
                $.txtAppTextArea.setKeyboardType(keyboardType);
                switch (keyboardType) {
                  case Titanium.UI.KEYBOARD_NUMBER_PAD:
                    $.txtAppTextArea.addEventListener("change", function(e) {
                        var val = e.source.value;
                        /[^0-9]/.test(val) ? e.source.value = val.replace(/[^0-9]/gi, "") : false;
                    });
                    break;

                  case Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION:
                    $.txtAppTextArea.addEventListener("change", function(e) {
                        var val = e.source.value;
                        /[^0-9.-]/.test(val) ? e.source.value = val.replace(/[^0-9.-]/gi, "") : false;
                    });
                }
            }
            if (voice_recognition_disabled) {
                $.btnAppTextAreaSpeechRecognition.visible = false;
                $.txtAppTextArea.setLeft($.btnAppTextAreaSpeechRecognition.getLeft());
            }
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.get_text_value = function() {
        var text_value_ret = "";
        try {
            text_value_ret = $.txtAppTextArea.getValue();
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
        return text_value_ret;
    };
    $.set_text_value = function(text_msg) {
        try {
            $.txtAppTextArea.setValue(text_msg);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.set_label_height = function(new_height) {
        try {
            $.lblAppTextArea.setHeight(new_height);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.enabled = function(enabled) {
        try {
            $.txtAppTextArea.setEditable(enabled);
            $.btnAppTextAreaSpeechRecognition.enabled = enabled;
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    __defers["$.__views.btnAppTextAreaSpeechRecognition!click!OnBtnSpeechRecognition_Click"] && $.__views.btnAppTextAreaSpeechRecognition.addEventListener("click", OnBtnSpeechRecognition_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;