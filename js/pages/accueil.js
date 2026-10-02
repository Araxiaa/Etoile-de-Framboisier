/* Accueil — affiche le compteur de vies (données : js/data/vies.js) */
(function () {
    'use strict';
    var cible = document.getElementById('compteur-vies');
    if (cible && window.VIES) cible.innerHTML = window.Outils.compteurVies(window.VIES);
})();
