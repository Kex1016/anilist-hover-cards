m4_divert(-1)m4_dnl
m4_changequote(<m4<,>m4>)
m4_define(SCRIPT_VERSION, 1.2.1)
m4_divert(0)m4_dnl
// ==UserScript==
// @name         AniList Profile Hover Cards
// @namespace    https://anilist.co/user/cakes
// @version      SCRIPT_VERSION
// @description  It only adds a hover card for a user when you hover over their avatar.
// @author       cakes
// @match        https://anilist.co/*
// @grant        GM_xmlhttpRequest
// @license      GPL-3.0-or-later
// @downloadURL  https://downloads.haiiro.moe/anilist/al-profile-cards.user.js
// @updateURL    https://downloads.haiiro.moe/anilist/al-profile-cards.user.js
// ==/UserScript==

/*
    Thanks for checking out my userscript!
    Some elements might be familiar if you saw hoh's Automail userscript, as I've
    borrowed small parts of it for this script. Credit where credit is due:
    https://github.com/hohMiyazawa/Automail/
    Check it out, it's an awesome script!
*/

(function(){
"use strict";

// Shared style element for all the modules. Custom classes are prefixed by "cakes" to avoid messing with AniList classes
let style = document.createElement("style");
style.id = "profile-card-styles";
style.type = "text/css";

style.textContent = `
m4_include(css/style.css)
`;

let documentHead = document.querySelector("head");
if(documentHead && document.URL !== "https://anilist.co/graphiql") documentHead.appendChild(style)
else return

// Load the modules
m4_include(functions.js)
m4_include(main.js)

// End of script
})();