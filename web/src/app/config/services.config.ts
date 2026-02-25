/**
 * Service key to icon and path mapping.
 * Icons cannot be stored in JSON; this config is the single source for UI mapping.
 */

import type { LucideIcon } from "lucide-react";
import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  HardDrive,
  Monitor,
  Battery,
  Keyboard,
  Wrench,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  macbook: Laptop,
  iphone: Smartphone,
  ipad: Tablet,
  watch: Watch,
  imac: Monitor,
  display: Monitor,
  dataRecovery: HardDrive,
  battery: Battery,
  ssd: HardDrive,
  flexgate: Monitor,
  keyboard: Keyboard,
  software: Wrench,
};

/** Default icon for services not in the map (e.g. newly added). */
export const DEFAULT_SERVICE_ICON = Wrench;

export function getServiceIcon(key: string): LucideIcon {
  return SERVICE_ICONS[key] ?? DEFAULT_SERVICE_ICON;
}
