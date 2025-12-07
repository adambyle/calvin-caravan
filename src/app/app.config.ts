import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrDGQeiSDr12nM7nM9NfKZlbRC71QI8VI",
  authDomain: "calvin-caravan.firebaseapp.com",
  projectId: "calvin-caravan",
  storageBucket: "calvin-caravan.firebasestorage.app",
  messagingSenderId: "217391474028",
  appId: "1:217391474028:web:9a3bbedb69129cce7c3f49"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideRouter(routes),
  ]
};
