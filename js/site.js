/* ==========================================================================
   SITE — menu et pied de page, écrits une seule fois pour toutes les pages.
   Pour ajouter une page au menu : ajouter une ligne dans PAGES.
   ========================================================================== */
(function () {
    'use strict';

    var PAGES = [
        ['index.html',     'Accueil',          'accueil'],
        ['caractere.html', 'Caractère',        'caractere'],
        ['physique.html',  'Physique',         'physique'],
        ['lignee.html',    'Lignée',           'lignee'],
        ['relations.html', 'Relations',        'relations'],
        ['histoire.html',  'Histoire',         'histoire'],
        ['vies.html',      'Ses vies',         'vies'],
        ['journal.html',   'Journal des lunes', 'journal'],
        ['galerie.html',   'Galerie',          'galerie']
    ];

    var courante = document.body.getAttribute('data-page');

    var liens = PAGES.map(function (p) {
        var actif = p[2] === courante ? ' aria-current="page"' : '';
        return '<li><a href="' + p[0] + '"' + actif + '>' + p[1] + '</a></li>';
    }).join('');

    var entete = document.getElementById('entete');
    if (entete) {
        entete.className = 'site-header';
        entete.innerHTML =
            '<a class="lien-evitement" href="#contenu">Aller au contenu</a>' +
            '<div class="barre">' +
                '<a class="marque" href="index.html">Étoile de Framboisier</a>' +
                '<nav aria-label="Navigation principale"><ul class="menu">' + liens + '</ul></nav>' +
            '</div>';
    }

    var pied = document.getElementById('pied');
    if (pied) {
        pied.className = 'site-footer';
        pied.innerHTML =
            '<p>Codex d\u2019Étoile de Framboisier — Créé pour <em>@.araxia.</em></p>' +
            '<p>Inspiré de <em>@Oriyakii</em></p>';
    }

    // Portrait introuvable : l'arche garde son initiale à la place de la photo
    Array.prototype.forEach.call(document.querySelectorAll('.arche img'), function (img) {
        function retirer() { if (img.parentNode) img.parentNode.removeChild(img); }
        img.addEventListener('error', retirer);
        if (img.complete && img.naturalWidth === 0) retirer();
    });

    // ---------- Animations ----------
    // Retirer ce bloc pour supprimer toutes les animations du site.
    var feuille = document.createElement('link');
    feuille.rel = 'stylesheet';
    feuille.href = 'css/animations.css';
    document.head.appendChild(feuille);

    var anim = document.createElement('script');
    anim.src = 'js/animations.js';
    document.body.appendChild(anim);
})();
