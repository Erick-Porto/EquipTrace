import {
  Truck,
  Car,
  Bus, // Veículos
  Box,
  Package,
  Container, // Cargas
  Wrench,
  Hammer,
  Drill,
  PenTool, // Ferramentas
  Clipboard,
  Settings,
  AlertTriangle,
  Shield, // Manutenção/Geral
} from "lucide-react";

export const iconMap = {
  // Veículos
  Truck: Truck,
  Car: Car,
  Bus: Bus,

  // Cargas
  Box: Box,
  Package: Package,
  Container: Container,

  // Ferramentas
  Wrench: Wrench,
  Hammer: Hammer,
  Drill: Drill,
  PenTool: PenTool,

  // Manutenção
  Clipboard: Clipboard,
  Settings: Settings,
  AlertTriangle: AlertTriangle,
  Shield: Shield,
};

export const availableIcons = Object.keys(iconMap);
