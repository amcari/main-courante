/* Amcari – main courante (version HTML simple, sans compilation)
   Fichiers : index.html, style.css, config.js, app.js */
(() => {
'use strict';

const fr = {
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
  'type.task': 'Tâche', 'type.gate': 'Portail', 'type.incident': 'Rapport d’incident', 'type.note': 'Note',
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

const en = {
  'btn.patrol': 'Start patrol', 'btn.arrival': 'Entry register', 'btn.departure': 'Exit register',
  'btn.delivery': 'Delivery', 'btn.event': 'Event report', 'btn.incident': 'Incident report',
  'btn.anomaly': 'Report an anomaly', 'btn.correction': 'Correction',
  'type.event': 'Event report', 'type.anomaly': 'Patrol anomaly',
  'patrol.title': 'Patrol in progress', 'patrol.since': 'started at {time}', 'patrol.elapsed': '({n} min ago)',
  'patrol.report': 'Report an anomaly', 'patrol.anomalies': 'Anomalies reported ({n})',
  'patrol.none': 'No anomalies so far. End the patrol once you have completed your round.',
  'patrol.end': 'End patrol', 'patrol.confirm': 'End the patrol',
  'patrol.summary': '{n} anomaly(ies) reported during this patrol.', 'patrol.summaryOk': 'No anomalies reported: the patrol will be logged as nothing to report.',
  'photo.add': 'Add a photo', 'photo.id': 'Photo of the ID', 'photo.remove': 'Remove photo', 'photo.alt': 'Attached photo',
  'photo.uploadError': 'A photo failed to upload. Check the connection and try again.',
  'form.location': 'Location', 'form.subject': 'Event type (optional)', 'form.comment': 'Comment (optional)',
  'reg.search': 'Search a name', 'reg.selectAll': 'Select all', 'reg.unselectAll': 'Clear all',
  'reg.selected': '{n} person(s) selected', 'reg.addUnlisted': '+ Person not on the list', 'reg.unlisted': 'Person not on the list',
  'reg.unlistedName': 'Full name', 'reg.remove': 'Remove', 'reg.noneSelected': 'Select at least one person.',
  'reg.emptyCategory': 'Nobody in this category.', 'reg.needApproval': 'Approval needed for: {names}',
  'reg.idCheckedGroup': 'Original IDs checked for these people', 'reg.save': 'Save ({n})',
  'pdf.photos': 'Photos', 'pdf.photosRef': '{n} photo(s) in appendix',
  'pdf.download': 'Download PDF', 'pdf.preparing': 'Preparing PDF…',
  'pdf.unavailable': 'The PDF generator could not load (check the connection). The print window will open: choose “Save as PDF”.',
  'pdf.generated': 'Generated on {date}', 'pdf.signature': 'Guard signature',
  'pdf.locked': 'Time-stamped entries that cannot be edited or deleted.', 'pdf.noEntries': 'No entries.',
  'pdf.page': 'Page {n} / {total}',
  'closed.title': 'Shift closed', 'closed.body': 'Your log is saved. Download it as a PDF to hand it over.',
  'closed.new': 'Start a new shift',
  'start.firstName': 'First name', 'start.lastName': 'Last name',
  'start.nameRequired': 'Enter your first and last name.',
  'start.openShifts': 'Shift already open on this site',
  'start.resume': 'Resume {name}’s shift (since {time})',
  'access.authorised': 'Authorised person: identity already verified. Do not ask for, photograph or keep their ID.',
  'access.pending': 'Access not yet approved: call a contact and get their approval before entry.',
  'access.unknown': 'Person not on the register: check their ID and get a contact’s approval before entry.',
  'access.refused': 'Access refused: do not let this person in. Log an incident if they insist.',
  'access.authorisedBy': 'Access approved by',
  'access.idChecked': 'Original ID checked against the person',
  'access.idAlready': 'ID already checked on a previous arrival ({date}).',
  'access.authRequired': 'Enter who approved access.',
  'access.idRequired': 'Check the original ID before letting them in.',
  'access.pendingTag': 'to approve', 'access.refusedTag': 'refused',
  'entry.authorisedBy': 'Approved by {name}', 'entry.idChecked': 'ID checked',
  'common.wait': 'One moment…', 'common.cancel': 'Cancel', 'common.save': 'Save',
  'common.back': 'Back', 'common.print': 'Print', 'common.close': 'Close',
  'setup.html': 'Open config.js and fill in your Supabase project URL and “anon” key (Project Settings, then API).',
  'setup.title': 'Configuration missing',
  'setup.body': 'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (.env file locally, environment variables on Netlify). See the README.',
  'login.subtitle': 'Electronic security log', 'login.email': 'Email', 'login.password': 'Password',
  'login.submit': 'Sign in', 'login.error': 'Incorrect email or password.',
  'blocked': 'This account is disabled. Contact your supervisor.',
  'nav.log': 'Logbook', 'nav.history': 'History', 'nav.logout': 'Sign out',
  'start.title': 'Start of shift', 'start.site': 'Site', 'start.chooseSite': 'Choose a site',
  'start.noSite': 'No site is set up yet. Ask your supervisor to add one.',
  'start.standing': 'Standing instructions', 'start.previous': 'Previous shift',
  'start.previousBy': 'Closed by {name} on {time}. Their handover notes are copied below.',
  'start.noPrevious': 'No previous shift on this site.',
  'start.instructions': 'Instructions received',
  'start.instructionsPh': 'Instructions from the previous guard or your supervisor',
  'start.submit': 'Start my shift',
  'shift.since': 'On duty since {time}', 'shift.instructions': 'Instructions received',
  'shift.patrolLive': 'Patrol in progress since {time}', 'shift.patrolEnd': 'End patrol',
  'shift.onSite': 'On site ({n})', 'shift.nobody': 'Nobody is logged on site.',
  'shift.log': 'Logbook',
  'shift.empty': 'No entries yet. Use the buttons above to log each event as it happens.',
  'shift.sos': 'Emergency numbers', 'shift.end': 'End shift',
  'type.patrol': 'Patrol', 'type.arrival': 'Arrival', 'type.departure': 'Departure', 'type.delivery': 'Delivery',
  'type.task': 'Task', 'type.gate': 'Gate', 'type.incident': 'Incident report', 'type.note': 'Note',
  'type.correction': 'Correction',
  'cat.staff': 'Staff', 'cat.family': 'Family', 'cat.visitor': 'Visitor', 'cat.contractor': 'Contractor', 'cat.other': 'Other',
  'patrol.full': 'full', 'patrol.ok': 'nothing to report', 'patrol.anomaly': 'anomaly',
  'desc.patrol': 'Patrol {where}: {result}', 'desc.patrolLive': 'Patrol {where} in progress',
  'desc.arrival': '{name} arrived', 'desc.departure': '{name} left', 'desc.delivery': 'Delivery {name}',
  'gate.open': 'Gate opened', 'gate.close': 'Gate closed',
  'entry.correct': 'Correct', 'entry.correcting': 'Corrects the {time} entry', 'entry.late': 'Entered at {time}',
  'form.present': 'Currently on site', 'form.category': 'Category', 'form.person': 'Person',
  'form.choose': 'Choose…', 'form.otherPerson': 'Someone else…', 'form.name': 'Name',
  'form.addToRegistry': 'Add to the site register', 'form.zone': 'Area or house', 'form.anyZone': 'Not specified',
  'form.time': 'Time', 'form.desc': 'Details', 'form.company': 'Company or courier', 'form.task': 'Task done',
  'form.otherTask': 'Other task', 'form.gateAction': 'Action',
  'form.nameRequired': 'Enter the person’s name.', 'form.descRequired': 'Describe what happened.',
  'form.taskRequired': 'Enter the task done.',
  'form.correctionHelp': 'A saved entry can’t be changed. Write the correction here: it will be linked to the {time} entry.',
  'patrolClose.title': 'End of patrol', 'patrolClose.result': 'Result', 'patrolClose.zone': 'Patrol covered',
  'patrolClose.full': 'Whole site', 'patrolClose.descRequired': 'Describe the anomaly.',
  'end.title': 'End of shift', 'end.checklist': 'Before you leave', 'end.notes': 'Handover notes',
  'end.notesPh': 'What the next guard needs to know',
  'end.justify': 'An item is unchecked: explain why in the handover notes.',
  'end.patrolOpen': 'End the current patrol before closing your shift.', 'end.submit': 'Close my shift',
  'sos.title': 'Emergency numbers', 'sos.none': 'No numbers set up for this site.',
  'history.title': 'Shift history', 'history.open': 'Ongoing', 'history.empty': 'No shifts recorded.',
  'report.title': 'Security log', 'report.date': 'Date', 'report.site': 'Site', 'report.agent': 'Guard',
  'report.empNo': 'Emp. no', 'report.start': 'Start', 'report.end': 'Finish',
  'report.instructions': 'Instructions received', 'report.handover': 'Handover notes',
  'report.checklist': 'End-of-shift checks', 'report.time': 'Time', 'report.event': 'Event',
  'report.details': 'Details', 'report.yes': 'Done', 'report.no': 'Not done', 'report.none': 'None',
};


const DICT = { fr, en };
const SHIFT_KEY = 'amcari-shift-id';
const AGENT_KEY = 'amcari-agent';
const ACTIONS = ['patrol', 'arrival', 'departure', 'delivery', 'event', 'incident'];
const CATEGORIES = ['staff', 'family', 'visitor', 'contractor', 'other'];

/* ---------- Outils ---------- */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { /* ignore */ } },
};
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');

let lang = store.get('amcari-lang') || (navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en');
function t(k, vars) {
  let s = (DICT[lang] && DICT[lang][k]) ?? fr[k] ?? k;
  if (vars) for (const [a, b] of Object.entries(vars)) s = s.split(`{${a}}`).join(b ?? '');
  return s;
}

function fmtTime(d) { if (!d) return ''; const x = new Date(d); return `${pad(x.getHours())}:${pad(x.getMinutes())}`; }
function fmtDate(d) {
  return new Date(d).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
}
function fmtDateTime(d) { return `${fmtDate(d)} ${fmtTime(d)}`; }
function timeInputValue(d) { return `${pad(d.getHours())}:${pad(d.getMinutes())}`; }
// Heure « HH:MM » → date ; une heure dans le futur est comprise comme la veille (service de nuit)
function fromTimeInput(v) {
  const [h, m] = v.split(':').map(Number);
  const d = new Date(); d.setHours(h, m, 0, 0);
  if (d.getTime() - Date.now() > 5 * 60e3) d.setDate(d.getDate() - 1);
  return d;
}
const personKey = (m) => m.person_id || `n:${(m.person_name || '').trim().toLowerCase()}`;
function computePresence(moves) {
  const map = new Map();
  const sorted = [...moves].sort((a, b) => (a.occurred_at === b.occurred_at
    ? String(a.created_at || '').localeCompare(String(b.created_at || ''))
    : a.occurred_at < b.occurred_at ? -1 : 1));
  for (const m of sorted) {
    const k = personKey(m);
    if (m.type === 'arrival') map.set(k, { key: k, person_id: m.person_id, name: m.person_name, category: m.person_category, since: m.occurred_at });
    else map.delete(k);
  }
  return [...map.values()].sort((a, b) => (a.since < b.since ? -1 : 1));
}
// Textes du site dans la langue choisie (colonne « translations » ; sinon texte d'origine)
function siteText(site, field) {
  const tr = site && site.translations && site.translations[lang];
  return tr && tr[field] != null ? tr[field] : site ? site[field] : null;
}
const roleText = (site, r) => (r && site && site.translations && site.translations[lang] && site.translations[lang].roles && site.translations[lang].roles[r]) || r;
const isLate = (e) => new Date(e.created_at) - new Date(e.occurred_at) > 10 * 60e3;
const agentName = (s) => (s ? [s.agent_first_name, s.agent_last_name].filter(Boolean).join(' ') || '?' : '?');
function describe(e) {
  let base;
  switch (e.type) {
    case 'patrol': {
      const where = e.zone || t('patrol.full');
      if (!e.ended_at) return t('desc.patrolLive', { where });
      return t('desc.patrol', { where, result: t(e.outcome === 'anomaly' ? 'patrol.anomaly' : 'patrol.ok') });
    }
    case 'arrival': base = t('desc.arrival', { name: e.person_name }); break;
    case 'departure': base = t('desc.departure', { name: e.person_name }); break;
    case 'delivery': base = t('desc.delivery', { name: e.person_name || '' }).trim(); break;
    case 'task': base = e.action || t('type.task'); break;
    case 'event': base = e.action ? `${t('type.event')} : ${e.action}` : t('type.event'); break;
    case 'gate': base = t(`gate.${e.action || 'open'}`); break;
    default: base = t(`type.${e.type}`);
  }
  return e.zone ? `${base} (${e.zone})` : base;
}

function openModal(title, html) {
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}">
    <div class="sheet-head"><h2 class="h-card">${esc(title)}</h2>
    <button type="button" class="icon-btn" data-close aria-label="${esc(t('common.close'))}">✕</button></div>${html}</div>`;
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  function close() { ov.remove(); document.removeEventListener('keydown', onKey); }
  ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
  ov.querySelectorAll('[data-close]').forEach((b) => { b.onclick = close; });
  document.addEventListener('keydown', onKey);
  document.body.appendChild(ov);
  return { el: ov.querySelector('.sheet'), close };
}
function showErr(el, msg) { el.textContent = msg || ''; el.hidden = !msg; }

/* ---------- Démarrage ---------- */
const cfg = window.AMCARI_CONFIG || {};
const configured = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_URL.includes('xxxx') && window.supabase;
const db = configured ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
const $app = document.getElementById('app');
let tab = 'log';
let currentShift = null;
let closedShiftId = null;
let clockTimer = null;

async function loadShift(id = store.get(SHIFT_KEY)) {
  currentShift = null;
  if (!id) return;
  const { data } = await db.from('shifts').select('*, sites(*)').eq('id', id).maybeSingle();
  if (data && data.status === 'open') { store.set(SHIFT_KEY, data.id); currentShift = data; }
  else store.set(SHIFT_KEY, null);
}

function langSwitch() {
  return `<div class="lang" role="group" aria-label="Langue / Language">${['fr', 'en'].map((l) =>
    `<button type="button" data-lang="${l}" aria-pressed="${lang === l}">${l.toUpperCase()}</button>`).join('')}</div>`;
}
function bindLang(root) {
  root.querySelectorAll('[data-lang]').forEach((b) => {
    b.onclick = () => { lang = b.dataset.lang; store.set('amcari-lang', lang); document.documentElement.lang = lang; render(); };
  });
}

function render() {
  clearInterval(clockTimer);
  if (!db) {
    $app.innerHTML = `<div class="login"><div class="login-card"><p class="brand-big">Amcari</p>
      <h1 class="h-card">${t('setup.title')}</h1><p class="muted">${t('setup.html')}</p>${langSwitch()}</div></div>`;
    bindLang($app);
    return;
  }
  $app.innerHTML = `<header class="topbar"><span class="brand">Amcari</span>
    <nav class="tabs">
      <button data-tab="log" ${tab === 'log' ? 'aria-current="page"' : ''}>${t('nav.log')}</button>
      <button data-tab="history" ${tab === 'history' ? 'aria-current="page"' : ''}>${t('nav.history')}</button>
    </nav><div class="topbar-end">${langSwitch()}</div></header>
    <main class="content" id="main"></main>`;
  $app.querySelectorAll('[data-tab]').forEach((b) => { b.onclick = () => { tab = b.dataset.tab; render(); }; });
  bindLang($app);
  const main = document.getElementById('main');
  if (tab === 'history') renderHistory(main);
  else if (currentShift) renderShift(main);
  else if (closedShiftId) renderClosed(main);
  else renderStart(main);
}

/* ---------- Prise de service ---------- */
async function renderStart(main) {
  main.innerHTML = `<p class="muted">${t('common.wait')}</p>`;
  const { data: sites, error } = await db.from('sites').select('*').eq('active', true).order('name');
  if (error) { main.innerHTML = `<p class="error">${esc(error.message)}</p>`; return; }
  if (!sites.length) {
    main.innerHTML = `<section class="panel narrow stack"><h1 class="h-page">${t('start.title')}</h1><p class="muted">${t('start.noSite')}</p></section>`;
    return;
  }
  let saved = {};
  try { saved = JSON.parse(store.get(AGENT_KEY)) || {}; } catch { /* ignore */ }

  main.innerHTML = `<section class="panel narrow stack">
    <h1 class="h-page">${t('start.title')}</h1>
    <div class="two-cols">
      <label>${t('start.firstName')}<input id="first" autocomplete="given-name" value="${esc(saved.first)}"></label>
      <label>${t('start.lastName')}<input id="last" autocomplete="family-name" value="${esc(saved.last)}"></label>
    </div>
    <label>${t('start.site')}<select id="site"><option value="">${t('start.chooseSite')}</option>
      ${sites.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label>
    <div id="siteInfo" class="stack"></div>
    <label>${t('start.instructions')}<textarea id="instr" rows="5" placeholder="${esc(t('start.instructionsPh'))}"></textarea></label>
    <p id="err" class="error" role="alert" hidden></p>
    <button id="startBtn" class="btn primary big" disabled>${t('start.submit')}</button>
  </section>`;

  const sel = main.querySelector('#site');
  const btn = main.querySelector('#startBtn');
  const info = main.querySelector('#siteInfo');
  const instr = main.querySelector('#instr');
  const err = main.querySelector('#err');

  async function onSite() {
    btn.disabled = !sel.value;
    info.innerHTML = '';
    if (!sel.value) return;
    const site = sites.find((s) => s.id === sel.value);
    const [prev, open] = await Promise.all([
      db.from('shifts').select('handover_notes, ended_at, agent_first_name, agent_last_name')
        .eq('site_id', site.id).eq('status', 'closed').order('ended_at', { ascending: false }).limit(1).maybeSingle(),
      db.from('shifts').select('id, started_at, agent_first_name, agent_last_name')
        .eq('site_id', site.id).eq('status', 'open').order('started_at', { ascending: false }),
    ]);
    instr.value = prev.data?.handover_notes || '';
    const openList = open.data || [];
    info.innerHTML = `
      ${openList.length ? `<div class="note-block stack-s"><h2 class="h-small">${t('start.openShifts')}</h2>
        ${openList.map((s) => `<button class="btn" data-resume="${s.id}">${esc(t('start.resume', { name: agentName(s), time: fmtTime(s.started_at) }))}</button>`).join('')}</div>` : ''}
      ${siteText(site, 'standing_instructions') ? `<div class="note-block"><h2 class="h-small">${t('start.standing')}</h2><p class="pre">${esc(siteText(site, 'standing_instructions'))}</p></div>` : ''}
      <p class="muted small">${esc(prev.data ? t('start.previousBy', { name: agentName(prev.data), time: fmtDateTime(prev.data.ended_at) }) : t('start.noPrevious'))}</p>`;
    info.querySelectorAll('[data-resume]').forEach((b) => { b.onclick = async () => { await loadShift(b.dataset.resume); render(); }; });
  }
  sel.onchange = onSite;
  if (sites.length === 1) { sel.value = sites[0].id; onSite(); }

  btn.onclick = async () => {
    const first = main.querySelector('#first').value.trim();
    const last = main.querySelector('#last').value.trim();
    if (!first || !last) return showErr(err, t('start.nameRequired'));
    btn.disabled = true;
    store.set(AGENT_KEY, JSON.stringify({ first, last }));
    const { data, error: e } = await db.from('shifts').insert({
      site_id: sel.value, agent_first_name: first, agent_last_name: last, instructions_received: instr.value.trim() || null,
    }).select('id').single();
    if (e) { btn.disabled = false; return showErr(err, e.message); }
    await loadShift(data.id);
    render();
  };
}

/* ---------- Main courante ---------- */
function timelineHtml(entries, withCorrect) {
  if (!entries.length) return `<p class="empty">${t('shift.empty')}</p>`;
  const byId = Object.fromEntries(entries.map((e) => [e.id, e]));
  return `<ol class="timeline">${entries.map((e) => `
    <li class="tl tone-${e.type}${e.outcome === 'anomaly' || e.type === 'anomaly' ? ' is-anomaly' : ''}">
      <time class="tl-time" datetime="${e.occurred_at}">${fmtTime(e.occurred_at)}${e.ended_at ? `<span class="tl-to">${fmtTime(e.ended_at)}</span>` : ''}</time>
      <div class="tl-body">
        <p class="tl-title">${esc(describe(e))}</p>
        ${e.person_category ? `<p class="tl-meta">${t(`cat.${e.person_category}`)}</p>` : ''}
        ${e.authorised_by ? `<p class="tl-meta">${esc(t('entry.authorisedBy', { name: e.authorised_by }))}</p>` : ''}
        ${e.id_checked ? `<p class="tl-meta">${t('entry.idChecked')}</p>` : ''}
        ${e.description ? `<p class="tl-desc pre">${esc(e.description)}</p>` : ''}
        ${(e.photos || []).length ? `<div class="thumbs" data-photos="${esc(JSON.stringify(e.photos))}"></div>` : ''}
        ${e.corrects_entry_id ? `<p class="tl-meta">${esc(t('entry.correcting', { time: fmtTime(byId[e.corrects_entry_id]?.occurred_at) || '?' }))}</p>` : ''}
        ${isLate(e) ? `<p class="tl-meta">${esc(t('entry.late', { time: fmtTime(e.created_at) }))}</p>` : ''}
        ${withCorrect && e.type !== 'correction' && !(e.type === 'patrol' && !e.ended_at)
          ? `<button class="link small" data-correct="${e.id}">${t('entry.correct')}</button>` : ''}
      </div>
    </li>`).join('')}</ol>`;
}

/* ---------- Photos ---------- */
const uuid = () => (window.crypto && crypto.randomUUID ? crypto.randomUUID()
  : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }));

// Réduit la photo (1600 px max, JPEG) pour un envoi rapide en 4G
async function compressImage(file, max = 1600, quality = 0.75) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas');
    c.width = Math.round(img.naturalWidth * scale);
    c.height = Math.round(img.naturalHeight * scale);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return await new Promise((res) => c.toBlob(res, 'image/jpeg', quality));
  } finally {
    URL.revokeObjectURL(url);
  }
}

function photoPicker(container, label) {
  const items = [];
  container.innerHTML = `<div class="photos-field"><div class="thumbs edit"></div>
    <label class="btn photo-btn">${esc(label || t('photo.add'))}<input type="file" accept="image/*" multiple hidden></label></div>`;
  const input = container.querySelector('input');
  const thumbs = container.querySelector('.thumbs');
  function paint() {
    thumbs.innerHTML = items.map((it, i) => `<figure><img src="${it.url}" alt="${esc(t('photo.alt'))}">
      <button type="button" data-rm="${i}" aria-label="${esc(t('photo.remove'))}">✕</button></figure>`).join('');
    thumbs.querySelectorAll('[data-rm]').forEach((b) => {
      b.onclick = () => { const [r] = items.splice(+b.dataset.rm, 1); URL.revokeObjectURL(r.url); paint(); };
    });
  }
  input.onchange = async () => {
    for (const f of input.files) {
      try { const blob = await compressImage(f); if (blob) items.push({ blob, url: URL.createObjectURL(blob) }); } catch { /* fichier illisible */ }
    }
    input.value = '';
    paint();
  };
  return { blobs: () => items.map((it) => it.blob) };
}

async function uploadPhotos(siteId, blobs) {
  const paths = [];
  for (const b of blobs) {
    const path = `${siteId}/${isoDate(new Date())}/${uuid()}.jpg`;
    const { error } = await db.storage.from('photos').upload(path, b, { contentType: 'image/jpeg' });
    if (error) throw new Error(t('photo.uploadError'));
    paths.push(path);
  }
  return paths;
}

const signedCache = new Map();
async function signedUrls(paths) {
  const now = Date.now();
  const missing = [...new Set(paths)].filter((p) => !(signedCache.get(p) && signedCache.get(p).exp > now));
  if (missing.length) {
    const { data } = await db.storage.from('photos').createSignedUrls(missing, 3600);
    (data || []).forEach((d) => { if (d.signedUrl) signedCache.set(d.path, { url: d.signedUrl, exp: now + 50 * 60e3 }); });
  }
  return paths.map((p) => (signedCache.get(p) ? signedCache.get(p).url : null));
}

async function hydratePhotos(root) {
  const holders = [...root.querySelectorAll('[data-photos]')];
  if (!holders.length) return;
  const all = holders.flatMap((h) => JSON.parse(h.dataset.photos));
  try {
    const urls = await signedUrls(all);
    const map = Object.fromEntries(all.map((p, i) => [p, urls[i]]));
    holders.forEach((h) => {
      h.innerHTML = JSON.parse(h.dataset.photos).map((p) => (map[p]
        ? `<a href="${esc(map[p])}" target="_blank" rel="noopener"><img src="${esc(map[p])}" alt="${esc(t('photo.alt'))}" loading="lazy"></a>` : '')).join('');
    });
  } catch { /* photos indisponibles */ }
}

/* ---------- Écran de service ---------- */
async function renderShift(main) {
  const shift = currentShift;
  const site = shift.sites;
  let entries = [];
  let people = [];
  let moves = [];
  let checkedIds = new Set();
  let errMsg = '';
  let patrolStart = null;

  async function load() {
    const since = new Date(new Date(shift.started_at).getTime() - 24 * 3600e3).toISOString();
    const [e, p, m, c] = await Promise.all([
      db.from('log_entries').select('*').eq('shift_id', shift.id).order('occurred_at', { ascending: false }).order('created_at', { ascending: false }),
      db.from('people').select('*').eq('site_id', site.id).eq('active', true).order('full_name'),
      db.from('log_entries').select('type, person_id, person_name, person_category, occurred_at, created_at')
        .eq('site_id', site.id).in('type', ['arrival', 'departure']).gte('occurred_at', since).order('occurred_at'),
      db.from('log_entries').select('person_id').eq('site_id', site.id).eq('id_checked', true),
    ]);
    const firstErr = e.error || p.error || m.error;
    errMsg = firstErr ? firstErr.message : '';
    entries = e.data || [];
    people = p.data || [];
    moves = m.data || [];
    checkedIds = new Set((c.data || []).map((x) => x.person_id).filter(Boolean));
    draw();
  }

  const zones = () => siteText(site, 'zones') || [];
  const headerHtml = (title, sub) => `<header class="shift-head">
      <div><h1 class="h-page">${esc(title)}</h1><p class="muted">${sub}</p></div>
      <div class="clock" id="clock">${fmtTime(new Date())}</div></header>
      ${errMsg ? `<p class="error" role="alert">${esc(errMsg)}</p>` : ''}`;

  function draw() {
    const activePatrol = entries.find((x) => x.type === 'patrol' && !x.ended_at);
    if (activePatrol) return drawPatrol(activePatrol);
    patrolStart = null;
    const presence = computePresence(moves);
    main.innerHTML = `<div class="shift">
      ${headerHtml(site.name, `${esc(t('shift.since', { time: fmtTime(shift.started_at) }))}, ${esc(agentName(shift))}`)}
      ${shift.instructions_received ? `<details class="note-block"><summary>${t('shift.instructions')}</summary><p class="pre">${esc(shift.instructions_received)}</p></details>` : ''}
      <div class="actions">${ACTIONS.map((a) => `<button class="action tone-${a}" data-act="${a}">${t(`btn.${a}`)}</button>`).join('')}</div>
      <section class="block"><h2 class="h-section">${esc(t('shift.onSite', { n: presence.length }))}</h2>
        ${presence.length ? `<ul class="chips">${presence.map((p) =>
          `<li><span>${esc(p.name)}</span><small>${t(`cat.${p.category || 'other'}`)}, ${fmtTime(p.since)}</small></li>`).join('')}</ul>`
          : `<p class="muted small">${t('shift.nobody')}</p>`}
      </section>
      <section class="block"><div class="row-between"><h2 class="h-section">${t('shift.log')}</h2>
        <button class="link small" id="pdfBtn">${t('pdf.download')}</button></div>${timelineHtml(entries, true)}</section>
      <div class="foot-actions">
        <button class="btn" id="sosBtn">${t('shift.sos')}</button>
        <button class="btn primary" id="endBtn">${t('shift.end')}</button>
      </div></div>`;

    main.querySelectorAll('[data-act]').forEach((b) => {
      b.onclick = () => {
        const a = b.dataset.act;
        if (a === 'patrol') return startPatrol();
        if (a === 'arrival') return registerInForm();
        if (a === 'departure') return registerOutForm(presence);
        return reportForm(a);
      };
    });
    main.querySelectorAll('[data-correct]').forEach((b) => {
      b.onclick = () => reportForm('correction', { corrects: entries.find((x) => x.id === b.dataset.correct) });
    });
    main.querySelector('#sosBtn').onclick = sos;
    main.querySelector('#endBtn').onclick = endShift;
    main.querySelector('#pdfBtn').onclick = (ev) => exportShiftPdf(shift.id, ev.currentTarget);
    hydratePhotos(main);
  }

  /* --- Ronde : écran dédié --- */
  function drawPatrol(p) {
    patrolStart = new Date(p.occurred_at);
    const anomalies = entries.filter((x) => x.type === 'anomaly' && x.patrol_id === p.id);
    main.innerHTML = `<div class="shift patrol-mode">
      ${headerHtml(t('patrol.title'), `${esc(site.name)}, ${esc(t('patrol.since', { time: fmtTime(p.occurred_at) }))} <span id="elapsed"></span>`)}
      <button class="btn big alert-btn" id="anoBtn">${t('patrol.report')}</button>
      <section class="block"><h2 class="h-section">${esc(t('patrol.anomalies', { n: anomalies.length }))}</h2>
        ${anomalies.length ? timelineHtml(anomalies, false) : `<p class="muted small">${t('patrol.none')}</p>`}</section>
      <div class="foot-actions">
        <button class="btn" id="sosBtn">${t('shift.sos')}</button>
        <button class="btn primary" id="finBtn">${t('patrol.end')}</button>
      </div></div>`;
    main.querySelector('#anoBtn').onclick = () => reportForm('anomaly', { patrol: p });
    main.querySelector('#finBtn').onclick = () => finishPatrol(p, anomalies.length);
    main.querySelector('#sosBtn').onclick = sos;
    tick();
    hydratePhotos(main);
  }

  async function startPatrol() {
    const { error } = await db.from('log_entries').insert({ shift_id: shift.id, site_id: site.id, type: 'patrol' });
    if (error) errMsg = error.message;
    load();
  }

  function finishPatrol(p, count) {
    const z = zones();
    const { el, close } = openModal(t('patrol.end'), `<form class="stack" novalidate>
      <p class="${count ? 'alert-text' : 'muted'}">${esc(count ? t('patrol.summary', { n: count }) : t('patrol.summaryOk'))}</p>
      ${z.length ? `<label>${t('patrolClose.zone')}<select id="pzone"><option value="">${esc(t('patrolClose.full'))}</option>
        ${z.map((x) => `<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></label>` : ''}
      <label>${t('form.comment')}<textarea id="pdesc" rows="3"></textarea></label>
      <p id="perr" class="error" role="alert" hidden></p>
      <div class="row-end"><button type="button" class="btn" data-close>${t('common.cancel')}</button>
      <button type="submit" class="btn primary">${t('patrol.confirm')}</button></div></form>`);
    el.querySelector('form').onsubmit = async (ev) => {
      ev.preventDefault();
      const zs = el.querySelector('#pzone');
      const { error } = await db.from('log_entries').update({
        ended_at: new Date().toISOString(),
        outcome: count ? 'anomaly' : 'ok',
        zone: (zs && zs.value) || null,
        description: el.querySelector('#pdesc').value.trim() || null,
      }).eq('id', p.id);
      if (error) return showErr(el.querySelector('#perr'), error.message);
      close();
      load();
    };
  }

  /* --- Champs communs --- */
  function locationHtml() {
    const z = zones();
    return `<div class="stack-s"><label>${t('form.location')}<input id="loc" autocomplete="off"></label>
      ${z.length ? `<div class="pick small-pick">${z.map((x, i) => `<button type="button" data-zone="${i}">${esc(x)}</button>`).join('')}</div>` : ''}</div>`;
  }
  function bindLocation(el) {
    const z = zones();
    el.querySelectorAll('[data-zone]').forEach((b) => {
      b.onclick = () => {
        el.querySelector('#loc').value = z[+b.dataset.zone];
        el.querySelectorAll('[data-zone]').forEach((x) => x.setAttribute('aria-pressed', x === b));
      };
    });
  }
  const timeHtml = () => `<label class="time-field">${t('form.time')}<input type="time" id="time" value="${timeInputValue(new Date())}" required></label>`;

  /* --- Rapports (événement, incident, anomalie, livraison, rectification) --- */
  function reportForm(type, opts = {}) {
    const tasks = siteText(site, 'quick_tasks') || [];
    const descRequired = type !== 'delivery';
    const withPhotos = type !== 'correction';
    let subject = '';
    let html = '<form class="stack" novalidate>';
    if (type === 'correction') html += `<p class="muted small">${esc(t('form.correctionHelp', { time: fmtTime(opts.corrects.occurred_at) }))}</p>`;
    if (type === 'delivery') html += `<label>${t('form.company')}<input id="company"></label>`;
    if (type === 'event' && tasks.length) {
      html += `<fieldset><legend>${t('form.subject')}</legend><div class="pick">${tasks.map((tk, i) =>
        `<button type="button" data-task="${i}" aria-pressed="false">${esc(tk)}</button>`).join('')}</div></fieldset>`;
    }
    if (type !== 'correction') html += locationHtml() + timeHtml();
    html += `<label>${type === 'delivery' ? t('form.comment') : t('form.desc')}<textarea id="desc" rows="${type === 'delivery' ? 3 : 5}"></textarea></label>`;
    if (withPhotos) html += '<div id="photos"></div>';
    html += `<p id="ferr" class="error" role="alert" hidden></p>
      <div class="row-end"><button type="button" class="btn" data-close>${t('common.cancel')}</button>
      <button type="submit" class="btn primary">${t('common.save')}</button></div></form>`;

    const { el, close } = openModal(t(`btn.${type}`), html);
    const ferr = el.querySelector('#ferr');
    const picker = withPhotos ? photoPicker(el.querySelector('#photos')) : null;
    bindLocation(el);
    el.querySelectorAll('[data-task]').forEach((b) => {
      b.onclick = () => {
        const v = tasks[+b.dataset.task];
        subject = subject === v ? '' : v;
        el.querySelectorAll('[data-task]').forEach((x) => x.setAttribute('aria-pressed', x === b && subject === v));
      };
    });

    el.querySelector('form').onsubmit = async (ev) => {
      ev.preventDefault();
      showErr(ferr, '');
      const desc = el.querySelector('#desc').value.trim();
      if (descRequired && !desc) return showErr(ferr, t('form.descRequired'));
      const submit = el.querySelector('button[type=submit]');
      submit.disabled = true;
      submit.textContent = t('common.wait');
      try {
        const photos = picker ? await uploadPhotos(site.id, picker.blobs()) : [];
        const loc = el.querySelector('#loc');
        const { error } = await db.from('log_entries').insert({
          shift_id: shift.id,
          site_id: site.id,
          type,
          occurred_at: type === 'correction' ? new Date().toISOString() : fromTimeInput(el.querySelector('#time').value).toISOString(),
          person_name: type === 'delivery' ? (el.querySelector('#company').value.trim() || null) : null,
          zone: (loc && loc.value.trim()) || null,
          action: subject || null,
          description: desc || null,
          photos,
          patrol_id: opts.patrol ? opts.patrol.id : null,
          corrects_entry_id: opts.corrects ? opts.corrects.id : null,
        });
        if (error) throw error;
        close();
        load();
      } catch (err) {
        submit.disabled = false;
        submit.textContent = t('common.save');
        showErr(ferr, err.message);
      }
    };
  }

  /* --- Registre des entrées (plusieurs personnes à la fois) --- */
  function registerInForm() {
    const contacts = siteText(site, 'access_contacts') || [];
    const selected = new Map();
    const extras = [];
    let category = 'staff';
    let search = '';
    let authBy = '';
    let idChecked = false;
    let accessKey = null;

    const { el, close } = openModal(t('btn.arrival'), `<form class="stack" novalidate>
      <fieldset><legend>${t('form.category')}</legend><div class="segmented">${CATEGORIES.map((c) =>
        `<button type="button" data-cat="${c}" aria-pressed="${c === category}">${t(`cat.${c}`)}</button>`).join('')}</div></fieldset>
      <input type="search" id="search" placeholder="${esc(t('reg.search'))}" aria-label="${esc(t('reg.search'))}">
      <div class="row-between"><span class="muted small" id="count"></span><button type="button" class="link small" id="all"></button></div>
      <ul class="checklist" id="plist"></ul>
      <div id="extras" class="stack"></div>
      <button type="button" class="btn" id="addExtra">${t('reg.addUnlisted')}</button>
      <div id="accessBox"></div>
      ${locationHtml()}${timeHtml()}
      <label>${t('form.comment')}<textarea id="desc" rows="2"></textarea></label>
      <p id="ferr" class="error" role="alert" hidden></p>
      <div class="row-end"><button type="button" class="btn" data-close>${t('common.cancel')}</button>
      <button type="submit" class="btn primary" id="save"></button></div></form>`);
    const $ = (s) => el.querySelector(s);
    bindLocation(el);

    const visible = () => people.filter((p) => p.category === category
      && (!search || p.full_name.toLowerCase().includes(search.toLowerCase())));
    const total = () => selected.size + extras.length;
    const pendingSelected = () => [...selected.values()].filter((p) => (p.access_status || 'pending') === 'pending');

    function paintList() {
      const list = visible();
      $('#plist').innerHTML = list.length ? list.map((p) => {
        const refused = p.access_status === 'refused';
        const tag = refused ? t('access.refusedTag') : p.access_status === 'pending' ? t('access.pendingTag') : '';
        return `<li><label class="check person${refused ? ' is-refused' : ''}">
          <input type="checkbox" data-pid="${p.id}" ${selected.has(p.id) ? 'checked' : ''} ${refused ? 'disabled' : ''}>
          <span><strong>${esc(p.full_name)}</strong>${p.role || tag ? `<small>${esc([roleText(site, p.role), tag].filter(Boolean).join(', '))}</small>` : ''}</span>
        </label></li>`;
      }).join('') : `<li class="muted small">${t('reg.emptyCategory')}</li>`;
      $('#plist').querySelectorAll('[data-pid]').forEach((cb) => {
        cb.onchange = () => {
          const p = people.find((x) => x.id === cb.dataset.pid);
          if (cb.checked) selected.set(p.id, p); else selected.delete(p.id);
          paintStatus();
        };
      });
      el.querySelectorAll('[data-cat]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.cat === category));
      paintStatus();
    }

    function paintStatus() {
      const selectable = visible().filter((p) => p.access_status !== 'refused');
      const allOn = selectable.length && selectable.every((p) => selected.has(p.id));
      $('#all').textContent = allOn ? t('reg.unselectAll') : t('reg.selectAll');
      $('#all').hidden = !selectable.length;
      $('#count').textContent = t('reg.selected', { n: total() });
      $('#save').textContent = t('reg.save', { n: total() });
      paintAccess();
    }

    function paintAccess() {
      const pend = pendingSelected();
      const named = extras.filter((x) => x.name.trim());
      const needsAuth = pend.length > 0 || extras.length > 0;
      const needsId = extras.length > 0 || pend.some((p) => !checkedIds.has(p.id));
      const names = [...pend.map((p) => p.full_name), ...named.map((x) => x.name.trim())];
      const key = `${needsAuth}|${needsId}|${names.join(',')}|${extras.length}`;
      if (key === accessKey) return;
      accessKey = key;
      const box = $('#accessBox');
      if (!needsAuth) { box.innerHTML = ''; return; }
      box.innerHTML = `<div class="access access-pending" role="status">
        <p class="access-msg">${t('access.pending')}</p>
        ${names.length ? `<p class="small">${esc(t('reg.needApproval', { names: names.join(', ') }))}</p>` : ''}
        ${contacts.length ? `<ul class="contacts">${contacts.map((c) => `<li>
          <a class="btn" href="tel:${esc(String(c.phone).replace(/\s/g, ''))}">${esc(c.name)}, ${esc(c.phone)}</a>
          ${c.note ? `<small class="muted">${esc(c.note)}</small>` : ''}</li>`).join('')}</ul>` : ''}
        <fieldset><legend>${t('access.authorisedBy')}</legend>
          ${contacts.length ? `<div class="pick">${contacts.map((c, i) =>
            `<button type="button" data-auth="${i}" aria-pressed="${authBy === c.name}">${esc(c.name)}</button>`).join('')}</div>` : ''}
          <input id="authBy" value="${esc(authBy)}" aria-label="${esc(t('access.authorisedBy'))}">
        </fieldset>
        ${needsId ? `<label class="check"><input type="checkbox" id="idChecked" ${idChecked ? 'checked' : ''}>${t('reg.idCheckedGroup')}</label>` : ''}
      </div>`;
      box.querySelectorAll('[data-auth]').forEach((b) => {
        b.onclick = () => {
          authBy = contacts[+b.dataset.auth].name;
          $('#authBy').value = authBy;
          box.querySelectorAll('[data-auth]').forEach((x) => x.setAttribute('aria-pressed', x === b));
        };
      });
      $('#authBy').oninput = () => { authBy = $('#authBy').value; };
      const ic = $('#idChecked');
      if (ic) ic.onchange = () => { idChecked = ic.checked; };
    }

    function addExtra() {
      const x = { key: uuid(), name: '', category: category === 'staff' ? 'visitor' : category, addReg: true, picker: null };
      extras.push(x);
      const row = document.createElement('div');
      row.className = 'extra stack-s';
      row.innerHTML = `<div class="row-between"><strong>${t('reg.unlisted')}</strong>
          <button type="button" class="link small" data-rmx>${t('reg.remove')}</button></div>
        <label>${t('reg.unlistedName')}<input data-xname></label>
        <label>${t('form.category')}<select data-xcat>${CATEGORIES.map((c) =>
          `<option value="${c}" ${c === x.category ? 'selected' : ''}>${t(`cat.${c}`)}</option>`).join('')}</select></label>
        <div data-xphoto></div>
        <label class="check"><input type="checkbox" data-xreg checked>${t('form.addToRegistry')}</label>`;
      $('#extras').appendChild(row);
      x.picker = photoPicker(row.querySelector('[data-xphoto]'), t('photo.id'));
      row.querySelector('[data-xname]').oninput = (e) => { x.name = e.target.value; paintAccess(); };
      row.querySelector('[data-xcat]').onchange = (e) => { x.category = e.target.value; };
      row.querySelector('[data-xreg]').onchange = (e) => { x.addReg = e.target.checked; };
      row.querySelector('[data-rmx]').onclick = () => { extras.splice(extras.indexOf(x), 1); row.remove(); paintStatus(); };
      row.querySelector('[data-xname]').focus();
      paintStatus();
    }

    el.querySelectorAll('[data-cat]').forEach((b) => { b.onclick = () => { category = b.dataset.cat; paintList(); }; });
    $('#search').oninput = () => { search = $('#search').value.trim(); paintList(); };
    $('#all').onclick = () => {
      const selectable = visible().filter((p) => p.access_status !== 'refused');
      const allOn = selectable.every((p) => selected.has(p.id));
      selectable.forEach((p) => (allOn ? selected.delete(p.id) : selected.set(p.id, p)));
      paintList();
    };
    $('#addExtra').onclick = addExtra;
    paintList();

    el.querySelector('form').onsubmit = async (ev) => {
      ev.preventDefault();
      const ferr = $('#ferr');
      showErr(ferr, '');
      if (!total()) return showErr(ferr, t('reg.noneSelected'));
      if (extras.some((x) => !x.name.trim())) return showErr(ferr, t('form.nameRequired'));
      const pend = pendingSelected();
      const needsAuth = pend.length > 0 || extras.length > 0;
      const needsId = extras.length > 0 || pend.some((p) => !checkedIds.has(p.id));
      if (needsAuth && !authBy.trim()) return showErr(ferr, t('access.authRequired'));
      if (needsId && !idChecked) return showErr(ferr, t('access.idRequired'));

      const submit = $('#save');
      submit.disabled = true;
      submit.textContent = t('common.wait');
      try {
        const base = {
          shift_id: shift.id,
          site_id: site.id,
          type: 'arrival',
          occurred_at: fromTimeInput($('#time').value).toISOString(),
          zone: $('#loc').value.trim() || null,
          description: $('#desc').value.trim() || null,
        };
        const rows = [...selected.values()].map((p) => {
          const pending = (p.access_status || 'pending') === 'pending';
          return {
            ...base, person_id: p.id, person_name: p.full_name, person_category: p.category,
            authorised_by: pending ? authBy.trim() : null,
            id_checked: pending && !checkedIds.has(p.id),
          };
        });
        for (const x of extras) {
          let personId = null;
          if (x.addReg) {
            const { data } = await db.from('people').insert({ site_id: site.id, full_name: x.name.trim(), category: x.category }).select().single();
            if (data) personId = data.id;
          }
          const photos = await uploadPhotos(site.id, x.picker.blobs());
          rows.push({
            ...base, person_id: personId, person_name: x.name.trim(), person_category: x.category,
            authorised_by: authBy.trim(), id_checked: true, photos,
          });
        }
        const { error } = await db.from('log_entries').insert(rows);
        if (error) throw error;
        close();
        load();
      } catch (err) {
        submit.disabled = false;
        submit.textContent = t('reg.save', { n: total() });
        showErr(ferr, err.message);
      }
    };
  }

  /* --- Registre des sorties --- */
  function registerOutForm(presence) {
    const selected = new Set();
    const extras = [];
    const { el, close } = openModal(t('btn.departure'), `<form class="stack" novalidate>
      ${presence.length ? `<div class="row-between"><span class="muted small" id="count"></span>
        <button type="button" class="link small" id="all"></button></div>
        <ul class="checklist">${presence.map((p, i) => `<li><label class="check person">
          <input type="checkbox" data-i="${i}"><span><strong>${esc(p.name)}</strong>
          <small>${t(`cat.${p.category || 'other'}`)}, ${fmtTime(p.since)}</small></span></label></li>`).join('')}</ul>`
        : `<p class="muted">${t('shift.nobody')}</p>`}
      <div id="extras" class="stack"></div>
      <button type="button" class="btn" id="addExtra">${t('reg.addUnlisted')}</button>
      ${timeHtml()}
      <label>${t('form.comment')}<textarea id="desc" rows="2"></textarea></label>
      <p id="ferr" class="error" role="alert" hidden></p>
      <div class="row-end"><button type="button" class="btn" data-close>${t('common.cancel')}</button>
      <button type="submit" class="btn primary" id="save"></button></div></form>`);
    const $ = (s) => el.querySelector(s);
    const total = () => selected.size + extras.length;
    function paint() {
      if ($('#count')) $('#count').textContent = t('reg.selected', { n: total() });
      if ($('#all')) $('#all').textContent = selected.size === presence.length ? t('reg.unselectAll') : t('reg.selectAll');
      $('#save').textContent = t('reg.save', { n: total() });
    }
    el.querySelectorAll('[data-i]').forEach((cb) => {
      cb.onchange = () => { if (cb.checked) selected.add(+cb.dataset.i); else selected.delete(+cb.dataset.i); paint(); };
    });
    if ($('#all')) {
      $('#all').onclick = () => {
        const allOn = selected.size === presence.length;
        el.querySelectorAll('[data-i]').forEach((cb) => {
          cb.checked = !allOn;
          if (allOn) selected.delete(+cb.dataset.i); else selected.add(+cb.dataset.i);
        });
        paint();
      };
    }
    $('#addExtra').onclick = () => {
      const x = { name: '' };
      extras.push(x);
      const row = document.createElement('div');
      row.className = 'extra stack-s';
      row.innerHTML = `<div class="row-between"><strong>${t('reg.unlisted')}</strong>
        <button type="button" class="link small" data-rmx>${t('reg.remove')}</button></div>
        <label>${t('reg.unlistedName')}<input data-xname></label>`;
      $('#extras').appendChild(row);
      row.querySelector('[data-xname]').oninput = (e) => { x.name = e.target.value; };
      row.querySelector('[data-rmx]').onclick = () => { extras.splice(extras.indexOf(x), 1); row.remove(); paint(); };
      row.querySelector('[data-xname]').focus();
      paint();
    };
    paint();

    el.querySelector('form').onsubmit = async (ev) => {
      ev.preventDefault();
      const ferr = $('#ferr');
      showErr(ferr, '');
      if (!total()) return showErr(ferr, t('reg.noneSelected'));
      if (extras.some((x) => !x.name.trim())) return showErr(ferr, t('form.nameRequired'));
      const base = {
        shift_id: shift.id, site_id: site.id, type: 'departure',
        occurred_at: fromTimeInput($('#time').value).toISOString(),
        description: $('#desc').value.trim() || null,
      };
      const rows = [...selected].map((i) => presence[i]).map((p) => ({
        ...base, person_id: p.person_id || null, person_name: p.name, person_category: p.category || null,
      }));
      extras.forEach((x) => rows.push({ ...base, person_name: x.name.trim(), person_category: 'other' }));
      $('#save').disabled = true;
      const { error } = await db.from('log_entries').insert(rows);
      if (error) { $('#save').disabled = false; return showErr(ferr, error.message); }
      close();
      load();
    };
  }

  function endShift() {
    const list = siteText(site, 'end_checklist') || [];
    const { el, close } = openModal(t('end.title'), `<form class="stack" novalidate>
      ${list.length ? `<fieldset><legend>${t('end.checklist')}</legend>${list.map((i, n) =>
        `<label class="check"><input type="checkbox" data-check="${n}">${esc(i)}</label>`).join('')}</fieldset>` : ''}
      <label>${t('end.notes')}<textarea id="notes" rows="5" placeholder="${esc(t('end.notesPh'))}"></textarea></label>
      <p id="eerr" class="error" role="alert" hidden></p>
      <div class="row-end"><button type="button" class="btn" data-close>${t('common.cancel')}</button>
      <button type="submit" class="btn primary">${t('end.submit')}</button></div></form>`);
    el.querySelector('form').onsubmit = async (ev) => {
      ev.preventDefault();
      const eerr = el.querySelector('#eerr');
      const notes = el.querySelector('#notes').value.trim();
      const checks = {};
      el.querySelectorAll('[data-check]').forEach((c) => { checks[list[+c.dataset.check]] = c.checked; });
      if (Object.values(checks).some((v) => !v) && !notes) return showErr(eerr, t('end.justify'));
      const { error } = await db.from('shifts')
        .update({ status: 'closed', ended_at: new Date().toISOString(), handover_notes: notes || null, checklist: checks })
        .eq('id', shift.id);
      if (error) return showErr(eerr, error.message);
      close();
      store.set(SHIFT_KEY, null);
      closedShiftId = shift.id;
      currentShift = null;
      render();
    };
  }

  function sos() {
    const nums = siteText(site, 'emergency_numbers') || [];
    openModal(t('sos.title'), nums.length
      ? `<ul class="sos">${nums.map((n) => `<li><a class="btn big" href="tel:${esc(String(n.number).replace(/\s/g, ''))}">${esc(n.label)} : ${esc(n.number)}</a>
          ${n.note ? `<small class="muted">${esc(n.note)}</small>` : ''}</li>`).join('')}</ul>`
      : `<p class="muted">${t('sos.none')}</p>`);
  }

  function tick() {
    const c = document.getElementById('clock');
    if (c) c.textContent = fmtTime(new Date());
    const e = document.getElementById('elapsed');
    if (e && patrolStart) e.textContent = t('patrol.elapsed', { n: Math.max(0, Math.round((Date.now() - patrolStart) / 60000)) });
  }
  clockTimer = setInterval(tick, 15000);
  main.innerHTML = `<p class="muted">${t('common.wait')}</p>`;
  await load();
}

/* ---------- Historique et rapport ---------- */
async function renderHistory(main) {
  main.innerHTML = `<p class="muted">${t('common.wait')}</p>`;
  const { data, error } = await db.from('shifts')
    .select('id, started_at, ended_at, status, agent_first_name, agent_last_name, sites(name)')
    .order('started_at', { ascending: false }).limit(60);
  if (error) { main.innerHTML = `<p class="error">${esc(error.message)}</p>`; return; }
  main.innerHTML = `<section class="panel stack"><h1 class="h-page">${t('history.title')}</h1>
    ${!data.length ? `<p class="empty">${t('history.empty')}</p>` : `<ul class="history">${data.map((s) => `<li><button data-report="${s.id}">
      <span class="h-date">${esc(fmtDate(s.started_at))}</span>
      <span class="h-hours">${fmtTime(s.started_at)}–${s.ended_at ? fmtTime(s.ended_at) : t('history.open')}</span>
      <span class="h-site">${esc(s.sites?.name)}</span><span class="muted">${esc(agentName(s))}</span></button></li>`).join('')}</ul>`}
  </section>`;
  main.querySelectorAll('[data-report]').forEach((b) => { b.onclick = () => renderReport(main, b.dataset.report); });
}

async function renderReport(main, id) {
  main.innerHTML = `<p class="muted">${t('common.wait')}</p>`;
  const [s, e] = await Promise.all([
    db.from('shifts').select('*, sites(name, address)').eq('id', id).single(),
    db.from('log_entries').select('*').eq('shift_id', id).order('occurred_at').order('created_at'),
  ]);
  const shift = s.data;
  if (!shift) { main.innerHTML = `<p class="error">${esc(s.error?.message)}</p>`; return; }
  const entries = e.data || [];
  const byId = Object.fromEntries(entries.map((x) => [x.id, x]));
  const checks = Object.entries(shift.checklist || {});
  main.innerHTML = `<section class="report">
    <div class="row-between no-print"><button class="btn" id="back">${t('common.back')}</button>
      <div class="row-end"><button class="btn" id="print">${t('common.print')}</button>
      <button class="btn primary" id="pdf">${t('pdf.download')}</button></div></div>
    <div class="report-sheet">
      <header class="report-head"><p class="brand-big">Amcari</p><h1 class="h-page">${t('report.title')}</h1></header>
      <dl class="report-meta">
        <div><dt>${t('report.date')}</dt><dd>${esc(fmtDate(shift.started_at))}</dd></div>
        <div><dt>${t('report.site')}</dt><dd>${esc(shift.sites?.name)}</dd></div>
        <div><dt>${t('report.agent')}</dt><dd>${esc(agentName(shift))}</dd></div>
        <div><dt>${t('report.start')}</dt><dd>${fmtTime(shift.started_at)}</dd></div>
        <div><dt>${t('report.end')}</dt><dd>${shift.ended_at ? fmtTime(shift.ended_at) : t('history.open')}</dd></div>
      </dl>
      <h2 class="h-section">${t('report.instructions')}</h2><p class="pre">${esc(shift.instructions_received || t('report.none'))}</p>
      <div class="table-wrap"><table class="report-table">
        <thead><tr><th>${t('report.time')}</th><th>${t('report.event')}</th><th>${t('report.details')}</th></tr></thead>
        <tbody>${entries.map((x) => `<tr class="${x.outcome === 'anomaly' || ['incident', 'anomaly'].includes(x.type) ? 'is-anomaly' : ''}">
          <td class="num">${fmtTime(x.occurred_at)}${x.ended_at ? `–${fmtTime(x.ended_at)}` : ''}</td>
          <td>${esc(describe(x))}${x.person_category ? ` [${t(`cat.${x.person_category}`)}]` : ''}</td>
          <td>${x.authorised_by ? `${esc(t('entry.authorisedBy', { name: x.authorised_by }))}. ` : ''}${x.id_checked ? `${t('entry.idChecked')}. ` : ''}${esc(x.description || '')}
            ${x.corrects_entry_id ? `<em>${esc(t('entry.correcting', { time: fmtTime(byId[x.corrects_entry_id]?.occurred_at) }))}</em>` : ''}
            ${isLate(x) ? `<em>${esc(t('entry.late', { time: fmtTime(x.created_at) }))}</em>` : ''}
            ${(x.photos || []).length ? `<div class="thumbs" data-photos="${esc(JSON.stringify(x.photos))}"></div>` : ''}</td></tr>`).join('')}</tbody>
      </table></div>
      <h2 class="h-section">${t('report.handover')}</h2><p class="pre">${esc(shift.handover_notes || t('report.none'))}</p>
      ${checks.length ? `<h2 class="h-section">${t('report.checklist')}</h2><ul class="report-checks">${checks.map(([k, v]) =>
        `<li>${esc(k)} : <strong>${v ? t('report.yes') : t('report.no')}</strong></li>`).join('')}</ul>` : ''}
    </div></section>`;
  main.querySelector('#back').onclick = () => renderHistory(main);
  main.querySelector('#print').onclick = () => window.print();
  main.querySelector('#pdf').onclick = (ev) => exportShiftPdf(id, ev.currentTarget);
  hydratePhotos(main);
}


/* ---------- Service clôturé ---------- */
function renderClosed(main) {
  main.innerHTML = `<section class="panel narrow stack closed">
    <h1 class="h-page">${t('closed.title')}</h1>
    <p>${t('closed.body')}</p>
    <button class="btn primary big" id="cpdf">${t('pdf.download')}</button>
    <button class="btn big" id="cnew">${t('closed.new')}</button>
  </section>`;
  main.querySelector('#cpdf').onclick = (ev) => exportShiftPdf(closedShiftId, ev.currentTarget);
  main.querySelector('#cnew').onclick = () => { closedShiftId = null; render(); };
}

/* ---------- Export PDF ---------- */
let pdfFonts = null;
async function loadPdfFonts() {
  if (pdfFonts) return pdfFonts;
  const toB64 = (buf) => {
    const bytes = new Uint8Array(buf);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  };
  const [regular, bold] = await Promise.all(['Barlow-Regular.ttf', 'Barlow-SemiBold.ttf'].map(async (f) => {
    const res = await fetch(f);
    if (!res.ok) throw new Error(f);
    return toB64(await res.arrayBuffer());
  }));
  pdfFonts = { regular, bold };
  return pdfFonts;
}

const slug = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
const isoDate = (d) => { const x = new Date(d); return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`; };

async function exportShiftPdf(shiftId, btn) {
  const lib = window.jspdf;
  if (!lib || !lib.jsPDF || !lib.jsPDF.API.autoTable) { alert(t('pdf.unavailable')); window.print(); return; }
  const label = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = t('pdf.preparing'); }
  try {
    const [s, e] = await Promise.all([
      db.from('shifts').select('*, sites(name, address)').eq('id', shiftId).single(),
      db.from('log_entries').select('*').eq('shift_id', shiftId).order('occurred_at').order('created_at'),
    ]);
    if (!s.data) throw new Error(s.error ? s.error.message : 'shift');
    const shift = s.data;
    const entries = e.data || [];
    const byId = Object.fromEntries(entries.map((x) => [x.id, x]));

    const doc = new lib.jsPDF({ unit: 'mm', format: 'a4' });
    let font = 'helvetica';
    let clean = (x) => String(x ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[Đđ]/g, (c) => (c === 'Đ' ? 'D' : 'd')).replace(/[’‘]/g, "'").replace(/[“”«»]/g, '"').replace(/[–—]/g, '-').replace(/…/g, '...');
    try {
      const f = await loadPdfFonts();
      doc.addFileToVFS('Barlow-Regular.ttf', f.regular);
      doc.addFont('Barlow-Regular.ttf', 'Barlow', 'normal');
      doc.addFileToVFS('Barlow-SemiBold.ttf', f.bold);
      doc.addFont('Barlow-SemiBold.ttf', 'Barlow', 'bold');
      font = 'Barlow';
      clean = (x) => String(x ?? '');
    } catch { /* police indisponible : on garde Helvetica sans accents spéciaux */ }

    const W = 210; const H = 297; const M = 14;
    const INK = [14, 42, 51]; const MUTED = [86, 112, 122]; const ALERT = [190, 47, 55]; const LINE = [204, 216, 220];
    const siteName = shift.sites ? shift.sites.name : '';

    doc.setTextColor(...INK);
    doc.setFont(font, 'bold'); doc.setFontSize(22);
    doc.text('AMCARI', M, 19);
    doc.setFontSize(14);
    doc.text(clean(t('report.title')), W - M, 19, { align: 'right' });
    doc.setDrawColor(...INK); doc.setLineWidth(0.7); doc.line(M, 23, W - M, 23);

    doc.autoTable({
      startY: 27,
      body: [
        [t('report.date'), fmtDate(shift.started_at), t('report.site'), siteName],
        [t('report.agent'), agentName(shift), t('report.start') + ' / ' + t('report.end'),
          `${fmtTime(shift.started_at)} – ${shift.ended_at ? fmtTime(shift.ended_at) : t('history.open')}`],
      ].map((r) => r.map(clean)),
      theme: 'plain',
      styles: { font, fontSize: 10, cellPadding: { top: 1.2, bottom: 1.2, left: 0, right: 2 }, textColor: INK },
      columnStyles: { 0: { textColor: MUTED, cellWidth: 26 }, 1: { fontStyle: 'bold', cellWidth: 64 }, 2: { textColor: MUTED, cellWidth: 30 }, 3: { fontStyle: 'bold' } },
      margin: { left: M, right: M },
    });
    let y = doc.lastAutoTable.finalY + 6;

    const ensure = (h) => { if (y + h > H - 20) { doc.addPage(); y = 18; } };
    const section = (title, text) => {
      ensure(14);
      doc.setFont(font, 'bold'); doc.setFontSize(12); doc.setTextColor(...INK);
      doc.text(clean(title), M, y); y += 5.5;
      doc.setFont(font, 'normal'); doc.setFontSize(10);
      for (const line of doc.splitTextToSize(clean(text), W - 2 * M)) { ensure(5); doc.text(line, M, y); y += 4.6; }
      y += 3;
    };

    section(t('report.instructions'), shift.instructions_received || t('report.none'));

    const rows = entries.map((x) => {
      const details = [];
      if (x.person_category) details.push(t(`cat.${x.person_category}`));
      if (x.authorised_by) details.push(t('entry.authorisedBy', { name: x.authorised_by }));
      if (x.id_checked) details.push(t('entry.idChecked'));
      if (x.description) details.push(x.description);
      if (x.corrects_entry_id) details.push(t('entry.correcting', { time: fmtTime(byId[x.corrects_entry_id]?.occurred_at) || '?' }));
      if (isLate(x)) details.push(t('entry.late', { time: fmtTime(x.created_at) }));
      if ((x.photos || []).length) details.push(t('pdf.photosRef', { n: x.photos.length }));
      return [fmtTime(x.occurred_at) + (x.ended_at ? ` – ${fmtTime(x.ended_at)}` : ''), describe(x), details.join('\n')].map(clean);
    });
    const alertRows = entries.map((x) => x.outcome === 'anomaly' || ['incident', 'anomaly', 'correction'].includes(x.type));

    ensure(20);
    doc.autoTable({
      startY: y,
      head: [[t('report.time'), t('report.event'), t('report.details')].map(clean)],
      body: rows.length ? rows : [['', clean(t('pdf.noEntries')), '']],
      styles: { font, fontSize: 9.5, cellPadding: 2, valign: 'top', textColor: INK, lineColor: LINE, lineWidth: 0.15, overflow: 'linebreak' },
      headStyles: { fillColor: INK, textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [243, 246, 247] },
      columnStyles: { 0: { cellWidth: 25, fontStyle: 'bold' }, 1: { cellWidth: 62 } },
      margin: { left: M, right: M, top: 18, bottom: 20 },
      didParseCell: (d) => { if (d.section === 'body' && alertRows[d.row.index]) d.cell.styles.textColor = ALERT; },
    });
    y = doc.lastAutoTable.finalY + 8;

    section(t('report.handover'), shift.handover_notes || t('report.none'));
    const checks = Object.entries(shift.checklist || {});
    if (checks.length) section(t('report.checklist'), checks.map(([k, v]) => `${k} : ${v ? t('report.yes') : t('report.no')}`).join('\n'));


    // Annexe photos
    const withPhotos = entries.filter((x) => (x.photos || []).length);
    if (withPhotos.length) {
      const allPaths = withPhotos.flatMap((x) => x.photos);
      const urls = await signedUrls(allPaths);
      const imgs = {};
      await Promise.all(allPaths.map(async (p, i) => {
        try {
          const blob = await (await fetch(urls[i])).blob();
          const dataUrl = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(blob); });
          const dim = await new Promise((res) => { const im = new Image(); im.onload = () => res({ w: im.naturalWidth, h: im.naturalHeight }); im.onerror = () => res(null); im.src = dataUrl; });
          if (dim) imgs[p] = { dataUrl, ...dim };
        } catch { /* photo ignorée */ }
      }));
      doc.addPage();
      y = 20;
      doc.setFont(font, 'bold'); doc.setFontSize(14); doc.setTextColor(...INK);
      doc.text(clean(t('pdf.photos')), M, y);
      y += 8;
      const boxW = (W - 2 * M - 6) / 2;
      const boxH = 70;
      for (const x of withPhotos) {
        ensure(boxH + 12);
        doc.setFont(font, 'bold'); doc.setFontSize(10); doc.setTextColor(...INK);
        doc.text(clean(`${fmtTime(x.occurred_at)}  ${describe(x)}`), M, y);
        y += 4;
        let col = 0;
        for (const p of x.photos) {
          const im = imgs[p];
          if (!im) continue;
          if (col === 0) ensure(boxH + 4);
          const r = Math.min(boxW / im.w, boxH / im.h);
          doc.addImage(im.dataUrl, 'JPEG', M + col * (boxW + 6), y, im.w * r, im.h * r);
          if (col === 1) { y += boxH + 4; col = 0; } else col = 1;
        }
        if (col === 1) y += boxH + 4;
        y += 4;
      }
    }

    const total = doc.getNumberOfPages();
    const generated = clean(`${t('pdf.generated', { date: fmtDateTime(new Date()) })}. ${t('pdf.locked')}`);
    for (let n = 1; n <= total; n++) {
      doc.setPage(n);
      doc.setFont(font, 'normal'); doc.setFontSize(8); doc.setTextColor(...MUTED);
      doc.setDrawColor(...LINE); doc.setLineWidth(0.2); doc.line(M, H - 13, W - M, H - 13);
      doc.text(clean(`Amcari, ${siteName}, ${fmtDate(shift.started_at)}`), M, H - 9);
      doc.text(generated, M, H - 5.5);
      doc.text(clean(t('pdf.page', { n, total })), W - M, H - 9, { align: 'right' });
    }

    doc.save(`main-courante_${slug(siteName)}_${isoDate(shift.started_at)}_${slug(shift.agent_last_name || agentName(shift))}.pdf`);
  } catch (err) {
    alert(err && err.message ? err.message : String(err));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = label; }
  }
}

/* ---------- Lancement ---------- */
document.documentElement.lang = lang;
(async () => {
  if (db) await loadShift();
  render();
})();
})();
