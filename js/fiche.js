/* ==========================================================================
   FICHE — l'évolution d'un avis au fil des lunes (courbe + liste d'avis datés).
   Utilisée par « Son monde » (relations) et « Le règne » (diplomatie, Clan des Étoiles).

   Fiche.ouvrir(r)           ouvre la fenêtre qui défile pour le chat / groupe r
   Fiche.inserer(zone, r)    affiche la même chose directement dans la page
   r = Outils.normaliserRelation({ nom, role, clan, joueur, photo, mort, avis: [...] })
   ========================================================================== */
(function () {
    'use strict';
    var O = window.Outils;
    var e = O.esc;

    function dernier(r) { return r.avis[r.avis.length - 1] || {}; }

    function courbe(r) {
        var pts = r.avis.filter(function (a) { return typeof a.affinite === 'number'; });
        if (pts.length < 2) return '';
        var L = 560, H = 120, m = 22;
        var x = function (i) { return m + (L - 2 * m) * i / (pts.length - 1); };
        var y = function (v) { return m + (H - 2 * m) * (3 - v) / 6; };
        var ligne = pts.map(function (a, i) { return x(i).toFixed(1) + ',' + y(a.affinite).toFixed(1); }).join(' ');
        var points = pts.map(function (a, i) {
            return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(a.affinite).toFixed(1) + '" r="5.5" class="' +
                (a.affinite > 0 ? 'pt-aime' : a.affinite < 0 ? 'pt-aversion' : 'pt-neutre') + '"/>';
        }).join('');
        return '<figure class="courbe">' +
            '<svg viewBox="0 0 ' + L + ' ' + H + '" role="img" aria-label="Évolution de l’affinité au fil des lunes">' +
                '<line x1="' + m + '" x2="' + (L - m) + '" y1="' + y(0) + '" y2="' + y(0) + '" class="zero"/>' +
                '<polyline points="' + ligne + '" class="trace"/>' + points +
            '</svg>' +
            '<figcaption><span>' + e(pts[0].lune || '') + '</span><span class="note-main">l’évolution de son cœur</span><span>' + e(pts[pts.length - 1].lune || '') + '</span></figcaption>' +
        '</figure>';
    }

    function avisHtml(a, estDernier) {
        return '<li class="avis' + (estDernier ? ' actuel' : '') + '">' +
            '<span class="avis-noeud" aria-hidden="true"></span>' +
            '<div class="avis-tete">' +
                '<span class="avis-lune">' + e(a.lune || 'Lune inconnue') + '</span>' +
                O.coeurs({ affinite: a.affinite, respect: a.respect }) +
                (estDernier ? '<span class="pastille">Avis actuel</span>' : '') +
            '</div>' +
            (a.texte ? '<p>' + O.amorce(a.texte) + '</p>' : '') +
        '</li>';
    }

    // Courbe + liste (le plus récent en premier si demandé)
    function corps(r, recentEnPremier) {
        var liste = r.avis.map(function (a, i) { return avisHtml(a, i === r.avis.length - 1 && r.avis.length > 1); });
        if (recentEnPremier) liste.reverse();
        var nb = r.avis.length;
        if (!nb) return '<p class="vide">Pas encore d’avis écrit.</p>';
        return courbe(r) +
            '<div class="fr-outils"><h3>' + nb + (nb > 1 ? ' avis au fil des lunes' : ' avis') + '</h3>' +
                (nb > 1 ? '<button type="button" class="ordre-avis bouton bouton-clair bouton-petit">' +
                    (recentEnPremier ? 'Du plus ancien au plus récent' : 'Le plus récent en premier') + '</button>' : '') +
            '</div>' +
            '<ol class="avis-liste">' + liste.join('') + '</ol>';
    }

    // Affiche le corps dans une zone et gère le bouton d'ordre
    function inserer(zone, r) {
        var recent = false;
        function dessiner() { zone.innerHTML = corps(r, recent); }
        zone.onclick = function (ev) {
            var b = ev.target.closest ? ev.target.closest('.ordre-avis') : null;
            if (!b) return;
            recent = !recent;
            dessiner();
        };
        dessiner();
    }

    var boite = null;
    function joueur(j) {
        if (!j) return '';
        return j.charAt(0) === '@' ? 'Joué par <strong>' + e(j) + '</strong>' : e(j);
    }
    function creer() {
        boite = document.createElement('dialog');
        boite.className = 'fiche-relation';
        boite.setAttribute('aria-label', 'Fiche de relation');
        boite.innerHTML = '<button class="vis-fermer" type="button" aria-label="Fermer">×</button><div class="fr-contenu"></div>';
        document.body.appendChild(boite);
        boite.querySelector('.vis-fermer').addEventListener('click', function () { boite.close(); });
        boite.addEventListener('click', function (ev) { if (ev.target === boite) boite.close(); });
    }

    function ouvrir(r) {
        if (typeof HTMLDialogElement !== 'function') return;
        if (!boite) creer();
        var d = dernier(r);
        boite.querySelector('.fr-contenu').innerHTML =
            '<header class="fr-tete">' +
                O.avatar(r.categorie ? O.motCle(r.nom) : r.nom, r.photo, 'enorme') +
                '<div>' +
                    '<h2>' + e(r.nom) + '</h2>' +
                    '<p class="fr-meta">' +
                        (r.role ? '<span class="pastille neutre">' + e(r.role) + '</span> ' : '') +
                        (r.clan !== undefined ? '<span class="pastille ' + (r.clan ? 'sauge' : 'neutre') + '">' + e(r.clan || 'Sans clan') + '</span> ' : '') +
                        O.coeurs({ affinite: d.affinite, respect: d.respect, mort: r.mort }) +
                    '</p>' +
                    (r.joueur ? '<p class="relation-joueur">' + joueur(r.joueur) + '</p>' : '') +
                '</div>' +
            '</header>' +
            '<div class="fr-corps"></div>';
        inserer(boite.querySelector('.fr-corps'), r);
        O.activerAvatars(boite);
        boite.showModal();
        boite.querySelector('.fr-corps').scrollTop = 0;
    }

    window.Fiche = { ouvrir: ouvrir, inserer: inserer, corps: corps };
})();
