/**
 * Created by guy.kaufman
 */
var MUTE_DELAY_PORTION = 25;

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.AutoplayDetector = factory();
    }

}(this, function () {
    var isAutoplaySupported = function (callback, timeout) {
        var called = false;
        if (!callback) {
            return;
        }
        if (!isPlaysinline()) {
            return callback({ autoplay: false, muted: false });
        }
        checkAutoplay(false, function () { testHandler(false); });
        setTimeout(function () {
            checkAutoplay(true, function () { testHandler(true); });
        }, timeout / MUTE_DELAY_PORTION);
        var testHandler = function (mute) {
            if (!called) {
                called = true;
                callback({ autoplay: true, muted: mute });
            }
        };
        setTimeout(function () {
            if (!called) {
                called = true;
                callback({ autoplay: false, muted: false });
            }
        }, timeout);
    };

    var checkAutoplay = function (mute, callback) {
        var video = document.createElement('video');
        video.ontimeupdate = function () {
            if (video.currentTime != 0) {
                return callback();
            }
            ;
        };
        video.autoplay = true;
        video.muted = mute;
        video.setAttribute('webkit-playsinline', 'webkit-playsinline');
        video.setAttribute('playsinline', 'playsinline');
        video.src = 'data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
        video.style.display = 'none';
        video.load();
        video.play();
        return video;
    };

    var isPlaysinline = function () {
        return navigator.userAgent.match(/(iPhone|iPod)/g) ? ('playsInline' in document.createElement('video')) : true;
    };

    return {
        isAutoplaySupported: isAutoplaySupported
    }
}));