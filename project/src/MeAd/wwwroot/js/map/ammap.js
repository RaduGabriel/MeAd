﻿(function () {
    var d; window.AmCharts ? d = window.AmCharts : (d = {}, window.AmCharts = d, d.themes = {}, d.maps = {}, d.inheriting = {}, d.charts = [], d.onReadyArray = [], d.useUTC = !1, d.updateRate = 60, d.uid = 0, d.lang = {}, d.translations = {}, d.mapTranslations = {}, d.windows = {}, d.initHandlers = []); d.Class = function (a) {
        var b = function () { arguments[0] !== d.inheriting && (this.events = {}, this.construct.apply(this, arguments)) }; a.inherits ? (b.prototype = new a.inherits(d.inheriting), b.base = a.inherits.prototype, delete a.inherits) : (b.prototype.createEvents =
        function () { for (var a = 0, b = arguments.length; a < b; a++) this.events[arguments[a]] = [] }, b.prototype.listenTo = function (a, b, c) { this.removeListener(a, b, c); a.events[b].push({ handler: c, scope: this }) }, b.prototype.addListener = function (a, b, c) { this.removeListener(this, a, b); a && this.events[a] && this.events[a].push({ handler: b, scope: c }) }, b.prototype.removeListener = function (a, b, c) { if (a && a.events && (a = a.events[b])) for (b = a.length - 1; 0 <= b; b--) a[b].handler === c && a.splice(b, 1) }, b.prototype.fire = function (a) {
            for (var b = this.events[a.type],
            c = 0, d = b.length; c < d; c++) { var k = b[c]; k.handler.call(k.scope, a) }
        }); for (var c in a) b.prototype[c] = a[c]; return b
    }; d.addChart = function (a) { window.requestAnimationFrame ? d.animationRequested || (d.animationRequested = !0, window.requestAnimationFrame(d.update)) : d.updateInt || (d.updateInt = setInterval(function () { d.update() }, Math.round(1E3 / d.updateRate))); d.charts.push(a) }; d.removeChart = function (a) {
        for (var b = d.charts, c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1); 0 === b.length && d.updateInt && (clearInterval(d.updateInt),
        d.updateInt = NaN)
    }; d.isModern = !0; d.getIEVersion = function () { var a = 0, b, c; "Microsoft Internet Explorer" == navigator.appName && (b = navigator.userAgent, c = /MSIE ([0-9]{1,}[.0-9]{0,})/, null !== c.exec(b) && (a = parseFloat(RegExp.$1))); return a }; d.applyLang = function (a, b) {
        var c = d.translations; b.dayNames = d.extend({}, d.dayNames); b.shortDayNames = d.extend({}, d.shortDayNames); b.monthNames = d.extend({}, d.monthNames); b.shortMonthNames = d.extend({}, d.shortMonthNames); b.amString = "am"; b.pmString = "pm"; c && (c = c[a]) && (d.lang = c, c.monthNames &&
        (b.dayNames = d.extend({}, c.dayNames), b.shortDayNames = d.extend({}, c.shortDayNames), b.monthNames = d.extend({}, c.monthNames), b.shortMonthNames = d.extend({}, c.shortMonthNames)), c.am && (b.amString = c.am), c.pm && (b.pmString = c.pm))
    }; d.IEversion = d.getIEVersion(); 9 > d.IEversion && 0 < d.IEversion && (d.isModern = !1, d.isIE = !0); d.dx = 0; d.dy = 0; if (document.addEventListener || window.opera) d.isNN = !0, d.isIE = !1, d.dx = .5, d.dy = .5; document.attachEvent && (d.isNN = !1, d.isIE = !0, d.isModern || (d.dx = 0, d.dy = 0)); window.chrome && (d.chrome = !0); d.handleMouseUp =
    function (a) { for (var b = d.charts, c = 0; c < b.length; c++) { var e = b[c]; e && e.handleReleaseOutside && e.handleReleaseOutside(a) } }; d.handleMouseMove = function (a) { for (var b = d.charts, c = 0; c < b.length; c++) { var e = b[c]; e && e.handleMouseMove && e.handleMouseMove(a) } }; d.handleWheel = function (a) { for (var b = d.charts, c = 0; c < b.length; c++) { var e = b[c]; if (e && e.mouseIsOver) { e.mouseWheelScrollEnabled || e.mouseWheelZoomEnabled ? e.handleWheel && e.handleWheel(a) : a.stopPropagation && a.stopPropagation(); break } } }; d.resetMouseOver = function () {
        for (var a =
        d.charts, b = 0; b < a.length; b++) { var c = a[b]; c && (c.mouseIsOver = !1) }
    }; d.ready = function (a) { d.onReadyArray.push(a) }; d.handleLoad = function () { d.isReady = !0; for (var a = d.onReadyArray, b = 0; b < a.length; b++) { var c = a[b]; isNaN(d.processDelay) ? c() : setTimeout(c, d.processDelay * b) } }; d.addInitHandler = function (a, b) { d.initHandlers.push({ method: a, types: b }) }; d.callInitHandler = function (a) { var b = d.initHandlers; if (d.initHandlers) for (var c = 0; c < b.length; c++) { var e = b[c]; e.types ? d.isInArray(e.types, a.type) && e.method(a) : e.method(a) } };
    d.getUniqueId = function () { d.uid++; return "AmChartsEl-" + d.uid }; d.isNN && (document.addEventListener("mousemove", d.handleMouseMove), document.addEventListener("mouseup", d.handleMouseUp, !0), window.addEventListener("load", d.handleLoad, !0), window.addEventListener("DOMMouseScroll", d.handleWheel, !0), document.addEventListener("mousewheel", d.handleWheel, !0)); d.isIE && (document.attachEvent("onmousemove", d.handleMouseMove), document.attachEvent("onmouseup", d.handleMouseUp), window.attachEvent("onload", d.handleLoad),
    document.attachEvent("onmousewheel", d.handleWheel)); d.clear = function () {
        var a = d.charts; if (a) for (var b = a.length - 1; 0 <= b; b--) a[b].clear(); d.updateInt && clearInterval(d.updateInt); d.charts = []; d.isNN && (document.removeEventListener("mousemove", d.handleMouseMove, !0), document.removeEventListener("mouseup", d.handleMouseUp, !0), window.removeEventListener("load", d.handleLoad, !0), window.removeEventListener("DOMMouseScroll", d.handleWheel, !0), document.removeEventListener("mousewheel", d.handleWheel, !0)); d.isIE && (document.detachEvent("onmousemove",
        d.handleMouseMove), document.detachEvent("onmouseup", d.handleMouseUp), window.detachEvent("onload", d.handleLoad))
    }; d.makeChart = function (a, b, c) {
        var e = b.type, g = b.theme; d.isString(g) && (g = d.themes[g], b.theme = g); var f; switch (e) {
            case "serial": f = new d.AmSerialChart(g); break; case "xy": f = new d.AmXYChart(g); break; case "pie": f = new d.AmPieChart(g); break; case "radar": f = new d.AmRadarChart(g); break; case "gauge": f = new d.AmAngularGauge(g); break; case "funnel": f = new d.AmFunnelChart(g); break; case "map": f = new d.AmMap(g);
                break; case "stock": f = new d.AmStockChart(g); break; case "gantt": f = new d.AmGanttChart(g)
        } d.extend(f, b); d.isReady ? isNaN(c) ? f.write(a) : setTimeout(function () { d.realWrite(f, a) }, c) : d.ready(function () { isNaN(c) ? f.write(a) : setTimeout(function () { d.realWrite(f, a) }, c) }); return f
    }; d.realWrite = function (a, b) { a.write(b) }; d.updateCount = 0; d.validateAt = Math.round(d.updateRate / 10); d.update = function () {
        var a = d.charts; d.updateCount++; var b = !1; d.updateCount == d.validateAt && (b = !0, d.updateCount = 0); if (a) for (var c = a.length - 1; 0 <=
        c; c--) a[c].update && a[c].update(), b && (a[c].autoResize ? a[c].validateSize && a[c].validateSize() : a[c].premeasure && a[c].premeasure()); window.requestAnimationFrame && window.requestAnimationFrame(d.update)
    }; d.bezierX = 3; d.bezierY = 6; "complete" == document.readyState && d.handleLoad()
})(); (function () {
    var d = window.AmCharts; d.toBoolean = function (a, b) { if (void 0 === a) return b; switch (String(a).toLowerCase()) { case "true": case "yes": case "1": return !0; case "false": case "no": case "0": case null: return !1; default: return Boolean(a) } }; d.removeFromArray = function (a, b) { var c; if (void 0 !== b && void 0 !== a) for (c = a.length - 1; 0 <= c; c--) a[c] == b && a.splice(c, 1) }; d.getPath = function () {
        var a = document.getElementsByTagName("script"); if (a) for (var b = 0; b < a.length; b++) {
            var c = a[b].src; if (-1 !== c.search(/\/(amcharts|ammap)\.js/)) return c.replace(/\/(amcharts|ammap)\.js.*/,
            "/")
        }
    }; d.normalizeUrl = function (a) { return "" !== a && -1 === a.search(/\/$/) ? a + "/" : a }; d.isAbsolute = function (a) { return 0 === a.search(/^http[s]?:|^\//) }; d.isInArray = function (a, b) { for (var c = 0; c < a.length; c++) if (a[c] == b) return !0; return !1 }; d.getDecimals = function (a) { var b = 0; isNaN(a) || (a = String(a), -1 != a.indexOf("e-") ? b = Number(a.split("-")[1]) : -1 != a.indexOf(".") && (b = a.split(".")[1].length)); return b }; d.wordwrap = function (a, b, c, e) {
        var g, f, h, k; a += ""; if (1 > b) return a; g = -1; for (a = (k = a.split(/\r\n|\n|\r/)).length; ++g < a; k[g] +=
        h) { h = k[g]; for (k[g] = ""; h.length > b; k[g] += d.trim(h.slice(0, f)) + ((h = h.slice(f)).length ? c : "")) f = 2 == e || (f = h.slice(0, b + 1).match(/\S*(\s)?$/))[1] ? b : f.input.length - f[0].length || 1 == e && b || f.input.length + (f = h.slice(b).match(/^\S*/))[0].length; h = d.trim(h) } return k.join(c)
    }; d.trim = function (a) { return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") }; d.wrappedText = function (a, b, c, e, g, f, h, k) {
        var l = d.text(a, b, c, e, g, f, h); if (l) {
            var m = l.getBBox(); if (m.width > k) {
                var n = "\n"; d.isModern || (n = "<br>"); k = Math.floor(k / (m.width /
                b.length)); 2 < k && (k -= 2); b = d.wordwrap(b, k, n, !0); l.remove(); l = d.text(a, b, c, e, g, f, h)
            }
        } return l
    }; d.getStyle = function (a, b) { var c = ""; document.defaultView && document.defaultView.getComputedStyle ? c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (b = b.replace(/\-(\w)/g, function (a, b) { return b.toUpperCase() }), c = a.currentStyle[b]); return c }; d.removePx = function (a) { if (void 0 !== a) return Number(a.substring(0, a.length - 2)) }; d.getURL = function (a, b) {
        if (a) if ("_self" != b && b) if ("_top" == b && window.top) window.top.location.href =
        a; else if ("_parent" == b && window.parent) window.parent.location.href = a; else if ("_blank" == b) window.open(a); else { var c = document.getElementsByName(b)[0]; c ? c.src = a : (c = d.windows[b]) ? c.opener && !c.opener.closed ? c.location.href = a : d.windows[b] = window.open(a) : d.windows[b] = window.open(a) } else window.location.href = a
    }; d.ifArray = function (a) { return a && "object" == typeof a && 0 < a.length ? !0 : !1 }; d.callMethod = function (a, b) {
        var c; for (c = 0; c < b.length; c++) {
            var e = b[c]; if (e) {
                if (e[a]) e[a](); var d = e.length; if (0 < d) {
                    var f; for (f = 0; f <
                    d; f++) { var h = e[f]; if (h && h[a]) h[a]() }
                }
            }
        }
    }; d.toNumber = function (a) { return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, "")) }; d.toColor = function (a) { if ("" !== a && void 0 !== a) if (-1 != a.indexOf(",")) { a = a.split(","); var b; for (b = 0; b < a.length; b++) { var c = a[b].substring(a[b].length - 6, a[b].length); a[b] = "#" + c } } else a = a.substring(a.length - 6, a.length), a = "#" + a; return a }; d.toCoordinate = function (a, b, c) {
        var e; void 0 !== a && (a = String(a), c && c < b && (b = c), e = Number(a), -1 != a.indexOf("!") && (e = b - Number(a.substr(1))), -1 !=
        a.indexOf("%") && (e = b * Number(a.substr(0, a.length - 1)) / 100)); return e
    }; d.fitToBounds = function (a, b, c) { a < b && (a = b); a > c && (a = c); return a }; d.isDefined = function (a) { return void 0 === a ? !1 : !0 }; d.stripNumbers = function (a) { return a.replace(/[0-9]+/g, "") }; d.roundTo = function (a, b) { if (0 > b) return a; var c = Math.pow(10, b); return Math.round(a * c) / c }; d.toFixed = function (a, b) {
        var c = String(Math.round(a * Math.pow(10, b))); if (0 < b) {
            var e = c.length; if (e < b) { var d; for (d = 0; d < b - e; d++) c = "0" + c } e = c.substring(0, c.length - b); "" === e && (e = 0); return e +
            "." + c.substring(c.length - b, c.length)
        } return String(c)
    }; d.formatDuration = function (a, b, c, e, g, f) {
        var h = d.intervals, k = f.decimalSeparator; if (a >= h[b].contains) { var l = a - Math.floor(a / h[b].contains) * h[b].contains; "ss" == b ? (l = d.formatNumber(l, f), 1 == l.split(k)[0].length && (l = "0" + l)) : l = d.roundTo(l, f.precision); ("mm" == b || "hh" == b) && 10 > l && (l = "0" + l); c = l + "" + e[b] + "" + c; a = Math.floor(a / h[b].contains); b = h[b].nextInterval; return d.formatDuration(a, b, c, e, g, f) } "ss" == b && (a = d.formatNumber(a, f), 1 == a.split(k)[0].length && (a = "0" +
        a)); ("mm" == b || "hh" == b) && 10 > a && (a = "0" + a); c = a + "" + e[b] + "" + c; if (h[g].count > h[b].count) for (a = h[b].count; a < h[g].count; a++) b = h[b].nextInterval, "ss" == b || "mm" == b || "hh" == b ? c = "00" + e[b] + "" + c : "DD" == b && (c = "0" + e[b] + "" + c); ":" == c.charAt(c.length - 1) && (c = c.substring(0, c.length - 1)); return c
    }; d.formatNumber = function (a, b, c, e, g) {
        a = d.roundTo(a, b.precision); isNaN(c) && (c = b.precision); var f = b.decimalSeparator; b = b.thousandsSeparator; var h; h = 0 > a ? "-" : ""; a = Math.abs(a); var k = String(a), l = !1; -1 != k.indexOf("e") && (l = !0); 0 <= c && !l && (k =
        d.toFixed(a, c)); var m = ""; if (l) m = k; else { var k = k.split("."), l = String(k[0]), n; for (n = l.length; 0 <= n; n -= 3) m = n != l.length ? 0 !== n ? l.substring(n - 3, n) + b + m : l.substring(n - 3, n) + m : l.substring(n - 3, n); void 0 !== k[1] && (m = m + f + k[1]); void 0 !== c && 0 < c && "0" != m && (m = d.addZeroes(m, f, c)) } m = h + m; "" === h && !0 === e && 0 !== a && (m = "+" + m); !0 === g && (m += "%"); return m
    }; d.addZeroes = function (a, b, c) { a = a.split(b); void 0 === a[1] && 0 < c && (a[1] = "0"); return a[1].length < c ? (a[1] += "0", d.addZeroes(a[0] + b + a[1], b, c)) : void 0 !== a[1] ? a[0] + b + a[1] : a[0] }; d.scientificToNormal =
    function (a) { var b; a = String(a).split("e"); var c; if ("-" == a[1].substr(0, 1)) { b = "0."; for (c = 0; c < Math.abs(Number(a[1])) - 1; c++) b += "0"; b += a[0].split(".").join("") } else { var e = 0; b = a[0].split("."); b[1] && (e = b[1].length); b = a[0].split(".").join(""); for (c = 0; c < Math.abs(Number(a[1])) - e; c++) b += "0" } return b }; d.toScientific = function (a, b) { if (0 === a) return "0"; var c = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E), e = String(e).split(".").join(b); return String(e) + "e" + c }; d.randomColor = function () {
        return "#" + ("00000" + (16777216 * Math.random() <<
        0).toString(16)).substr(-6)
    }; d.hitTest = function (a, b, c) { var e = !1, g = a.x, f = a.x + a.width, h = a.y, k = a.y + a.height, l = d.isInRectangle; e || (e = l(g, h, b)); e || (e = l(g, k, b)); e || (e = l(f, h, b)); e || (e = l(f, k, b)); e || !0 === c || (e = d.hitTest(b, a, !0)); return e }; d.isInRectangle = function (a, b, c) { return a >= c.x - 5 && a <= c.x + c.width + 5 && b >= c.y - 5 && b <= c.y + c.height + 5 ? !0 : !1 }; d.isPercents = function (a) { if (-1 != String(a).indexOf("%")) return !0 }; d.formatValue = function (a, b, c, e, g, f, h, k) {
        if (b) {
            void 0 === g && (g = ""); var l; for (l = 0; l < c.length; l++) {
                var m = c[l],
                n = b[m]; void 0 !== n && (n = f ? d.addPrefix(n, k, h, e) : d.formatNumber(n, e), a = a.replace(new RegExp("\\[\\[" + g + "" + m + "\\]\\]", "g"), n))
            }
        } return a
    }; d.formatDataContextValue = function (a, b) { if (a) { var c = a.match(/\[\[.*?\]\]/g), e; for (e = 0; e < c.length; e++) { var d = c[e], d = d.substr(2, d.length - 4); void 0 !== b[d] && (a = a.replace(new RegExp("\\[\\[" + d + "\\]\\]", "g"), b[d])) } } return a }; d.massReplace = function (a, b) { for (var c in b) if (b.hasOwnProperty(c)) { var e = b[c]; void 0 === e && (e = ""); a = a.replace(c, e) } return a }; d.cleanFromEmpty = function (a) {
        return a.replace(/\[\[[^\]]*\]\]/g,
        "")
    }; d.addPrefix = function (a, b, c, e, g) {
        var f = d.formatNumber(a, e), h = "", k, l, m; if (0 === a) return "0"; 0 > a && (h = "-"); a = Math.abs(a); if (1 < a) for (k = b.length - 1; -1 < k; k--) { if (a >= b[k].number && (l = a / b[k].number, m = Number(e.precision), 1 > m && (m = 1), c = d.roundTo(l, m), m = d.formatNumber(c, { precision: -1, decimalSeparator: e.decimalSeparator, thousandsSeparator: e.thousandsSeparator }), !g || l == c)) { f = h + "" + m + "" + b[k].prefix; break } } else for (k = 0; k < c.length; k++) if (a <= c[k].number) {
            l = a / c[k].number; m = Math.abs(Math.floor(Math.log(l) * Math.LOG10E));
            l = d.roundTo(l, m); f = h + "" + l + "" + c[k].prefix; break
        } return f
    }; d.remove = function (a) { a && a.remove() }; d.getEffect = function (a) { ">" == a && (a = "easeOutSine"); "<" == a && (a = "easeInSine"); "elastic" == a && (a = "easeOutElastic"); return a }; d.getObjById = function (a, b) { var c, e; for (e = 0; e < a.length; e++) { var d = a[e]; if (d.id == b) { c = d; break } } return c }; d.applyTheme = function (a, b, c) { b || (b = d.theme); b && b[c] && d.extend(a, b[c]) }; d.isString = function (a) { return "string" == typeof a ? !0 : !1 }; d.extend = function (a, b, c) {
        var e; a || (a = {}); for (e in b) c ? a.hasOwnProperty(e) ||
        (a[e] = b[e]) : a[e] = b[e]; return a
    }; d.copyProperties = function (a, b) { for (var c in a) a.hasOwnProperty(c) && "events" != c && void 0 !== a[c] && "function" != typeof a[c] && "cname" != c && (b[c] = a[c]) }; d.processObject = function (a, b, c, e) { if (!1 === a instanceof b && (a = e ? d.extend(new b(c), a) : d.extend(a, new b(c), !0), a.listeners)) for (var g in a.listeners) b = a.listeners[g], a.addListener(b.event, b.method); return a }; d.fixNewLines = function (a) { var b = RegExp("\\n", "g"); a && (a = a.replace(b, "<br />")); return a }; d.fixBrakes = function (a) {
        if (d.isModern) {
            var b =
            RegExp("<br>", "g"); a && (a = a.replace(b, "\n"))
        } else a = d.fixNewLines(a); return a
    }; d.deleteObject = function (a, b) { if (a) { if (void 0 === b || null === b) b = 20; if (0 !== b) if ("[object Array]" === Object.prototype.toString.call(a)) for (var c = 0; c < a.length; c++) d.deleteObject(a[c], b - 1), a[c] = null; else if (a && !a.tagName) try { for (c in a) a[c] && ("object" == typeof a[c] && d.deleteObject(a[c], b - 1), "function" != typeof a[c] && (a[c] = null)) } catch (e) { } } }; d.bounce = function (a, b, c, e, d) {
        return (b /= d) < 1 / 2.75 ? 7.5625 * e * b * b + c : b < 2 / 2.75 ? e * (7.5625 * (b -= 1.5 /
        2.75) * b + .75) + c : b < 2.5 / 2.75 ? e * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : e * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    }; d.easeInOutQuad = function (a, b, c, e, d) { b /= d / 2; if (1 > b) return e / 2 * b * b + c; b--; return -e / 2 * (b * (b - 2) - 1) + c }; d.easeInSine = function (a, b, c, e, d) { return -e * Math.cos(b / d * (Math.PI / 2)) + e + c }; d.easeOutSine = function (a, b, c, e, d) { return e * Math.sin(b / d * (Math.PI / 2)) + c }; d.easeOutElastic = function (a, b, c, e, d) {
        a = 1.70158; var f = 0, h = e; if (0 === b) return c; if (1 == (b /= d)) return c + e; f || (f = .3 * d); h < Math.abs(e) ? (h = e, a = f / 4) : a = f / (2 * Math.PI) * Math.asin(e /
        h); return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * d - a) * Math.PI / f) + e + c
    }; d.fixStepE = function (a) { a = a.toExponential(0).split("e"); var b = Number(a[1]); 9 == Number(a[0]) && b++; return d.generateNumber(1, b) }; d.generateNumber = function (a, b) { var c = "", e; e = 0 > b ? Math.abs(b) - 1 : Math.abs(b); var d; for (d = 0; d < e; d++) c += "0"; return 0 > b ? Number("0." + c + String(a)) : Number(String(a) + c) }; d.setCN = function (a, b, c, e) {
        if (a.addClassNames && b && (b = b.node) && c) {
            var d = b.getAttribute("class"); a = a.classNamePrefix + "-"; e && (a = ""); d ? b.setAttribute("class",
            d + " " + a + c) : b.setAttribute("class", a + c)
        }
    }; d.parseDefs = function (a, b) { for (var c in a) { var e = typeof a[c]; if (0 < a[c].length && "object" == e) for (var g = 0; g < a[c].length; g++) e = document.createElementNS(d.SVG_NS, c), b.appendChild(e), d.parseDefs(a[c][g], e); else "object" == e ? (e = document.createElementNS(d.SVG_NS, c), b.appendChild(e), d.parseDefs(a[c], e)) : b.setAttribute(c, a[c]) } }
})(); (function () {
    var d = window.AmCharts; d.AmDraw = d.Class({
        construct: function (a, b, c, e) {
            d.SVG_NS = "http://www.w3.org/2000/svg"; d.SVG_XLINK = "http://www.w3.org/1999/xlink"; d.hasSVG = !!document.createElementNS && !!document.createElementNS(d.SVG_NS, "svg").createSVGRect; 1 > b && (b = 10); 1 > c && (c = 10); this.div = a; this.width = b; this.height = c; this.rBin = document.createElement("div"); d.hasSVG ? (d.SVG = !0, b = this.createSvgElement("svg"), a.appendChild(b), this.container = b, this.addDefs(e), this.R = new d.SVGRenderer(this)) : d.isIE && d.VMLRenderer &&
            (d.VML = !0, d.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), 31 > document.styleSheets.length ? (b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), d.vmlStyleSheet = b) : document.styleSheets[0].addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true")), this.container = a, this.R = new d.VMLRenderer(this, e), this.R.disableSelection(a))
        }, createSvgElement: function (a) {
            return document.createElementNS(d.SVG_NS,
            a)
        }, circle: function (a, b, c, e) { var g = new d.AmDObject("circle", this); g.attr({ r: c, cx: a, cy: b }); this.addToContainer(g.node, e); return g }, ellipse: function (a, b, c, e, g) { var f = new d.AmDObject("ellipse", this); f.attr({ rx: c, ry: e, cx: a, cy: b }); this.addToContainer(f.node, g); return f }, setSize: function (a, b) { 0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px") }, rect: function (a, b, c, e, g, f, h) {
            var k = new d.AmDObject("rect", this); d.VML && (g = Math.round(100 * g / Math.min(c, e)), c += 2 * f, e += 2 * f, k.bw = f, k.node.style.marginLeft =
            -f, k.node.style.marginTop = -f); 1 > c && (c = 1); 1 > e && (e = 1); k.attr({ x: a, y: b, width: c, height: e, rx: g, ry: g, "stroke-width": f }); this.addToContainer(k.node, h); return k
        }, image: function (a, b, c, e, g, f) { var h = new d.AmDObject("image", this); h.attr({ x: b, y: c, width: e, height: g }); this.R.path(h, a); this.addToContainer(h.node, f); return h }, addToContainer: function (a, b) { b || (b = this.container); b.appendChild(a) }, text: function (a, b, c) { return this.R.text(a, b, c) }, path: function (a, b, c, e) {
            var g = new d.AmDObject("path", this); e || (e = "100,100");
            g.attr({ cs: e }); c ? g.attr({ dd: a }) : g.attr({ d: a }); this.addToContainer(g.node, b); return g
        }, set: function (a) { return this.R.set(a) }, remove: function (a) { if (a) { var b = this.rBin; b.appendChild(a); b.innerHTML = "" } }, renderFix: function () { var a = this.container, b = a.style; b.top = "0px"; b.left = "0px"; try { var c = a.getBoundingClientRect(), e = c.left - Math.round(c.left), d = c.top - Math.round(c.top); e && (b.left = e + "px"); d && (b.top = d + "px") } catch (f) { } }, update: function () { this.R.update() }, addDefs: function (a) {
            if (d.hasSVG) {
                var b = this.createSvgElement("desc"),
                c = this.container; c.setAttribute("version", "1.1"); c.style.position = "absolute"; this.setSize(this.width, this.height); d.rtl && (c.setAttribute("direction", "rtl"), c.style.left = "auto", c.style.right = "0px"); a && (a.addCodeCredits && b.appendChild(document.createTextNode("JavaScript chart by amCharts " + a.version)), c.appendChild(b), a.defs && (b = this.createSvgElement("defs"), c.appendChild(b), d.parseDefs(a.defs, b), this.defs = b))
            }
        }
    })
})(); (function () {
    var d = window.AmCharts; d.AmDObject = d.Class({
        construct: function (a, b) { this.D = b; this.R = b.R; this.node = this.R.create(this, a); this.y = this.x = 0; this.scale = 1 }, attr: function (a) { this.R.attr(this, a); return this }, getAttr: function (a) { return this.node.getAttribute(a) }, setAttr: function (a, b) { this.R.setAttr(this, a, b); return this }, clipRect: function (a, b, c, e) { this.R.clipRect(this, a, b, c, e) }, translate: function (a, b, c, e) {
            e || (a = Math.round(a), b = Math.round(b)); this.R.move(this, a, b, c); this.x = a; this.y = b; this.scale =
            c; this.angle && this.rotate(this.angle)
        }, rotate: function (a, b) { this.R.rotate(this, a, b); this.angle = a }, animate: function (a, b, c) { for (var e in a) if (a.hasOwnProperty(e)) { var g = e, f = a[e]; c = d.getEffect(c); this.R.animate(this, g, f, b, c) } }, push: function (a) { if (a) { var b = this.node; b.appendChild(a.node); var c = a.clipPath; c && b.appendChild(c); (a = a.grad) && b.appendChild(a) } }, text: function (a) { this.R.setText(this, a) }, remove: function () { this.stop(); this.R.remove(this) }, clear: function () {
            var a = this.node; if (a.hasChildNodes()) for (; 1 <=
            a.childNodes.length;) a.removeChild(a.firstChild)
        }, hide: function () { this.setAttr("visibility", "hidden") }, show: function () { this.setAttr("visibility", "visible") }, getBBox: function () { return this.R.getBBox(this) }, toFront: function () { var a = this.node; if (a) { this.prevNextNode = a.nextSibling; var b = a.parentNode; b && b.appendChild(a) } }, toPrevious: function () { var a = this.node; a && this.prevNextNode && (a = a.parentNode) && a.insertBefore(this.prevNextNode, null) }, toBack: function () {
            var a = this.node; if (a) {
                this.prevNextNode = a.nextSibling;
                var b = a.parentNode; if (b) { var c = b.firstChild; c && b.insertBefore(a, c) }
            }
        }, mouseover: function (a) { this.R.addListener(this, "mouseover", a); return this }, mouseout: function (a) { this.R.addListener(this, "mouseout", a); return this }, click: function (a) { this.R.addListener(this, "click", a); return this }, dblclick: function (a) { this.R.addListener(this, "dblclick", a); return this }, mousedown: function (a) { this.R.addListener(this, "mousedown", a); return this }, mouseup: function (a) { this.R.addListener(this, "mouseup", a); return this }, touchmove: function (a) {
            this.R.addListener(this,
            "touchmove", a); return this
        }, touchstart: function (a) { this.R.addListener(this, "touchstart", a); return this }, touchend: function (a) { this.R.addListener(this, "touchend", a); return this }, contextmenu: function (a) { this.node.addEventListener ? this.node.addEventListener("contextmenu", a, !0) : this.R.addListener(this, "contextmenu", a); return this }, stop: function () { d.removeFromArray(this.R.animations, this.an_translate); d.removeFromArray(this.R.animations, this.an_y); d.removeFromArray(this.R.animations, this.an_x) }, length: function () { return this.node.childNodes.length },
        gradient: function (a, b, c) { this.R.gradient(this, a, b, c) }, pattern: function (a, b, c) { a && this.R.pattern(this, a, b, c) }
    })
})(); (function () {
    var d = window.AmCharts; d.SVGRenderer = d.Class({
        construct: function (a) { this.D = a; this.animations = [] }, create: function (a, b) { return document.createElementNS(d.SVG_NS, b) }, attr: function (a, b) { for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c]) }, setAttr: function (a, b, c) { void 0 !== c && a.node.setAttribute(b, c) }, animate: function (a, b, c, e, g) {
            a.animationFinished = !1; var f = a.node; a["an_" + b] && d.removeFromArray(this.animations, a["an_" + b]); "translate" == b ? (f = (f = f.getAttribute("transform")) ? String(f).substring(10,
            f.length - 1) : "0,0", f = f.split(", ").join(" "), f = f.split(" ").join(","), 0 === f && (f = "0,0")) : f = Number(f.getAttribute(b)); c = { obj: a, frame: 0, attribute: b, from: f, to: c, time: e, effect: g }; this.animations.push(c); a["an_" + b] = c
        }, update: function () {
            var a, b = this.animations; for (a = b.length - 1; 0 <= a; a--) {
                var c = b[a], e = c.time * d.updateRate, g = c.frame + 1, f = c.obj, h = c.attribute, k, l, m; g <= e ? (c.frame++, "translate" == h ? (k = c.from.split(","), h = Number(k[0]), k = Number(k[1]), isNaN(k) && (k = 0), l = c.to.split(","), m = Number(l[0]), l = Number(l[1]), m =
                0 === m - h ? m : Math.round(d[c.effect](0, g, h, m - h, e)), c = 0 === l - k ? l : Math.round(d[c.effect](0, g, k, l - k, e)), h = "transform", c = "translate(" + m + "," + c + ")") : (l = Number(c.from), k = Number(c.to), m = k - l, c = d[c.effect](0, g, l, m, e), isNaN(c) && (c = k), 0 === m && this.animations.splice(a, 1)), this.setAttr(f, h, c)) : ("translate" == h ? (l = c.to.split(","), m = Number(l[0]), l = Number(l[1]), f.translate(m, l)) : (k = Number(c.to), this.setAttr(f, h, k)), f.animationFinished = !0, this.animations.splice(a, 1))
            }
        }, getBBox: function (a) {
            if (a = a.node) try { return a.getBBox() } catch (b) { } return {
                width: 0,
                height: 0, x: 0, y: 0
            }
        }, path: function (a, b) { a.node.setAttributeNS(d.SVG_XLINK, "xlink:href", b) }, clipRect: function (a, b, c, e, g) { var f = a.node, h = a.clipPath; h && this.D.remove(h); var k = f.parentNode; k && (f = document.createElementNS(d.SVG_NS, "clipPath"), h = d.getUniqueId(), f.setAttribute("id", h), this.D.rect(b, c, e, g, 0, 0, f), k.appendChild(f), b = "#", d.baseHref && !d.isIE && (b = this.removeTarget(window.location.href) + b), this.setAttr(a, "clip-path", "url(" + b + h + ")"), this.clipPathC++, a.clipPath = f) }, text: function (a, b, c) {
            var e = new d.AmDObject("text",
            this.D); a = String(a).split("\n"); var g = d.removePx(b["font-size"]), f; for (f = 0; f < a.length; f++) { var h = this.create(null, "tspan"); h.appendChild(document.createTextNode(a[f])); h.setAttribute("y", (g + 2) * f + Math.round(g / 2)); h.setAttribute("x", 0); e.node.appendChild(h) } e.node.setAttribute("y", Math.round(g / 2)); this.attr(e, b); this.D.addToContainer(e.node, c); return e
        }, setText: function (a, b) { var c = a.node; c && (c.removeChild(c.firstChild), c.appendChild(document.createTextNode(b))) }, move: function (a, b, c, e) {
            isNaN(b) && (b =
            0); isNaN(c) && (c = 0); b = "translate(" + b + "," + c + ")"; e && (b = b + " scale(" + e + ")"); this.setAttr(a, "transform", b)
        }, rotate: function (a, b) { var c = a.node.getAttribute("transform"), e = "rotate(" + b + ")"; c && (e = c + " " + e); this.setAttr(a, "transform", e) }, set: function (a) { var b = new d.AmDObject("g", this.D); this.D.container.appendChild(b.node); if (a) { var c; for (c = 0; c < a.length; c++) b.push(a[c]) } return b }, addListener: function (a, b, c) { a.node["on" + b] = c }, gradient: function (a, b, c, e) {
            var g = a.node, f = a.grad; f && this.D.remove(f); b = document.createElementNS(d.SVG_NS,
            b); f = d.getUniqueId(); b.setAttribute("id", f); if (!isNaN(e)) { var h = 0, k = 0, l = 0, m = 0; 90 == e ? l = 100 : 270 == e ? m = 100 : 180 == e ? h = 100 : 0 === e && (k = 100); b.setAttribute("x1", h + "%"); b.setAttribute("x2", k + "%"); b.setAttribute("y1", l + "%"); b.setAttribute("y2", m + "%") } for (e = 0; e < c.length; e++) h = document.createElementNS(d.SVG_NS, "stop"), k = 100 * e / (c.length - 1), 0 === e && (k = 0), h.setAttribute("offset", k + "%"), h.setAttribute("stop-color", c[e]), b.appendChild(h); g.parentNode.appendChild(b); c = "#"; d.baseHref && !d.isIE && (c = this.removeTarget(window.location.href) +
            c); g.setAttribute("fill", "url(" + c + f + ")"); a.grad = b
        }, removeTarget: function (a) { return a.split("#")[0] }, pattern: function (a, b, c, e) {
            var g = a.node; isNaN(c) && (c = 1); var f = a.patternNode; f && this.D.remove(f); var f = document.createElementNS(d.SVG_NS, "pattern"), h = d.getUniqueId(), k = b; b.url && (k = b.url); d.isAbsolute(k) || (k = e + k); e = Number(b.width); isNaN(e) && (e = 4); var l = Number(b.height); isNaN(l) && (l = 4); e /= c; l /= c; c = b.x; isNaN(c) && (c = 0); var m = -Math.random() * Number(b.randomX); isNaN(m) || (c = m); m = b.y; isNaN(m) && (m = 0); var n = -Math.random() *
            Number(b.randomY); isNaN(n) || (m = n); f.setAttribute("id", h); f.setAttribute("width", e); f.setAttribute("height", l); f.setAttribute("patternUnits", "userSpaceOnUse"); f.setAttribute("xlink:href", k); b.color && (n = document.createElementNS(d.SVG_NS, "rect"), n.setAttributeNS(null, "height", e), n.setAttributeNS(null, "width", l), n.setAttributeNS(null, "fill", b.color), f.appendChild(n)); this.D.image(k, 0, 0, e, l, f).translate(c, m); k = "#"; d.baseHref && !d.isIE && (k = this.removeTarget(window.location.href) + k); g.setAttribute("fill",
            "url(" + k + h + ")"); a.patternNode = f; g.parentNode.appendChild(f)
        }, remove: function (a) { a.clipPath && this.D.remove(a.clipPath); a.grad && this.D.remove(a.grad); a.patternNode && this.D.remove(a.patternNode); this.D.remove(a.node) }
    })
})(); (function () {
    var d = window.AmCharts; d.AmChart = d.Class({
        construct: function (a) {
            this.svgIcons = this.tapToActivate = !0; this.theme = a; this.classNamePrefix = "amcharts"; this.addClassNames = !1; this.version = "3.18.6"; d.addChart(this); this.createEvents("buildStarted", "dataUpdated", "init", "rendered", "drawn", "failed", "resized", "animationFinished"); this.height = this.width = "100%"; this.dataChanged = !0; this.chartCreated = !1; this.previousWidth = this.previousHeight = 0; this.backgroundColor = "#FFFFFF"; this.borderAlpha = this.backgroundAlpha =
            0; this.color = this.borderColor = "#000000"; this.fontFamily = "Verdana"; this.fontSize = 11; this.usePrefixes = !1; this.autoResize = !0; this.autoDisplay = !1; this.addCodeCredits = !0; this.precision = -1; this.percentPrecision = 2; this.decimalSeparator = "."; this.thousandsSeparator = ","; this.labels = []; this.allLabels = []; this.titles = []; this.marginRight = this.marginLeft = this.autoMarginOffset = 0; this.timeOuts = []; this.creditsPosition = "top-left"; var b = document.createElement("div"), c = b.style; c.overflow = "hidden"; c.position = "relative";
            c.textAlign = "left"; this.chartDiv = b; b = document.createElement("div"); c = b.style; c.overflow = "hidden"; c.position = "relative"; c.textAlign = "left"; this.legendDiv = b; this.titleHeight = 0; this.hideBalloonTime = 150; this.handDrawScatter = 2; this.handDrawThickness = 1; this.prefixesOfBigNumbers = [{ number: 1E3, prefix: "k" }, { number: 1E6, prefix: "M" }, { number: 1E9, prefix: "G" }, { number: 1E12, prefix: "T" }, { number: 1E15, prefix: "P" }, { number: 1E18, prefix: "E" }, { number: 1E21, prefix: "Z" }, { number: 1E24, prefix: "Y" }]; this.prefixesOfSmallNumbers = [{
                number: 1E-24,
                prefix: "y"
            }, { number: 1E-21, prefix: "z" }, { number: 1E-18, prefix: "a" }, { number: 1E-15, prefix: "f" }, { number: 1E-12, prefix: "p" }, { number: 1E-9, prefix: "n" }, { number: 1E-6, prefix: "\u03bc" }, { number: .001, prefix: "m" }]; this.panEventsEnabled = !0; this.product = "amcharts"; this.animations = []; this.balloon = new d.AmBalloon(this.theme); this.balloon.chart = this; this.processTimeout = 0; this.processCount = 1E3; this.animatable = []; d.applyTheme(this, a, "AmChart")
        }, drawChart: function () {
            0 < this.realWidth && 0 < this.realHeight && (this.drawBackground(),
            this.redrawLabels(), this.drawTitles(), this.brr(), this.renderFix(), this.chartDiv && (this.boundingRect = this.chartDiv.getBoundingClientRect()))
        }, drawBackground: function () {
            d.remove(this.background); var a = this.container, b = this.backgroundColor, c = this.backgroundAlpha, e = this.set; d.isModern || 0 !== c || (c = .001); var g = this.updateWidth(); this.realWidth = g; var f = this.updateHeight(); this.realHeight = f; b = d.polygon(a, [0, g - 1, g - 1, 0], [0, 0, f - 1, f - 1], b, c, 1, this.borderColor, this.borderAlpha); d.setCN(this, b, "bg"); this.background =
            b; e.push(b); if (b = this.backgroundImage) a = a.image(b, 0, 0, g, f), d.setCN(this, b, "bg-image"), this.bgImg = a, e.push(a)
        }, drawTitles: function (a) {
            var b = this.titles; this.titleHeight = 0; if (d.ifArray(b)) {
                var c = 20, e; for (e = 0; e < b.length; e++) {
                    var g = b[e], g = d.processObject(g, d.Title, this.theme); if (!1 !== g.enabled) {
                        var f = g.color; void 0 === f && (f = this.color); var h = g.size; isNaN(h) && (h = this.fontSize + 2); isNaN(g.alpha); var k = this.marginLeft, l = !0; void 0 !== g.bold && (l = g.bold); f = d.wrappedText(this.container, g.text, f, this.fontFamily,
                        h, "middle", l, this.realWidth - 35); f.translate(k + (this.realWidth - this.marginRight - k) / 2, c); f.node.style.pointerEvents = "none"; g.sprite = f; d.setCN(this, f, "title"); g.id && d.setCN(this, f, "title-" + g.id); f.attr({ opacity: g.alpha }); c += f.getBBox().height + 5; a ? f.remove() : this.freeLabelsSet.push(f)
                    }
                } this.titleHeight = c - 10
            }
        }, write: function (a) {
            var b = this; if (b.listeners) for (var c = 0; c < b.listeners.length; c++) { var e = b.listeners[c]; b.addListener(e.event, e.method) } b.fire({ type: "buildStarted", chart: b }); b.afterWriteTO && clearTimeout(b.afterWriteTO);
            0 < b.processTimeout ? b.afterWriteTO = setTimeout(function () { b.afterWrite.call(b, a) }, b.processTimeout) : b.afterWrite(a)
        }, afterWrite: function (a) {
            if (a = "object" != typeof a ? document.getElementById(a) : a) {
                for (; a.firstChild;) a.removeChild(a.firstChild); this.div = a; a.style.overflow = "hidden"; a.style.textAlign = "left"; var b = this.chartDiv, c = this.legendDiv, e = this.legend, g = c.style, f = b.style; this.measure(); this.previousHeight = this.divRealHeight; this.previousWidth = this.divRealWidth; var h, k = document.createElement("div");
                h = k.style; h.position = "relative"; this.containerDiv = k; k.className = this.classNamePrefix + "-main-div"; b.className = this.classNamePrefix + "-chart-div"; a.appendChild(k); var l = this.exportConfig; l && d.AmExport && !this.AmExport && (this.AmExport = new d.AmExport(this, l)); this.amExport && d.AmExport && (this.AmExport = d.extend(this.amExport, new d.AmExport(this), !0)); this.AmExport && this.AmExport.init && this.AmExport.init(); if (e) if (e = this.addLegend(e, e.divId), e.enabled) switch (e.position) {
                    case "bottom": k.appendChild(b); k.appendChild(c);
                        break; case "top": k.appendChild(c); k.appendChild(b); break; case "absolute": h.width = a.style.width; h.height = a.style.height; g.position = "absolute"; f.position = "absolute"; void 0 !== e.left && (g.left = e.left + "px"); void 0 !== e.right && (g.right = e.right + "px"); void 0 !== e.top && (g.top = e.top + "px"); void 0 !== e.bottom && (g.bottom = e.bottom + "px"); e.marginLeft = 0; e.marginRight = 0; k.appendChild(b); k.appendChild(c); break; case "right": h.width = a.style.width; h.height = a.style.height; g.position = "relative"; f.position = "absolute"; k.appendChild(b);
                            k.appendChild(c); break; case "left": h.width = a.style.width; h.height = a.style.height; g.position = "absolute"; f.position = "relative"; k.appendChild(b); k.appendChild(c); break; case "outside": k.appendChild(b)
                } else k.appendChild(b); else k.appendChild(b); this.listenersAdded || (this.addListeners(), this.listenersAdded = !0); this.initChart()
            }
        }, createLabelsSet: function () { d.remove(this.labelsSet); this.labelsSet = this.container.set(); this.freeLabelsSet.push(this.labelsSet) }, initChart: function () {
            this.balloon = d.processObject(this.balloon,
            d.AmBalloon, this.theme); window.AmCharts_path && (this.path = window.AmCharts_path); void 0 === this.path && (this.path = d.getPath()); void 0 === this.path && (this.path = "amcharts/"); this.path = d.normalizeUrl(this.path); void 0 === this.pathToImages && (this.pathToImages = this.path + "images/"); this.initHC || (d.callInitHandler(this), this.initHC = !0); d.applyLang(this.language, this); var a = this.numberFormatter; a && (isNaN(a.precision) || (this.precision = a.precision), void 0 !== a.thousandsSeparator && (this.thousandsSeparator = a.thousandsSeparator),
            void 0 !== a.decimalSeparator && (this.decimalSeparator = a.decimalSeparator)); (a = this.percentFormatter) && !isNaN(a.precision) && (this.percentPrecision = a.precision); this.nf = { precision: this.precision, thousandsSeparator: this.thousandsSeparator, decimalSeparator: this.decimalSeparator }; this.pf = { precision: this.percentPrecision, thousandsSeparator: this.thousandsSeparator, decimalSeparator: this.decimalSeparator }; this.destroy(); (a = this.container) ? (a.container.innerHTML = "", a.width = this.realWidth, a.height = this.realHeight,
            a.addDefs(this), this.chartDiv.appendChild(a.container)) : a = new d.AmDraw(this.chartDiv, this.realWidth, this.realHeight, this); this.container = a; this.extension = ".png"; this.svgIcons && d.SVG && (this.extension = ".svg"); this.checkDisplay(); a.chart = this; d.VML || d.SVG ? (a.handDrawn = this.handDrawn, a.handDrawScatter = this.handDrawScatter, a.handDrawThickness = this.handDrawThickness, d.remove(this.set), this.set = a.set(), d.remove(this.gridSet), this.gridSet = a.set(), d.remove(this.cursorLineSet), this.cursorLineSet = a.set(), d.remove(this.graphsBehindSet),
            this.graphsBehindSet = a.set(), d.remove(this.bulletBehindSet), this.bulletBehindSet = a.set(), d.remove(this.columnSet), this.columnSet = a.set(), d.remove(this.graphsSet), this.graphsSet = a.set(), d.remove(this.trendLinesSet), this.trendLinesSet = a.set(), d.remove(this.axesSet), this.axesSet = a.set(), d.remove(this.cursorSet), this.cursorSet = a.set(), d.remove(this.scrollbarsSet), this.scrollbarsSet = a.set(), d.remove(this.bulletSet), this.bulletSet = a.set(), d.remove(this.freeLabelsSet), this.freeLabelsSet = a.set(), d.remove(this.axesLabelsSet),
            this.axesLabelsSet = a.set(), d.remove(this.balloonsSet), this.balloonsSet = a.set(), d.remove(this.plotBalloonsSet), this.plotBalloonsSet = a.set(), d.remove(this.zoomButtonSet), this.zoomButtonSet = a.set(), d.remove(this.zbSet), this.zbSet = null, d.remove(this.linkSet), this.linkSet = a.set()) : this.fire({ type: "failed", chart: this })
        }, premeasure: function () {
            var a = this.div; if (a) {
                this.boundingRect = this.chartDiv.getBoundingClientRect(); var b = a.offsetWidth, c = a.offsetHeight; a.clientHeight && (b = a.clientWidth, c = a.clientHeight);
                if (b != this.mw || c != this.mh) this.mw = b, this.mh = c, this.measure()
            }
        }, measure: function () {
            var a = this.div; if (a) {
                var b = this.chartDiv, c = a.offsetWidth, e = a.offsetHeight, g = this.container; a.clientHeight && (c = a.clientWidth, e = a.clientHeight); var f = d.removePx(d.getStyle(a, "padding-left")), h = d.removePx(d.getStyle(a, "padding-right")), k = d.removePx(d.getStyle(a, "padding-top")), l = d.removePx(d.getStyle(a, "padding-bottom")); isNaN(f) || (c -= f); isNaN(h) || (c -= h); isNaN(k) || (e -= k); isNaN(l) || (e -= l); f = a.style; a = f.width; f = f.height;
                -1 != a.indexOf("px") && (c = d.removePx(a)); -1 != f.indexOf("px") && (e = d.removePx(f)); e = Math.round(e); c = Math.round(c); a = Math.round(d.toCoordinate(this.width, c)); f = Math.round(d.toCoordinate(this.height, e)); (c != this.previousWidth || e != this.previousHeight) && 0 < a && 0 < f && (b.style.width = a + "px", b.style.height = f + "px", b.style.padding = 0, g && g.setSize(a, f), this.balloon = d.processObject(this.balloon, d.AmBalloon, this.theme), this.balloon.setBounds(2, 2, a - 2, f)); this.balloon.chart = this; this.realWidth = a; this.realHeight = f; this.divRealWidth =
                c; this.divRealHeight = e
            }
        }, checkDisplay: function () { if (this.autoDisplay && this.container) { var a = d.rect(this.container, 10, 10), b = a.getBBox(); 0 === b.width && 0 === b.height && (this.divRealHeight = this.divRealWidth = this.realHeight = this.realWidth = 0, this.previousWidth = this.previousHeight = NaN); a.remove() } }, destroy: function () { this.chartDiv.innerHTML = ""; this.clearTimeOuts(); this.legend && this.legend.destroy() }, clearTimeOuts: function () {
            var a = this.timeOuts; if (a) { var b; for (b = 0; b < a.length; b++) clearTimeout(a[b]) } this.timeOuts =
            []
        }, clear: function (a) { d.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]); this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null; this.clearTimeOuts(); this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv)); a || d.removeChart(this); if (a = this.div) for (; a.firstChild;) a.removeChild(a.firstChild); this.legend && this.legend.destroy() }, setMouseCursor: function (a) {
            "auto" == a && d.isNN && (a = "default"); this.chartDiv.style.cursor =
            a; this.legendDiv.style.cursor = a
        }, redrawLabels: function () { this.labels = []; var a = this.allLabels; this.createLabelsSet(); var b; for (b = 0; b < a.length; b++) this.drawLabel(a[b]) }, drawLabel: function (a) {
            if (this.container && !1 !== a.enabled) {
                a = d.processObject(a, d.Label, this.theme); var b = a.y, c = a.text, e = a.align, g = a.size, f = a.color, h = a.rotation, k = a.alpha, l = a.bold, m = d.toCoordinate(a.x, this.realWidth), b = d.toCoordinate(b, this.realHeight); m || (m = 0); b || (b = 0); void 0 === f && (f = this.color); isNaN(g) && (g = this.fontSize); e || (e = "start");
                "left" == e && (e = "start"); "right" == e && (e = "end"); "center" == e && (e = "middle", h ? b = this.realHeight - b + b / 2 : m = this.realWidth / 2 - m); void 0 === k && (k = 1); void 0 === h && (h = 0); b += g / 2; c = d.text(this.container, c, f, this.fontFamily, g, e, l, k); c.translate(m, b); d.setCN(this, c, "label"); a.id && d.setCN(this, c, "label-" + a.id); 0 !== h && c.rotate(h); a.url ? (c.setAttr("cursor", "pointer"), c.click(function () { d.getURL(a.url) })) : c.node.style.pointerEvents = "none"; this.labelsSet.push(c); this.labels.push(c)
            }
        }, addLabel: function (a, b, c, e, d, f, h, k, l, m) {
            a =
            { x: a, y: b, text: c, align: e, size: d, color: f, alpha: k, rotation: h, bold: l, url: m, enabled: !0 }; this.container && this.drawLabel(a); this.allLabels.push(a)
        }, clearLabels: function () { var a = this.labels, b; for (b = a.length - 1; 0 <= b; b--) a[b].remove(); this.labels = []; this.allLabels = [] }, updateHeight: function () { var a = this.divRealHeight, b = this.legend; if (b) { var c = this.legendDiv.offsetHeight, b = b.position; if ("top" == b || "bottom" == b) { a -= c; if (0 > a || isNaN(a)) a = 0; this.chartDiv.style.height = a + "px" } } return a }, updateWidth: function () {
            var a = this.divRealWidth,
            b = this.divRealHeight, c = this.legend; if (c) { var e = this.legendDiv, d = e.offsetWidth; isNaN(c.width) || (d = c.width); c.ieW && (d = c.ieW); var f = e.offsetHeight, e = e.style, h = this.chartDiv.style, c = c.position; if ("right" == c || "left" == c) { a -= d; if (0 > a || isNaN(a)) a = 0; h.width = a + "px"; this.balloon.setBounds(2, 2, a - 2, this.realHeight); "left" == c ? (h.left = d + "px", e.left = "0px") : (h.left = "0px", e.left = a + "px"); b > f && (e.top = (b - f) / 2 + "px") } } return a
        }, getTitleHeight: function () { this.drawTitles(!0); return this.titleHeight }, addTitle: function (a, b,
        c, e, d) { isNaN(b) && (b = this.fontSize + 2); a = { text: a, size: b, color: c, alpha: e, bold: d, enabled: !0 }; this.titles.push(a); return a }, handleWheel: function (a) { var b = 0; a || (a = window.event); a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b = -a.detail / 3); b && this.handleWheelReal(b, a.shiftKey); a.preventDefault && a.preventDefault() }, handleWheelReal: function () { }, handleDocTouchStart: function () { this.hideBalloonReal(); this.handleMouseMove(); this.tmx = this.mouseX; this.tmy = this.mouseY }, handleDocTouchEnd: function () {
            -.5 < this.tmx && this.tmx <
            this.divRealWidth + 1 && 0 < this.tmy && this.tmy < this.divRealHeight ? (this.handleMouseMove(), 4 > Math.abs(this.mouseX - this.tmx) && 4 > Math.abs(this.mouseY - this.tmy) && (this.tapped = !0)) : this.tapped = !1
        }, addListeners: function () {
            var a = this, b = a.chartDiv; document.addEventListener ? (a.panEventsEnabled && (b.style.msTouchAction = "none", b.style.touchAction = "none"), "ontouchstart" in document.documentElement && (b.addEventListener("touchstart", function (b) { a.handleTouchStart.call(a, b) }, !0), b.addEventListener("touchmove", function (b) {
                a.handleMouseMove.call(a,
                b)
            }, !0), b.addEventListener("touchend", function (b) { a.handleTouchEnd.call(a, b) }, !0), document.addEventListener("touchstart", function (b) { a.handleDocTouchStart.call(a, b) }), document.addEventListener("touchend", function (b) { a.handleDocTouchEnd.call(a, b) })), b.addEventListener("mousedown", function (b) { a.mouseIsOver = !0; a.handleMouseMove.call(a, b); a.handleMouseDown.call(a, b) }, !0), b.addEventListener("mouseover", function (b) { a.handleMouseOver.call(a, b) }, !0), b.addEventListener("mouseout", function (b) {
                a.handleMouseOut.call(a,
                b)
            }, !0)) : (b.attachEvent("onmousedown", function (b) { a.handleMouseDown.call(a, b) }), b.attachEvent("onmouseover", function (b) { a.handleMouseOver.call(a, b) }), b.attachEvent("onmouseout", function (b) { a.handleMouseOut.call(a, b) }))
        }, dispDUpd: function () {
            this.skipEvents || (this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, this.fire({ type: "dataUpdated", chart: this })), this.chartCreated || (this.chartCreated = !0, this.fire({ type: "init", chart: this })), this.chartRendered || (this.fire({ type: "rendered", chart: this }), this.chartRendered =
            !0), this.fire({ type: "drawn", chart: this })); this.skipEvents = !1
        }, validateSize: function () {
            var a = this; a.premeasure(); a.checkDisplay(); if (a.divRealWidth != a.previousWidth || a.divRealHeight != a.previousHeight) {
                var b = a.legend; if (0 < a.realWidth && 0 < a.realHeight) {
                    a.sizeChanged = !0; if (b) { a.legendInitTO && clearTimeout(a.legendInitTO); var c = setTimeout(function () { b.invalidateSize() }, 10); a.timeOuts.push(c); a.legendInitTO = c } a.marginsUpdated = "xy" != a.type ? !1 : !0; clearTimeout(a.initTO); c = setTimeout(function () { a.initChart() },
                    10); a.timeOuts.push(c); a.initTO = c
                } a.renderFix(); b && b.renderFix && b.renderFix(); clearTimeout(a.resizedTO); a.resizedTO = setTimeout(function () { a.fire({ type: "resized", chart: a }) }, 10); a.previousHeight = a.divRealHeight; a.previousWidth = a.divRealWidth
            }
        }, invalidateSize: function () { this.previousHeight = this.previousWidth = NaN; this.invalidateSizeReal() }, invalidateSizeReal: function () {
            var a = this; a.marginsUpdated = !1; clearTimeout(a.validateTO); var b = setTimeout(function () { a.validateSize() }, 5); a.timeOuts.push(b); a.validateTO =
            b
        }, validateData: function (a) { this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = !1, this.initChart(a)) }, validateNow: function (a, b) { this.initTO && clearTimeout(this.initTO); a && (this.dataChanged = !0, this.marginsUpdated = !1); this.skipEvents = b; this.chartRendered = !1; this.write(this.div) }, showItem: function (a) { a.hidden = !1; this.initChart() }, hideItem: function (a) { a.hidden = !0; this.initChart() }, hideBalloon: function () {
            var a = this; clearTimeout(a.hoverInt); clearTimeout(a.balloonTO); a.hoverInt = setTimeout(function () { a.hideBalloonReal.call(a) },
            a.hideBalloonTime)
        }, cleanChart: function () { }, hideBalloonReal: function () { var a = this.balloon; a && a.hide() }, showBalloon: function (a, b, c, e, d) { var f = this; clearTimeout(f.balloonTO); clearTimeout(f.hoverInt); f.balloonTO = setTimeout(function () { f.showBalloonReal.call(f, a, b, c, e, d) }, 1) }, showBalloonReal: function (a, b, c, e, d) {
            this.handleMouseMove(); var f = this.balloon; f.enabled && (f.followCursor(!1), f.changeColor(b), !c || f.fixedPosition ? (f.setPosition(e, d), isNaN(e) || isNaN(d) ? f.followCursor(!0) : f.followCursor(!1)) : f.followCursor(!0),
            a && f.showBalloon(a))
        }, handleMouseOver: function () { this.outTO && clearTimeout(this.outTO); d.resetMouseOver(); this.mouseIsOver = !0 }, handleMouseOut: function () { var a = this; d.resetMouseOver(); a.outTO && clearTimeout(a.outTO); a.outTO = setTimeout(function () { a.handleMouseOutReal() }, 10) }, handleMouseOutReal: function () { this.mouseIsOver = !1 }, handleMouseMove: function (a) {
            a || (a = window.event); this.mouse2Y = this.mouse2X = NaN; var b, c, e, d; if (a) {
                if (a.touches) {
                    var f = a.touches.item(1); f && this.panEventsEnabled && this.boundingRect &&
                    (e = f.clientX - this.boundingRect.left, d = f.clientY - this.boundingRect.top); a = a.touches.item(0); if (!a) return
                } else this.wasTouched = !1; this.boundingRect && a.clientX && (b = a.clientX - this.boundingRect.left, c = a.clientY - this.boundingRect.top); isNaN(e) ? this.mouseX = b : (this.mouseX = Math.min(b, e), this.mouse2X = Math.max(b, e)); isNaN(d) ? this.mouseY = c : (this.mouseY = Math.min(c, d), this.mouse2Y = Math.max(c, d))
            }
        }, handleTouchStart: function (a) {
            this.hideBalloonReal(); a && (a.touches && this.tapToActivate && !this.tapped || !this.panRequired) ||
            (this.handleMouseMove(a), this.handleMouseDown(a))
        }, handleTouchEnd: function (a) { this.wasTouched = !0; this.handleMouseMove(a); d.resetMouseOver(); this.handleReleaseOutside(a) }, handleReleaseOutside: function () { }, handleMouseDown: function (a) { d.resetMouseOver(); this.mouseIsOver = !0; a && a.preventDefault && (this.panEventsEnabled ? a.preventDefault() : a.touches || a.preventDefault()) }, addLegend: function (a, b) {
            a = d.processObject(a, d.AmLegend, this.theme); a.divId = b; a.ieW = 0; var c; c = "object" != typeof b && b ? document.getElementById(b) :
            b; this.legend = a; a.chart = this; c ? (a.div = c, a.position = "outside", a.autoMargins = !1) : a.div = this.legendDiv; return a
        }, removeLegend: function () { this.legend = void 0; this.legendDiv.innerHTML = "" }, handleResize: function () { (d.isPercents(this.width) || d.isPercents(this.height)) && this.invalidateSizeReal(); this.renderFix() }, renderFix: function () { if (!d.VML) { var a = this.container; a && a.renderFix() } }, getSVG: function () { if (d.hasSVG) return this.container }, animate: function (a, b, c, e, g, f, h) {
            a["an_" + b] && d.removeFromArray(this.animations,
            a["an_" + b]); c = { obj: a, frame: 0, attribute: b, from: c, to: e, time: g, effect: f, suffix: h }; a["an_" + b] = c; this.animations.push(c); return c
        }, setLegendData: function (a) { var b = this.legend; b && b.setData(a) }, stopAnim: function (a) { d.removeFromArray(this.animations, a) }, updateAnimations: function () {
            var a; this.container && this.container.update(); if (this.animations) for (a = this.animations.length - 1; 0 <= a; a--) {
                var b = this.animations[a], c = d.updateRate * b.time, e = b.frame + 1, g = b.obj, f = b.attribute; if (e <= c) {
                    b.frame++; var h = Number(b.from),
                    k = Number(b.to) - h, c = d[b.effect](0, e, h, k, c); 0 === k ? (this.animations.splice(a, 1), g.node.style[f] = Number(b.to) + b.suffix) : g.node.style[f] = c + b.suffix
                } else g.node.style[f] = Number(b.to) + b.suffix, g.animationFinished = !0, this.animations.splice(a, 1)
            }
        }, update: function () { this.updateAnimations(); var a = this.animatable; if (0 < a.length) { for (var b = !0, c = a.length - 1; 0 <= c; c--) { var e = a[c]; e && (e.animationFinished ? a.splice(c, 1) : b = !1) } b && (this.fire({ type: "animationFinished", chart: this }), this.animatable = []) } }, inIframe: function () {
            try {
                return window.self !==
                window.top
            } catch (a) { return !0 }
        }, brr: function () {
            if (!this.hideCredits) {
                var a = "amcharts.com", b = window.location.hostname.split("."), c; 2 <= b.length && (c = b[b.length - 2] + "." + b[b.length - 1]); this.amLink && (b = this.amLink.parentNode) && b.removeChild(this.amLink); b = this.creditsPosition; if (c != a || !0 === this.inIframe()) {
                    var a = "http://www." + a, e = c = 0, d = this.realWidth, f = this.realHeight, h = this.type; if ("serial" == h || "xy" == h || "gantt" == h) c = this.marginLeftReal, e = this.marginTopReal, d = c + this.plotAreaWidth, f = e + this.plotAreaHeight;
                    var h = a + "/javascript-charts/", k = "JavaScript charts", l = "JS chart by amCharts"; "ammap" == this.product && (h = a + "/javascript-maps/", k = "Interactive JavaScript maps", l = "JS map by amCharts"); a = document.createElement("a"); l = document.createTextNode(l); a.setAttribute("href", h); a.setAttribute("title", k); a.appendChild(l); this.chartDiv.appendChild(a); this.amLink = a; h = a.style; h.position = "absolute"; h.textDecoration = "none"; h.color = this.color; h.fontFamily = this.fontFamily; h.fontSize = this.fontSize + "px"; h.opacity = .7; h.display =
                    "block"; var k = a.offsetWidth, a = a.offsetHeight, l = 5 + c, m = e + 5; "bottom-left" == b && (l = 5 + c, m = f - a - 3); "bottom-right" == b && (l = d - k - 5, m = f - a - 3); "top-right" == b && (l = d - k - 5, m = e + 5); h.left = l + "px"; h.top = m + "px"
                }
            }
        }
    }); d.Slice = d.Class({ construct: function () { } }); d.SerialDataItem = d.Class({ construct: function () { } }); d.GraphDataItem = d.Class({ construct: function () { } }); d.Guide = d.Class({ construct: function (a) { this.cname = "Guide"; d.applyTheme(this, a, this.cname) } }); d.Title = d.Class({
        construct: function (a) {
            this.cname = "Title"; d.applyTheme(this,
            a, this.cname)
        }
    }); d.Label = d.Class({ construct: function (a) { this.cname = "Label"; d.applyTheme(this, a, this.cname) } })
})(); (function () {
    var d = window.AmCharts; d.AmBalloon = d.Class({
        construct: function (a) {
            this.cname = "AmBalloon"; this.enabled = !0; this.fillColor = "#FFFFFF"; this.fillAlpha = .8; this.borderThickness = 2; this.borderColor = "#FFFFFF"; this.borderAlpha = 1; this.cornerRadius = 0; this.maxWidth = 220; this.horizontalPadding = 8; this.verticalPadding = 4; this.pointerWidth = 6; this.pointerOrientation = "V"; this.color = "#000000"; this.adjustBorderColor = !0; this.show = this.follow = this.showBullet = !1; this.bulletSize = 3; this.shadowAlpha = .4; this.shadowColor =
            "#000000"; this.fadeOutDuration = this.animationDuration = .3; this.fixedPosition = !0; this.offsetY = 6; this.offsetX = 1; this.textAlign = "center"; this.disableMouseEvents = !0; this.deltaSignX = this.deltaSignY = 1; d.isModern || (this.offsetY *= 1.5); this.sdy = this.sdx = 0; d.applyTheme(this, a, this.cname)
        }, draw: function () {
            var a = this.pointToX, b = this.pointToY; d.isModern || (this.drop = !1); var c = this.chart; d.VML && (this.fadeOutDuration = 0); this.xAnim && c.stopAnim(this.xAnim); this.yAnim && c.stopAnim(this.yAnim); this.sdy = this.sdx = 0; if (!isNaN(a)) {
                var e =
                this.follow, g = c.container, f = this.set; d.remove(f); this.removeDiv(); f = g.set(); f.node.style.pointerEvents = "none"; this.set = f; this.mainSet ? (this.mainSet.push(this.set), this.sdx = this.mainSet.x, this.sdy = this.mainSet.y) : c.balloonsSet.push(f); if (this.show) {
                    var h = this.l, k = this.t, l = this.r, m = this.b, n = this.balloonColor, r = this.fillColor, v = this.borderColor, p = r; void 0 != n && (this.adjustBorderColor ? p = v = n : r = n); var q = this.horizontalPadding, x = this.verticalPadding, B = this.pointerWidth, y = this.pointerOrientation, A = this.cornerRadius,
                    w = c.fontFamily, z = this.fontSize; void 0 == z && (z = c.fontSize); var n = document.createElement("div"), D = c.classNamePrefix; n.className = D + "-balloon-div"; this.className && (n.className = n.className + " " + D + "-balloon-div-" + this.className); D = n.style; this.disableMouseEvents && (D.pointerEvents = "none"); D.position = "absolute"; var t = this.minWidth, u = ""; isNaN(t) || (u = "min-width:" + (t - 2 * q) + "px; "); n.innerHTML = '<div style="text-align:' + this.textAlign + "; " + u + "max-width:" + this.maxWidth + "px; font-size:" + z + "px; color:" + this.color + "; font-family:" +
                    w + '">' + this.text + "</div>"; c.chartDiv.appendChild(n); this.textDiv = n; var E = n.offsetWidth, F = n.offsetHeight; n.clientHeight && (E = n.clientWidth, F = n.clientHeight); w = F + 2 * x; u = E + 2 * q; !isNaN(t) && u < t && (u = t); window.opera && (w += 2); var G = !1, z = this.offsetY; c.handDrawn && (z += c.handDrawScatter + 2); "H" != y ? (t = a - u / 2, b < k + w + 10 && "down" != y ? (G = !0, e && (b += z), z = b + B, this.deltaSignY = -1) : (e && (b -= z), z = b - w - B, this.deltaSignY = 1)) : (2 * B > w && (B = w / 2), z = b - w / 2, a < h + (l - h) / 2 ? (t = a + B, this.deltaSignX = -1) : (t = a - u - B, this.deltaSignX = 1)); z + w >= m && (z = m - w);
                    z < k && (z = k); t < h && (t = h); t + u > l && (t = l - u); var k = z + x, m = t + q, C = this.shadowAlpha, I = this.shadowColor, q = this.borderThickness, K = this.bulletSize, J, x = this.fillAlpha, L = this.borderAlpha; this.showBullet && (J = d.circle(g, K, p, x), f.push(J)); this.drop ? (h = u / 1.6, l = 0, "V" == y && (y = "down"), "H" == y && (y = "left"), "down" == y && (t = a + 1, z = b - h - h / 3), "up" == y && (l = 180, t = a + 1, z = b + h + h / 3), "left" == y && (l = 270, t = a + h + h / 3 + 2, z = b), "right" == y && (l = 90, t = a - h - h / 3 + 2, z = b), k = z - F / 2 + 1, m = t - E / 2 - 1, r = d.drop(g, h, l, r, x, q, v, L)) : 0 < A || 0 === B ? (0 < C && (a = d.rect(g, u, w, r, 0, q + 1, I,
                    C, A), d.isModern ? a.translate(1, 1) : a.translate(4, 4), f.push(a)), r = d.rect(g, u, w, r, x, q, v, L, A)) : (p = [], A = [], "H" != y ? (h = a - t, h > u - B && (h = u - B), h < B && (h = B), p = [0, h - B, a - t, h + B, u, u, 0, 0], A = G ? [0, 0, b - z, 0, 0, w, w, 0] : [w, w, b - z, w, w, 0, 0, w]) : (y = b - z, y > w - B && (y = w - B), y < B && (y = B), A = [0, y - B, b - z, y + B, w, w, 0, 0], p = a < h + (l - h) / 2 ? [0, 0, t < a ? 0 : a - t, 0, 0, u, u, 0] : [u, u, t + u > a ? u : a - t, u, u, 0, 0, u]), 0 < C && (a = d.polygon(g, p, A, r, 0, q, I, C), a.translate(1, 1), f.push(a)), r = d.polygon(g, p, A, r, x, q, v, L)); this.bg = r; f.push(r); r.toFront(); d.setCN(c, r, "balloon-bg"); this.className &&
                    d.setCN(c, r, "balloon-bg-" + this.className); g = 1 * this.deltaSignX; m += this.sdx; k += this.sdy; D.left = m + "px"; D.top = k + "px"; f.translate(t - g, z, 1, !0); r = r.getBBox(); this.bottom = z + w + 1; this.yPos = r.y + z; J && J.translate(this.pointToX - t + g, b - z); b = this.animationDuration; 0 < this.animationDuration && !e && !isNaN(this.prevX) && (f.translate(this.prevX, this.prevY, NaN, !0), f.animate({ translate: t - g + "," + z }, b, "easeOutSine"), n && (D.left = this.prevTX + "px", D.top = this.prevTY + "px", this.xAnim = c.animate({ node: n }, "left", this.prevTX, m, b, "easeOutSine",
                    "px"), this.yAnim = c.animate({ node: n }, "top", this.prevTY, k, b, "easeOutSine", "px"))); this.prevX = t - g; this.prevY = z; this.prevTX = m; this.prevTY = k
                }
            }
        }, fixPrevious: function () { this.rPrevX = this.prevX; this.rPrevY = this.prevY; this.rPrevTX = this.prevTX; this.rPrevTY = this.prevTY }, restorePrevious: function () { this.prevX = this.rPrevX; this.prevY = this.rPrevY; this.prevTX = this.rPrevTX; this.prevTY = this.rPrevTY }, followMouse: function () {
            if (this.follow && this.show) {
                var a = this.chart.mouseX - this.offsetX * this.deltaSignX - this.sdx, b = this.chart.mouseY -
                this.sdy; this.pointToX = a; this.pointToY = b; if (a != this.previousX || b != this.previousY) if (this.previousX = a, this.previousY = b, 0 === this.cornerRadius) this.draw(); else { var c = this.set; if (c) { var e = c.getBBox(), a = a - e.width / 2, d = b - e.height - 10; a < this.l && (a = this.l); a > this.r - e.width && (a = this.r - e.width); d < this.t && (d = b + 10); c.translate(a, d); b = this.textDiv.style; b.left = a + this.horizontalPadding + "px"; b.top = d + this.verticalPadding + "px" } }
            }
        }, changeColor: function (a) { this.balloonColor = a }, setBounds: function (a, b, c, e) {
            this.l = a; this.t =
            b; this.r = c; this.b = e; this.destroyTO && clearTimeout(this.destroyTO)
        }, showBalloon: function (a) { if (this.text != a || this.positionChanged) this.text = a, this.isHiding = !1, this.show = !0, this.destroyTO && clearTimeout(this.destroyTO), a = this.chart, this.fadeAnim1 && a.stopAnim(this.fadeAnim1), this.fadeAnim2 && a.stopAnim(this.fadeAnim2), this.draw(), this.positionChanged = !1 }, hide: function (a) {
            var b = this; b.text = void 0; isNaN(a) && (a = b.fadeOutDuration); var c = b.chart; if (0 < a && !b.isHiding) {
                b.isHiding = !0; b.destroyTO && clearTimeout(b.destroyTO);
                b.destroyTO = setTimeout(function () { b.destroy.call(b) }, 1E3 * a); b.follow = !1; b.show = !1; var e = b.set; e && (e.setAttr("opacity", b.fillAlpha), b.fadeAnim1 = e.animate({ opacity: 0 }, a, "easeInSine")); b.textDiv && (b.fadeAnim2 = c.animate({ node: b.textDiv }, "opacity", 1, 0, a, "easeInSine", ""))
            } else b.show = !1, b.follow = !1, b.destroy()
        }, setPosition: function (a, b) { if (a != this.pointToX || b != this.pointToY) this.previousX = this.pointToX, this.previousY = this.pointToY, this.pointToX = a, this.pointToY = b, this.positionChanged = !0 }, followCursor: function (a) {
            var b =
            this; b.follow = a; clearInterval(b.interval); var c = b.chart.mouseX - b.sdx, e = b.chart.mouseY - b.sdy; !isNaN(c) && a && (b.pointToX = c - b.offsetX * b.deltaSignX, b.pointToY = e, b.followMouse(), b.interval = setInterval(function () { b.followMouse.call(b) }, 40))
        }, removeDiv: function () { if (this.textDiv) { var a = this.textDiv.parentNode; a && a.removeChild(this.textDiv) } }, destroy: function () { clearInterval(this.interval); d.remove(this.set); this.removeDiv(); this.set = null }
    })
})(); (function () {
    var d = window.AmCharts; d.circle = function (a, b, c, e, g, f, h, k, l) { 0 >= b && (b = .001); if (void 0 == g || 0 === g) g = .01; void 0 === f && (f = "#000000"); void 0 === h && (h = 0); e = { fill: c, stroke: f, "fill-opacity": e, "stroke-width": g, "stroke-opacity": h }; a = isNaN(l) ? a.circle(0, 0, b).attr(e) : a.ellipse(0, 0, b, l).attr(e); k && a.gradient("radialGradient", [c, d.adjustLuminosity(c, -.6)]); return a }; d.text = function (a, b, c, e, g, f, h, k) {
        f || (f = "middle"); "right" == f && (f = "end"); "left" == f && (f = "start"); isNaN(k) && (k = 1); void 0 !== b && (b = String(b), d.isIE &&
        !d.isModern && (b = b.replace("&amp;", "&"), b = b.replace("&", "&amp;"))); c = { fill: c, "font-family": e, "font-size": g + "px", opacity: k }; !0 === h && (c["font-weight"] = "bold"); c["text-anchor"] = f; return a.text(b, c)
    }; d.polygon = function (a, b, c, e, g, f, h, k, l, m, n) {
        isNaN(f) && (f = .01); isNaN(k) && (k = g); var r = e, v = !1; "object" == typeof r && 1 < r.length && (v = !0, r = r[0]); void 0 === h && (h = r); g = { fill: r, stroke: h, "fill-opacity": g, "stroke-width": f, "stroke-opacity": k }; void 0 !== n && 0 < n && (g["stroke-dasharray"] = n); n = d.dx; f = d.dy; a.handDrawn && (c = d.makeHD(b,
        c, a.handDrawScatter), b = c[0], c = c[1]); h = Math.round; m && (b[p] = d.roundTo(b[p], 5), c[p] = d.roundTo(c[p], 5), h = Number); k = "M" + (h(b[0]) + n) + "," + (h(c[0]) + f); for (var p = 1; p < b.length; p++) m && (b[p] = d.roundTo(b[p], 5), c[p] = d.roundTo(c[p], 5)), k += " L" + (h(b[p]) + n) + "," + (h(c[p]) + f); a = a.path(k + " Z").attr(g); v && a.gradient("linearGradient", e, l); return a
    }; d.rect = function (a, b, c, e, g, f, h, k, l, m, n) {
        if (isNaN(b) || isNaN(c)) return a.set(); isNaN(f) && (f = 0); void 0 === l && (l = 0); void 0 === m && (m = 270); isNaN(g) && (g = 0); var r = e, v = !1; "object" == typeof r &&
        (r = r[0], v = !0); void 0 === h && (h = r); void 0 === k && (k = g); b = Math.round(b); c = Math.round(c); var p = 0, q = 0; 0 > b && (b = Math.abs(b), p = -b); 0 > c && (c = Math.abs(c), q = -c); p += d.dx; q += d.dy; g = { fill: r, stroke: h, "fill-opacity": g, "stroke-opacity": k }; void 0 !== n && 0 < n && (g["stroke-dasharray"] = n); a = a.rect(p, q, b, c, l, f).attr(g); v && a.gradient("linearGradient", e, m); return a
    }; d.bullet = function (a, b, c, e, g, f, h, k, l, m, n, r, v) {
        var p; "circle" == b && (b = "round"); switch (b) {
            case "round": p = d.circle(a, c / 2, e, g, f, h, k); break; case "square": p = d.polygon(a, [-c /
            2, c / 2, c / 2, -c / 2], [c / 2, c / 2, -c / 2, -c / 2], e, g, f, h, k, m - 180, void 0, v); break; case "rectangle": p = d.polygon(a, [-c, c, c, -c], [c / 2, c / 2, -c / 2, -c / 2], e, g, f, h, k, m - 180, void 0, v); break; case "diamond": p = d.polygon(a, [-c / 2, 0, c / 2, 0], [0, -c / 2, 0, c / 2], e, g, f, h, k); break; case "triangleUp": p = d.triangle(a, c, 0, e, g, f, h, k); break; case "triangleDown": p = d.triangle(a, c, 180, e, g, f, h, k); break; case "triangleLeft": p = d.triangle(a, c, 270, e, g, f, h, k); break; case "triangleRight": p = d.triangle(a, c, 90, e, g, f, h, k); break; case "bubble": p = d.circle(a, c / 2, e, g,
            f, h, k, !0); break; case "line": p = d.line(a, [-c / 2, c / 2], [0, 0], e, g, f, h, k); break; case "yError": p = a.set(); p.push(d.line(a, [0, 0], [-c / 2, c / 2], e, g, f)); p.push(d.line(a, [-l, l], [-c / 2, -c / 2], e, g, f)); p.push(d.line(a, [-l, l], [c / 2, c / 2], e, g, f)); break; case "xError": p = a.set(), p.push(d.line(a, [-c / 2, c / 2], [0, 0], e, g, f)), p.push(d.line(a, [-c / 2, -c / 2], [-l, l], e, g, f)), p.push(d.line(a, [c / 2, c / 2], [-l, l], e, g, f))
        } p && p.pattern(n, NaN, r); return p
    }; d.triangle = function (a, b, c, e, d, f, h, k) {
        if (void 0 === f || 0 === f) f = 1; void 0 === h && (h = "#000"); void 0 ===
        k && (k = 0); e = { fill: e, stroke: h, "fill-opacity": d, "stroke-width": f, "stroke-opacity": k }; b /= 2; var l; 0 === c && (l = " M" + -b + "," + b + " L0," + -b + " L" + b + "," + b + " Z"); 180 == c && (l = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z"); 90 == c && (l = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z"); 270 == c && (l = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z"); return a.path(l).attr(e)
    }; d.line = function (a, b, c, e, g, f, h, k, l, m, n) {
        if (a.handDrawn && !n) return d.handDrawnLine(a, b, c, e, g, f, h, k, l, m, n); f = { fill: "none", "stroke-width": f }; void 0 !== h && 0 < h && (f["stroke-dasharray"] =
        h); isNaN(g) || (f["stroke-opacity"] = g); e && (f.stroke = e); e = Math.round; m && (e = Number, b[0] = d.roundTo(b[0], 5), c[0] = d.roundTo(c[0], 5)); m = d.dx; g = d.dy; h = "M" + (e(b[0]) + m) + "," + (e(c[0]) + g); for (k = 1; k < b.length; k++) b[k] = d.roundTo(b[k], 5), c[k] = d.roundTo(c[k], 5), h += " L" + (e(b[k]) + m) + "," + (e(c[k]) + g); if (d.VML) return a.path(h, void 0, !0).attr(f); l && (h += " M0,0 L0,0"); return a.path(h).attr(f)
    }; d.makeHD = function (a, b, c) {
        for (var e = [], d = [], f = 1; f < a.length; f++) for (var h = Number(a[f - 1]), k = Number(b[f - 1]), l = Number(a[f]), m = Number(b[f]),
        n = Math.round(Math.sqrt(Math.pow(l - h, 2) + Math.pow(m - k, 2)) / 50) + 1, l = (l - h) / n, m = (m - k) / n, r = 0; r <= n; r++) { var v = k + r * m + Math.random() * c; e.push(h + r * l + Math.random() * c); d.push(v) } return [e, d]
    }; d.handDrawnLine = function (a, b, c, e, g, f, h, k, l, m) { var n, r = a.set(); for (n = 1; n < b.length; n++) for (var v = [b[n - 1], b[n]], p = [c[n - 1], c[n]], p = d.makeHD(v, p, a.handDrawScatter), v = p[0], p = p[1], q = 1; q < v.length; q++) r.push(d.line(a, [v[q - 1], v[q]], [p[q - 1], p[q]], e, g, f + Math.random() * a.handDrawThickness - a.handDrawThickness / 2, h, k, l, m, !0)); return r }; d.doNothing =
    function (a) { return a }; d.drop = function (a, b, c, e, d, f, h, k) {
        var l = 1 / 180 * Math.PI, m = c - 20, n = Math.sin(m * l) * b, r = Math.cos(m * l) * b, v = Math.sin((m + 40) * l) * b, p = Math.cos((m + 40) * l) * b, q = .8 * b, x = -b / 3, B = b / 3; 0 === c && (x = -x, B = 0); 180 == c && (B = 0); 90 == c && (x = 0); 270 == c && (x = 0, B = -B); c = { fill: e, stroke: h, "stroke-width": f, "stroke-opacity": k, "fill-opacity": d }; b = "M" + n + "," + r + " A" + b + "," + b + ",0,1,1," + v + "," + p + (" A" + q + "," + q + ",0,0,0," + (Math.sin((m + 20) * l) * b + B) + "," + (Math.cos((m + 20) * l) * b + x)); b += " A" + q + "," + q + ",0,0,0," + n + "," + r; return a.path(b, void 0,
        void 0, "1000,1000").attr(c)
    }; d.wedge = function (a, b, c, e, g, f, h, k, l, m, n, r, v, p) {
        var q = Math.round; f = q(f); h = q(h); k = q(k); var x = q(h / f * k), B = d.VML, y = 359.5 + f / 100; 359.94 < y && (y = 359.94); g >= y && (g = y); var A = 1 / 180 * Math.PI, y = b + Math.sin(e * A) * k, w = c - Math.cos(e * A) * x, z = b + Math.sin(e * A) * f, D = c - Math.cos(e * A) * h, t = b + Math.sin((e + g) * A) * f, u = c - Math.cos((e + g) * A) * h, E = b + Math.sin((e + g) * A) * k, A = c - Math.cos((e + g) * A) * x, F = { fill: d.adjustLuminosity(m.fill, -.2), "stroke-opacity": 0, "fill-opacity": m["fill-opacity"] }, G = 0; 180 < Math.abs(g) && (G = 1); e = a.set();
        var C; B && (y = q(10 * y), z = q(10 * z), t = q(10 * t), E = q(10 * E), w = q(10 * w), D = q(10 * D), u = q(10 * u), A = q(10 * A), b = q(10 * b), l = q(10 * l), c = q(10 * c), f *= 10, h *= 10, k *= 10, x *= 10, 1 > Math.abs(g) && 1 >= Math.abs(t - z) && 1 >= Math.abs(u - D) && (C = !0)); g = ""; var I; r && (F["fill-opacity"] = 0, F["stroke-opacity"] = m["stroke-opacity"] / 2, F.stroke = m.stroke); if (0 < l) {
            I = " M" + y + "," + (w + l) + " L" + z + "," + (D + l); B ? (C || (I += " A" + (b - f) + "," + (l + c - h) + "," + (b + f) + "," + (l + c + h) + "," + z + "," + (D + l) + "," + t + "," + (u + l)), I += " L" + E + "," + (A + l), 0 < k && (C || (I += " B" + (b - k) + "," + (l + c - x) + "," + (b + k) + "," +
            (l + c + x) + "," + E + "," + (l + A) + "," + y + "," + (l + w)))) : (I += " A" + f + "," + h + ",0," + G + ",1," + t + "," + (u + l) + " L" + E + "," + (A + l), 0 < k && (I += " A" + k + "," + x + ",0," + G + ",0," + y + "," + (w + l))); I += " Z"; var K = l; B && (K /= 10); for (var J = 0; J < K; J += 10) { var L = a.path(I, void 0, void 0, "1000,1000").attr(F); e.push(L); L.translate(0, -J) } I = a.path(" M" + y + "," + w + " L" + y + "," + (w + l) + " L" + z + "," + (D + l) + " L" + z + "," + D + " L" + y + "," + w + " Z", void 0, void 0, "1000,1000").attr(F); l = a.path(" M" + t + "," + u + " L" + t + "," + (u + l) + " L" + E + "," + (A + l) + " L" + E + "," + A + " L" + t + "," + u + " Z", void 0, void 0,
            "1000,1000").attr(F); e.push(I); e.push(l)
        } B ? (C || (g = " A" + q(b - f) + "," + q(c - h) + "," + q(b + f) + "," + q(c + h) + "," + q(z) + "," + q(D) + "," + q(t) + "," + q(u)), h = " M" + q(y) + "," + q(w) + " L" + q(z) + "," + q(D) + g + " L" + q(E) + "," + q(A)) : h = " M" + y + "," + w + " L" + z + "," + D + (" A" + f + "," + h + ",0," + G + ",1," + t + "," + u) + " L" + E + "," + A; 0 < k && (B ? C || (h += " B" + (b - k) + "," + (c - x) + "," + (b + k) + "," + (c + x) + "," + E + "," + A + "," + y + "," + w) : h += " A" + k + "," + x + ",0," + G + ",0," + y + "," + w); a.handDrawn && (k = d.line(a, [y, z], [w, D], m.stroke, m.thickness * Math.random() * a.handDrawThickness, m["stroke-opacity"]),
        e.push(k)); k = a.path(h + " Z", void 0, void 0, "1000,1000").attr(m); if (n) { x = []; for (B = 0; B < n.length; B++) x.push(d.adjustLuminosity(m.fill, n[B])); "radial" != p || d.isModern || (x = []); 0 < x.length && k.gradient(p + "Gradient", x) } d.isModern && "radial" == p && k.grad && (k.grad.setAttribute("gradientUnits", "userSpaceOnUse"), k.grad.setAttribute("r", f), k.grad.setAttribute("gradientTransform", "translate(" + (b - a.width / 2) + "," + (c - a.height / 2) + ")")); k.pattern(r, NaN, v); e.wedge = k; e.push(k); return e
    }; d.rgb2hex = function (a) {
        return (a = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) &&
        4 === a.length ? "#" + ("0" + parseInt(a[1], 10).toString(16)).slice(-2) + ("0" + parseInt(a[2], 10).toString(16)).slice(-2) + ("0" + parseInt(a[3], 10).toString(16)).slice(-2) : ""
    }; d.adjustLuminosity = function (a, b) {
        a && -1 != a.indexOf("rgb") && (a = d.rgb2hex(a)); a = String(a).replace(/[^0-9a-f]/gi, ""); 6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2])); b = b || 0; var c = "#", e, g; for (g = 0; 3 > g; g++) e = parseInt(a.substr(2 * g, 2), 16), e = Math.round(Math.min(Math.max(0, e + e * b), 255)).toString(16), c += ("00" +
        e).substr(e.length); return c
    }
})(); (function () {
    var d = window.AmCharts; d.AmLegend = d.Class({
        construct: function (a) {
            this.enabled = !0; this.cname = "AmLegend"; this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel"); this.position = "bottom"; this.borderColor = this.color = "#000000"; this.borderAlpha = 0; this.markerLabelGap = 5; this.verticalGap = 10; this.align = "left"; this.horizontalGap = 0; this.spacing = 10; this.markerDisabledColor = "#AAB3B3"; this.markerType =
            "square"; this.markerSize = 16; this.markerBorderThickness = this.markerBorderAlpha = 1; this.marginBottom = this.marginTop = 0; this.marginLeft = this.marginRight = 20; this.autoMargins = !0; this.valueWidth = 50; this.switchable = !0; this.switchType = "x"; this.switchColor = "#FFFFFF"; this.rollOverColor = "#CC0000"; this.reversedOrder = !1; this.labelText = "[[title]]"; this.valueText = "[[value]]"; this.useMarkerColorForLabels = !1; this.rollOverGraphAlpha = 1; this.textClickEnabled = !1; this.equalWidths = !0; this.backgroundColor = "#FFFFFF"; this.backgroundAlpha =
            0; this.useGraphSettings = !1; this.showEntries = !0; d.applyTheme(this, a, this.cname)
        }, setData: function (a) { this.legendData = a; this.invalidateSize() }, invalidateSize: function () { this.destroy(); this.entries = []; this.valueLabels = []; var a = this.legendData; this.enabled && (d.ifArray(a) || d.ifArray(this.data)) && this.drawLegend() }, drawLegend: function () {
            var a = this.chart, b = this.position, c = this.width, e = a.divRealWidth, g = a.divRealHeight, f = this.div, h = this.legendData; this.data && (h = this.data); isNaN(this.fontSize) && (this.fontSize =
            a.fontSize); if ("right" == b || "left" == b) this.maxColumns = 1, this.autoMargins && (this.marginLeft = this.marginRight = 10); else if (this.autoMargins) { this.marginRight = a.marginRight; this.marginLeft = a.marginLeft; var k = a.autoMarginOffset; "bottom" == b ? (this.marginBottom = k, this.marginTop = 0) : (this.marginTop = k, this.marginBottom = 0) } c = void 0 !== c ? d.toCoordinate(c, e) : "right" != b && "left" != b ? a.realWidth : 0 < this.ieW ? this.ieW : a.realWidth; "outside" == b ? (c = f.offsetWidth, g = f.offsetHeight, f.clientHeight && (c = f.clientWidth, g = f.clientHeight)) :
            (isNaN(c) || (f.style.width = c + "px"), f.className = "amChartsLegend " + a.classNamePrefix + "-legend-div"); this.divWidth = c; (b = this.container) ? (b.container.innerHTML = "", f.appendChild(b.container), b.width = c, b.height = g, b.setSize(c, g), b.addDefs(a)) : b = new d.AmDraw(f, c, g, a); this.container = b; this.lx = 0; this.ly = 8; g = this.markerSize; g > this.fontSize && (this.ly = g / 2 - 1); 0 < g && (this.lx += g + this.markerLabelGap); this.titleWidth = 0; if (g = this.title) g = d.text(this.container, g, this.color, a.fontFamily, this.fontSize, "start", !0), d.setCN(a,
            g, "legend-title"), g.translate(this.marginLeft, this.marginTop + this.verticalGap + this.ly + 1), a = g.getBBox(), this.titleWidth = a.width + 15, this.titleHeight = a.height + 6; this.index = this.maxLabelWidth = 0; if (this.showEntries) { for (a = 0; a < h.length; a++) this.createEntry(h[a]); for (a = this.index = 0; a < h.length; a++) this.createValue(h[a]) } this.arrangeEntries(); this.updateValues()
        }, arrangeEntries: function () {
            var a = this.position, b = this.marginLeft + this.titleWidth, c = this.marginRight, e = this.marginTop, g = this.marginBottom, f = this.horizontalGap,
            h = this.div, k = this.divWidth, l = this.maxColumns, m = this.verticalGap, n = this.spacing, r = k - c - b, v = 0, p = 0, q = this.container; this.set && this.set.remove(); var x = q.set(); this.set = x; var B = q.set(); x.push(B); var y = this.entries, A, w; for (w = 0; w < y.length; w++) { A = y[w].getBBox(); var z = A.width; z > v && (v = z); A = A.height; A > p && (p = A) } var z = p = 0, D = f, t = 0, u = 0; for (w = 0; w < y.length; w++) {
                var E = y[w]; this.reversedOrder && (E = y[y.length - w - 1]); A = E.getBBox(); var F; this.equalWidths ? F = z * (v + n + this.markerLabelGap) : (F = D, D = D + A.width + f + n); A.height > u && (u =
                A.height); F + A.width > r && 0 < w && 0 !== z && (p++, F = z = 0, D = F + A.width + f + n, t = t + u + m, u = 0); E.translate(F, t); z++; !isNaN(l) && z >= l && (z = 0, p++, t = t + u + m, D = f, u = 0); B.push(E)
            } A = B.getBBox(); l = A.height + 2 * m - 1; "left" == a || "right" == a ? (n = A.width + 2 * f, k = n + b + c, h.style.width = k + "px", this.ieW = k) : n = k - b - c - 1; c = d.polygon(this.container, [0, n, n, 0], [0, 0, l, l], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha); d.setCN(this.chart, c, "legend-bg"); x.push(c); x.translate(b, e); c.toBack(); b = f; if ("top" == a || "bottom" == a || "absolute" ==
            a || "outside" == a) "center" == this.align ? b = f + (n - A.width) / 2 : "right" == this.align && (b = f + n - A.width); B.translate(b, m + 1); this.titleHeight > l && (l = this.titleHeight); a = l + e + g + 1; 0 > a && (a = 0); a > this.chart.divRealHeight && (h.style.top = "0px"); h.style.height = Math.round(a) + "px"; q.setSize(this.divWidth, a)
        }, createEntry: function (a) {
            if (!1 !== a.visibleInLegend && !a.hideFromLegend) {
                var b = this.chart, c = a.markerType; a.legendEntryWidth = this.markerSize; c || (c = this.markerType); var e = a.color, g = a.alpha; a.legendKeyColor && (e = a.legendKeyColor());
                a.legendKeyAlpha && (g = a.legendKeyAlpha()); var f; !0 === a.hidden && (f = e = this.markerDisabledColor); var h = a.pattern, k = a.customMarker; k || (k = this.customMarker); var l = this.container, m = this.markerSize, n = 0, r = 0, v = m / 2; if (this.useGraphSettings) {
                    c = a.type; this.switchType = void 0; if ("line" == c || "step" == c || "smoothedLine" == c || "ohlc" == c) h = l.set(), a.hidden || (e = a.lineColorR, f = a.bulletBorderColorR), n = d.line(l, [0, 2 * m], [m / 2, m / 2], e, a.lineAlpha, a.lineThickness, a.dashLength), d.setCN(b, n, "graph-stroke"), h.push(n), a.bullet && (a.hidden ||
                    (e = a.bulletColorR), n = d.bullet(l, a.bullet, a.bulletSize, e, a.bulletAlpha, a.bulletBorderThickness, f, a.bulletBorderAlpha)) && (d.setCN(b, n, "graph-bullet"), n.translate(m + 1, m / 2), h.push(n)), v = 0, n = m, r = m / 3; else { var p; a.getGradRotation && (p = a.getGradRotation(), 0 === p && (p = 180)); n = a.fillColorsR; !0 === a.hidden && (n = e); if (h = this.createMarker("rectangle", n, a.fillAlphas, a.lineThickness, e, a.lineAlpha, p, h, a.dashLength)) v = m, h.translate(v, m / 2); n = m } d.setCN(b, h, "graph-" + c); d.setCN(b, h, "graph-" + a.id)
                } else if (k) h = l.image(k, 0, 0,
                m, m); else { var q; isNaN(this.gradientRotation) || (q = 180 + this.gradientRotation); (h = this.createMarker(c, e, g, void 0, void 0, void 0, q, h)) && h.translate(m / 2, m / 2) } d.setCN(b, h, "legend-marker"); this.addListeners(h, a); l = l.set([h]); this.switchable && a.switchable && l.setAttr("cursor", "pointer"); void 0 !== a.id && d.setCN(b, l, "legend-item-" + a.id); d.setCN(b, l, a.className, !0); (f = this.switchType) && "none" != f && 0 < m && ("x" == f ? (p = this.createX(), p.translate(m / 2, m / 2)) : p = this.createV(), p.dItem = a, !0 !== a.hidden ? "x" == f ? p.hide() : p.show() :
                "x" != f && p.hide(), this.switchable || p.hide(), this.addListeners(p, a), a.legendSwitch = p, l.push(p), d.setCN(b, p, "legend-switch")); f = this.color; a.showBalloon && this.textClickEnabled && void 0 !== this.selectedColor && (f = this.selectedColor); this.useMarkerColorForLabels && (f = e); !0 === a.hidden && (f = this.markerDisabledColor); e = d.massReplace(this.labelText, { "[[title]]": a.title }); p = this.fontSize; h && (m <= p && h.translate(v, m / 2 + this.ly - p / 2 + (p + 2 - m) / 2 - r), a.legendEntryWidth = h.getBBox().width); var x; e && (e = d.fixBrakes(e), a.legendTextReal =
                e, x = this.labelWidth, x = isNaN(x) ? d.text(this.container, e, f, b.fontFamily, p, "start") : d.wrappedText(this.container, e, f, b.fontFamily, p, "start", !1, x, 0), d.setCN(b, x, "legend-label"), x.translate(this.lx + n, this.ly), l.push(x), b = x.getBBox().width, this.maxLabelWidth < b && (this.maxLabelWidth = b)); this.entries[this.index] = l; a.legendEntry = this.entries[this.index]; a.legendLabel = x; this.index++
            }
        }, addListeners: function (a, b) {
            var c = this; a && a.mouseover(function (a) { c.rollOverMarker(b, a) }).mouseout(function (a) {
                c.rollOutMarker(b,
                a)
            }).click(function (a) { c.clickMarker(b, a) })
        }, rollOverMarker: function (a, b) { this.switchable && this.dispatch("rollOverMarker", a, b); this.dispatch("rollOverItem", a, b) }, rollOutMarker: function (a, b) { this.switchable && this.dispatch("rollOutMarker", a, b); this.dispatch("rollOutItem", a, b) }, clickMarker: function (a, b) { this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b)); this.dispatch("clickMarker", a, b) }, rollOverLabel: function (a, b) {
            a.hidden || (this.textClickEnabled && a.legendLabel &&
            a.legendLabel.attr({ fill: this.rollOverColor }), this.dispatch("rollOverItem", a, b))
        }, rollOutLabel: function (a, b) { if (!a.hidden) { if (this.textClickEnabled && a.legendLabel) { var c = this.color; void 0 !== this.selectedColor && a.showBalloon && (c = this.selectedColor); this.useMarkerColorForLabels && (c = a.lineColor, void 0 === c && (c = a.color)); a.legendLabel.attr({ fill: c }) } this.dispatch("rollOutItem", a, b) } }, clickLabel: function (a, b) {
            this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a, b) : this.switchable && (!0 === a.hidden ?
            this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b))
        }, dispatch: function (a, b, c) { a = { type: a, dataItem: b, target: this, event: c, chart: this.chart }; this.chart && this.chart.handleLegendEvent(a); this.fire(a) }, createValue: function (a) {
            var b = this, c = b.fontSize, e = b.chart; if (!1 !== a.visibleInLegend && !a.hideFromLegend) {
                var g = b.maxLabelWidth; b.forceWidth && (g = b.labelWidth); b.equalWidths || (b.valueAlign = "left"); "left" == b.valueAlign && (g = a.legendEntry.getBBox().width); var f = g; if (b.valueText && 0 < b.valueWidth) {
                    var h = b.color;
                    b.useMarkerColorForValues && (h = a.color, a.legendKeyColor && (h = a.legendKeyColor())); !0 === a.hidden && (h = b.markerDisabledColor); var k = b.valueText, g = g + b.lx + b.markerLabelGap + b.valueWidth, l = "end"; "left" == b.valueAlign && (g -= b.valueWidth, l = "start"); h = d.text(b.container, k, h, b.chart.fontFamily, c, l); d.setCN(e, h, "legend-value"); h.translate(g, b.ly); b.entries[b.index].push(h); f += b.valueWidth + 2 * b.markerLabelGap; h.dItem = a; b.valueLabels.push(h)
                } b.index++; e = b.markerSize; e < c + 7 && (e = c + 7, d.VML && (e += 3)); c = b.container.rect(a.legendEntryWidth,
                0, f, e, 0, 0).attr({ stroke: "none", fill: "#fff", "fill-opacity": .005 }); c.dItem = a; b.entries[b.index - 1].push(c); c.mouseover(function (c) { b.rollOverLabel(a, c) }).mouseout(function (c) { b.rollOutLabel(a, c) }).click(function (c) { b.clickLabel(a, c) })
            }
        }, createV: function () { var a = this.markerSize; return d.polygon(this.container, [a / 5, a / 2, a - a / 5, a / 2], [a / 3, a - a / 5, a / 5, a / 1.7], this.switchColor) }, createX: function () {
            var a = (this.markerSize - 4) / 2, b = { stroke: this.switchColor, "stroke-width": 3 }, c = this.container, e = d.line(c, [-a, a], [-a, a]).attr(b),
            a = d.line(c, [-a, a], [a, -a]).attr(b); return this.container.set([e, a])
        }, createMarker: function (a, b, c, e, g, f, h, k, l) { var m = this.markerSize, n = this.container; g || (g = this.markerBorderColor); g || (g = b); isNaN(e) && (e = this.markerBorderThickness); isNaN(f) && (f = this.markerBorderAlpha); return d.bullet(n, a, m, b, c, e, g, f, m, h, k, this.chart.path, l) }, validateNow: function () { this.invalidateSize() }, updateValues: function () {
            var a = this.valueLabels, b = this.chart, c, e = this.data; if (a) for (c = 0; c < a.length; c++) {
                var g = a[c], f = g.dItem, h = " "; if (e) f.value ?
                g.text(f.value) : g.text(""); else { var k; if (void 0 !== f.type) { k = f.currentDataItem; var l = this.periodValueText; f.legendPeriodValueText && (l = f.legendPeriodValueText); k ? (h = this.valueText, f.legendValueText && (h = f.legendValueText), h = b.formatString(h, k)) : l && b.formatPeriodString && (l = d.massReplace(l, { "[[title]]": f.title }), h = b.formatPeriodString(l, f)) } else h = b.formatString(this.valueText, f); if (l = this.valueFunction) k && (f = k), h = l(f, h); g.text(h) }
            }
        }, renderFix: function () {
            if (!d.VML && this.enabled) {
                var a = this.container; a &&
                a.renderFix()
            }
        }, destroy: function () { this.div.innerHTML = ""; d.remove(this.set) }
    })
})(); (function () {
    var d = window.AmCharts; d.AmMap = d.Class({
        inherits: d.AmChart, construct: function (a) {
            this.cname = "AmMap"; this.type = "map"; this.theme = a; this.svgNotSupported = "This browser doesn't support SVG. Use Chrome, Firefox, Internet Explorer 9 or later."; this.createEvents("rollOverMapObject", "rollOutMapObject", "clickMapObject", "mouseDownMapObject", "selectedObjectChanged", "homeButtonClicked", "zoomCompleted", "dragCompleted", "positionChanged", "writeDevInfo", "click"); this.zoomDuration = .6; this.zoomControl = new d.ZoomControl(a);
            this.fitMapToContainer = !0; this.mouseWheelZoomEnabled = this.backgroundZoomsToTop = !1; this.allowClickOnSelectedObject = this.useHandCursorOnClickableOjects = this.showBalloonOnSelectedObject = !0; this.showObjectsAfterZoom = this.wheelBusy = !1; this.zoomOnDoubleClick = this.useObjectColorForBalloon = !0; this.allowMultipleDescriptionWindows = !1; this.dragMap = this.centerMap = this.linesAboveImages = !0; this.colorSteps = 5; this.showAreasInList = !0; this.showLinesInList = this.showImagesInList = !1; this.areasProcessor = new d.AreasProcessor(this);
            this.areasSettings = new d.AreasSettings(a); this.imagesProcessor = new d.ImagesProcessor(this); this.imagesSettings = new d.ImagesSettings(a); this.linesProcessor = new d.LinesProcessor(this); this.linesSettings = new d.LinesSettings(a); this.initialTouchZoom = 1; this.showDescriptionOnHover = !1; d.AmMap.base.construct.call(this, a); this.creditsPosition = "bottom-left"; this.product = "ammap"; this.areasClasses = {}; d.applyTheme(this, a, this.cname)
        }, initChart: function () {
            this.zoomInstantly = !0; var a = this.container; this.panRequired =
            !0; if (this.sizeChanged && d.hasSVG && this.chartCreated) {
                this.freeLabelsSet && this.freeLabelsSet.remove(); this.freeLabelsSet = a.set(); this.container.setSize(this.realWidth, this.realHeight); this.resizeMap(); this.drawBackground(); this.redrawLabels(); this.drawTitles(); this.processObjects(); this.rescaleObjects(); this.zoomControl.init(this, a); this.drawBg(); var b = this.smallMap; b && b.init(this, a); (b = this.valueLegend) && b.init(this, a); this.sizeChanged = !1; this.zoomToLongLat(this.zLevelTemp, this.zLongTemp, this.zLatTemp,
                !0); this.previousWidth = this.realWidth; this.previousHeight = this.realHeight; this.updateSmallMap(); this.linkSet.toFront(); this.zoomControl.update && this.zoomControl.update()
            } else (d.AmMap.base.initChart.call(this), d.hasSVG) ? (this.dataChanged && (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, a = this.legend) && (a.position = "absolute", a.invalidateSize()), this.createDescriptionsDiv(), this.svgAreas = [], this.svgAreasById = {}, this.drawChart()) : (this.chartDiv.style.textAlign = "", this.chartDiv.setAttribute("class",
            "ammapAlert"), this.chartDiv.innerHTML = this.svgNotSupported, this.fire({ type: "failed", chart: this }))
        }, storeTemp: function () { var a = this.zoomLongitude(); isNaN(a) || (this.zLongTemp = a); a = this.zoomLatitude(); isNaN(a) || (this.zLatTemp = a); a = this.zoomLevel(); isNaN(a) || (this.zLevelTemp = a) }, invalidateSize: function () { this.storeTemp(); d.AmMap.base.invalidateSize.call(this) }, validateSize: function () { d.hasSVG && 0 < this.realWidth && 0 < this.realHeight && this.storeTemp(); d.AmMap.base.validateSize.call(this) }, handleWheelReal: function (a) {
            if (!this.wheelBusy) {
                this.stopAnimation();
                var b = this.zoomLevel(), c = this.zoomControl, e = c.zoomFactor; this.wheelBusy = !0; a = d.fitToBounds(0 < a ? b * e : b / e, c.minZoomLevel, c.maxZoomLevel); e = this.mouseX / this.mapWidth; c = this.mouseY / this.mapHeight; e = (this.zoomX() - e) * (a / b) + e; b = (this.zoomY() - c) * (a / b) + c; this.zoomTo(a, e, b)
            }
        }, addLegend: function (a, b) { a.position = "absolute"; a.autoMargins = !1; a.valueWidth = 0; a.switchable = !1; d.AmMap.base.addLegend.call(this, a, b); void 0 === a.enabled && (a.enabled = !0); return a }, handleLegendEvent: function () { }, createDescriptionsDiv: function () {
            if (!this.descriptionsDiv) {
                var a =
                document.createElement("div"), b = a.style; b.position = "absolute"; b.left = "0px"; b.top = "0px"; this.descriptionsDiv = a
            } this.containerDiv.appendChild(this.descriptionsDiv)
        }, drawChart: function () {
            d.AmMap.base.drawChart.call(this); var a = this.dataProvider; this.dataProvider = a = d.extend(a, new d.MapData, !0); this.areasSettings = d.processObject(this.areasSettings, d.AreasSettings, this.theme); this.imagesSettings = d.processObject(this.imagesSettings, d.ImagesSettings, this.theme); this.linesSettings = d.processObject(this.linesSettings,
            d.LinesSettings, this.theme); var b = this.container; this.mapContainer && this.mapContainer.remove(); this.mapContainer = b.set(); this.graphsSet.push(this.mapContainer); var c; a.map && (c = d.maps[a.map]); a.mapVar && (c = a.mapVar); c ? (this.svgData = c.svg, this.getBounds(), this.buildEverything()) : (a = a.mapURL) && this.loadXml(a); this.balloonsSet.toFront()
        }, drawBg: function () { var a = this; a.background.click(function () { a.handleBackgroundClick() }) }, buildEverything: function () {
            if (0 < this.realWidth && 0 < this.realHeight) {
                var a = this.container;
                this.zoomControl = d.processObject(this.zoomControl, d.ZoomControl, this.theme); this.zoomControl.init(this, a); this.drawBg(); this.buildSVGMap(); var b = this.smallMap; b && (b = this.smallMap = d.processObject(this.smallMap, d.SmallMap, this.theme), b.init(this, a)); b = this.dataProvider; isNaN(b.zoomX) && isNaN(b.zoomY) && isNaN(b.zoomLatitude) && isNaN(b.zoomLongitude) && (this.centerMap ? (b.zoomLatitude = this.coordinateToLatitude(this.mapHeight / 2), b.zoomLongitude = this.coordinateToLongitude(this.mapWidth / 2)) : (b.zoomX = 0, b.zoomY =
                0), this.zoomInstantly = !0); this.selectObject(this.dataProvider); this.processAreas(); if (b = this.valueLegend) this.valueLegend = b = d.processObject(b, d.ValueLegend, this.theme), b.init(this, a); this.objectList && (a = this.objectList = d.processObject(this.objectList, d.ObjectList)) && (this.clearObjectList(), a.init(this)); this.dispDUpd(); this.linkSet.toFront()
            } else this.cleanChart()
        }, hideGroup: function (a) { this.showHideGroup(a, !1) }, showGroup: function (a) { this.showHideGroup(a, !0) }, showHideGroup: function (a, b) {
            this.showHideReal(this.imagesProcessor.allObjects,
            a, b); this.showHideReal(this.areasProcessor.allObjects, a, b); this.showHideReal(this.linesProcessor.allObjects, a, b)
        }, showHideReal: function (a, b, c) { var e; for (e = 0; e < a.length; e++) { var d = a[e]; if (d.groupId == b) { var f = d.displayObject; f && (c ? (d.hidden = !1, f.show()) : (d.hidden = !0, f.hide())) } } }, update: function () { d.hasSVG && (d.AmMap.base.update.call(this), this.zoomControl && this.zoomControl.update && this.zoomControl.update()) }, animateMap: function () {
            var a = this; a.totalFrames = a.zoomDuration * d.updateRate; a.totalFrames += 1;
            a.frame = 0; a.tweenPercent = 0; a.balloon.hide(0); setTimeout(function () { a.updateSize.call(a) }, 1E3 / d.updateRate)
        }, updateSize: function () {
            var a = this, b = a.totalFrames; a.preventHover = !0; a.frame <= b ? (a.frame++, b = d.easeOutSine(0, a.frame, 0, 1, b), 1 <= b ? (b = 1, a.preventHover = !1, a.wheelBusy = !1) : window.requestAnimationFrame ? window.requestAnimationFrame(function () { a.updateSize.call(a) }) : setTimeout(function () { a.updateSize.call(a) }, 1E3 / d.updateRate), .8 < b && (a.preventHover = !1)) : (b = 1, a.preventHover = !1, a.wheelBusy = !1); a.tweenPercent =
            b; a.rescaleMapAndObjects()
        }, rescaleMapAndObjects: function () {
            var a = this.initialScale, b = this.initialX, c = this.initialY, e = this.tweenPercent, a = a + (this.finalScale - a) * e; this.mapContainer.translate(b + (this.finalX - b) * e, c + (this.finalY - c) * e, a, !0); if (this.areasSettings.adjustOutlineThickness) {
                for (var b = this.svgAreas, d = 0; d < b.length; d++) (c = b[d]) && c.setAttr("stroke-width", this.areasSettings.outlineThickness / a); if (b = this.dataProvider.areas) for (d = 0; d < b.length; d++) {
                    var c = b[d], f = c.displayObject; f && f.setAttr("stroke-width",
                    c.outlineThicknessReal / a)
                }
            } this.rescaleObjects(); this.positionChanged(); this.updateSmallMap(); 1 == e && this.fire({ type: "zoomCompleted", chart: this })
        }, updateSmallMap: function () { this.smallMap && this.smallMap.update() }, rescaleObjects: function () {
            var a = this.mapContainer.scale, b = this.imagesProcessor.objectsToResize, c; for (c = 0; c < b.length; c++) { var e = b[c].image; e.translate(e.x, e.y, b[c].scale / a, !0) } b = this.imagesProcessor.labelsToReposition; for (c = 0; c < b.length; c++) e = b[c], e.imageLabel && this.imagesProcessor.positionLabel(e.imageLabel,
            e, e.labelPositionReal); b = this.linesProcessor; if (e = b.linesToResize) for (c = 0; c < e.length; c++) { var d = e[c]; d.line.setAttr("stroke-width", d.thickness / a) } b = b.objectsToResize; for (c = 0; c < b.length; c++) e = b[c], e.translate(e.x, e.y, 1 / a, !0)
        }, handleTouchEnd: function (a) { this.initialDistance = NaN; this.mouseIsDown = this.isDragging = !1; d.AmMap.base.handleTouchEnd.call(this, a) }, handleMouseDown: function (a) {
            d.resetMouseOver(); this.mouseIsDown = this.mouseIsOver = !0; this.balloon.hide(0); a && this.mouseIsOver && a.preventDefault && this.panEventsEnabled &&
            a.preventDefault(); if (this.chartCreated && !this.preventHover && (this.initialTouchZoom = this.zoomLevel(), this.dragMap && (this.stopAnimation(), this.mapContainerClickX = this.mapContainer.x, this.mapContainerClickY = this.mapContainer.y), a || (a = window.event), a.shiftKey && !0 === this.developerMode && this.getDevInfo(), a && a.touches)) {
                var b = this.mouseX, c = this.mouseY, e = a.touches.item(1); e && this.panEventsEnabled && this.boundingRect && (a = e.clientX - this.boundingRect.left, e = e.clientY - this.boundingRect.top, this.middleXP = (b + (a -
                b) / 2) / this.realWidth, this.middleYP = (c + (e - c) / 2) / this.realHeight, this.initialDistance = Math.sqrt(Math.pow(a - b, 2) + Math.pow(e - c, 2)))
            }
        }, stopDrag: function () { this.isDragging = !1 }, handleReleaseOutside: function () {
            if (d.isModern) {
                var a = this; a.mouseIsDown = !1; setTimeout(function () { a.resetPinch.call(a) }, 100); if (!a.preventHover) {
                    a.stopDrag(); var b = a.zoomControl; b && b.draggerUp && b.draggerUp(); a.mapWasDragged = !1; var b = a.mapContainer, c = a.mapContainerClickX, e = a.mapContainerClickY; isNaN(c) || isNaN(e) || !(2 < Math.abs(b.x - c) ||
                    Math.abs(b.y - e)) || (a.mapWasDragged = !0, b = { type: "dragCompleted", zoomX: a.zoomX(), zoomY: a.zoomY(), zoomLevel: a.zoomLevel(), chart: a }, a.fire(b)); (a.mouseIsOver && !a.mapWasDragged && !a.skipClick || a.wasTouched && 4 > Math.abs(a.mouseX - a.tmx) && 4 > Math.abs(a.mouseY - a.tmy)) && a.fire({ type: "click", x: a.mouseX, y: a.mouseY, chart: a }); a.mapContainerClickX = NaN; a.mapContainerClickY = NaN; a.objectWasClicked = !1; a.zoomOnDoubleClick && a.mouseIsOver && (b = (new Date).getTime(), 200 > b - a.previousClickTime && 40 < b - a.previousClickTime && a.doDoubleClickZoom(),
                    a.previousClickTime = b)
                } a.wasTouched = !1
            }
        }, resetPinch: function () { this.mapWasPinched = !1 }, handleMouseMove: function (a) {
            var b = this; d.AmMap.base.handleMouseMove.call(b, a); if (!a || !a.touches || !b.tapToActivate || b.tapped) {
                b.panEventsEnabled && b.mouseIsOver && a && a.preventDefault && a.preventDefault(); var c = b.previuosMouseX, e = b.previuosMouseY, g = b.mouseX, f = b.mouseY, h = b.zoomControl; isNaN(c) && (c = g); isNaN(e) && (e = f); b.mouse2X = NaN; b.mouse2Y = NaN; a && a.touches && (a = a.touches.item(1)) && b.panEventsEnabled && b.boundingRect && (b.mouse2X =
                a.clientX - b.boundingRect.left, b.mouse2Y = a.clientY - b.boundingRect.top); if (a = b.mapContainer) {
                    var k = b.mouse2X, l = b.mouse2Y; b.pinchTO && clearTimeout(b.pinchTO); b.pinchTO = setTimeout(function () { b.resetPinch.call(b) }, 1E3); var m = b.realHeight, n = b.realWidth, r = b.mapWidth, v = b.mapHeight; b.mouseIsDown && b.dragMap && (5 < Math.abs(b.previuosMouseX - b.mouseX) || 5 < Math.abs(b.previuosMouseY - b.mouseY)) && (b.isDragging = !0); if (!isNaN(k)) {
                        b.stopDrag(); var p = Math.sqrt(Math.pow(k - g, 2) + Math.pow(l - f, 2)), q = b.initialDistance; isNaN(q) &&
                        (q = Math.sqrt(Math.pow(k - g, 2) + Math.pow(l - f, 2))); if (!isNaN(q)) { var k = b.initialTouchZoom * p / q, k = d.fitToBounds(k, h.minZoomLevel, h.maxZoomLevel), h = b.zoomLevel(), q = b.middleXP, l = b.middleYP, p = m / v, x = n / r, q = (b.zoomX() - q * x) * (k / h) + q * x, l = (b.zoomY() - l * p) * (k / h) + l * p; .1 < Math.abs(k - h) && (b.zoomTo(k, q, l, !0), b.mapWasPinched = !0, clearTimeout(b.pinchTO)) }
                    } k = a.scale; b.isDragging && (b.balloon.hide(0), b.positionChanged(), c = a.x + (g - c), e = a.y + (f - e), b.preventDragOut && (v = -v * k + m / 2, m /= 2, c = d.fitToBounds(c, -r * k + n / 2, n / 2), e = d.fitToBounds(e,
                    v, m)), a.translate(c, e, k, !0), b.updateSmallMap()); b.previuosMouseX = g; b.previuosMouseY = f
                }
            }
        }, selectObject: function (a, b) {
            var c = this; a || (a = c.dataProvider); a.isOver = !1; var e = a.linkToObject; d.isString(e) && (e = c.getObjectById(e)); a.useTargetsZoomValues && e && (a.zoomX = e.zoomX, a.zoomY = e.zoomY, a.zoomLatitude = e.zoomLatitude, a.zoomLongitude = e.zoomLongitude, a.zoomLevel = e.zoomLevel); var g = c.selectedObject; g && c.returnInitialColor(g); c.selectedObject = a; var f = !1, h, k; "MapArea" == a.objectType && (a.autoZoomReal && (f = !0), h = c.areasSettings.selectedOutlineColor,
            k = c.areasSettings.selectedOutlineThickness); if (e && !f && (d.isString(e) && (e = c.getObjectById(e)), isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY))) { if (c.extendMapData(e)) return; c.selectObject(e); return } c.allowMultipleDescriptionWindows || c.closeAllDescriptions(); clearTimeout(c.selectedObjectTimeOut); clearTimeout(c.processObjectsTimeOut); e = c.zoomDuration; !f && isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY) ? (c.showDescriptionAndGetUrl(), b || c.processObjects()) : (c.selectedObjectTimeOut = setTimeout(function () { c.showDescriptionAndGetUrl.call(c) },
            1E3 * e + 200), c.showObjectsAfterZoom) ? b || (c.processObjectsTimeOut = setTimeout(function () { c.processObjects.call(c) }, 1E3 * e + 200)) : b || c.processObjects(); e = a.displayObject; f = a.selectedColorReal; "MapImage" == a.objectType && (h = c.imagesSettings.selectedOutlineColor, k = c.imagesSettings.selectedOutlineThickness, e = a.image); if (e) {
                if (d.setCN(c, e, "selected-object"), a.bringForwardOnHover && e.toFront(), !a.preserveOriginalAttributes) {
                    e.setAttr("stroke", a.outlineColorReal); void 0 !== f && e.setAttr("fill", f); void 0 !== h && e.setAttr("stroke",
                    h); void 0 !== k && e.setAttr("stroke-width", k); if ("MapLine" == a.objectType) { var l = a.lineSvg; l && l.setAttr("stroke", f); if (l = a.arrowSvg) l.setAttr("fill", f), l.setAttr("stroke", f) } if (l = a.imageLabel) { var m = a.selectedLabelColorReal; void 0 !== m && l.setAttr("fill", m) } a.selectable || (e.setAttr("cursor", "default"), l && l.setAttr("cursor", "default"))
                }
            } else c.returnInitialColorReal(a); if (e = a.groupId) for (l = a.groupArray, l || (l = c.getGroupById(e), a.groupArray = l), m = 0; m < l.length; m++) {
                var n = l[m]; n.isOver = !1; e = n.displayObject; "MapImage" ==
                n.objectType && (e = n.image); if (e) { var r = n.selectedColorReal; void 0 !== r && e.setAttr("fill", r); void 0 !== h && e.setAttr("stroke", h); void 0 !== k && e.setAttr("stroke-width", k); "MapLine" == n.objectType && ((e = n.lineSvg) && e.setAttr("stroke", f), e = n.arrowSvg) && (e.setAttr("fill", f), e.setAttr("stroke", f)) }
            } c.zoomToSelectedObject(); g != a && c.fire({ type: "selectedObjectChanged", chart: c })
        }, returnInitialColor: function (a, b) {
            this.returnInitialColorReal(a); b && (a.isFirst = !1); if (this.selectedObject.bringForwardOnHover) {
                var c = this.selectedObject.displayObject;
                c && c.toFront()
            } if (c = a.groupId) { var c = this.getGroupById(c), d; for (d = 0; d < c.length; d++) this.returnInitialColorReal(c[d]), b && (c[d].isFirst = !1) }
        }, closeAllDescriptions: function () { this.descriptionsDiv.innerHTML = "" }, returnInitialColorReal: function (a) {
            a.isOver = !1; var b = a.displayObject; if (b) {
                b.toPrevious(); if ("MapImage" == a.objectType) { var c = a.tempScale; isNaN(c) || b.translate(b.x, b.y, c, !0); a.tempScale = NaN; b = a.image } c = a.colorReal; if ("MapLine" == a.objectType) {
                    var d = a.lineSvg; d && d.setAttr("stroke", c); if (d = a.arrowSvg) d.setAttr("fill",
                    c), d.setAttr("stroke", c)
                } var d = a.alphaReal, g = a.outlineAlphaReal, f = a.outlineThicknessReal, h = a.outlineColorReal; if (a.showAsSelected) { var c = a.selectedColorReal, k, l; "MapImage" == a.objectType && (k = this.imagesSettings.selectedOutlineColor, l = this.imagesSettings.selectedOutlineThickness); "MapArea" == a.objectType && (k = this.areasSettings.selectedOutlineColor, l = this.areasSettings.selectedOutlineThickness); void 0 !== k && (h = k); void 0 !== l && (f = l) } "bubble" == a.type && (c = void 0); void 0 !== c && b.setAttr("fill", c); if (k = a.image) k.setAttr("fill",
                c), k.setAttr("stroke", h), k.setAttr("stroke-width", f), k.setAttr("fill-opacity", d), k.setAttr("stroke-opacity", g); "MapArea" == a.objectType && (c = 1, this.areasSettings.adjustOutlineThickness && (c = this.zoomLevel()), b.setAttr("stroke", h), b.setAttr("stroke-width", f / c), b.setAttr("fill-opacity", d), b.setAttr("stroke-opacity", g)); (c = a.pattern) && b.pattern(c, this.mapScale, this.path); (b = a.imageLabel) && !a.labelInactive && (a.showAsSelected && void 0 !== a.selectedLabelColor ? b.setAttr("fill", a.selectedLabelColor) : b.setAttr("fill",
                a.labelColorReal))
            }
        }, zoomToRectangle: function (a, b, c, e) { var g = this.realWidth, f = this.realHeight, h = this.mapSet.scale, k = this.zoomControl, g = d.fitToBounds(c / g > e / f ? .8 * g / (c * h) : .8 * f / (e * h), k.minZoomLevel, k.maxZoomLevel); this.zoomToMapXY(g, (a + c / 2) * h, (b + e / 2) * h) }, zoomToLatLongRectangle: function (a, b, c, e) {
            var g = this.dataProvider, f = this.zoomControl, h = Math.abs(c - a), k = Math.abs(b - e), l = Math.abs(g.rightLongitude - g.leftLongitude), g = Math.abs(g.topLatitude - g.bottomLatitude), f = d.fitToBounds(h / l > k / g ? .8 * l / h : .8 * g / k, f.minZoomLevel,
            f.maxZoomLevel); this.zoomToLongLat(f, a + (c - a) / 2, e + (b - e) / 2)
        }, getGroupById: function (a) { var b = []; this.getGroup(this.imagesProcessor.allObjects, a, b); this.getGroup(this.linesProcessor.allObjects, a, b); this.getGroup(this.areasProcessor.allObjects, a, b); return b }, zoomToGroup: function (a) {
            a = "object" == typeof a ? a : this.getGroupById(a); var b, c, d, g, f; for (f = 0; f < a.length; f++) {
                var h = a[f].displayObject; if (h) {
                    var k = h.getBBox(), h = k.y, l = k.y + k.height, m = k.x, k = k.x + k.width; if (h < b || isNaN(b)) b = h; if (l > g || isNaN(g)) g = l; if (m < c || isNaN(c)) c =
                    m; if (k > d || isNaN(d)) d = k
                }
            } a = this.mapSet.getBBox(); c -= a.x; d -= a.x; g -= a.y; b -= a.y; this.zoomToRectangle(c, b, d - c, g - b)
        }, getGroup: function (a, b, c) { if (a) { var d; for (d = 0; d < a.length; d++) { var g = a[d]; g.groupId == b && c.push(g) } } }, zoomToStageXY: function (a, b, c, e) { if (!this.objectWasClicked) { var g = this.zoomControl; a = d.fitToBounds(a, g.minZoomLevel, g.maxZoomLevel); g = this.zoomLevel(); c = this.coordinateToLatitude((c - this.mapContainer.y) / g); b = this.coordinateToLongitude((b - this.mapContainer.x) / g); this.zoomToLongLat(a, b, c, e) } },
        zoomToLongLat: function (a, b, c, d) { b = this.longitudeToCoordinate(b); c = this.latitudeToCoordinate(c); this.zoomToMapXY(a, b, c, d) }, zoomToMapXY: function (a, b, c, d) { var g = this.mapWidth, f = this.mapHeight; this.zoomTo(a, -(b / g) * a + this.realWidth / g / 2, -(c / f) * a + this.realHeight / f / 2, d) }, zoomToObject: function (a) {
            if (a) {
                var b = a.zoomLatitude, c = a.zoomLongitude, e = a.zoomLevel, g = this.zoomInstantly, f = a.zoomX, h = a.zoomY, k = this.realWidth, l = this.realHeight; isNaN(e) || (isNaN(b) || isNaN(c) ? this.zoomTo(e, f, h, g) : this.zoomToLongLat(e, c, b, g));
                this.zoomInstantly = !1; "MapImage" == a.objectType && isNaN(a.zoomX) && isNaN(a.zoomY) && isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude) && !isNaN(a.latitude) && !isNaN(a.longitude) && this.zoomToLongLat(a.zoomLevel, a.longitude, a.latitude); "MapArea" == a.objectType && (f = a.displayObject.getBBox(), b = this.mapScale, c = f.x * b, e = f.y * b, g = f.width * b, f = f.height * b, k = a.autoZoomReal && isNaN(a.zoomLevel) ? g / k > f / l ? .8 * k / g : .8 * l / f : a.zoomLevel, l = this.zoomControl, k = d.fitToBounds(k, l.minZoomLevel, l.maxZoomLevel), isNaN(a.zoomX) && isNaN(a.zoomY) &&
                isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude) && (a = this.mapSet.getBBox(), this.zoomToMapXY(k, -a.x * b + c + g / 2, -a.y * b + e + f / 2))); this.zoomControl.update()
            }
        }, zoomToSelectedObject: function () { this.zoomToObject(this.selectedObject) }, zoomTo: function (a, b, c, e) {
            var g = this.zoomControl; a = d.fitToBounds(a, g.minZoomLevel, g.maxZoomLevel); g = this.zoomLevel(); isNaN(b) && (b = this.realWidth / this.mapWidth, b = (this.zoomX() - .5 * b) * (a / g) + .5 * b); isNaN(c) && (c = this.realHeight / this.mapHeight, c = (this.zoomY() - .5 * c) * (a / g) + .5 * c); this.stopAnimation();
            isNaN(a) || (g = this.mapContainer, this.initialX = g.x, this.initialY = g.y, this.initialScale = g.scale, this.finalX = this.mapWidth * b, this.finalY = this.mapHeight * c, this.finalScale = a, this.finalX != this.initialX || this.finalY != this.initialY || this.finalScale != this.initialScale ? e ? (this.tweenPercent = 1, this.rescaleMapAndObjects(), this.wheelBusy = !1) : this.animateMap() : this.wheelBusy = !1)
        }, loadXml: function (a) {
            var b; window.XMLHttpRequest && (b = new XMLHttpRequest); b.overrideMimeType && b.overrideMimeType("text/xml"); b.open("GET",
            a, !1); b.send(); this.parseXMLObject(b.responseXML); this.svgData && this.buildEverything()
        }, stopAnimation: function () { this.frame = this.totalFrames }, processObjects: function () {
            var a = this.selectedObject; if (0 < a.images.length || 0 < a.areas.length || 0 < a.lines.length || a == this.dataProvider) {
                var b = this.container, c = this.stageImagesContainer; c && c.remove(); this.stageImagesContainer = c = b.set(); this.trendLinesSet.push(c); var d = this.stageLinesContainer; d && d.remove(); this.stageLinesContainer = d = b.set(); this.trendLinesSet.push(d);
                var g = this.mapImagesContainer; g && g.remove(); this.mapImagesContainer = g = b.set(); this.mapContainer.push(g); var f = this.mapLinesContainer; f && f.remove(); this.mapLinesContainer = f = b.set(); this.mapContainer.push(f); this.linesAboveImages ? (g.toFront(), c.toFront(), f.toFront(), d.toFront()) : (f.toFront(), d.toFront(), g.toFront(), c.toFront()); a && (this.imagesProcessor.reset(), this.linesProcessor.reset(), this.linesAboveImages ? (this.imagesProcessor.process(a), this.linesProcessor.process(a)) : (this.linesProcessor.process(a),
                this.imagesProcessor.process(a))); this.rescaleObjects()
            }
        }, processAreas: function () { this.areasProcessor.process(this.dataProvider) }, buildSVGMap: function () {
            var a = this.svgData.g.path, b = this.container, c = b.set(); void 0 === a.length && (a = [a]); var d; for (d = 0; d < a.length; d++) {
                var g = a[d], f = g.d, h = g.title; g.titleTr && (h = g.titleTr); f = b.path(f); f.id = g.id; if (this.areasSettings.preserveOriginalAttributes) { f.customAttr = {}; for (var k in g) "d" != k && "id" != k && "title" != k && (f.customAttr[k] = g[k]) } this.svgAreasById[g.id] = {
                    area: f,
                    title: h, className: g["class"]
                }; this.svgAreas.push(f); c.push(f)
            } this.mapSet = c; this.mapContainer.push(c); this.resizeMap()
        }, addObjectEventListeners: function (a, b) {
            var c = this; a.mousedown(function (a) { c.mouseDownMapObject(b, a) }).mouseup(function (a) { c.clickMapObject(b, a) }).mouseover(function (a) { c.balloonX = NaN; c.rollOverMapObject(b, !0, a) }).mouseout(function (a) { c.balloonX = NaN; c.rollOutMapObject(b, a) }).touchend(function (a) {
                4 > Math.abs(c.mouseX - c.tmx) && 4 > Math.abs(c.mouseY - c.tmy) && (c.tapped = !0); c.tapToActivate &&
                !c.tapped || c.mapWasDragged || c.mapWasPinched || (c.balloonX = NaN, c.rollOverMapObject(b, !0, a), c.clickMapObject(b, a))
            }).touchstart(function (a) { c.tmx = c.mouseX; c.tmy = c.mouseY; c.mouseDownMapObject(b, a) })
        }, checkIfSelected: function (a) { var b = this.selectedObject; if (b == a) return !0; if (b = b.groupId) { var b = this.getGroupById(b), c; for (c = 0; c < b.length; c++) if (b[c] == a) return !0 } return !1 }, clearMap: function () { this.chartDiv.innerHTML = ""; this.clearObjectList() }, clearObjectList: function () {
            var a = this.objectList; a && a.div && (a.div.innerHTML =
            "")
        }, checkIfLast: function (a) { if (a) { var b = a.parentNode; if (b && b.lastChild == a) return !0 } return !1 }, showAsRolledOver: function (a) {
            var b = a.displayObject; if (!a.showAsSelected && b && !a.isOver) {
                b.node.onmouseout = function () { }; b.node.onmouseover = function () { }; b.node.onclick = function () { }; !a.isFirst && a.bringForwardOnHover && (b.toFront(), a.isFirst = !0); var c = a.rollOverColorReal, e; a.preserveOriginalAttributes && (c = void 0); void 0 == c && (isNaN(a.rollOverBrightnessReal) || (c = d.adjustLuminosity(a.colorReal, a.rollOverBrightnessReal /
                100))); if (void 0 != c) if ("MapImage" == a.objectType) (e = a.image) && e.setAttr("fill", c); else if ("MapLine" == a.objectType) { if ((e = a.lineSvg) && e.setAttr("stroke", c), e = a.arrowSvg) e.setAttr("fill", c), e.setAttr("stroke", c) } else b.setAttr("fill", c); (c = a.imageLabel) && !a.labelInactive && (e = a.labelRollOverColorReal, void 0 != e && c.setAttr("fill", e)); c = a.rollOverOutlineColorReal; void 0 != c && ("MapImage" == a.objectType ? (e = a.image) && e.setAttr("stroke", c) : b.setAttr("stroke", c)); "MapImage" == a.objectType ? (c = this.imagesSettings.rollOverOutlineThickness,
                (e = a.image) && (isNaN(c) || e.setAttr("stroke-width", c))) : (c = this.areasSettings.rollOverOutlineThickness, isNaN(c) || b.setAttr("stroke-width", c)); if ("MapArea" == a.objectType) {
                    c = this.areasSettings; e = a.rollOverAlphaReal; isNaN(e) || b.setAttr("fill-opacity", e); e = c.rollOverOutlineAlpha; isNaN(e) || b.setAttr("stroke-opacity", e); e = 1; this.areasSettings.adjustOutlineThickness && (e = this.zoomLevel()); var g = c.rollOverOutlineThickness; isNaN(g) || b.setAttr("stroke-width", g / e); (c = c.rollOverPattern) && b.pattern(c, this.mapScale,
                    this.path)
                } "MapImage" == a.objectType && (c = a.rollOverScaleReal, isNaN(c) || 1 == c || (e = b.scale, isNaN(e) && (e = 1), a.tempScale = e, b.translate(b.x, b.y, e * c, !0))); this.useHandCursorOnClickableOjects && this.checkIfClickable(a) && b.setAttr("cursor", "pointer"); a.mouseEnabled && this.addObjectEventListeners(b, a); a.isOver = !0
            }
        }, rollOverMapObject: function (a, b, c) {
            if (this.chartCreated) {
                this.handleMouseMove(); var d = this.previouslyHovered; d && d != a ? (!1 === this.checkIfSelected(d) && (this.returnInitialColor(d, !0), this.previouslyHovered =
                null), this.balloon.hide(0)) : clearTimeout(this.hoverInt); if (!this.preventHover) {
                    if (!1 === this.checkIfSelected(a)) { if (d = a.groupId) { var d = this.getGroupById(d), g; for (g = 0; g < d.length; g++) d[g] != a && this.showAsRolledOver(d[g]) } this.showAsRolledOver(a) } else (d = a.displayObject) && (this.allowClickOnSelectedObject ? d.setAttr("cursor", "pointer") : d.setAttr("cursor", "default")); this.showDescriptionOnHover ? this.showDescription(a) : !this.showBalloonOnSelectedObject && this.checkIfSelected(a) || !1 === b || (g = this.balloon, this.balloon.fixedPosition =
                    !1, b = a.colorReal, d = "", void 0 !== b && this.useObjectColorForBalloon || (b = g.fillColor), (g = a.balloonTextReal) && (d = this.formatString(g, a)), this.balloonLabelFunction && (d = this.balloonLabelFunction(a, this)), "MapArea" != a.objectType && (this.balloonX = NaN), d && "" !== d && this.showBalloon(d, b, !1, this.balloonX, this.balloonY)); this.fire({ type: "rollOverMapObject", mapObject: a, chart: this, event: c }); this.previouslyHovered = a
                }
            }
        }, longitudeToX: function (a) { return this.longitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.x },
        latitudeToY: function (a) { return this.latitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.y }, latitudeToStageY: function (a) { return this.latitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.y }, longitudeToStageX: function (a) { return this.longitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.x }, stageXToLongitude: function (a) { a = (a - this.mapContainer.x) / this.zoomLevel(); return this.coordinateToLongitude(a) }, stageYToLatitude: function (a) { a = (a - this.mapContainer.y) / this.zoomLevel(); return this.coordinateToLatitude(a) },
        rollOutMapObject: function (a, b) { this.hideBalloon(); this.chartCreated && a.isOver && (this.checkIfSelected(a) || this.returnInitialColor(a), this.fire({ type: "rollOutMapObject", mapObject: a, chart: this, event: b })) }, formatString: function (a, b) {
            var c = this.nf, e = this.pf, g = b.title; b.titleTr && (g = b.titleTr); void 0 == g && (g = ""); var f = b.value, f = isNaN(f) ? "" : d.formatNumber(f, c), c = b.percents, c = isNaN(c) ? "" : d.formatNumber(c, e), e = b.description; void 0 == e && (e = ""); var h = b.customData; void 0 == h && (h = ""); return a = d.massReplace(a, {
                "[[title]]": g,
                "[[value]]": f, "[[percent]]": c, "[[description]]": e, "[[customData]]": h
            })
        }, mouseDownMapObject: function (a, b) { this.fire({ type: "mouseDownMapObject", mapObject: a, chart: this, event: b }) }, clickMapObject: function (a, b) {
            var c = this; b && (b.touches || c.hideBalloon()); if (c.chartCreated && !c.preventHover && !c.mapWasDragged && c.checkIfClickable(a) && !c.mapWasPinched) {
                c.selectObject(a); var d = c.zoomLevel(); c.clickLatitude = c.coordinateToLatitude((c.mouseY - c.mapContainer.y) / d); c.clickLongitude = c.coordinateToLongitude((c.mouseX -
                c.mapContainer.x) / d); b && b.touches && setTimeout(function () { c.showBalloonAfterZoom.call(c) }, 1E3 * c.zoomDuration); c.fire({ type: "clickMapObject", mapObject: a, chart: c, event: b }); c.objectWasClicked = !0
            }
        }, showBalloonAfterZoom: function () { this.balloonX = this.longitudeToX(this.clickLongitude); this.balloonY = this.latitudeToY(this.clickLatitude); this.rollOverMapObject(this.selectedObject, !0) }, checkIfClickable: function (a) {
            var b = this.allowClickOnSelectedObject; return this.selectedObject == a && b ? !0 : this.selectedObject !=
            a || b ? !0 === a.selectable || "MapArea" == a.objectType && a.autoZoomReal || a.url || a.linkToObject || 0 < a.images.length || 0 < a.lines.length || !isNaN(a.zoomLevel) || !isNaN(a.zoomX) || !isNaN(a.zoomY) || a.description ? !0 : !1 : !1
        }, resizeMap: function () { var a = this.mapSet; if (a) { var b = 1, c = a.getBBox(), d = this.realWidth, g = this.realHeight, f = c.width, h = c.height; this.fitMapToContainer && (b = f / d > h / g ? d / f : g / h); a.translate(-c.x * b, -c.y * b, b, !0); this.mapScale = b; this.mapHeight = h * b; this.mapWidth = f * b } }, zoomIn: function () {
            var a = this.zoomLevel() * this.zoomControl.zoomFactor;
            this.zoomTo(a)
        }, zoomOut: function () { var a = this.zoomLevel() / this.zoomControl.zoomFactor; this.zoomTo(a) }, moveLeft: function () { var a = this.zoomX() + this.zoomControl.panStepSize; this.zoomTo(this.zoomLevel(), a, this.zoomY()) }, moveRight: function () { var a = this.zoomX() - this.zoomControl.panStepSize; this.zoomTo(this.zoomLevel(), a, this.zoomY()) }, moveUp: function () { var a = this.zoomY() + this.zoomControl.panStepSize; this.zoomTo(this.zoomLevel(), this.zoomX(), a) }, moveDown: function () {
            var a = this.zoomY() - this.zoomControl.panStepSize;
            this.zoomTo(this.zoomLevel(), this.zoomX(), a)
        }, zoomX: function () { return this.mapSet ? Math.round(1E4 * this.mapContainer.x / this.mapWidth) / 1E4 : NaN }, zoomY: function () { return this.mapSet ? Math.round(1E4 * this.mapContainer.y / this.mapHeight) / 1E4 : NaN }, goHome: function () { this.selectObject(this.dataProvider); this.fire({ type: "homeButtonClicked", chart: this }) }, zoomLevel: function () { return Math.round(1E5 * this.mapContainer.scale) / 1E5 }, showDescriptionAndGetUrl: function () {
            var a = this.selectedObject; if (a) {
                this.showDescription();
                var b = a.url; if (b) d.getURL(b, a.urlTarget); else if (b = a.linkToObject) { if (d.isString(b)) { var c = this.getObjectById(b); if (c) { this.selectObject(c); return } } b && a.passZoomValuesToTarget && (b.zoomLatitude = this.zoomLatitude(), b.zoomLongitude = this.zoomLongitude(), b.zoomLevel = this.zoomLevel()); this.extendMapData(b) || this.selectObject(b) }
            }
        }, extendMapData: function (a) {
            var b = a.objectType; if ("MapImage" != b && "MapArea" != b && "MapLine" != b) return d.extend(a, new d.MapData, !0), this.dataProvider = a, this.zoomInstantly = !0, this.validateData(),
            !0
        }, showDescription: function (a) {
            a || (a = this.selectedObject); this.allowMultipleDescriptionWindows || this.closeAllDescriptions(); if (a.description) {
                var b = a.descriptionWindow; b && b.close(); b = new d.DescriptionWindow; a.descriptionWindow = b; var c = a.descriptionWindowWidth, e = a.descriptionWindowHeight, g = a.descriptionWindowLeft, f = a.descriptionWindowTop, h = a.descriptionWindowRight, k = a.descriptionWindowBottom; isNaN(h) || (g = this.realWidth - h); isNaN(k) || (f = this.realHeight - k); var l = a.descriptionWindowX; isNaN(l) || (g = l);
                l = a.descriptionWindowY; isNaN(l) || (f = l); isNaN(g) && (g = this.mouseX, g = g > this.realWidth / 2 ? g - c - 20 : g + 20); isNaN(f) && (f = this.mouseY); b.maxHeight = e; l = a.title; a.titleTr && (l = a.titleTr); b.show(this, this.descriptionsDiv, a.description, l); a = b.div.style; a.position = "absolute"; a.width = c + "px"; a.maxHeight = e + "px"; isNaN(k) || (f -= b.div.offsetHeight); isNaN(h) || (g -= b.div.offsetWidth); a.left = g + "px"; a.top = f + "px"
            }
        }, parseXMLObject: function (a) { var b = { root: {} }; this.parseXMLNode(b, "root", a); this.svgData = b.root.svg; this.getBounds() },
        getBounds: function () { var a = this.dataProvider; try { var b = this.svgData.defs["amcharts:ammap"]; a.leftLongitude = Number(b.leftLongitude); a.rightLongitude = Number(b.rightLongitude); a.topLatitude = Number(b.topLatitude); a.bottomLatitude = Number(b.bottomLatitude); a.projection = b.projection; var c = b.wrappedLongitudes; c && (a.rightLongitude += 360); a.wrappedLongitudes = c } catch (d) { } }, recalcLongitude: function (a) {
            var b = this.dataProvider.leftLongitude, c = this.dataProvider.wrappedLongitudes; return isNaN(a) && c ? a < b ? Number(a) +
            360 : a : a
        }, latitudeToCoordinate: function (a) { var b, c = this.dataProvider; if (this.mapSet) { b = c.topLatitude; var d = c.bottomLatitude; "mercator" == c.projection && (a = this.mercatorLatitudeToCoordinate(a), b = this.mercatorLatitudeToCoordinate(b), d = this.mercatorLatitudeToCoordinate(d)); b = (a - b) / (d - b) * this.mapHeight } return b }, longitudeToCoordinate: function (a) { a = this.recalcLongitude(a); var b, c = this.dataProvider; this.mapSet && (b = c.leftLongitude, b = (a - b) / (c.rightLongitude - b) * this.mapWidth); return b }, mercatorLatitudeToCoordinate: function (a) {
            89.5 <
            a && (a = 89.5); -89.5 > a && (a = -89.5); a = d.degreesToRadians(a); return d.radiansToDegrees(.5 * Math.log((1 + Math.sin(a)) / (1 - Math.sin(a))) / 2)
        }, zoomLatitude: function () { if (this.mapContainer) return this.coordinateToLatitude((-this.mapContainer.y + this.previousHeight / 2) / this.zoomLevel()) }, zoomLongitude: function () { if (this.mapContainer) return this.coordinateToLongitude((-this.mapContainer.x + this.previousWidth / 2) / this.zoomLevel()) }, getAreaCenterLatitude: function (a) {
            a = a.displayObject.getBBox(); var b = this.mapScale; a = -this.mapSet.getBBox().y *
            b + (a.y + a.height / 2) * b; return this.coordinateToLatitude(a)
        }, getAreaCenterLongitude: function (a) { a = a.displayObject.getBBox(); var b = this.mapScale; a = -this.mapSet.getBBox().x * b + (a.x + a.width / 2) * b; return this.coordinateToLongitude(a) }, coordinateToLatitude: function (a) {
            var b; if (this.mapSet) {
                var c = this.dataProvider, e = c.bottomLatitude, g = c.topLatitude; b = this.mapHeight; "mercator" == c.projection ? (c = this.mercatorLatitudeToCoordinate(e), g = this.mercatorLatitudeToCoordinate(g), b = d.radiansToDegrees(2 * Math.atan(Math.exp(2 *
                (a * (c - g) / b + g) * Math.PI / 180)) - .5 * Math.PI)) : b = a / b * (e - g) + g
            } return Math.round(1E6 * b) / 1E6
        }, coordinateToLongitude: function (a) { var b, c = this.dataProvider; this.mapSet && (b = a / this.mapWidth * (c.rightLongitude - c.leftLongitude) + c.leftLongitude); return Math.round(1E6 * b) / 1E6 }, milesToPixels: function (a) { var b = this.dataProvider; return this.mapWidth / (b.rightLongitude - b.leftLongitude) * a / 69.172 }, kilometersToPixels: function (a) { var b = this.dataProvider; return this.mapWidth / (b.rightLongitude - b.leftLongitude) * a / 111.325 }, handleBackgroundClick: function () {
            if (this.backgroundZoomsToTop &&
            !this.mapWasDragged) { var a = this.dataProvider; if (this.checkIfClickable(a)) this.clickMapObject(a); else { var b = a.zoomX, c = a.zoomY, d = a.zoomLongitude, g = a.zoomLatitude, a = a.zoomLevel; isNaN(b) || isNaN(c) || this.zoomTo(a, b, c); isNaN(d) || isNaN(g) || this.zoomToLongLat(a, d, g, !0) } }
        }, parseXMLNode: function (a, b, c, d) {
            void 0 === d && (d = ""); var g, f, h; if (c) {
                var k = c.childNodes.length; for (g = 0; g < k; g++) {
                    f = c.childNodes[g]; var l = f.nodeName, m = f.nodeValue ? this.trim(f.nodeValue) : "", n = !1; f.attributes && 0 < f.attributes.length && (n = !0); if (0 !==
                    f.childNodes.length || "" !== m || !1 !== n) if (3 == f.nodeType || 4 == f.nodeType) { if ("" !== m) { f = 0; for (h in a[b]) a[b].hasOwnProperty(h) && f++; f ? a[b]["#text"] = m : a[b] = m } } else if (1 == f.nodeType) {
                        var r; void 0 !== a[b][l] ? void 0 === a[b][l].length ? (r = a[b][l], a[b][l] = [], a[b][l].push(r), a[b][l].push({}), r = a[b][l][1]) : "object" == typeof a[b][l] && (a[b][l].push({}), r = a[b][l][a[b][l].length - 1]) : (a[b][l] = {}, r = a[b][l]); if (f.attributes && f.attributes.length) for (m = 0; m < f.attributes.length; m++) r[f.attributes[m].name] = f.attributes[m].value;
                        void 0 !== a[b][l].length ? this.parseXMLNode(a[b][l], a[b][l].length - 1, f, d + "  ") : this.parseXMLNode(a[b], l, f, d + "  ")
                    }
                } f = 0; c = ""; for (h in a[b]) "#text" == h ? c = a[b][h] : f++; 0 === f && void 0 === a[b].length && (a[b] = c)
            }
        }, doDoubleClickZoom: function () { if (!this.mapWasDragged) { var a = this.zoomLevel() * this.zoomControl.zoomFactor; this.zoomToStageXY(a, this.mouseX, this.mouseY) } }, getDevInfo: function () {
            var a = this.zoomLevel(), a = {
                chart: this, type: "writeDevInfo", zoomLevel: a, zoomX: this.zoomX(), zoomY: this.zoomY(), zoomLatitude: this.zoomLatitude(),
                zoomLongitude: this.zoomLongitude(), latitude: this.coordinateToLatitude((this.mouseY - this.mapContainer.y) / a), longitude: this.coordinateToLongitude((this.mouseX - this.mapContainer.x) / a), left: this.mouseX, top: this.mouseY, right: this.realWidth - this.mouseX, bottom: this.realHeight - this.mouseY, percentLeft: Math.round(this.mouseX / this.realWidth * 100) + "%", percentTop: Math.round(this.mouseY / this.realHeight * 100) + "%", percentRight: Math.round((this.realWidth - this.mouseX) / this.realWidth * 100) + "%", percentBottom: Math.round((this.realHeight -
                this.mouseY) / this.realHeight * 100) + "%"
            }, b = "zoomLevel:" + a.zoomLevel + ", zoomLongitude:" + a.zoomLongitude + ", zoomLatitude:" + a.zoomLatitude + "\n", b = b + ("zoomX:" + a.zoomX + ", zoomY:" + a.zoomY + "\n"), b = b + ("latitude:" + a.latitude + ", longitude:" + a.longitude + "\n"), b = b + ("left:" + a.left + ", top:" + a.top + "\n"), b = b + ("right:" + a.right + ", bottom:" + a.bottom + "\n"), b = b + ("left:" + a.percentLeft + ", top:" + a.percentTop + "\n"), b = b + ("right:" + a.percentRight + ", bottom:" + a.percentBottom + "\n"); a.str = b; this.fire(a); return a
        }, getXY: function (a,
        b, c) { void 0 !== a && (-1 != String(a).indexOf("%") ? (a = Number(a.split("%").join("")), c && (a = 100 - a), a = Number(a) * b / 100) : c && (a = b - a)); return a }, getObjectById: function (a) { var b = this.dataProvider; if (b.areas) { var c = this.getObject(a, b.areas); if (c) return c } if (c = this.getObject(a, b.images)) return c; if (a = this.getObject(a, b.lines)) return a }, getObject: function (a, b) {
            if (b) {
                var c; for (c = 0; c < b.length; c++) {
                    var d = b[c]; if (d.id == a) return d; if (d.areas) { var g = this.getObject(a, d.areas); if (g) return g } if (g = this.getObject(a, d.images)) return g;
                    if (d = this.getObject(a, d.lines)) return d
                }
            }
        }, parseData: function () { var a = this.dataProvider; this.processObject(a.areas, a, "area"); this.processObject(a.images, a, "image"); this.processObject(a.lines, a, "line") }, processObject: function (a, b, c) {
            if (a) {
                var e; for (e = 0; e < a.length; e++) {
                    var g = a[e]; g.parentObject = b; "area" == c && d.extend(g, new d.MapArea(this.theme), !0); "image" == c && (g = d.extend(g, new d.MapImage(this.theme), !0)); "line" == c && (g = d.extend(g, new d.MapLine(this.theme), !0)); a[e] = g; g.areas && this.processObject(g.areas,
                    g, "area"); g.images && this.processObject(g.images, g, "image"); g.lines && this.processObject(g.lines, g, "line")
                }
            }
        }, positionChanged: function () { var a = { type: "positionChanged", zoomX: this.zoomX(), zoomY: this.zoomY(), zoomLevel: this.zoomLevel(), chart: this }; this.fire(a) }, getX: function (a, b) { return this.getXY(a, this.realWidth, b) }, getY: function (a, b) { return this.getXY(a, this.realHeight, b) }, trim: function (a) {
            if (a) {
                var b; for (b = 0; b < a.length; b++) if (-1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) {
                    a =
                    a.substring(b); break
                } for (b = a.length - 1; 0 <= b; b--) if (-1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) { a = a.substring(0, b + 1); break } return -1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(0)) ? a : ""
            }
        }, destroy: function () { d.AmMap.base.destroy.call(this) }
    })
})(); (function () {
    var d = window.AmCharts; d.ZoomControl = d.Class({
        construct: function (a) {
            this.cname = "ZoomControl"; this.panStepSize = .1; this.zoomFactor = 2; this.maxZoomLevel = 64; this.minZoomLevel = 1; this.panControlEnabled = !1; this.zoomControlEnabled = !0; this.buttonRollOverColor = "#DADADA"; this.buttonFillColor = "#FFFFFF"; this.buttonFillAlpha = 1; this.buttonBorderColor = "#000000"; this.buttonBorderAlpha = .1; this.buttonIconAlpha = this.buttonBorderThickness = 1; this.gridColor = this.buttonIconColor = "#000000"; this.homeIconFile = "homeIcon.gif";
            this.gridBackgroundColor = "#000000"; this.draggerAlpha = this.gridAlpha = this.gridBackgroundAlpha = 0; this.draggerSize = this.buttonSize = 31; this.iconSize = 11; this.homeButtonEnabled = !0; this.buttonCornerRadius = 2; this.gridHeight = 5; this.roundButtons = !0; this.top = this.left = 10; d.applyTheme(this, a, this.cname)
        }, init: function (a, b) {
            var c = this; c.chart = a; d.remove(c.set); var e = b.set(); d.setCN(a, e, "zoom-control"); var g = c.buttonSize, f = c.zoomControlEnabled, h = c.panControlEnabled, k = c.buttonFillColor, l = c.buttonFillAlpha, m = c.buttonBorderThickness,
            n = c.buttonBorderColor, r = c.buttonBorderAlpha, v = c.buttonCornerRadius, p = c.buttonRollOverColor, q = c.gridHeight, x = c.zoomFactor, B = c.minZoomLevel, y = c.maxZoomLevel, A = c.buttonIconAlpha, w = c.buttonIconColor, z = c.roundButtons, D = a.svgIcons, t = a.getX(c.left), u = a.getY(c.top); isNaN(c.right) || (t = a.getX(c.right, !0), t = h ? t - 3 * g : t - g); isNaN(c.bottom) || (u = a.getY(c.bottom, !0), f && (u -= q + 3 * g), u = h ? u - 3 * g : c.homeButtonEnabled ? u - .5 * g : u + g); e.translate(t, u); c.previousDY = NaN; var E, t = g / 4 - 1; if (f) {
                E = b.set(); d.setCN(a, E, "zoom-control-zoom");
                e.push(E); c.set = e; c.zoomSet = E; 5 < q && (f = d.rect(b, g + 6, q + 2 * g + 6, c.gridBackgroundColor, c.gridBackgroundAlpha, 0, 0, 0, 4), d.setCN(a, f, "zoom-bg"), f.translate(-3, -3), f.mouseup(function () { c.handleBgUp() }).touchend(function () { c.handleBgUp() }), E.push(f)); var F = g; z && (F = g / 1.5); c.draggerSize = F; var G = Math.log(y / B) / Math.log(x) + 1; 1E3 < G && (G = 1E3); var f = q / G, C, I = b.set(); I.translate((g - F) / 2 + 1, 1, NaN, !0); E.push(I); for (C = 1; C < G; C++) u = g + C * f, u = d.line(b, [1, F - 2], [u, u], c.gridColor, c.gridAlpha, 1), d.setCN(a, u, "zoom-grid"), I.push(u);
                u = new d.SimpleButton; u.setDownHandler(c.draggerDown, c); u.setClickHandler(c.draggerUp, c); u.init(b, F, f, k, l, m, n, r, v, p); d.setCN(a, u.set, "zoom-dragger"); E.push(u.set); u.set.setAttr("opacity", c.draggerAlpha); c.dragger = u.set; c.previousY = NaN; u = new d.SimpleButton; D ? (F = b.set(), G = d.line(b, [-t, t], [0, 0], w, A, 1), C = d.line(b, [0, 0], [-t, t], w, A, 1), F.push(G), F.push(C), u.svgIcon = F) : u.setIcon(a.pathToImages + "plus.gif", c.iconSize); u.setClickHandler(a.zoomIn, a); u.init(b, g, g, k, l, m, n, r, v, p, A, w, z); d.setCN(a, u.set, "zoom-in");
                E.push(u.set); u = new d.SimpleButton; D ? u.svgIcon = d.line(b, [-t, t], [0, 0], w, A, 1) : u.setIcon(a.pathToImages + "minus.gif", c.iconSize); u.setClickHandler(a.zoomOut, a); u.init(b, g, g, k, l, m, n, r, v, p, A, w, z); u.set.translate(0, q + g); d.setCN(a, u.set, "zoom-out"); E.push(u.set); q -= f; y = Math.log(y / 100) / Math.log(x); c.realStepSize = q / (y - Math.log(B / 100) / Math.log(x)); c.realGridHeight = q; c.stepMax = y
            } h && (h = b.set(), d.setCN(a, h, "zoom-control-pan"), e.push(h), E && E.translate(g, 4 * g), x = new d.SimpleButton, D ? x.svgIcon = d.line(b, [t / 5, -t + t / 5,
            t / 5], [-t, 0, t], w, A, 1) : x.setIcon(a.pathToImages + "panLeft.gif", c.iconSize), x.setClickHandler(a.moveLeft, a), x.init(b, g, g, k, l, m, n, r, v, p, A, w, z), x.set.translate(0, g), d.setCN(a, x.set, "pan-left"), h.push(x.set), x = new d.SimpleButton, D ? x.svgIcon = d.line(b, [-t / 5, t - t / 5, -t / 5], [-t, 0, t], w, A, 1) : x.setIcon(a.pathToImages + "panRight.gif", c.iconSize), x.setClickHandler(a.moveRight, a), x.init(b, g, g, k, l, m, n, r, v, p, A, w, z), x.set.translate(2 * g, g), d.setCN(a, x.set, "pan-right"), h.push(x.set), x = new d.SimpleButton, D ? x.svgIcon = d.line(b,
            [-t, 0, t], [t / 5, -t + t / 5, t / 5], w, A, 1) : x.setIcon(a.pathToImages + "panUp.gif", c.iconSize), x.setClickHandler(a.moveUp, a), x.init(b, g, g, k, l, m, n, r, v, p, A, w, z), x.set.translate(g, 0), d.setCN(a, x.set, "pan-up"), h.push(x.set), x = new d.SimpleButton, D ? x.svgIcon = d.line(b, [-t, 0, t], [-t / 5, t - t / 5, -t / 5], w, A, 1) : x.setIcon(a.pathToImages + "panDown.gif", c.iconSize), x.setClickHandler(a.moveDown, a), x.init(b, g, g, k, l, m, n, r, v, p, A, w, z), x.set.translate(g, 2 * g), d.setCN(a, x.set, "pan-down"), h.push(x.set), e.push(h)); c.homeButtonEnabled && (h = new d.SimpleButton,
            D ? h.svgIcon = d.polygon(b, [-t, 0, t, t - 1, t - 1, 2, 2, -2, -2, -t + 1, -t + 1], [0, -t, 0, 0, t - 1, t - 1, 2, 2, t - 1, t - 1, 0], w, A, 1, w, A) : h.setIcon(a.pathToImages + c.homeIconFile, c.iconSize), h.setClickHandler(a.goHome, a), c.panControlEnabled && (r = l = 0), h.init(b, g, g, k, l, m, n, r, v, p, A, w, z), c.panControlEnabled ? h.set.translate(g, g) : E && E.translate(0, 1.5 * g), d.setCN(a, h.set, "pan-home"), e.push(h.set)); c.update()
        }, draggerDown: function () { this.chart.stopDrag(); this.isDragging = !0 }, draggerUp: function () { this.isDragging = !1 }, handleBgUp: function () {
            var a =
            this.chart; a.zoomTo(100 * Math.pow(this.zoomFactor, this.stepMax - (a.mouseY - this.zoomSet.y - this.set.y - this.buttonSize - this.realStepSize / 2) / this.realStepSize))
        }, update: function () {
            var a; a = this.zoomFactor; var b = this.realStepSize, c = this.stepMax, e = this.dragger, g = this.buttonSize, f, h = this.chart; h && (this.isDragging ? (h.stopDrag(), f = e.y + (h.mouseY - this.previousY), f = d.fitToBounds(f, g, this.realGridHeight + g), h.zoomTo(100 * Math.pow(a, c - (f - g) / b), NaN, NaN, !0)) : (a = Math.log(h.zoomLevel() / 100) / Math.log(a), f = (c - a) * b + g), this.previousY =
            h.mouseY, this.previousDY != f && e && (e.translate((this.buttonSize - this.draggerSize) / 2, f), this.previousDY = f))
        }
    })
})(); (function () {
    var d = window.AmCharts; d.SimpleButton = d.Class({
        construct: function () { }, init: function (a, b, c, e, g, f, h, k, l, m, n, r, v) {
            var p = this; p.rollOverColor = m; p.color = e; p.container = a; m = a.set(); p.set = m; v ? (b /= 2, e = d.circle(a, b, e, g, f, h, k), e.translate(b, b)) : e = d.rect(a, b, c, e, g, f, h, k, l); m.push(e); g = p.iconPath; var q; g && (q = p.iconSize, f = (b - q) / 2, v && (f = (2 * b - q) / 2), q = a.image(g, f, (c - q) / 2, q, q)); p.svgIcon && (q = p.svgIcon, v ? q.translate(b, b) : q.translate(b / 2, b / 2)); m.setAttr("cursor", "pointer"); q && (m.push(q), q.setAttr("opacity",
            n), q.node.style.pointerEvents = "none"); e.mousedown(function () { p.handleDown() }).touchstart(function () { p.handleDown() }).mouseup(function () { p.handleUp() }).touchend(function () { p.handleUp() }).mouseover(function () { p.handleOver() }).mouseout(function () { p.handleOut() }); p.bg = e
        }, setIcon: function (a, b) { this.iconPath = a; this.iconSize = b }, setClickHandler: function (a, b) { this.clickHandler = a; this.scope = b }, setDownHandler: function (a, b) { this.downHandler = a; this.scope = b }, handleUp: function () { var a = this.clickHandler; a && a.call(this.scope) },
        handleDown: function () { var a = this.downHandler; a && a.call(this.scope) }, handleOver: function () { this.container.chart.skipClick = !0; this.bg.setAttr("fill", this.rollOverColor) }, handleOut: function () { this.container.chart.skipClick = !1; this.bg.setAttr("fill", this.color) }
    })
})(); (function () {
    var d = window.AmCharts; d.SmallMap = d.Class({
        construct: function (a) { this.cname = "SmallMap"; this.mapColor = "#e6e6e6"; this.rectangleColor = "#FFFFFF"; this.top = this.right = 10; this.minimizeButtonWidth = 23; this.backgroundColor = "#9A9A9A"; this.backgroundAlpha = 1; this.borderColor = "#FFFFFF"; this.iconColor = "#000000"; this.borderThickness = 3; this.borderAlpha = 1; this.size = .2; this.enabled = !0; d.applyTheme(this, a, this.cname) }, init: function (a, b) {
            var c = this; if (c.enabled) {
                c.chart = a; c.container = b; c.width = a.realWidth *
                c.size; c.height = a.realHeight * c.size; d.remove(c.set); var e = b.set(); c.set = e; d.setCN(a, e, "small-map"); var g = b.set(); c.allSet = g; e.push(g); c.buildSVGMap(); var f = c.borderThickness, h = c.borderColor, k = d.rect(b, c.width + f, c.height + f, c.backgroundColor, c.backgroundAlpha, f, h, c.borderAlpha); d.setCN(a, k, "small-map-bg"); k.translate(-f / 2, -f / 2); g.push(k); k.toBack(); var l, m, k = c.minimizeButtonWidth, n = new d.SimpleButton, r = k / 2; a.svgIcons ? n.svgIcon = d.line(b, [-r / 2, 0, r / 2], [-r / 4, r / 4, -r / 4], c.iconColor, 1, 1) : n.setIcon(a.pathToImages +
                "arrowDown.gif", k); n.setClickHandler(c.minimize, c); n.init(b, k, k, h, 1, 1, h, 1); d.setCN(a, n.set, "small-map-down"); n = n.set; c.downButtonSet = n; e.push(n); var v = new d.SimpleButton; a.svgIcons ? v.svgIcon = d.line(b, [-r / 2, 0, r / 2], [r / 4, -r / 4, r / 4], c.iconColor, 1, 1) : v.setIcon(a.pathToImages + "arrowUp.gif", k); v.setClickHandler(c.maximize, c); v.init(b, k, k, h, 1, 1, h, 1); d.setCN(a, v.set, "small-map-up"); h = v.set; c.upButtonSet = h; h.hide(); e.push(h); var p, q; isNaN(c.top) || (l = a.getY(c.top) + f, q = 0); isNaN(c.bottom) || (l = a.getY(c.bottom, !0) -
                c.height - f, q = c.height - k + f / 2); isNaN(c.left) || (m = a.getX(c.left) + f, p = -f / 2); isNaN(c.right) || (m = a.getX(c.right, !0) - c.width - f, p = c.width - k + f / 2); f = b.set(); f.clipRect(1, 1, c.width, c.height); g.push(f); c.rectangleC = f; e.translate(m, l); n.translate(p, q); h.translate(p, q); g.mouseup(function () { c.handleMouseUp() }); c.drawRectangle()
            } else d.remove(c.allSet), d.remove(c.downButtonSet), d.remove(c.upButtonSet)
        }, minimize: function () { this.downButtonSet.hide(); this.upButtonSet.show(); this.allSet.hide() }, maximize: function () {
            this.downButtonSet.show();
            this.upButtonSet.hide(); this.allSet.show()
        }, buildSVGMap: function () {
            var a = this.chart, b = { fill: this.mapColor, stroke: this.mapColor, "stroke-opacity": 1 }, c = a.svgData.g.path, e = this.container, g = e.set(); d.setCN(a, g, "small-map-image"); var f; for (f = 0; f < c.length; f++) { var h = e.path(c[f].d).attr(b); g.push(h) } this.allSet.push(g); b = g.getBBox(); c = this.size * a.mapScale; e = -b.x * c; f = -b.y * c; var k = h = 0; a.centerMap && (h = (this.width - b.width * c) / 2, k = (this.height - b.height * c) / 2); this.mapWidth = b.width * c; this.mapHeight = b.height * c; this.dx =
            h; this.dy = k; g.translate(e + h, f + k, c)
        }, update: function () { var a = this.chart; if (a) { var b = a.zoomLevel(), c = this.width, d = a.mapContainer, a = c / (a.realWidth * b), c = c / b, b = this.height / b, g = this.rectangle; g.translate(-d.x * a + this.dx, -d.y * a + this.dy); 0 < c && 0 < b && (g.setAttr("width", Math.ceil(c + 1)), g.setAttr("height", Math.ceil(b + 1))); this.rWidth = c; this.rHeight = b } }, drawRectangle: function () {
            var a = this.rectangle; d.remove(a); a = d.rect(this.container, 10, 10, "#000", 0, 1, this.rectangleColor, 1); d.setCN(this.chart, a, "small-map-rectangle");
            this.rectangleC.push(a); this.rectangle = a
        }, handleMouseUp: function () { var a = this.chart, b = a.zoomLevel(); a.zoomTo(b, -((a.mouseX - this.set.x - this.dx - this.rWidth / 2) / this.mapWidth) * b, -((a.mouseY - this.set.y - this.dy - this.rHeight / 2) / this.mapHeight) * b) }
    })
})(); (function () {
    var d = window.AmCharts; d.AreasProcessor = d.Class({
        construct: function (a) { this.chart = a }, process: function (a) {
            this.updateAllAreas(); this.allObjects = []; a = a.areas; var b = this.chart, c = a.length, d, g, f = 0, h = !1, k = !1, l = 0; for (d = 0; d < c; d++) if (g = a[d], g = g.value, !isNaN(g)) { if (!1 === h || h < g) h = g; if (!1 === k || k > g) k = g; f += Math.abs(g); l++ } this.minValue = k; this.maxValue = h; isNaN(b.minValue) || (this.minValue = b.minValue); isNaN(b.maxValue) || (this.maxValue = b.maxValue); b.maxValueReal = h; b.minValueReal = k; for (d = 0; d < c; d++) g = a[d],
            isNaN(g.value) ? g.percents = void 0 : (g.percents = (g.value - k) / f * 100, k == h && (g.percents = 100)); for (d = 0; d < c; d++) g = a[d], this.createArea(g)
        }, updateAllAreas: function () {
            var a = this.chart, b = a.areasSettings, c = b.unlistedAreasColor, e = b.unlistedAreasAlpha, g = b.unlistedAreasOutlineColor, f = b.unlistedAreasOutlineAlpha, h = a.svgAreas, k = a.dataProvider, l = k.areas, m = {}, n; for (n = 0; n < l.length; n++) m[l[n].id] = l[n]; for (n = 0; n < h.length; n++) {
                l = h[n]; if (b.preserveOriginalAttributes) {
                    if (l.customAttr) for (var r in l.customAttr) l.setAttr(r,
                    l.customAttr[r])
                } else { void 0 != c && l.setAttr("fill", c); isNaN(e) || l.setAttr("fill-opacity", e); void 0 != g && l.setAttr("stroke", g); isNaN(f) || l.setAttr("stroke-opacity", f); var v = b.outlineThickness; b.adjustOutlineThickness && (v /= a.zoomLevel()); l.setAttr("stroke-width", v) } d.setCN(a, l, "map-area-unlisted"); k.getAreasFromMap && !m[l.id] && (v = new d.MapArea(a.theme), v.parentObject = k, v.id = l.id, k.areas.push(v))
            }
        }, createArea: function (a) {
            var b = this.chart, c = b.svgAreasById[a.id], e = b.areasSettings; if (c && c.className) {
                var g =
                b.areasClasses[c.className]; g && (e = d.processObject(g, d.AreasSettings, b.theme))
            } var f = e.color, h = e.alpha, k = e.outlineThickness, l = e.rollOverColor, m = e.selectedColor, n = e.rollOverAlpha, r = e.rollOverBrightness, v = e.outlineColor, p = e.outlineAlpha, q = e.balloonText, x = e.selectable, B = e.pattern, y = e.rollOverOutlineColor, A = e.bringForwardOnHover, w = e.preserveOriginalAttributes; this.allObjects.push(a); a.chart = b; a.baseSettings = e; a.autoZoomReal = void 0 == a.autoZoom ? e.autoZoom : a.autoZoom; g = a.color; void 0 == g && (g = f); var z = a.alpha;
            isNaN(z) && (z = h); h = a.rollOverAlpha; isNaN(h) && (h = n); isNaN(h) && (h = z); n = a.rollOverColor; void 0 == n && (n = l); l = a.pattern; void 0 == l && (l = B); B = a.selectedColor; void 0 == B && (B = m); m = a.balloonText; void 0 === m && (m = q); void 0 == e.colorSolid || isNaN(a.value) || (q = Math.floor((a.value - this.minValue) / ((this.maxValue - this.minValue) / b.colorSteps)), q == b.colorSteps && q--, q *= 1 / (b.colorSteps - 1), this.maxValue == this.minValue && (q = 1), a.colorReal = d.getColorFade(g, e.colorSolid, q)); void 0 != a.color && (a.colorReal = a.color); void 0 == a.selectable &&
            (a.selectable = x); void 0 == a.colorReal && (a.colorReal = f); f = a.outlineColor; void 0 == f && (f = v); v = a.outlineAlpha; isNaN(v) && (v = p); p = a.outlineThickness; isNaN(p) && (p = k); k = a.rollOverOutlineColor; void 0 == k && (k = y); y = a.rollOverBrightness; void 0 == y && (y = r); void 0 == a.bringForwardOnHover && (a.bringForwardOnHover = A); void 0 == a.preserveOriginalAttributes && (a.preserveOriginalAttributes = w); isNaN(e.selectedBrightness) || (B = d.adjustLuminosity(a.colorReal, e.selectedBrightness / 100)); a.alphaReal = z; a.rollOverColorReal = n; a.rollOverAlphaReal =
            h; a.balloonTextReal = m; a.selectedColorReal = B; a.outlineColorReal = f; a.outlineAlphaReal = v; a.rollOverOutlineColorReal = k; a.outlineThicknessReal = p; a.patternReal = l; a.rollOverBrightnessReal = y; d.processDescriptionWindow(e, a); if (c && (r = c.area, A = c.title, a.enTitle = c.title, A && !a.title && (a.title = A), (c = b.language) ? (A = d.mapTranslations) && (c = A[c]) && c[a.enTitle] && (a.titleTr = c[a.enTitle]) : a.titleTr = void 0, r)) {
                a.displayObject = r; a.mouseEnabled && b.addObjectEventListeners(r, a); var D; void 0 != g && (D = g); void 0 != a.colorReal &&
                (D = a.showAsSelected || b.selectedObject == a ? a.selectedColorReal : a.colorReal); r.node.setAttribute("class", ""); d.setCN(b, r, "map-area"); d.setCN(b, r, "map-area-" + r.id); e.adjustOutlineThickness && (p /= b.zoomLevel()); a.preserveOriginalAttributes || (r.setAttr("fill", D), r.setAttr("stroke", f), r.setAttr("stroke-opacity", v), r.setAttr("stroke-width", p), r.setAttr("fill-opacity", z)); l && r.pattern(l, b.mapScale, b.path); a.hidden && r.hide()
            }
        }
    })
})(); (function () {
    var d = window.AmCharts; d.AreasSettings = d.Class({
        construct: function (a) {
            this.cname = "AreasSettings"; this.alpha = 1; this.autoZoom = !1; this.balloonText = "[[title]]"; this.color = "#FFCC00"; this.colorSolid = "#990000"; this.unlistedAreasAlpha = 1; this.unlistedAreasColor = "#DDDDDD"; this.outlineColor = "#FFFFFF"; this.outlineThickness = this.outlineAlpha = 1; this.selectedColor = this.rollOverOutlineColor = "#CC0000"; this.unlistedAreasOutlineColor = "#FFFFFF"; this.unlistedAreasOutlineAlpha = 1; this.descriptionWindowWidth =
            250; this.bringForwardOnHover = this.adjustOutlineThickness = !0; d.applyTheme(this, a, this.cname)
        }
    })
})(); (function () {
    var d = window.AmCharts; d.ImagesProcessor = d.Class({
        construct: function (a) { this.chart = a; this.reset() }, process: function (a) { var b = a.images, c; for (c = 0; c < b.length; c++) { var d = b[c]; this.createImage(d, c); d.parentArray = b } this.counter = c; a.parentObject && a.remainVisible && this.process(a.parentObject) }, createImage: function (a, b) {
            a = d.processObject(a, d.MapImage); isNaN(b) && (this.counter++, b = this.counter); var c = this.chart, e = c.container, g = c.mapImagesContainer, f = c.stageImagesContainer, h = c.imagesSettings; a.remove &&
            a.remove(); var k = h.color, l = h.alpha, m = h.rollOverColor, n = h.rollOverOutlineColor, r = h.selectedColor, v = h.balloonText, p = h.outlineColor, q = h.outlineAlpha, x = h.outlineThickness, B = h.selectedScale, y = h.rollOverScale, A = h.labelPosition, w = h.labelColor, z = h.labelFontSize, D = h.bringForwardOnHover, t = h.labelRollOverColor, u = h.rollOverBrightness, E = h.selectedLabelColor; a.index = b; a.chart = c; a.baseSettings = c.imagesSettings; var F = e.set(); a.displayObject = F; var G = a.color; void 0 == G && (G = k); k = a.alpha; isNaN(k) && (k = l); void 0 == a.bringForwardOnHover &&
            (a.bringForwardOnHover = D); l = a.outlineAlpha; isNaN(l) && (l = q); q = a.rollOverColor; void 0 == q && (q = m); m = a.selectedColor; void 0 == m && (m = r); r = a.balloonText; void 0 === r && (r = v); v = a.outlineColor; void 0 == v && (v = p); a.outlineColorReal = v; p = a.outlineThickness; isNaN(p) && (p = x); (x = a.labelPosition) || (x = A); A = a.labelColor; void 0 == A && (A = w); w = a.labelRollOverColor; void 0 == w && (w = t); t = a.selectedLabelColor; void 0 == t && (t = E); E = a.labelFontSize; isNaN(E) && (E = z); z = a.selectedScale; isNaN(z) && (z = B); B = a.rollOverScale; isNaN(B) && (B = y); y = a.rollOverBrightness;
            void 0 == y && (y = u); a.colorReal = G; isNaN(h.selectedBrightness) || (m = d.adjustLuminosity(a.colorReal, h.selectedBrightness / 100)); a.alphaReal = k; a.rollOverColorReal = q; a.balloonTextReal = r; a.selectedColorReal = m; a.labelColorReal = A; a.labelRollOverColorReal = w; a.selectedLabelColorReal = t; a.labelFontSizeReal = E; a.labelPositionReal = x; a.selectedScaleReal = z; a.rollOverScaleReal = B; a.rollOverOutlineColorReal = n; a.rollOverBrightnessReal = y; d.processDescriptionWindow(h, a); a.centeredReal = void 0 == a.centered ? h.centered : a.centered;
            y = a.type; B = a.imageURL; z = a.svgPath; E = a.width; q = a.height; n = a.scale; isNaN(a.percentWidth) || (E = a.percentWidth / 100 * c.realWidth); isNaN(a.percentHeight) || (q = a.percentHeight / 100 * c.realHeight); var C; B || y || z || (y = "circle", E = 1, l = k = 0); t = u = 0; h = a.selectedColorReal; if (y) {
                isNaN(E) && (E = 10); isNaN(q) && (q = 10); "kilometers" == a.widthAndHeightUnits && (E = c.kilometersToPixels(a.width), q = c.kilometersToPixels(a.height)); "miles" == a.widthAndHeightUnits && (E = c.milesToPixels(a.width), q = c.milesToPixels(a.height)); if ("circle" == y || "bubble" ==
                y) q = E; C = this.createPredefinedImage(G, v, p, y, E, q); t = u = 0; a.centeredReal ? (isNaN(a.right) || (u = E * n), isNaN(a.bottom) || (t = q * n)) : (u = E * n / 2, t = q * n / 2); C.translate(u, t, n, !0)
            } else B ? (isNaN(E) && (E = 10), isNaN(q) && (q = 10), C = e.image(B, 0, 0, E, q), C.node.setAttribute("preserveAspectRatio", "none"), C.setAttr("opacity", k), a.centeredReal && (u = isNaN(a.right) ? -E / 2 : E / 2, t = isNaN(a.bottom) ? -q / 2 : q / 2, C.translate(u, t, NaN, !0))) : z && (C = e.path(z), y = C.getBBox(), a.centeredReal ? (u = -y.x * n - y.width * n / 2, isNaN(a.right) || (u = -u), t = -y.y * n - y.height * n /
            2, isNaN(a.bottom) || (t = -t)) : u = t = 0, C.translate(u, t, n, !0), C.x = u, C.y = t); C && (F.push(C), a.image = C, C.setAttr("stroke-opacity", l), C.setAttr("stroke-width", p), C.setAttr("stroke", v), C.setAttr("fill-opacity", k), C.setAttr("fill", G), d.setCN(c, C, "map-image"), void 0 != a.id && d.setCN(c, C, "map-image-" + a.id)); G = a.labelColorReal; !a.showAsSelected && c.selectedObject != a || void 0 == h || (C.setAttr("fill", h), G = a.selectedLabelColorReal); C = null; void 0 !== a.label && (C = d.text(e, a.label, G, c.fontFamily, a.labelFontSizeReal, a.labelAlign),
            d.setCN(c, C, "map-image-label"), void 0 !== a.id && d.setCN(c, C, "map-image-label-" + a.id), G = a.labelBackgroundAlpha, (k = a.labelBackgroundColor) && 0 < G && (l = C.getBBox(), e = d.rect(e, l.width + 16, l.height + 10, k, G), d.setCN(c, e, "map-image-label-background"), void 0 != a.id && d.setCN(c, e, "map-image-label-background-" + a.id), F.push(e), a.labelBG = e), a.imageLabel = C, F.push(C), d.setCN(c, F, "map-image-container"), void 0 != a.id && d.setCN(c, F, "map-image-container-" + a.id)); e = isNaN(a.latitude) || isNaN(a.longitude) ? !0 : !1; a.lineId && (C = this.chart.getObjectById(a.lineId)) &&
            0 < C.longitudes.length && (e = !1); e ? f.push(F) : g.push(F); F && (F.rotation = a.rotation, isNaN(a.rotation) || F.rotate(a.rotation)); this.updateSizeAndPosition(a); a.mouseEnabled && c.addObjectEventListeners(F, a); a.hidden && F.hide(); a.animateAlongLine && setTimeout(function () { a.animateAlong.call(a) }, 100); return a
        }, updateSizeAndPosition: function (a) {
            var b = this.chart, c = a.displayObject, e = b.getX(a.left), g = b.getY(a.top), f, h = a.image.getBBox(); isNaN(a.right) || (e = b.getX(a.right, !0) - h.width * a.scale); isNaN(a.bottom) || (g = b.getY(a.bottom,
            !0) - h.height * a.scale); var k = a.longitude, l = a.latitude, m = a.positionOnLine, h = this.objectsToResize; this.allSvgObjects.push(c); this.allObjects.push(a); a.arrays.push({ arr: this.allSvgObjects, el: c }); a.arrays.push({ arr: this.allObjects, el: a }); var n = a.imageLabel, r = this.chart.zoomLevel(); if (a.lineId) { var v = this.chart.getObjectById(a.lineId); (a.line = v) && v.getCoordinates && (v.chart = b, v = v.getCoordinates(m, a.lineSegment)) && (k = b.coordinateToLongitude(v.x), l = b.coordinateToLatitude(v.y), f = d.radiansToDegrees(v.angle)) } isNaN(f) ||
            c.rotate(f + a.extraAngle); if (!isNaN(e) && !isNaN(g)) c.translate(e, g, NaN, !0); else if (!isNaN(l) && !isNaN(k)) if (e = b.longitudeToCoordinate(k), g = b.latitudeToCoordinate(l), a.fixedSize) { f = 1; if (a.showAsSelected || b.selectedObject == a) f = a.selectedScaleReal; b = a.positionScale; isNaN(b) ? b = 0 : (--b, b *= 1 - 2 * Math.abs(m - .5)); m = { image: c, scale: f + b }; h.push(m); a.arrays.push({ arr: h, el: m }); c.translate(e, g, f / r + b, !0) } else c.translate(e, g, NaN, !0), n && (this.labelsToReposition.push(a), a.arrays.push({ arr: this.labelsToReposition, el: a }));
            this.positionLabel(n, a, a.labelPositionReal)
        }, positionLabel: function (a, b, c) {
            if (a) {
                var d = b.image, g = 0, f = 0, h = 0, k = 0; d && (k = d.getBBox(), f = d.y, g = d.x, h = k.width, k = k.height, b.svgPath && (h *= b.scale, k *= b.scale)); var d = a.getBBox(), l = d.width, m = d.height; "right" == c && (g += h + l / 2 + 5, f += k / 2 - 2); "left" == c && (g += -l / 2 - 5, f += k / 2 - 2); "top" == c && (f -= m / 2 + 3, g += h / 2); "bottom" == c && (f += k + m / 2, g += h / 2); "middle" == c && (g += h / 2, f += k / 2); a.translate(g + b.labelShiftX, f + b.labelShiftY, NaN, !0); b.labelBG && b.labelBG.translate(g - d.width / 2 + b.labelShiftX - 9,
                f + b.labelShiftY - d.height / 2 - 3, NaN, !0)
            }
        }, createPredefinedImage: function (a, b, c, e, g, f) { var h = this.chart.container, k; switch (e) { case "circle": k = d.circle(h, g / 2, a, 1, c, b, 1); break; case "rectangle": k = d.polygon(h, [-g / 2, g / 2, g / 2, -g / 2], [f / 2, f / 2, -f / 2, -f / 2], a, 1, c, b, 1, 0, !0); break; case "bubble": k = d.circle(h, g / 2, a, 1, c, b, 1, !0); break; case "hexagon": g /= Math.sqrt(3), k = d.polygon(h, [.866 * g, 0 * g, -.866 * g, -.866 * g, 0 * g, .866 * g], [.5 * g, 1 * g, .5 * g, -.5 * g, -1 * g, -.5 * g], a, 1, c, b, 1) } return k }, reset: function () {
            this.objectsToResize = []; this.allSvgObjects =
            []; this.allObjects = []; this.allLabels = []; this.labelsToReposition = []
        }
    })
})(); (function () {
    var d = window.AmCharts; d.ImagesSettings = d.Class({
        construct: function (a) {
            this.cname = "ImagesSettings"; this.balloonText = "[[title]]"; this.alpha = 1; this.borderAlpha = 0; this.borderThickness = 1; this.labelPosition = "right"; this.labelColor = "#000000"; this.labelFontSize = 11; this.color = "#000000"; this.labelRollOverColor = "#00CC00"; this.centered = !0; this.rollOverScale = this.selectedScale = 1; this.descriptionWindowWidth = 250; this.bringForwardOnHover = !0; this.outlineColor = "transparent"; this.adjustAnimationSpeed = !1;
            this.baseAnimationDistance = 500; this.pauseDuration = 0; this.easingFunction = d.easeInOutQuad; this.animationDuration = 3; this.positionScale = 1; d.applyTheme(this, a, this.cname)
        }
    })
})(); (function () {
    var d = window.AmCharts; d.LinesProcessor = d.Class({
        construct: function (a) { this.chart = a; this.reset() }, process: function (a) { var b = a.lines, c; for (c = 0; c < b.length; c++) { var d = b[c]; this.createLine(d, c); d.parentArray = b } this.counter = c; a.parentObject && a.remainVisible && this.process(a.parentObject) }, createLine: function (a, b) {
            a = d.processObject(a, d.MapLine); isNaN(b) && (this.counter++, b = this.counter); a.index = b; a.remove && a.remove(); var c = this.chart, e = c.linesSettings, g = this.objectsToResize, f = c.mapLinesContainer,
            h = c.stageLinesContainer, k = e.thickness, l = e.dashLength, m = e.arrow, n = e.arrowSize, r = e.arrowColor, v = e.arrowAlpha, p = e.color, q = e.alpha, x = e.rollOverColor, B = e.selectedColor, y = e.rollOverAlpha, A = e.balloonText, w = e.bringForwardOnHover, z = e.arc, D = e.rollOverBrightness, t = c.container; a.chart = c; a.baseSettings = e; var u = t.set(); a.displayObject = u; this.allSvgObjects.push(u); a.arrays.push({ arr: this.allSvgObjects, el: u }); this.allObjects.push(a); a.arrays.push({ arr: this.allObjects, el: a }); a.mouseEnabled && c.addObjectEventListeners(u,
            a); if (a.remainVisible || c.selectedObject == a.parentObject) {
                var E = a.thickness; isNaN(E) && (E = k); k = a.dashLength; isNaN(k) && (k = l); l = a.color; void 0 == l && (l = p); p = a.alpha; isNaN(p) && (p = q); q = a.rollOverAlpha; isNaN(q) && (q = y); isNaN(q) && (q = p); y = a.rollOverColor; void 0 == y && (y = x); x = a.selectedColor; void 0 == x && (x = B); B = a.balloonText; void 0 === B && (B = A); A = a.arc; isNaN(A) && (A = z); z = a.arrow; if (!z || "none" == z && "none" != m) z = m; m = a.arrowColor; void 0 == m && (m = r); void 0 == m && (m = l); r = a.arrowAlpha; isNaN(r) && (r = v); isNaN(r) && (r = p); v = a.arrowSize;
                isNaN(v) && (v = n); n = a.rollOverBrightness; void 0 == n && (n = D); a.colorReal = l; isNaN(e.selectedBrightness) || (x = d.adjustLuminosity(a.colorReal, e.selectedBrightness / 100)); a.alphaReal = p; a.rollOverColorReal = y; a.rollOverAlphaReal = q; a.balloonTextReal = B; a.selectedColorReal = x; a.thicknessReal = E; a.rollOverBrightnessReal = n; void 0 == a.bringForwardOnHover && (a.bringForwardOnHover = w); d.processDescriptionWindow(e, a); w = this.processCoordinates(a.x, c.realWidth); D = this.processCoordinates(a.y, c.realHeight); n = a.longitudes; e = a.latitudes;
                q = n.length; if (0 < q) for (w = [], y = 0; y < q; y++) w.push(c.longitudeToCoordinate(n[y])); q = e.length; if (0 < q) for (D = [], y = 0; y < q; y++) D.push(c.latitudeToCoordinate(e[y])); if (0 < w.length) {
                    a.segments = w.length; d.dx = 0; d.dy = 0; var F, G, C, n = 10 * (1 - Math.abs(A)); 10 <= n && (n = NaN); 1 > n && (n = 1); a.arcRadius = []; a.distances = []; if (isNaN(n)) { for (n = 0; n < w.length - 1; n++) G = Math.sqrt(Math.pow(w[n + 1] - w[n], 2) + Math.pow(D[n + 1] - D[n], 2)), a.distances[n] = G; n = d.line(t, w, D, l, 1, E, k, !1, !1, !0); l = d.line(t, w, D, l, .001, 5, k, !1, !1, !0) } else {
                        q = 1; 0 > A && (q = 0); y = {
                            fill: "none",
                            stroke: l, "stroke-opacity": 1, "stroke-width": E, "fill-opacity": 0
                        }; void 0 !== k && 0 < k && (y["stroke-dasharray"] = k); k = ""; for (B = 0; B < w.length - 1; B++) { var I = w[B], K = w[B + 1], J = D[B], L = D[B + 1]; G = Math.sqrt(Math.pow(K - I, 2) + Math.pow(L - J, 2)); C = G / 2 * n; F = 270 + 180 * Math.acos(G / 2 / C) / Math.PI; isNaN(F) && (F = 270); if (I < K) { var O = I, I = K, K = O, O = J, J = L, L = O; F = -F } 0 < A && (F = -F); k += "M" + I + "," + J + "A" + C + "," + C + ",0,0," + q + "," + K + "," + L; a.arcRadius[B] = C; a.distances[B] = G } n = t.path(k).attr(y); l = t.path(k).attr({
                            "fill-opacity": 0, stroke: l, "stroke-width": 5, "stroke-opacity": .001,
                            fill: "none"
                        })
                    } d.setCN(c, n, "map-line"); void 0 != a.id && d.setCN(c, n, "map-line-" + a.id); d.dx = .5; d.dy = .5; u.push(n); u.push(l); n.setAttr("opacity", p); if ("none" != z) {
                        var H, M, N; if ("end" == z || "both" == z) p = w[w.length - 1], q = D[D.length - 1], 1 < w.length ? (k = w[w.length - 2], H = D[D.length - 2]) : (k = p, H = q), H = 180 * Math.atan((q - H) / (p - k)) / Math.PI, isNaN(F) || (H += F), M = p, N = q, H = 0 > p - k ? H - 90 : H + 90; "both" == z && (p = d.polygon(t, [-v / 2, 0, v / 2], [1.5 * v, 0, 1.5 * v], m, r, 1, m, r), u.push(p), p.translate(M, N, 1, !0), isNaN(H) || p.rotate(H), d.setCN(c, n, "map-line-arrow"),
                        void 0 != a.id && d.setCN(c, n, "map-line-arrow-" + a.id), a.fixedSize && g.push(p)); if ("start" == z || "both" == z) p = w[0], N = D[0], 1 < w.length ? (k = w[1], M = D[1]) : (k = p, M = N), H = 180 * Math.atan((N - M) / (p - k)) / Math.PI, isNaN(F) || (H -= F), M = p, H = 0 > p - k ? H - 90 : H + 90; "middle" == z && (p = w[w.length - 1], q = D[D.length - 1], 1 < w.length ? (k = w[w.length - 2], H = D[D.length - 2]) : (k = p, H = q), M = k + (p - k) / 2, N = H + (q - H) / 2, H = 180 * Math.atan((q - H) / (p - k)) / Math.PI, isNaN(F) || (F = G / 2, C -= Math.sqrt(C * C - F * F), 0 > A && (C = -C), F = Math.sin(H / 180 * Math.PI), -1 == F && (F = 1), M -= F * C, N += Math.cos(H / 180 *
                        Math.PI) * C), H = 0 > p - k ? H - 90 : H + 90); p = d.polygon(t, [-v / 2, 0, v / 2], [1.5 * v, 0, 1.5 * v], m, r, 1, m, r); d.setCN(c, n, "map-line-arrow"); void 0 != a.id && d.setCN(c, n, "map-line-arrow-" + a.id); u.push(p); p.translate(M, N, 1, !0); isNaN(H) || p.rotate(H); a.fixedSize && (g.push(p), a.arrays.push({ arr: g, el: p })); a.arrowSvg = p
                    } a.fixedSize && n && (c = { line: n, thickness: E }, this.linesToResize.push(c), a.arrays.push({ arr: this.linesToResize, el: c }), c = { line: l, thickness: 5 }, this.linesToResize.push(c), a.arrays.push({ arr: this.linesToResize, el: c })); a.lineSvg =
                    n; a.showAsSelected && !isNaN(x) && n.setAttr("stroke", x); 0 < e.length ? f.push(u) : h.push(u); a.hidden && u.hide()
                }
            }
        }, processCoordinates: function (a, b) { var c = [], d; for (d = 0; d < a.length; d++) { var g = a[d], f = Number(g); isNaN(f) && (f = Number(g.replace("%", "")) * b / 100); isNaN(f) || c.push(f) } return c }, reset: function () { this.objectsToResize = []; this.allSvgObjects = []; this.allObjects = []; this.linesToResize = [] }
    })
})(); (function () { var d = window.AmCharts; d.LinesSettings = d.Class({ construct: function (a) { this.cname = "LinesSettings"; this.balloonText = "[[title]]"; this.thickness = 1; this.dashLength = 0; this.arrowSize = 10; this.arrowAlpha = 1; this.arrow = "none"; this.color = "#990000"; this.descriptionWindowWidth = 250; this.bringForwardOnHover = !0; d.applyTheme(this, a, this.cname) } }) })(); (function () {
    var d = window.AmCharts; d.MapObject = d.Class({
        construct: function (a) { this.fixedSize = this.mouseEnabled = !0; this.images = []; this.lines = []; this.areas = []; this.remainVisible = !0; this.passZoomValuesToTarget = !1; this.objectType = this.cname; d.applyTheme(this, a, "MapObject"); this.arrays = [] }, deleteObject: function () {
            this.remove(); this.parentArray && d.removeFromArray(this.parentArray, this); if (this.arrays) for (var a = 0; a < this.arrays.length; a++) d.removeFromArray(this.arrays[a].arr, this.arrays[a].el); this.arrays =
            []
        }
    })
})(); (function () { var d = window.AmCharts; d.MapArea = d.Class({ inherits: d.MapObject, construct: function (a) { this.cname = "MapArea"; d.MapArea.base.construct.call(this, a); d.applyTheme(this, a, this.cname) }, validate: function () { this.chart.areasProcessor.createArea(this) } }) })(); (function () {
    var d = window.AmCharts; d.MapLine = d.Class({
        inherits: d.MapObject, construct: function (a) { this.cname = "MapLine"; this.longitudes = []; this.latitudes = []; this.x = []; this.y = []; this.segments = 0; this.arrow = "none"; d.MapLine.base.construct.call(this, a); d.applyTheme(this, a, this.cname) }, validate: function () { this.chart.linesProcessor.createLine(this) }, remove: function () { var a = this.displayObject; a && a.remove() }, getCoordinates: function (a, b) {
            isNaN(b) && (b = 0); if (!isNaN(a)) {
                var c, e, g, f, h, k; 1 < this.longitudes.length ?
                (c = this.chart.longitudeToCoordinate(this.longitudes[b]), g = this.chart.longitudeToCoordinate(this.longitudes[b + 1]), e = this.chart.latitudeToCoordinate(this.latitudes[b]), f = this.chart.latitudeToCoordinate(this.latitudes[b + 1])) : 1 < this.x.length && (c = this.x[b], g = this.x[b + 1], e = this.y[b], f = this.y[b + 1]); var l = Math.sqrt(Math.pow(g - c, 2) + Math.pow(f - e, 2)); c < g && !isNaN(this.arc) && (a = 1 - a); h = c + (g - c) * a; k = e + (f - e) * a; var m = Math.atan2(f - e, g - c); if (!isNaN(this.arc) && this.arcRadius) {
                    var n = 0; c < g && (n = c, c = g, g = n, n = e, e = f, f = n, n = Math.PI);
                    k = this.arcRadius[b]; 0 > this.arc && (l = -l); h = c + (g - c) / 2 + Math.sqrt(k * k - l / 2 * (l / 2)) * (e - f) / l; var r = e + (f - e) / 2 + Math.sqrt(k * k - l / 2 * (l / 2)) * (g - c) / l; c = 180 * Math.atan2(e - r, c - h) / Math.PI; m = d.degreesToRadians(c + (180 * Math.atan2(f - r, g - h) / Math.PI - c) * a); h += k * Math.cos(m); k = r + k * Math.sin(m); m = 0 < this.arc ? m + Math.PI / 2 : m - Math.PI / 2; m += n
                } this.distance = l; return { x: h, y: k, angle: m }
            }
        }, fixToStage: function () {
            if (0 < this.latitudes.length) {
                this.y = []; for (var a = 0; a < this.latitudes.length; a++) this.y.push(this.chart.latitudeToStageY(this.latitudes[a]));
                this.latitudes = []; this.x = []; for (a = 0; a < this.longitudes.length; a++) this.x.push(this.chart.longitudeToStageX(this.longitudes[a])); this.longitudes = []
            } this.validate()
        }, fixToMap: function () { if (0 < this.y.length) { this.latitudes = []; for (var a = 0; a < this.y.length; a++) this.latitudes.push(this.chart.stageYToLatitude(this.y[a])); this.y = []; this.longitudes = []; for (a = 0; a < this.x.length; a++) this.longitudes.push(this.chart.stageXToLongitude(this.x[a])); this.x = [] } this.validate() }
    })
})(); (function () {
    var d = window.AmCharts; d.MapImage = d.Class({
        inherits: d.MapObject, construct: function (a) { this.cname = "MapImage"; this.scale = 1; this.widthAndHeightUnits = "pixels"; this.labelShiftY = this.labelShiftX = 0; this.positionOnLine = .5; this.direction = 1; this.lineSegment = this.extraAngle = 0; this.createEvents("animationStart", "animationEnd"); d.MapImage.base.construct.call(this, a); d.applyTheme(this, a, this.cname) }, validate: function () { this.chart.imagesProcessor.createImage(this) }, updatePosition: function () { this.chart.imagesProcessor.updateSizeAndPosition(this) },
        remove: function () { var a = this.displayObject; a && a.remove(); (a = this.imageLabel) && a.remove() }, animateTo: function (a, b, c, d) {
            isNaN(c) || (this.animationDuration = c); d && (this.easingFunction = d); this.finalX = a; this.finalY = b; isNaN(this.longitude) || (this.initialX = this.longitude); isNaN(this.left) || (this.initialX = this.left); isNaN(this.right) || (this.initialX = this.right); isNaN(this.latitude) || (this.initialY = this.latitude); isNaN(this.top) || (this.initialY = this.top); isNaN(this.bottom) || (this.initialY = this.bottom); this.animatingAlong =
            !1; this.animate()
        }, animateAlong: function (a, b, c) { isNaN(b) || (this.animationDuration = b); c && (this.easingFunction = c); a && (this.line = this.chart.getObjectById(a)); this.animatingAlong = !0; this.animate() }, animate: function () {
            var a = this, b = a.chart.imagesSettings, c = a.animationDuration; isNaN(c) && (c = b.animationDuration); a.totalFrames = c * d.updateRate; c = 1; a.line && b.adjustAnimationSpeed && (a.line.distances && (c = a.line.distances[a.lineSegment] * a.chart.zoomLevel(), c = Math.abs(c / b.baseAnimationDistance)), a.totalFrames = Math.round(c *
            a.totalFrames)); a.frame = 0; a.clearTO(); a.timeOut = setTimeout(function () { a.update.call(a) }, 1E3 / d.updateRate); a.fire({ type: "animationStart", chart: a.chart, image: this, lineSegment: a.lineSegment, direction: a.direction })
        }, clearTO: function () { this.timeOut && clearTimeout(this.timeOut) }, update: function () {
            var a = this; a.updatePosition(); var b = Math.round(1E3 / d.updateRate), c = a.chart.imagesSettings, e = a.easingFunction; e || (e = c.easingFunction); a.frame++; c = a.totalFrames; a.frame <= c ? (e = e(0, a.frame, 0, 1, c), -1 == a.direction && (e =
            1 - e), a.animatingAlong ? a.positionOnLine = e : (c = a.initialX + (a.finalX - a.initialX) * e, isNaN(a.longitude) || (a.longitude = c), isNaN(a.left) || (a.left = c), isNaN(a.right) || (a.right = c), e = a.initialY + (a.finalY - a.initialY) * e, isNaN(a.latitude) || (a.latitude = e), isNaN(a.top) || (a.top = e), isNaN(a.bottom) || (a.bottom = e)), a.clearTO(), window.requestAnimationFrame ? window.requestAnimationFrame(function () { a.update.call(a) }) : a.timeOut = setTimeout(function () { a.update.call(a) }, b)) : (a.fire({
                type: "animationEnd", chart: a.chart, image: this,
                lineSegment: a.lineSegment, direction: a.direction
            }), a.animatingAlong && (1 == a.direction ? a.lineSegment < a.line.segments - 2 ? (a.lineSegment++, a.delayAnimateAlong(), a.positionOnLine = 0) : a.flipDirection ? (a.direction = -1, a.extraAngle = 180, a.delayAnimateAlong()) : a.loop && (a.delayAnimateAlong(), a.lineSegment = 0) : 0 < a.lineSegment ? (a.lineSegment--, a.delayAnimateAlong(), a.positionOnLine = 0) : a.loop && a.flipDirection ? (a.direction = 1, a.extraAngle = 0, a.delayAnimateAlong()) : a.loop && a.delayAnimateAlong()))
        }, delayAnimateAlong: function () {
            var a =
            this; a.clearTO(); a.animateAlongLine && (a.timeOut = setTimeout(function () { a.animateAlong.call(a) }, 1E3 * a.chart.imagesSettings.pauseDuration))
        }, fixToStage: function () { isNaN(this.longitude) || (this.left = this.chart.longitudeToStageX(this.longitude), this.longitude = void 0); isNaN(this.latitude) || (this.top = this.chart.latitudeToStageY(this.latitude), this.latitude = void 0); this.validate() }, fixToMap: function () {
            isNaN(this.left) || (this.longitude = this.chart.stageXToLongitude(this.left), this.left = void 0); isNaN(this.top) ||
            (this.latitude = this.chart.stageYToLatitude(this.top), this.top = void 0); this.validate()
        }
    })
})(); (function () {
    var d = window.AmCharts; d.degreesToRadians = function (a) { return a / 180 * Math.PI }; d.radiansToDegrees = function (a) { return a / Math.PI * 180 }; d.getColorFade = function (a, b, c) { var e = d.hex2RGB(b); b = e[0]; var g = e[1], e = e[2], f = d.hex2RGB(a); a = f[0]; var h = f[1], f = f[2]; a += Math.round((b - a) * c); h += Math.round((g - h) * c); f += Math.round((e - f) * c); return "rgb(" + a + "," + h + "," + f + ")" }; d.hex2RGB = function (a) { return [parseInt(a.substring(1, 3), 16), parseInt(a.substring(3, 5), 16), parseInt(a.substring(5, 7), 16)] }; d.processDescriptionWindow =
    function (a, b) {
        isNaN(b.descriptionWindowX) && (b.descriptionWindowX = a.descriptionWindowX); isNaN(b.descriptionWindowY) && (b.descriptionWindowY = a.descriptionWindowY); isNaN(b.descriptionWindowLeft) && (b.descriptionWindowLeft = a.descriptionWindowLeft); isNaN(b.descriptionWindowRight) && (b.descriptionWindowRight = a.descriptionWindowRight); isNaN(b.descriptionWindowTop) && (b.descriptionWindowTop = a.descriptionWindowTop); isNaN(b.descriptionWindowBottom) && (b.descriptionWindowBottom = a.descriptionWindowBottom); isNaN(b.descriptionWindowWidth) &&
        (b.descriptionWindowWidth = a.descriptionWindowWidth); isNaN(b.descriptionWindowHeight) && (b.descriptionWindowHeight = a.descriptionWindowHeight)
    }
})(); (function () { var d = window.AmCharts; d.MapData = d.Class({ inherits: d.MapObject, construct: function () { this.cname = "MapData"; d.MapData.base.construct.call(this); this.projection = "mercator"; this.topLatitude = 90; this.bottomLatitude = -90; this.leftLongitude = -180; this.rightLongitude = 180; this.zoomLevel = 1; this.getAreasFromMap = !1 } }) })(); (function () {
    var d = window.AmCharts; d.DescriptionWindow = d.Class({
        construct: function () { }, show: function (a, b, c, d) {
            var g = this, f = document.createElement("div"); f.style.position = "absolute"; var h = a.classNamePrefix + "-description-"; f.className = "ammapDescriptionWindow " + h + "div"; g.div = f; b.appendChild(f); var k = ".gif"; a.svgIcons && (k = ".svg"); var l = document.createElement("img"); l.className = "ammapDescriptionWindowCloseButton " + h + "close-img"; l.src = a.pathToImages + "xIcon" + k; l.style.cssFloat = "right"; l.style.cursor = "pointer";
            l.onclick = function () { g.close() }; l.onmouseover = function () { l.src = a.pathToImages + "xIconH" + k }; l.onmouseout = function () { l.src = a.pathToImages + "xIcon" + k }; f.appendChild(l); b = document.createElement("div"); b.className = "ammapDescriptionTitle " + h + "title-div"; b.onmousedown = function () { g.div.style.zIndex = 1E3 }; f.appendChild(b); d = document.createTextNode(d); b.appendChild(d); d = b.offsetHeight; b = document.createElement("div"); b.className = "ammapDescriptionText " + h + "text-div"; b.style.maxHeight = g.maxHeight - d - 20 + "px"; f.appendChild(b);
            b.innerHTML = c
        }, close: function () { try { this.div.parentNode.removeChild(this.div) } catch (a) { } }
    })
})(); (function () {
    var d = window.AmCharts; d.ValueLegend = d.Class({
        construct: function (a) { this.cname = "ValueLegend"; this.enabled = !0; this.showAsGradient = !1; this.minValue = 0; this.height = 12; this.width = 200; this.bottom = this.left = 10; this.borderColor = "#FFFFFF"; this.borderAlpha = this.borderThickness = 1; this.color = "#000000"; this.fontSize = 11; d.applyTheme(this, a, this.cname) }, init: function (a, b) {
            if (this.enabled) {
                var c = a.areasSettings.color, e = a.areasSettings.colorSolid, g = a.colorSteps; d.remove(this.set); var f = b.set(); this.set =
                f; d.setCN(a, f, "value-legend"); var h = 0, k = this.minValue, l = this.fontSize, m = a.fontFamily, n = this.color; void 0 == k && (k = a.minValueReal); void 0 !== k && (h = d.text(b, k, n, m, l, "left"), h.translate(0, l / 2 - 1), d.setCN(a, h, "value-legend-min-label"), f.push(h), h = h.getBBox().height); k = this.maxValue; void 0 === k && (k = a.maxValueReal); void 0 !== k && (h = d.text(b, k, n, m, l, "right"), h.translate(this.width, l / 2 - 1), d.setCN(a, h, "value-legend-max-label"), f.push(h), h = h.getBBox().height); if (this.showAsGradient) c = d.rect(b, this.width, this.height,
                [c, e], 1, this.borderThickness, this.borderColor, 1, 0, 0), d.setCN(a, c, "value-legend-gradient"), c.translate(0, h), f.push(c); else for (l = this.width / g, m = 0; m < g; m++) n = d.getColorFade(c, e, 1 * m / (g - 1)), n = d.rect(b, l, this.height, n, 1, this.borderThickness, this.borderColor, 1), d.setCN(a, n, "value-legend-color"), d.setCN(a, n, "value-legend-color-" + m), n.translate(l * m, h), f.push(n); e = c = 0; g = f.getBBox(); h = a.getY(this.bottom, !0); l = a.getY(this.top); m = a.getX(this.right, !0); n = a.getX(this.left); isNaN(l) || (c = l); isNaN(h) || (c = h - g.height);
                isNaN(n) || (e = n); isNaN(m) || (e = m - g.width); f.translate(e, c)
            } else d.remove(this.set)
        }
    })
})(); (function () {
    var d = window.AmCharts; d.ObjectList = d.Class({
        construct: function (a) { this.divId = a }, init: function (a) { this.chart = a; var b = this.divId; this.container && (b = this.container); this.div = "object" != typeof b ? document.getElementById(b) : b; b = document.createElement("div"); b.className = "ammapObjectList " + a.classNamePrefix + "-object-list-div"; this.div.appendChild(b); this.addObjects(a.dataProvider, b) }, addObjects: function (a, b) {
            var c = this.chart, d = document.createElement("ul"); d.className = c.classNamePrefix + "-object-list-ul";
            var g; if (a.areas) for (g = 0; g < a.areas.length; g++) { var f = a.areas[g]; void 0 === f.showInList && (f.showInList = c.showAreasInList); this.addObject(f, d) } if (a.images) for (g = 0; g < a.images.length; g++) f = a.images[g], void 0 === f.showInList && (f.showInList = c.showImagesInList), this.addObject(f, d); if (a.lines) for (g = 0; g < a.lines.length; g++) f = a.lines[g], void 0 === f.showInList && (f.showInList = c.showLinesInList), this.addObject(f, d); 0 < d.childNodes.length && b.appendChild(d)
        }, addObject: function (a, b) {
            var c = this; if (a.showInList && void 0 !==
            a.title) { var d = c.chart, g = document.createElement("li"); g.className = d.classNamePrefix + "-object-list-li"; var f = a.titleTr; f || (f = a.title); var f = document.createTextNode(f), h = document.createElement("a"); h.className = d.classNamePrefix + "-object-list-a"; h.appendChild(f); g.appendChild(h); b.appendChild(g); this.addObjects(a, g); h.onmouseover = function () { c.chart.rollOverMapObject(a, !1) }; h.onmouseout = function () { c.chart.rollOutMapObject(a) }; h.onclick = function () { c.chart.clickMapObject(a) } }
        }
    })
})();