// ==UserScript==
// @name         Hamster Kombat Web
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Launching Hamster Kombat in the browser
// @author       Homous
// @match        *://*.hamsterkombat.io/*
// @grant        none
// @icon         http://89.106.206.41/homous/HAMSTERICON.png
// @downloadURL  https://github.com/amir-homous/Hamster-Kombat/raw/main/hamster-kombat.user.js
// @updateURL    https://github.com/amir-homous/Hamster-Kombat/raw/main/hamster-kombat.user.js
// @homepage     https://github.com/amir-homous/Hamster-Kombat
// ==/UserScript==

(function() {
    'use strict';

    function getRandomiOSUserAgent() {
        const iOSVersions = ['14_0', '14_1', '14_2', '14_3', '14_4', '14_5', '14_6', '14_7', '14_8',
                             '15_0', '15_1', '15_2', '15_3', '15_4', '15_5', '15_6', '15_7',
                             '16_0', '16_1', '16_2', '16_3', '16_4', '16_5', '16_6', '16_7',
                             '17_0', '17_1', '17_2', '17_3', '17_4', '17_5'];
        const iPhoneModels = ['iPhone11,2', 'iPhone11,4', 'iPhone11,6', 'iPhone11,8', 'iPhone12,1',
                              'iPhone12,3', 'iPhone12,5', 'iPhone13,1', 'iPhone13,2', 'iPhone13,3',
                              'iPhone13,4', 'iPhone14,2', 'iPhone14,3', 'iPhone14,4', 'iPhone14,5'];
        const randomVersion = iOSVersions[Math.floor(Math.random() * iOSVersions.length)];
        const randomModel = iPhoneModels[Math.floor(Math.random() * iPhoneModels.length)];
        return `Mozilla/5.0 (${randomModel}; CPU iPhone OS ${randomVersion} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1`;
    }

    const newUserAgent = getRandomiOSUserAgent();

    // Function to replace the script URL
    function replaceScriptUrl() {
        // List of URLs to replace
        const urlsToReplace = [
            'https://hamsterkombat.io/js/telegram-web-app.js',
            'https://app.hamsterkombat.io/js/telegram-web-app.js',
            'https://hamsterkombat.io/js/telegram-web-app.js?v=7.6'
        ];
        const newUrl = 'https://ktnff.tech/hamsterkombat/telegram-web-app.js';

        // Get all <script> tags on the page
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            // Check if src contains one of the URLs to replace
            if (urlsToReplace.includes(script.src)) {
                // Create a new <script> tag with the new URL
                const newScript = document.createElement('script');
                newScript.src = newUrl;
                newScript.type = 'text/javascript';

                // Replace the old tag with the new one
                script.parentNode.replaceChild(newScript, script);
                console.log('Script URL replaced:', newScript.src);
            }
        }
    }

    Object.defineProperty(navigator, 'userAgent', {
        get: function() { return newUserAgent; }
    });
    Object.defineProperty(navigator, 'platform', {
        get: function() { return 'iPhone'; }
    });
    Object.defineProperty(navigator, 'vendor', {
        get: function() { return 'Apple Computer, Inc.'; }
    });
    Object.defineProperty(navigator, 'deviceMemory', {
        get: function() { return undefined; }
    });
    Object.defineProperty(navigator, 'maxTouchPoints', {
        get: function() { return 5; }
    });

    // Observer for changes in the DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                replaceScriptUrl();
            }
        });
    });

    // Observer settings
    const config = {
        childList: true,
        subtree: true
    };

    // Start observing changes in the DOM
    observer.observe(document.body, config);

    // Initial launch of the URL replacement
    replaceScriptUrl();
})();
