function showBanner(banner) {
  if (!banner) return;
  banner.hidden = false;
}

function hideBanner(banner) {
  if (!banner) return;
  banner.hidden = true;
}

export function registerServiceWorkerUpdates({
  banner,
  reloadButton,
  dismissButton,
  serviceWorkerUrl,
}) {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") {
    return;
  }

  let refreshing = false;
  let waitingWorker = null;
  let updateConfirmed = false;

  const promptForUpdate = (registration) => {
    waitingWorker = registration?.waiting || null;
    if (!waitingWorker) return;
    showBanner(banner);
  };

  const applyUpdate = () => {
    if (!waitingWorker) return;
    updateConfirmed = true;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  };

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing || !updateConfirmed) return;
    refreshing = true;
    window.location.reload();
  });

  reloadButton?.addEventListener("click", applyUpdate);
  dismissButton?.addEventListener("click", () => hideBanner(banner));

  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(serviceWorkerUrl);
      if (registration.waiting) {
        promptForUpdate(registration);
      }

      registration.addEventListener("updatefound", () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;
        installingWorker.addEventListener("statechange", () => {
          if (
            installingWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            promptForUpdate(registration);
          }
        });
      });

      registration.update().catch(() => {});
    } catch {
      hideBanner(banner);
    }
  });
}
