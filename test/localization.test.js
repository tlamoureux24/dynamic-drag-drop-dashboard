import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveDashboardLanguage, translateDashboardText } from '../src/localization/i18n.js';

test('dashboard language follows Home Assistant locale and keeps English fallback', () => {
  assert.equal(resolveDashboardLanguage({ locale: { language: 'fr-FR' } }), 'fr');
  assert.equal(resolveDashboardLanguage({ language: 'fr' }), 'fr');
  assert.equal(resolveDashboardLanguage({ locale: { language: 'de-DE' } }), 'en');
});

test('common dashboard controls have French translations', () => {
  assert.equal(translateDashboardText('Dashboard Settings', 'fr'), 'Réglages du tableau de bord');
  assert.equal(translateDashboardText('Add & Save', 'fr'), 'Ajouter et enregistrer');
  assert.equal(translateDashboardText('Weather entity', 'fr'), 'Entité météo');
  assert.equal(translateDashboardText('Build your first dashboard.', 'fr'), 'Créez votre premier tableau de bord.');
  assert.equal(
    translateDashboardText('Double-click empty space to enter Edit Mode.', 'fr'),
    'Double-cliquez sur un espace vide pour passer en mode édition.'
  );
  assert.equal(translateDashboardText('Add a card', 'fr'), 'Ajouter une carte');
  assert.equal(translateDashboardText('Search compatible cards...', 'fr'), 'Rechercher des cartes compatibles…');
  assert.equal(translateDashboardText('2 compatible', 'fr'), '2 compatibles');
  assert.equal(translateDashboardText('1 matching entity', 'fr'), '1 entité correspondante');
  assert.equal(translateDashboardText('42 available', 'fr'), '42 disponibles');
  assert.equal(translateDashboardText('Unknown future label', 'fr'), 'Unknown future label');
  assert.equal(translateDashboardText('Dashboard Settings', 'en'), 'Dashboard Settings');
});
