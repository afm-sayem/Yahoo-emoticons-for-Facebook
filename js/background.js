const debugging = false;
var isEnabled = true; //initial the isEnable value

chrome.storage.sync.clear(function(){
    //always set to default, remove this if add user config
    debug("storage cleared");

    chrome.storage.sync.get(function(items){
        //add all storageVariables to storage if it hasn't been done
        if (items.isEnabled === undefined || items.emoticons === undefined){
            chrome.storage.sync.set({
                'isEnabled': isEnabled,
                'emoticons': emoticons
            }, function(){
                debug("Set new storage.");

                reloadTabs();
                refreshIcon();
            });
        } else {
            //this code will never run
            isEnabled = items.isEnabled;
            emoticons = items.emoticons;
            debug("Get old storage.");

            reloadTabs();
            refreshIcon();
        }
    });
});





//FUNCTION + EVENTS

//Toggle button - Enable/Disable the extension
chrome.browserAction.onClicked.addListener(function(tab) {
    isEnabled = !isEnabled;
    chrome.storage.sync.set({
        'isEnabled': isEnabled
    }, function(){
        debug("saved. isEnabled=" + isEnabled);

        reloadTabs();
        refreshIcon();
    });
});

//receive buzz request from content script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === "buzz"){
            chrome.windows.get(sender.tab.windowId, function(window){
                chrome.tabs.get(sender.tab.id, function(tab){
                    //only buzz when user in another tab / window
                    debug("buzz: window.focused=" + window.focused);
                    debug("buzz: tab.active=" + tab.active);
                    if (!window.focused || !tab.active){
                        //play sound
                        var buzzAudio = new Audio();
                        buzzAudio.src = "sounds/buzz.mp3";
                        buzzAudio.play();
                        //focus on the chat tab
                        chrome.windows.update(sender.tab.windowId, {drawAttention: true, focused: true});
                        chrome.tabs.update(sender.tab.id, {active: true});

                        debug("buzzed");
                    }
                });
            });
        }
    }
);

function refreshIcon(){
    //toggle icon
    if (isEnabled){
        chrome.browserAction.setIcon({
            path: "./images/icon.png"
        });
    } else {
        chrome.browserAction.setIcon({
            path: "./images/iconblack.png"
        });
    }
    debug("refreshed icon");
}

function reloadTabs(){
    debug("reloading tabs");
	chrome.tabs.query({url: ["https://www.facebook.com/*","https://www.messenger.com/*"]}, function(tabs){
		for (var i = 0; i < tabs.length; i++){
			chrome.tabs.reload(tabs[i].id);
		}
	});
}

function debug(str){
    if (debugging) {
        console.log(str);
    }
}

var emoticons = [{
    "fbImgFilename": "1f642.png",
    "title": "smile emoticon",
    "keys": [":)", ":-)"],
    "src": "images/YahooEmoticons/1.gif"
}, {
    "fbImgFilename": "1f61e.png",
    "title": "frown emoticon",
    "keys": [":(", ":-("],
    "src": "images/YahooEmoticons/2.gif"
}, {
    "fbImgFilename": "1f609.png",
    "title": "wink emoticon",
    "keys": [";)", ";-)"],
    "src": "images/YahooEmoticons/3.gif"
}, {
    "fbImgFilename": "1f600.png",
    "title": "grin emoticon",
    "keys": [":D", ":d", ":-d", ":-D"],
    "src": "images/YahooEmoticons/4.gif"
}, {
    "keys": [";;)"],
    "src": "images/YahooEmoticons/5.gif"
}, {
    "keys": [">:D<", ">:d<"],
    "src": "images/YahooEmoticons/6.gif"
}, {
    "fbImgFilename": "1f615.png",
    "title": "unsure emoticon",
    "keys": [":-/", ":-\\"],
    "src": "images/YahooEmoticons/7.gif"
}, {
    "keys": [":x", ":X", ":-x", ":-X"],
    "src": "images/YahooEmoticons/8.gif"
}, {
    "keys": [":\">", ":$"],
    "src": "images/YahooEmoticons/9.gif"
}, {
    "fbImgFilename": "1f61b.png",
    "title": "tongue emoticon",
    "keys": [":P", ":p", ":-p", ":-P"],
    "src": "images/YahooEmoticons/10.gif"
}, {
    "fbImgFilename": "1f617.png",
    "title": "kiss emoticon",
    "keys": [":-*", ":*"],
    "src": "images/YahooEmoticons/11.gif"
}, {
    "keys": ["=(("],
    "src": "images/YahooEmoticons/12.gif"
}, {
    "fbImgFilename": "1f62e.png",
    "title": "gasp emoticon",
    "keys": [":-O", ":-o", ":o", ":O"],
    "src": "images/YahooEmoticons/13.gif"
}, {
    "fbImgFilename": "1f621.png",
    "title": "upset emoticon",
    "keys": ["X(", "x(", "x-(", "X-(", ":@"],
    "src": "images/YahooEmoticons/14.gif"
}, {
    "keys": [":>", ":->"],
    "src": "images/YahooEmoticons/15.gif"
}, {
    "fbImgFilename": "1f60e.png",
    "title": "glasses emoticon",
    "keys": ["B-)", "b-)", "b)", "B)"],
    "src": "images/YahooEmoticons/16.gif"
}, {
    "keys": [":-S", ":-s", ":s", ":-S"],
    "src": "images/YahooEmoticons/17.gif"
}, {
    "keys": ["#:-S", "#:-s"],
    "src": "images/YahooEmoticons/18.gif"
}, {
    "keys": [">:)"],
    "src": "images/YahooEmoticons/19.gif"
}, {
    "keys": [":((", ":-(("],
    "src": "images/YahooEmoticons/20.gif"
}, {
    "keys": [":))", ":-))"],
    "src": "images/YahooEmoticons/21.gif"
}, {
    "fbImgFilename": "1f610.png",
    "keys": [":|", ":-|"],
    "src": "images/YahooEmoticons/22.gif"
}, {
    "keys": ["/:)", "/:-)"],
    "src": "images/YahooEmoticons/23.gif"
}, {
    "keys": ["=))"],
    "src": "images/YahooEmoticons/24.gif"
}, {
    "fbImgFilename": "1f607.png",
    "title": "angel emoticon",
    "keys": ["O:-)", "o:-)", "O:)", "o:)"],
    "src": "images/YahooEmoticons/25.gif"
}, {
    "keys": [":-B", ":-b", ":b", ":B"],
    "src": "images/YahooEmoticons/26.gif"
}, {
    "keys": ["=;"],
    "src": "images/YahooEmoticons/27.gif"
}, {
    "keys": ["I-)", "i-)"],
    "src": "images/YahooEmoticons/28.gif"
}, {
    "keys": ["8-|"],
    "src": "images/YahooEmoticons/29.gif"
}, {
    "keys": ["L-)", "l-)"],
    "src": "images/YahooEmoticons/30.gif"
}, {
    "keys": [":-&"],
    "src": "images/YahooEmoticons/31.gif"
}, {
    "keys": [":-$"],
    "src": "images/YahooEmoticons/32.gif"
}, {
    "keys": ["[-("],
    "src": "images/YahooEmoticons/33.gif"
}, {
    "keys": [":O)", ":o)"],
    "src": "images/YahooEmoticons/34.gif"
}, {
    "keys": ["8-}"],
    "src": "images/YahooEmoticons/35.gif"
}, {
    "keys": ["<:-P", "<:-p"],
    "src": "images/YahooEmoticons/36.gif"
}, {
    "keys": ["(:|"],
    "src": "images/YahooEmoticons/37.gif"
}, {
    "keys": ["=P~", "=p~"],
    "src": "images/YahooEmoticons/38.gif"
}, {
    "keys": [":-?"],
    "src": "images/YahooEmoticons/39.gif"
}, {
    "keys": ["#-o", "#-O"],
    "src": "images/YahooEmoticons/40.gif"
}, {
    "keys": ["=D>", "=d>"],
    "src": "images/YahooEmoticons/41.gif"
}, {
    "keys": [":-SS", ":-ss"],
    "src": "images/YahooEmoticons/42.gif"
}, {
    "keys": ["@-)"],
    "src": "images/YahooEmoticons/43.gif"
}, {
    "keys": [":^o", ":^O"],
    "src": "images/YahooEmoticons/44.gif"
}, {
    "keys": [":-w", ":-W"],
    "src": "images/YahooEmoticons/45.gif"
}, {
    "keys": [":-<"],
    "src": "images/YahooEmoticons/46.gif"
}, {
    "keys": [">:P", ">:p"],
    "src": "images/YahooEmoticons/47.gif"
}, {
    "keys": ["<):)"],
    "src": "images/YahooEmoticons/48.gif"
}, {
    "keys": [":@)"],
    "src": "images/YahooEmoticons/49.gif"
}, {
    "keys": ["3:-O", "3:-o"],
    "src": "images/YahooEmoticons/50.gif"
}, {
    "keys": [":(|)"],
    "src": "images/YahooEmoticons/51.gif"
}, {
    "keys": ["~:>"],
    "src": "images/YahooEmoticons/52.gif"
}, {
    "keys": ["@};-"],
    "src": "images/YahooEmoticons/53.gif"
}, {
    "keys": ["%%-"],
    "src": "images/YahooEmoticons/54.gif"
}, {
    "keys": ["**=="],
    "src": "images/YahooEmoticons/55.gif"
}, {
    "keys": ["(~~)"],
    "src": "images/YahooEmoticons/56.gif"
}, {
    "keys": ["~O)", "~o)"],
    "src": "images/YahooEmoticons/57.gif"
}, {
    "keys": ["*-:)"],
    "src": "images/YahooEmoticons/58.gif"
}, {
    "keys": ["8-X", "8-x"],
    "src": "images/YahooEmoticons/59.gif"
}, {
    "keys": ["=:)"],
    "src": "images/YahooEmoticons/60.gif"
}, {
    "keys": [">-)"],
    "src": "images/YahooEmoticons/61.gif"
}, {
    "keys": [":-L", ":-l"],
    "src": "images/YahooEmoticons/62.gif"
}, {
    "keys": ["[-O<", "[-o<"],
    "src": "images/YahooEmoticons/63.gif"
}, {
    "keys": ["$-)"],
    "src": "images/YahooEmoticons/64.gif"
}, {
    "keys": [":-\""],
    "src": "images/YahooEmoticons/65.gif"
}, {
    "keys": ["b-(", "B-("],
    "src": "images/YahooEmoticons/66.gif"
}, {
    "keys": [":)>-"],
    "src": "images/YahooEmoticons/67.gif"
}, {
    "keys": ["[-X", "[-x"],
    "src": "images/YahooEmoticons/68.gif"
}, {
    "keys": ["\\:D/", "\\:d/"],
    "src": "images/YahooEmoticons/69.gif"
}, {
    "keys": [">:/"],
    "src": "images/YahooEmoticons/70.gif"
}, {
    "keys": [";))"],
    "src": "images/YahooEmoticons/71.gif"
}, {
    "keys": ["o->", "O->"],
    "src": "images/YahooEmoticons/72.gif"
}, {
    "keys": ["o=>", "O=>"],
    "src": "images/YahooEmoticons/73.gif"
}, {
    "keys": ["o-+", "O-+"],
    "src": "images/YahooEmoticons/74.gif"
}, {
    "keys": ["(%)"],
    "src": "images/YahooEmoticons/75.gif"
}, {
    "keys": [":-@"],
    "src": "images/YahooEmoticons/76.gif"
}, {
    "keys": ["^:)^"],
    "src": "images/YahooEmoticons/77.gif"
}, {
    "keys": [":-j", ":-J"],
    "src": "images/YahooEmoticons/78.gif"
}, {
    "keys": ["(*)"],
    "src": "images/YahooEmoticons/79.gif"
}, {
    "keys": [":)]"],
    "src": "images/YahooEmoticons/100.gif"
}, {
    "keys": [":-c", ":-C"],
    "src": "images/YahooEmoticons/101.gif"
}, {
    "keys": ["~X(", "~x("],
    "src": "images/YahooEmoticons/102.gif"
}, {
    "keys": [":-h", ":-H"],
    "src": "images/YahooEmoticons/103.gif"
}, {
    "keys": [":-t", ":-T"],
    "src": "images/YahooEmoticons/104.gif"
}, {
    "keys": ["8->"],
    "src": "images/YahooEmoticons/105.gif"
}, {
    "keys": [":-??"],
    "src": "images/YahooEmoticons/106.gif"
}, {
    "keys": ["%-("],
    "src": "images/YahooEmoticons/107.gif"
}, {
    "keys": [":o3", ":O3"],
    "src": "images/YahooEmoticons/108.gif"
}, {
    "keys": ["X_X", "x_x"],
    "src": "images/YahooEmoticons/109.gif"
}, {
    "keys": [":!!"],
    "src": "images/YahooEmoticons/110.gif"
}, {
    "keys": ["\\m/", "\\M/"],
    "src": "images/YahooEmoticons/111.gif"
}, {
    "keys": [":-q", ":-Q"],
    "src": "images/YahooEmoticons/112.gif"
}, {
    "keys": [":-bd", ":-BD"],
    "src": "images/YahooEmoticons/113.gif"
}, {
    "keys": ["^#(^"],
    "src": "images/YahooEmoticons/114.gif"
}, {
    "keys": [":bz", ":BZ"],
    "src": "images/YahooEmoticons/115.gif"
}, {
    "keys": ["~^o^~", "~^O^~"],
    "src": "images/YahooEmoticons/116.gif"
}, {
    "keys": ["'@^@|||"],
    "src": "images/YahooEmoticons/117.gif"
}, {
    "keys": ["[]---"],
    "src": "images/YahooEmoticons/118.gif"
}, {
    "keys": ["^o^||3", "^O^||3"],
    "src": "images/YahooEmoticons/119.gif"
}, {
    "keys": [":-(||>"],
    "src": "images/YahooEmoticons/120.gif"
}, {
    "keys": ["'+_+"],
    "src": "images/YahooEmoticons/121.gif"
}, {
    "keys": [":::^^:::"],
    "src": "images/YahooEmoticons/122.gif"
}, {
    "keys": ["o|^_^|o", "O|^_^|O"],
    "src": "images/YahooEmoticons/123.gif"
}, {
    "keys": [":puke!", ":PUKE!"],
    "src": "images/YahooEmoticons/124.gif"
}, {
    "keys": ["o|\\~", "O|\\~"],
    "src": "images/YahooEmoticons/125.gif"
}, {
    "keys": ["o|:-)", "O|:-)"],
    "src": "images/YahooEmoticons/126.gif"
}, {
    "keys": [":(fight)", ":(FIGHT)"],
    "src": "images/YahooEmoticons/127.gif"
}, {
    "keys": ["%*-{"],
    "src": "images/YahooEmoticons/128.gif"
}, {
    "keys": ["%||:-{"],
    "src": "images/YahooEmoticons/129.gif"
}, {
    "keys": ["&[]"],
    "src": "images/YahooEmoticons/130.gif"
}, {
    "keys": [":(tv)", ":(TV)"],
    "src": "images/YahooEmoticons/131.gif"
}, {
    "keys": ["?@_@?"],
    "src": "images/YahooEmoticons/132.gif"
}, {
    "keys": [":->~~"],
    "src": "images/YahooEmoticons/133.gif"
}, {
    "keys": ["'@-@"],
    "src": "images/YahooEmoticons/134.gif"
}, {
    "keys": [":(game)", ":(GAME)"],
    "src": "images/YahooEmoticons/135.gif"
}, {
    "keys": [":-)/\\:-)"],
    "src": "images/YahooEmoticons/136.gif"
}, {
    "keys": ["[]==[]"],
    "src": "images/YahooEmoticons/137.gif"
}]