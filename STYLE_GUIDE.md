# Project Style Guide

This document outlines the styling and design system used in this project. The design is inspired by Apple's "Liquid Glass Design System," featuring glassmorphism, refined typography, and subtle animations.

## Table of Contents

1.  [Color Palette](#color-palette)
    *   [Light Theme](#light-theme)
    *   [Dark Theme](#dark-theme)
2.  [Typography](#typography)
    *   [Font Families](#font-families)
    *   [Typographic Scale](#typographic-scale)
3.  [Layout and Spacing](#layout-and-spacing)
4.  [Components](#components)
    *   [Glass Panel](#glass-panel)
    *   [Buttons](#buttons)
    *   [Cards](#cards)
5.  [Animation](#animation)

---

## 1. Color Palette

The project uses a themable color system based on CSS variables.

### Light Theme

| Variable | HSL Value | Description |
| :--- | :--- | :--- |
| `--background` | `210 11% 97%` | Soft off-white background (#F5F7F9) |
| `--foreground` | `220 9% 15%` | Dark grey text (#333) |
| `--glass-light` | `0 0% 100% / 0.95` |  |
| `--glass-border` | `220 13% 88% / 0.9` |  |
| `--accent` | `180 75% 25%` | Darker teal for better contrast |
| `--accent-foreground` | `0 0% 100%` |  |
| `--card` | `0 0% 100% / 0.98` |  |
| `--card-foreground` | `220 9% 8%` |  |
| `--primary` | `220 9% 15%` |  |
| `--primary-foreground` | `0 0% 98%` |  |
| `--secondary` | `210 11% 96%` | Light secondary with subtle tint |
| `--secondary-foreground` | `220 9% 8%` |  |
| `--muted` | `210 11% 94%` | Muted with subtle tint |
| `--muted-foreground` | `220 6% 20%` | Strong contrast on neutral background |
| `--destructive` | `0 84% 60%` | Apple's red |
| `--border` | `220 14% 70%` | Darker border for mid-grey theme |

### Dark Theme

| Variable | HSL Value | Description |
| :--- | :--- | :--- |
| `--background` | `0 0% 6%` | #0F0F0F - Apple's dark background |
| `--foreground` | `0 0% 95%` | Slightly softer white |
| `--glass-light` | `220 9% 12% / 0.7` |  |
| `--glass-border` | `0 0% 100% / 0.15` |  |
| `--accent` | `180 75% 50%` | Brighter teal for dark mode |
| `--accent-foreground` | `220 9% 12%` |  |
| `--card` | `220 9% 12% / 0.8` |  |
| `--card-foreground` | `0 0% 100%` |  |
| `--primary` | `180 75% 50%` | Better teal for dark mode buttons |
| `--primary-foreground` | `220 9% 12%` |  |
| `--secondary` | `220 7% 18%` | Apple's dark secondary |
| `--secondary-foreground` | `0 0% 100%` |  |
| `--muted` | `220 7% 18%` |  |
| `--muted-foreground` | `220 5% 68%` |  |
| `--destructive` | `0 84% 62%` | Apple's dark red |
| `--border` | `220 6% 23%` | Apple's dark separator |

---

## 2. Typography

### Font Families

*   **Primary/UI:** 'SF Pro Display', 'Inter', system-ui, sans-serif
*   **Serif:** 'Playfair Display', 'Georgia', serif

### Typographic Scale

The project uses custom utility classes for a responsive typographic scale:

*   `.text-display`: `clamp(2.5rem, 8vw, 6rem)` - For large, impactful headings.
*   `.text-headline`: `clamp(1.875rem, 4vw, 3rem)` - For section titles.
*   `.text-body-large`: `clamp(1.125rem, 2vw, 1.375rem)` - For lead paragraphs.

Standard heading elements (`h1`-`h6`) have a base style with a font weight of 600 and specific letter spacing.

---

## 3. Layout and Spacing

*   **Container:** The `.container` class centers content with a max-width of `1400px` and `2rem` of padding.
*   **Section Padding:** The `.section-padding` class provides responsive vertical and horizontal padding for sections.
*   **Grids:**
    *   `.project-grid`: A responsive grid for showcasing projects.
    *   `.masonry-grid`: A responsive masonry-style grid for content.
*   **Border Radius:**
    *   `--radius`: `12px` (Standard)
    *   `--radius-glass`: `20px` (For glass panels)
    *   `--radius-small`: `8px`

---

## 4. Components

### Glass Panel

The `.glass-panel` class is the foundation of the glassmorphism effect.

*   **Effect:** `backdrop-filter: blur(32px) saturate(1.8);`
*   **Background:** A linear gradient with transparency.
*   **Border:** `1px` solid with transparency.
*   **Hover Effect:** A subtle lift and shine effect.

### Buttons

*   `.btn-liquid`: A button with a glassmorphism style.
*   `.btn-accent`: A solid-color button using the accent color.

### Cards

*   `.glass-card`: Extends `.glass-panel` with more pronounced hover effects.
*   `.content-card`: A card for displaying content with a thumbnail and text, with hover effects to improve text visibility.

---

## 5. Animation

*   **Scroll Animation:** The `.scroll-animate` class fades and slides elements in as they enter the viewport.
*   **Entrance Animations:** A suite of "mind-blowing" animations are available as utility classes:
    *   `.fade-in`
    *   `.slide-up`
    *   `.bounce-in`
*   **Motion System:** The project uses a custom motion system with predefined easing functions (`--ease-apple`, `--ease-spring`) and durations (`--duration-fast`, `--duration-normal`, `--duration-slow`).
