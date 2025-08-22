# Google Analytics e Search Console Setup per RoomRadar

## Google Analytics 4 (GA4) Setup

### 1. Creare una proprietà GA4
1. Vai su [Google Analytics](https://analytics.google.com/)
2. Crea una nuova proprietà chiamata "RoomRadar"
3. Configura il dominio: `roomradar.app`
4. Copia il Measurement ID (formato: G-XXXXXXXXXX)

### 2. Implementare il codice di tracking
Sostituisci `GA_MEASUREMENT_ID` in tutti i file HTML con il tuo Measurement ID:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Eventi personalizzati da tracciare
```javascript
// Beta signup
gtag('event', 'sign_up', {
  'method': 'beta_signup'
});

// Page views per pagine importanti
gtag('event', 'page_view', {
  'page_title': 'Homepage',
  'page_location': 'https://roomradar.app/'
});

// CTA clicks
gtag('event', 'click', {
  'event_category': 'CTA',
  'event_label': 'Join Beta Button'
});
```

## Google Search Console Setup

### 1. Verifica della proprietà
1. Vai su [Google Search Console](https://search.google.com/search-console)
2. Aggiungi una nuova proprietà: `https://roomradar.app`
3. Verifica tramite file HTML (aggiungi il tag meta nel `<head>`)

### 2. Tag di verifica
Aggiungi questo tag nel `<head>` di `index.html`:
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

### 3. Sitemap submission
1. Invia il sitemap principale: `https://roomradar.app/sitemap.xml`
2. Monitora l'indicizzazione delle pagine

## Eventi SEO da monitorare

### 1. Metriche Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 2. Metriche di ranking target
- Posizione target per "rooms Barcelona students": top 10
- Posizione target per "habitaciones Barcelona estudiantes": top 10
- Posizione target per "stanze Barcellona studenti": top 10

### 3. Metriche di traffico
- Aumento del 300% del traffico organico in 12 mesi
- CTR (Click Through Rate) > 3% per snippet in evidenza

## Configurazione per test locali

### 1. Avviare server locale
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### 2. Verificare implementazione SEO
- Controlla meta tags con browser dev tools
- Verifica schema markup con [Google's Rich Results Test](https://search.google.com/test/rich-results)
- Testa hreflang con [hreflang Tags Testing Tool](https://www.aleydasolis.com/en/international-seo-tools/hreflang-tags-generator/)

### 3. Checklist pre-deploy
- [ ] Tutti i meta tags implementati
- [ ] Schema markup validato
- [ ] Hreflang tags corretti
- [ ] Sitemap.xml generato
- [ ] Robots.txt configurato
- [ ] Google Analytics ID inserito
- [ ] Search Console verificato
- [ ] Test locali superati

## File da aggiornare con GA ID reale
- index.html
- how-it-works.html
- faq.html
- community.html
- beta-signup.html
- privacy.html
- terms.html
- thank-you.html
