/**
 * Product page copy. Every visible string is taken word for word from the
 * "Turbotech — product page content" Google Doc (one tab per product).
 *
 * A page is a hero plus a list of sections. Each section may carry:
 *   heading, hl      — title, and the part of it drawn in the brand gradient
 *   paras            — paragraphs under the heading
 *   lead, bullets    — a lead-in line and the list it introduces
 *   note             — the small "listed in the brochure" line under a list
 *   after            — paragraphs that follow the list / cards
 * plus type-specific fields (items, groups, badges, form, ...).
 */

const IMG = (n) => `/assets/img/${n}.webp`

const QUOTE_FIELDS = (product) => [
  { name: 'name', label: 'Full Name', autoComplete: 'name', required: true },
  { name: 'company', label: 'Company Name', autoComplete: 'organization' },
  { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel' },
  { name: 'email', label: 'Email Address', type: 'email', autoComplete: 'email' },
  { name: 'product', label: product, initial: true },
  { name: 'application', label: 'Application' },
  { name: 'quantity', label: 'Quantity Requirement' },
  { name: 'message', label: 'Message', textarea: true },
]

const SUPPLY_BADGES = ['Manufactured in Delhi', 'Supplied Across India', 'Exporter Across India']

/* ================================================================ RELEASE AGENTS */
const releaseAgents = {
  slug: 'release-agents',
  name: 'Release Agents',
  accent: '#00bffe',
  image: IMG('p-release'),
  hero: {
    title: 'Advanced Release Solutions for PU Moulding',
    hl: 'PU Moulding',
    paras: [
      'Turbotech by Nirmal Industries offers performance-focused PU Release Agents designed to support smooth demoulding, consistent surface finish and efficient production across a range of polyurethane applications.',
      'In PU footwear manufacturing, the release stage plays an important role in maintaining production efficiency and finished-product quality. A suitable release solution helps the moulded component separate from the mould while supporting a clean surface and reducing unwanted residue.',
      'Our release-agent range is designed for applications including PU footwear soles, safety shoes, sandals, slippers, PU foams and industrial PU elastomer parts. The product range includes solvent-based and water-based formulations with gloss and matte finish options.',
    ],
    highlight:
      'RELEASE Manufactured in Delhi and supplied across India, our solutions are focused on the practical requirements of modern PU moulding and footwear manufacturing.',
    ctas: [
      { label: 'Get a Quote', to: '#quote' },
      { label: 'Contact Us', to: '/contact', variant: 'ghost' },
    ],
    chips: ['Excellent Release Performance', 'Fast Drying', 'Low Mould Build-Up'],
  },
  marquee: [
    'Excellent release performance',
    'Smooth surface finish',
    'High thermal stability',
    'Uniform coating',
    'Fast drying',
    'Low mould build-up',
    'Minimal residue',
    'Consistent release performance',
  ],
  sections: [
    {
      type: 'prose',
      layout: 'features',
      heading: 'Reliable PU Release Agents for Better Production',
      hl: 'Better Production',
      paras: [
        'A smooth mould-release process can make a significant difference to production efficiency and finished-product appearance. Difficult demoulding, mould sticking, excessive residue or inconsistent release can create challenges during manufacturing.',
        'A well-suited release agent is designed to support the separation of the moulded component from the mould while maintaining the required surface quality.',
      ],
      lead: 'Our release solutions focus on key characteristics such as:',
      bullets: [
        'Excellent release performance',
        'Smooth surface finish',
        'High thermal stability',
        'Uniform coating',
        'Fast drying',
        'Low mould build-up',
        'Minimal residue',
        'Consistent release performance',
        'Multiple release capability for suitable grades',
      ],
      note: 'These characteristics are identified in the supplied product brochure.',
    },
    {
      type: 'cards',
      layout: 'stack',
      heading: 'Why Choose PU Release Agents?',
      hl: 'PU Release Agents?',
      items: [
        {
          t: 'Excellent Release Performance',
          d: [
            'The primary purpose of a mould-release solution is to make the removal of the finished component easier and more efficient. Our release solutions are designed to support easy removal of PU components while helping minimize sticking and tearing during the demoulding process.',
            'This can be particularly important in footwear production, where moulding consistency and finished-product quality are closely connected.',
          ],
        },
        {
          t: 'Smooth Surface Finish',
          d: [
            'Surface appearance is an important part of finished footwear components. A suitable release system can help support a smooth and clean surface with minimal blemishes.',
            'Our release solutions are designed to form an even film over the mould surface, helping support consistent release and surface quality.',
          ],
        },
        {
          t: 'High Thermal Stability',
          d: [
            'PU moulding processes can involve specific operating temperatures. The release agent needs to remain effective under appropriate moulding conditions.',
            'Our release-agent range is designed with thermal stability as an important performance characteristic, supporting release performance at suitable mould operating temperatures.',
          ],
        },
        {
          t: 'Fast Drying',
          d: [
            'Fast drying can help reduce waiting time between application and moulding. For production environments where cycle efficiency matters, a fast-drying release system can support a smoother workflow.',
            'Turbotech release solutions include fast-drying characteristics designed to help reduce production cycle time.',
          ],
        },
        {
          t: 'Low Mould Build-Up',
          d: [
            'Repeated moulding can result in unwanted residue accumulation if the release system is not properly suited to the application.',
            'Our release solutions are designed to minimize mould build-up, helping reduce cleaning frequency and maintain a cleaner mould surface during production.',
          ],
        },
        {
          t: 'Consistent Release Performance',
          d: [
            'Consistency is important in manufacturing. A release system should provide reliable performance across the intended moulding process.',
            'Certain grades in the range are designed to provide multiple release capability, allowing several moulding cycles before reapplication under suitable conditions.',
          ],
        },
      ],
    },
    {
      type: 'types',
      id: 'types',
      heading: 'Types of PU Release Agents',
      hl: 'PU Release Agents',
      paras: [
        'Different manufacturing processes can require different release technologies. Our range includes both solvent-based and water-based release formulations.',
      ],
      groups: [
        {
          t: 'Solvent-Based Release Agents',
          d: ['Solvent-based release formulations are designed to provide effective release performance along with the required surface characteristics.'],
          subs: [
            { t: 'Gloss Finish', d: 'Suitable for applications where a smooth and glossy appearance is desired.', finish: 'gloss' },
            { t: 'Matte Finish', d: 'Suitable for applications where a controlled matte or low-gloss surface appearance is preferred.', finish: 'matte' },
          ],
          after: ['The supplied brochure identifies both gloss and matte solvent-based options.'],
        },
        {
          t: 'Water-Based Release Agents',
          d: [
            'Water-based release formulations provide an alternative solution for applications where water-based chemistry is preferred.',
            'The product brochure lists both gloss and matte water-based formulations and identifies their suitability for high-volume production.',
          ],
        },
      ],
      after: [
        'The selection between solvent-based and water-based solutions should be based on the specific moulding process, application method, desired surface finish and production requirements.',
      ],
    },
    {
      type: 'apps',
      heading: 'Applications',
      hl: 'Applications',
      items: [
        { t: 'PU Footwear Soles', d: 'Release solutions designed to support efficient demoulding and smooth surface finishing during PU footwear sole manufacturing.', img: IMG('ind-footwear') },
        { t: 'Safety Shoes', d: 'Suitable release solutions for PU safety footwear applications where consistent mould release and surface appearance are important.', img: IMG('ind-safety') },
        { t: 'PU Sandals & Slippers', d: 'Solutions designed to support smooth demoulding and clean surface finishing for different sandal and slipper applications.', img: IMG('p-eva') },
        { t: 'Automotive PU Components', d: 'Release solutions for relevant PU component applications where mould release and surface quality are required.', img: IMG('ind-automotive') },
        { t: 'PU Foams', d: 'Suitable release solutions for applicable polyurethane foam moulding processes.', img: IMG('ind-foam') },
        { t: 'Industrial PU Elastomer Parts', d: 'Solutions designed for relevant industrial PU elastomer moulding applications.', img: IMG('ind-industrial') },
      ],
      note: 'These applications are specifically listed in the supplied Turbotech brochure.',
    },
    {
      type: 'prose',
      layout: 'image',
      image: IMG('about-factory'),
      heading: 'Release Agent Manufacturer in Delhi',
      hl: 'in Delhi',
      paras: [
        'Turbotech operates under Nirmal Industries, with its manufacturing address located in Village Singhola, Delhi. The company portfolio includes solutions for P.U., PVC and EVA footwear, including pigments, release agents, IMC, compounds and specialty chemicals.',
        'As a Release Agent Manufacturer in Delhi, our focus is on providing release solutions for footwear manufacturing and relevant PU moulding applications.',
        'Our Delhi-based manufacturing presence enables us to serve customers across different regions of India.',
      ],
      badges: ['Manufactured in Delhi', 'Supplied Across India', 'Export Enquiries Welcome'],
      after: ['For product enquiries, bulk requirements or application-specific requirements, customers can contact the team directly.'],
    },
    {
      type: 'prose',
      layout: 'split',
      heading: 'PU Mould Release Agent for Footwear Manufacturing',
      hl: 'Footwear Manufacturing',
      paras: [
        'A PU Mould Release Agent is used to assist in separating moulded polyurethane components from mould surfaces.',
        'For footwear manufacturers, efficient mould release is important because sticking, tearing or excessive residue can affect both production efficiency and the appearance of the finished product.',
      ],
      lead: 'A suitable PU mould release solution can support:',
      bullets: [
        'Easier demoulding',
        'Reduced sticking',
        'Smooth surface finish',
        'Reduced residue',
        'Cleaner mould operation',
        'Efficient production cycles',
        'Consistent mould release',
      ],
      after: ['The ideal release solution depends on the specific application and manufacturing conditions.'],
    },
    {
      type: 'range',
      heading: 'PU Release Agent Manufacturer for Footwear Applications',
      hl: 'Footwear Applications',
      paras: ['As a PU Release Agent Manufacturer, our release solutions form part of a wider footwear chemical portfolio.'],
      lead: 'The product range includes:',
      bullets: [
        { t: 'PU Pigments', to: '/products/pu-pigments' },
        { t: 'Release Agents', to: '/products/release-agents' },
        { t: 'IMC', to: '/products/imc' },
        { t: 'EVA Compound', to: '/products/eva-compound' },
        { t: 'PVC Compound', to: '/products/pvc-compound' },
        { t: 'MCL', to: '/products/solvents#mcl' },
        { t: 'Hardener', to: '/products/solvents#hardener' },
        { t: 'DMF', to: '/products/solvents#dmf' },
        { t: 'Mould Cleaner', to: '/products/solvents#mould-cleaner' },
        { t: 'BC', to: '/products/solvents#bc' },
      ],
      note: 'These categories are listed in the supplied product brochure.',
      after: ['This product range allows footwear manufacturers to source multiple PU, PVC and EVA-related chemical requirements through one focused product portfolio.'],
    },
    {
      type: 'cards',
      layout: 'grid',
      heading: 'What Makes an Ideal PU Release Agent?',
      hl: 'Ideal PU Release Agent?',
      paras: ['Choosing the right release agent requires consideration of the complete manufacturing process.'],
      items: [
        { t: 'Easy Application', d: 'The product should be suitable for the intended application method, including spray or wipe application where applicable.' },
        { t: 'Fast Drying', d: 'Fast drying can support shorter waiting periods and more efficient moulding cycles.' },
        { t: 'No Staining or Discolouration', d: 'A suitable release system should help maintain the desired appearance of the moulded component without unwanted staining or discolouration.' },
        { t: 'Minimal Residue', d: 'Low residue on the mould and finished component can help reduce cleaning requirements and maintain surface quality.' },
        { t: 'Consistent Release', d: 'Consistent release performance is important when the same mould is used repeatedly during production.' },
        { t: 'Compatibility', d: 'The release solution should be appropriate for the relevant PU system, moulding process and associated materials or coatings.' },
      ],
      note: 'The brochure specifically identifies easy application, fast drying, no staining or discolouration, minimal residue, consistent release and compatibility as characteristics of an ideal PU mould release.',
    },
    {
      type: 'supply',
      heading: 'Manufactured in Delhi, Supplied Across India',
      hl: 'Supplied Across India',
      paras: [
        'RELEASE Manufactured in Delhi is part of a broader range of footwear chemical solutions produced under Nirmal Industries.',
        'From Delhi, our product range is supplied to customers across India looking for PU, PVC and EVA-related chemical solutions.',
      ],
      lead: 'Our supply positioning focuses on:',
      items: [
        { t: 'Delhi Manufacturing', d: 'Products manufactured under Nirmal Industries in Delhi.', icon: 'pin' },
        { t: 'Pan-India Supply', d: 'Solutions supplied to customers across different footwear manufacturing regions in India.', icon: 'truck' },
        { t: 'Export Enquiries', d: 'Product requirements from customers outside India can be discussed based on product availability, quantity and destination.', icon: 'globe' },
      ],
      after: ['For export enquiries, customers can share their product requirement, application, quantity and destination with the team.'],
    },
    {
      type: 'checklist',
      heading: 'Find the Right Release Solution',
      hl: 'Release Solution',
      paras: ['Every moulding process has different requirements. Selecting a suitable release agent may depend on:'],
      bullets: [
        'Type of PU system',
        'Mould material',
        'Mould operating temperature',
        'Application method',
        'Desired surface finish',
        'Production volume',
        'Release requirements',
        'Mould cleaning requirements',
      ],
      after: [
        'If you are unsure which release solution is suitable for your application, share your manufacturing requirements with our team.',
        'Providing information about the PU system, mould type, application process and desired finish can help in identifying the appropriate product for the requirement.',
      ],
    },
    {
      type: 'quote',
      id: 'quote',
      eyebrow: 'Talk to Our Team',
      heading: 'Looking for the Right PU Release Solution?',
      hl: 'PU Release Solution?',
      paras: [
        'Whether your requirement is for a PU Mould Release Agent, solvent-based release formulation, water-based release formulation, gloss finish or matte finish, the product should be selected according to your specific application and manufacturing process.',
        'For footwear manufacturers, PU processors and relevant industrial applications, our release solutions are designed around important requirements such as demoulding, surface finish, drying, residue control and production consistency.',
      ],
      form: { title: 'Request a Quote', fields: QUOTE_FIELDS('Product Requirement'), cta: 'Get a Quote' },
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      hl: 'Questions',
      items: [
        {
          q: 'What are PU Release Agents used for?',
          a: 'PU Release Agents are used to assist in removing moulded polyurethane components from mould surfaces. They can help reduce sticking and tearing while supporting a smooth and clean surface finish. The supplied brochure lists applications including PU footwear soles, safety shoes, sandals, slippers, PU foams and industrial PU elastomer parts.',
        },
        {
          q: 'What types of Release Agents are available?',
          a: 'The product range includes solvent-based and water-based release formulations, with gloss and matte finish options. The appropriate formulation depends on the application, moulding process and required finish.',
        },
        {
          q: 'What are the key benefits of PU Release Agents?',
          a: 'Important characteristics include excellent release performance, smooth surface finish, thermal stability, uniform coating, fast drying, low mould build-up and minimal residue. Certain grades may also provide multiple release capability.',
        },
        {
          q: 'Can PU Release Agents be used for footwear manufacturing?',
          a: 'Yes. The supplied product information specifically identifies PU footwear soles, safety shoes, PU sandals and slippers among the applications.',
        },
        {
          q: 'How do I select the right Release Agent?',
          a: 'Selection depends on factors such as the PU system, mould material, operating conditions, application method, desired surface finish and production requirements. Sharing these details can help determine the appropriate product for a particular application.',
        },
      ],
    },
    {
      type: 'conclusion',
      eyebrow: 'Conclusion',
      heading: 'Reliable Release Solutions for Consistent PU Moulding',
      paras: [
        'A reliable release system is an important part of achieving smooth demoulding, consistent surface quality and efficient production. The right formulation can help reduce mould sticking, minimize unwanted residue, support faster processing and maintain the desired appearance of the finished moulded component.',
        'From solvent-based and water-based formulations to gloss and matte finish options, release solutions should be selected according to the specific PU system, mould material, operating conditions, application method and production requirements.',
        'With applications covering PU footwear soles, safety shoes, sandals, slippers, PU foams and industrial PU elastomer parts, Turbotech provides release solutions focused on practical PU moulding requirements.',
      ],
    },
  ],
}

/* ================================================================ PU PIGMENTS */
const puPigments = {
  slug: 'pu-pigments',
  name: 'PU Pigments',
  accent: '#fc0065',
  image: IMG('p-pigments'),
  hero: {
    title: 'High-Performance PU Pigments for Consistent Colour',
    hl: 'Consistent Colour',
    paras: [
      'Turbotech by Nirmal Industries offers PU Pigments designed to deliver vibrant colour, excellent dispersion and reliable performance across polyurethane applications. Colour plays an important role in footwear manufacturing, and the right pigment solution needs to provide not only the desired shade but also consistency during processing and finished-product performance.',
      'Our PU pigment solutions are designed around key requirements including high colour strength, excellent dispersion, PU compatibility, light and UV fastness, heat stability, chemical resistance and migration resistance. The range also includes pigment options with different opacity and transparency characteristics depending on application requirements.',
    ],
    highlight:
      'PIGMENT Manufactured in Delhi and supplied across India, our solutions are positioned for manufacturers looking for dependable colour solutions for PU footwear and related applications.',
    ctas: [
      { label: 'Get a Quote', to: '#quote' },
      { label: 'Explore PU Pigments', to: '#types', variant: 'ghost' },
    ],
    chips: ['High Colour Strength', 'Excellent Dispersion', 'Light & UV Fastness'],
    swatches: true,
  },
  marquee: [
    'High colour strength',
    'Excellent dispersion',
    'Good PU compatibility',
    'Light and UV fastness',
    'Heat stability',
    'Chemical resistance',
    'Migration resistance',
    'Weather resistance',
  ],
  sections: [
    {
      type: 'prose',
      layout: 'features',
      heading: 'Vibrant Colour. Consistent Performance.',
      hl: 'Consistent Performance.',
      paras: [
        'In polyurethane manufacturing, colour is more than just appearance. A pigment needs to disperse properly within the PU system, provide the required colour strength and remain stable throughout processing and product use.',
        'Turbotech PU Pigments are designed to support these requirements through a combination of colour performance and application-focused properties.',
      ],
      lead: 'Our pigment solutions focus on:',
      bullets: [
        'High colour strength',
        'Excellent dispersion',
        'Good PU compatibility',
        'Light and UV fastness',
        'Heat stability',
        'Chemical resistance',
        'Migration resistance',
        'Opacity and transparency options',
        'Weather resistance',
        'Low moisture content',
        'Anti-static options',
        'Phthalate-free options',
      ],
      note: 'These characteristics are identified in the supplied Turbotech product brochure.',
    },
    {
      type: 'cards',
      layout: 'stack',
      heading: 'Why Choose PU Pigments?',
      hl: 'PU Pigments?',
      items: [
        {
          t: 'High Colour Strength',
          d: [
            'High colour strength allows the required colour intensity to be achieved with relatively low pigment loading. This can be important for manufacturers looking for vivid and intense shades while maintaining appropriate formulation requirements.',
            'The Turbotech brochure specifically identifies high colour strength as a key characteristic of its PU pigment range.',
          ],
        },
        {
          t: 'Excellent Dispersion',
          d: [
            'Uniform dispersion is essential for achieving consistent colour throughout the PU system.',
            'Turbotech PU Pigments are designed to mix uniformly within polyol or PU systems, helping minimize streaks and specks and supporting a more consistent finished appearance.',
          ],
        },
        {
          t: 'Good PU Compatibility',
          d: [
            'Pigment compatibility with the polyurethane system is an important consideration during formulation and processing.',
            'Our pigment solutions are designed to be compatible with polyurethane chemistry without interfering with the curing process under suitable application conditions.',
          ],
        },
        {
          t: 'Light & UV Fastness',
          d: [
            'Finished products may be exposed to sunlight and other environmental conditions. Suitable pigment performance can help maintain colour appearance over time.',
            'The brochure identifies light and UV fastness as a characteristic of the PU pigment range.',
          ],
        },
        {
          t: 'Heat Stability',
          d: [
            'PU processing involves specific processing temperatures, making pigment heat stability an important consideration.',
            'Turbotech pigments are designed to withstand processing temperatures without unwanted degradation or significant colour change under suitable conditions.',
          ],
        },
        {
          t: 'Chemical Resistance',
          d: [
            'Depending on the application, finished PU products may come into contact with oils, fuels, water, mild acids, alkalis or cleaning agents.',
            'The product brochure identifies chemical resistance against these types of exposures as a characteristic of the PU pigment range.',
          ],
        },
      ],
    },
    {
      type: 'types',
      id: 'types',
      heading: 'Types of PU Pigments',
      hl: 'PU Pigments',
      paras: ['Different footwear and PU applications can require different pigment technologies. The brochure identifies two broad pigment categories.'],
      groups: [
        {
          t: 'Organic Pigments',
          lead: 'Organic pigments are associated with:',
          bullets: ['Bright and vibrant colours', 'High tinting strength', 'Good dispersion', 'Moderate to good UV resistance depending on grade'],
          after: ['These characteristics make them relevant for applications where strong and vibrant colour performance is required.'],
          palette: ['#fc0065', '#ff7a00', '#ffc400', '#00c26e', '#00bffe', '#7a3cff'],
        },
        {
          t: 'Inorganic Pigments',
          lead: 'Inorganic pigments are associated with:',
          bullets: ['Excellent UV and weather resistance', 'High heat stability', 'Superior chemical resistance'],
          after: ['Common examples identified in the brochure include iron oxides, titanium dioxide and carbon black.'],
          palette: ['#9c3b1b', '#c0622b', '#d99a3a', '#f4f4f0', '#8a8f98', '#16181d'],
        },
      ],
      after: ['The appropriate pigment type should be selected according to the required colour, application, processing conditions and performance requirements.'],
    },
    {
      type: 'apps',
      heading: 'PU Pigments for Footwear Applications',
      hl: 'Footwear Applications',
      paras: ['Colour consistency is an important part of footwear manufacturing. Different footwear categories may require different colours, finishes and performance characteristics.'],
      lead: 'Turbotech PU Pigments are listed for applications including:',
      items: [
        { t: 'PU Footwear Soles', d: 'Pigment solutions for adding vibrant and consistent colour to PU footwear sole applications.', img: IMG('ind-footwear') },
        { t: 'Safety Shoes', d: 'Colour solutions suitable for PU components used in safety footwear.', img: IMG('ind-safety') },
        { t: 'Sandals & Slippers', d: 'Pigment solutions for a wide range of PU sandal and slipper applications.', img: IMG('p-eva') },
        { t: 'Automotive PU Components', d: 'Suitable pigment applications for relevant automotive PU components.', img: IMG('ind-automotive') },
        { t: 'PU Coatings & Paints', d: 'Pigment solutions for applicable polyurethane coating and paint applications.', img: IMG('ind-coatings') },
        { t: 'Flexible & Rigid PU Foams', d: 'Pigments for relevant flexible and rigid polyurethane foam applications.', img: IMG('ind-foam') },
      ],
      note: 'These applications are specifically listed in the supplied product brochure.',
    },
    {
      type: 'prose',
      layout: 'image',
      image: IMG('story-lab'),
      heading: 'PU Pigment Manufacturer in Delhi',
      hl: 'in Delhi',
      paras: [
        'Turbotech operates under Nirmal Industries, with its manufacturing address in Village Singhola, Delhi. The product portfolio includes PU pigments along with release agents, IMC, EVA compounds, PVC compounds and specialty chemicals.',
        'As a PU Pigment Manufacturer in Delhi, our focus is on providing colour solutions for polyurethane applications where colour strength, dispersion, compatibility and performance are important considerations.',
        'Our Delhi-based manufacturing presence supports our ability to supply pigment solutions to customers across India.',
      ],
      badges: ['Manufactured in Delhi', 'Supplied Across India', 'Export Enquiries Welcome'],
      after: ['For bulk pigment requirements, shade-related enquiries or application requirements, customers can contact the team directly.'],
    },
    {
      type: 'cards',
      layout: 'grid',
      heading: 'PU Colour Pigments for Consistent Shades',
      hl: 'Consistent Shades',
      paras: ['A good PU colour pigment needs to provide more than a visually attractive shade. It should also work effectively within the relevant PU formulation and maintain suitable performance during processing and product use.'],
      lead: 'Turbotech PU Colour Pigments are designed around important requirements including:',
      items: [
        { t: 'Colour Strength', d: 'For vivid and intense shades.' },
        { t: 'Dispersion', d: 'For uniform distribution within the PU system.' },
        { t: 'Compatibility', d: 'For appropriate interaction with polyurethane chemistry.' },
        { t: 'Heat Stability', d: 'For suitable processing conditions.' },
        { t: 'Light Fastness', d: 'For maintaining colour appearance during exposure to light.' },
        { t: 'Chemical Resistance', d: 'For relevant exposure conditions.' },
      ],
      compact: true,
      note: 'These properties are outlined in the product information supplied for the PU pigment range.',
    },
    {
      type: 'cards',
      layout: 'swatch',
      heading: 'Pigment Solutions for Different Colour Requirements',
      hl: 'Different Colour Requirements',
      paras: ['Every footwear manufacturer may have different colour requirements. Some applications require bright and vibrant shades, while others may need strong opacity, transparency, weather resistance or high heat stability.'],
      lead: 'The brochure identifies options with:',
      items: [
        { t: 'Opacity', d: 'Suitable grades can provide strong coverage where an opaque appearance is required.', swatch: 'opaque' },
        { t: 'Transparency', d: 'Transparent grades can be selected for applications requiring a different visual effect.', swatch: 'transparent' },
        { t: 'Bright Colours', d: 'Organic pigment options can provide bright and vibrant colours with high tinting strength.', swatch: 'bright' },
        { t: 'Weather Resistance', d: 'Suitable pigment grades can support colour retention during outdoor exposure.', swatch: 'weather' },
        { t: 'Heat Stability', d: 'Inorganic pigments can provide high heat stability for relevant applications.', swatch: 'heat' },
      ],
      after: ['The exact grade should be selected according to the application and required performance.'],
    },
    {
      type: 'cards',
      layout: 'grid',
      heading: 'Additional PU Pigment Properties',
      hl: 'PU Pigment Properties',
      cols: 2,
      items: [
        { t: 'Weather Resistance', d: 'For products exposed to outdoor environments, weather resistance can be an important consideration. Suitable pigment grades are designed to help retain appearance during environmental exposure.' },
        { t: 'Low Moisture Content', d: 'Moisture can be an important consideration in moisture-sensitive PU systems. The brochure identifies low moisture content as a characteristic that can help prevent issues such as bubbles or poor surface finish.' },
        { t: 'Anti-Static Options', d: 'Anti-static pigment options are identified as being designed to reduce static charge accumulation on the surface.' },
        { t: 'Phthalate-Free Options', d: 'The brochure identifies phthalate-free pigment options and references regulations including REACH, RoHS and CPSIA. Specific compliance should always be confirmed for the particular grade and product documentation.' },
      ],
    },
    {
      type: 'checklist',
      heading: 'From Shade Selection to Finished Product',
      hl: 'Finished Product',
      paras: ['Selecting the right pigment requires understanding the complete application.'],
      lead: 'Important factors may include:',
      bullets: [
        'Required shade',
        'Colour strength',
        'Pigment loading',
        'PU system',
        'Dispersion requirements',
        'Processing temperature',
        'Desired opacity',
        'Transparency',
        'UV exposure',
        'Chemical exposure',
        'Finished-product application',
      ],
      after: [
        'The appropriate pigment grade should be selected based on the specific formulation and performance requirements.',
        'For manufacturers with specific shade or application requirements, sharing the details with the technical/product team can help identify the relevant product option.',
      ],
    },
    {
      type: 'supply',
      heading: 'Serving Customers Across India',
      hl: 'Across India',
      paras: ['PIGMENT Manufactured in Delhi and supplied to customers across India, the product range is positioned to serve footwear manufacturers and other relevant PU applications.'],
      lead: 'Our supply approach focuses on:',
      items: [
        { t: 'Delhi Manufacturing', d: 'Manufacturing under Nirmal Industries in Delhi.', icon: 'pin' },
        { t: 'Pan-India Supply', d: 'Supply of PU pigment solutions to customers across different regions of India.', icon: 'truck' },
        { t: 'Bulk Requirements', d: 'Product enquiries for commercial and industrial quantities.', icon: 'box' },
        { t: 'Export Enquiries', d: 'Customers outside India can share their product, quantity and destination requirements for further discussion.', icon: 'globe' },
      ],
      note: "The company's Delhi address and contact details are provided in the supplied brochure.",
    },
    {
      type: 'checklist',
      style: 'grid',
      heading: 'Find the Right PU Pigment',
      hl: 'PU Pigment',
      paras: ['Every application has different colour and performance requirements. Before selecting a pigment, manufacturers may need to consider:'],
      bullets: [
        'Desired colour or shade',
        'Required colour strength',
        'PU formulation',
        'Dispersion requirements',
        'Processing temperature',
        'Required opacity or transparency',
        'UV and weather exposure',
        'Chemical exposure',
        'Finished-product requirements',
        'Production volume',
      ],
      after: ['If you have a specific shade or application requirement, share the details with our team.'],
    },
    {
      type: 'quote',
      id: 'quote',
      eyebrow: 'Talk to Our Team',
      heading: 'Looking for the Right PU Pigment?',
      hl: 'PU Pigment?',
      paras: [
        'Whether you need pigments for PU footwear soles, safety shoes, sandals, slippers, coatings, paints or other relevant polyurethane applications, the right grade should be selected according to your formulation and performance requirements.',
        'Share your requirement with our team for product information, bulk enquiries and application-related discussions.',
      ],
      form: { title: 'Request a Quote', fields: QUOTE_FIELDS('Product / Shade Requirement'), cta: 'Get a Quote' },
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      hl: 'Questions',
      items: [
        {
          q: 'What are PU Pigments used for?',
          a: 'PU Pigments are used to provide colour to polyurethane-based products and applications. The Turbotech brochure lists applications including PU footwear soles, safety shoes, sandals, slippers, automotive PU components, PU coatings and paints, and flexible and rigid PU foams.',
        },
        {
          q: 'What are the key properties of PU Pigments?',
          a: 'Important properties listed in the brochure include high colour strength, excellent dispersion, PU compatibility, light and UV fastness, heat stability, chemical resistance, migration resistance, weather resistance and low moisture content.',
        },
        {
          q: 'What is the difference between organic and inorganic pigments?',
          a: 'The brochure describes organic pigments as offering bright colours, high tinting strength and good dispersion, while inorganic pigments are associated with high heat stability, UV/weather resistance and chemical resistance.',
        },
        {
          q: 'Can PU Pigments be used for footwear manufacturing?',
          a: 'Yes. PU footwear soles, safety shoes, sandals and slippers are specifically listed among the applications of the PU pigment range.',
        },
        {
          q: 'How do I choose the right PU Pigment?',
          a: 'Selection depends on the required shade, colour strength, PU system, dispersion, processing conditions, opacity or transparency and required performance. Share your application details and product requirement to discuss the suitable pigment grade.',
        },
      ],
    },
    {
      type: 'conclusion',
      eyebrow: 'Conclusion',
      heading: 'Colour That Supports Better Footwear',
      paras: [
        'The right pigment plays an important role in achieving the desired colour, appearance and performance of a polyurethane product. From high colour strength and excellent dispersion to UV stability, heat resistance, chemical resistance and migration resistance, pigment selection should always be aligned with the specific application and processing requirements.',
        'With solutions for PU footwear soles, safety shoes, sandals, slippers, coatings, paints and other relevant polyurethane applications, Turbotech provides pigment solutions focused on consistent colour and application performance.',
      ],
    },
  ],
}

/* ================================================================ IMC */
const imc = {
  slug: 'imc',
  name: 'IMC',
  accent: '#5ad6ff',
  image: IMG('p-imc'),
  hero: {
    title: 'IMC for PU Footwear Manufacturing',
    hl: 'PU Footwear Manufacturing',
    sub: 'Advanced IMC Solutions for Durable & High-Performance Footwear',
    paras: [
      'IMC is an important coating solution for footwear manufacturing, particularly for applications where adhesion, abrasion resistance, scratch resistance, flexibility, chemical resistance and colour stability are important requirements.',
      'IMC Manufactured in Delhi is positioned for footwear applications where manufacturers require a combination of surface performance, durability and appearance. The product information also highlights UV/weather resistance, gloss and matte finish options, and good release characteristics, making IMC suitable for different footwear applications.',
      'For footwear manufacturers, an effective IMC solution can play an important role in achieving the desired surface characteristics of the finished product. Depending on the application, factors such as adhesion, flexibility, abrasion resistance, scratch resistance and colour stability can influence the final performance.',
    ],
    ctas: [
      { label: 'Get a Quote', to: '/contact' },
      { label: 'Contact Us', to: '/contact', variant: 'ghost' },
    ],
    chips: ['Excellent Adhesion', 'Scratch Resistance', 'Colour Stability'],
  },
  marquee: [
    'Excellent Adhesion',
    'Abrasion Resistance',
    'Scratch Resistance',
    'Flexibility',
    'Chemical Resistance',
    'UV & Weather Resistance',
    'Colour Stability',
  ],
  sections: [
    {
      type: 'cards',
      layout: 'grid',
      heading: 'Key Properties of IMC',
      hl: 'IMC',
      paras: [
        'IMC provides a combination of properties designed around the requirements of footwear applications. Its performance characteristics include excellent adhesion, which supports the bonding of the coating with the relevant footwear surface.',
      ],
      items: [
        { t: 'Excellent Adhesion', d: 'Strong adhesion is an important requirement for footwear coatings. IMC provides excellent adhesion, supporting applications where a reliable coating-to-surface bond is required.' },
        { t: 'Abrasion Resistance', d: 'Footwear surfaces can experience regular friction and contact during use. IMC offers abrasion resistance, making it suitable for applications where resistance to surface wear is important.' },
        { t: 'Scratch Resistance', d: 'Scratch resistance helps support surface appearance when footwear is exposed to regular handling and use. IMC provides scratch resistance as part of its overall performance characteristics.' },
        { t: 'Flexibility', d: 'Footwear materials need to accommodate movement and bending. IMC provides flexibility, making it suitable for footwear applications where the coated surface needs to work with the movement of the product.' },
        { t: 'Chemical Resistance', d: 'IMC also provides chemical resistance, supporting applications where resistance to different chemical conditions is an important consideration.' },
        { t: 'UV & Weather Resistance', d: 'UV and weather resistance provide additional protection for suitable footwear applications exposed to environmental conditions.' },
      ],
    },
    {
      type: 'prose',
      layout: 'image',
      image: IMG('ps-wear'),
      heading: 'Why Choose IMC for Footwear?',
      hl: 'for Footwear?',
      paras: [
        'Footwear manufacturers require surface solutions that can combine appearance with functional performance. IMC provides a combination of coating properties that can support these requirements.',
        'Its adhesion characteristics help support coating performance, while abrasion and scratch resistance contribute to surface durability. Flexibility allows the coating to accommodate footwear movement, while chemical and UV/weather resistance provide additional performance characteristics.',
        'IMC is also available with gloss and matte finish options, allowing manufacturers to consider different surface appearance requirements depending on the intended footwear product.',
      ],
    },
    {
      type: 'prose',
      layout: 'split',
      heading: 'IMC for Footwear Applications',
      hl: 'Footwear Applications',
      paras: [
        'IMC for Footwear can be considered for applications where manufacturers require a balance of surface adhesion, durability, flexibility and appearance.',
        'The combination of abrasion resistance, scratch resistance and colour stability makes it relevant for footwear products where maintaining surface quality is important.',
        'Its flexibility and resistance characteristics further support applications where the coated footwear surface may experience movement, handling and environmental exposure.',
        'The specific IMC solution should be selected according to the footwear material, application process and desired final surface characteristics.',
      ],
    },
    {
      type: 'apps',
      heading: 'Applications of IMC',
      hl: 'IMC',
      paras: ['According to the available product information, IMC is suitable for several footwear applications.'],
      items: [
        { t: 'PU Safety Shoes', d: 'IMC can be used for PU safety shoe applications where adhesion, durability and surface performance are important.', img: IMG('ind-safety') },
        { t: 'Sports Shoes', d: "Sports footwear can require flexible and durable surface solutions. IMC's combination of flexibility, abrasion resistance and scratch resistance makes it relevant to this application.", img: IMG('ind-sports') },
        { t: 'Sandals & Slippers', d: 'IMC is suitable for sandals and slippers where surface appearance, flexibility and durability are important considerations.', img: IMG('p-eva') },
        { t: 'Industrial Footwear', d: 'Industrial footwear can require resistance to abrasion, chemicals and environmental conditions. IMC provides several of these characteristics for suitable applications.', img: IMG('ind-industrial') },
        { t: 'Fashion Footwear', d: 'For fashion footwear, surface appearance and colour stability can be important considerations. IMC offers gloss and matte finish options along with colour stability.', img: IMG('ind-fashion') },
      ],
    },
    {
      type: 'trio',
      items: [
        {
          heading: 'IMC Manufacturer in Delhi',
          icon: 'pin',
          paras: [
            'For manufacturers searching for an IMC Manufacturer in Delhi, a Delhi-based manufacturing source provides access to footwear coating solutions designed around relevant performance requirements.',
            'IMC is positioned for applications where manufacturers require adhesion, abrasion resistance, scratch resistance, flexibility, chemical resistance and colour stability.',
            'Its UV/weather resistance and gloss or matte finish options provide additional characteristics for suitable footwear applications.',
          ],
        },
        {
          heading: 'IMC Supplier Across India',
          icon: 'truck',
          paras: [
            'For footwear manufacturers, dependable supply is an important consideration when sourcing coating materials. An IMC Supplier Across India can support manufacturers looking for access to footwear coating solutions across different regions.',
          ],
          badges: SUPPLY_BADGES,
          after: ['Manufacturers can share their application requirements, footwear type and desired surface finish when making an enquiry.'],
        },
        {
          heading: 'IMC Exporter Across India',
          icon: 'globe',
          paras: [
            'For buyers looking for an IMC Exporter Across India, the product is positioned for footwear-related requirements where coating performance and surface appearance are important.',
            'IMC can be considered for PU safety shoes, sports shoes, sandals, slippers, industrial footwear and fashion footwear. Its combination of adhesion, abrasion resistance, scratch resistance, flexibility, chemical resistance and colour stability supports these applications.',
            'The appropriate product selection should be based on the intended footwear application and required surface characteristics.',
          ],
        },
      ],
    },
    {
      type: 'prose',
      layout: 'finish',
      heading: 'IMC with Gloss & Matte Finish Options',
      hl: 'Gloss & Matte',
      paras: [
        'Surface appearance can play an important role in footwear manufacturing. Different footwear designs may require different visual finishes depending on the desired product appearance.',
        'IMC is available in gloss and matte finish options, providing manufacturers with flexibility when selecting the desired surface appearance.',
        "Along with finish options, the product's colour stability can support applications where maintaining the intended appearance is an important consideration.",
      ],
    },
    {
      type: 'prose',
      layout: 'image',
      image: IMG('ind-sports'),
      heading: 'IMC for Durable Surface Performance',
      hl: 'Durable Surface Performance',
      paras: [
        'The combination of abrasion resistance and scratch resistance makes IMC relevant for footwear surfaces that experience regular handling and use.',
        'At the same time, flexibility allows the coating to accommodate movement, while chemical resistance and UV/weather resistance provide additional characteristics for suitable applications.',
        'These properties make IMC a practical option for footwear manufacturers looking for a surface solution that addresses both appearance and performance requirements.',
      ],
    },
    {
      type: 'prose',
      layout: 'band',
      image: IMG('process-sole-machine'),
      heading: 'Manufactured in Delhi, Supplied Across India, Exporter Across India',
      hl: 'Exporter Across India',
      paras: [
        'IMC Manufactured in Delhi is positioned as a footwear coating solution for manufacturers looking for adhesion, durability, flexibility and surface appearance.',
        'With manufacturing based in Delhi and supply capabilities across India, IMC can support footwear-related requirements across different regions. It is also positioned for exporter requirements across India.',
        'The product can be considered according to the footwear application, required surface finish and desired performance characteristics.',
      ],
    },
    {
      type: 'checklist',
      heading: 'Choosing the Right IMC Solution',
      hl: 'IMC Solution',
      paras: ['The right IMC solution depends on the footwear application and the required surface characteristics. Manufacturers should consider factors such as:'],
      bullets: [
        'Type of footwear',
        'Required adhesion',
        'Abrasion requirements',
        'Scratch resistance',
        'Flexibility',
        'Chemical exposure',
        'UV and weather exposure',
        'Desired gloss or matte finish',
        'Colour stability',
      ],
      after: [
        'For example, sports footwear may require strong flexibility and abrasion resistance, while fashion footwear may place greater importance on surface appearance and colour stability.',
        'Understanding these requirements helps manufacturers select an IMC solution aligned with the intended footwear application.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      hl: 'Questions',
      items: [
        {
          q: 'What is IMC used for?',
          a: 'IMC is used for footwear applications where adhesion, abrasion resistance, scratch resistance, flexibility, chemical resistance and surface appearance are important requirements. It can be considered for safety shoes, sports shoes, sandals, slippers, industrial footwear and fashion footwear.',
        },
        {
          q: 'What are the main properties of IMC?',
          a: 'The key properties include excellent adhesion, abrasion resistance, scratch resistance, flexibility, chemical resistance, UV/weather resistance, colour stability and good release characteristics. IMC is also available in gloss and matte finish options.',
        },
        {
          q: 'Is IMC suitable for PU footwear?',
          a: 'Yes. IMC is listed for PU safety shoes and other footwear applications including sports shoes, sandals, slippers, industrial footwear and fashion footwear.',
        },
        {
          q: 'Is IMC available in different finishes?',
          a: 'Yes. The available product information specifies gloss and matte finish options, allowing manufacturers to select the finish according to their footwear requirements.',
        },
        {
          q: 'Where is IMC manufactured and supplied?',
          a: 'IMC is manufactured in Delhi and supplied across India, with exporter requirements also covered across India.',
        },
      ],
    },
    {
      type: 'conclusion',
      heading: 'Conclusion',
      paras: [
        'IMC provides a combination of adhesion, abrasion resistance, scratch resistance, flexibility, chemical resistance, UV/weather resistance and colour stability, making it suitable for a range of PU footwear applications. Its gloss and matte finish options also provide flexibility for different surface appearance requirements.',
        'With manufacturing in Delhi and supply capabilities across India, Turbotech provides IMC solutions for footwear manufacturers looking for practical coating performance aligned with their application requirements.',
      ],
    },
  ],
}

/* ================================================================ EVA COMPOUND */
const evaCompound = {
  slug: 'eva-compound',
  name: 'EVA Compound',
  accent: '#00d6a8',
  image: IMG('p-eva'),
  hero: {
    title: 'EVA Compound for Footwear Manufacturing',
    hl: 'Footwear Manufacturing',
    sub: 'Lightweight, Flexible & Resilient EVA Compound Solutions',
    paras: [
      'EVA Compound is an ideal choice for the footwear manufacturing industry. This is due to its lighter weight, ability to absorb shocks and energy, its flexibility as well as its elastic and resilient nature. Shoes are more comfortable and easier to wear when an EVA compound is used in their manufacture.',
      'EVA COMPOUND Manufactured in Delhi is developed for footwear-related applications where manufacturers require a material with a practical balance of flexibility, cushioning and resilience. EVA additionally provides water-resistance, chemical-resistance and UV/weather-resistance, making it appropriate for a wide variety of footwear necessities.',
      "For footwear makers, it's a thought to select the proper compound to get the Attributes of the finished item. Material choose can influence the g -flexibility, weight, worn-out and as well as the functional efficiency of clothes.",
    ],
    ctas: [
      { label: 'Get a Quote', to: '/contact' },
      { label: 'Contact Us', to: '/contact', variant: 'ghost' },
    ],
    chips: ['Lightweight Construction', 'Shock Absorption', 'Elasticity & Resilience'],
  },
  marquee: [
    'Lightweight Construction',
    'Flexibility',
    'Shock Absorption',
    'Elasticity & Resilience',
    'Water Resistance',
    'Chemical & Weather Resistance',
  ],
  sections: [
    {
      type: 'prose',
      layout: 'split',
      heading: 'Key Properties of EVA Compound',
      hl: 'EVA Compound',
      paras: [
        'EVA Compound provides a combination of properties that makes it suitable for a variety of footwear applications. Its lightweight nature is useful where reduced overall footwear weight is an important requirement, while its flexibility supports footwear designs that require regular bending and movement.',
        'One of the important characteristics of EVA is shock absorption. This makes it suitable for footwear applications where cushioning and impact management are relevant. Along with shock absorption, EVA provides elasticity and resilience, supporting applications where the material needs to respond to repeated movement.',
        'EVA also offers water resistance and chemical resistance, which can be useful depending on the intended footwear application and operating environment. Its UV and weather resistance provides an additional performance characteristic for applications exposed to environmental conditions.',
        'Another property of EVA is its electrical insulation capability, while the supplied product information describes EVA as generally non-toxic.',
      ],
    },
    {
      type: 'cards',
      layout: 'grid',
      heading: 'Why Choose EVA Compound for Footwear?',
      hl: 'for Footwear?',
      paras: ['Footwear manufacturers require materials that can combine functional performance with flexibility and comfort-oriented characteristics. EVA Compound offers several properties that make it relevant to these requirements.'],
      items: [
        { t: 'Lightweight Construction', d: 'EVA is lightweight, making it suitable for footwear designs where reduced weight is an important consideration. This characteristic can be particularly useful for footwear products designed for everyday movement and comfort.' },
        { t: 'Flexibility', d: 'Flexibility is essential in many footwear applications. EVA provides a flexible material solution that can support designs requiring bending and movement during regular use.' },
        { t: 'Shock Absorption', d: 'Shock Absorption Properties For some products where shock absorption is of value, the shock-absorbing properties of EVA can be beneficial. This is particularly relevant for footwear products that emphasize comfort and mobility.' },
        { t: 'Elasticity & Resilience', d: 'EVA has the ability to withstand repetitive movement and deformation. This can be advantageous in shoes and footwear products where flexibility and return to original form is desirable.' },
        { t: 'Water Resistance', d: 'Water resistance is another useful characteristic of EVA Compound. It can be relevant for footwear applications where exposure to moisture is an important consideration.' },
        { t: 'Chemical & Weather Resistance', d: 'EVA also provides chemical resistance along with UV and weather resistance, supporting its consideration for different footwear environments.' },
      ],
    },
    {
      type: 'prose',
      layout: 'image',
      image: IMG('ps-light'),
      heading: 'EVA Compound for Footwear Applications',
      hl: 'Footwear Applications',
      paras: [
        'EVA Compound for Footwear can be considered for footwear products where lightweight construction, flexibility, cushioning and resilience are important requirements.',
        'Its lightweight and flexible characteristics make it suitable for footwear designs that require ease of movement. At the same time, shock absorption, elasticity and resilience can support applications where cushioning and repeated movement are important.',
        'The appropriate EVA Compound should be selected according to the intended product, manufacturing process and required material characteristics.',
      ],
    },
    {
      type: 'apps',
      heading: 'Applications of EVA Compound',
      hl: 'EVA Compound',
      paras: ['EVA Compound is suitable for footwear-related applications where its combination of lightweight, flexible and resilient characteristics is required.'],
      items: [
        { t: 'Footwear Soles', d: 'EVA can be considered for footwear sole applications where lightweight construction, flexibility and shock absorption are important requirements.', img: IMG('ind-footwear') },
        { t: 'Sandals & Slippers', d: 'Its lightweight and flexible characteristics make EVA suitable for sandals and slippers where comfort, flexibility and ease of movement are important considerations.', img: IMG('p-eva') },
        { t: 'Flexible Footwear Components', d: 'EVA can also be considered for footwear components requiring flexibility, elasticity and resilience during regular use.', img: IMG('ind-sports') },
      ],
      after: ['The final application and manufacturing process should determine the specific material requirements.'],
    },
    {
      type: 'prose',
      layout: 'split',
      heading: 'EVA Footwear Compound Manufacturer',
      hl: 'Compound Manufacturer',
      paras: [
        'Choosing an EVA Footwear Compound Manufacturer involves understanding both the material properties and the intended footwear application.',
        'Depending upon the specific footwear product, there may be varying demands for flexibility, light weight, and shock absorption and resilience.',
        'Depending on how it will be used, a manufacturer may have to factor in exposure to environment, water, chemicals and other weather conditions into its final design.',
        'Taking an application-based approach helps the manufacturer identify the most appropriate EVA solution to meet the needs of the specific footwear product.',
      ],
    },
    {
      type: 'trio',
      items: [
        {
          heading: 'EVA Compound Manufacturer in Delhi',
          icon: 'pin',
          paras: [
            'For manufacturers looking for an EVA Compound Manufacturer in Delhi, a Delhi-based manufacturing source provides access to footwear material solutions while supporting supply requirements across different parts of India.',
            'The EVA Compound is positioned for applications requiring lightweight construction, flexibility, shock absorption, elasticity and resilience.',
            'Its additional characteristics, including water resistance, chemical resistance and UV/weather resistance, further support its use across relevant footwear applications.',
          ],
        },
        {
          heading: 'EVA Compound Supplier Across India',
          icon: 'truck',
          paras: [
            'For footwear manufacturers, dependable material availability is an important part of production planning. A supplier with supply capabilities across different regions can help manufacturers source required materials according to their production needs.',
            'As an EVA Compound Supplier Across India, the product is positioned for footwear manufacturers looking for a practical source of EVA material for different applications.',
          ],
          badges: SUPPLY_BADGES,
          after: ['Manufacturers can share their footwear application, production requirements and desired material characteristics when making an enquiry.'],
        },
        {
          heading: 'EVA Compound Exporter Across India',
          icon: 'globe',
          paras: [
            'For buyers searching for an EVA Compound Exporter Across India, the product is positioned for footwear-related material requirements with supply capabilities extending across India.',
            'EVA Compound can be considered for applications requiring lightweight construction, flexibility, shock absorption, elasticity and resilience. Its water resistance, chemical resistance and UV/weather resistance provide additional characteristics for suitable footwear applications.',
            'The appropriate material should be evaluated according to the intended footwear application and manufacturing requirements.',
          ],
        },
      ],
    },
    {
      type: 'prose',
      layout: 'band',
      image: IMG('process-sole-machine'),
      heading: 'Manufactured in Delhi, Supplied Across India, Exporter Across India',
      hl: 'Exporter Across India',
      paras: [
        'EVA COMPOUND Manufactured in Delhi is positioned as a footwear material solution for manufacturers looking for lightweight, flexible and resilient performance.',
        'With manufacturing based in Delhi and supply capabilities across India, the product is available for footwear-related requirements across different regions. The company also presents itself for exporter requirements across India, making the product accessible to buyers looking for an EVA Compound source for their requirements.',
        'The material can be considered according to the application, production requirements and desired performance characteristics.',
      ],
    },
    {
      type: 'prose',
      layout: 'split',
      heading: 'Choosing the Right EVA Compound',
      hl: 'EVA Compound',
      paras: [
        'Each footwear product has a distinct set of material needs. Weight considerations, flexibility needs, cushioning expectations and environmental factors all play a role in EVA Compound selection when it comes to footwear. For applications that favor lightweight, EVA is a good choice.',
        "EVA's impact-absorbing properties make it valuable for cushioning.",
        'Similarly, features such as flexibility, elasticity and toughness may be needed in footwear products.',
        'Water resistance, chemical resistance and UV/weather resistance may also be considered depending on the intended operating environment.',
        'An application-approach can allow manufacturers to locate an EVA Compound that meets the functional requirements of the finished footwear item.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      hl: 'Questions',
      items: [
        {
          q: 'What is EVA Compound used for?',
          a: 'EVA Compound is used for footwear applications where properties such as lightweight construction, flexibility, shock absorption, elasticity and resilience are required. It can be considered for footwear soles, sandals, slippers and other flexible footwear applications.',
        },
        {
          q: 'What are the main properties of EVA Compound?',
          a: 'These are the most important features it must have in it; it should be light weight, flexible, shock absorbing, elastic, resilient, it should be water and chemical resistant, resistant to weather/UV, and an insulator. The product information says that the EVA is described as generally non-toxic.',
        },
        {
          q: 'Is EVA Compound suitable for footwear manufacturing?',
          a: 'Yes. EVA Compound can be used for footwear applications where the features of lightweight and flexible and shock absorbing are demanded. You should choose the appropriate material based on the application and processing requirements.',
        },
        {
          q: 'Where is the EVA Compound manufactured?',
          a: 'The EVA Compound is manufactured in Delhi and supplied across India. It is also positioned for exporter requirements across India.',
        },
        {
          q: 'What information is required for an EVA Compound enquiry?',
          a: 'Manufacturers can provide details about the intended footwear application, required material characteristics, production requirements and quantity. These details help in understanding the appropriate EVA Compound requirement.',
        },
      ],
    },
    {
      type: 'conclusion',
      heading: 'Conclusion',
      paras: [
        'EVA Compound provides a combination of lightweight construction, flexibility, shock absorption, elasticity and resilience, making it suitable for footwear applications where comfort and functional material performance are important. Additional properties such as water resistance, chemical resistance and UV/weather resistance further support its use across relevant footwear requirements.',
        'With manufacturing in Delhi and supply capabilities across India, Turbotech provides EVA Compound solutions for footwear manufacturers looking for practical material solutions aligned with their application requirements.',
      ],
    },
  ],
}

/* ================================================================ PVC COMPOUND */
const pvcCompound = {
  slug: 'pvc-compound',
  name: 'PVC Compound',
  accent: '#8b7dff',
  image: IMG('p-pvc'),
  hero: {
    title: 'PVC Compound for Footwear Manufacturing',
    hl: 'Footwear Manufacturing',
    sub: 'Durable & Reliable PVC Compound Solutions',
    paras: [
      'PVC Compound is an important material solution for footwear manufacturing, offering a combination of chemical resistance, mechanical strength, weather resistance, water and moisture resistance, abrasion resistance and dimensional stability. These characteristics make PVC suitable for footwear applications where durability, structural performance and resistance to different environmental conditions are important.',
      'PVC COMPOUND Manufactured in Delhi is positioned for footwear manufacturers looking for a material solution that can support different footwear production requirements. PVC also offers easy processing and cost-effective characteristics, making it a practical material option for suitable footwear applications.',
      'For footwear manufacturers, material selection plays an important role in achieving the required characteristics in the finished product. The appropriate PVC Compound can be considered according to the footwear application, required mechanical performance and expected environmental exposure.',
    ],
    ctas: [
      { label: 'Get a Quote', to: '/contact' },
      { label: 'Contact Us', to: '/contact', variant: 'ghost' },
    ],
    chips: ['Mechanical Strength', 'Abrasion Resistance', 'Dimensional Stability'],
  },
  marquee: [
    'Chemical Resistance',
    'Mechanical Strength',
    'Weather Resistance',
    'Water & Moisture Resistance',
    'Abrasion Resistance',
    'Dimensional Stability',
    'Easy Processing',
  ],
  sections: [
    {
      type: 'cards',
      layout: 'grid',
      heading: 'Key Properties of PVC Compound',
      hl: 'PVC Compound',
      paras: [
        'PVC Compound provides a range of properties that make it relevant to footwear manufacturing. Its chemical resistance can help support applications where resistance to different chemical environments is required.',
        'Another important characteristic is mechanical strength. This makes PVC suitable for applications where the material needs to provide structural performance and withstand regular use.',
        'PVC also offers weather resistance, making it relevant for applications where the finished footwear may be exposed to different environmental conditions. Its water and moisture resistance provides another useful characteristic for footwear products.',
        'The material also offers abrasion resistance, which is important for footwear applications that experience regular contact and friction during use.',
      ],
      splitIntro: true,
      items: [
        { t: 'Dimensional Stability', d: 'Dimensional stability is another important property of PVC Compound. It can help maintain the intended characteristics of the material during use and processing.' },
        { t: 'Easy Processing', d: 'PVC is also described as easy to process, providing a practical advantage for suitable manufacturing applications.' },
        { t: 'Cost-Effective Material Solution', d: 'PVC Compound offers cost-effective characteristics, making it a practical material option for footwear manufacturers looking for a balance between material performance and production requirements.' },
      ],
    },
    {
      type: 'cards',
      layout: 'stack',
      heading: 'Why Choose PVC Compound for Footwear?',
      hl: 'for Footwear?',
      paras: ['Footwear manufacturing requires materials that can provide appropriate performance while meeting production requirements. PVC Compound offers several characteristics that make it suitable for relevant footwear applications.'],
      items: [
        { t: 'Chemical Resistance', d: 'PVC provides chemical resistance, making it suitable for applications where resistance to chemical exposure is an important consideration.' },
        { t: 'Mechanical Strength', d: 'Good mechanical strength supports applications where the finished footwear material needs to withstand regular use and mechanical stress.' },
        { t: 'Weather Resistance', d: "PVC's weather resistance makes it relevant for footwear applications where environmental exposure needs to be considered." },
        { t: 'Water & Moisture Resistance', d: 'Water and moisture resistance can be particularly useful for footwear applications where contact with moisture is expected.' },
        { t: 'Abrasion Resistance', d: "Footwear products can experience repeated friction and contact during use. PVC's abrasion resistance makes it relevant for applications where resistance to wear is an important requirement." },
        { t: 'Dimensional Stability', d: 'PVC provides dimensional stability, supporting applications where maintaining the intended material form is important.' },
      ],
    },
    {
      type: 'prose',
      layout: 'image',
      image: IMG('ps-pvc'),
      heading: 'PVC Compound for Footwear Applications',
      hl: 'Footwear Applications',
      paras: [
        'PVC Compound for Footwear can be considered for applications where manufacturers require a combination of mechanical strength, chemical resistance, abrasion resistance and moisture resistance.',
        "The material's combination of performance characteristics makes it relevant for footwear manufacturing where durability and practical processing requirements are important.",
        'The appropriate PVC Compound should be selected according to the intended product, manufacturing process and required material characteristics.',
      ],
    },
    {
      type: 'apps',
      heading: 'Applications of PVC Compound',
      hl: 'PVC Compound',
      paras: ['PVC Compound can be considered for footwear applications where its combination of strength, resistance and processing characteristics is required.'],
      items: [
        { t: 'Footwear Manufacturing', d: 'PVC Compound can support footwear applications where mechanical strength, abrasion resistance and dimensional stability are important considerations.', img: IMG('ind-footwear') },
        { t: 'Water-Resistant Footwear Applications', d: 'Its water and moisture resistance makes PVC relevant to footwear products where exposure to moisture is an important consideration.', img: IMG('ps-pvc') },
        { t: 'Durable Footwear Components', d: 'The combination of mechanical strength and abrasion resistance can support applications requiring material durability during regular use.', img: IMG('ind-industrial') },
        { t: 'Weather-Exposed Applications', d: "PVC's weather resistance can make it relevant to applications where the finished footwear may experience changing environmental conditions.", img: IMG('ind-safety') },
      ],
      after: ['The final application and manufacturing process should determine the specific material requirements.'],
    },
    {
      type: 'trio',
      items: [
        {
          heading: 'PVC Compound Manufacturer in Delhi',
          icon: 'pin',
          paras: [
            'For manufacturers looking for a PVC Compound Manufacturer in Delhi, a Delhi-based manufacturing source can provide access to PVC material solutions for footwear production requirements.',
            'PVC Compound is positioned for applications requiring mechanical strength, chemical resistance, weather resistance, water and moisture resistance, abrasion resistance and dimensional stability.',
            'Its easy processing and cost-effective characteristics further support its consideration for suitable footwear manufacturing applications.',
          ],
        },
        {
          heading: 'PVC Compound Supplier Across India',
          icon: 'truck',
          paras: [
            'For footwear manufacturers, dependable material availability is an important part of production planning. A supplier with supply capabilities across different regions can help manufacturers source PVC Compound according to their production requirements.',
            'As a PVC Compound Supplier Across India, the product is positioned for manufacturers looking for a practical source of PVC material for relevant footwear applications.',
          ],
          badges: SUPPLY_BADGES,
          after: ['Manufacturers can share their footwear application, production requirements and desired material characteristics when making an enquiry.'],
        },
        {
          heading: 'PVC Compound Exporter Across India',
          icon: 'globe',
          paras: [
            'For buyers searching for a PVC Compound Exporter Across India, the product is positioned for footwear-related material requirements with supply capabilities extending across India.',
            'PVC Compound can be considered for applications requiring mechanical strength, chemical resistance, abrasion resistance, water and moisture resistance and dimensional stability. Its weather resistance and easy processing characteristics provide additional benefits for suitable applications.',
            'The appropriate material should be evaluated according to the intended footwear application and manufacturing requirements.',
          ],
        },
      ],
    },
    {
      type: 'prose',
      layout: 'split',
      heading: 'PVC Compound for Different Manufacturing Requirements',
      hl: 'Manufacturing Requirements',
      paras: [
        'Different footwear products can have different material requirements. Some applications may require stronger mechanical performance, while others may place greater importance on moisture resistance, abrasion resistance or dimensional stability.',
        'PVC Compound provides a combination of these properties, allowing manufacturers to consider it for applications where durability and resistance are important.',
        'When selecting PVC Compound, manufacturers should consider the intended footwear application, required mechanical performance, environmental conditions and processing requirements.',
        'This application-focused approach helps ensure that the selected material is aligned with the requirements of the finished product.',
      ],
    },
    {
      type: 'prose',
      layout: 'band',
      image: IMG('process-sole-machine'),
      heading: 'Manufactured in Delhi, Supplied Across India, Exporter Across India',
      hl: 'Exporter Across India',
      paras: [
        'PVC COMPOUND Manufactured in Delhi is positioned as a footwear material solution for manufacturers looking for strength, resistance and practical processing characteristics.',
        'With manufacturing based in Delhi and supply capabilities across India, PVC Compound can support footwear-related material requirements across different regions. It is also positioned for exporter requirements across India.',
        'The material can be considered according to the application, production requirements and desired performance characteristics.',
      ],
    },
    {
      type: 'checklist',
      heading: 'Choosing the Right PVC Compound',
      hl: 'PVC Compound',
      paras: ['Selecting the right PVC Compound begins with understanding the requirements of the finished footwear product.'],
      lead: 'Manufacturers should consider factors such as:',
      bullets: [
        'Required mechanical strength',
        'Chemical exposure',
        'Water and moisture exposure',
        'Abrasion requirements',
        'Weather conditions',
        'Dimensional stability',
        'Processing requirements',
        'Overall production considerations',
      ],
      after: [
        'For applications where abrasion resistance is important, PVC can provide a suitable material characteristic. Where water or moisture exposure is expected, its resistance properties become relevant. Similarly, mechanical strength and dimensional stability can be important for products requiring structural performance.',
        'Considering these requirements before material selection can help manufacturers identify a PVC Compound suitable for their intended application.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      hl: 'Questions',
      items: [
        {
          q: 'What is PVC Compound used for?',
          a: 'PVC Compound is used for suitable footwear applications where properties such as mechanical strength, chemical resistance, abrasion resistance, water and moisture resistance and dimensional stability are required.',
        },
        {
          q: 'What are the main properties of PVC Compound?',
          a: 'The key properties include chemical resistance, mechanical strength, weather resistance, water and moisture resistance, abrasion resistance, dimensional stability, easy processing and cost-effective characteristics.',
        },
        {
          q: 'Is PVC Compound suitable for footwear manufacturing?',
          a: 'Yes. PVC Compound is suitable for footwear applications where strength, resistance, durability and practical processing characteristics are required. The appropriate compound should be selected according to the intended application and manufacturing requirements.',
        },
        {
          q: 'Where is the PVC Compound manufactured?',
          a: 'The PVC Compound is manufactured in Delhi and supplied across India. It is also positioned for exporter requirements across India.',
        },
        {
          q: 'What information should be provided for a PVC Compound enquiry?',
          a: 'Manufacturers can provide details about the intended footwear application, required material characteristics, production requirements and quantity. These details help in understanding the appropriate PVC Compound requirement.',
        },
      ],
    },
    {
      type: 'conclusion',
      heading: 'Conclusion',
      paras: [
        'PVC Compound provides a combination of chemical resistance, mechanical strength, weather resistance, water and moisture resistance, abrasion resistance and dimensional stability, making it suitable for footwear applications where durability and resistance are important. Its easy processing and cost-effective characteristics further support its use for suitable manufacturing requirements.',
        'With manufacturing in Delhi and supply capabilities across India, Turbotech provides PVC Compound solutions for footwear manufacturers looking for practical material solutions aligned with their application requirements.',
      ],
    },
  ],
}

/* ================================================================ SOLVENTS */
const solvents = {
  slug: 'solvents',
  name: 'Solvents',
  accent: '#0072ce',
  image: IMG('p-dmf'),
  hero: {
    title: 'Solvents for Footwear Chemical Applications',
    hl: 'Footwear Chemical Applications',
    sub: 'Reliable Solvent Solutions for Footwear Manufacturing',
    paras: [
      'Solvents are an important part of footwear chemical applications, supporting different manufacturing and processing requirements across PU and related footwear production. The available product range includes MCL, Hardener, DMF, Mould Cleaner and BC, providing manufacturers with a range of solvent-related solutions for their specific production requirements.',
      'SOLVENTS Manufactured in Delhi are positioned for footwear manufacturers looking for locally manufactured chemical solutions with supply availability across India. The selection of the appropriate solvent depends on the intended application, manufacturing process and specific production requirements.',
      'For footwear manufacturers, choosing the appropriate chemical solution is important because different stages of production can require different materials. A clear understanding of the application helps manufacturers identify the suitable product from the available solvent range.',
    ],
    ctas: [
      { label: 'Get a Quote', to: '/contact' },
      { label: 'Contact Us', to: '/contact', variant: 'ghost' },
    ],
    chips: ['MCL', 'Hardener', 'DMF', 'Mould Cleaner', 'BC'],
  },
  marquee: ['MCL', 'Hardener', 'DMF', 'Mould Cleaner', 'BC'],
  sections: [
    {
      type: 'cards',
      layout: 'products',
      heading: 'Solvent Range for Footwear Manufacturing',
      hl: 'Footwear Manufacturing',
      lead: 'The available solvent range includes:',
      bullets: ['MCL', 'Hardener', 'DMF', 'Mould Cleaner', 'BC'],
      paras2: [
        'These products are identified in the available product information as solvent solutions associated with PU and EVA footwear chemical applications.',
        'Each product should be considered according to its intended manufacturing application and the requirements of the production process.',
      ],
      items: [
        {
          id: 'mcl',
          t: 'MCL',
          img: IMG('p-mcl'),
          d: [
            'MCL is included in the available solvent range for footwear chemical applications. Manufacturers can enquire about MCL according to their specific production requirements and intended application.',
            'When selecting MCL, the footwear manufacturing process, application method and required chemical characteristics should be communicated so that the appropriate product requirement can be understood.',
          ],
        },
        {
          id: 'hardener',
          t: 'Hardener',
          img: IMG('p-hardener'),
          d: [
            'Hardener is another product included within the available solvent range. It is relevant to footwear chemical requirements and can be considered according to the particular manufacturing application.',
            'Manufacturers should provide details of the intended process and application when enquiring about Hardener to ensure the product requirement is clearly understood.',
          ],
        },
        {
          id: 'dmf',
          t: 'DMF',
          img: IMG('p-dmf'),
          d: [
            'DMF is included in the solvent range for footwear-related chemical applications. It can be considered by manufacturers according to their specific process requirements.',
            'As with other products in the range, the intended application and manufacturing process should be discussed when selecting DMF.',
          ],
        },
        {
          id: 'mould-cleaner',
          t: 'Mould Cleaner',
          img: IMG('p-cleaner'),
          d: [
            'Mould Cleaner forms part of the available solvent product range. It is relevant to footwear manufacturing requirements involving mould-related processes.',
            'Manufacturers can enquire about Mould Cleaner based on their production process and the particular mould-related application for which the product is required.',
          ],
        },
        {
          id: 'bc',
          t: 'BC',
          img: IMG('p-bc'),
          d: [
            'BC is also included in the available solvent range for footwear chemical applications. Buyers and manufacturers can provide their application requirements when enquiring about BC.',
            'The specific selection should be based on the intended footwear manufacturing process and the requirements associated with the application.',
          ],
        },
      ],
    },
    {
      type: 'prose',
      layout: 'image',
      image: IMG('ps-support'),
      heading: 'Solvents for PU & EVA Footwear Manufacturing',
      hl: 'PU & EVA',
      paras: [
        'The available solvent range is associated with footwear chemical requirements covering PU and EVA footwear manufacturing.',
        'Footwear production involves multiple stages, and chemical requirements can vary depending on the material, process and intended application. For this reason, manufacturers should identify the specific stage and purpose for which a solvent is required before selecting the appropriate product.',
        'The available range of MCL, Hardener, DMF, Mould Cleaner and BC provides manufacturers with multiple options to discuss according to their individual production needs.',
      ],
    },
    {
      type: 'checklist',
      heading: 'Choosing the Right Solvent',
      hl: 'Solvent',
      paras: ['Selecting the appropriate solvent should begin with understanding the intended application. Different footwear manufacturing processes may require different chemical solutions, so manufacturers should consider:'],
      bullets: [
        'Type of footwear being manufactured',
        'Material being processed',
        'Production stage',
        'Intended application',
        'Processing requirements',
        'Required quantity',
        'Manufacturing method',
      ],
      after: ['Providing these details during an enquiry can help establish which product from the available solvent range is relevant to the requirement.'],
    },
    {
      type: 'trio',
      items: [
        {
          heading: 'Solvent Manufacturer in Delhi',
          icon: 'pin',
          paras: [
            'For manufacturers searching for a Solvent Manufacturer in Delhi, locally manufactured footwear chemical solutions can provide a convenient sourcing option for production requirements.',
            'The available range includes MCL, Hardener, DMF, Mould Cleaner and BC, all identified within the footwear chemical product range.',
            'The manufacturing location in Delhi also supports supply requirements for buyers and footwear manufacturers located across different parts of India.',
          ],
        },
        {
          heading: 'Solvent Supplier Across India',
          icon: 'truck',
          paras: [
            'For footwear manufacturers looking for a Solvent Supplier Across India, dependable product availability and convenient sourcing can be important considerations.',
            'The solvent range can be supplied to manufacturers across India according to their specific product and application requirements.',
          ],
          badges: SUPPLY_BADGES,
          after: ['Manufacturers can share details about their footwear process, required product and quantity when making an enquiry.'],
        },
        {
          heading: 'Solvent Exporter Across India',
          icon: 'globe',
          paras: [
            'For buyers searching for a Solvent Exporter Across India, the available range includes MCL, Hardener, DMF, Mould Cleaner and BC for footwear-related chemical requirements.',
            'The appropriate product should be selected according to the intended application and manufacturing requirements. Buyers can provide their specific requirements when enquiring about the available solvent range.',
          ],
        },
      ],
    },
    {
      type: 'prose',
      layout: 'split',
      heading: 'Solvents for Different Footwear Production Requirements',
      hl: 'Production Requirements',
      paras: [
        'Different footwear manufacturing processes can involve different chemical requirements. A manufacturer working with PU footwear may have different requirements from a manufacturer working with EVA footwear.',
        'The available solvent range is positioned for PU and EVA footwear chemical applications, allowing manufacturers to discuss their requirements based on the production process.',
        'Rather than selecting a product solely by name, manufacturers should communicate the intended application, production process and required quantity. This makes it easier to identify the relevant product for the particular requirement.',
      ],
    },
    {
      type: 'prose',
      layout: 'band',
      image: IMG('process-sole-machine'),
      heading: 'Manufactured in Delhi, Supplied Across India, Exporter Across India',
      hl: 'Exporter Across India',
      paras: [
        'SOLVENTS Manufactured in Delhi are available for footwear chemical requirements across different regions of India.',
        'With manufacturing based in Delhi and supply capabilities across India, the solvent range provides manufacturers with access to MCL, Hardener, DMF, Mould Cleaner and BC according to their requirements.',
        'The available product information identifies these materials within the solvent range, but does not provide detailed technical specifications or individual performance properties for each solvent. Therefore, specific technical suitability should be confirmed according to the intended application before selection.',
      ],
    },
    {
      type: 'prose',
      layout: 'image',
      image: IMG('story-lab'),
      heading: 'Solvent Solutions for Footwear Chemical Requirements',
      hl: 'Footwear Chemical Requirements',
      paras: [
        'The solvent range is designed around the chemical requirements associated with footwear manufacturing. MCL, Hardener, DMF, Mould Cleaner and BC provide manufacturers with different product options to consider based on their particular production process.',
        'For manufacturers, the right product selection should be application-focused. Information such as footwear type, material, process stage and intended use can help establish the appropriate requirement.',
        'This approach allows manufacturers to source the relevant solvent according to their actual production needs instead of selecting a product without sufficient application information.',
      ],
    },
    {
      type: 'prose',
      layout: 'split',
      heading: 'Why Choose a Delhi-Based Solvent Supplier?',
      hl: 'Delhi-Based Solvent Supplier?',
      paras: [
        'Sourcing footwear chemicals from a Delhi-based manufacturer can provide manufacturers with access to a local production source while supporting supply requirements across India.',
        'For buyers, discussing the exact application before ordering can help clarify the suitable product, required quantity and other relevant requirements.',
        'The available solvent range includes MCL, Hardener, DMF, Mould Cleaner and BC, providing multiple options for footwear chemical applications.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      hl: 'Questions',
      items: [
        {
          q: 'Which solvents are available for footwear applications?',
          a: 'The available range includes MCL, Hardener, DMF, Mould Cleaner and BC. These are listed within the footwear chemical product range.',
        },
        {
          q: 'Are these solvents suitable for PU and EVA footwear?',
          a: 'The available product information identifies the solvent range in relation to PU and EVA footwear chemical applications.',
        },
        {
          q: 'Where are the solvents manufactured?',
          a: 'The products are manufactured in Delhi and supplied across India.',
        },
        {
          q: 'How do I select the right solvent?',
          a: 'Selection should be based on the intended footwear application, material, production stage, manufacturing process and required quantity. Manufacturers can share these details during an enquiry.',
        },
        {
          q: 'Can I enquire about MCL, Hardener, DMF, Mould Cleaner or BC separately?',
          a: 'Yes. Manufacturers can enquire about the individual product according to their specific footwear manufacturing requirements.',
        },
      ],
    },
    {
      type: 'conclusion',
      heading: 'Conclusion',
      paras: [
        'The solvent range includes MCL, Hardener, DMF, Mould Cleaner and BC, providing product options for footwear chemical requirements associated with PU and EVA manufacturing.',
        'With manufacturing in Delhi and supply capabilities across India, Turbotech provides solvent solutions for footwear manufacturers looking to source products according to their specific production and application requirements.',
      ],
    },
  ],
}

export const productPages = [puPigments, releaseAgents, imc, evaCompound, pvcCompound, solvents]

export const pageBySlug = (slug) => productPages.find((p) => p.slug === slug)
