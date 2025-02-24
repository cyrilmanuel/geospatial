// Underscore.js 0.5.5
// (c) 2009 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the terms of the MIT license.
// Portions of Underscore are inspired by or borrowed from Prototype.js,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore/
(function () {
    var j = this,
        n = j._,
        i = function (a) {
            this._wrapped = a;
        },
        m = typeof StopIteration !== "undefined" ? StopIteration : "__break__",
        b = (j._ = function (a) {
            return new i(a);
        });
    if (typeof exports !== "undefined") exports._ = b;
    var k = Array.prototype.slice,
        o = Array.prototype.unshift,
        p = Object.prototype.toString,
        q = Object.prototype.hasOwnProperty,
        r = Object.prototype.propertyIsEnumerable;
    b.VERSION = "0.5.5";
    b.each = function (a, c, d) {
        try {
            if (a.forEach) a.forEach(c, d);
            else if (b.isArray(a) || b.isArguments(a))
                for (var e = 0, f = a.length; e < f; e++) c.call(d, a[e], e, a);
            else {
                var g = b.keys(a);
                f = g.length;
                for (e = 0; e < f; e++) c.call(d, a[g[e]], g[e], a);
            }
        } catch (h) {
            if (h != m) throw h;
        }
        return a;
    };
    b.map = function (a, c, d) {
        if (a && b.isFunction(a.map)) return a.map(c, d);
        var e = [];
        b.each(a, function (f, g, h) {
            e.push(c.call(d, f, g, h));
        });
        return e;
    };
    b.reduce = function (a, c, d, e) {
        if (a && b.isFunction(a.reduce)) return a.reduce(b.bind(d, e), c);
        b.each(a, function (f, g, h) {
            c = d.call(e, c, f, g, h);
        });
        return c;
    };
    b.reduceRight = function (a, c, d, e) {
        if (a && b.isFunction(a.reduceRight)) return a.reduceRight(b.bind(d, e), c);
        var f = b.clone(b.toArray(a)).reverse();
        b.each(f, function (g, h) {
            c = d.call(e, c, g, h, a);
        });
        return c;
    };
    b.detect = function (a, c, d) {
        var e;
        b.each(a, function (f, g, h) {
            if (c.call(d, f, g, h)) {
                e = f;
                b.breakLoop();
            }
        });
        return e;
    };
    b.select = function (a, c, d) {
        if (a && b.isFunction(a.filter)) return a.filter(c, d);
        var e = [];
        b.each(a, function (f, g, h) {
            c.call(d, f, g, h) && e.push(f);
        });
        return e;
    };
    b.reject = function (a, c, d) {
        var e = [];
        b.each(a, function (f, g, h) {
            !c.call(d, f, g, h) && e.push(f);
        });
        return e;
    };
    b.all = function (a, c, d) {
        c = c || b.identity;
        if (a && b.isFunction(a.every)) return a.every(c, d);
        var e = true;
        b.each(a, function (f, g, h) {
            (e = e && c.call(d, f, g, h)) || b.breakLoop();
        });
        return e;
    };
    b.any = function (a, c, d) {
        c = c || b.identity;
        if (a && b.isFunction(a.some)) return a.some(c, d);
        var e = false;
        b.each(a, function (f, g, h) {
            if ((e = c.call(d, f, g, h))) b.breakLoop();
        });
        return e;
    };
    b.include = function (a, c) {
        if (b.isArray(a)) return b.indexOf(a, c) != -1;
        var d = false;
        b.each(a, function (e) {
            if ((d = e === c)) b.breakLoop();
        });
        return d;
    };
    b.invoke = function (a, c) {
        var d = b.rest(arguments, 2);
        return b.map(a, function (e) {
            return (c ? e[c] : e).apply(e, d);
        });
    };
    b.pluck = function (a, c) {
        return b.map(a, function (d) {
            return d[c];
        });
    };
    b.max = function (a, c, d) {
        if (!c && b.isArray(a)) return Math.max.apply(Math, a);
        var e = {computed: -Infinity};
        b.each(a, function (f, g, h) {
            g = c ? c.call(d, f, g, h) : f;
            g >= e.computed && (e = {value: f, computed: g});
        });
        return e.value;
    };
    b.min = function (a, c, d) {
        if (!c && b.isArray(a)) return Math.min.apply(Math, a);
        var e = {computed: Infinity};
        b.each(a, function (f, g, h) {
            g = c ? c.call(d, f, g, h) : f;
            g < e.computed && (e = {value: f, computed: g});
        });
        return e.value;
    };
    b.sortBy = function (a, c, d) {
        return b.pluck(
            b
                .map(a, function (e, f, g) {
                    return {value: e, criteria: c.call(d, e, f, g)};
                })
                .sort(function (e, f) {
                    e = e.criteria;
                    f = f.criteria;
                    return e < f ? -1 : e > f ? 1 : 0;
                }),
            "value"
        );
    };
    b.sortedIndex = function (a, c, d) {
        d = d || b.identity;
        for (var e = 0, f = a.length; e < f; ) {
            var g = (e + f) >> 1;
            d(a[g]) < d(c) ? (e = g + 1) : (f = g);
        }
        return e;
    };
    b.toArray = function (a) {
        if (!a) return [];
        if (a.toArray) return a.toArray();
        if (b.isArray(a)) return a;
        if (b.isArguments(a)) return k.call(a);
        return b.values(a);
    };
    b.size = function (a) {
        return b.toArray(a).length;
    };
    b.first = function (a, c, d) {
        return c && !d ? k.call(a, 0, c) : a[0];
    };
    b.rest = function (a, c, d) {
        return k.call(a, b.isUndefined(c) || d ? 1 : c);
    };
    b.last = function (a) {
        return a[a.length - 1];
    };
    b.compact = function (a) {
        return b.select(a, function (c) {
            return Boolean(c);
        });
    };
    b.flatten = function (a) {
        return b.reduce(a, [], function (c, d) {
            if (b.isArray(d)) return c.concat(b.flatten(d));
            c.push(d);
            return c;
        });
    };
    b.without = function (a) {
        var c = b.rest(arguments);
        return b.select(a, function (d) {
            return !b.include(c, d);
        });
    };
    b.uniq = function (a, c) {
        return b.reduce(a, [], function (d, e, f) {
            if (f == 0 || (c === true ? b.last(d) != e : !b.include(d, e))) d.push(e);
            return d;
        });
    };
    b.intersect = function (a) {
        var c = b.rest(arguments);
        return b.select(b.uniq(a), function (d) {
            return b.all(c, function (e) {
                return b.indexOf(e, d) >= 0;
            });
        });
    };
    b.zip = function () {
        for (
            var a = b.toArray(arguments),
                c = b.max(b.pluck(a, "length")),
                d = new Array(c),
                e = 0;
            e < c;
            e++
        )
            d[e] = b.pluck(a, String(e));
        return d;
    };
    b.indexOf = function (a, c) {
        if (a.indexOf) return a.indexOf(c);
        for (var d = 0, e = a.length; d < e; d++) if (a[d] === c) return d;
        return -1;
    };
    b.lastIndexOf = function (a, c) {
        if (a.lastIndexOf) return a.lastIndexOf(c);
        for (var d = a.length; d--; ) if (a[d] === c) return d;
        return -1;
    };
    b.range = function (a, c, d) {
        var e = b.toArray(arguments),
            f = e.length <= 1;
        a = f ? 0 : e[0];
        c = f ? e[0] : e[1];
        d = e[2] || 1;
        e = Math.ceil((c - a) / d);
        if (e <= 0) return [];
        e = new Array(e);
        f = a;
        for (var g = 0; 1; f += d) {
            if ((d > 0 ? f - c : c - f) >= 0) return e;
            e[g++] = f;
        }
    };
    b.bind = function (a, c) {
        var d = b.rest(arguments, 2);
        return function () {
            return a.apply(c || j, d.concat(b.toArray(arguments)));
        };
    };
    b.bindAll = function (a) {
        var c = b.rest(arguments);
        if (c.length == 0) c = b.functions(a);
        b.each(c, function (d) {
            a[d] = b.bind(a[d], a);
        });
        return a;
    };
    b.delay = function (a, c) {
        var d = b.rest(arguments, 2);
        return setTimeout(function () {
            return a.apply(a, d);
        }, c);
    };
    b.defer = function (a) {
        return b.delay.apply(b, [a, 1].concat(b.rest(arguments)));
    };
    b.wrap = function (a, c) {
        return function () {
            var d = [a].concat(b.toArray(arguments));
            return c.apply(c, d);
        };
    };
    b.compose = function () {
        var a = b.toArray(arguments);
        return function () {
            for (var c = b.toArray(arguments), d = a.length - 1; d >= 0; d--)
                c = [a[d].apply(this, c)];
            return c[0];
        };
    };
    b.keys = function (a) {
        if (b.isArray(a)) return b.range(0, a.length);
        var c = [];
        for (var d in a) q.call(a, d) && c.push(d);
        return c;
    };
    b.values = function (a) {
        return b.map(a, b.identity);
    };
    b.functions = function (a) {
        return b
            .select(b.keys(a), function (c) {
                return b.isFunction(a[c]);
            })
            .sort();
    };
    b.extend = function (a, c) {
        for (var d in c) a[d] = c[d];
        return a;
    };
    b.clone = function (a) {
        if (b.isArray(a)) return a.slice(0);
        return b.extend({}, a);
    };
    b.tap = function (a, c) {
        c(a);
        return a;
    };
    b.isEqual = function (a, c) {
        if (a === c) return true;
        var d = typeof a;
        if (d !== typeof c) return false;
        if (a == c) return true;
        if ((!a && c) || (a && !c)) return false;
        if (a.isEqual) return a.isEqual(c);
        if (b.isDate(a) && b.isDate(c)) return a.getTime() === c.getTime();
        if (b.isNaN(a) && b.isNaN(c)) return true;
        if (b.isRegExp(a) && b.isRegExp(c))
            return (
                a.source === c.source &&
                a.global === c.global &&
                a.ignoreCase === c.ignoreCase &&
                a.multiline === c.multiline
            );
        if (d !== "object") return false;
        if (a.length && a.length !== c.length) return false;
        d = b.keys(a);
        var e = b.keys(c);
        if (d.length != e.length) return false;
        for (var f in a) if (!b.isEqual(a[f], c[f])) return false;
        return true;
    };
    b.isEmpty = function (a) {
        return b.keys(a).length == 0;
    };
    b.isElement = function (a) {
        return Boolean(a && a.nodeType == 1);
    };
    b.isArray = function (a) {
        return Boolean(a && a.concat && a.unshift);
    };
    b.isArguments = function (a) {
        return a && b.isNumber(a.length) && !b.isArray(a) && !r.call(a, "length");
    };
    b.isFunction = function (a) {
        return Boolean(a && a.constructor && a.call && a.apply);
    };
    b.isString = function (a) {
        return Boolean(a === "" || (a && a.charCodeAt && a.substr));
    };
    b.isNumber = function (a) {
        return p.call(a) === "[object Number]";
    };
    b.isDate = function (a) {
        return Boolean(a && a.getTimezoneOffset && a.setUTCFullYear);
    };
    b.isRegExp = function (a) {
        return Boolean(a && a.test && a.exec && (a.ignoreCase || a.ignoreCase === false));
    };
    b.isNaN = function (a) {
        return b.isNumber(a) && isNaN(a);
    };
    b.isNull = function (a) {
        return a === null;
    };
    b.isUndefined = function (a) {
        return typeof a === "undefined";
    };
    b.noConflict = function () {
        j._ = n;
        return this;
    };
    b.identity = function (a) {
        return a;
    };
    b.breakLoop = function () {
        throw m;
    };
    var s = 0;
    b.uniqueId = function (a) {
        var c = s++;
        return a ? a + c : c;
    };
    b.template = function (a, c) {
        a = new Function(
            "obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" +
                a
                    .replace(/[\r\t\n]/g, " ")
                    .replace(/'(?=[^%]*%>)/g, "\t")
                    .split("'")
                    .join("\\'")
                    .split("\t")
                    .join("'")
                    .replace(/<%=(.+?)%>/g, "',$1,'")
                    .split("<%")
                    .join("');")
                    .split("%>")
                    .join("p.push('") +
                "');}return p.join('');"
        );
        return c ? a(c) : a;
    };
    b.forEach = b.each;
    b.foldl = b.inject = b.reduce;
    b.foldr = b.reduceRight;
    b.filter = b.select;
    b.every = b.all;
    b.some = b.any;
    b.head = b.first;
    b.tail = b.rest;
    b.methods = b.functions;
    var l = function (a, c) {
        return c ? b(a).chain() : a;
    };
    b.each(b.functions(b), function (a) {
        var c = b[a];
        i.prototype[a] = function () {
            var d = b.toArray(arguments);
            o.call(d, this._wrapped);
            return l(c.apply(b, d), this._chain);
        };
    });
    b.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (
        a
    ) {
        var c = Array.prototype[a];
        i.prototype[a] = function () {
            c.apply(this._wrapped, arguments);
            return l(this._wrapped, this._chain);
        };
    });
    b.each(["concat", "join", "slice"], function (a) {
        var c = Array.prototype[a];
        i.prototype[a] = function () {
            return l(c.apply(this._wrapped, arguments), this._chain);
        };
    });
    i.prototype.chain = function () {
        this._chain = true;
        return this;
    };
    i.prototype.value = function () {
        return this._wrapped;
    };
})();
