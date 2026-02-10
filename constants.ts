import { PainterStyle } from './types';

export const INITIAL_ARTICLE_CONTENT = `Global Medical Device Regulatory Outlook 2025-2026
Target Audience: C-Suite MedTech Executives, Regulatory Affairs Directors, QA/RA Professionals, Legal Counsel, and AI/Software Developers in Healthcare.
Total Target Word Count: ~30,000 words.
Primary Theme: The harmonization of legacy device regulations with the explosion of Artificial Intelligence (AI) and Machine Learning (ML) technologies.

Part 1: Executive Summary & Global Context
1. Executive Summary
Objective: Provide a high-level synthesis of the state of the industry.
Key Themes:
The transition from "Post-Pandemic Recovery" to "Technological Integration."
The "Regulatory Cliff" of 2025/2026 (EU MDR deadlines, US QMSR implementation).
The paradigm shift: Regulating "Black Box" AI and Generative AI in healthcare.

2. The Global Regulatory Harmonization Landscape
Objective: Analyze efforts by the IMDRF (International Medical Device Regulators Forum) to unify standards.
Key Points:
Update on the Medical Device Single Audit Program (MDSAP): Expansion plans for 2025.
ISO 13485:2016: Its cementing role as the global baseline (referencing the US shift).

Table 1: Critical Regulatory Deadlines & Milestones (2025-2026)
Region | Regulation / Initiative | Key Milestone / Deadline | Impact Level
USA | QMSR | Feb 2, 2026: Final effective date replacing 21 CFR 820 with ISO 13485. | Critical
EU | EU AI Act | H1 2025 - 2026: Phased implementation. | High
EU | IVDR | 2025-2027: Rolling transition deadlines. | Critical
UK | New UK Sovereign Framework | July 2025: Expected implementation. | High
China | GB 9706 Standards | 2026: Full enforcement. | Medium
Global | IMDRF AI Guidance | 2025: Release of harmonized definitions. | Medium

Part 2: The Core Theme – AI & Machine Learning in Medical Devices
3. Defining the New Frontier: SaMD, SiMD, and AI/ML
Objective: Clarify definitions and scope for 2025.
Key Points:
Software as a Medical Device (SaMD) vs. Software in a Medical Device (SiMD).
Generative AI (LLMs in Healthcare): The 2025 regulatory stance on non-deterministic algorithms.
Predetermined Change Control Plans (PCCP): The new gold standard.

4. The "Black Box" Problem: Explainability and Transparency
Objective: Address the regulatory demand for "White Box" or explainable AI (XAI).
Key Points:
EU Requirements: AI Act mandates human oversight.
FDA Requirements: "Transparency of AI/ML-enabled Medical Devices".
Bias and Health Equity: New 2025 mandates.

5. AI Lifecycle Management: MLOps meets Design Controls
Objective: Integrating Agile/MLOps workflows into Waterfall regulatory requirements.
Table 2: AI Risk Classification Matrix (EU vs. US Approaches)
Feature | EU (AI Act + MDR) | USA (FDA Risk Framework)
Definition of High Risk | Class IIa+ safety components. | "Significance of information" vs. "State of healthcare".
Change Management | New Notified Body assessment for significant changes. | PCCP allows pre-authorized modifications.

Part 3: Regional Deep Dives (Regulatory Updates)
6. United States: The Post-Modernization Era
The QMSR Revolution (Final Rule Feb 2026): Moving from 21 CFR 820 to ISO 13485:2016.
LDT (Laboratory Developed Tests): FDA's final rule ending enforcement discretion.
7. European Union: Stabilizing the MDR/IVDR
The AI Act (2025/2026): Interaction with MDR Article 117.
8. United Kingdom: The Post-Brexit Sovereign Framework
International Recognition: Accepting FDA/MDSAP approvals.
9. Asia-Pacific: China and Japan
China (NMPA): Order 739 and data localization. Japan (PMDA): SAKIGAKE designation.

Part 4: Cybersecurity & Data Privacy
10. The "Refuse to Accept" Era
FDA Section 524B: No cyber documentation = Immediate rejection.
SBOM: Global standard format (SPDX/CycloneDX).
11. EU Cyber Resilience Act (CRA)
Incident reporting timelines (24 hours).

Part 5: Future Outlook & Strategic Implementation
12. Strategic Regulatory Affairs: The Talent Crunch
Shortage of RAPS-certified professionals with AI expertise.
13. Sustainability and Green MedTech
EU banning "Forever Chemicals" (PFAS) in device manufacturing.
14. Conclusion: The Integrated Device
Success in 2026 requires merging Regulatory, Clinical, and Data Science.`;

export const PAINTER_STYLES: PainterStyle[] = [
  {
    id: 'van-gogh',
    name: 'Vincent van Gogh',
    bgGradient: 'bg-gradient-to-br from-blue-900 via-yellow-600 to-blue-800',
    cardBg: 'bg-blue-950/70 backdrop-blur-md',
    textColor: 'text-yellow-100',
    accentColor: 'text-yellow-400',
    fontFamily: 'font-serif',
    borderColor: 'border-yellow-500/50'
  },
  {
    id: 'monet',
    name: 'Claude Monet',
    bgGradient: 'bg-gradient-to-r from-green-200 via-blue-200 to-pink-200',
    cardBg: 'bg-white/60 backdrop-blur-lg',
    textColor: 'text-slate-800',
    accentColor: 'text-teal-600',
    fontFamily: 'font-sans',
    borderColor: 'border-white/50'
  },
  {
    id: 'picasso',
    name: 'Pablo Picasso',
    bgGradient: 'bg-gradient-to-tr from-red-500 via-blue-500 to-yellow-500',
    cardBg: 'bg-stone-100/90',
    textColor: 'text-black',
    accentColor: 'text-red-600',
    fontFamily: 'font-mono',
    borderColor: 'border-black'
  },
  {
    id: 'dali',
    name: 'Salvador Dali',
    bgGradient: 'bg-gradient-to-b from-orange-300 via-amber-700 to-black',
    cardBg: 'bg-black/40 backdrop-blur-sm',
    textColor: 'text-orange-50',
    accentColor: 'text-orange-400',
    fontFamily: 'font-serif',
    borderColor: 'border-orange-500'
  },
  {
    id: 'da-vinci',
    name: 'Leonardo da Vinci',
    bgGradient: 'bg-[#d2b48c]', // Sepia tone
    cardBg: 'bg-[#f4e4bc]/80',
    textColor: 'text-amber-900',
    accentColor: 'text-amber-700',
    fontFamily: 'font-serif',
    borderColor: 'border-amber-900/30'
  },
  {
    id: 'mondrian',
    name: 'Piet Mondrian',
    bgGradient: 'bg-white',
    cardBg: 'bg-white border-4 border-black',
    textColor: 'text-black',
    accentColor: 'text-red-600',
    fontFamily: 'font-sans',
    borderColor: 'border-black'
  },
  {
    id: 'hokusai',
    name: 'Hokusai',
    bgGradient: 'bg-gradient-to-b from-blue-100 to-blue-900',
    cardBg: 'bg-white/80',
    textColor: 'text-blue-900',
    accentColor: 'text-red-500',
    fontFamily: 'font-serif',
    borderColor: 'border-blue-900'
  },
  {
    id: 'warhol',
    name: 'Andy Warhol',
    bgGradient: 'bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400',
    cardBg: 'bg-black/80',
    textColor: 'text-white',
    accentColor: 'text-yellow-300',
    fontFamily: 'font-mono',
    borderColor: 'border-pink-500'
  },
  {
    id: 'rembrandt',
    name: 'Rembrandt',
    bgGradient: 'bg-gradient-to-br from-black via-stone-800 to-stone-900',
    cardBg: 'bg-stone-900/80',
    textColor: 'text-amber-100',
    accentColor: 'text-amber-500',
    fontFamily: 'font-serif',
    borderColor: 'border-amber-900'
  },
  {
    id: 'okeeffe',
    name: 'Georgia O\'Keeffe',
    bgGradient: 'bg-gradient-to-tr from-rose-200 to-orange-100',
    cardBg: 'bg-white/50 backdrop-blur-xl',
    textColor: 'text-rose-900',
    accentColor: 'text-rose-600',
    fontFamily: 'font-sans',
    borderColor: 'border-rose-200'
  },
  {
    id: 'basquiat',
    name: 'Jean-Michel Basquiat',
    bgGradient: 'bg-slate-900',
    cardBg: 'bg-slate-800 border-dashed border-2',
    textColor: 'text-white',
    accentColor: 'text-yellow-400',
    fontFamily: 'font-mono',
    borderColor: 'border-white'
  },
  {
    id: 'kahlo',
    name: 'Frida Kahlo',
    bgGradient: 'bg-gradient-to-r from-green-600 to-red-600',
    cardBg: 'bg-stone-100/90',
    textColor: 'text-stone-900',
    accentColor: 'text-red-700',
    fontFamily: 'font-serif',
    borderColor: 'border-green-700'
  },
  {
    id: 'pollock',
    name: 'Jackson Pollock',
    bgGradient: 'bg-stone-300',
    cardBg: 'bg-white/90',
    textColor: 'text-black',
    accentColor: 'text-slate-600',
    fontFamily: 'font-sans',
    borderColor: 'border-slate-400'
  },
  {
    id: 'klimt',
    name: 'Gustav Klimt',
    bgGradient: 'bg-gradient-to-br from-yellow-600 via-yellow-300 to-yellow-700',
    cardBg: 'bg-black/80 border border-yellow-400',
    textColor: 'text-yellow-100',
    accentColor: 'text-yellow-300',
    fontFamily: 'font-serif',
    borderColor: 'border-yellow-500'
  },
  {
    id: 'matisse',
    name: 'Henri Matisse',
    bgGradient: 'bg-blue-600',
    cardBg: 'bg-orange-500',
    textColor: 'text-white',
    accentColor: 'text-green-300',
    fontFamily: 'font-sans',
    borderColor: 'border-white'
  },
  {
    id: 'hopper',
    name: 'Edward Hopper',
    bgGradient: 'bg-gradient-to-b from-sky-800 to-slate-900',
    cardBg: 'bg-slate-800/90',
    textColor: 'text-emerald-50',
    accentColor: 'text-emerald-400',
    fontFamily: 'font-sans',
    borderColor: 'border-slate-600'
  },
  {
    id: 'banksy',
    name: 'Banksy',
    bgGradient: 'bg-stone-400',
    cardBg: 'bg-stone-200 shadow-xl',
    textColor: 'text-stone-900',
    accentColor: 'text-red-600',
    fontFamily: 'font-mono',
    borderColor: 'border-stone-500'
  },
  {
    id: 'munch',
    name: 'Edvard Munch',
    bgGradient: 'bg-gradient-to-b from-orange-700 via-red-900 to-purple-900',
    cardBg: 'bg-black/50 backdrop-blur-md',
    textColor: 'text-orange-100',
    accentColor: 'text-orange-500',
    fontFamily: 'font-serif',
    borderColor: 'border-red-900'
  },
  {
    id: 'renoir',
    name: 'Pierre-Auguste Renoir',
    bgGradient: 'bg-gradient-to-r from-pink-100 to-blue-100',
    cardBg: 'bg-white/70',
    textColor: 'text-slate-700',
    accentColor: 'text-pink-600',
    fontFamily: 'font-serif',
    borderColor: 'border-pink-200'
  },
  {
    id: 'magritte',
    name: 'René Magritte',
    bgGradient: 'bg-gradient-to-b from-sky-400 via-sky-200 to-black',
    cardBg: 'bg-white/90',
    textColor: 'text-black',
    accentColor: 'text-sky-700',
    fontFamily: 'font-sans',
    borderColor: 'border-black'
  }
];
