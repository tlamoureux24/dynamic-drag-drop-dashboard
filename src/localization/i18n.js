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
  'Exit edit mode': 'Quitter le mode édition', 'Add line': 'Ajouter une ligne', 'Add Line': 'Ajouter une ligne',
  'Finish Line': 'Terminer la ligne', 'Reload': 'Recharger', 'Refresh': 'Actualiser', 'Restore': 'Restaurer',
  'Restore last deleted layout': 'Restaurer la dernière disposition supprimée',
  'Diagnostics': 'Diagnostic', 'Editor: Light': 'Éditeur : clair', 'Editor: Dark': 'Éditeur : sombre',
  'Responsive Layout': 'Disposition adaptative', 'Live View': 'Vue réelle', 'Desktop': 'Ordinateur',
  'Tablet': 'Tablette', 'Mobile': 'Mobile', 'Expand toolbar': 'Déplier la barre d’outils',
  'Only available in Auto Mode': 'Disponible uniquement en mode Automatique',
  'LAYOUT:': 'DISPOSITION :', 'W': 'L', 'H': 'H',
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
  'Show all styles': 'Afficher tous les styles', 'Show fewer styles': 'Afficher moins de styles',
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
  'Wiki: Layout': 'Wiki : disposition', 'Wiki: Appearance': 'Wiki : apparence',
  'Wiki: Behaviour': 'Wiki : comportement', 'Wiki: Tabs': 'Wiki : onglets',
  'Wiki: Layers': 'Wiki : calques', 'Wiki: Screen saver': 'Wiki : économiseur d’écran',
  'Wiki: Packages': 'Wiki : modules', 'Wiki: Overview': 'Wiki : vue d’ensemble',
  'Fine-tune grid density, snapping, responsive sizing, and how cards sit on the page.':
    'Ajustez la densité de la grille, l’alignement, le dimensionnement adaptatif et la position des cartes.',
  'Tune themes, background media, card surfaces, shadows, and dashboard-wide effects.':
    'Ajustez les thèmes, les médias de fond, les surfaces des cartes, les ombres et les effets globaux.',
  'Configure animation, auto save, edit access, debug logging, and how much Home Assistant chrome stays visible.':
    'Configurez les animations, l’enregistrement automatique, l’accès à l’édition, le débogage et les éléments Home Assistant visibles.',
  'Decide when the overlay appears, what it shows, and which design it uses.':
    'Choisissez quand la surcouche apparaît, ce qu’elle affiche et le style qu’elle utilise.',
  'Create views for different rooms, modes, or dashboards without duplicating the whole layout.':
    'Créez des vues pour différentes pièces ou différents modes sans dupliquer toute la disposition.',
  'Toggle groups of cards for modes like day, night, guests, or maintenance without moving them.':
    'Affichez ou masquez des groupes de cartes selon le mode jour, nuit, invités ou maintenance, sans les déplacer.',
  'Build automations, scripts, helpers, sensors, and custom package blocks from one place.':
    'Créez des automatisations, scripts, helpers, capteurs et blocs YAML personnalisés depuis un seul endroit.',
  'Use a stable key to reuse the same saved layout after deleting or recreating the dashboard card.':
    'Utilisez une clé stable pour retrouver la même disposition après suppression ou recréation de la carte.',
  'Smaller cells give finer placement; larger cells keep layouts easier to align.':
    'Des cellules plus petites offrent un placement précis ; des cellules plus grandes facilitent l’alignement.',
  'Use these as starting points for common displays. You can still switch to Auto, a custom size, or a preset below.':
    'Utilisez ces tailles comme point de départ. Vous pourrez toujours choisir le mode automatique, une taille personnalisée ou un préréglage.',
  'Cards follow grid lines while you drag, which makes precise layouts easier.':
    'Les cartes suivent la grille pendant leur déplacement afin de faciliter un placement précis.',
  'Stops cards from landing on top of each other while you edit.':
    'Empêche les cartes de se superposer pendant la modification.',
  "Auto chooses separate Desktop, Tablet, and Mobile layouts from the browser's CSS viewport. For one fixed wall panel, use Fixed (custom) or Preset.":
    'Le mode automatique choisit une disposition distincte pour ordinateur, tablette et mobile. Pour un écran mural fixe, utilisez Fixe (personnalisé) ou Préréglage.',
  'Keeps labels readable when the canvas scales. Useful for wall panels and smaller screens.':
    'Conserve des libellés lisibles lors du redimensionnement du canevas, notamment sur les écrans muraux et les petits écrans.',
  'When off, cards can sit flush with every canvas edge. When on, this adds the selected number of grid cells around the layout.':
    'Désactivée, les cartes peuvent toucher les bords. Activée, cette option ajoute le nombre choisi de cellules autour de la disposition.',
  'Pick the Home Assistant theme this dashboard should inherit from.': 'Choisissez le thème Home Assistant dont ce tableau de bord doit hériter.',
  'Controls DDC toolbars, dialogs, and editing controls only. The dashboard theme is restored when edit mode closes.':
    'Contrôle uniquement les barres d’outils, fenêtres et commandes d’édition. Le thème du tableau de bord revient à la fermeture du mode édition.',
  'Optional: let the selected theme win over dashboard colors, card shadows, and per-card design overrides.':
    'Facultatif : donne la priorité au thème sur les couleurs, les ombres et les personnalisations propres aux cartes.',
  'Supports hex, rgba(), and Home Assistant theme variables.': 'Accepte les couleurs hex, rgba() et les variables de thème Home Assistant.',
  'Extends the current background across the full Lovelace view, not just the card canvas.':
    'Étend le fond actuel à toute la vue Lovelace, et pas seulement au canevas des cartes.',
  'Sets the base surface behind every draggable card.': 'Définit la surface de base derrière chaque carte déplaçable.',
  'Sets the dashboard default for every card. A card-specific overflow setting still takes priority.':
    'Définit le comportement par défaut de toutes les cartes. Un réglage propre à une carte reste prioritaire.',
  'Adds depth to card containers so they separate more clearly from the canvas.':
    'Ajoute du relief aux cartes afin de mieux les détacher du canevas.',
  'Controls how subtle or deep dashboard card shadows should feel.': 'Règle la discrétion ou la profondeur des ombres des cartes.',
  'Choose the visual layer that sits behind your cards.': 'Choisissez la couche visuelle placée derrière les cartes.',
  'Small uploads can be stored inline. For large media, host the file under /local/ and paste the URL.':
    'Les petits fichiers peuvent être intégrés directement. Pour les médias volumineux, placez-les sous /local/ et collez leur URL.',
  'Leave empty to use the built-in motion preset. For custom JSON, host it under /local/.':
    'Laissez vide pour utiliser le mouvement intégré. Pour un JSON personnalisé, placez-le sous /local/.',
  'Keep this off when dragging should always win over particle interaction.':
    'Laissez désactivé pour que le déplacement des cartes reste prioritaire sur les particules.',
  'Video stays behind your cards, starts muted, and ignores pointer events so dragging remains smooth.':
    'La vidéo reste derrière les cartes, démarre sans son et ignore le pointeur afin de préserver la fluidité.',
  'Adds polished transitions when cards move or resize.': 'Ajoute des transitions fluides lors du déplacement ou redimensionnement des cartes.',
  'Shows a short initial loading reveal when the dashboard page opens.': 'Affiche une courte animation de chargement à l’ouverture du tableau de bord.',
  'Saves drag, resize, and edit changes automatically.': 'Enregistre automatiquement les déplacements, redimensionnements et modifications.',
  'How long to wait after the last change before saving. Lower values save more often.':
    'Délai après la dernière modification avant l’enregistrement. Une valeur basse enregistre plus souvent.',
  'Writes extra layout diagnostics to the browser console.': 'Écrit des informations de diagnostic supplémentaires dans la console du navigateur.',
  'Require this code before Edit Mode opens. Leave blank for no lock.': 'Demande ce code avant l’ouverture du mode édition. Laissez vide pour ne pas verrouiller.',
  'Hides the top app bar during normal use. It returns automatically in Edit Mode.':
    'Masque la barre supérieure en utilisation normale. Elle réapparaît automatiquement en mode édition.',
  'Hides the left navigation drawer so the dashboard gets more room.': 'Masque le menu latéral gauche afin de laisser plus de place au tableau de bord.',
  'Shows a full-screen idle overlay with time, date, and optional status entities.':
    'Affiche une surcouche plein écran avec l’heure, la date et des entités d’état facultatives.',
  'Minutes of inactivity before the screen saver appears.': 'Nombre de minutes d’inactivité avant l’apparition de l’économiseur.',
  'Choose the full-screen idle experience. Each preview is rendered from the actual design preset.':
    'Choisissez l’affichage plein écran au repos. Chaque aperçu utilise réellement le style correspondant.',
  'Optional image that replaces the selected preset background while keeping the same screen saver layout.':
    'Image facultative remplaçant le fond du style sélectionné tout en conservant sa disposition.',
  'Only selected Home Assistant entities appear. Empty slots stay hidden.': 'Seules les entités Home Assistant sélectionnées apparaissent. Les emplacements vides restent masqués.',
  'Controls where the regular tabs bar sits around the dashboard.': 'Définit la position de la barre d’onglets autour du tableau de bord.',
  'Scales the tab controls while preserving touch-friendly sizing and viewport alignment.':
    'Redimensionne les onglets tout en conservant une taille tactile et un alignement adaptés.',
  'Use a short, unique name. Cards remember which tab they belong to.': 'Utilisez un nom court et unique. Les cartes mémorisent leur onglet.',
  'When enabled, cards can belong to one or more layers and be shown or hidden from the layer bar.':
    'Une fois activées, les cartes peuvent appartenir à plusieurs calques et être affichées ou masquées depuis leur barre.',
  'Shows the Layers label and active count beside the icon. Off keeps the layer button compact.':
    'Affiche le libellé Calques et le nombre actif près de l’icône. Désactivé, le bouton reste compact.',
  'Layer IDs stay stable behind the scenes, so you can rename labels later without breaking assigned cards.':
    'Les identifiants des calques restent stables : vous pouvez renommer leurs libellés sans perdre les cartes assignées.',
  'Each entry becomes a package bundle. Use Custom YAML when the guided shortcuts do not cover what you need.':
    'Chaque entrée devient un module. Utilisez YAML personnalisé lorsque les raccourcis proposés ne suffisent pas.',
  'Small uploads can be stored inline. For large media, host the file under':
    'Les petits fichiers peuvent être intégrés directement. Pour les médias volumineux, placez-les sous',
  'and paste the URL.': 'et collez leur URL.',
  'Leave empty to use the built-in motion preset. For custom JSON, host it under':
    'Laissez vide pour utiliser le mouvement intégré. Pour un JSON personnalisé, placez-le sous',
  'Each entry becomes a package bundle. Use': 'Chaque entrée devient un module. Utilisez',
  'when the guided shortcuts do not cover what you need.': 'lorsque les raccourcis proposés ne suffisent pas.',
  'is an upper limit in CSS pixels, not a target resolution. For example, 2560 uses the available browser width up to 2560 px; it does not force a 2560 px canvas.':
    'est une limite supérieure en pixels CSS, pas une résolution cible. Par exemple, 2560 utilise la largeur disponible jusqu’à 2560 px sans imposer un canevas de cette taille.',
  'sets how much the whole canvas may grow. For example, 1 means the canvas never grows beyond its original design size, while 1.2 allows 20% enlargement.':
    'définit l’agrandissement maximal du canevas. Par exemple, 1 conserve sa taille d’origine et 1,2 autorise un agrandissement de 20 %.',
  'keeps the previous unlimited behavior.': 'conserve le comportement précédent sans limite.',
  'Preset size': 'Taille prédéfinie', 'Orientation': 'Orientation', 'Unlimited': 'Illimité',
  'Stored, but only used while the container size mode is Auto.':
    'Enregistré, mais utilisé uniquement lorsque le mode de taille du conteneur est Automatique.',
  'Keeps text at its design size when the Auto canvas scale changes.':
    'Conserve la taille de texte prévue lorsque l’échelle automatique du canevas change.',
  'Landscape': 'Paysage', 'Portrait': 'Portrait',
  'No themes found': 'Aucun thème trouvé', 'No themes were found from Home Assistant.': 'Aucun thème trouvé dans Home Assistant.',
  'Select a dashboard theme before override mode can take control.':
    'Sélectionnez d’abord un thème pour pouvoir lui donner la priorité.',
  'Layers are off. Turn them on to create visibility groups for modes, rooms, or temporary states.':
    'Les calques sont désactivés. Activez-les pour créer des groupes de visibilité par mode, pièce ou état temporaire.',
  'VisionOS Glass': 'Verre VisionOS', 'Minimal Scandi': 'Scandinave minimal', 'Cinematic Dashboard': 'Tableau de bord cinématique',
  'Layered glass, date card and calm Home status.': 'Verre superposé, carte de date et état paisible de la maison.',
  'Quiet horizon, large clock and a slim status rail.': 'Horizon paisible, grande horloge et fine barre d’état.',
  'Warm scene, greeting text and dashboard tiles.': 'Scène chaleureuse, message d’accueil et tuiles du tableau de bord.',
  'Friday, May 15': 'Vendredi 15 mai', '1. VisionOS Glass': '1. Verre VisionOS',
  '2. Minimal Scandi': '2. Scandinave minimal', '3. Cinematic Dashboard': '3. Tableau de bord cinématique',
  'Sci-Fi HUD': 'Interface science-fiction', 'Dynamic Ambient': 'Ambiance dynamique',
  'Floating Islands': 'Îlots flottants', 'Ultra Minimal Dot UI': 'Interface à points ultra-minimale',
  'Home Intelligence': 'Maison intelligente', 'Planetary Orbital': 'Orbite planétaire',
  'Animated rings, calendar grid and technical dock.': 'Anneaux animés, grille de calendrier et barre technique.',
  'Soft landscape colors with a centered glass rail.': 'Couleurs douces de paysage avec une barre vitrée centrée.',
  'Time and widgets float in separate glass islands.': 'L’heure et les widgets flottent dans des îlots vitrés distincts.',
  'Sparse clock with colored dot status list.': 'Horloge épurée avec une liste d’états à points colorés.',
  'Readable home summary with calendar and insights.': 'Résumé lisible de la maison avec calendrier et informations utiles.',
  'Planet-centered layout with orbiting status capsules.': 'Disposition centrée sur une planète avec des états en orbite.',
  '4. Sci-Fi HUD': '4. Interface science-fiction', '5. Dynamic Ambient': '5. Ambiance dynamique',
  '6. Floating Islands': '6. Îlots flottants', '7. Ultra Minimal Dot UI': '7. Interface à points ultra-minimale',
  '8. Home Intelligence': '8. Maison intelligente', '9. Planetary Orbital': '9. Orbite planétaire',
  'Alarm': 'Alarme', 'Weather': 'Météo', 'Energy': 'Énergie', 'Entity': 'Entité',
  'Display label (optional)': 'Libellé affiché (facultatif)',
  'Alarm, lock, person, presence, or house mode entity.': 'Entité d’alarme, serrure, personne, présence ou mode de la maison.',
  'Weather, outdoor temperature, or any outside sensor.': 'Entité météo, température extérieure ou autre capteur extérieur.',
  'Power, energy, price, battery, or utility sensor.': 'Capteur de puissance, énergie, tarif, batterie ou service public.',
  'https://example.com/image.jpg or upload a file': 'https://exemple.fr/image.jpg ou téléversez un fichier',
  'Reload Home Assistant after changing packages so new helpers, scripts, automations, and package-based entities are picked up.':
    'Redémarrez Home Assistant après avoir modifié les modules afin de charger les nouveaux helpers, scripts, automatisations et entités.',
  'Run package sync diagnostics to check backend support, package directory access, and detected files.':
    'Lancez le diagnostic de synchronisation pour vérifier le backend, l’accès au dossier des modules et les fichiers détectés.',
  'No package features yet. Use the shortcuts above to add helpers, automations, scripts, template sensors, or custom YAML.':
    'Aucun module pour le moment. Utilisez les raccourcis ci-dessus pour ajouter des helpers, automatisations, scripts, capteurs template ou du YAML personnalisé.',
  'Saved': 'Enregistré', 'Unsaved changes': 'Modifications non enregistrées',
  'Previous screen saver design': 'Économiseur précédent', 'Next screen saver design': 'Économiseur suivant',
  'Previous background': 'Fond précédent', 'Next background': 'Fond suivant',
});

const ATTRIBUTES = ['aria-label', 'title', 'data-tooltip', 'placeholder', 'label'];

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
