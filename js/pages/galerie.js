/* Galerie — construit la grille à partir de js/data/galerie.js */
(function () {
    'use strict';
    var O = window.Outils;
    var grille = document.getElementById('galerie-grille');
    if (!grille || !window.GALERIE) return;

    grille.innerHTML = window.GALERIE.map(function (g) {
        var url = O.urlPhoto(g.fichier);
        return '<figure class="oeuvre">' +
            '<a href="' + url + '" target="_blank" rel="noopener">' +
                '<img src="' + url + '" alt="' + O.esc(g.alt || g.titre) + '" loading="lazy">' +
            '</a>' +
            '<figcaption><strong>' + O.esc(g.titre) + '</strong>Par ' + O.esc(g.auteur) + '</figcaption>' +
        '</figure>';
    }).join('');

    // Image introuvable : on garde la carte et on indique le fichier attendu
    Array.prototype.forEach.call(grille.querySelectorAll('img'), function (img, i) {
        function remplacer() {
            var manque = document.createElement('div');
            manque.className = 'oeuvre-manquante';
            manque.textContent = 'Image introuvable : assets/photos/' + window.GALERIE[i].fichier;
            if (img.parentNode) img.parentNode.replaceChild(manque, img);
        }
        img.addEventListener('error', remplacer);
        if (img.complete && img.naturalWidth === 0) remplacer();
    });
})();
