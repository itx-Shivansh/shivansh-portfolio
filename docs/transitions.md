# Chapter Boundary Transition Map

This document outlines the visual, 3D WebGL, and scroll-driven transitions occurring across each of the 4 chapter boundaries in Shivansh Raj's portfolio.

---

## 1. Hero ➔ Journey Boundary (`progress: 0.00 – 0.22`)
- **DOM Typography**: Hero headline scales up (`scale: 1.05`), shifts upward (`y: -140`), blurs (`filter: blur(10px)`), and dissolves out via scrubbed GSAP ScrollTrigger.
- **WebGL Camera Rig**: Camera smoothly lerps from `[0, 0, 8]` to `[1.2, -0.6, 7.2]`, tilting slightly downward toward the central timeline.
- **Lighting & Color**: Directional cyan light (`#00D9FF`) smoothly shifts toward violet (`#8B5CF6`).
- **3D Objects**: GLSL shader background plane recedes along the Z-axis (`z: -4`), while 3D Journey wireframe shapes (Octahedron, Dodecahedron) smoothly scale up into view.

---

## 2. Journey ➔ Projects Boundary (`progress: 0.22 – 0.48`)
- **DOM Layout**: Pinned vertical timeline completes, unpins, and smoothly transitions into the pinned horizontal project gallery track.
- **WebGL Camera Rig**: Camera smoothly lerps from `[1.2, -0.6, 7.2]` to `[-1.5, 0.8, 6.4]`, creating a dynamic diagonal panning motion across space.
- **Lighting & Color**: Lighting color shifts back to electric cyan/blue (`#00D9FF`).
- **3D Objects**: Journey wireframe objects lerp to scale `0`, while shared particle field accelerates slightly along Y.

---

## 3. Projects ➔ Skills Boundary (`progress: 0.48 – 0.75`)
- **DOM Layout**: Horizontal gallery completes its scrub to the 4th project card (Obsidian) and unpins into the spatial skills cluster matrix.
- **WebGL Camera Rig**: Camera smoothly lerps from `[-1.5, 0.8, 6.4]` to `[0, 1.0, 7.5]`, centering high above the scene.
- **Lighting & Color**: Lighting color transitions to deep violet (`#8B5CF6`).
- **3D Objects**: 3D orbiting constellation node network (`Skills3DConstellation`) scales up from 0 to 1, rendering 30 nodes and interconnecting constellation lines.

---

## 4. Skills ➔ Contact Finale Boundary (`progress: 0.75 – 1.00`)
- **DOM Layout**: Skills cluster matrix recedes, opening into the spacious finale container with large display text, interactive transmission form, and resolving footer.
- **WebGL Camera Rig**: Camera smoothly lerps from `[0, 1.0, 7.5]` to `[0, -0.4, 6.2]`, settling into an intimate closing position.
- **Lighting & Color**: Ambient point light (`ContactAtmosphere`) warms and brightens into a golden amber glow (`#F59E0B`), providing an emotional resolution.
- **3D Objects**: Constellation nodes recede into the dark background as the central core torus knot pulses slowly.

---

## ⚡ Global Scroll Velocity Response
- **Chromatic Aberration**: Post-processing effect dynamically tracks `Math.abs(scrollY - prevScrollY)`. During rapid scrolling, chromatic aberration offset increases smoothly up to `[0.005, 0.005]`, producing subtle RGB speed fringing, and smoothly settles back to `[0.0005, 0.0005]` when stationary.
- **Bloom**: Constant subtle glow (`intensity: 0.4`) preserving cyan/violet cyber highlight tones.
