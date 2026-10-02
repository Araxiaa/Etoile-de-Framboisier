/* Vies — construit le compteur et la liste à partir de js/data/vies.js */
(function () {
    'use strict';
    var O = window.Outils;
    var vies = window.VIES || [];

    var compteur = document.getElementById('compteur-vies');
    if (compteur) compteur.innerHTML = O.compteurVies(vies);

    var liste = document.getElementById('liste-vies');
    if (liste) {
        liste.innerHTML = vies.map(function (v, i) {
            var perdue = v.statut === 'perdue';
            var etat = perdue
                ? '<span class="pastille neutre">Perdue' + (v.lune ? ' à ' + O.esc(v.lune) : '') + '</span>'
                : '<span class="pastille">Active</span>';
            return '<li class="vie ' + (perdue ? 'perdue' : 'active') + '">' +
                '<span class="vie-n" aria-hidden="true">' + (i + 1) + '</span>' +
                '<div class="vie-corps">' +
                    '<h3>' + O.esc(v.don) + ' ' + etat + '</h3>' +
                    '<p>' + O.esc(v.texte) + '</p>' +
                '</div>' +
            '</li>';
        }).join('');
    }
})();
