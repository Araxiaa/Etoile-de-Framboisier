/* ==========================================================================
   OUTILS — petites fonctions partagées par les scripts de pages.
   (Rien à modifier ici pour changer un contenu.)
   ========================================================================== */
(function () {
    'use strict';

    // Protège le texte inséré dans le HTML
    function esc(texte) {
        return String(texte == null ? '' : texte)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // Les images sont toutes rangées dans assets/photos/
    function urlPhoto(fichier) {
        return 'assets/photos/' + encodeURIComponent(fichier);
    }

    // Pastille ronde : la photo si elle existe, sinon l'initiale du nom
    function avatar(nom, fichier, classe) {
        var initiale = esc(String(nom).charAt(0));
        var img = fichier
            ? '<img src="' + urlPhoto(fichier) + '" alt="" loading="lazy">'
            : '';
        return '<div class="avatar ' + (classe || '') + '" data-initiale="' + initiale + '">' + img + '</div>';
    }

    // À appeler après avoir inséré du HTML : retire les photos introuvables
    // pour laisser apparaître l'initiale.
    function activerAvatars(racine) {
        var imgs = (racine || document).querySelectorAll('.avatar img');
        Array.prototype.forEach.call(imgs, function (img) {
            function retirer() { if (img.parentNode) img.parentNode.removeChild(img); }
            img.addEventListener('error', retirer);
            if (img.complete && img.naturalWidth === 0) retirer();
        });
    }

    // Cœurs de l'index des relations (mêmes règles que sur Discord)
    //   affinite : 1 à 3 = appréciation, -1 à -3 = aversion, 0 = neutre
    //   respect  : true = étoile      mort : true = crâne
    function coeurs(rel) {
        var signes = '';
        var sens = [];
        var a = rel.affinite;
        if (typeof a === 'number') {
            if (a > 0) { signes += new Array(a + 1).join('\u2764\uFE0F'); sens.push('appréciation ' + a + '/3'); }
            else if (a < 0) { signes += new Array(-a + 1).join('\uD83D\uDDA4'); sens.push('aversion ' + (-a) + '/3'); }
            else { signes += '\u2764\uFE0F\uD83D\uDDA4'; sens.push('neutre'); }
        }
        if (rel.respect) { signes += (signes ? ' ' : '') + '\u2B50'; sens.push('respect'); }
        if (rel.mort) { signes += (signes ? ' ' : '') + '\uD83D\uDC80'; sens.push('décédé(e)'); }
        if (!signes) return '';
        return '<span class="coeurs" role="img" aria-label="' + esc(sens.join(', ')) + '">' + signes + '</span>';
    }

    // Rangée de neuf points : pleins = vies actives, vides = vies perdues
    function compteurVies(vies) {
        var actives = vies.filter(function (v) { return v.statut === 'active'; }).length;
        var points = vies.map(function (v) {
            return '<li class="point-vie ' + (v.statut === 'active' ? 'plein' : 'vide') + '"></li>';
        }).join('');
        return '<ul class="points-vies" role="img" aria-label="' + actives + ' vies sur ' + vies.length + '">' + points + '</ul>' +
               '<p class="points-legende">' + actives + ' vies sur ' + vies.length + '</p>';
    }

    window.Outils = {
        esc: esc, urlPhoto: urlPhoto, avatar: avatar, activerAvatars: activerAvatars,
        coeurs: coeurs, compteurVies: compteurVies
    };
})();
