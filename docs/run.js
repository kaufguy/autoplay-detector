/**
 * Created by guy.kaufman on 26/09/2017.
 */
AutoplayDetector.isAutoplaySupported(function(autoplayResult){
    document.getElementById("detector-result").innerHTML = "Inline Autoplay Support:" + autoplayResult.autoplay + " | Mute To Autoplay:" + autoplayResult.muted
}, 400)
