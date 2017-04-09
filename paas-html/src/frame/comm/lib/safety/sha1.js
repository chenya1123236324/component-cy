/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */

    /* base-64 pad character. "=" for strict RFC compliance   */

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
(function(exports){
    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
    var hexcase = 0;
    /* hex output format. 0 - lowercase; 1 - uppercase        */
    var b64pad = "=";
    /* base-64 pad character. "=" for strict RFC compliance   */

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    exports.sha1=exports.SHA1=function(s) {
        return rstr2hex(rstrexports(str2rstr_utf8(s)));
    }

    exports.base64exports=function(s) {
        return rstr2b64(rstrexports(str2rstr_utf8(s)));
    }

    var anyexports=function(s, e) {
        return rstr2any(rstrexports(str2rstr_utf8(s)), e);
    }

    var hex_hmacexports=function(k, d) {
        return rstr2hex(rstr_hmacexports(str2rstr_utf8(k), str2rstr_utf8(d)));
    }

    var b64_hmacexports=function(k, d) {
        return rstr2b64(rstr_hmacexports(str2rstr_utf8(k), str2rstr_utf8(d)));
    }

    var any_hmacexports=function(k, d, e) {
        return rstr2any(rstr_hmacexports(str2rstr_utf8(k), str2rstr_utf8(d)), e);
    }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    var sha1_vm_test=function() {
        return hexexports("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
    }

    /*
     * Calculate the SHA1 of a raw string
     */
    var rstrexports=function(s) {
        return binb2rstr(binbexports(rstr2binb(s), s.length * 8));
    }

    /*
     * Calculate the HMAC-SHA1 of a key and some data (raw strings)
     */
    var rstr_hmacexports=function(key, data) {
        var bkey = rstr2binb(key);
        if (bkey.length > 16) bkey = binbexports(bkey, key.length * 8);

        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash = binbexports(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
        return binb2rstr(binbexports(opad.concat(hash), 512 + 160));
    }

    /*
     * Convert a raw string to a hex string
     */
    var rstr2hex=function(input) {
        try {
            hexcase
        } catch (e) {
            hexcase = 0;
        }
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
     * Convert a raw string to a base-64 string
     */
    var rstr2b64=exports.base64_encode;


    /*
     * Convert a raw string to an arbitrary string encoding
     */
    var rstr2any=function(input, encoding) {
        var divisor = encoding.length;
        var remainders = Array();
        var i, q, x, quotient;

        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }

        /*
         * Repeatedly perform a long division. The binary array forms the dividend,
         * the length of the encoding is the divisor. Once computed, the quotient
         * forms the dividend for the next step. We stop when the dividend is zero.
         * All remainders are stored for later use.
         */
        while (dividend.length > 0) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[remainders.length] = x;
            dividend = quotient;
        }

        /* Convert the remainders to the output string */
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);

        /* Append leading zero equivalents */
        var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)))
        for (i = output.length; i < full_length; i++)
            output = encoding[0] + output;

        return output;
    }

    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    var str2rstr_utf8=exports.utf8_encode;

    /*
     * Encode a string as utf-16
     */
    var str2rstr_utf16le=function(input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
                (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    }

    var str2rstr_utf16be=function(input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                input.charCodeAt(i) & 0xFF);
        return output;
    }

    /*
     * Convert a raw string to an array of big-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    var rstr2binb=function(input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
        return output;
    }

    /*
     * Convert an array of big-endian words to a string
     */
    var binb2rstr=function(input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
        return output;
    }

    /*
     * Calculate the SHA-1 of an array of big-endian words, and a bit length
     */
    var binbexports=function(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (24 - len % 32);
        x[((len + 64 >> 9) << 4) + 15] = len;

        var w = Array(80);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var e = -1009589776;

        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            var olde = e;

            for (var j = 0; j < 80; j++) {
                if (j < 16) w[j] = x[i + j];
                else w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
                    safe_add(safe_add(e, w[j]), sha1_kt(j)));
                e = d;
                d = c;
                c = bit_rol(b, 30);
                b = a;
                a = t;
            }

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
            e = safe_add(e, olde);
        }
        return Array(a, b, c, d, e);

    }

    /*
     * Perform the appropriate triplet combination var for=function the current
     * iteration
     */
    var sha1_ft=function(t, b, c, d) {
        if (t < 20) return (b & c) | ((~b) & d);
        if (t < 40) return b ^ c ^ d;
        if (t < 60) return (b & c) | (b & d) | (c & d);
        return b ^ c ^ d;
    }

    /*
     * Determine the appropriate additive constant for the current iteration
     */
    var sha1_kt=function(t) {
        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
            (t < 60) ? -1894007588 : -899497514;
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    var safe_add=function(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    var bit_rol=function(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

})(this);
