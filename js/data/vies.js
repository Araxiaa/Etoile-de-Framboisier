/* ==========================================================================
   VIES — les neuf vies d'Étoile de Framboisier.
   Quand une vie est perdue : passer statut à 'perdue', puis remplir
   lune ("15 lunes") et, si besoin, ajuster le texte.

   Champs :
     don      la qualité transmise par cette vie
     statut   'active' ou 'perdue'
     lune     âge auquel la vie a été perdue (seulement si perdue)
     texte    description du don, ou circonstances de la perte
   ========================================================================== */
window.VIES = [
    {
        don: 'Bravoure',
        statut: 'perdue',
        lune: '15 lunes',
        texte: 'Poussé du haut des Rochers du Soleil par son propre frère, Épine de Fraisier. Ce dernier souhaitait lâchement vérifier si son nouveau statut de chef lui octroyait réellement le don divin des neuf vies.'
    },
    {
        don: 'Sérénité',
        statut: 'active',
        texte: 'Le don d\'un esprit apaisé pour guider son clan sans céder à la panique de la forêt.'
    },
    {
        don: 'Empathie',
        statut: 'active',
        texte: 'La capacité de ressentir et comprendre la douleur des siens, mais aussi celle de ses rivaux.'
    },
    {
        don: 'Loyauté',
        statut: 'active',
        texte: 'L\'attachement indéfectible aux valeurs du Clan du Tonnerre et à la protection de ses membres.'
    },
    {
        don: 'Patience',
        statut: 'active',
        texte: 'La force d\'attendre et d\'observer avant d\'agir, essentielle pour un meneur pacifique.'
    },
    {
        don: 'Sagesse',
        statut: 'active',
        texte: 'Le discernement nécessaire pour faire appliquer la Charte de la Concorde et rejeter la guerre inutile.'
    },
    {
        don: 'Résilience',
        statut: 'active',
        texte: 'La faculté de se relever après les pires traumatismes, du deuil de sa portée à la mort de son ancien chef.'
    },
    {
        don: 'Humilité',
        statut: 'active',
        texte: 'Pour ne jamais oublier qu\'un chef n\'est rien sans ses guerriers, malgré le masque de fierté qu\'il s\'impose.'
    },
    {
        don: 'Espoir',
        statut: 'active',
        texte: 'La certitude qu\'un avenir radieux et pacifique attend ses chatons au sein de la forêt.'
    }
];
