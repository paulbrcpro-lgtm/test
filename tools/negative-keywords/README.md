# Audit termes de recherche Google Ads

Script CLI qui prend un export CSV « Termes de recherche » depuis Google Ads, le classifie via Claude (garder / exclure / à revoir) en fonction de l'objectif de la campagne, et produit un `.xlsx` multi-onglets prêt à partager au client.

## Ce qui est produit

Un fichier Excel à 6 onglets :

1. **Synthèse** — KPIs globaux, % du budget sur termes à exclure, top 10 économies potentielles
2. **Top dépensiers** — tous les termes triés par coût, avec décision + justification
3. **Candidats négatifs** — uniquement les termes à exclure, avec type de match suggéré
4. **Concurrents détectés** — marques concurrentes avec volume de dépense associé
5. **Opportunités** — termes qui convertissent mais ne sont pas encore des mots-clés actifs
6. **Thématiques** — regroupement sémantique (informational, prix, emploi, etc.)

## Installation

```bash
cd tools/negative-keywords
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...
```

## Usage

Export CSV depuis Google Ads → **Campagnes > Rapports > Termes de recherche** → Télécharger en `.csv`.

```bash
# Objectif en argument direct
python analyze.py rapport.csv --objective "Consulting Google Ads B2B, tickets 5k€+/mois, exclure formation, emploi, auto-entrepreneurs"

# Objectif depuis un fichier
python analyze.py rapport.csv --objective objectif.txt -o audit-client-X.xlsx

# Objectif en mode interactif (stdin)
python analyze.py rapport.csv
```

## Options

| Option | Défaut | Description |
|---|---|---|
| `-o, --output` | `<csv>_audit.xlsx` | Chemin du xlsx de sortie |
| `--objective` | (prompt interactif) | Texte direct ou chemin vers un `.txt` |
| `--model` | `claude-opus-4-7` | Modèle Claude à utiliser |
| `--batch-size` | `40` | Nombre de termes par appel API |

## Coût indicatif

Avec prompt caching, pour un rapport de 1000 termes : ~1-2 €. Le prompt système (objectif + instructions) est mis en cache, donc 90% du prefix est facturé à 0,1× le prix standard.

## Colonnes CSV reconnues

Le script auto-détecte les en-têtes français et anglais (« Terme de recherche » / « Search term », « Coût » / « Cost », etc.). Les lignes de métadonnées et totaux en tête/pied sont ignorées automatiquement.
