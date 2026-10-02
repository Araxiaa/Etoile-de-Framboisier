/* Lignée — construit l'arbre à partir de js/data/lignee.js */
(function () {
    'use strict';
    var O = window.Outils;
    var D = window.LIGNEE;

    var CLASSE_ETIQUETTE = {
        'vivant': 'neutre', 'vivant-pj': '', 'decede': 'neutre',
        'disparu': 'roux', 'vide': 'neutre', 'heros': 'defaut'
    };

    function fiche(m) {
        var statut = m.statut || 'vivant';
        var etiquette = m.etiquette
            ? '<span class="pastille ' + CLASSE_ETIQUETTE[statut] + '">' + O.esc(m.etiquette) + '</span>'
            : '';
        var tag = m.tag ? '<span class="pastille roux">' + O.esc(m.tag) + '</span>' : '';
        return '<article class="fiche-chat statut-' + statut + '">' +
            O.avatar(m.nom, statut === 'vide' ? null : m.photo) +
            '<h4>' + O.esc(m.nom) + '</h4>' +
            (m.role ? '<p class="fiche-role">' + O.esc(m.role) + '</p>' : '') +
            '<div class="fiche-etiquettes">' + etiquette + tag + '</div>' +
            (m.joueur ? '<p class="fiche-joueur">' + O.esc(m.joueur) + '</p>' : '') +
        '</article>';
    }

    function groupe(g) {
        return '<div class="groupe' + (g.couple ? ' couple' : '') + '">' +
            (g.titre ? '<h4 class="groupe-titre">' + O.esc(g.titre) + '</h4>' : '') +
            '<div class="membres">' + g.membres.map(fiche).join('') + '</div>' +
        '</div>';
    }

    function generation(gen) {
        return '<section class="generation">' +
            '<h3 class="gen-titre">' + O.esc(gen.titre) + '</h3>' +
            '<div class="groupes">' + gen.groupes.map(groupe).join('') + '</div>' +
        '</section>';
    }

    var origine = document.getElementById('origine');
    if (origine) origine.textContent = 'Répartition : ' + D.origine;

    var arbre = document.getElementById('arbre');
    if (arbre) {
        arbre.innerHTML = D.generations.map(generation).join('<div class="lien-gen" aria-hidden="true"></div>');
        O.activerAvatars(arbre);
    }
})();
