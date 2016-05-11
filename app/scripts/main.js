(function() {
  var fixUpAllEmojis = function(rootElement) {
    var i;
    var emojis = document.querySelectorAll('g-emoji');
    for (i = 0; i < emojis.length; ++i) {
      if (window.GEmojiElement !== undefined) {
        var img = emojis[i].querySelector('img');
        img.src = img.src.replace(
          'https://assets-cdn.github.com/images/icons/emoji/unicode/',
          'https://raw.githubusercontent.com/twitter/twemoji/gh-pages/36x36/'
        );
      } else {
        var img = document.createElement('img');
        img.src = emojis[i].getAttribute('fallback-src').replace(
          'https://assets-cdn.github.com/images/icons/emoji/unicode/',
          'https://raw.githubusercontent.com/twitter/twemoji/gh-pages/36x36/'
        );
        img.className = 'emoji';
        img.alt = img.title = ':' + emojis[i].getAttribute('alias') + ':';
        img.width = 20;
        img.height = 20;
        img.align = 'absmiddle';
        emojis[i].parentElement.replaceChild(img, emojis[i]);
      }
    }

    emojis = document.querySelectorAll('img.emoji');
    for (i=0; i < emojis.length; i++) {
      emojis[i].src = emojis[i].src.replace(
        'https://assets-cdn.github.com/images/icons/emoji/unicode/',
        'https://raw.githubusercontent.com/twitter/twemoji/gh-pages/36x36/');
    }
  };

  var obs = null;
  var hookedSuggesters = {};

  var hookSuggesters = function() {
    var suggObs = new MutationObserver(function(records) {
      for (var j=0; j < records.length; j++) {
        var es = records[j].target.querySelector('.emoji-suggestions');
        if (es) obs.observe(es, {childList: true});
      }
    });

    var suggesters = document.querySelectorAll('.suggester');
    for (i=0; i < suggesters.length; i++) {
      if (hookedSuggesters[suggesters[i]]) continue;

      suggObs.observe(suggesters[i], {childList: true});
      hookedSuggesters[suggesters[i]] = true;
    }
  };

  obs = new MutationObserver(function(records) {
    hookSuggesters();

    for (var i=0; i < records.length; i++) {
      var nodes = (records[i].addedNodes && records[i].addedNodes.length > 0 ?
        records[i].addedNodes : [records[i].target]);

        for (var j=0; j < nodes.length; j++) {
          fixUpAllEmojis(nodes[j]);
        }
    }
  });

  var allPjaxes = document.querySelectorAll('div[data-pjax-container]');
  for (var i=0; i < allPjaxes.length; i++) {
    obs.observe(allPjaxes[i], {childList: true, subtree: true});
  }

  var preview = document.querySelectorAll('.markdown-body');
  for (var i = 0; i < preview.length; ++i) {
    obs.observe(preview[i], {childList: true});
  }

  hookSuggesters();

  fixUpAllEmojis(document);
})();
