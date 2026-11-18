# Backoffice réservations

Petit backoffice de suivi des réservations de voyages d'affaires (train, avion, taxi, hôtel).
Les données sont fictives et servies par une fausse API en mémoire.

## Lancer le projet

Node 18 ou plus récent.

```
npm install
npm run dev      # application
npm test         # tests unitaires (Vitest)
npm run typecheck
```

## Organisation

```
src/
  api/                 fausse API (latence simulée) et types métier
  components/ui/       composants d'interface partagés
  features/bookings/   page de liste des réservations
  hooks/               hooks partagés
  utils/               formatage, filtres, validation
```
