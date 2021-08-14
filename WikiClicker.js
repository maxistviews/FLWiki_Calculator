// ==UserScript==
// @name         FallenLondon Wiki
// @version      1.2.1
// @description  Turn Fallen London's Storylet titles into links.
// @author       Maxistviews
// @match        https://www.fallenlondon.com/
// @grant        none
// @run-at       document-end
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
 } // From: https://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
// Stops the Storylet link from being light blue.
addGlobalStyle('.media__heading.heading.heading--2.storylet-root__heading { color: black !important; }');
(new MutationObserver(check)).observe(document, {childList: true, subtree: true});
//(new MutationObserver(check)).observe(document.getElementById('outfit-selector__title'), {childList: true, subtree: true});

var heading = '';
function check(changes, observer) {
    if(document.querySelector('.storylet-root__heading')) {
        // observer.disconnect();
        // Finds the storylet title
        var storytitle = document.querySelector('h1.media__heading.heading.heading--2.storylet-root__heading').textContent;
        
        // Adds storylet title to the wiki URL and replaces characters incompatible with the wiki.
        var storytitleURL = 'https://fallenlondon.wiki/wiki/' + encodeURIComponent(storytitle.replace(/\s+/g, '_'));
        
        const item = document.querySelector('h1.media__heading.heading.heading--2.storylet-root__heading');
        /*
        These were just here for testing.
        console.log('storytitle' + storytitle);
        console.log('item value:' + item);
        console.log('item textContent:' + item.textContent);
        console.log('heading:' + heading);
         */
        if (item.innerHTML !== heading){
            var newitem = document.createElement('a');
            newitem.setAttribute('href', storytitleURL);
            newitem.setAttribute('target', '_blank');
             //newitem.innerHTML = storytitle;
            item.parentNode.replaceChild(newitem, item);
            newitem.appendChild(item);
            heading = item.innerHTML;
        }

    }
    // if(document.querySelector('.css-c58fxf-singleValue')) {
    //     console.log('Detected Outfitchange');
    //     var delayInMilliseconds = 5000; //5 second

    //     setTimeout(function() {
    //         // Finds the storylet title
    //         var storytitle = document.querySelector('h1.media__heading.heading.heading--2.storylet-root__heading').textContent;
    //         console.log('Found Storytitle:' + storytitle);
            
    //         // Adds storylet title to the wiki URL and replaces characters incompatible with the wiki.
    //         var storytitleURL = 'https://fallenlondon.wiki/wiki/' + encodeURIComponent(storytitle.replace(/\s+/g, '_'));
    //         const item = document.querySelector('h1.media__heading.heading.heading--2.storylet-root__heading');

    //         if (item.innerHTML !== heading){
    //             var newitem = document.createElement('a');
    //             newitem.setAttribute('href', storytitleURL);
    //             newitem.setAttribute('target', '_blank');
    //             //newitem.innerHTML = storytitle;
    //             item.parentNode.replaceChild(newitem, item);
    //             newitem.appendChild(item);
    //             heading = item.innerHTML;
    //         }
    //     }, delayInMilliseconds);
    // }
}