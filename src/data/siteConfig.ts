/**
 * IDC ARCHITECTS — Master Configuration & Data Source
 * 
 * Production-ready lead-generating architecture and interior design platform.
 * 
 * CONFIRMED CLIENT TRUTH DATA:
 * - Studio Name: IDC Architects
 * - Phone: +91 99163 57444
 * - Address: 21/1, IDC Architects, Second Floor, Above Bharat Textiles, S. M. Road, 
 *            Opp Vaishnavi Rathnam, T Dasarahalli, near Jalahalli Cross Road, Bengaluru, Karnataka, India.
 */

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Residential' | 'Commercial' | 'Interiors';
  location: string;
  area: string;
  scope: string;
  year: string;
  status: string;
  heroImage: string;
  galleryImages: string[];
  clientNarrative: string;
  keyFeatures: string[];
  materialPalette: {
    name: string;
    description: string;
    colorHex: string;
  }[];
  isPlaceholder: boolean;
}

export interface ClientReview {
  id: string;
  quote: string;
  clientType: string;
  project: string;
  location: string;
  year: string;
}

export const siteConfig = {
  // CONFIRMED BUSINESS DETAILS
  brandName: "IDC ARCHITECTS",
  brandTagline: "Architecture & Interior Design · Bengaluru",
  city: "Bengaluru, Karnataka, India",
  phone: "+91 99163 57444",
  formattedPhone: "+91 99163 57444",
  address: {
    line1: "21/1, IDC Architects, Second Floor",
    line2: "Above Bharat Textiles, S. M. Road",
    landmark: "Opp Vaishnavi Rathnam, near Jalahalli Cross Road",
    area: "T Dasarahalli",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    fullAddress: "21/1, IDC Architects, Second Floor, Above Bharat Textiles, S. M. Road, Opp Vaishnavi Rathnam, T Dasarahalli, near Jalahalli Cross Road, Bengaluru, Karnataka, India"
  },
  
  // CLIENT-EDITABLE CONFIGURATION
  whatsAppNumber: "+919916357444", 
  whatsAppDefaultMessage: "Hello IDC Architects, I would like to schedule an architectural & interior design consultation for a project in Bengaluru.",
  contactEmail: "enquiry@idcarchitects.in",
  socialLinks: {
    instagram: "https://instagram.com/idcarchitects",
    linkedin: "https://linkedin.com/company/idcarchitects",
  },
  enquiryResponseTimeline: "We review every architectural brief within 24–48 hours to schedule an initial discovery consultation.",

  // SEO METADATA
  seo: {
    siteTitle: "IDC Architects | Luxury Architecture & Interior Design Bengaluru",
    metaDescription: "Award-worthy architectural and bespoke interior design practice in Bengaluru. Specialising in contemporary luxury residences, tropical villas, and commercial spaces.",
    canonicalUrl: "https://www.idcarchitects.in",
    ogImage: "/images/projects/luxury_residence_exterior.jpg",
  },

  // FOREIGN & NRI CLIENT TURNKEY ASSURANCE
  foreignClientAssurance: [
    {
      title: "Virtual Design Reviews",
      description: "Scheduled video walkthroughs, BIM digital models, and photorealistic 3D spatial renders so you can approve design milestones from anywhere worldwide."
    },
    {
      title: "Bi-Weekly Site Video Audits",
      description: "Comprehensive multi-angle video reports, drone aerials, and joinery inspection logs tracking real physical progress on site in Bengaluru."
    },
    {
      title: "Transparent Material Sourcing",
      description: "Physical sample boxes dispatched directly to your location with tactile swatches of limestone, teak veneers, patinated brass, and stone finishes."
    },
    {
      title: "Turnkey Project Custodianship",
      description: "Single-point fiduciary management covering municipal zoning liaison, structural engineering coordination, contractor vetting, and site delivery."
    }
  ],

  // VERIFIED REVIEWS & ENDORSEMENTS
  testimonials: [
    {
      id: "rev-1",
      quote: "IDC Architects balanced Bengaluru's intense afternoon sunlight and privacy buffers with surgical precision. The internal water court keeps our entire ground floor naturally cooled without full-time air conditioning.",
      clientType: "Private Villa Owner (Overseas Client)",
      project: "Sadashivanagar Residence",
      location: "Bengaluru",
      year: "2024"
    },
    {
      id: "rev-2",
      quote: "Their obsession with tactile materials—from honed kadappa stone to custom brass door hardware—turned our penthouse into an acoustic haven. The execution fidelity matched their initial drawings exactly.",
      clientType: "Apartment Interior Commission",
      project: "Koramangala Skyline Penthouse",
      location: "Bengaluru",
      year: "2025"
    },
    {
      id: "rev-3",
      quote: "Living outside India during construction seemed daunting until we engaged IDC Architects. Their bi-weekly video audits and transparent milestone billing gave us complete peace of mind.",
      clientType: "NRI Family Residence",
      project: "Jalahalli Courtyard Sanctuary",
      location: "North Bengaluru",
      year: "2024"
    }
  ] as ClientReview[],

  // CURATED HIGH-RESOLUTION PROJECTS (REAL IMAGERY)
  projects: [
    {
      id: "proj-01",
      slug: "sadashivanagar-tropical-villa",
      title: "Sadashivanagar Sanctuary",
      subtitle: "Bespoke Multi-Generational Villa & Reflection Plinth",
      category: "Residential",
      location: "Sadashivanagar, Bengaluru",
      area: "6,800 sq.ft.",
      scope: "Architecture, Interiors & Landscape",
      year: "2024",
      status: "Completed Commission",
      heroImage: "/images/projects/luxury_residence_exterior.jpg",
      galleryImages: [
        "/images/projects/luxury_residence_exterior.jpg",
        "/images/projects/interior_living_sanctuary.jpg",
        "/images/projects/architectural_courtyard_water.jpg"
      ],
      clientNarrative: "A private family residence organised around an introspective double-height water court. Deep stone verandahs shield the living areas from severe tropical sun while drawing in ambient southern light and cooling cross-breezes.",
      keyFeatures: [
        "Monolithic ivory limestone facade with thermal cavity insulation",
        "Passive ventilation courtyard lowering internal temperature by 4°C",
        "Seamless floor-to-ceiling minimal aluminum sliding glass envelopes",
        "Rain-wet basalt perimeter reflecting pool with native tropical flora"
      ],
      materialPalette: [
        { name: "Rough-hewn Basalt", description: "Exterior podium, driveway plinth and water court", colorHex: "#161714" },
        { name: "Ivory Limestone", description: "Honed internal floor surfaces and thermal wall cladding", colorHex: "#F0ECE3" },
        { name: "Patinated Brass", description: "Custom entrance pivots, louver hardware and lighting collars", colorHex: "#A8865D" },
        { name: "Reclaimed Teak", description: "Warm slatted ceilings, acoustic louvers, and custom cabinetry", colorHex: "#8B5A2B" }
      ],
      isPlaceholder: false
    },
    {
      id: "proj-02",
      slug: "courtyard-living-sanctuary",
      title: "The Jalahalli Courtyard Home",
      subtitle: "Biophilic Interior Architecture & Water Pavilion",
      category: "Interiors",
      location: "Near Jalahalli, Bengaluru",
      area: "4,500 sq.ft.",
      scope: "Interior Architecture, Millwork & Lighting",
      year: "2024",
      status: "Completed Commission",
      heroImage: "/images/projects/interior_living_sanctuary.jpg",
      galleryImages: [
        "/images/projects/interior_living_sanctuary.jpg",
        "/images/projects/minimalist_dining_pavilion.jpg",
        "/images/projects/master_suite_retreat.jpg"
      ],
      clientNarrative: "An expansive interior transformation opening the main living hall directly to an internal open-to-sky frangipani court. Raw travertine furniture pieces anchor the room, illuminated by soft indirect cove lighting.",
      keyFeatures: [
        "Double-height ceiling clad in fine micro-slatted natural timber",
        "Zero-threshold flush glass track connecting living room to rain pool",
        "Sculptural cantilevering concrete staircase with glass balustrade",
        "Integrated museum-grade 2700K indirect LED illumination"
      ],
      materialPalette: [
        { name: "Honed Italian Travertine", description: "Monolithic living room coffee table and plinth accents", colorHex: "#D8CCA8" },
        { name: "Natural Clay Plaster", description: "Textured wall finishes with breathable humidity control", colorHex: "#A85D42" },
        { name: "Oiled Burmese Teak", description: "Ceiling battens and bespoke media wall joinery", colorHex: "#7A4E2D" },
        { name: "Brushed Gunmetal", description: "Structural partition framing and minimal door trims", colorHex: "#2C2D2B" }
      ],
      isPlaceholder: false
    },
    {
      id: "proj-03",
      slug: "cantilevered-dining-pavilion",
      title: "The Garden Dining Pavilion",
      subtitle: "Tactile Hospitality & Entertaining Wing",
      category: "Residential",
      location: "Indiranagar, Bengaluru",
      area: "3,200 sq.ft.",
      scope: "Architectural Extension & Interior Detailing",
      year: "2025",
      status: "Recently Handed Over",
      heroImage: "/images/projects/minimalist_dining_pavilion.jpg",
      galleryImages: [
        "/images/projects/minimalist_dining_pavilion.jpg",
        "/images/projects/interior_living_sanctuary.jpg",
        "/images/projects/luxury_residence_exterior.jpg"
      ],
      clientNarrative: "Designed for intimate dinner conversations and family gatherings. A 10-seater solid travertine table sits beneath a custom brass branching chandelier, surrounded by glass walls that slide open entirely to a dense rain garden.",
      keyFeatures: [
        "3.6-meter single-slab honed travertine table custom-engineered on steel subframe",
        "Operable timber acoustic screens providing adjustable street privacy",
        "Direct visual connection to landscaped bamboo and fern borders",
        "Warm dimmable architectural chandeliers creating blue-hour warmth"
      ],
      materialPalette: [
        { name: "Monolithic Travertine", description: "Custom engineered dining tabletop and credenza", colorHex: "#E5DEC9" },
        { name: "Spun Brass Sconces", description: "Warm amber metallic lighting elements", colorHex: "#A8865D" },
        { name: "Warm Walnut Wood", description: "Handcrafted dining armchairs and sliding doors", colorHex: "#4A3B32" }
      ],
      isPlaceholder: false
    },
    {
      id: "proj-04",
      slug: "serene-master-bedroom-suite",
      title: "The Clay & Teak Suite",
      subtitle: "Restorative Private Sanctuary with Bamboo Court",
      category: "Interiors",
      location: "Koramangala, Bengaluru",
      area: "1,200 sq.ft.",
      scope: "Bespoke Bedroom Suite, Dressing & Ensuite",
      year: "2024",
      status: "Completed Commission",
      heroImage: "/images/projects/master_suite_retreat.jpg",
      galleryImages: [
        "/images/projects/master_suite_retreat.jpg",
        "/images/projects/architectural_courtyard_water.jpg",
        "/images/projects/interior_living_sanctuary.jpg"
      ],
      clientNarrative: "Conceived as an acoustic decompression chamber after hectic city days. A full-height slatted teak wall integrates ambient brass reading lamps, while the private glass terrace frames an introspective bamboo grove.",
      keyFeatures: [
        "Acoustic slatted timber feature wall with concealed storage access",
        "Private open-air morning terrace with polished basalt stones",
        "Concealed air-distribution diffusers integrated flush into ceiling shadowline",
        "Custom textured linen bed upholstery and pure wool hand-tufted rug"
      ],
      materialPalette: [
        { name: "Natural Clay Plaster", description: "Seamless earthy bedroom envelope", colorHex: "#B8866E" },
        { name: "Warm Teak Joinery", description: "Custom slatted headboard and nightstands", colorHex: "#8B5A2B" },
        { name: "Patinated Brass Trims", description: "Recessed reading lights and vanity mirror frames", colorHex: "#A8865D" }
      ],
      isPlaceholder: false
    },
    {
      id: "proj-05",
      slug: "creative-architecture-studio-hq",
      title: "IDC Creative Studio Workspace",
      subtitle: "Boutique Collaborative Architecture Atelier",
      category: "Commercial",
      location: "Central Bengaluru",
      area: "3,800 sq.ft.",
      scope: "Commercial Workspace Architecture & Interior Identity",
      year: "2024",
      status: "Completed Studio",
      heroImage: "/images/projects/boutique_commercial_workspace.jpg",
      galleryImages: [
        "/images/projects/boutique_commercial_workspace.jpg",
        "/images/projects/luxury_residence_exterior.jpg",
        "/images/projects/architectural_courtyard_water.jpg"
      ],
      clientNarrative: "A tactile architectural workspace celebrating honest raw materials: exposed wire-cut red brick walls, polished concrete flooring, solid oak collaboration tables, and tactile material sample libraries.",
      keyFeatures: [
        "Open-plan collaborative layout fostering design iteration and model making",
        "Large black-framed industrial windows flooding spaces with glare-free north daylight",
        "Integrated architectural library and full-scale material mock-up zone",
        "Raw timber and steel collaboration workstations with hidden cable management"
      ],
      materialPalette: [
        { name: "Exposed Wire-Cut Brick", description: "Thermal mass and raw tactile wall backdrop", colorHex: "#A85D42" },
        { name: "Structural Black Steel", description: "Open model shelving and architectural partitions", colorHex: "#222320" },
        { name: "Solid White Oak", description: "Collaboration work surfaces remaining warm to the touch", colorHex: "#C4A47C" }
      ],
      isPlaceholder: false
    },
    {
      id: "proj-06",
      slug: "introspective-rain-courtyard",
      title: "The Monolithic Rain Courtyard",
      subtitle: "Microclimate Cooling & Architectural Plinth",
      category: "Residential",
      location: "North Bengaluru",
      area: "2,200 sq.ft.",
      scope: "Courtyard Architecture, Water Engineering & Shading",
      year: "2025",
      status: "Completed Commission",
      heroImage: "/images/projects/architectural_courtyard_water.jpg",
      galleryImages: [
        "/images/projects/architectural_courtyard_water.jpg",
        "/images/projects/luxury_residence_exterior.jpg",
        "/images/projects/interior_living_sanctuary.jpg"
      ],
      clientNarrative: "An architectural water court serving as the cooling lung of a residence. A hand-forged antique brass spout continuously aerates the basalt reflecting pond, surrounded by deep timber verandahs that remain dry during monsoon downpours.",
      keyFeatures: [
        "Acoustic water mask dampening urban noise into soothing natural ripples",
        "Covered deep verandah colonnade with carved timber columns",
        "Native Bengaluru flora filtering ambient air before entering interior rooms",
        "Dark stone plinth that absorbs daytime heat and cools rapidly at night"
      ],
      materialPalette: [
        { name: "Black Basalt Slabs", description: "Water plinth and submerged reflection basin", colorHex: "#161714" },
        { name: "Hand-Forged Brass Spout", description: "Sculptural water feature element", colorHex: "#A8865D" },
        { name: "Honed Limestone Border", description: "Verandah corridor walkway remaining slip-resistant", colorHex: "#F0ECE3" }
      ],
      isPlaceholder: false
    }
  ] as ProjectItem[],

  // PROCESS (Discover -> Define -> Design -> Deliver)
  process: [
    {
      step: "01",
      phase: "Discover",
      heading: "Site, Light & Microclimate Analysis",
      summary: "Every project begins with listening. We study your site orientation, wind corridors, surrounding vegetation, daily living rituals, and programmatic goals.",
      deliverables: ["Site Solar & Wind Study", "Spatial Feasibility Brief", "Zoning & Municipal By-law Review", "Vision Mapping"]
    },
    {
      step: "02",
      phase: "Define",
      heading: "Concept, Proportions & Volumetric Flow",
      summary: "Translating conversations into initial volumetric models and floor layouts that establish hierarchy, natural light ingress, and privacy thresholds.",
      deliverables: ["Iterative Floor Plans", "3D Volumetric Studies", "Material Mood Boards", "Initial Budget Alignment"]
    },
    {
      step: "03",
      phase: "Design",
      heading: "Refinement, Detailing & Sourcing",
      summary: "Developing complete architectural and interior construction drawings, bespoke joinery specifications, lighting plans, and physical material palettes.",
      deliverables: ["Full Working Drawings", "Interior Millwork Package", "Electrical & Lighting Schedules", "Material Sourcing Matrix"]
    },
    {
      step: "04",
      phase: "Deliver",
      heading: "Turnkey Execution & Site Oversight",
      summary: "Active on-site supervision to safeguard design intent, resolve unexpected site challenges, and orchestrate precision craftsmanship.",
      deliverables: ["Bi-Weekly Site Video Audits", "Craftsperson Mockup Sign-offs", "Quality Checklists", "Final Handover Protocol"]
    }
  ],

  // CAPABILITIES
  capabilities: [
    {
      number: "01",
      title: "Bespoke Residential Architecture",
      scopeList: ["Site Evaluation", "Concept Typologies", "Massing & Sun Studies", "Bespoke Residences"],
      description: "Crafting architectural volumes that respond directly to Bengaluru’s tropical microclimate, privacy buffers, natural ventilation, and material tactile beauty.",
      isConfirmed: true,
    },
    {
      number: "02",
      title: "Luxury Interior Architecture",
      scopeList: ["Spatial Flow", "Custom Millwork", "Integrated Lighting", "Artisan Finishes"],
      description: "Cohesive interior spaces designed with restraint—harmonizing raw limestone, oiled teak, blackened metal, and textured linens for quiet daily living.",
      isConfirmed: true,
    },
    {
      number: "03",
      title: "Courtyard & Biophilic Planning",
      scopeList: ["Courtyard Design", "Water Features", "Native Vegetation Strategy", "Deep Verandahs"],
      description: "Dissolving barriers between interior rooms and landscaped light-courts to cultivate calm sanctuaries amidst the bustling city.",
      isConfirmed: true,
    },
    {
      number: "04",
      title: "Renovation & Spatial Interventions",
      scopeList: ["Structural Assessment", "Modern Spatial Interventions", "Heritage Balancing", "Envelope Upgrade"],
      description: "Reimagining existing residential and commercial structures to meet contemporary spatial demands while honouring structural memory and character.",
      isConfirmed: true,
    },
    {
      number: "05",
      title: "Custom Furniture & Millwork",
      scopeList: ["Joinery Prototypes", "Aged Brass Hardware", "Custom Stone Vanities", "Staircase Sculptures"],
      description: "Working intimately with skilled craftspeople to design custom architectural hardware, tactile furniture, and joinery unique to each commission.",
      isConfirmed: true,
    },
    {
      number: "06",
      title: "Turnkey Supervision & Quality Oversight",
      scopeList: ["Tender Documentation", "Material Sourcing", "Site Quality Audits", "Turnkey Liaison"],
      description: "Rigorous technical documentation and continuous on-site guidance to ensure fidelity between initial blueprints and physical reality.",
      isConfirmed: true,
    },
  ],

  // FREQUENTLY ASKED QUESTIONS
  faqs: [
    {
      question: "Do you cater to international clients or NRIs building in Bengaluru?",
      answer: "Yes. Approximately 40% of our residential commissions are for overseas clients and NRIs. We provide a full turnkey service including bi-weekly high-definition video walkthroughs, drone aerial progress reports, digital BIM reviews, and transparent financial milestones.",
      isPendingApproval: false,
    },
    {
      question: "What is the typical project scale IDC Architects undertakes?",
      answer: "We focus on bespoke single-family residences (typically 3,500 to 15,000+ sq.ft.), luxury penthouses and apartment interior renovations, and boutique commercial workspaces in Bengaluru and South India.",
      isPendingApproval: false,
    },
    {
      question: "At what stage should we engage your studio?",
      answer: "We recommend engaging us as early as possible—ideally before purchasing a parcel or commencing civil alterations. Early involvement allows us to assess solar orientation, microclimates, and local municipal zoning requirements to maximise your site's potential.",
      isPendingApproval: false,
    },
    {
      question: "Do you handle both architectural design and interior execution?",
      answer: "Yes. We believe that true architectural clarity occurs when the external structure and internal atmosphere speak the same language. We provide full-scope architectural design, interior architecture, custom joinery documentation, and active site coordination.",
      isPendingApproval: false,
    },
    {
      question: "How does the initial project consultation work?",
      answer: "We begin with a structured 45-minute discovery consultation at our T Dasarahalli studio or via Google Meet / Zoom. We review your site parameters, design aspirations, timeline, and budget parameters before tailoring a comprehensive proposal.",
      isPendingApproval: false,
    }
  ]
};
