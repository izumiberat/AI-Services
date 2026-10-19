# API des démos IzuTech (Cloudflare Worker)

Ce petit service fait le lien entre la page `demo.html` et Mistral AI. Il garde la clé API à l'abri : elle n'apparaît jamais dans le code du site.

- `POST /chat` : l'assistant du site. Il répond uniquement à partir de `src/knowledge.js` et renvoie ses sources.
- `POST /extract` : la lecture de document. Texte, PDF ou image → champs structurés, puis contrôles des calculs.
- `GET /health` : pour vérifier que le service tourne.

Rien n'est enregistré : ni les conversations, ni les documents. Les journaux ne contiennent que le type d'erreur.

## Garde-fous

- **Origine** : seules les pages listées dans `ALLOWED_ORIGINS` peuvent appeler l'API.
- **Débit** : 8 demandes par minute et par visiteur, 60 par minute pour tout le site (`wrangler.toml`).
- **Plafond du jour** (facultatif) : `DAILY_CAP` demandes par jour, si vous ajoutez le stockage KV (voir `wrangler.toml`).
- **Budget** : le vrai plafond de dépense se règle chez Mistral (étape 1). C'est le plus important.
- **Taille** : 1 000 caractères par message, 10 messages d'historique, fichiers de 4 Mo maximum, 5 pages lues au plus.

## Mise en ligne (environ 15 minutes)

Il faut Node.js 20 ou plus récent sur votre ordinateur.

1. **Clé Mistral.** Sur console.mistral.ai, créez une clé API. Dans les réglages de facturation, fixez une **limite de dépense mensuelle** (par exemple 10 €). Si la démo est très utilisée, elle s'arrêtera à cette limite au lieu de coûter plus.

2. **Compte Cloudflare.** Créez un compte gratuit sur cloudflare.com si vous n'en avez pas.

3. **Installer et se connecter**, depuis ce dossier `worker/` :
   ```
   npm install
   npx wrangler login
   ```

4. **Donner la clé au service** (elle est stockée chez Cloudflare, chiffrée) :
   ```
   npx wrangler secret put MISTRAL_API_KEY
   ```
   Collez la clé quand c'est demandé.

5. **Publier** :
   ```
   npx wrangler deploy
   ```
   Wrangler affiche une adresse du type `https://izutech-demo.<votre-nom>.workers.dev`.

6. **Vérifier** : ouvrez `https://izutech-demo.<votre-nom>.workers.dev/health` dans le navigateur. Vous devez voir `{"ok":true}`.

7. **Brancher la page** : dans `demo.html`, mettez cette adresse dans `<body data-page="demo" data-api="">`, entre les guillemets de `data-api`, sans `/` à la fin.

Tant que `data-api` est vide, l'assistant et la lecture de document affichent « bientôt en ligne », et le calculateur fonctionne déjà.

## Essayer en local avant de publier

Créez un fichier `.dev.vars` dans ce dossier (il est ignoré par git) :
```
MISTRAL_API_KEY=votre-clé
ALLOWED_ORIGINS=http://localhost:8000
```
Puis, dans deux terminaux :
```
npx wrangler dev                      # dans worker/ → http://localhost:8787
python3 -m http.server 8000           # à la racine du site
```
Mettez temporairement `data-api="http://localhost:8787"` dans `demo.html`, et ouvrez http://localhost:8000/demo.html.

## Tests

```
npm test
```
Les tests remplacent Mistral par une fausse réponse : ni clé ni réseau nécessaires.

## Quand le site change

L'assistant ne connaît que `src/knowledge.js`. Si vous modifiez une offre, un prix ou la méthode sur le site, mettez la section correspondante à jour, puis relancez `npx wrangler deploy`.

## Coût indicatif

Avec `mistral-small-latest`, une question à l'assistant coûte une fraction de centime (environ 1 600 mots de contexte par question). La lecture d'un PDF ajoute le coût de l'OCR, par page. Vérifiez les tarifs actuels sur mistral.ai : la limite de dépense de l'étape 1 vous protège dans tous les cas.
