/**

 Copyright 2010-2011, The JSVM Project. 
 All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, 
 are permitted provided that the following conditions are met:
 
 1. Redistributions of source code must retain the above copyright notice, 
 this list of conditions and the following disclaimer.
 
 2. Redistributions in binary form must reproduce the above copyright notice, 
 this list of conditions and the following disclaimer in the 
 documentation and/or other materials provided with the distribution.
 
 3. Neither the name of the JSVM nor the names of its contributors may be 
 used to endorse or promote products derived from this software 
 without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
 IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
 INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
 BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE 
 OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 OF THE POSSIBILITY OF SUCH DAMAGE.

 *
 * Author: Pan mingfa
 * Contact: jsvm.prj@gmail.com
 * License: BSD 3-Clause License
 * Source code availability: http://jzvm.googlecode.com
 */

$package("js.awt");

$import("js.awt.Button");

/**
 * Define CheckBox component
 * 
 * @param def:{
 *   className: string, required
 * 
 *   id: request,
 *   
 *   iconImage: "",
 *   labelText: "Item",   
 * 
 *   state:optional,
 *   marked : true/false
 * 
 * }
 */
js.awt.CheckBox = function(def, Runtime, view) {

    var CLASS = js.awt.CheckBox, thi$ = CLASS.prototype;
    if(CLASS.__defined__){
        this._init.apply(this, arguments);
        return;
    }
    CLASS.__defined__ = true;

    var Class = js.lang.Class, Event = js.util.Event, DOM = J$VM.DOM,
    System = J$VM.System;
    
    /**
     * @see js.awt.Button
     * @see also js.awt.Component
     */
    thi$.notifyPeer = function(msgID, e){

        if(e.getType() === "mouseup"){
            this.mark(!this.isMarked());
        }

        arguments.callee.__super__.apply(this,arguments);

    }.$override(this.notifyPeer);

    thi$._init = function(def, Runtime, view) {
        if(typeof def !== "object") return;
        
        def.classType = def.classType || "js.awt.CheckBox";
        def.className = def.className || "jsvm_checkbox";
        def.css = def.css || "position:absolute;";
        def.markable = true;
        def.marked = Class.isBoolean(def.marked) ? def.marked : false;

        var layout = def.layout = def.layout || {};
        layout.align_x = Class.isNumber(layout.align_x) ? layout.align_x : 0.0;
        layout.align_y = Class.isNumber(layout.align_y) ? layout.align_y : 0.5;
        
        arguments.callee.__super__.apply(this, [def, Runtime, view]);

        this.mark(def.marked);

    }.$override(this._init);

    this._init.apply(this, arguments);

}.$extend(js.awt.Button);

