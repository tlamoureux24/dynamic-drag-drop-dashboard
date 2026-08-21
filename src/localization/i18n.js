/* Lightweight runtime localization for the dashboard's dynamic shadow DOM. */

const FR = Object.freeze({
  'Dashboard Settings': 'Réglages du tableau de bord',
  'Open dashboard settings': 'Ouvrir les réglages du tableau de bord',
  'Layout': 'Disposition', 'Appearance': 'Apparence', 'Behaviour': 'Comportement',
  'Tabs': 'Onglets', 'Layers': 'Calques', 'Screen saver': 'Économiseur d’écran', 'Packages': 'Modules',
  'Add & Save': 'Ajouter et enregistrer', 'Clipboard': 'Presse-papiers',
  'Import & Share': 'Importer et partager', 'Settings': 'Réglages', 'Misc': 'Outils',
  'Layouts': 'Dispositions', 'View': 'Affichage', 'Status': 'État', 'System OK': 'Système OK',
  'Add Card': 'Ajouter une carte', 'Add card': 'Ajouter une carte', 'Save': 'Enregistrer',
  'Auto-save': 'Enregistrement auto', 'Toggle auto-save': 'Activer/désactiver l’enregistrement automatique',
  'On': 'Activé', 'Off': 'Désactivé', 'Copy': 'Copier', 'Paste': 'Coller', 'Undo': 'Annuler', 'Redo': 'Rétablir',
  'Import': 'Importer', 'Export': 'Exporter', 'Exit Edit Mode': 'Quitter le mode édition',
  'Exit edit mode': 'Quitter le mode édition', 'Add line': 'Ajouter une ligne', 'Reload': 'Recharger',
  'Diagnostics': 'Diagnostic', 'Editor: Light': 'Éditeur : clair', 'Editor: Dark': 'Éditeur : sombre',
  'Responsive Layout': 'Disposition adaptative', 'Live View': 'Vue réelle', 'Desktop': 'Ordinateur',
  'Tablet': 'Tablette', 'Mobile': 'Mobile', 'Expand toolbar': 'Déplier la barre d’outils',
  'Cancel': 'Annuler', 'Close': 'Fermer', 'Delete': 'Supprimer', 'Upload': 'Téléverser',
  'Browse Media': 'Parcourir les médias', 'Randomize': 'Aléatoire', 'Previous': 'Précédent', 'Next': 'Suivant',
  'Start here': 'Commencer ici', 'Build your first dashboard.': 'Créez votre premier tableau de bord.',
  'Choose how the canvas should behave, add your first card, then shape the dashboard visually on the grid.':
    'Choisissez le comportement du canevas, ajoutez votre première carte, puis composez visuellement le tableau de bord sur la grille.',
  '1. Pick a mode': '1. Choisir un mode', '2. Add cards': '2. Ajouter des cartes', '3. Play around': '3. Expérimenter',
  'Add your first card': 'Ajouter votre première carte', 'Dashboard settings': 'Réglages du tableau de bord',
  'Fixed Size (Full HD)': 'Taille fixe (Full HD)', '1920 x 1080 canvas': 'Canevas 1920 × 1080',
  'Auto': 'Automatique', 'Scales to the current viewport': 'S’adapte à la fenêtre actuelle',
  'Or:': 'Ou :', 'Import Existing Lovelace Dashboard': 'Importer un tableau de bord Lovelace existant',
  'Read the start guide': 'Lire le guide de démarrage',
  'Layout sets the rules for the canvas.': 'La disposition définit les règles du canevas.',
  'Storage key': 'Clé de stockage', 'Grid size': 'Taille de la grille', 'Quick canvas sizes': 'Tailles rapides du canevas',
  'Live snap while dragging': 'Alignement en direct pendant le déplacement', 'Prevent overlap': 'Empêcher le chevauchement',
  'Container size mode': 'Mode de taille du conteneur', 'Auto viewport limits': 'Limites automatiques de la fenêtre',
  'Keep text size fixed': 'Conserver une taille de texte fixe', 'Outer grid buffer': 'Marge extérieure de la grille',
  'Dashboard theme': 'Thème du tableau de bord', 'Editor appearance': 'Apparence de l’éditeur',
  'Container background': 'Fond du conteneur', 'Apply background to full page': 'Appliquer le fond à toute la page',
  'Card background': 'Fond des cartes', 'Card overflow': 'Débordement des cartes',
  'Card shadow': 'Ombre des cartes', 'Shadow intensity': 'Intensité de l’ombre',
  'Background type': 'Type de fond', 'None': 'Aucun', 'Image': 'Image',
  'Animated (particles.js)': 'Animé (particles.js)', 'YouTube video': 'Vidéo YouTube',
  'Background image': 'Image de fond', 'Default backgrounds': 'Fonds par défaut',
  'Image URL (e.g. /media/local/...)': 'URL de l’image (ex. /media/local/...)',
  'Repeat': 'Répétition', 'No repeat': 'Sans répétition', 'Repeat X': 'Répéter en X', 'Repeat Y': 'Répéter en Y',
  'Size': 'Taille', 'Cover': 'Couvrir', 'Contain': 'Contenir', 'Fill (stretch)': 'Remplir (étirer)',
  'Position': 'Position', 'Center': 'Centre', 'Top': 'Haut', 'Bottom': 'Bas', 'Left': 'Gauche', 'Right': 'Droite',
  'Top left': 'En haut à gauche', 'Top right': 'En haut à droite',
  'Bottom left': 'En bas à gauche', 'Bottom right': 'En bas à droite', 'Attachment': 'Attachement', 'Opacity': 'Opacité',
  'Dynamic Home24 scenes': 'Scènes Home24 dynamiques', 'Weather entity': 'Entité météo',
  'Solar entity (automatic fallback)': 'Entité solaire (repli automatique)',
  'Sunrise helper (optional)': 'Helper de lever du soleil (facultatif)',
  'Sunset helper (optional)': 'Helper de coucher du soleil (facultatif)',
  'Scenes directory URL': 'URL du dossier des scènes', 'Fallback image URL': 'URL de l’image de secours',
  'Used automatically when the optional sunrise and sunset helpers are unavailable.':
    'Utilisée automatiquement lorsque les helpers facultatifs de lever et coucher sont indisponibles.',
  'Selects one of the 40 scenes from weather plus sunrise/sunset-relative phases.':
    'Sélectionne l’une des 40 scènes selon la météo et les phases relatives au lever et au coucher du soleil.',
  'Auto save': 'Enregistrement automatique', 'Auto save delay (ms)': 'Délai d’enregistrement automatique (ms)',
  'Enable screen saver': 'Activer l’économiseur d’écran', 'Activation delay': 'Délai d’activation',
  'Custom background image': 'Image de fond personnalisée', 'Entities': 'Entités', 'Add entity': 'Ajouter une entité',
  'Tab position': 'Position des onglets', 'Tab size': 'Taille des onglets', 'Default tab': 'Onglet par défaut',
  'Enable layers': 'Activer les calques', 'Add layer': 'Ajouter un calque',
  'Name': 'Nom', 'Icon': 'Icône', 'Enabled': 'Activé', 'Disabled': 'Désactivé',
  'Appearance sets the visual language.': 'L’apparence définit le langage visuel.',
  'Behaviour controls dashboard feedback.': 'Le comportement contrôle les réactions du tableau de bord.',
  'Tabs split the dashboard into workspaces.': 'Les onglets divisent le tableau de bord en espaces de travail.',
  'Layers add visibility groups on top of tabs.': 'Les calques ajoutent des groupes de visibilité aux onglets.',
  'Screen saver controls the idle view.': 'L’économiseur contrôle l’affichage au repos.',
  'Packages turn dashboard ideas into Home Assistant YAML.': 'Les modules transforment les idées du tableau de bord en YAML Home Assistant.',
  'Animate cards': 'Animer les cartes', 'Play Loading animation': 'Jouer l’animation de chargement',
  'Hide Home Assistant header': 'Masquer l’en-tête Home Assistant',
  'Hide Home Assistant sidebar': 'Masquer la barre latérale Home Assistant',
  'Enable debug logging': 'Activer les journaux de débogage', 'Edit mode PIN / password': 'Code PIN / mot de passe du mode édition',
  'Apply current background to whole page': 'Appliquer le fond actuel à toute la page',
  'Card drop shadow': 'Ombre portée des cartes', 'Prioritize theme colors': 'Prioriser les couleurs du thème',
  'Light (recommended)': 'Clair (recommandé)', 'Dark': 'Sombre', 'Follow dashboard': 'Suivre le tableau de bord',
  'Named surfaces': 'Surfaces nommées', 'Presets': 'Préréglages', 'Randomize all style': 'Style entièrement aléatoire',
  'Fixed': 'Fixe', 'Fixed (custom)': 'Fixe (personnalisé)', 'Custom': 'Personnalisé', 'Preset': 'Préréglage',
  'Visible': 'Visible', 'Hidden': 'Masqué', 'Scroll': 'Défilement', 'Scroll when needed': 'Défiler si nécessaire',
  'Connection lines': 'Lignes de connexion', 'Add particles': 'Ajouter des particules',
  'Config JSON URL (optional)': 'URL de configuration JSON (facultative)',
  'Enable pointer interactivity (hover/click)': 'Activer l’interaction du pointeur (survol/clic)',
  'Particle count': 'Nombre de particules', 'Motion speed': 'Vitesse de déplacement', 'Particle size': 'Taille des particules',
  'Particle opacity': 'Opacité des particules', 'Line color': 'Couleur des lignes', 'Particle color': 'Couleur des particules',
  'Interaction distance': 'Distance d’interaction', 'Circle': 'Cercle', 'Triangle': 'Triangle', 'Star': 'Étoile', 'Polygon': 'Polygone',
  'Hover: repel': 'Survol : repousser', 'Hover: connect': 'Survol : connecter', 'Hover: glow': 'Survol : halo',
  'Hover: off': 'Survol : désactivé', 'Click action': 'Action au clic', 'Repel particles': 'Repousser les particules',
  'YouTube background': 'Fond YouTube', 'YouTube URL or video ID': 'URL YouTube ou identifiant de vidéo',
  'Tab bar size': 'Taille de la barre d’onglets', 'Tabs placement': 'Position des onglets', 'Add tab': 'Ajouter un onglet',
  'Show layer button details': 'Afficher les détails des boutons de calque',
  'Screen saver design': 'Style de l’économiseur d’écran', 'Status entities': 'Entités d’état',
  'Add automation': 'Ajouter une automatisation', 'Add script': 'Ajouter un script',
  'Add input boolean': 'Ajouter un booléen', 'Add input select': 'Ajouter une liste de sélection',
  'Add input text': 'Ajouter un texte', 'Add input number': 'Ajouter un nombre',
  'Add template sensor': 'Ajouter un capteur template', 'Add custom YAML': 'Ajouter du YAML personnalisé',
  'Check package sync': 'Vérifier la synchronisation des modules', 'Select theme…': 'Sélectionner un thème…',
  'Live width cap': 'Largeur réelle maximale', 'Max scale': 'Échelle maximale', 'Empty or 0': 'Vide ou 0',
  'Edge': 'Bord', 'min': 'min',
  'Saved': 'Enregistré', 'Unsaved changes': 'Modifications non enregistrées',
  'Previous screen saver design': 'Économiseur précédent', 'Next screen saver design': 'Économiseur suivant',
  'Previous background': 'Fond précédent', 'Next background': 'Fond suivant',
});

const ATTRIBUTES = ['aria-label', 'title', 'data-tooltip', 'placeholder'];

export function resolveDashboardLanguage(hass) {
  const language = String(hass?.locale?.language || hass?.language || globalThis.navigator?.language || 'en').toLowerCase();
  return language.startsWith('fr') ? 'fr' : 'en';
}

export function translateDashboardText(value, language = 'en') {
  if (language !== 'fr') return String(value ?? '');
  return FR[String(value ?? '').trim()] || String(value ?? '');
}

function translateTextNode(node, language) {
  const raw = String(node.nodeValue || '');
  const trimmed = raw.trim();
  if (!trimmed) return;
  const translated = translateDashboardText(trimmed, language);
  if (translated === trimmed) return;
  node.nodeValue = `${raw.match(/^\s*/)?.[0] || ''}${translated}${raw.match(/\s*$/)?.[0] || ''}`;
}

export function translateDashboardTree(root, language = 'en') {
  if (!root || language === 'en') return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root, language);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
  if (root.nodeType === Node.ELEMENT_NODE) {
    for (const attribute of ATTRIBUTES) {
      const value = root.getAttribute?.(attribute);
      if (!value) continue;
      const translated = translateDashboardText(value, language);
      if (translated !== value) root.setAttribute(attribute, translated);
    }
  }
  for (const child of root.childNodes || []) translateDashboardTree(child, language);
}

const localizationMethods = {
  _dashboardLanguage_() {
    return resolveDashboardLanguage(this._hass);
  },

  _translateDashboardUi_(root = this.shadowRoot) {
    translateDashboardTree(root, this._dashboardLanguage_?.() || 'en');
  },

  _startDashboardLocalization_() {
    this._stopDashboardLocalization_?.();
    const root = this.shadowRoot;
    if (!root) return;
    this._translateDashboardUi_?.(root);
    this.__dashboardLocalizationObserver = new MutationObserver((mutations) => {
      const language = this._dashboardLanguage_?.() || 'en';
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') translateDashboardTree(mutation.target, language);
        mutation.addedNodes?.forEach?.((node) => translateDashboardTree(node, language));
      }
    });
    this.__dashboardLocalizationObserver.observe(root, { childList: true, subtree: true, characterData: true });
  },

  _stopDashboardLocalization_() {
    this.__dashboardLocalizationObserver?.disconnect?.();
    this.__dashboardLocalizationObserver = null;
  },
};

export function installLocalizationMethods(proto) {
  for (const [name, value] of Object.entries(localizationMethods)) {
    Object.defineProperty(proto, name, { configurable: true, writable: true, value });
  }
}
