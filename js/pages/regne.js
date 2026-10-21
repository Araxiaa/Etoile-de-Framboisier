/* Le règne — charte, diplomatie, Clan des Étoiles, actions pour le clan.
   Données : js/data/textes.js (charte), diplomatie.js, actions.js (ou la base Supabase). */
window.Donnees.pret(function () {
    'use strict';
    var O = window.Outils;
    var e = O.esc;

    /* ---------- Sa charte ---------- */
    var T = (window.TEXTES && window.TEXTES.accueil) || {};
    function texte(id, v) { var el = document.getElementById(id); if (el && v) el.textContent = v; }
    texte('charte-titre', T.charte_titre);
    texte('charte-intro', T.charte_intro);
    var articles = document.getElementById('charte-articles');
    if (articles && T.charte) {
        articles.innerHTML = T.charte.map(function (a) {
            return '<li class="article">' +
                '<span class="article-num" aria-hidden="true">' + e(a.num) + '</span>' +
                '<h3>' + e(a.titre) + '</h3>' +
                (a.sous ? '<p class="article-sous">' + e(a.sous) + '</p>' : '') +
                '<p>' + e(a.texte) + '</p>' +
            '</li>';
        }).join('');
    }

    /* ---------- Diplomatie : clans voisins et groupes ---------- */
    var tous = (window.DIPLOMATIE || []).map(O.normaliserRelation);
    var voisins = tous.filter(function (r) { return r.categorie !== 'etoiles'; });
    var liste = document.getElementById('voisins');
    if (liste) {
        liste.innerHTML = voisins.map(function (r, i) {
            var d = r.avis[r.avis.length - 1] || {};
            var nb = r.avis.length;
            return '<li class="relation">' +
                '<button type="button" class="relation-bouton" data-i="' + i + '" aria-haspopup="dialog">' +
                    O.avatar(O.motCle(r.nom), r.photo, 'grand') +
                    '<span class="relation-corps">' +
                        '<span class="relation-nom">' + e(r.nom) + '</span>' +
                        '<span class="relation-meta">' + (r.role ? '<span class="pastille ' + (r.categorie === 'groupe' ? 'roux' : 'sauge') + '">' + e(r.role) + '</span>' : '') + '</span>' +
                        '<span class="relation-bas">' + O.coeurs({ affinite: d.affinite, respect: d.respect }) +
                            '<span class="relation-nb">' + (nb ? nb + ' avis' : 'pas encore d’avis') + '</span></span>' +
                    '</span>' +
                '</button>' +
            '</li>';
        }).join('');
        O.activerAvatars(liste);
        liste.addEventListener('click', function (ev) {
            var b = ev.target.closest ? ev.target.closest('.relation-bouton') : null;
            if (b) window.Fiche.ouvrir(voisins[parseInt(b.getAttribute('data-i'), 10)]);
        });
    }

    /* ---------- Le Clan des Étoiles : sa fiche, directement dans la page ---------- */
    var etoiles = tous.filter(function (r) { return r.categorie === 'etoiles'; })[0];
    var zone = document.getElementById('etoiles-fiche');
    if (zone) {
        if (etoiles) {
            texte('etoiles-role', etoiles.role);
            zone.innerHTML = '<div class="etoiles-tete"><span class="etoiles-sceau" aria-hidden="true">' + O.icone('etoile') + '</span>' +
                '<h3>' + e(etoiles.nom) + '</h3></div><div class="etoiles-corps"></div>';
            window.Fiche.inserer(zone.querySelector('.etoiles-corps'), etoiles);
        } else zone.hidden = true;
    }

    /* ---------- Ses actions pour le clan ---------- */
    var actions = document.getElementById('actions-liste');
    var A = window.ACTIONS || [];
    if (actions) {
        actions.innerHTML = A.map(function (a, i) {
            return '<li class="action">' +
                '<span class="action-num" aria-hidden="true">' + (i + 1) + '</span>' +
                '<div class="action-corps">' +
                    (a.lune ? '<span class="action-lune">' + e(a.lune) + '</span>' : '') +
                    '<h3>' + e(a.titre) + '</h3>' +
                    '<p>' + O.amorce(a.texte || '') + '</p>' +
                '</div>' +
            '</li>';
        }).join('');
    }
});
