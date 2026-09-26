/**
 * Product catalogue transcribed from the Turbotech brochure.
 * Spelling and grammar corrected against the print copy
 * (e.g. "HARDNER" -> "HARDENER", "miosture" -> "moisture", "cushing" -> "cushioning").
 */

export const categories = [
  { id: 'colourants', label: 'Colourants', blurb: 'Pigments engineered for polyurethane systems.' },
  { id: 'release', label: 'Mould Release', blurb: 'Solvent and water based release agents.' },
  { id: 'coatings', label: 'Coatings', blurb: 'In-mould coatings for finished footwear.' },
  { id: 'compounds', label: 'Compounds', blurb: 'EVA and PVC compounds for soles and parts.' },
  { id: 'solvents', label: 'Solvents & Auxiliaries', blurb: 'Process chemicals that keep the line running.' },
]

export const products = [
  {
    slug: 'pu-pigments',
    image: '/assets/img/p-pigments.webp',
    name: 'Pigment for P.U. System',
    short: 'PU Pigments',
    category: 'colourants',
    accent: '#fc0065',
    tagline: 'Everything is white before it is coloured.',
    summary:
      'High strength organic and inorganic pigments dispersed for polyurethane chemistry — vivid colour at low loading, with no interference in the curing reaction.',
    features: [
      { title: 'High colour strength', desc: 'Produces vivid, intense colour with relatively low pigment loading.' },
      { title: 'Excellent dispersion', desc: 'Mixes uniformly into polyol or PU system, minimising streaks or specks.' },
      { title: 'Good compatibility', desc: 'Designed to be compatible with polyurethane chemistry without interfering with curing.' },
      { title: 'Light (UV) fastness', desc: 'Maintains colour when exposed to sunlight.' },
      { title: 'Heat stability', desc: 'Withstands processing temperatures without degrading or changing colour.' },
      { title: 'Chemical resistance', desc: 'Resists oils, fuels, water, mild acids, alkalis and cleaning agents.' },
      { title: 'Migration resistance', desc: 'Minimises colour bleeding or transfer to adjacent materials.' },
      { title: 'Opacity or transparency', desc: 'Available in opaque and transparent grades depending on the application.' },
      { title: 'Weather resistance', desc: 'Suitable grades retain appearance during outdoor exposure.' },
      { title: 'Low moisture content', desc: 'Helps prevent defects such as bubbles or poor surface finish in moisture-sensitive PU systems.' },
      { title: 'Anti-static grades', desc: 'Reduces static charge accumulation on the surface.' },
      { title: 'Phthalate free', desc: 'Formulated to comply with regulations such as REACH, RoHS and CPSIA.' },
    ],
    variants: [
      {
        name: 'Organic Pigments',
        points: ['Bright, vibrant colours', 'High tinting strength', 'Good dispersion', 'Moderate to good UV resistance (grade dependent)'],
      },
      {
        name: 'Inorganic Pigments',
        points: ['Excellent UV and weather resistance', 'High heat stability', 'Superior chemical resistance', 'Iron oxides, titanium dioxide (white), carbon black'],
      },
      {
        name: 'Anti-Static Pigments',
        points: ['Reduces surface static charge', 'Suited to safety and industrial footwear'],
      },
    ],
    applications: ['PU footwear soles', 'Safety shoes', 'Automotive interior PU components', 'Sandals and slippers', 'PU coatings and paints', 'Flexible and rigid PU foams'],
  },
  {
    slug: 'release-agents',
    image: '/assets/img/p-release.webp',
    name: 'Release Agent',
    short: 'Release Agents',
    category: 'release',
    accent: '#00bffe',
    tagline: 'Clean part, clean mould, every cycle.',
    summary:
      'Mould release systems for polyurethane moulding — solvent based and water based, in gloss and matt, with multi-release grades that cut reapplication downtime.',
    features: [
      { title: 'Excellent release performance', desc: 'Enables easy removal of the PU part without sticking or tearing.' },
      { title: 'Good surface finish', desc: 'Produces a smooth, defect-free surface with minimal blemishes.' },
      { title: 'High thermal stability', desc: 'Remains effective at mould operating temperatures.' },
      { title: 'Uniform coating', desc: 'Forms a thin, even film on the mould surface.' },
      { title: 'Non-transfer', desc: 'Leaves little or no residue on the moulded part.' },
      { title: 'Multiple release capability', desc: 'Select grades allow several moulding cycles before reapplication.' },
      { title: 'Fast drying', desc: 'Dries quickly to reduce production cycle time.' },
      { title: 'Low build-up', desc: 'Minimises residue accumulation on the mould, reducing cleaning frequency.' },
      { title: 'Chemical compatibility', desc: 'Does not interfere with PU curing or alter the physical properties of the part.' },
    ],
    variants: [
      {
        name: 'Solvent Based — Gloss & Matt',
        points: ['Excellent release performance', 'Long-lasting effect', 'Smooth finish'],
      },
      {
        name: 'Water Based — Gloss & Matt',
        points: ['Suitable for high-volume production', 'Reduced solvent emissions', 'Improved workplace safety'],
      },
    ],
    applications: ['PU footwear soles', 'Safety shoes', 'PU sandals and slippers', 'Automotive PU components', 'PU foams', 'Industrial PU elastomer parts'],
    checklist: {
      title: 'What an ideal PU mould release should do',
      points: [
        'Apply easily by spray or wipe',
        'Dry fast',
        'Leave no staining or discolouration',
        'Leave minimal residue on the mould and the part',
        'Release consistently over many cycles',
        'Stay compatible with in-mould coatings (IMC)',
      ],
    },
  },
  {
    slug: 'imc',
    image: '/assets/img/p-imc.webp',
    name: 'IMC — In-Mould Coating',
    short: 'IMC',
    category: 'coatings',
    accent: '#5ad6ff',
    tagline: 'The finish is applied before the part exists.',
    summary:
      'In-mould coatings that bond chemically with polyurethane as it cures, giving the finished sole its abrasion resistance, scratch resistance and final gloss or matte appearance.',
    features: [
      { title: 'Excellent adhesion', desc: 'Forms a strong chemical bond with PU, minimising peeling or delamination.' },
      { title: 'High abrasion resistance', desc: 'Improves resistance to scuffing and wear, extending the life of the footwear.' },
      { title: 'Scratch resistance', desc: 'Protects the surface from scratches during regular use.' },
      { title: 'Flexibility', desc: 'Withstands repeated bending and flexing without cracking.' },
      { title: 'Chemical resistance', desc: 'Resists water, oils, mild detergents and many common chemicals.' },
      { title: 'UV resistance', desc: 'Helps reduce fading, discolouration and surface degradation from sunlight.' },
      { title: 'Weather resistance', desc: 'Performs well under varying environmental conditions.' },
      { title: 'Gloss or matte finish', desc: 'Can be formulated to provide different surface appearances.' },
      { title: 'Good colour stability', desc: 'Maintains colour over time with minimal yellowing.' },
      { title: 'Good release characteristics', desc: 'Works with mould release systems while maintaining coating quality.' },
    ],
    applications: ['PU safety shoes', 'Sports shoes', 'Sandals and slippers', 'Industrial footwear', 'Fashion footwear'],
  },
  {
    slug: 'eva-compound',
    image: '/assets/img/p-eva.webp',
    name: 'EVA Compound',
    short: 'EVA Compound',
    category: 'compounds',
    accent: '#00d6a8',
    tagline: 'Light underfoot, hard to wear out.',
    summary:
      'Ethylene vinyl acetate compounds for soles, midsoles and protective padding — low density, high rebound and stable across temperature.',
    features: [
      { title: 'Lightweight', desc: 'Lower density than many plastics, making finished products lighter.' },
      { title: 'Excellent flexibility', desc: 'Soft and rubber-like, even at low temperatures.' },
      { title: 'High shock absorption', desc: 'Outstanding cushioning and impact resistance, ideal for shoe soles and protective padding.' },
      { title: 'Good elasticity and resilience', desc: 'Returns to its original shape after compression.' },
      { title: 'Water resistant', desc: 'Does not swell significantly when exposed to water.' },
      { title: 'Chemical resistance', desc: 'Resistant to many oils, dilute acids, alkalis and saltwater.' },
      { title: 'UV and weather resistance', desc: 'Performs well outdoors compared with many other plastics.' },
      { title: 'Good electrical insulation', desc: 'Suitable for cable insulation and electrical components.' },
      { title: 'Non-toxic', desc: 'Generally considered safe for many consumer applications when used as intended.' },
    ],
    applications: ['Footwear soles and midsoles', 'Sandals and slippers', 'Protective padding', 'Cable insulation', 'Electrical components'],
  },
  {
    slug: 'pvc-compound',
    image: '/assets/img/p-pvc.webp',
    name: 'PVC Compound',
    short: 'PVC Compound',
    category: 'compounds',
    accent: '#8b7dff',
    tagline: 'The economical workhorse.',
    summary:
      'Polyvinyl chloride compounds with strong chemical and abrasion resistance, processable by extrusion, injection, blow moulding or calendering.',
    features: [
      { title: 'Excellent chemical resistance', desc: 'Resistant to many acids, alkalis, salts and oils.' },
      { title: 'Good mechanical strength', desc: 'High tensile strength and durability, especially in rigid PVC.' },
      { title: 'Good weather resistance', desc: 'Suitable for outdoor applications with proper UV stabilisers.' },
      { title: 'Water and moisture resistant', desc: 'Does not absorb water easily.' },
      { title: 'Abrasion resistance', desc: 'Good wear resistance in many industrial applications.' },
      { title: 'Dimensional stability', desc: 'Maintains its shape under normal conditions.' },
      { title: 'Easy to process', desc: 'Can be extruded, injection moulded, blow moulded or calendered.' },
      { title: 'Cost-effective', desc: 'One of the most economical engineering plastics.' },
    ],
    applications: ['PVC footwear soles', 'Sandals and slippers', 'Industrial mouldings', 'Extruded profiles', 'Outdoor components'],
  },

  /* Solvents & auxiliaries. The brochure lists these by name only, so the copy
     here stays deliberately factual and points the visitor to the data sheet. */
  {
    slug: 'mcl',
    image: '/assets/img/MCL-Solvents.avif',
    name: 'MCL',
    short: 'MCL',
    category: 'solvents',
    accent: '#00bffe',
    minimal: true,
    tagline: 'Process solvent for PU lines.',
    summary:
      'Supplied as part of the Turbotech auxiliaries range for polyurethane processing. Technical data sheet, packing sizes and grade options are shared on request.',
    applications: ['PU footwear production', 'Line and equipment processing'],
  },
  {
    slug: 'hardener',
    image: '/assets/img/p-hardener.webp',
    name: 'Hardener',
    short: 'Hardener',
    category: 'solvents',
    accent: '#0072ce',
    minimal: true,
    tagline: 'Cure and crosslink control.',
    summary:
      'Hardener supplied alongside the Turbotech coating and release range. Mixing ratios and grade selection are confirmed against your system on request.',
    applications: ['In-mould coating systems', 'PU finishing operations'],
  },
  {
    slug: 'dmf',
    image: '/assets/img/p-dmf.webp',
    name: 'DMF',
    short: 'DMF',
    category: 'solvents',
    accent: '#5ad6ff',
    minimal: true,
    tagline: 'Dimethylformamide.',
    summary:
      'A polar aprotic solvent widely used across polyurethane processing. Specification, purity and packing details are shared on request.',
    applications: ['PU processing', 'Synthetic leather and coating lines'],
  },
  {
    slug: 'mould-cleaner',
    image: '/assets/img/p-cleaner.webp',
    name: 'Mould Cleaner',
    short: 'Mould Cleaner',
    category: 'solvents',
    accent: '#00d6a8',
    minimal: true,
    tagline: 'Strips build-up between cycles.',
    summary:
      'Cleaner formulated to remove release agent and coating build-up from moulds, restoring surface finish and reducing reject rates.',
    applications: ['PU mould maintenance', 'Scheduled line cleaning'],
  },
  {
    slug: 'bc',
    image: '/assets/img/p-bc.webp',
    name: 'Butyl cellosolve',
    short: 'BC',
    category: 'solvents',
    accent: '#fc0065',
    minimal: true,
    tagline: 'Auxiliary for PU systems.',
    summary:
      'Part of the Turbotech auxiliaries range supplied to PU footwear manufacturers. Technical details are shared on request.',
    applications: ['PU footwear production'],
  },
]

export const productBySlug = (slug) => products.find((p) => p.slug === slug)

/* Photos are from Unsplash (free for commercial use, no attribution required),
   downloaded and stored locally under public/assets/img. */
export const industries = [
  { title: 'Footwear Manufacturing', desc: 'PU, PVC and EVA soles, sandals and slippers produced at line speed.', image: '/assets/img/ind-footwear.webp' },
  { title: 'Safety & Industrial Footwear', desc: 'Anti-static grades, abrasion resistant coatings and durable compounds.', image: '/assets/img/ind-safety.webp' },
  { title: 'Sports & Fashion Footwear', desc: 'Colour accuracy and finish quality where the shoe is the product.', image: '/assets/img/ind-sports.webp' },
  { title: 'Automotive Interiors', desc: 'PU components that must hold colour and shape through years of sunlight.', image: '/assets/img/ind-automotive.webp' },
  { title: 'PU Foams & Elastomers', desc: 'Flexible and rigid foam, plus industrial elastomer parts.', image: '/assets/img/ind-foam.webp' },
  { title: 'Coatings & Paints', desc: 'Pigment dispersions for PU coating and paint systems.', image: '/assets/img/ind-coatings.webp' },
]

/* Customer voices for the home page. The section stays hidden while this is empty —
   add only real, approved quotes. Shape:
   { quote: '...', name: 'Full Name', role: 'Production Head', company: 'Company Name', city: 'Agra' } */
export const testimonials = []

/* Customer / partner logos for the "trusted by" strip. Hidden while empty — add a logo
   only with the customer's permission. Shape: { name: 'Company', logo: '/assets/clients/company.png' } */
export const clients = []

export const company = {
  brand: 'Turbotech',
  legal: 'Nirmal Industries',
  proprietor: 'Nirmal Mittal',
  gstin: '07ARDPM0055B1ZE',
  /* From GST REG-06 (page 1 of the certificate). */
  gstRegisteredFrom: '21 February 2023',
  gstType: 'Regular',
  constitution: 'Proprietorship',
  address: {
    line1: 'Plot No. 128, Khasra No. 69',
    line2: 'Village Singhola',
    city: 'North Delhi, Delhi',
    pin: '110040',
    country: 'India',
  },
  phones: ['+91 81302 43046'],
  email: 'turbotechchemicals@gmail.com',
  website: 'www.turbotechchemicals.com',
  tagline: 'A Complete Solution for P.U., PVC & EVA Footwear',
  motto: "Everything is white before it's coloured",
}
