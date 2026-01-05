# Netlify Deployment Checklist

## Environment Variables in Netlify
Make sure these are set in Netlify Dashboard → Project Settings → Environment Variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional)

## Firebase Authorized Domains
Go to Firebase Console → Authentication → Settings → Authorized domains and add:

1. `moving-comp.netlify.app` (your production domain)
2. `*.netlify.app` (for preview deployments - optional but recommended)

## Build Settings
- **Base directory:** (empty)
- **Build command:** `npm run build`
- **Publish directory:** `build/client`

## After Changes
1. Redeploy your site in Netlify
2. Clear browser cache if issues persist

