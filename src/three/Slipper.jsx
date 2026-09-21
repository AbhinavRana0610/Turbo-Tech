import { useEffect, useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------
   The slipper is generated in code rather than loaded as a model file:
   an extruded foot-shaped outline for the sole, a thinner inset
   footbed on top, and a flat band swept along a curve for the strap.
   Nothing is fetched at runtime, so the hero never waits on an asset.
------------------------------------------------------------------- */

/** Foot-shaped outline: toe at +y, heel at -y, narrowed at the arch. */
function soleShape(s = 1) {
  const p = new THREE.Shape()
  p.moveTo(0, 1.55 * s)
  p.bezierCurveTo(0.45 * s, 1.55 * s, 0.62 * s, 1.3 * s, 0.63 * s, 1.05 * s)
  p.bezierCurveTo(0.65 * s, 0.75 * s, 0.58 * s, 0.55 * s, 0.55 * s, 0.3 * s)
  p.bezierCurveTo(0.5 * s, 0.0, 0.36 * s, -0.25 * s, 0.34 * s, -0.55 * s)
  p.bezierCurveTo(0.32 * s, -0.85 * s, 0.44 * s, -1.05 * s, 0.44 * s, -1.25 * s)
  p.bezierCurveTo(0.44 * s, -1.52 * s, 0.26 * s, -1.62 * s, 0, -1.62 * s)
  p.bezierCurveTo(-0.26 * s, -1.62 * s, -0.44 * s, -1.52 * s, -0.44 * s, -1.25 * s)
  p.bezierCurveTo(-0.44 * s, -1.05 * s, -0.32 * s, -0.85 * s, -0.34 * s, -0.55 * s)
  p.bezierCurveTo(-0.36 * s, -0.25 * s, -0.5 * s, 0.0, -0.55 * s, 0.3 * s)
  p.bezierCurveTo(-0.58 * s, 0.55 * s, -0.65 * s, 0.75 * s, -0.63 * s, 1.05 * s)
  p.bezierCurveTo(-0.62 * s, 1.3 * s, -0.45 * s, 1.55 * s, 0, 1.55 * s)
  return p
}

/** Rounded rectangle used as the cross-section of the strap. */
function strapProfile(w = 0.15, h = 0.032, r = 0.028) {
  const p = new THREE.Shape()
  p.moveTo(-w + r, -h)
  p.lineTo(w - r, -h)
  p.quadraticCurveTo(w, -h, w, -h + r)
  p.lineTo(w, h - r)
  p.quadraticCurveTo(w, h, w - r, h)
  p.lineTo(-w + r, h)
  p.quadraticCurveTo(-w, h, -w, h - r)
  p.lineTo(-w, -h + r)
  p.quadraticCurveTo(-w, -h, -w + r, -h)
  return p
}

/** Faint tread striping, drawn to a canvas so no image has to load. */
function treadTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')
  g.fillStyle = '#8d8d8d'
  g.fillRect(0, 0, 256, 256)
  g.strokeStyle = '#d8d8d8'
  g.lineWidth = 7
  for (let i = -256; i < 512; i += 26) {
    g.beginPath()
    g.moveTo(i, 0)
    g.lineTo(i + 256, 256)
    g.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(3, 3)
  return t
}

/* The colour story: the sole starts white and picks up pigment as you scroll. */
const PIGMENTS = ['#eef3ff', '#00bffe', '#0072ce', '#fc0065', '#00d6a8', '#8b7dff']

function Slipper({ progress, interact, spin = true }) {
  const group = useRef()
  const tip = useRef()
  const mats = useRef([])
  const look = useRef({ x: 0, y: 0 })
  const target = useMemo(() => new THREE.Color(PIGMENTS[0]), [])
  const next = useMemo(() => new THREE.Color(), [])

  const geo = useMemo(() => {
    const sole = new THREE.ExtrudeGeometry(soleShape(1), {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.07,
      bevelSegments: 7,
      curveSegments: 54,
    })
    sole.center()

    const bed = new THREE.ExtrudeGeometry(soleShape(0.9), {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 5,
      curveSegments: 48,
    })
    bed.center()

    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.55, -0.02, -0.66),
      new THREE.Vector3(-0.42, 0.4, -0.76),
      new THREE.Vector3(0, 0.56, -0.86),
      new THREE.Vector3(0.42, 0.4, -0.76),
      new THREE.Vector3(0.55, -0.02, -0.66),
    ])
    const strap = new THREE.ExtrudeGeometry(strapProfile(), {
      steps: 90,
      bevelEnabled: false,
      extrudePath: path,
    })

    return { sole, bed, strap }
  }, [])

  const tread = useMemo(() => treadTexture(), [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const p = progress?.current ?? 0
    const k = Math.min(dt * 2.4, 1)

    const ix = interact.current

    // Drag spin keeps coasting after release, and the tilt springs back level.
    if (!ix.drag) {
      ix.rotY += ix.velY * 0.35 * dt * 60
      ix.velY *= Math.pow(0.05, dt)
      ix.rotX *= Math.pow(0.02, dt)
    }
    ix.pop = Math.max(0, ix.pop - dt * 1.6)

    // The sole turns to follow the cursor anywhere on the page.
    look.current.y = THREE.MathUtils.lerp(look.current.y, ix.mx * 0.6, k)
    look.current.x = THREE.MathUtils.lerp(look.current.x, -ix.my * 0.32, k)

    if (group.current) {
      // Idle motion stays inside a flattering three-quarter view; scrolling is
      // what actually turns the sole around.
      // -90deg puts the sole side-on to the camera; the sine keeps it drifting
      // around a three-quarter view instead of ever facing heel-first.
      const idle = -Math.PI * 0.5 + 0.2 + (spin ? Math.sin(t * 0.3) * 0.34 : 0)
      group.current.rotation.y = idle + p * Math.PI * 1.25 + ix.rotY + look.current.y
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -0.1 + p * 0.28 - ix.mx * 0.08, k)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.3 - p * 0.34 + look.current.x + ix.rotX, k)

      // Swell a little on hover, and bounce when clicked.
      const s = 1.05 * (ix.hover ? 1.07 : 1) * (1 + Math.sin(ix.pop * Math.PI) * 0.14)
      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, Math.min(dt * 9, 1)))
    }

    // Blend between pigments as the page scrolls; each click steps one pigment on.
    const n = PIGMENTS.length
    const f = p * (n - 1)
    const i = Math.min(Math.floor(f), n - 2)
    target.set(PIGMENTS[(i + ix.shift) % n]).lerp(next.set(PIGMENTS[(i + 1 + ix.shift) % n]), f - i)
    for (const m of mats.current) if (m) m.color.lerp(target, Math.min(k * (1 + ix.pop * 3), 1))

    if (tip.current) tip.current.rotation.y -= dt * (0.7 + ix.pop * 7)
  })

  return (
    <group
      ref={group}
      dispose={null}
      scale={1.05}
      onPointerOver={(e) => {
        e.stopPropagation()
        interact.current.hover = true
      }}
      onPointerOut={() => (interact.current.hover = false)}
      onClick={(e) => {
        e.stopPropagation()
        const ix = interact.current
        if (ix.moved > 6) return // that was a drag, not a click
        ix.shift += 1
        ix.pop = 1
      }}
    >
      {/* Outsole */}
      <mesh geometry={geo.sole} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={(m) => (mats.current[0] = m)}
          color={PIGMENTS[0]}
          roughness={0.42}
          metalness={0.02}
          clearcoat={0.85}
          clearcoatRoughness={0.28}
          roughnessMap={tread}
          sheen={0.4}
          sheenColor="#ffffff"
        />
      </mesh>

      {/* Footbed sitting just above the outsole */}
      <mesh geometry={geo.bed} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.17, 0]} castShadow>
        <meshPhysicalMaterial
          ref={(m) => (mats.current[1] = m)}
          color={PIGMENTS[0]}
          roughness={0.62}
          metalness={0}
          clearcoat={0.3}
        />
      </mesh>

      {/* Strap */}
      <mesh geometry={geo.strap} position={[0, 0.16, 0]} castShadow>
        <meshPhysicalMaterial
          ref={(m) => (mats.current[2] = m)}
          color={PIGMENTS[0]}
          roughness={0.35}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* A pigment droplet orbiting the toe */}
      <group ref={tip}>
        <mesh position={[0.95, 0.75, -1.1]} castShadow>
          <sphereGeometry args={[0.13, 32, 32]} />
          <meshPhysicalMaterial
            ref={(m) => (mats.current[3] = m)}
            color="#00bffe"
            roughness={0.1}
            metalness={0.1}
            clearcoat={1}
            transmission={0.25}
            thickness={0.5}
          />
        </mesh>
      </group>
    </group>
  )
}

/** Keeps the sole framed as the canvas changes shape, and adds a light parallax. */
function Rig({ interact }) {
  useFrame((state) => {
    const { camera, size } = state
    const pointer = { x: interact.current.mx, y: interact.current.my }
    const aspect = size.width / Math.max(size.height, 1)
    // Pull back far enough that FRAME_WIDTH world-units always fit across the
    // canvas, so the sole never runs off the edge on a narrow screen.
    const FRAME_WIDTH = 4.4
    const vHalf = Math.tan((camera.fov * Math.PI) / 360)
    const dist = THREE.MathUtils.clamp(FRAME_WIDTH / (2 * vHalf * aspect), 4.4, 9)
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.035
    camera.position.y += (1.9 + pointer.y * 0.5 - camera.position.y) * 0.035
    camera.position.z += (dist - camera.position.z) * 0.06
    camera.lookAt(0, 0.05, 0)
  })
  return null
}

/* Pointer state shared between the DOM handlers and the render loop. Kept in a
   ref so moving the mouse never re-renders React. */
function useInteraction(wrap) {
  const ix = useRef({ mx: 0, my: 0, drag: false, lastX: 0, lastY: 0, moved: 0, rotY: 0, rotX: 0, velY: 0, hover: false, pop: 0, shift: 0 })

  useEffect(() => {
    const s = ix.current
    const cursor = () => {
      if (wrap.current) wrap.current.style.cursor = s.drag ? 'grabbing' : s.hover ? 'pointer' : 'grab'
    }
    const move = (e) => {
      s.mx = (e.clientX / window.innerWidth) * 2 - 1
      s.my = -((e.clientY / window.innerHeight) * 2 - 1)
      if (s.drag) {
        const dx = e.clientX - s.lastX
        const dy = e.clientY - s.lastY
        s.lastX = e.clientX
        s.lastY = e.clientY
        s.moved += Math.abs(dx) + Math.abs(dy)
        s.velY = dx * 0.012
        s.rotY += s.velY
        s.rotX = THREE.MathUtils.clamp(s.rotX + dy * 0.006, -0.6, 0.6)
      }
      cursor()
    }
    const up = () => {
      s.drag = false
      cursor()
    }
    const down = (e) => {
      s.drag = true
      s.moved = 0
      s.velY = 0
      s.lastX = e.clientX
      s.lastY = e.clientY
      cursor()
    }
    const el = wrap.current
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    el?.addEventListener('pointerdown', down)
    cursor()
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      el?.removeEventListener('pointerdown', down)
    }
  }, [wrap])

  return ix
}

export default function SlipperScene({ progress, className = '', quality = 'high' }) {
  const low = quality === 'low'
  const wrap = useRef(null)
  const interact = useInteraction(wrap)
  return (
    <div ref={wrap} className={`select-none ${className}`}>
      <Canvas
        dpr={low ? [1, 1.25] : [1, 1.9]}
        shadows={!low}
        gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.9, 4.6], fov: 38 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[4, 7, 4]}
            intensity={2.4}
            castShadow={!low}
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-6, 3, -5]} intensity={1.1} color="#00bffe" />
          <pointLight position={[3, -1.5, 2]} intensity={14} color="#fc0065" distance={12} />

          <Float speed={1.4} rotationIntensity={0.22} floatIntensity={0.55}>
            <Slipper progress={progress} interact={interact} />
          </Float>

          {!low && (
            <ContactShadows
              position={[0, -0.85, 0]}
              opacity={0.5}
              scale={9}
              blur={2.8}
              far={4}
              color="#001a44"
            />
          )}

          {/* Locally generated environment — nothing downloaded. */}
          <Environment resolution={low ? 64 : 192} frames={1}>
            <Lightformer form="rect" intensity={3} position={[0, 4, -3]} scale={[9, 4, 1]} color="#ffffff" />
            <Lightformer form="rect" intensity={2.4} position={[-4, 1, 3]} scale={[5, 6, 1]} color="#00bffe" rotation-y={Math.PI / 3} />
            <Lightformer form="rect" intensity={1.8} position={[4, 0, 3]} scale={[5, 6, 1]} color="#fc0065" rotation-y={-Math.PI / 3} />
            <Lightformer form="ring" intensity={1.6} position={[0, -3, 0]} scale={5} color="#0072ce" rotation-x={Math.PI / 2} />
          </Environment>

          <Rig interact={interact} />
        </Suspense>
      </Canvas>
    </div>
  )
}
