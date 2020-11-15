$(document).ready(function() {

    $('#btnsubmit').click(function() {
        $("#note").val("");
        var code = $("#mCode").val();
        chrome.extension.sendMessage({
            cmd: 'submitcode',
            data: code
        });

    });


    $('#mCode').keypress(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            $("#note").val("");
            var code = $("#mCode").val();
            chrome.extension.sendMessage({
                cmd: 'submitcode',
                data: code
            });
        }
    });

})

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    console.log(msg.data)
    if (msg.cmd == "result") {
        if (msg.data.result) {
            if ((msg.data.result == "invalid-code") || (msg.data.result == "expired-access-token")) {
                $("#note").html(msg.data.error)
            }
        } else {
            $("#note").html(msg.data.responseText)
        }
        

    }

    if (msg.cmd == "is_expired") {
        if (msg.data == "no") {
            $("#note").html("Your access token is fresh! You can enter your guide code")
        } else {
            $("#note").html("Your Havoc Shield login session has expired. Please login again and then renter your guide code.")
        }


    }

})