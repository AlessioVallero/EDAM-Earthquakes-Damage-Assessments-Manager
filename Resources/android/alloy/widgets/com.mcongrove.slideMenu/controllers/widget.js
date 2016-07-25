function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mcongrove.slideMenu/" + s : s.substring(0, index) + "/com.mcongrove.slideMenu/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
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
    function handleClick(_event) {
        "undefined" != typeof _event.index && $.setIndex(_event.index);
    }
    function buildSections(_nodes) {
        for (var i = 0; i < _nodes.length; i++) if (_nodes[i].menuHeader) {
            var header = Ti.UI.createView({
                top: "0dp",
                height: "20dp",
                width: Ti.UI.FILL,
                backgroundColor: color.headingBackground
            });
            var headerText = Ti.UI.createLabel({
                text: _nodes[i].menuHeader,
                top: "2dp",
                left: "13dp",
                font: {
                    fontSize: "12dp",
                    fontWeight: "HelveticaNeue-Light"
                },
                color: color.headingText,
                touchEnabled: false,
                verticalAlignment: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
                isHeader: true
            });
            header.add(headerText);
            var section = Ti.UI.createTableViewSection({
                headerView: header
            });
            sections.push(section);
        }
    }
    new (require("alloy/widget"))("com.mcongrove.slideMenu");
    this.__widgetId = "com.mcongrove.slideMenu";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        width: "200dp",
        top: "0dp",
        left: "-200dp",
        backgroundColor: "#000",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.Nodes = Ti.UI.createTableView({
        top: "0dp",
        backgroundColor: "#111",
        separatorColor: "#222",
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
        id: "Nodes"
    });
    $.__views.Wrapper.add($.__views.Nodes);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var sections = [];
    var nodes = [];
    var color;
    $.init = function(_params) {
        sections = [];
        nodes = [];
        color = "undefined" != typeof _params.color ? _params.color : null;
        buildSections(_params.nodes);
        if (sections.length > 0) var currentSection = -1;
        for (var i = 0; i < _params.nodes.length; i++) {
            _params.nodes[i].menuHeader && currentSection++;
            var tab = Ti.UI.createTableViewRow({
                id: _params.nodes[i].id,
                height: "47dp",
                backgroundcolor: "#111",
                backgroundSelectedColor: "#222",
                selectedBackgroundColor: "#222"
            });
            var label = Ti.UI.createLabel({
                text: _params.nodes[i].title,
                top: "0dp",
                left: "47dp",
                right: "13dp",
                height: "46dp",
                font: {
                    fontSize: "16dp",
                    fontFamily: "HelveticaNeue-Light"
                },
                color: "#FFF",
                touchEnabled: false
            });
            if (_params.nodes[i].image) {
                var icon = Ti.UI.createImageView({
                    image: _params.nodes[i].image,
                    width: "21dp",
                    height: "21dp",
                    top: "13dp",
                    left: "13dp",
                    touchEnabled: false,
                    preventDefaultImage: true
                });
                tab.add(icon);
            }
            tab.add(label);
            if (sections.length > 0) {
                sections[currentSection].add(tab);
                i + 1 !== _params.nodes.length ? _params.nodes[i + 1].menuHeader && $.Nodes.appendSection(sections[currentSection]) : $.Nodes.appendSection(sections[currentSection]);
            } else nodes.push(tab);
        }
        nodes.length > 0 && $.Nodes.setData(nodes);
        $.Nodes.removeEventListener("click", handleClick);
        $.Nodes.addEventListener("click", handleClick);
    };
    $.clear = function() {
        $.Nodes.setData([]);
        $.Nodes.removeAllChildren();
    };
    $.setIndex = function(_index) {
        $.Nodes.selectRow(_index);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;