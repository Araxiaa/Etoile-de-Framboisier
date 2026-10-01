/* ==========================================================================
   ANIMATIONS — la partie qui demande un peu de code.
   Les effets purement visuels sont dans css/animations.css.
   ========================================================================== */
(function () {
    'use strict';

    var reduit = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    /* ---------- Le ciel : quelques nuages derrière la page ---------- */
    function ciel() {
        var conteneur = document.createElement('div');
        conteneur.className = 'ciel';
        conteneur.setAttribute('aria-hidden', 'true');

        // [haut %, largeur vw, hauteur px, durée s, décalage s, opacité, position fixe vw]
        [
            [ 4, 34, 80, 120, -20, 0.55, 12],
            [22, 26, 64, 150, -90, 0.40, 62],
            [40, 30, 90, 180, -50, 0.35, 30]
        ].forEach(function (n) {
            var nuage = document.createElement('div');
            nuage.className = 'nuage';
            nuage.style.cssText =
                'top:' + n[0] + '%;width:' + n[1] + 'vw;height:' + n[2] + 'px;' +
                '--duree:' + n[3] + 's;--decalage:' + n[4] + 's;--opacite:' + n[5] + ';--fixe:' + n[6] + 'vw;';
            conteneur.appendChild(nuage);
        });
        document.body.insertBefore(conteneur, document.body.firstChild);
    }

    /* ---------- Pétales de freesia (accueil uniquement) ---------- */
    function petales() {
        var hero = document.querySelector('.hero');
        if (!hero || reduit) return;

        var conteneur = document.createElement('div');
        conteneur.className = 'petales';
        conteneur.setAttribute('aria-hidden', 'true');

        var couleurs = ['var(--roux-pale)', 'var(--framboise-pale)', '#fff', 'var(--roux-pale)'];
        for (var i = 0; i < 9; i++) {
            var p = document.createElement('span');
            p.className = 'petale';
            p.style.cssText =
                '--x:' + (6 + i * 10.5) + '%;' +
                '--t:' + (10 + (i * 7) % 9) + 'px;' +
                '--d:' + (14 + (i * 5) % 9) + 's;' +
                '--delai:-' + (i * 2.3).toFixed(1) + 's;' +
                '--c:' + couleurs[i % 4] + ';';
            conteneur.appendChild(p);
        }
        hero.insertBefore(conteneur, hero.firstChild);
    }

    /* ---------- Le portrait suit la souris, très légèrement ---------- */
    function portrait() {
        var img = document.querySelector('.arche img');
        var survol = window.matchMedia && window.matchMedia('(hover: hover)').matches;
        if (!img || reduit || !survol) return;

        var attente = false, x = 0, y = 0;
        document.addEventListener('pointermove', function (e) {
            x = e.clientX / window.innerWidth - 0.5;
            y = e.clientY / window.innerHeight - 0.5;
            if (attente) return;
            attente = true;
            window.requestAnimationFrame(function () {
                img.style.transform = 'translate(' + (x * -10).toFixed(1) + 'px,' + (y * -8).toFixed(1) + 'px) scale(1.07)';
                attente = false;
            });
        });
    }

    /* ---------- Apparition des blocs au défilement ---------- */
    function reveler() {
        if (reduit || !('IntersectionObserver' in window)) return;

        var cibles = '.periode, .sujet, .relation, .vie, .generation, .lien-gen, ' +
                     '.oeuvre, .charte li, .diplomatie .panneau';

        var observateur = new IntersectionObserver(function (entrees) {
            var rang = 0;
            entrees.forEach(function (e) {
                if (!e.isIntersecting) return;
                var el = e.target;
                el.style.transitionDelay = Math.min(rang, 4) * 80 + 'ms';
                rang++;
                el.classList.add('vu');
                observateur.unobserve(el);
                // le décalage ne doit pas ralentir les survols ensuite
                el.addEventListener('transitionend', function nettoyer() {
                    el.style.transitionDelay = '';
                    el.removeEventListener('transitionend', nettoyer);
                });
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        Array.prototype.forEach.call(document.querySelectorAll(cibles), function (el) {
            // ce qui est déjà visible à l'ouverture de la page ne bouge pas
            if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
            el.classList.add('a-reveler');
            observateur.observe(el);
        });
    }

    function init() {
        ciel();
        petales();
        portrait();
        reveler();
    }

    // Les listes (relations, vies, arbre…) sont construites par les scripts de page :
    // on attend que la page soit entièrement lue.
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
