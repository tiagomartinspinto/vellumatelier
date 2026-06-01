function focusableElements(root) {
  return Array.from(
    root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hidden && !element.closest("[hidden]"));
}

export function closeMenu(menu, button) {
  if (!menu || !button) return;
  menu.hidden = true;
  button.setAttribute("aria-expanded", "false");
}

export function openMenu(menu, button) {
  if (!menu || !button) return;
  menu.hidden = false;
  button.setAttribute("aria-expanded", "true");
}

export function toggleMenu(menu, button, closeOthers = () => {}) {
  if (!menu || !button) return;
  const willOpen = menu.hidden;
  closeOthers();
  if (willOpen) {
    openMenu(menu, button);
  }
}

export function activateTab(tabName, tabs, panels) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.id === `${tabName}Panel`;
    panel.classList.toggle("active-panel", isActive);
    panel.hidden = !isActive;
  });
}

export function bindTabKeyboard(tabs, onActivate) {
  tabs.forEach((tab, index) => {
    tab.addEventListener("keydown", (event) => {
      const nextIndex = (() => {
        if (event.key === "ArrowRight") return (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") return (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") return 0;
        if (event.key === "End") return tabs.length - 1;
        return -1;
      })();

      if (nextIndex >= 0) {
        event.preventDefault();
        tabs[nextIndex].focus();
        onActivate(tabs[nextIndex].dataset.tab);
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onActivate(tab.dataset.tab);
      }
    });
  });
}

export function openCommandPalette(commandPalette, commandInput, onOpen = () => {}) {
  if (!commandPalette) return;
  commandPalette.hidden = false;
  onOpen();
  if (commandInput) {
    commandInput.value = "";
    commandInput.focus();
  }
}

export function closeCommandPalette(commandPalette, returnFocusTarget = null) {
  if (!commandPalette) return;
  commandPalette.hidden = true;
  returnFocusTarget?.focus?.();
}

export function trapDialogFocus(event, dialogRoot, onEscape) {
  if (event.key === "Escape") {
    onEscape?.();
    return true;
  }

  if (event.key !== "Tab") {
    return false;
  }

  const focusables = focusableElements(dialogRoot);
  if (!focusables.length) {
    event.preventDefault();
    return true;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return true;
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
    return true;
  }

  return false;
}
