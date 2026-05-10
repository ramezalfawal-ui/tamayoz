import type { Specialization, Company, TrainingItem } from './types'

export const WIZARD_STEPS = [
  'Register',
  'Field',
  'Profile',
  'Experience',
  'Cover Letter',
  'Video',
  'AI Review',
]

export const SPECIALIZATIONS: Specialization[] = [
  {
    id: 'it',
    title: 'IT & Development',
    titleAr: 'تقنية المعلومات',
    desc: 'Web, app, cloud & support roles',
    icon: '💻',
    color: '#3b82f6',
    testTitle: 'Build a responsive landing page component',
    questions: [
      { id: 'q1', question: 'Describe your experience with React or similar frameworks.' },
      { id: 'q2', question: 'How do you approach debugging a production issue?' },
      { id: 'q3', question: 'What cloud services have you used in past projects?' },
      { id: 'q4', question: 'How do you ensure code quality in a team environment?' },
      { id: 'q5', question: 'Describe a challenging technical problem you solved.' },
    ],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    titleAr: 'التسويق الرقمي',
    desc: 'Social media, paid ads, SEO & campaigns',
    icon: '📊',
    color: '#f59e0b',
    testTitle: 'Create a campaign brief for a new UAE product launch',
    questions: [
      { id: 'q1', question: 'How do you build a social media content calendar?' },
      { id: 'q2', question: 'Explain how you measure a campaign\'s ROI.' },
      { id: 'q3', question: 'What is your experience with paid ads (Google, Meta)?' },
      { id: 'q4', question: 'How do you approach SEO for a new website?' },
      { id: 'q5', question: 'Describe a successful campaign you managed.' },
    ],
  },
  {
    id: 'accounting',
    title: 'Accounting & Finance',
    titleAr: 'المحاسبة والمالية',
    desc: 'Audit, VAT, ERP & bookkeeping',
    icon: '🧾',
    color: '#10b981',
    testTitle: 'Prepare an aging report and collection risk analysis',
    questions: [
      { id: 'q1', question: 'Walk me through the monthly closing process.' },
      { id: 'q2', question: 'How do you prepare a bank reconciliation?' },
      { id: 'q3', question: 'What is your experience with UAE VAT filing?' },
      { id: 'q4', question: 'Which ERP systems have you worked with?' },
      { id: 'q5', question: 'How do you manage accounts receivable collections?' },
    ],
  },
  {
    id: 'design',
    title: 'Graphic Design',
    titleAr: 'التصميم الجرافيكي',
    desc: 'Brand identity, UI/UX & creative assets',
    icon: '🎨',
    color: '#8b5cf6',
    testTitle: 'Design a social media post set for a UAE restaurant brand',
    questions: [
      { id: 'q1', question: 'How do you approach a brand identity project from scratch?' },
      { id: 'q2', question: 'What is your design process for a client brief?' },
      { id: 'q3', question: 'What tools do you use daily? (Adobe, Figma, etc.)' },
      { id: 'q4', question: 'How do you handle client feedback and revisions?' },
      { id: 'q5', question: 'Describe your most complex design project.' },
    ],
  },
  {
    id: 'content',
    title: 'Content Creation',
    titleAr: 'صناعة المحتوى',
    desc: 'Scripts, reels, copy & strategy',
    icon: '✍️',
    color: '#ec4899',
    testTitle: 'Write 5 hooks and a Reel script for a UAE lifestyle brand',
    questions: [
      { id: 'q1', question: 'How do you generate content ideas for a brand consistently?' },
      { id: 'q2', question: 'What is the difference between a hook and a CTA?' },
      { id: 'q3', question: 'How do you measure content performance?' },
      { id: 'q4', question: 'Show an example of your best-performing content.' },
      { id: 'q5', question: 'How do you create content for a difficult or technical product?' },
    ],
  },
  {
    id: 'sales',
    title: 'Sales & Business Dev',
    titleAr: 'المبيعات وتطوير الأعمال',
    desc: 'B2B, retail & business growth',
    icon: '📈',
    color: '#f97316',
    testTitle: 'Record a 2-minute product pitch for a B2B SaaS tool',
    questions: [
      { id: 'q1', question: 'How do you handle a sales objection effectively?' },
      { id: 'q2', question: 'What is your process for building a new client relationship?' },
      { id: 'q3', question: 'How do you prioritize your sales pipeline?' },
      { id: 'q4', question: 'Describe your best sales achievement with numbers.' },
      { id: 'q5', question: 'How do you recover a deal that\'s going cold?' },
    ],
  },
]

export const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain', 'Ras Al Khaimah', 'Fujairah']

export const COUNTRIES = [
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'QA', name: 'Qatar' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'OM', name: 'Oman' },
  { code: 'EG', name: 'Egypt' },
  { code: 'JO', name: 'Jordan' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'IN', name: 'India' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PH', name: 'Philippines' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
]

export const AVAILABILITY_OPTIONS = [
  'Immediately',
  'Within 2 weeks',
  'Within 30 days',
  '1–2 months',
  '3+ months',
]

export const LANGUAGE_LEVELS = ['Native', 'Fluent', 'Intermediate', 'Basic'] as const

export const COMPANIES: Company[] = [
  { id: '1', name: 'Etisalat by e&', location: 'Abu Dhabi, UAE', size: '10,000+', field: 'Telecom & Tech', roles: ['Software Engineer', 'Data Analyst', 'Network Engineer'], verified: true },
  { id: '2', name: 'Bayut | dubizzle', location: 'Dubai, UAE', size: '1,000+', field: 'Real Estate Tech', roles: ['Product Designer', 'Mobile Developer', 'Marketing Manager'], verified: true },
  { id: '3', name: 'DP World', location: 'Dubai, UAE', size: '50,000+', field: 'Logistics & Trade', roles: ['DevOps Engineer', 'Security Lead', 'Accountant'], verified: true },
  { id: '4', name: 'Careem', location: 'Dubai, UAE', size: '2,000+', field: 'Super-app & Mobility', roles: ['Frontend Developer', 'Accounting Manager', 'Growth Marketer'], verified: true },
  { id: '5', name: 'Noon', location: 'Dubai, UAE', size: '5,000+', field: 'E-Commerce', roles: ['Content Creator', 'Social Media Manager', 'Graphic Designer'], verified: true },
  { id: '6', name: 'ADNOC', location: 'Abu Dhabi, UAE', size: '50,000+', field: 'Energy & Oil & Gas', roles: ['Financial Analyst', 'IT Specialist', 'Sales Executive'], verified: true },
]

export const TRAINING_ITEMS: TrainingItem[] = [
  { id: '1', title: 'Advanced React Patterns at Scale', type: 'Online course', field: 'IT', provider: 'LinkedIn Learning', duration: '4h 30m', emoji: '📚', color: '#3b82f6' },
  { id: '2', title: 'Cloud-Native Architecture Fundamentals', type: 'Live workshop', field: 'IT', provider: 'Tamayoz Academy', duration: '2 days', emoji: '⚡', color: '#f59e0b' },
  { id: '3', title: 'Google Ads Mastery for UAE Market', type: 'Online course', field: 'Marketing', provider: 'Coursera', duration: '8h', emoji: '📊', color: '#10b981' },
  { id: '4', title: 'UAE VAT Filing & Compliance 2025', type: 'Online course', field: 'Accounting', provider: 'Tamayoz Academy', duration: '3h', emoji: '🧾', color: '#8b5cf6' },
  { id: '5', title: 'Figma for UI Designers', type: 'Online course', field: 'Design', provider: 'Udemy', duration: '10h', emoji: '🎨', color: '#ec4899' },
  { id: '6', title: 'IT Leaders UAE Meetup Group', type: 'Community', field: 'IT', provider: 'Community', duration: 'Ongoing', emoji: '👥', color: '#10b981' },
  { id: '7', title: 'Reel Script Writing Masterclass', type: 'Live workshop', field: 'Content', provider: 'Tamayoz Academy', duration: '3h', emoji: '✍️', color: '#ec4899' },
  { id: '8', title: 'B2B Sales for UAE Market', type: 'Mentorship', field: 'Sales', provider: 'Expert Network', duration: '4 sessions', emoji: '📈', color: '#f97316' },
]

export const LOAD_MESSAGES = [
  'Analyzing your profile...',
  'Evaluating cover letter quality...',
  'Checking UAE market fit...',
  'Generating your Tamayoz score...',
  'Preparing your feedback report...',
]
