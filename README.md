# OpenFlight

An open-source 3D flight simulator built with Cesium, React, and TypeScript. Fly an aircraft or drive a car across real-world terrain with multiple camera modes and a live mini-map.

> Originally based on the "Cesium Flight Simulator" project, rebuilt and rebranded as **OpenFlight** with stability fixes, code cleanup, and a refreshed UI.

## Features

- **Multiple Vehicles** - Switch between aircraft and car
- **Camera Modes** - Follow, close follow, and drone cameras
- **Real Terrain** - Built on Cesium's global 3D terrain data
- **Mini-Map** - Real-time position tracking with Mapbox
- **Location Teleport** - Jump to famous locations instantly
- **Quality Presets** - Performance, balanced, quality, and ultra modes
- **Crash Detection** - Aircraft collision detection with terrain
- **Builder Mode** - Place objects directly in the 3D world

## Quick Start

### Prerequisites

- Node.js 18 or higher
- Free API tokens from Mapbox and Cesium Ion

### Installation

```bash
cd packages/web

# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will prompt you for API tokens on first launch, or you can create a `.env` file inside `packages/web`:

```bash
VITE_MAPBOX_TOKEN=your_mapbox_token_here
VITE_CESIUM_TOKEN=your_cesium_token_here
```

### Getting API Tokens

**Mapbox Token** (for mini-map)
1. Sign up at [mapbox.com](https://account.mapbox.com/)
2. Copy your default public token (starts with `pk.`)

**Cesium Ion Token** (for 3D terrain)
1. Sign up at [cesium.com/ion](https://ion.cesium.com/tokens)
2. Copy your default access token

Both services are free for development use.

## Controls

| Key | Action |
|-----|--------|
| `W` | Throttle |
| `S` | Brake |
| `A` / `D` / `←` / `→` | Roll |
| `C` | Switch camera |
| `M` | Toggle vehicle |
| `?` | Show controls |
| `~` | Debug panel |

## Tech Stack

- **Cesium** - 3D globe and terrain rendering
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Mapbox GL** - 2D mini-map

## Project Structure

```
packages/web/src/
├── cesium/           # Core 3D engine
│   ├── vehicles/     # Aircraft and car implementations
│   ├── camera/       # Camera systems
│   ├── managers/     # Vehicle and camera management
│   ├── builder/      # Object placement / builder mode
│   └── bridge/       # React-Cesium communication
└── react/            # UI layer
    ├── features/     # UI features (HUD, controls, mini-map, debug)
    └── hooks/        # React hooks for game state
```

## Development

```bash
# Development server
npm run dev

# Type-check + production build
npm run build

# Preview production build
npm run preview
```

## Stability notes (this fork)

A few correctness issues were found and fixed while preparing this fork:

- `GameLoop.stop()` previously left its Cesium `preUpdate` listener attached, so calling `start()` again after a `stop()` could register a second update loop. It now properly tracks and removes the listener.
- `Vehicle.getState()` / `Vehicle.getPosition()` previously returned a single **static** scratch `Cartesian3` shared across *every* vehicle instance, so consumers could end up reading mutated/stale position data. Both methods now return a fresh clone per call.
- Removed several genuinely dead/unused fields and computations flagged by the TypeScript compiler.
- Production bundle is now split into separate `cesium`, `mapbox-gl`, and `react` chunks to avoid shipping one oversized JS file.
- Removed a third-party Google Analytics snippet that was hardcoded into `index.html`.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [Cesium](https://cesium.com/) for the 3D rendering engine
- [Mapbox](https://www.mapbox.com/) for map tiles and styling
