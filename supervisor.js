/* Admiral House – page superviseur (lecture seule)
   S'appuie sur les outils exposés par app.js (window.AMCARI). */
(() => {
'use strict';
const A = window.AMCARI;
const $root = document.getElementById('sup');
const { db, esc, fmtTime, fmtDate, fmtDateTime, describe, agentName } = A;

const APP_FR = {
  'type.event': 'Rapport d’événement', 'type.anomaly': 'Anomalie de ronde', 'type.incident': 'Rapport d’incident',
  'photo.alt': 'Photo jointe', 'entry.authorisedBy': 'Autorisé par {name}', 'entry.idChecked': 'Pièce d’identité vérifiée',
  'pdf.readyTitle': 'PDF prêt', 'pdf.share': 'Envoyer / partager (WhatsApp, e-mail…)', 'pdf.save': 'Enregistrer sur l’appareil',

  'btn.patrol': 'Démarrer une ronde', 'btn.arrival': 'Registre des entrées', 'btn.departure': 'Registre des sorties',
  'btn.delivery': 'Livraison', 'btn.event': 'Rapport d’événement', 'btn.incident': 'Rapport d’incident',
  'btn.anomaly': 'Signaler une anomalie', 'btn.correction': 'Rectification',
  'type.event': 'Rapport d’événement', 'type.anomaly': 'Anomalie de ronde',
  'patrol.title': 'Ronde en cours', 'patrol.since': 'commencée à {time}', 'patrol.elapsed': '(depuis {n} min)',
  'patrol.report': 'Signaler une anomalie', 'patrol.anomalies': 'Anomalies signalées ({n})',
  'patrol.none': 'Aucune anomalie pour l’instant. Terminez la ronde quand vous avez fait le tour.',
  'patrol.end': 'Fin de ronde', 'patrol.confirm': 'Terminer la ronde',
  'patrol.summary': '{n} anomalie(s) signalée(s) pendant cette ronde.', 'patrol.summaryOk': 'Aucune anomalie signalée : la ronde sera enregistrée « RAS ».',
  'photo.add': 'Ajouter une photo', 'photo.id': 'Photo de la pièce d’identité', 'photo.remove': 'Retirer la photo', 'photo.alt': 'Photo jointe',
  'photo.uploadError': 'L’envoi d’une photo a échoué. Vérifiez la connexion et réessayez.',
  'form.location': 'Localisation', 'form.subject': 'Type d’événement (facultatif)', 'form.comment': 'Commentaire (facultatif)',
  'reg.search': 'Rechercher un nom', 'reg.selectAll': 'Tout cocher', 'reg.unselectAll': 'Tout décocher',
  'reg.selected': '{n} personne(s) sélectionnée(s)', 'reg.addUnlisted': '+ Personne non listée', 'reg.unlisted': 'Personne non listée',
  'reg.unlistedName': 'Nom et prénom', 'reg.remove': 'Retirer', 'reg.noneSelected': 'Cochez au moins une personne.',
  'reg.emptyCategory': 'Personne dans cette catégorie.', 'reg.needApproval': 'Accord à obtenir pour : {names}',
  'reg.idCheckedGroup': 'Pièces d’identité originales vérifiées pour ces personnes', 'reg.save': 'Enregistrer ({n})',
  'pdf.photos': 'Photos', 'pdf.photosRef': '{n} photo(s) en annexe',
  'pdf.download': 'Télécharger le PDF', 'pdf.preparing': 'Préparation du PDF…',
  'pdf.unavailable': 'Le générateur PDF n’a pas pu se charger (vérifiez la connexion). La fenêtre d’impression va s’ouvrir : choisissez « Enregistrer en PDF ».',
  'pdf.generated': 'Généré le {date}', 'pdf.signature': 'Signature de l’agent',
  'pdf.locked': 'Entrées horodatées, non modifiables et non supprimables.', 'pdf.noEntries': 'Aucune entrée.',
  'pdf.page': 'Page {n} / {total}',
  'closed.title': 'Service clôturé', 'closed.body': 'Votre main courante est enregistrée. Téléchargez-la en PDF pour la transmettre.',
  'closed.new': 'Nouvelle prise de service',
  'start.firstName': 'Prénom', 'start.lastName': 'Nom',
  'start.nameRequired': 'Indiquez votre prénom et votre nom.',
  'start.openShifts': 'Service déjà ouvert sur ce site',
  'start.resume': 'Reprendre le service de {name} (depuis {time})',
  'access.authorised': 'Personne autorisée : identité déjà vérifiée. Ne pas redemander, photographier ni conserver sa pièce d’identité.',
  'access.pending': 'Accès pas encore validé : appelez un contact pour obtenir son accord avant l’entrée.',
  'access.unknown': 'Personne non enregistrée : vérifiez sa pièce d’identité et obtenez l’accord d’un contact avant l’entrée.',
  'access.refused': 'Accès refusé : ne laissez pas entrer cette personne. Notez un incident si elle insiste.',
  'access.authorisedBy': 'Accès autorisé par',
  'access.idChecked': 'Pièce d’identité originale vérifiée face à la personne',
  'access.idAlready': 'Identité déjà vérifiée lors d’une arrivée précédente ({date}).',
  'access.authRequired': 'Indiquez qui a autorisé l’accès.',
  'access.idRequired': 'Vérifiez la pièce d’identité originale avant de laisser entrer.',
  'access.pendingTag': 'à autoriser', 'access.refusedTag': 'refusé',
  'entry.authorisedBy': 'Autorisé par {name}', 'entry.idChecked': 'Pièce d’identité vérifiée',
  'common.wait': 'Un instant…', 'common.cancel': 'Annuler', 'common.save': 'Enregistrer',
  'common.back': 'Retour', 'common.print': 'Imprimer', 'common.close': 'Fermer',
  'setup.html': 'Ouvrez le fichier config.js et renseignez l’URL et la clé « anon » de votre projet Supabase (Project Settings, puis API).',
  'setup.title': 'Configuration manquante',
  'setup.body': 'Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY (fichier .env en local, variables d’environnement sur Netlify). Voir le README.',
  'login.subtitle': 'Main courante électronique', 'login.email': 'E-mail', 'login.password': 'Mot de passe',
  'login.submit': 'Se connecter', 'login.error': 'E-mail ou mot de passe incorrect.',
  'blocked': 'Ce compte est désactivé. Contactez votre responsable.',
  'nav.log': 'Main courante', 'nav.history': 'Historique', 'nav.logout': 'Déconnexion',
  'start.title': 'Prise de service', 'start.site': 'Site', 'start.chooseSite': 'Choisir un site',
  'start.noSite': 'Aucun site n’est encore configuré. Demandez à votre responsable de l’ajouter.',
  'start.standing': 'Consignes permanentes', 'start.previous': 'Relève précédente',
  'start.previousBy': 'Service clôturé par {name}, le {time}. Ses consignes sont reprises ci-dessous.',
  'start.noPrevious': 'Aucun service précédent sur ce site.',
  'start.instructions': 'Consignes reçues',
  'start.instructionsPh': 'Consignes transmises par l’agent précédent ou le superviseur',
  'start.submit': 'Prendre mon service',
  'shift.since': 'En service depuis {time}', 'shift.instructions': 'Consignes reçues',
  'shift.patrolLive': 'Ronde en cours depuis {time}', 'shift.patrolEnd': 'Terminer la ronde',
  'shift.onSite': 'Sur site ({n})', 'shift.nobody': 'Personne n’est enregistré sur site.',
  'shift.log': 'Main courante',
  'shift.empty': 'Aucune entrée pour l’instant. Utilisez les boutons ci-dessus pour noter chaque événement au moment où il se produit.',
  'shift.sos': 'Numéros d’urgence', 'shift.end': 'Fin de service',
  'type.patrol': 'Ronde', 'type.arrival': 'Arrivée', 'type.departure': 'Départ', 'type.delivery': 'Livraison',
  'type.task': 'Tâche', 'type.gate': 'Portail', 'type.note': 'Note',
  'type.correction': 'Rectification',
  'cat.staff': 'Personnel', 'cat.family': 'Famille', 'cat.visitor': 'Visiteur', 'cat.contractor': 'Prestataire', 'cat.other': 'Autre',
  'patrol.full': 'complète', 'patrol.ok': 'RAS', 'patrol.anomaly': 'anomalie',
  'desc.patrol': 'Ronde {where} : {result}', 'desc.patrolLive': 'Ronde {where} en cours',
  'desc.arrival': 'Arrivée de {name}', 'desc.departure': 'Départ de {name}', 'desc.delivery': 'Livraison {name}',
  'gate.open': 'Ouverture du portail', 'gate.close': 'Fermeture du portail',
  'entry.correct': 'Rectifier', 'entry.correcting': 'Rectifie l’entrée de {time}', 'entry.late': 'Saisie à {time}',
  'form.present': 'Présents sur site', 'form.category': 'Catégorie', 'form.person': 'Personne',
  'form.choose': 'Choisir…', 'form.otherPerson': 'Autre personne…', 'form.name': 'Nom',
  'form.addToRegistry': 'Ajouter au registre du site', 'form.zone': 'Zone ou maison', 'form.anyZone': 'Non précisée',
  'form.time': 'Heure', 'form.desc': 'Détails', 'form.company': 'Société ou livreur', 'form.task': 'Tâche réalisée',
  'form.otherTask': 'Autre tâche', 'form.gateAction': 'Action',
  'form.nameRequired': 'Indiquez le nom de la personne.', 'form.descRequired': 'Décrivez ce qui s’est passé.',
  'form.taskRequired': 'Indiquez la tâche réalisée.',
  'form.correctionHelp': 'Une entrée enregistrée ne peut pas être modifiée. Écrivez ici la rectification : elle sera liée à l’entrée de {time}.',
  'patrolClose.title': 'Fin de ronde', 'patrolClose.result': 'Résultat', 'patrolClose.zone': 'Ronde effectuée sur',
  'patrolClose.full': 'Tout le site', 'patrolClose.descRequired': 'Décrivez l’anomalie constatée.',
  'end.title': 'Fin de service', 'end.checklist': 'Avant de partir', 'end.notes': 'Consignes pour la relève',
  'end.notesPh': 'Ce que l’agent suivant doit savoir',
  'end.justify': 'Un point n’est pas coché : expliquez pourquoi dans les consignes pour la relève.',
  'end.patrolOpen': 'Terminez la ronde en cours avant de clôturer votre service.', 'end.submit': 'Clôturer mon service',
  'sos.title': 'Numéros d’urgence', 'sos.none': 'Aucun numéro configuré pour ce site.',
  'history.title': 'Historique des services', 'history.open': 'En cours', 'history.empty': 'Aucun service enregistré.',
  'report.title': 'Main courante', 'report.date': 'Date', 'report.site': 'Site', 'report.agent': 'Agent',
  'report.empNo': 'Matricule', 'report.start': 'Début', 'report.end': 'Fin',
  'report.instructions': 'Consignes reçues', 'report.handover': 'Consignes pour la relève',
  'report.checklist': 'Contrôles de fin de service', 'report.time': 'Heure', 'report.event': 'Événement',
  'report.details': 'Détails', 'report.yes': 'Fait', 'report.no': 'Non fait', 'report.none': 'Aucune',
};

// Textes de la page superviseur (français par défaut, anglais disponible)
const SUP = {
  fr: {
    title: 'Admiral House · Supervision', overview: 'Vue en direct', shifts: 'Services et mains courantes', register: 'Registre',
    live: 'En direct', loading: 'Chargement…', updated: 'Mis à jour à {time} · actualisation toutes les 30 secondes', refresh: 'Actualiser',
    kOnDuty: 'Agent(s) en service', kOnSite: 'Personnes sur site', kPatrols: 'Rondes aujourd’hui', kAlerts: 'Incidents et anomalies (7 jours)',
    onDuty: 'En service', openLog: 'Ouvrir la main courante', since: 'en service depuis {time} ({dur})', lastAct: 'dernière saisie', entries: '{n} entrées',
    patrolLive: 'Ronde en cours depuis {time}', nobody: 'Aucun agent n’est en service actuellement.',
    dotHelp: 'Pastille : verte = saisie dans la dernière heure, orange = 1 à 2 heures sans saisie, rouge = plus de 2 heures.',
    alerts7: 'Incidents et anomalies · 7 derniers jours', guard: 'Agent', photos: '{n} photo(s)', noAlert: 'Rien de signalé ces 7 derniers jours.',
    onSite: 'Sur site maintenant ({n})', sinceShort: 'depuis {time}', nobodySite: 'Personne n’est enregistré sur site.',
    onSiteHelp: 'D’après les entrées et sorties saisies par les agents ces dernières 24 heures.',
    shiftsHelp: 'Ouvrez un service pour lire la main courante complète, voir les photos ou télécharger le PDF (en anglais).',
    from: 'Du', to: 'Au', onlyAlerts: 'Seulement les services avec incidents ou anomalies',
    thDate: 'Date', thGuard: 'Agent', thSite: 'Site', thTime: 'Horaire', thDur: 'Durée', thPatrols: 'Rondes', thMoves: 'Entrées / sorties',
    thAlerts: 'Alertes', thStatus: 'Statut', stOpen: 'En service', stClosed: 'Clôturé', noShift: 'Aucun service sur cette période.',
    dSite: 'Site', dStart: 'Début', dEnd: 'Fin', dDur: 'Durée', dEntries: 'Entrées', dAlerts: '{n} alerte(s)', pdf: 'Télécharger le PDF',
    instr: 'Consignes reçues', logTitle: 'Main courante (plus récent en haut)', handover: 'Consignes pour la relève', done: 'Fait', notDone: 'Non fait',
    regHelp: '{n} personnes · {p} en attente d’autorisation. Les statuts se modifient dans Supabase (table « people »).',
    rName: 'Nom', rCat: 'Catégorie', rRole: 'Fonction', rStatus: 'Statut', rNotes: 'Notes',
    sAuth: 'Autorisé', sPend: 'À autoriser', sRef: 'Refusé',
    justNow: 'à l’instant', minAgo: 'il y a {n} min', hAgo: 'il y a {h} h {m}', min: '{n} min', hours: '{h} h {m}',
    configMissing: 'Configuration manquante', fillConfig: 'Renseignez config.js.',
  },
  en: {
    title: 'Admiral House · Supervisor', overview: 'Live overview', shifts: 'Shifts & logs', register: 'Register',
    live: 'Live', loading: 'Loading…', updated: 'Updated {time} · refreshes every 30 seconds', refresh: 'Refresh now',
    kOnDuty: 'Guard(s) on duty', kOnSite: 'People on site', kPatrols: 'Patrols today', kAlerts: 'Incidents & anomalies (7 days)',
    onDuty: 'On duty', openLog: 'Open live log', since: 'on duty since {time} ({dur})', lastAct: 'last activity', entries: '{n} entries',
    patrolLive: 'Patrol in progress since {time}', nobody: 'No guard is on duty right now.',
    dotHelp: 'Dot: green = activity in the last hour, amber = 1 to 2 hours without an entry, red = more than 2 hours.',
    alerts7: 'Incidents & anomalies · last 7 days', guard: 'Guard', photos: '{n} photo(s)', noAlert: 'Nothing reported in the last 7 days.',
    onSite: 'On site now ({n})', sinceShort: 'since {time}', nobodySite: 'Nobody is logged on site.',
    onSiteHelp: 'Based on entries and exits logged by the guards in the last 24 hours.',
    shiftsHelp: 'Open a shift to read the full log, see the photos or download the PDF.',
    from: 'From', to: 'To', onlyAlerts: 'Only shifts with incidents or anomalies',
    thDate: 'Date', thGuard: 'Guard', thSite: 'Site', thTime: 'Time', thDur: 'Duration', thPatrols: 'Patrols', thMoves: 'In / out',
    thAlerts: 'Alerts', thStatus: 'Status', stOpen: 'On duty', stClosed: 'Closed', noShift: 'No shift for this period.',
    dSite: 'Site', dStart: 'Start', dEnd: 'End', dDur: 'Duration', dEntries: 'Entries', dAlerts: '{n} alert(s)', pdf: 'Download PDF',
    instr: 'Instructions received', logTitle: 'Log (latest first)', handover: 'Handover notes', done: 'Done', notDone: 'Not done',
    regHelp: '{n} people · {p} waiting for approval. Status changes are made in Supabase (table “people”).',
    rName: 'Name', rCat: 'Category', rRole: 'Role', rStatus: 'Status', rNotes: 'Notes',
    sAuth: 'Authorised', sPend: 'To approve', sRef: 'Refused',
    justNow: 'just now', minAgo: '{n} min ago', hAgo: '{h} h {m} ago', min: '{n} min', hours: '{h} h {m}',
    configMissing: 'Configuration missing', fillConfig: 'Fill in config.js.',
  },
};
let supLang = (() => { try { return localStorage.getItem('amcari-sup-lang'); } catch { return null; } })();
if (!SUP[supLang]) supLang = 'fr';
function applyLang() { A.useLang(supLang, supLang === 'fr' ? APP_FR : null); document.title = SUP[supLang].title; }
function L(k, vars) {
  let x = SUP[supLang][k] ?? SUP.en[k] ?? k;
  if (vars) for (const [a, b] of Object.entries(vars)) x = x.split(`{${a}}`).join(b);
  return x;
}

const REFRESH_MS = 30000;
const ALERT_TYPES = ['incident', 'anomaly'];
let tab = 'overview';
let timer = null;
let lastRefresh = null;

const pad = (n) => String(n).padStart(2, '0');
const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
function duration(from, to) {
  const m = Math.max(0, Math.round(((to ? new Date(to) : new Date()) - new Date(from)) / 60000));
  return m < 60 ? L('min', { n: m }) : L('hours', { h: Math.floor(m / 60), m: pad(m % 60) });
}
function ago(d) {
  const m = Math.round((Date.now() - new Date(d)) / 60000);
  if (m < 1) return L('justNow');
  if (m < 60) return L('minAgo', { n: m });
  return L('hAgo', { h: Math.floor(m / 60), m: pad(m % 60) });
}
const isAlert = (e) => ALERT_TYPES.includes(e.type);

/* ---------- Structure ---------- */
function shell() {
  $root.innerHTML = `<div class="app">
    <header class="topbar"><span class="brand">${esc(L('title'))}</span>
      <nav class="tabs">
        ${[['overview', L('overview')], ['shifts', L('shifts')], ['register', L('register')]].map(([k, l]) =>
          `<button data-tab="${k}" ${tab === k ? 'aria-current="page"' : ''}>${l}</button>`).join('')}
      </nav>
      <div class="topbar-end"><span class="live" id="live">${L('live')}</span>
        <div class="lang" role="group" aria-label="Langue / Language">${['fr', 'en'].map((l) =>
          `<button type="button" data-lang="${l}" aria-pressed="${supLang === l}">${l.toUpperCase()}</button>`).join('')}</div></div>
    </header>
    <main class="content" id="main"></main></div>`;
  $root.querySelectorAll('[data-tab]').forEach((b) => { b.onclick = () => { tab = b.dataset.tab; go(); }; });
  $root.querySelectorAll('[data-lang]').forEach((b) => {
    b.onclick = () => {
      supLang = b.dataset.lang;
      try { localStorage.setItem('amcari-sup-lang', supLang); } catch { /* ignore */ }
      applyLang();
      go();
    };
  });
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
  if (!quiet) main.innerHTML = `<p class="muted">${L('loading')}</p>`;
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
      <span class="dot ${cls}" title="${esc(L('lastAct'))} ${esc(ago(last))}"></span>
      <h3>${esc(agentName(s))}</h3>
      <button class="btn" data-open="${s.id}">${L('openLog')}</button>
      <p class="meta">${esc(s.sites?.name || '')} · ${esc(L('since', { time: fmtTime(s.started_at), dur: duration(s.started_at) }))} ·
        ${L('lastAct')} <b>${esc(ago(last))}</b> · ${L('entries', { n: mine.length })}
        ${patrol ? `<span class="tag patrol">${esc(L('patrolLive', { time: fmtTime(patrol.occurred_at) }))}</span>` : ''}</p>
    </div>`;
  }).join('') : `<div class="empty-duty"><span class="dot bad"></span>${L('nobody')}</div>`;

  main.innerHTML = `
    <div class="sup-head"><div><h1 class="h-page">${L('overview')}</h1>
      <p class="muted">${L('updated', { time: fmtTime(lastRefresh) })}</p></div>
      <div class="refresh"><button class="btn" id="refresh">${L('refresh')}</button></div></div>
    <div class="kpis">
      <div class="kpi" style="--tone:var(--ok)"><strong>${openShifts.length}</strong><span>${L('kOnDuty')}</span></div>
      <div class="kpi" style="--tone:var(--in)"><strong>${presence.length}</strong><span>${L('kOnSite')}</span></div>
      <div class="kpi" style="--tone:var(--signal)"><strong>${(patrols.data || []).length}</strong><span>${L('kPatrols')}</span></div>
      <div class="kpi" style="--tone:var(--alert)"><strong>${alertList.length}</strong><span>${L('kAlerts')}</span></div>
    </div>
    <div class="cols">
      <div>
        <section class="card"><h2 class="h-section">${L('onDuty')}</h2>${dutyHtml}
          <p class="muted small" style="margin:.8rem 0 0">${L('dotHelp')}</p></section>
        <section class="card"><h2 class="h-section">${L('alerts7')}</h2>
          ${alertList.length ? `<ul class="alerts">${alertList.map((e) => `<li data-shift="${e.shift_id}">
            <span class="when">${esc(fmtDate(e.occurred_at))} ${fmtTime(e.occurred_at)}</span>
            <p class="what">${esc(describe(e))}</p>
            ${e.description ? `<p>${esc(e.description)}</p>` : ''}
            <p class="muted small">${L('guard')} : ${esc(agentName(e.shifts))}${(e.photos || []).length ? ` · ${L('photos', { n: e.photos.length })}` : ''}</p>
            ${(e.photos || []).length ? `<div class="thumbs" data-photos="${esc(JSON.stringify(e.photos))}"></div>` : ''}
          </li>`).join('')}</ul>` : `<p class="muted">${L('noAlert')}</p>`}
        </section>
      </div>
      <section class="card"><h2 class="h-section">${L('onSite', { n: presence.length })}</h2>
        ${presence.length ? `<ul class="chips">${presence.map((p) =>
          `<li><span>${esc(p.name)}</span><small>${esc(A.t(`cat.${p.category || 'other'}`))}, ${esc(L('sinceShort', { time: fmtTime(p.since) }))}</small></li>`).join('')}</ul>`
          : `<p class="muted">${L('nobodySite')}</p>`}
        <p class="muted small" style="margin:.8rem 0 0">${L('onSiteHelp')}</p>
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
  main.innerHTML = `<div class="sup-head"><div><h1 class="h-page">${L('shifts')}</h1>
      <p class="muted">${L('shiftsHelp')}</p></div></div>
    <div class="filters">
      <label>${L('from')}<input type="date" id="from" value="${isoDay(from)}"></label>
      <label>${L('to')}<input type="date" id="to" value="${isoDay(to)}"></label>
      <label class="check" style="min-width:auto"><input type="checkbox" id="onlyAlerts">${L('onlyAlerts')}</label>
    </div>
    <div id="list"><p class="muted">${L('loading')}</p></div>`;
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
      <thead><tr><th>${L('thDate')}</th><th>${L('thGuard')}</th><th class="hide-sm">${L('thSite')}</th><th>${L('thTime')}</th><th class="hide-sm">${L('thDur')}</th>
        <th class="hide-sm">${L('thPatrols')}</th><th class="hide-sm">${L('thMoves')}</th><th>${L('thAlerts')}</th><th>${L('thStatus')}</th><th></th></tr></thead>
      <tbody>${rows.map(({ s, st }) => `<tr class="click" data-id="${s.id}">
        <td class="num">${esc(fmtDate(s.started_at))}</td>
        <td>${esc(agentName(s))}</td>
        <td class="hide-sm">${esc(s.sites?.name || '')}</td>
        <td class="num">${fmtTime(s.started_at)}–${s.ended_at ? fmtTime(s.ended_at) : '…'}</td>
        <td class="hide-sm">${duration(s.started_at, s.ended_at)}</td>
        <td class="hide-sm">${st.patrols}</td>
        <td class="hide-sm">${st.moves}</td>
        <td>${st.alerts ? `<span class="tag alert">${st.alerts}</span>` : '<span class="muted">0</span>'}</td>
        <td>${s.status === 'open' ? `<span class="tag ok">${L('stOpen')}</span>` : `<span class="tag">${L('stClosed')}</span>`}</td>
        <td><button class="btn" data-pdf="${s.id}">PDF</button></td>
      </tr>`).join('')}</tbody></table></div>` : `<p class="muted">${L('noShift')}</p>`;
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
      <div><dt>${L('dSite')}</dt><dd>${esc(shift.sites?.name || '')}</dd></div>
      <div><dt>${L('dStart')}</dt><dd>${esc(fmtDateTime(shift.started_at))}</dd></div>
      <div><dt>${L('dEnd')}</dt><dd>${shift.ended_at ? esc(fmtDateTime(shift.ended_at)) : `<span class="tag ok">${L('stOpen')}</span>`}</dd></div>
      <div><dt>${L('dDur')}</dt><dd>${duration(shift.started_at, shift.ended_at)}</dd></div>
      <div><dt>${L('dEntries')}</dt><dd>${entries.length} (${L('dAlerts', { n: entries.filter(isAlert).length })})</dd></div>
    </dl>
    <div class="row-end" style="margin-bottom:1rem"><button class="btn primary" id="dpdf">${L('pdf')}</button></div>
    ${shift.instructions_received ? `<div class="note-block" style="margin-bottom:1rem"><h3 class="h-small">${L('instr')}</h3><p class="pre">${esc(shift.instructions_received)}</p></div>` : ''}
    <h3 class="h-section">${L('logTitle')}</h3>
    ${A.timelineHtml(entries, false)}
    ${shift.handover_notes ? `<div class="note-block" style="margin-top:1rem"><h3 class="h-small">${L('handover')}</h3><p class="pre">${esc(shift.handover_notes)}</p></div>` : ''}
    ${checks.length ? `<p class="small" style="margin-top:.8rem">${checks.map(([k, v]) => `${esc(k)} : <b>${v ? L('done') : L('notDone')}</b>`).join(' · ')}</p>` : ''}`);
  el.classList.add('wide');
  el.querySelector('#dpdf').onclick = (ev) => A.exportShiftPdf(id, ev.currentTarget);
  A.hydratePhotos(el);
}

/* ---------- Registre des personnes ---------- */
async function register(main) {
  main.innerHTML = `<p class="muted">${L('loading')}</p>`;
  const { data, error } = await db.from('people').select('*, sites(*)').eq('active', true).order('category').order('full_name');
  if (error) { main.innerHTML = `<p class="error">${esc(error.message)}</p>`; return; }
  const people = data || [];
  const pending = people.filter((p) => p.access_status === 'pending').length;
  const label = { authorised: `<span class="tag ok">${L('sAuth')}</span>`, pending: `<span class="tag pending">${L('sPend')}</span>`, refused: `<span class="tag alert">${L('sRef')}</span>` };
  main.innerHTML = `<div class="sup-head"><div><h1 class="h-page">${L('register')}</h1>
      <p class="muted">${esc(L('regHelp', { n: people.length, p: pending }))}</p></div></div>
    <div class="table-wrap"><table class="data"><thead><tr><th>${L('rName')}</th><th>${L('rCat')}</th><th class="hide-sm">${L('rRole')}</th><th>${L('rStatus')}</th><th class="hide-sm">${L('rNotes')}</th></tr></thead>
    <tbody>${people.map((p) => `<tr><td><b>${esc(p.full_name)}</b></td><td>${esc(A.t(`cat.${p.category}`))}</td>
      <td class="hide-sm">${esc(A.roleText(p.sites, p.role) || '')}</td><td>${label[p.access_status] || ''}</td>
      <td class="hide-sm muted">${esc(p.notes || '')}</td></tr>`).join('')}</tbody></table></div>`;
}

/* ---------- Lancement ---------- */
if (!db) {
  $root.innerHTML = `<div class="login"><div class="login-card"><h1 class="h-card">${L('configMissing')}</h1><p class="muted">${L('fillConfig')}</p></div></div>`;
} else {
  applyLang();
  go();
}
})();
