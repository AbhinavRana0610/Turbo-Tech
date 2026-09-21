import { motion } from 'motion/react'
import { Arrow, Button } from '../components/ui'

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col items-center justify-center py-[clamp(6rem,14vw,10rem)] text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[clamp(4rem,20vw,11rem)] font-extrabold leading-none text-gradient"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 font-display text-[clamp(1.2rem,3.5vw,2.2rem)] font-extrabold tracking-tight balance"
      >
        This page came out of the mould wrong.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="mt-4 max-w-md text-[clamp(0.85rem,0.5vw+0.76rem,1rem)] leading-relaxed text-slate-500 pretty"
      >
        The page you were looking for does not exist. The product range, though, is right here.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.26 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        <Button to="/">
          Back home <Arrow />
        </Button>
        <Button to="/products" variant="ghost">
          Browse products
        </Button>
      </motion.div>
    </section>
  )
}
