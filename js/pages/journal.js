/* ==========================================================================
   Journal — construit la page à partir de js/data/journal.js
   Les sujets d'une même lune sont regroupés. Un bouton inverse l'ordre.
   ========================================================================== */
(function () {
    'use strict';
    var O = window.Outils;
    var donnees = window.JOURNAL || [];

    var fil = document.getElementById('journal-fil');
    var bilan = document.getElementById('journal-bilan');
    var bouton = document.getElementById('journal-ordre');
    if (!fil) return;

    var recentEnPremier = false;

    function enCours(e) { return e.enCours === true || e.enCours === 'true'; }

    // Regroupe par lune en gardant l'ordre du fichier de données
    function grouper() {
        var groupes = [], index = {};
        donnees.forEach(function (e) {
            if (!(e.lune in index)) {
                index[e.lune] = groupes.length;
                groupes.push({ lune: e.lune, sujets: [] });
            }
            groupes[index[e.lune]].sujets.push(e);
        });
        return groupes;
    }

    function compagnons(c) {
        var liste = Array.isArray(c) ? c : String(c || '').split(',');
        return liste.map(function (n) { return n.trim(); }).filter(function (n) { return n && n !== '—'; });
    }

    function sujet(e) {
        var aUnLien = e.lien && e.lien !== '#';
        var titre = aUnLien
            ? '<a href="' + O.esc(e.lien) + '" target="_blank" rel="noopener">' + O.esc(e.titre) + '</a>'
            : O.esc(e.titre);

        var avec = compagnons(e.compagnons);
        var pastilles = avec.map(function (n) {
            return '<li class="pastille neutre">' + O.esc(n) + '</li>';
        }).join('');

        return '<li class="sujet' + (enCours(e) ? ' en-cours' : '') + '">' +
            '<div class="sujet-tete">' +
                '<h3>' + titre + '</h3>' +
                (enCours(e) ? '<span class="pastille roux">En cours</span>' : '') +
            '</div>' +
            '<p class="sujet-resume">' + O.esc(e.resume) + '</p>' +
            (avec.length
                ? '<div class="sujet-avec"><span>Avec</span><ul class="pastilles">' + pastilles + '</ul></div>'
                : '') +
        '</li>';
    }

    function groupe(g) {
        var nombre = String(g.lune).match(/\d+/);
        var etiquette = nombre
            ? '<span class="lune-num">' + nombre[0] + '</span><span class="lune-unit">' + (nombre[0] === '1' ? 'lune' : 'lunes') + '</span>'
            : '<span class="lune-unit">' + O.esc(g.lune) + '</span>';
        var n = g.sujets.length;
        return '<section class="lune-groupe">' +
            '<h2 class="lune-titre">' + etiquette + '<span class="lune-compte">' + n + (n > 1 ? ' sujets' : ' sujet') + '</span></h2>' +
            '<ol class="lune-sujets">' + g.sujets.map(sujet).join('') + '</ol>' +
        '</section>';
    }

    function rendre() {
        var groupes = grouper();
        if (recentEnPremier) {
            groupes.reverse();
            groupes.forEach(function (g) { g.sujets.reverse(); });
        }
        fil.innerHTML = groupes.map(groupe).join('');
    }

    if (bilan) {
        var total = donnees.length;
        var encours = donnees.filter(enCours).length;
        bilan.textContent = total + (total > 1 ? ' sujets joués' : ' sujet joué') +
            (encours ? ', dont ' + encours + ' en cours' : '') + '. Chaque titre ouvre le sujet sur Discord.';
    }

    if (bouton) {
        bouton.addEventListener('click', function () {
            recentEnPremier = !recentEnPremier;
            bouton.setAttribute('aria-pressed', String(recentEnPremier));
            bouton.textContent = recentEnPremier ? 'Revenir à l\u2019ordre chronologique' : 'Voir le plus récent en premier';
            rendre();
        });
    }

    rendre();
})();
