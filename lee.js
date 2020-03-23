// ==UserScript==
// @name         hide subscription problem on leetcode2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://leetcode.com/problemset/*
// @grant        none
// ==/UserScript==

//$('td:nth-child(3) > div > span > span').parent().parent().parent().parent().hide();

(function() {
    'use strict';
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(function(mutations, observer) {
        const selectorOfProblem = '#question-app > div > div:nth-child(2) > div.question-list-base > div.table-responsive.question-list-table > table > tbody.reactable-data > tr';
        const problems = Array.prototype.slice.call(document.querySelectorAll(selectorOfProblem));
        const isSubscription = element => element.querySelector('td:nth-child(3) > div > span > span > .fa-lock');
        const subscriptionProblems = problems.filter(isSubscription);
        const hide = element => {
            element.style.display = 'none';
        };
        if (subscriptionProblems.length > 0) {
            subscriptionProblems.forEach(hide);
            let listTotal = document.querySelector("#welcome > span > .listTotal");
            if (listTotal) {
                listTotal.innerHTML = 'ListTotal&nbsp;' + (problems.length - subscriptionProblems.length);
            }else {
                document.querySelector("#welcome > span").innerHTML+='&nbsp;<span class="label round listTotal" style="background:#cd8bc9">ListTotal&nbsp;' + (problems.length - subscriptionProblems.length) + '</span>';
            }
            console.log(problems.length - subscriptionProblems.length);
            console.log(`hide ${subscriptionProblems.length} subscription problems`);
            //observer.disconnect();
        };
    });

    observer.observe(document, {
        subtree: true,
        attributes: true
    });
})();
