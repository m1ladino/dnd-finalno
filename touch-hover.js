(function () {
  if (window.__dndTouch) return; window.__dndTouch = 1;
  var P = 'html:not(.dnd-touch) ';
  var fix = function (sel) { return sel.split(',').map(function (s) { return s.indexOf(':hover') > -1 && s.indexOf('dnd-touch') < 0 ? P + s.trim() : s; }).join(','); };
  var walk = function (rules) { for (var i = 0; i < rules.length; i++) { var r = rules[i]; if (r.selectorText && r.selectorText.indexOf(':hover') > -1 && r.selectorText.indexOf('dnd-touch') < 0) { try { r.selectorText = fix(r.selectorText); } catch (e) {} } else if (r.cssRules) walk(r.cssRules); } };
  var all = function () { for (var i = 0; i < document.styleSheets.length; i++) { try { walk(document.styleSheets[i].cssRules); } catch (e) {} } };
  var ins = CSSStyleSheet.prototype.insertRule;
  CSSStyleSheet.prototype.insertRule = function (rule, idx) { if (typeof rule === 'string' && rule.indexOf(':hover') > -1 && rule.indexOf('dnd-touch') < 0) { var b = rule.indexOf('{'); if (b > 0) rule = fix(rule.slice(0, b)) + rule.slice(b); } return ins.call(this, rule, idx); };
  var set = function () { document.documentElement.classList.toggle('dnd-touch', window.innerWidth < 768); };
  set(); window.addEventListener('resize', set);
  var st = document.createElement('style');
  st.textContent = 'html.dnd-touch button{-webkit-tap-highlight-color:transparent;touch-action:manipulation}html.dnd-touch button:not(:disabled){transition:transform .14s cubic-bezier(.2,.7,.2,1)}html.dnd-touch button:not(:disabled):active{transform:scale(.97)}.sc-placeholder{border:0!important;outline:0!important;background:transparent!important;box-shadow:none!important}.sc-placeholder::before,.sc-placeholder::after{content:none!important;animation:none!important}';
  document.head.appendChild(st);
  all(); new MutationObserver(all).observe(document.head, { childList: true, subtree: true, characterData: true });
})();
