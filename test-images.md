# Test des Images - Guide de Débogage

## Étapes de débogage

### 1. Vérifier les logs dans la console du navigateur

Ouvrez la console (F12) et cherchez ces logs:

#### A. Variables d'environnement (dès le chargement de la page)
```
[admin-service] Environment variables:
[admin-service] NEXT_PUBLIC_API_URL: ...
[admin-service] NEXT_PUBLIC_BACKEND_URL: ...
[admin-service] API_BASE_URL: ...
[admin-service] BACKEND_URL: ...
```

**Vérification**: BACKEND_URL doit être `http://localhost:8000`

#### B. Chargement des produits
```
[loadProducts] API Response: {...}
[loadProducts] Response.data: [...]
[loadProducts] Product 1: { id: ..., name: ..., images: [...], ... }
```

**Vérification**: Le champ `images` doit contenir un tableau avec au moins un élément

#### C. Construction des URLs
```
[getFullImageUrl] Input imagePath: /storage/...
[getFullImageUrl] BACKEND_URL: http://localhost:8000
[getFullImageUrl] Constructed full URL: http://localhost:8000/storage/...
```

**Vérification**: L'URL finale doit être complète et valide

#### D. Affichage dans le tableau
```
[ProductTable] Product: Nom du produit
[ProductTable] Product.images: ["/storage/..."]
[ProductTable] Final image URL for display: http://localhost:8000/storage/...
```

**Vérification**: L'URL doit pointer vers votre backend

### 2. Tester l'accès direct aux images

Copiez une URL d'image depuis les logs (ex: `http://localhost:8000/storage/products/image.jpg`) et:

1. **Ouvrez cette URL dans un nouvel onglet**
   - ✅ Si l'image s'affiche → Le backend fonctionne
   - ❌ Si erreur 404 → L'image n'existe pas sur le backend
   - ❌ Si erreur CORS → Problème de configuration backend

2. **Vérifiez dans l'onglet Network (Réseau)**
   - Filtrez par "Img"
   - Cherchez les requêtes d'images
   - Regardez le statut (200, 404, 500, etc.)
   - Vérifiez les en-têtes CORS

### 3. Problèmes courants et solutions

#### Problème: BACKEND_URL est undefined
**Solution**: Redémarrer le serveur Next.js après avoir modifié `.env.local`
```bash
# Arrêter le serveur (Ctrl+C)
npm run dev
```

#### Problème: Images = null ou []
**Cause**: Les images ne sont pas sauvegardées correctement
**Solution**: Vérifier les logs lors de la création d'un produit:
```
[ProductForm] Upload response: ...
[ProductForm] New imageUrl after upload: ...
```

#### Problème: URL construite incorrectement
**Exemple**: `http://localhost:8000/storage/products/image.jpg` au lieu de `http://localhost:8000storage/products/image.jpg`
**Cause**: Le chemin d'image ne commence pas par `/`
**Solution**: Le backend doit retourner `/storage/products/image.jpg`

#### Problème: Erreur CORS
**Cause**: Le backend bloque les requêtes
**Solution**: Configurer les en-têtes CORS sur le backend Laravel:
```php
// Dans config/cors.php
'paths' => ['api/*', 'storage/*'],
'allowed_origins' => ['http://localhost:3000'],
```

### 4. Checklist complète

- [ ] Le serveur Next.js a été redémarré après modification de `.env.local`
- [ ] La console montre `BACKEND_URL: http://localhost:8000`
- [ ] Les produits ont un champ `images` avec au moins une valeur
- [ ] L'URL construite est complète (avec http://)
- [ ] L'image est accessible en accès direct dans le navigateur
- [ ] Pas d'erreur CORS dans la console
- [ ] L'image s'affiche dans l'onglet Network

### 5. Format attendu des données

**Réponse API du backend pour les produits:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Produit Test",
      "images": ["/storage/products/image1.jpg"],  // Doit commencer par /
      ...
    }
  ],
  "meta": { ... }
}
```

**Réponse API pour l'upload d'image:**
```json
{
  "status": "success",
  "message": "Image uploaded successfully",
  "data": {
    "url": "/storage/products/image1.jpg"  // Doit commencer par /
  }
}
```

### 6. Commandes utiles

**Vérifier que le serveur backend est accessible:**
```bash
curl http://localhost:8000/api/admin/products
```

**Vérifier qu'une image est accessible:**
```bash
curl -I http://localhost:8000/storage/products/image.jpg
```

## Notes importantes

- Les images doivent être stockées dans le dossier `storage/app/public/products` sur le backend Laravel
- Le lien symbolique doit être créé: `php artisan storage:link`
- Les permissions du dossier storage doivent permettre la lecture
