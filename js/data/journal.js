/* ==========================================================================
   JOURNAL DES LUNES — une ligne par sujet joué sur Discord.
   Pour ajouter un sujet : copier un bloc { ... } (virgule entre deux blocs).

   ⚠ TEXTES : écris-les toujours entre BACKTICKS ( ` ) et non entre apostrophes.
     Les backticks acceptent les apostrophes, les guillemets et les accents :
         titre: `Clapotis d'Étang`        ✔ fonctionne
         titre: 'Clapotis d'Étang'        ✘ le fichier plante
     Sur un clavier AZERTY, le backtick se tape avec  AltGr + 7  (puis Espace).
     Seules choses à éviter dans un texte : un backtick ( ` ) et la suite ${

   Champs :
     lune         ex. `20 lunes`  (les sujets d'une même lune sont regroupés)
     titre        intitulé du sujet
     lien         adresse du sujet (laisser `#` tant qu'il n'y en a pas)
     compagnons   avec qui il joue, séparés par des virgules
     resume       résumé de l'évolution
     enCours      true si la scène n'est pas terminée (ajoute « En cours »)
                  ⚠ true sans guillemets
   ========================================================================== */
window.JOURNAL = [
    {
        lune: `20 lunes`,
        titre: `Quelques miaulements au sein du camp`,
        lien: `https://discord.com/channels/1463578265292640592/1522637539494723584`,
        compagnons: `Nuage de Nénuphar, Clapotis d'Étang`,
        resume: `Une petite discussion après une journée chargée.`
    },
    {
        lune: `20 lunes`,
        titre: `Une patrouille de nuit`,
        lien: `https://discord.com/channels/1463578265292640592/1535679687039389806`,
        compagnons: `Éclat d'Orage, Clapotis d'Étang, Nuage de Nénuphar, Chasseuse de Bulle`,
        resume: `Une patrouille de frontière qui se retrouve catastrophique après une chute de Chasseuse de Bulle.`
    },
    {
        lune: `20 lunes`,
        titre: `Moment de Partage`,
        lien: `https://discord.com/channels/1463578265292640592/1546913906977407076`,
        compagnons: `Nuage de Nénuphar, Clapotis d'Étang, Étincelle Ambrée`,
        resume: `Une discussion agréable entre Étoile de Framboisier, Clapotis d'Étang, Étincelle Ambrée et anciennement Nuage de Nénuphar. Ils finissent leur discussion quand Étincelle Ambrée et la jeune guerrière se préparent pour aller chasser.`
    },
    {
        lune: `22 lunes`,
        titre: `Discussion au Zénith`,
        lien: `https://discord.com/channels/1463578265292640592/1553737399484289155`,
        compagnons: `Étoile de Framboisier, Chant de Cigale`,
        resume: `Durant sa visite au Clan du Tonnerre, Chant de Cigale voulut une discussion avec Étoile de Framboisier. Malheureusement, la discussion ne se passa pas comme prévu pour Chant de Cigale.`
    },
    {
        lune: `22 lunes`,
        titre: `Baptême de deux nouveaux guerriers`,
        lien: `https://discord.com/channels/1463578265292640592/1553798494769389640`,
        compagnons: `Clan du Tonnerre`,
        resume: `Baptême de guerrier. Nuage de Nénuphar fut nommée Veille de Nénuphar. Nuage du Cormoran fut nommée Piquée du Cormoran.`
    },
    {
        lune: `22 lunes`,
        titre: `Une explication`,
        lien: `https://discord.com/channels/1463578265292640592/1553778040499347536`,
        compagnons: `Clapotis d'Étang, Sauge Cendré`,
        resume: `Après le départ de la délégation du Clan du Vent, Étoile de Framboisier souhaite une explication de la part de Sauge Cendré, après avoir appris de la bouche de Chant de Cigale qu'il y a eu un conflit.`,
        enCours: true
    },
    {
        lune: `22 lunes`,
        titre: `Le clan en fête !`,
        lien: `https://discord.com/channels/1463578265292640592/1553819203599859763`,
        compagnons: `Clan du Tonnerre`,
        resume: `Après le baptême de Veille de Nénuphar et de Piquée du Cormoran, le Clan du Tonnerre est en fête !`,
        enCours: true
    }
];
