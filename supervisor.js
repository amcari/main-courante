/* Admiral House – page superviseur (lecture seule)
   S'appuie sur les outils exposés par app.js (window.AMCARI). */
(() => {
'use strict';
const A = window.AMCARI;
const $root = document.getElementById('sup');
const { db, esc, fmtTime, fmtDate, fmtDateTime, describe, agentName } = A;

const REFRESH_MS = 30000;
const ALERT_TYPES = ['incident', 'anomaly'];
let tab = 'overview';
let timer = null;
let lastRefresh = null;

const pad = (n) => String(n).padStart(2, '0');
const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
function duration(from, to) {
  const m = Math.max(0, Math.round(((to ? new Date(to) : new Date()) - new Date(from)) / 60000));
  return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${pad(m % 60)}`;
}
function ago(d) {
  const m = Math.round((Date.now() - new Date(d)) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  return `${Math.floor(m / 60)} h ${pad(m % 60)} ago`;
}
const isAlert = (e) => ALERT_TYPES.includes(e.type);

/* ---------- Structure ---------- */
function shell() {
  $root.innerHTML = `<div class="app">
    <header class="topbar"><span class="brand">Admiral House · Supervisor</span>
      <nav class="tabs">
        ${[['overview', 'Live overview'], ['shifts', 'Shifts & logs'], ['register', 'Register']].map(([k, l]) =>
          `<button data-tab="${k}" ${tab === k ? 'aria-current="page"' : ''}>${l}</button>`).join('')}
      </nav>
      <div class="topbar-end"><span class="live" id="live">Live</span></div>
    </header>
    <main class="content" id="main"></main></div>`;
  $root.querySelectorAll('[data-tab]').forEach((b) => { b.onclick = () => { tab = b.dataset.tab; go(); }; });
}

function go() {
  shell();
  clearInterval(timer);
  const main = document.getElementById('main');
  if (tab === 'overview') {
    overview(main);
    timer = setInterval(() => overview(main, true), REFRESH_MS);
  } else if (tab === 'shifts') {
    shifts(main);
  } else {
    register(main);
  }
}

/* ---------- Vue d'ensemble en direct ---------- */
async function overview(main, quiet) {
  if (!quiet) main.innerHTML = '<p class="muted">Loading…</p>';
  const since7 = new Date(Date.now() - 7 * 24 * 3600e3).toISOString();
  const since24 = new Date(Date.now() - 24 * 3600e3).toISOString();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [open, alerts, moves, patrols] = await Promise.all([
    db.from('shifts').select('*, sites(name)').eq('status', 'open').order('started_at'),
    db.from('log_entries').select('*, shifts(agent_first_name, agent_last_name), sites(name)')
      .gte('occurred_at', since7).in('type', ['incident', 'anomaly', 'patrol']).order('occurred_at', { ascending: false }),
    db.from('log_entries').select('type, person_id, person_name, person_category, occurred_at, created_at')
      .in('type', ['arrival', 'departure']).gte('occurred_at', since24).order('occurred_at'),
    db.from('log_entries').select('id').eq('type', 'patrol').gte('occurred_at', today.toISOString()),
  ]);
  const err = open.error || alerts.error || moves.error;
  if (err) { main.innerHTML = `<p class="error">${esc(err.message)}</p>`; return; }

  const openShifts = open.data || [];
  // Dernière activité et ronde en cours pour chaque service ouvert
  const ids = openShifts.map((s) => s.id);
  let shiftEntries = [];
  if (ids.length) {
    const r = await db.from('log_entries').select('shift_id, type, ended_at, occurred_at, created_at').in('shift_id', ids);
    shiftEntries = r.data || [];
  }
  const alertList = (alerts.data || []).filter(isAlert);
  const presence = A.computePresence(moves.data || []);
  lastRefresh = new Date();

  const dutyHtml = openShifts.length ? openShifts.map((s) => {
    const mine = shiftEntries.filter((e) => e.shift_id === s.id);
    const last = mine.reduce((m, e) => (e.created_at > m ? e.created_at : m), s.started_at);
    const idle = (Date.now() - new Date(last)) / 60000;
    const cls = idle > 120 ? 'bad' : idle > 60 ? 'warn' : '';
    const patrol = mine.find((e) => e.type === 'patrol' && !e.ended_at);
    return `<div class="duty">
      <span class="dot ${cls}" title="Last activity ${esc(ago(last))}"></span>
      <h3>${esc(agentName(s))}</h3>
      <button class="btn" data-open="${s.id}">Open live log</button>
      <p class="meta">${esc(s.sites?.name || '')} · on duty since ${fmtTime(s.started_at)} (${duration(s.started_at)}) ·
        last activity <b>${esc(ago(last))}</b> · ${mine.length} entries
        ${patrol ? `<span class="tag patrol">Patrol in progress since ${fmtTime(patrol.occurred_at)}</span>` : ''}</p>
    </div>`;
  }).join('') : `<div class="empty-duty"><span class="dot bad"></span>No guard is on duty right now.</div>`;

  main.innerHTML = `
    <div class="sup-head"><div><h1 class="h-page">Live overview</h1>
      <p class="muted">Updated ${fmtTime(lastRefresh)} · refreshes every 30 seconds</p></div>
      <div class="refresh"><button class="btn" id="refresh">Refresh now</button></div></div>
    <div class="kpis">
      <div class="kpi" style="--tone:var(--ok)"><strong>${openShifts.length}</strong><span>Guard(s) on duty</span></div>
      <div class="kpi" style="--tone:var(--in)"><strong>${presence.length}</strong><span>People on site</span></div>
      <div class="kpi" style="--tone:var(--signal)"><strong>${(patrols.data || []).length}</strong><span>Patrols today</span></div>
      <div class="kpi" style="--tone:var(--alert)"><strong>${alertList.length}</strong><span>Incidents & anomalies (7 days)</span></div>
    </div>
    <div class="cols">
      <div>
        <section class="card"><h2 class="h-section">On duty</h2>${dutyHtml}
          <p class="muted small" style="margin:.8rem 0 0">Dot: green = activity in the last hour, amber = 1 to 2 hours without an entry, red = more than 2 hours.</p></section>
        <section class="card"><h2 class="h-section">Incidents & anomalies · last 7 days</h2>
          ${alertList.length ? `<ul class="alerts">${alertList.map((e) => `<li data-shift="${e.shift_id}">
            <span class="when">${esc(fmtDate(e.occurred_at))} ${fmtTime(e.occurred_at)}</span>
            <p class="what">${esc(describe(e))}</p>
            ${e.description ? `<p>${esc(e.description)}</p>` : ''}
            <p class="muted small">Guard: ${esc(agentName(e.shifts))}${(e.photos || []).length ? ` · ${e.photos.length} photo(s)` : ''}</p>
            ${(e.photos || []).length ? `<div class="thumbs" data-photos="${esc(JSON.stringify(e.photos))}"></div>` : ''}
          </li>`).join('')}</ul>` : '<p class="muted">Nothing reported in the last 7 days.</p>'}
        </section>
      </div>
      <section class="card"><h2 class="h-section">On site now (${presence.length})</h2>
        ${presence.length ? `<ul class="chips">${presence.map((p) =>
          `<li><span>${esc(p.name)}</span><small>${esc(A.t(`cat.${p.category || 'other'}`))}, since ${fmtTime(p.since)}</small></li>`).join('')}</ul>`
          : '<p class="muted">Nobody is logged on site.</p>'}
        <p class="muted small" style="margin:.8rem 0 0">Based on entries and exits logged by the guards in the last 24 hours.</p>
      </section>
    </div>`;
  main.querySelector('#refresh').onclick = () => overview(main, true);
  main.querySelectorAll('[data-open]').forEach((b) => { b.onclick = () => shiftDetail(b.dataset.open); });
  main.querySelectorAll('[data-shift]').forEach((li) => { li.onclick = (ev) => { if (!ev.target.closest('a')) shiftDetail(li.dataset.shift); }; });
  A.hydratePhotos(main);
}

/* ---------- Historique des services ---------- */
async function shifts(main) {
  const to = new Date();
  const from = new Date(Date.now() - 14 * 24 * 3600e3);
  main.innerHTML = `<div class="sup-head"><div><h1 class="h-page">Shifts & logs</h1>
      <p class="muted">Open a shift to read the full log, see the photos or download the PDF.</p></div></div>
    <div class="filters">
      <label>From<input type="date" id="from" value="${isoDay(from)}"></label>
      <label>To<input type="date" id="to" value="${isoDay(to)}"></label>
      <label class="check" style="min-width:auto"><input type="checkbox" id="onlyAlerts">Only shifts with incidents or anomalies</label>
    </div>
    <div id="list"><p class="muted">Loading…</p></div>`;
  const load = async () => {
    const f = new Date(`${main.querySelector('#from').value}T00:00:00`);
    const tt = new Date(`${main.querySelector('#to').value}T23:59:59`);
    const { data, error } = await db.from('shifts').select('*, sites(name)')
      .gte('started_at', f.toISOString()).lte('started_at', tt.toISOString()).order('started_at', { ascending: false });
    const list = main.querySelector('#list');
    if (error) { list.innerHTML = `<p class="error">${esc(error.message)}</p>`; return; }
    const ids = (data || []).map((s) => s.id);
    let entries = [];
    if (ids.length) {
      const r = await db.from('log_entries').select('shift_id, type, outcome').in('shift_id', ids);
      entries = r.data || [];
    }
    const stats = (id) => {
      const mine = entries.filter((e) => e.shift_id === id);
      return {
        total: mine.length,
        patrols: mine.filter((e) => e.type === 'patrol').length,
        moves: mine.filter((e) => e.type === 'arrival' || e.type === 'departure').length,
        alerts: mine.filter(isAlert).length,
      };
    };
    let rows = (data || []).map((s) => ({ s, st: stats(s.id) }));
    if (main.querySelector('#onlyAlerts').checked) rows = rows.filter((r) => r.st.alerts > 0);
    list.innerHTML = rows.length ? `<div class="table-wrap"><table class="data">
      <thead><tr><th>Date</th><th>Guard</th><th class="hide-sm">Site</th><th>Time</th><th class="hide-sm">Duration</th>
        <th class="hide-sm">Patrols</th><th class="hide-sm">In / out</th><th>Alerts</th><th>Status</th><th></th></tr></thead>
      <tbody>${rows.map(({ s, st }) => `<tr class="click" data-id="${s.id}">
        <td class="num">${esc(fmtDate(s.started_at))}</td>
        <td>${esc(agentName(s))}</td>
        <td class="hide-sm">${esc(s.sites?.name || '')}</td>
        <td class="num">${fmtTime(s.started_at)}–${s.ended_at ? fmtTime(s.ended_at) : '…'}</td>
        <td class="hide-sm">${duration(s.started_at, s.ended_at)}</td>
        <td class="hide-sm">${st.patrols}</td>
        <td class="hide-sm">${st.moves}</td>
        <td>${st.alerts ? `<span class="tag alert">${st.alerts}</span>` : '<span class="muted">0</span>'}</td>
        <td>${s.status === 'open' ? '<span class="tag ok">On duty</span>' : '<span class="tag">Closed</span>'}</td>
        <td><button class="btn" data-pdf="${s.id}">PDF</button></td>
      </tr>`).join('')}</tbody></table></div>` : '<p class="muted">No shift for this period.</p>';
    list.querySelectorAll('[data-pdf]').forEach((b) => {
      b.onclick = (ev) => { ev.stopPropagation(); A.exportShiftPdf(b.dataset.pdf, b); };
    });
    list.querySelectorAll('tr[data-id]').forEach((tr) => { tr.onclick = () => shiftDetail(tr.dataset.id); });
  };
  main.querySelectorAll('#from, #to, #onlyAlerts').forEach((el) => { el.onchange = load; });
  load();
}

/* ---------- Détail d'un service ---------- */
async function shiftDetail(id) {
  const [s, e] = await Promise.all([
    db.from('shifts').select('*, sites(name)').eq('id', id).single(),
    db.from('log_entries').select('*').eq('shift_id', id).order('occurred_at', { ascending: false }).order('created_at', { ascending: false }),
  ]);
  if (!s.data) return;
  const shift = s.data;
  const entries = e.data || [];
  const checks = Object.entries(shift.checklist || {});
  const { el } = A.openModal(`${agentName(shift)} · ${fmtDate(shift.started_at)}`, `
    <dl class="detail-meta">
      <div><dt>Site</dt><dd>${esc(shift.sites?.name || '')}</dd></div>
      <div><dt>Start</dt><dd>${esc(fmtDateTime(shift.started_at))}</dd></div>
      <div><dt>End</dt><dd>${shift.ended_at ? esc(fmtDateTime(shift.ended_at)) : '<span class="tag ok">On duty</span>'}</dd></div>
      <div><dt>Duration</dt><dd>${duration(shift.started_at, shift.ended_at)}</dd></div>
      <div><dt>Entries</dt><dd>${entries.length} (${entries.filter(isAlert).length} alert)</dd></div>
    </dl>
    <div class="row-end" style="margin-bottom:1rem"><button class="btn primary" id="dpdf">Download PDF</button></div>
    ${shift.instructions_received ? `<div class="note-block" style="margin-bottom:1rem"><h3 class="h-small">Instructions received</h3><p class="pre">${esc(shift.instructions_received)}</p></div>` : ''}
    <h3 class="h-section">Log (latest first)</h3>
    ${A.timelineHtml(entries, false)}
    ${shift.handover_notes ? `<div class="note-block" style="margin-top:1rem"><h3 class="h-small">Handover notes</h3><p class="pre">${esc(shift.handover_notes)}</p></div>` : ''}
    ${checks.length ? `<p class="small" style="margin-top:.8rem">${checks.map(([k, v]) => `${esc(k)}: <b>${v ? 'Done' : 'Not done'}</b>`).join(' · ')}</p>` : ''}`);
  el.classList.add('wide');
  el.querySelector('#dpdf').onclick = (ev) => A.exportShiftPdf(id, ev.currentTarget);
  A.hydratePhotos(el);
}

/* ---------- Registre des personnes ---------- */
async function register(main) {
  main.innerHTML = '<p class="muted">Loading…</p>';
  const { data, error } = await db.from('people').select('*, sites(*)').eq('active', true).order('category').order('full_name');
  if (error) { main.innerHTML = `<p class="error">${esc(error.message)}</p>`; return; }
  const people = data || [];
  const pending = people.filter((p) => p.access_status === 'pending').length;
  const label = { authorised: '<span class="tag ok">Authorised</span>', pending: '<span class="tag pending">To approve</span>', refused: '<span class="tag alert">Refused</span>' };
  main.innerHTML = `<div class="sup-head"><div><h1 class="h-page">Register</h1>
      <p class="muted">${people.length} people · ${pending} waiting for approval. Status changes are made in Supabase (table “people”).</p></div></div>
    <div class="table-wrap"><table class="data"><thead><tr><th>Name</th><th>Category</th><th class="hide-sm">Role</th><th>Status</th><th class="hide-sm">Notes</th></tr></thead>
    <tbody>${people.map((p) => `<tr><td><b>${esc(p.full_name)}</b></td><td>${esc(A.t(`cat.${p.category}`))}</td>
      <td class="hide-sm">${esc(A.roleText(p.sites, p.role) || '')}</td><td>${label[p.access_status] || ''}</td>
      <td class="hide-sm muted">${esc(p.notes || '')}</td></tr>`).join('')}</tbody></table></div>`;
}

/* ---------- Lancement ---------- */
if (!db) {
  $root.innerHTML = '<div class="login"><div class="login-card"><h1 class="h-card">Configuration missing</h1><p class="muted">Fill in config.js.</p></div></div>';
} else {
  go();
}
})();
