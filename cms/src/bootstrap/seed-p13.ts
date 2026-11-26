import type { Core } from '@strapi/strapi';
import { ensurePublishedPageEntry } from './collection-seed-helper';
import { ensureSeedMediaAsset } from './media-helper';

export async function seedAboutAndApproach(
  strapi: Core.Strapi
): Promise<void> {
  const aboutImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'company'],
    fileName: 'navosys-about-company.png',
    alternativeText:
      'Minimal Swiss architectural illustration of interlocking structural pillars and balanced planes representing NAVOSYS engineering precision',
    caption: 'NAVOSYS Company Architecture Visual',
  });
  const approachImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'company'],
    fileName: 'navosys-approach-lifecycle.png',
    alternativeText:
      'Minimal editorial diagram representing the six-stage NAVOSYS engineering delivery lifecycle',
    caption: 'NAVOSYS Six-Stage Delivery Approach Visual',
  });

  await ensurePublishedPageEntry(strapi, '/about', {
    title: 'About NAVOSYS',
    slug: 'about',
    pageType: 'standard',
    summary:
      'NAVOSYS is an enterprise technology engineering partner focused on resilient cloud architecture, governed AI automation, dependable software systems, and decision-ready data platforms.',
    showBreadcrumbs: true,
    isIndexable: true,
    seo: {
      metaTitle: 'About NAVOSYS | Enterprise Technology Engineering Partner',
      metaDescription:
        'Learn about NAVOSYS, our engineering mission, architectural values, and four integrated delivery practices.',
      ogImage: aboutImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
    sections: [
      {
        __component: 'sections.hero',
        eyebrow: 'About NAVOSYS',
        heading: 'Pragmatic Engineering Built for What Comes Next',
        subheading:
          'We design, modernize, and operate software, cloud infrastructure, intelligent workflows, and data systems that stay clear, secure, and maintainable long after launch.',
        alignment: 'left',
        primaryCta: {
          label: 'Explore Our Approach',
          url: '/approach',
          variant: 'primary',
          isVisible: true,
        },
        secondaryCta: {
          label: 'Book a Consultation',
          url: '/contact/book-consultation',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'ivory',
        spacing: 'default',
        isVisible: true,
        sortOrder: 1,
      },
      {
        __component: 'sections.image-text',
        eyebrow: 'Mission & Perspective',
        heading: 'Systems Worth Operating Five Years From Today',
        body: 'Too many technology initiatives stall under accidental complexity, fragmented ownership, or short-lived hype.\n\nNAVOSYS was built around a steadier standard: pair clean architectural foundations with explicit security boundaries, honest build-vs-buy judgment, and thorough technical documentation so every platform transfers cleanly to internal teams or operates calmly at scale.',
        media: aboutImage?.id ?? null,
        mediaAlt:
          'Minimal Swiss architectural illustration of interlocking structural pillars and balanced planes representing NAVOSYS engineering precision',
        mediaPosition: 'left',
        cta: {
          label: 'View Core Services',
          url: '/services',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'sand',
        spacing: 'default',
        isVisible: true,
        sortOrder: 2,
      },
      {
        __component: 'sections.card-grid',
        eyebrow: 'Operating Values',
        heading: 'Principles Behind Every Engagement',
        intro:
          'How we scope architecture decisions, communicate risk, and verify production quality.',
        gridKind: 'features',
        columns: '4',
        items: [
          {
            eyebrow: '01',
            title: 'Clarity Over Complexity',
            description:
              'Choose straightforward, well-documented designs ahead of brittle abstractions.',
            order: 1,
          },
          {
            eyebrow: '02',
            title: 'Security by Default',
            description:
              'Build least-privilege access, input validation, and auditability into core schemas.',
            order: 2,
          },
          {
            eyebrow: '03',
            title: 'Honest Trade-Offs',
            description:
              'Recommend deterministic automation or incremental fixes whenever full rewrites or AI are unnecessary.',
            order: 3,
          },
          {
            eyebrow: '04',
            title: 'Transferable Ownership',
            description:
              'Ship typed repositories, runbooks, and automated checks teams can inspect confidently.',
            order: 4,
          },
        ],
        surface: 'ivory',
        spacing: 'default',
        isVisible: true,
        sortOrder: 3,
      },
      {
        __component: 'sections.card-grid',
        eyebrow: 'Core Capabilities',
        heading: 'Four Integrated Engineering Pillars',
        intro:
          'We organize work across four complementary disciplines that often intersect inside real organizations.',
        gridKind: 'services',
        columns: '2',
        items: [
          {
            title: 'Cloud & IT Solutions',
            description:
              'Migration wave planning, hybrid connectivity, DevOps CI/CD, and managed operational rigor.',
            href: '/services/cloud-and-it',
            ctaLabel: 'Explore Cloud & IT',
            order: 1,
          },
          {
            title: 'AI & Intelligent Automation',
            description:
              'Deterministic process orchestration alongside human-supervised AI agents and safe model integration.',
            href: '/services/ai-and-automation',
            ctaLabel: 'Explore AI & Automation',
            order: 2,
          },
          {
            title: 'Software Engineering',
            description:
              'Custom web, mobile, and enterprise systems paired with disciplined maintenance and modernization.',
            href: '/services/software-engineering',
            ctaLabel: 'Explore Software Engineering',
            order: 3,
          },
          {
            title: 'Data & Analytics',
            description:
              'Validated data ingestion pipelines, semantic KPI governance, and accessible BI reporting.',
            href: '/services/data-and-analytics',
            ctaLabel: 'Explore Data & Analytics',
            order: 4,
          },
        ],
        surface: 'sand',
        spacing: 'default',
        isVisible: true,
        sortOrder: 4,
      },
      {
        __component: 'sections.cta-banner',
        eyebrow: 'Start a Conversation',
        heading: 'Ready to Discuss Your Architecture or Roadmap?',
        body: 'Share your technical context, timelines, or operational bottlenecks to explore a clear engagement plan.',
        variant: 'footer_cta',
        primaryCta: {
          label: 'Get a Quote',
          url: '/contact/get-quote',
          variant: 'primary',
          isVisible: true,
        },
        secondaryCta: {
          label: 'Book a Consultation',
          url: '/contact/book-consultation',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'navy',
        spacing: 'default',
        isVisible: true,
        sortOrder: 5,
      },
    ],
  });

  await ensurePublishedPageEntry(strapi, '/approach', {
    title: 'Our Approach',
    slug: 'approach',
    pageType: 'standard',
    summary:
      'Six-stage engineering lifecycle—Discover, Architect, Build, Deploy, Optimize, and Manage—built around empirical verification and risk discipline.',
    showBreadcrumbs: true,
    isIndexable: true,
    seo: {
      metaTitle: 'Our Approach | Six-Stage Delivery Lifecycle | NAVOSYS',
      metaDescription:
        'Explore the NAVOSYS engineering methodology: Discover, Architect, Build, Deploy, Optimize, and Manage.',
      ogImage: approachImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
    sections: [
      {
        __component: 'sections.hero',
        eyebrow: 'Our Approach',
        heading: 'Calm, Predictable Delivery Across Six Connected Stages',
        subheading:
          'Every cloud migration, custom application, automation initiative, and data platform follows a transparent engineering cadence with measurable checkpoints at every step.',
        alignment: 'left',
        primaryCta: {
          label: 'Request Assessment',
          url: '/contact/request-assessment',
          variant: 'primary',
          isVisible: true,
        },
        secondaryCta: {
          label: 'Get a Quote',
          url: '/contact/get-quote',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'ivory',
        spacing: 'default',
        isVisible: true,
        sortOrder: 1,
      },
      {
        __component: 'sections.process-steps',
        eyebrow: 'Methodology',
        heading: 'Discover · Architect · Build · Deploy · Optimize · Manage',
        intro:
          'Clear entry criteria, written architecture artifacts, and verification gates keep projects grounded.',
        layout: 'steps',
        steps: [
          {
            stepNumber: '01 · Discover',
            title: 'Discover Context & Real Constraints',
            description:
              'Inspect current infrastructure, source code, manual bottlenecks, compliance boundaries, and concrete business objectives before proposing solutions.',
            order: 1,
          },
          {
            stepNumber: '02 · Architect',
            title: 'Architect Target Systems & Sequencing',
            description:
              'Produce Architecture Decision Records, schemas, IAM/network boundaries, and milestone cutover plans.',
            order: 2,
          },
          {
            stepNumber: '03 · Build',
            title: 'Build in Verified Vertical Slices',
            description:
              'Implement typed backend/frontend modules and Infrastructure-as-Code backed by automated linting, typechecks, and unit/component tests.',
            order: 3,
          },
          {
            stepNumber: '04 · Deploy',
            title: 'Deploy With Staging Rehearsal & Rollback Paths',
            description:
              'Verify migrations, permissions, and health checks in pre-production prior to disciplined production rollout.',
            order: 4,
          },
          {
            stepNumber: '05 · Optimize',
            title: 'Optimize Latency, Reliability & Cost',
            description:
              'Refine database queries, bundle weight, inference spend, and alerting using observed production telemetry.',
            order: 5,
          },
          {
            stepNumber: '06 · Manage',
            title: 'Manage & Transfer Cleanly',
            description:
              'Deliver operations runbooks, dependency patching schedules, and team knowledge transfer—or remain on support retainer.',
            order: 6,
          },
        ],
        surface: 'sand',
        spacing: 'default',
        isVisible: true,
        sortOrder: 2,
      },
      {
        __component: 'sections.image-text',
        eyebrow: 'Verification Culture',
        heading: 'Built-In Governance Instead of Late Surprises',
        body: 'Waiting until go-live to check security headers, accessibility, or migration rollbacks creates avoidable delays.\n\nWe treat automated static analysis, production-representative dry runs, and least-privilege defaults as routine daily engineering work across every phase.',
        media: approachImage?.id ?? null,
        mediaAlt:
          'Minimal editorial diagram representing the six-stage NAVOSYS engineering delivery lifecycle',
        mediaPosition: 'right',
        cta: {
          label: 'View Reference Case Studies',
          url: '/case-studies',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'ivory',
        spacing: 'default',
        isVisible: true,
        sortOrder: 3,
      },
      {
        __component: 'sections.faq-accordion',
        eyebrow: 'Working With NAVOSYS',
        heading: 'Frequently Asked Methodology Questions',
        items: [
          {
            question: 'Can we begin with Discovery & Architecture before committing to full build scope?',
            answer:
              'Yes. Many organizations start with a bounded readiness assessment or architecture blueprint so budget, risks, and technical options are crystal clear before build kickoff.',
            order: 1,
          },
          {
            question: 'How do you handle documentation and handoff to our internal team?',
            answer:
              'Every project includes setup documentation, schema/architecture notes, deployment commands, and structured walkthrough sessions tailored to your engineering and operations owners.',
            order: 2,
          },
        ],
        surface: 'sand',
        spacing: 'default',
        isVisible: true,
        sortOrder: 4,
      },
      {
        __component: 'sections.cta-banner',
        eyebrow: 'Next Step',
        heading: 'Evaluate Your Next Milestone With Our Engineering Team',
        body: 'Start with a focused assessment or walk us through your system architecture.',
        variant: 'footer_cta',
        primaryCta: {
          label: 'Book a Consultation',
          url: '/contact/book-consultation',
          variant: 'primary',
          isVisible: true,
        },
        secondaryCta: {
          label: 'Request Assessment',
          url: '/contact/request-assessment',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'navy',
        spacing: 'default',
        isVisible: true,
        sortOrder: 5,
      },
    ],
  });
}
