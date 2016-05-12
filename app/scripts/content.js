(function() {
  // Override the registration of the custom <g-emoji/> element to use twitter emoji on creation
  var createEmoji = function(node) {
    var img = document.createElement('img');
    img.src = node.getAttribute('fallback-src').replace(
      'https://assets-cdn.github.com/images/icons/emoji/unicode/',
      'https://raw.githubusercontent.com/twitter/twemoji/gh-pages/36x36/'
    );
    img.className = 'emoji';
    img.alt = img.title = ':' + node.getAttribute('alias') + ':';
    img.width = 20;
    img.height = 20;
    img.align = 'absmiddle';
    return img;
  }
  
  var original = document.registerElement;
  document.registerElement = function(tag, options) {
    if (tag === 'g-emoji') {
      var proto = Object.create(HTMLElement.prototype);
      proto.createdCallback = function() {
        this.textContent = '';
        this.appendChild(createEmoji(this));
      }
      options = { prototype: proto };
    }
    return original.call(this, tag, options);
  }
})();

var replaceEmoji = function(node) {
  var emojis = node.querySelectorAll('img.emoji');
  for (var k = 0; k < emojis.length; ++k) {
    if (emojis[k].parentElement.tagName === 'G-EMOJI') {
      continue;
    }
    emojis[k].src = emojis[k].src.replace(
      'https://assets-cdn.github.com/images/icons/emoji/unicode/',
      'https://raw.githubusercontent.com/twitter/twemoji/gh-pages/36x36/');
  }
}

window.onload = function() {
  // Handle systems where emoji support is available (OS X)
  if (window.GEmojiElement === undefined) {
    window.GEmojiElement = document.registerElement('g-emoji');
  }
  
  // Handle emojis that don't use the <g-emoji/> element yet
  var obs = new MutationObserver(function(records) {
    for (var i = 0; i < records.length; ++i) {
      var nodes = (records[i].addedNodes && records[i].addedNodes.length > 0 ?
        records[i].addedNodes : [records[i].target]);

      for (var j = 0; j < nodes.length; ++j) {
        replaceEmoji(nodes[j]);
      }
    }
  });
  
  var allPjaxes = document.querySelectorAll('div[data-pjax-container]');
  for (var i = 0; i < allPjaxes.length; ++i) {
    obs.observe(allPjaxes[i], {childList: true});
  }
  
  // Handle basic emoji on initial page
  replaceEmoji(document);
}