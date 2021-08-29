import { isLocalhost } from 'services/navigation';

const isEnabled = process.env.NODE_ENV === 'production';

export let serviceWorkerRegistration: ServiceWorkerRegistration;

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if (isEnabled && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', async () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (!isLocalhost) return registerValidSW(swUrl, config);

      try {
        await checkValidServiceWorker(swUrl, config);
      } catch {
        console.log('No internet connection found. App is running in offline mode.');
      }

      serviceWorkerRegistration = await navigator.serviceWorker.ready;

      console.log(
        'This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA',
      );
    });
  }
}

const registerValidSW = async (swUrl: string, config?: Config) => {
  serviceWorkerRegistration = await navigator.serviceWorker.register(swUrl);

  serviceWorkerRegistration.onupdatefound = () => {
    const installingWorker = serviceWorkerRegistration.installing;
    if (!installingWorker) return;

    installingWorker.onstatechange = () => {
      if (installingWorker.state !== 'installed') return;

      if (navigator.serviceWorker.controller) {
        console.log(
          'New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.',
        );

        if (config && config.onUpdate) config.onUpdate(serviceWorkerRegistration);
      } else {
        console.log('Content is cached for offline use.');

        if (config && config.onSuccess) config.onSuccess(serviceWorkerRegistration);
      }
    };
  };
};

const checkValidServiceWorker = async (swUrl: string, config?: Config) => {
  const response = await fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  });

  const contentType = response.headers.get('content-type');
  if (
    response.status === 404 ||
    (contentType != null && contentType.indexOf('javascript') === -1)
  ) {
    return unregister();
  }

  await registerValidSW(swUrl, config);
};

export const unregister = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;

    registration.unregister();
  }
};
