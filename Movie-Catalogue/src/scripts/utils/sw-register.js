const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported in the browser');
      return;
    }
    console.log('Service worker not supported in this browser');

    try {
      await navigator.serviceWorker.register('./sw.bundle.js');
      console.log('Service worker registered');
    } catch (error) {
      console.log('Failed to register service worker', error);
    }
  }
};
export default swRegister;
