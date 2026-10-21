/* Son monde — lignée et relations.
   Données : js/data/lignee.js, relations.js, textes.js (ou la base Supabase). */
window.Donnees.pret(function () {
    'use strict';
    var O = window.Outils;
    var e = O.esc;

    /* ---------- Lignée ---------- */
    var D = window.LIGNEE;
    var CLASSE_ETIQUETTE = {
        'vivant': 'sauge', 'vivant-pj': '', 'decede': 'neutre',
        'disparu': 'roux', 'vide': 'neutre', 'heros': 'defaut'
    };

    function fiche(m) {
        var statut = m.statut || 'vivant';
        var etiquette = m.etiquette
            ? '<span class="pastille ' + (CLASSE_ETIQUETTE[statut] || '') + '">' + e(m.etiquette) + '</span>' : '';
        var tag = m.tag ? '<span class="pastille roux">' + e(m.tag) + '</span>' : '';
        return '<article class="fiche-chat statut-' + statut + '">' +
            O.avatar(m.nom, statut === 'vide' ? null : m.photo) +
            '<h4>' + e(m.nom) + '</h4>' +
            (m.role ? '<p class="fiche-role">' + e(m.role) + '</p>' : '') +
            '<div class="fiche-etiquettes">' + etiquette + tag + '</div>' +
            (m.joueur ? '<p class="fiche-joueur">' + e(m.joueur) + '</p>' : '') +
        '</article>';
    }
    function groupe(g) {
        return '<div class="groupe' + (g.couple ? ' couple' : '') + '">' +
            (g.titre ? '<h4 class="groupe-titre">' + e(g.titre) + '</h4>' : '') +
            '<div class="membres">' + (g.membres || []).map(fiche).join('') + '</div>' +
        '</div>';
    }
    function generation(gen) {
        return '<section class="generation">' +
            '<h3 class="gen-titre">' + e(gen.titre) + '</h3>' +
            '<div class="groupes">' + (gen.groupes || []).map(groupe).join('') + '</div>' +
        '</section>';
    }
    var origine = document.getElementById('origine');
    if (origine && D && D.origine) origine.innerHTML = '<span class="note-main">Répartition</span> ' + e(D.origine);
    var arbre = document.getElementById('arbre');
    if (arbre && D) {
        arbre.innerHTML = (D.generations || []).map(generation).join('<div class="lien-gen" aria-hidden="true"></div>');
        O.activerAvatars(arbre);
    }

    /* ---------- Relations ---------- */
    var legende = document.getElementById('legende');
    if (legende) {
        var c = O.icone('coeur'), s = O.icone('sombre');
        legende.innerHTML =
            '<li><span class="coeurs">' + c + c + c + '</span> Appréciation, l’intensité croît avec le nombre</li>' +
            '<li><span class="coeurs">' + s + s + s + '</span> Aversion, l’intensité croît avec le nombre</li>' +
            '<li><span class="coeurs">' + c + s + '</span> Neutre</li>' +
            '<li><span class="coeurs">' + O.icone('etoile') + '</span> Respect</li>' +
            '<li><span class="coeurs">' + O.icone('crane') + '</span> Décédé(e)</li>';
    }
    var M = (window.TEXTES && window.TEXTES.monde) || {};
    var clan = document.getElementById('clan-texte');
    if (clan && M.clan) {
        clan.innerHTML = '<h3>Relation au Clan du Tonnerre</h3>' +
            M.clan.map(function (p) { return '<p>' + O.amorce(p.texte) + '</p>'; }).join('');
    }

    function joueur(j) {
        if (!j) return '';
        return j.charAt(0) === '@' ? 'Joué par <strong>' + e(j) + '</strong>' : e(j);
    }
    var rels = (window.RELATIONS || []).map(O.normaliserRelation);
    var SANS_CLAN = 'Sans clan';
    function clanDe(r) { return r.clan || SANS_CLAN; }

    // L'avis le plus récent (le dernier de la liste) résume la carte
    function dernier(r) { return r.avis[r.avis.length - 1] || {}; }
    function symboles(r, avis) {
        return O.coeurs({ affinite: avis.affinite, respect: avis.respect, mort: r.mort });
    }

    function carte(r, i) {
        var nb = r.avis.length;
        return '<li class="relation' + (r.mort ? ' defunt' : '') + '" data-clan="' + e(clanDe(r)) + '">' +
            '<button type="button" class="relation-bouton" data-i="' + i + '" aria-haspopup="dialog">' +
                O.avatar(r.nom, r.photo, 'grand') +
                '<span class="relation-corps">' +
                    '<span class="relation-nom">' + e(r.nom) + '</span>' +
                    '<span class="relation-meta">' +
                        (r.role ? '<span class="pastille neutre">' + e(r.role) + '</span>' : '') +
                        '<span class="pastille ' + (r.clan ? 'sauge' : 'neutre') + '">' + e(clanDe(r)) + '</span>' +
                    '</span>' +
                    '<span class="relation-bas">' + symboles(r, dernier(r)) +
                        '<span class="relation-nb">' + nb + ' avis</span></span>' +
                '</span>' +
            '</button>' +
        '</li>';
    }
    var visages = document.getElementById('visages');
    if (visages) {
        visages.innerHTML = rels.map(carte).join('');
        O.activerAvatars(visages);
    }

    // Filtres par clan / groupe, créés à partir des données
    var filtres = document.getElementById('filtres');
    if (filtres) {
        var clansVus = [];
        rels.forEach(function (r) { if (clansVus.indexOf(clanDe(r)) < 0) clansVus.push(clanDe(r)); });
        if (clansVus.length > 1) {
            filtres.innerHTML = ['Tous'].concat(clansVus).map(function (nom, i) {
                return '<button type="button" class="filtre" data-f="' + e(nom) + '" aria-pressed="' + (i === 0) + '">' + e(nom) + '</button>';
            }).join('');
            filtres.addEventListener('click', function (ev) {
                var b = ev.target.closest ? ev.target.closest('.filtre') : null;
                if (!b) return;
                var f = b.getAttribute('data-f');
                Array.prototype.forEach.call(filtres.children, function (x) { x.setAttribute('aria-pressed', String(x === b)); });
                Array.prototype.forEach.call(visages.children, function (li) {
                    li.hidden = f !== 'Tous' && li.getAttribute('data-clan') !== f;
                });
            });
        } else filtres.hidden = true;
    }

    // Un clic ouvre la fiche : évolution de l'avis au fil des lunes (js/fiche.js)
    if (visages) {
        visages.addEventListener('click', function (ev) {
            var b = ev.target.closest ? ev.target.closest('.relation-bouton') : null;
            if (b) window.Fiche.ouvrir(rels[parseInt(b.getAttribute('data-i'), 10)]);
        });
    }
});
