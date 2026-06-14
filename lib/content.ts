import {
  Scale,
  Gavel,
  Landmark,
  FileSearch,
  Briefcase,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  points: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'corporate-law',
    title: 'Corporate Law',
    description:
      'End-to-end counsel on company formation, governance, M&A, joint ventures and commercial contracts across the GCC.',
    icon: Briefcase,
    points: ['Company formation', 'Mergers & acquisitions', 'Commercial contracts'],
  },
  {
    slug: 'arbitration',
    title: 'Arbitration',
    description:
      'Representation in domestic and international arbitration before DIAC, DIFC-LCIA, ICC and ad hoc tribunals.',
    icon: Landmark,
    points: ['DIAC & ICC proceedings', 'Award enforcement', 'Dispute strategy'],
  },
  {
    slug: 'litigation',
    title: 'Litigation',
    description:
      'Robust advocacy before UAE courts and the DIFC, protecting your interests at every stage of the dispute.',
    icon: Gavel,
    points: ['Civil & commercial disputes', 'DIFC courts', 'Appeals & enforcement'],
  },
  {
    slug: 'debt-collection',
    title: 'Debt Collection',
    description:
      'Efficient, discreet recovery of outstanding receivables through negotiation, settlement and legal action.',
    icon: FileSearch,
    points: ['Amicable settlement', 'Legal recovery', 'Cross-border claims'],
  },
  {
    slug: 'regulatory-compliance',
    title: 'Regulatory & Compliance',
    description:
      'Practical guidance on UAE regulatory frameworks, AML, data protection and corporate governance obligations.',
    icon: ShieldCheck,
    points: ['AML & KYC', 'Data protection', 'Corporate governance'],
  },
  {
    slug: 'advisory',
    title: 'Strategic Advisory',
    description:
      'Trusted, board-level advice that aligns legal strategy with your commercial objectives and risk appetite.',
    icon: Scale,
    points: ['Risk management', 'Board advisory', 'Structuring'],
  },
]

export type Member = {
  name: string
  role: string
  image: string
  bio: string
  objectPosition?: string
}

export const TEAM: Member[] = [
  {
    name: 'Kishore Mulani',
    role: 'Managing Partner',
    image: '/portraits/kishore-mulani.png',
    bio: 'Over 20 years of experience advising multinationals, entrepreneurs, and investors on corporate transactions, regulatory compliance, and cross-border commercial strategy in the UAE.',
    objectPosition: 'center 10%',
  },
  {
    name: 'Dr. Essa Al Nuaimi',
    role: 'Partner, UAE Advocate',
    image: '/portraits/dr-essa-al-nuaimi.png',
    bio: 'Distinguished UAE Advocate with extensive experience in commercial disputes, civil litigation, and arbitration representation before local and federal courts.',
    objectPosition: 'center 12%',
  },
  {
    name: 'Fathima Salam',
    role: 'Head of Operations',
    image: '/portraits/fathima-salam.png',
    bio: 'Oversees organizational operations and legal administration, streamlining client engagements and corporate advisory processes for the firm.',
    objectPosition: 'center 18%',
  },
  {
    name: 'Asaf Rizvi',
    role: 'Partner, Corporate Law',
    image: '/portraits/asaf-rizvi.png',
    bio: 'Specializes in cross-border mergers and acquisitions, commercial joint ventures, and strategic corporate structuring across GCC jurisdictions.',
    objectPosition: 'center 10%',
  },
  {
    name: 'Sara Essam',
    role: 'Partner, Dispute Resolution',
    image: '/portraits/sara-essam.png',
    bio: 'Experienced litigator focusing on commercial dispute resolution, shareholder advisory, and strategic counsel before the DIFC courts.',
    objectPosition: 'center 14%',
  },
  {
    name: 'Amira Siddiqui',
    role: 'Senior Associate, Arbitration',
    image: '/portraits/amira-siddiqui.png',
    bio: 'Represents regional and international clients in institutional and ad hoc arbitration proceedings, with deep expertise in construction and energy disputes.',
    objectPosition: 'center 15%',
  },
  {
    name: 'AbdelRehman Atef Barakat',
    role: 'Senior Associate, Litigation',
    image: '/portraits/abdelrehman-atef-barakat.png',
    bio: 'Specializes in civil and commercial litigation, drafting complex pleadings, and representing client interests across local UAE tribunals.',
    objectPosition: 'center 10%',
  },
  {
    name: 'Muskan Bangani',
    role: 'Associate, Litigation',
    image: '/portraits/muskan-bangani.png',
    bio: 'Advises corporate clients on commercial disputes, litigation filings, and regional corporate advisory services.',
    objectPosition: 'center 15%',
  },
  {
    name: 'Dosa Mohamed',
    role: 'Associate, Debt Collection',
    image: '/portraits/dosa-mohamed.png',
    bio: 'Manages legal recovery programs and debt collection campaigns, prioritizing amicable settlement negotiations and legal dispute routes.',
    objectPosition: 'center 12%',
  },
  {
    name: 'Malak Al Dairi',
    role: 'Associate, Compliance',
    image: '/portraits/malak-al-dairi.png',
    bio: 'Provides strategic guidance on corporate governance, AML/KYC requirements, and data protection compliance under federal regulations.',
    objectPosition: 'center 16%',
  },
  {
    name: 'Meera Mohan',
    role: 'Associate, Strategic Advisory',
    image: '/portraits/meera-mohan.png',
    bio: 'Advises clients on business setup, general commercial contracting, and corporate structuring within GCC free zones.',
    objectPosition: 'center 15%',
  },
]

export type Industry = {
  name: string
  description: string
}

export const INDUSTRIES: Industry[] = [
  { name: 'Financial Services', description: 'Banks, funds & fintech' },
  { name: 'Real Estate', description: 'Developers & investors' },
  { name: 'Construction', description: 'Contractors & EPC' },
  { name: 'Energy', description: 'Oil, gas & renewables' },
  { name: 'Technology', description: 'Startups & platforms' },
  { name: 'Healthcare', description: 'Providers & life sciences' },
  { name: 'Retail & FMCG', description: 'Brands & distributors' },
  { name: 'Hospitality', description: 'Hotels & leisure' },
  { name: 'Logistics', description: 'Trade & shipping' },
  { name: 'Manufacturing', description: 'Industrial & supply' },
  { name: 'Media', description: 'Entertainment & sport' },
  { name: 'Family Offices', description: 'Wealth & succession' },
]

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

export const ARTICLES: Article[] = [
  {
    slug: 'uae-arbitration-reforms-2026',
    title: 'What the 2026 UAE Arbitration Reforms Mean for Businesses',
    excerpt:
      'The latest amendments reshape how cross-border disputes are resolved. We unpack the practical implications for in-house counsel.',
    category: 'Arbitration',
    date: 'Jun 2, 2026',
    readTime: '6 min read',
    image: '/insights/article-featured.png',
    featured: true,
  },
  {
    slug: 'structuring-gcc-joint-ventures',
    title: 'Structuring Joint Ventures Across the GCC',
    excerpt:
      'Key governance and exit considerations when partnering in the region’s most dynamic markets.',
    category: 'Corporate',
    date: 'May 21, 2026',
    readTime: '5 min read',
    image: '/insights/article-1.png',
  },
  {
    slug: 'enforcing-foreign-judgments-difc',
    title: 'Enforcing Foreign Judgments Through the DIFC',
    excerpt:
      'How the DIFC courts have become a strategic gateway for the enforcement of international awards.',
    category: 'Litigation',
    date: 'May 9, 2026',
    readTime: '7 min read',
    image: '/insights/article-2.png',
  },
  {
    slug: 'debt-recovery-best-practices',
    title: 'Debt Recovery: A Practical Playbook for 2026',
    excerpt:
      'From amicable settlement to legal action — a step-by-step approach to protecting your receivables.',
    category: 'Debt Collection',
    date: 'Apr 28, 2026',
    readTime: '4 min read',
    image: '/insights/article-3.png',
  },
  {
    slug: 'data-protection-compliance',
    title: 'Navigating the UAE Data Protection Landscape',
    excerpt:
      'What the federal data law means for your compliance program and cross-border data flows.',
    category: 'Compliance',
    date: 'Apr 12, 2026',
    readTime: '5 min read',
    image: '/insights/article-4.png',
  },
]
