/**
 * @File ListItem.js
 * @Create 2011-03-12
 * @author shengliang.huang@china.jinfonet.com
 */

$package("js.awt");

js.awt.ListItem = function(def, runtime) {
    this._type = null;
    this._value = null;
    this._obj = def || null;
    this._enable = true;
    this._checked = false;
    
    var CLASS = js.awt.ListItem,
        thi$ = CLASS.prototype;
    if (CLASS.__defined__) {
        if (typeof def === "object") {
            this._init(def, runtime);
        }
        return;
    }
    CLASS.__defined__ = true;

    thi$.setType = function(type) {
        this._type = type;
    };

    thi$.getType = function() {
        return this._type;
    };

    thi$.getText = function() {
        return this.view.innerHTML;
    };

    thi$.setText = function(text) {
        this.view.innerHTML = text;
    };
    
    thi$.setValue = function(value) {
        this._value = value;
    };
    
    thi$.getValue = function() {
        return this._value;
    };
    
    thi$.getObj = function() {
        return this._obj;
    };
    
    thi$.setEnabled = function(bool) {
        this._enable = bool;
        var css0 = "opacity:0.5;filter:alpha(opacity=50);-moz-opacity:0.5;";
        var css1 = "opacity:1.0;filter:alpha(opacity=100);-moz-opacity:1.0;";
        this.view.style.cssText = this.view.style.cssText + (bool ? css1 : css0);
    }.$override(this.setEnabled);
    
    thi$.isEnabled = function() {
        return this._enable;
    };
    
    // Add by mingfa.pan, 2011-05-20
    thi$.setChecked = function(b) {
        this._checked = b;
    };
    
    thi$.isChecked = function() {
        return this._checked;
    };
    
    thi$.triggerClick = function(syn) {
        if (!this._enable)
            return;
        this._checked = !this._checked;
        var evn = new js.awt.event.ListItemEvent("click", this);
        if (syn) {
            J$VM.MQ.send("js.awt.event.ListItemEvent", evn , [ this.container.uuid() ]);
        } else {
            J$VM.MQ.post("js.awt.event.ListItemEvent", evn , [ this.container.uuid() ]);
        }
        
    };

    thi$.onclick = function(e) {
        e.cancelBubble();
        if (!this._enable) return;
        this._checked = !this._checked;
        var evn = new js.awt.event.ListItemEvent("click", this);
        evn.ctrlKey = e.ctrlKey;
        evn.shiftKey = e.shiftKey;
        J$VM.MQ.post("js.awt.event.ListItemEvent", evn , [ this.container.uuid() ]);
    };
    
    thi$.onmouseover = function() {
        if (this._enable)
            this.view.style.color = "#FF0000";
    };
    
    thi$.onmouseout = function() {
        this.view.style.color = "#000000";
    };

    thi$._init = function(def, runtime) {
        this._type = def.type || "";
        this._value = def.value || this._value;
        this._checked = typeof def.checked == "boolean" ? def.checked : this._checked;
        this._enable = typeof def.enable == "boolean" ? def.enable : this._enable;
        def.state = this._enable ? 0x00 : 0x01;
        def.className = def.className + "_" + this._type;
        def.css = def.css || "";
        
        arguments.callee.__super__.apply(this, arguments);
    }.$override(this._init);
    
    thi$.destroy = function() {
        // TODO
        arguments.callee.__super__.apply(this, arguments);
    }.$override(this.destroy);

    if (typeof def === "object") {
        this._init(def, runtime);
    }
}.$extend(js.awt.Component);