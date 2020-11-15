function injectScript(file) {
    var th = document.getElementsByTagName('body')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}


$(document).ready(function() {

    var port = chrome.runtime.connect({
        name: 'checkinjection'
    });

    port.onMessage.addListener(function(message, sender) {
        console.log(message.details)
        if (message.details != "no") {
            if (message.details == "login") {
                var url_string = window.location.href; //
                var url = new URL(url_string);
                var code = url.searchParams.get("code");
                if (code) {
                    chrome.extension.sendMessage({
                        cmd: 'authcode',
                        data: code
                    });
                }



            } else {
                injectScript(message.details);
            }

        }
    })



})