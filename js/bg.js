var workTabs = {};
var tokendata = "";
var submittedcode = "";
var process = "";

chrome.extension.onMessage.addListener(function(msg, sender, reply) {

    switch (msg.cmd) {
        case 'submitcode':
            {
                process = "submitcode";
                submittedcode = msg.data;

                if ((localStorage.tokendata != undefined) && (localStorage.tokendata != null) && (localStorage.tokendata != "")) {
                    tokendata = localStorage.tokendata;

                    $.ajax({
                        type: "GET",
                        url: "https://app.havocshield.com/?oauth=me&access_token=" + tokendata,
                        success: function(result0) {
                            if (result0.display_name) {
                                $.ajax({
                                    type: "GET",
                                    url: "https://5ec215456197530016092a2d.mockapi.io/api/v1/guide/" + msg.data,
                                    beforeSend: function(xhr) { xhr.setRequestHeader('x-api-key’', "api-key-goes-here"); },
                                    success: function(result) {

                                       

                                        if (result.result == "success") {
                                            chrome.tabs.create({ url: result.url }, function(tab) {
                                                workTabs[tab.id] = result.js_src;
                                            });
                                        }
                                        else{
                                            if (result.result == "expired-access-token") {
                                                localStorage.tokendata = ""
                                                alert("Your Havoc Shield login session has expired. Please login again and then renter your guide code")
                                                chrome.tabs.create({ url: "https://app.havocshield.com/oauth/authorize?client_id=BSSvfHKotCFYMKyBqXn0lGaXPtjbwwX0ug60dQl1&response_type=code&redirect_uri=https://app.havocshield.com/onboarding/?didit=1" }, function(tab) {
                                                   workTabs[tab.id] = "login";
                                                  });

                                            }
                                            else{
                                                chrome.extension.sendMessage({
                                                    cmd: 'result',
                                                    data: result
                                                });
                                            }
                                        }

                                       
                                       
                                        console.log(result)
                                    },
                                    error: function(result) {
                                        //handle the error
                                        console.log(result)

                                        chrome.extension.sendMessage({
                                            cmd: 'result',
                                            data: result
                                        });
                                    }
                                });
                            } else {
                                localStorage.tokendata = ""
                                alert("Your Havoc Shield login session has expired. Please login again and then renter your guide code")
                            chrome.tabs.create({ url: "https://app.havocshield.com/oauth/authorize?client_id=BSSvfHKotCFYMKyBqXn0lGaXPtjbwwX0ug60dQl1&response_type=code&redirect_uri=https://app.havocshield.com/onboarding/?didit=1" }, function(tab) {
                                workTabs[tab.id] = "login";
                            });
                            }
                        },
                        error: function(result) {
                            alert("Your Havoc Shield login session has expired. Please login again and then renter your guide code")
                            chrome.tabs.create({ url: "https://app.havocshield.com/oauth/authorize?client_id=BSSvfHKotCFYMKyBqXn0lGaXPtjbwwX0ug60dQl1&response_type=code&redirect_uri=https://app.havocshield.com/onboarding/?didit=1" }, function(tab) {
                                workTabs[tab.id] = "login";
                            });
                        }
                    });


                } else {
                    localStorage.tokendata = ""
                    alert("Your Havoc Shield login session has expired. Please login again and then renter your guide code")
                    chrome.tabs.create({ url: "https://app.havocshield.com/oauth/authorize?client_id=BSSvfHKotCFYMKyBqXn0lGaXPtjbwwX0ug60dQl1&response_type=code&redirect_uri=https://app.havocshield.com/onboarding/?didit=1" }, function(tab) {
                        workTabs[tab.id] = "login";
                    });
                }

            }
            break;

        case 'authcode':
            {

            

                $.ajax({
                    type: 'POST',
                    url: "https://app.havocshield.com/oauth/token",
                    data: {
                        "client_id": "BSSvfHKotCFYMKyBqXn0lGaXPtjbwwX0ug60dQl1",
                        "client_secret": "Rl4Vk7FiLesT5Kgt8d6pXuX4g06UFRGJj2mU2G7m",
                        "grant_type": "authorization_code",
                        "code": msg.data,
                        "Authorization": "Basic QlNTdmZIS290Q0ZZTUt5QnFYbjBsR2FYUHRqYnd3WDB1ZzYwZFFsMTpSbDRWazdGaUxlc1Q1S2d0OGQ2cFh1WDRnMDZVRlJHSmoybVUyRzdt",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "redirect_uri": "https://app.havocshield.com/onboarding/?didit=1"
                    },
                    success: function(result) {
                        console.log(result)
                        if (result.access_token) {
                            localStorage.tokendata = result.access_token
                            if (process == "submitcode") {
                                $.ajax({
                                    type: "GET",
                                    url: "https://5ec215456197530016092a2d.mockapi.io/api/v1/guide/" + submittedcode,
                                    beforeSend: function(xhr) { xhr.setRequestHeader('x-api-key’', "api-key-goes-here"); },
                                    success: function(result) {
                                        
                                        
                                        chrome.tabs.remove(sender.tab.id);

                                        if (result.result == "success") {
                                            
                                            chrome.tabs.create({ url: result.url }, function(tab) {
                                                workTabs[tab.id] = result.js_src;
                                            });
                                          
                                        }
                                        else{
                                            if (result.result == "expired-access-token") {
                                                localStorage.tokendata = ""
                                                alert("Your Havoc Shield login session has expired. Please login again and then renter your guide code")
                                                chrome.tabs.create({ url: "https://app.havocshield.com/oauth/authorize?client_id=BSSvfHKotCFYMKyBqXn0lGaXPtjbwwX0ug60dQl1&response_type=code&redirect_uri=https://app.havocshield.com/onboarding/?didit=1" }, function(tab) {
                                                   workTabs[tab.id] = "login";
                                                  });

                                            }
                                            else{
                                                chrome.extension.sendMessage({
                                                    cmd: 'result',
                                                    data: result
                                                });
                                            }

                                            
                                        }
                                        console.log(result)
                                    },
                                    error: function(result) {
                                        //handle the error
                                        console.log(result)

                                        chrome.extension.sendMessage({
                                            cmd: 'result',
                                            data: result
                                        });
                                    }
                                });
                            }

                        }

                    },
                    error: function(result) {
                        console.log(result)
                    }
                });



            }
            break;


        case 'expired_token_check':
            {
                if ((localStorage.tokendata != undefined) && (localStorage.tokendata != null)) {
                    tokendata = localStorage.tokendata;
                    $('#btnsubmit').html('Submit Code');
                    $.ajax({
                        type: "GET",
                        url: "https://app.havocshield.com/?oauth=me&access_token=" + tokendata,
                        success: function(result0) {
                            if (result0.display_name) {
                                chrome.extension.sendMessage({
                                    cmd: 'is_expired',
                                    data: "no"
                                });
                            } else {
                                localStorage.tokendata = null;
                                chrome.extension.sendMessage({
                                    cmd: 'is_expired',
                                    data: "yes"
                                });
                            }
                        },
                        error: function(result) {

                        }
                    });
                }
            }
            break;
    }
})

chrome.tabs.onRemoved.addListener(function(tabId) {
    delete workTabs[tabId];
});


chrome.runtime.onConnect.addListener(function(port) {

    if (port.name == "checkinjection") {
        if (workTabs[port.sender.tab.id]) {
            port.postMessage({ details: workTabs[port.sender.tab.id] });
        } else {
            port.postMessage({ details: "no" });
        }
    }

})