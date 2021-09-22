
twttr.ready(function (twttr) {
  twttr.events.bind("rendered", function (event) {
    var frameDoc = event.target.contentDocument;

    // initially hide retweets
    var hideRetweets = function () {
        var retweets = frameDoc.querySelectorAll('div.timeline-Tweet--isRetweet');
        retweets.forEach(function (node) {
            if (node.parentNode && node.parentNode.style !== 'display: none;') { // (in)sanity check
                node.parentNode.style = 'display: none;' // hide entire parent li tag
            }
        });
    };

    hideRetweets();

    // Twitter widget emitts no events on updates so we hook up ourselves to ol element to listen on it for additions of children
    var watcher = new MutationObserver(function (mutations) {
        // check whether new tweets arrived
        var hasNewTweets = mutations.some(function (mutation) {
            return mutation.addedNodes.length > 0;
        });
        if (hasNewTweets) {
            hideRetweets(); // rescan all tweets as it is easier
        }
    });
    watcher.observe(frameDoc.querySelector('ol.timeline-TweetList'), { childList: true });
});
});


