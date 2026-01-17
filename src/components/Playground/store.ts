import { atom } from "nanostores";

export const isPlaygroundOpen = atom(false);

export const openPlayground = () => isPlaygroundOpen.set(true);
export const closePlayground = () => isPlaygroundOpen.set(false);
export const togglePlayground = () =>
  isPlaygroundOpen.set(!isPlaygroundOpen.get());
