import { Navigate, useParams } from 'react-router-dom'
import { productBySlug } from '../data/products'
import { pageBySlug } from '../data/productPages'
import ProductPage from './ProductPage'

/* Every product has a full page in productPages.js. MCL, Hardener, DMF,
   Mould Cleaner and BC share the Solvents page, so their old URLs jump to
   their card on it. */
export default function ProductDetail() {
  const { slug } = useParams()
  const page = pageBySlug(slug)
  if (page) return <ProductPage key={page.slug} page={page} />

  const p = productBySlug(slug)
  if (p?.category === 'solvents') return <Navigate to={`/products/solvents#${slug}`} replace />
  return <Navigate to="/products" replace />
}
