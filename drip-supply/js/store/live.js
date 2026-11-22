/* ═══════════ LIVE VIEWERS + VIEWS ═══════════ */
const VID = (() => { let v = LS('drip_vid', ''); if (!v) { v = Math.random().toString(36).slice(2) + Date.now().toString(36); LSset('drip_vid', v); } return v; })();
let liveCh = null, liveCounts = {};
function paintLive() {
  $$('[data-live]').forEach(e => e.textContent = liveCounts[e.dataset.live] || 0);
  const l = $('#pm-live'); if (l && cur) { const n = liveCounts[cur.id] || 0; l.textContent = n ? '👁 ' + n + (LANG === 'ar' ? ' يشاهدون الآن' : ' viewing now') : ''; }
}
function initLive() {
  if (!sb || liveCh) return;
  liveCh = sb.channel('drip-live', { config: { presence: { key: VID } } });
  liveCh.on('presence', { event: 'sync' }, () => {
    liveCounts = {};
    Object.values(liveCh.presenceState()).forEach(arr => { const m = arr[arr.length - 1]; if (m && m.pid) liveCounts[m.pid] = (liveCounts[m.pid] || 0) + 1; });
    paintLive();
  }).subscribe(st => { if (st === 'SUBSCRIBED') liveCh.track({ pid: null }); });
}
const trackLive = pid => { if (liveCh) liveCh.track({ pid }); };
