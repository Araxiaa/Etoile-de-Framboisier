/* Relations — construit la liste à partir de js/data/relations.js */
(function () {
    'use strict';
    var O = window.Outils;

    function joueur(j) {
        if (!j) return '';
        return j.charAt(0) === '@' ? 'Joué par <strong>' + O.esc(j) + '</strong>' : O.esc(j);
    }

    function ligne(r) {
        var meta = [];
        if (r.role) meta.push('<span class="pastille neutre">' + O.esc(r.role) + '</span>');
        if (r.clan) meta.push('<span class="pastille neutre">' + O.esc(r.clan) + '</span>');
        if (r.joueur) meta.push('<span class="relation-joueur">' + joueur(r.joueur) + '</span>');

        return '<li class="relation">' +
            O.avatar(r.nom, r.photo) +
            '<div class="relation-corps">' +
                '<div class="relation-tete"><h3>' + O.esc(r.nom) + '</h3>' + O.coeurs(r) + '</div>' +
                '<p class="relation-meta">' + meta.join(' ') + '</p>' +
                '<p class="relation-texte">' + O.esc(r.texte) + '</p>' +
            '</div>' +
        '</li>';
    }

    var liste = document.getElementById('visages');
    if (liste && window.RELATIONS) {
        liste.innerHTML = window.RELATIONS.map(ligne).join('');
        O.activerAvatars(liste);
    }
})();
