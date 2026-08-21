<div align="center">

<p><a href="README.md">English</a> · <strong>Français</strong></p>

# Dynamic Drag & Drop Dashboard pour Home Assistant

**Une intégration Home Assistant complète pour créer visuellement des tableaux de bord libres, adaptatifs et dynamiques.**

[Installation](#installation) · [Démarrage rapide](#démarrage-rapide) · [Fonds dynamiques](#fonds-dynamiques) · [Dépannage](#dépannage)

</div>

Dynamic Drag & Drop Dashboard permet de placer, déplacer et redimensionner librement des cartes Lovelace sur un canevas. L’intégration réunit le frontend, le stockage Home Assistant, les tableaux de bord communautaires et le moteur de fonds météo dans un seul paquet HACS.

## Fonctionnalités principales

- Placement libre, redimensionnement, grille magnétique et sélection multiple.
- Dispositions distinctes pour ordinateur, tablette, mobile, portrait et paysage.
- Onglets, calques, connecteurs et barre latérale.
- Import et export de tableaux complets.
- Sauvegarde locale dans Home Assistant, partagée entre les navigateurs.
- Fonds par image, particules, vidéo YouTube ou scènes Home24 dynamiques.
- Économiseur d’écran et modes d’affichage mural.
- Interface française ou anglaise selon la langue de Home Assistant.

## Installation

### Avec HACS

1. Ouvrez HACS puis **Dépôts personnalisés**.
2. Ajoutez `https://github.com/tlamoureux24/dynamic-drag-drop-dashboard`.
3. Choisissez la catégorie **Intégration**.
4. Installez **Dynamic Drag & Drop Dashboard**.
5. Redémarrez Home Assistant.
6. Ouvrez **Paramètres → Appareils et services → Ajouter une intégration**.
7. Ajoutez **Dynamic Drag & Drop Dashboard**.

Après une mise à jour, rechargez complètement le navigateur avec `Ctrl + F5` si l’ancien frontend reste en cache.

### Installation manuelle

Copiez le dossier `custom_components/dynamic_drag_drop_dashboard` dans le dossier `custom_components` de votre configuration Home Assistant, puis redémarrez Home Assistant et ajoutez l’intégration depuis **Appareils et services**.

## Démarrage rapide

### Créer un tableau de bord complet

Sur les versions compatibles de Home Assistant :

1. Ouvrez **Paramètres → Tableaux de bord**.
2. Sélectionnez **Ajouter un tableau de bord**.
3. Choisissez **Dynamic Drag & Drop Dashboard** dans les tableaux communautaires.
4. Ouvrez le nouveau tableau.
5. Sur l’écran de démarrage, choisissez une taille fixe ou le mode automatique.
6. Cliquez sur **Ajouter votre première carte**.

### Ajouter la carte dans un tableau existant

Ajoutez **Dynamic Drag & Drop Dashboard** depuis le sélecteur de cartes Home Assistant ou utilisez :

```yaml
type: custom:dynamic-drag-drop-dashboard
storage_key: mon_tableau_principal
grid: 20
auto_save: true
container_size_mode: auto
```

Utilisez une valeur `storage_key` courte, stable et unique pour chaque canevas.

### Passer en mode édition

- Double-cliquez sur un espace vide du canevas ; ou
- effectuez un appui long d’environ une seconde sur un espace vide.

Vous pourrez ensuite ajouter des cartes, les déplacer, les redimensionner et ouvrir les réglages du tableau de bord.

## Fonds dynamiques

Le mode **Scènes Home24 dynamiques** choisit un fond selon la météo et la phase solaire. L’entité météo est configurable. Les helpers de lever et coucher du soleil sont facultatifs : l’intégration utilise automatiquement `sun.sun` lorsqu’ils sont absents.

Placez les images dans :

```text
/config/www/home24/backgrounds/scenes/
```

Placez l’image de secours dans :

```text
/config/www/home24/backgrounds/home24-day-v4.png
```

Les URL correspondantes dans les réglages sont :

```text
/local/home24/backgrounds/scenes
/local/home24/backgrounds/home24-day-v4.png
```

## Importer un tableau Lovelace

Depuis l’écran de démarrage ou le menu **Importer et partager**, choisissez **Importer un tableau de bord Lovelace existant**. Vérifiez l’aperçu et les avertissements avant de confirmer la conversion.

Les cartes personnalisées utilisées par le tableau source doivent également être installées sur Home Assistant.

## Sauvegarde et partage

Les dispositions sont enregistrées dans Home Assistant. Le menu d’import/export permet également de créer une copie JSON transportable contenant les cartes, les positions et les réglages du tableau.

## Dépannage

### L’intégration n’apparaît pas après installation

- Vérifiez que la dernière version est installée dans HACS.
- Redémarrez complètement Home Assistant.
- Rechargez le navigateur avec `Ctrl + F5`.
- Vérifiez la présence de `/config/custom_components/dynamic_drag_drop_dashboard/manifest.json`.

### Le frontend semble ancien

Le navigateur peut conserver le bundle JavaScript précédent. Effectuez un rechargement forcé ou videz les données du site Home Assistant.

### Le fond dynamique ne s’affiche pas

- Vérifiez l’entité météo configurée.
- Vérifiez que `sun.sun` existe ou renseignez les helpers facultatifs.
- Ouvrez directement une image avec une URL `/local/home24/backgrounds/...` pour contrôler son accessibilité.

### L’icône est absente uniquement dans HACS

Home Assistant utilise correctement les images locales fournies par l’intégration. Certaines versions du frontend HACS affichent encore une image générique pour les intégrations personnalisées ; ce défaut est uniquement visuel et n’empêche pas l’installation.

## Projet et assistance

- [Versions publiées](https://github.com/tlamoureux24/dynamic-drag-drop-dashboard/releases)
- [Signaler un problème](https://github.com/tlamoureux24/dynamic-drag-drop-dashboard/issues)
- [Attribution au projet d’origine](UPSTREAM.md)

Le projet est distribué sous licence MIT. Consultez également [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
