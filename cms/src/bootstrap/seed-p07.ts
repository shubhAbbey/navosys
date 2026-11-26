import type { Core } from '@strapi/strapi';
import { ensureSeedMediaAsset } from './media-helper';

export async function seedHomepage(strapi: Core.Strapi): Promise<void> {
  const [heroMedia, approachMedia] = await Promise.all([
    ensureSeedMediaAsset(strapi, {
      folderSegments: ['seed-assets', 'homepage'],
      fileName: 'navosys-home-hero.png',
      alternativeText:
        'Minimal architectural illustration of interconnected enterprise cloud and software systems',
      caption: 'NAVOSYS Homepage Hero Visual',
    }),
    ensureSeedMediaAsset(strapi, {
      folderSegments: ['seed-assets', 'homepage'],
      fileName: 'navosys-home-approach.png',
      alternativeText:
        'Layered architectural systems diagram representing structured software delivery',
      caption: 'NAVOSYS Engineering Approach Visual',
    }),
  ]);

  const pageService = strapi.documents('api::page.page');
  const existing = await pageService.findMany({
    filters: { fullPath: '/' },
    status: 'published',
    populate: ['sections'],
  });

  const currentRoot = existing[0];
  const hasComposedHomepage =
    currentRoot &&
    currentRoot.title !== 'NAVOSYS — Platform Foundation' &&
    Array.isArray(currentRoot.sections) &&
    currentRoot.sections.length > 0;

  if (hasComposedHomepage) {
    return;
  }

  const homepagePayload: Parameters<typeof pageService.create>[0]['data'] = {
    title: "NAVOSYS — Building What's Next.",
    slug: 'home',
    fullPath: '/',
    pageType: 'home',
    summary:
      'NAVOSYS partners with modern organizations on Cloud & IT Solutions, AI & Intelligent Automation, Software Engineering, and Data & Analytics.',
    body: null,
    showBreadcrumbs: false,
    isIndexable: true,
    seo: {
      metaTitle: "NAVOSYS — Building What's Next. | Enterprise Technology Services",
      metaDescription:
        'Dependable cloud architecture, intelligent automation, custom software engineering, and data analytics tailored for modern enterprises.',
      ogTitle: "NAVOSYS — Building What's Next.",
      ogDescription:
        'Cloud & IT Solutions, AI & Intelligent Automation, Software Engineering, and Data & Analytics.',
      ogImage: heroMedia?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
    sections: [
      {
        __component: 'sections.split-hero',
        eyebrow: 'Enterprise Technology Services',
        heading: "Building What's Next.",
        subheading:
          'NAVOSYS designs, builds, and modernizes cloud infrastructure, intelligent workflows, custom software, and data platforms with calm architectural discipline.',
        highlights:
          'Cloud & IT Solutions\nAI & Intelligent Automation\nSoftware Engineering\nData & Analytics',
        mediaPosition: 'right',
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
        media: heroMedia?.id ?? null,
        mediaAlt:
          'Minimal architectural illustration of interconnected enterprise cloud and software systems',
        surface: 'ivory',
        spacing: 'spacious',
        isVisible: true,
        sortOrder: 1,
      },
      {
        __component: 'sections.card-grid',
        eyebrow: 'Four Service Pillars',
        heading: 'Core Technology Capabilities',
        intro:
          'Integrated practices engineered to modernize infrastructure, automate repetitive operations, build reliable software, and surface actionable data.',
        gridKind: 'services',
        columns: '2',
        items: [
          {
            eyebrow: '01 · Pillar',
            title: 'Cloud & IT Solutions',
            description:
              'Cloud migration, hybrid architecture, managed IT operations, infrastructure automation, DevOps pipelines, and platform modernization.',
            href: '/services/cloud-and-it',
            ctaLabel: 'Explore Cloud & IT',
            order: 1,
          },
          {
            eyebrow: '02 · Pillar',
            title: 'AI & Intelligent Automation',
            description:
              'Practical AI agents, human-in-the-loop business process automation, and governed enterprise AI integration grounded in measurable workflows.',
            href: '/services/ai-and-automation',
            ctaLabel: 'Explore AI & Automation',
            order: 2,
          },
          {
            eyebrow: '03 · Pillar',
            title: 'Software Engineering',
            description:
              'Web platforms, mobile applications, enterprise systems, long-term maintenance and support, and incremental application modernization.',
            href: '/services/software-engineering',
            ctaLabel: 'Explore Software Engineering',
            order: 3,
          },
          {
            eyebrow: '04 · Pillar',
            title: 'Data & Analytics',
            description:
              'Reliable data engineering pipelines, business intelligence modeling, executive dashboards, and clear operational visualization.',
            href: '/services/data-and-analytics',
            ctaLabel: 'Explore Data & Analytics',
            order: 4,
          },
        ],
        cta: {
          label: 'View Services Overview',
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
        __component: 'sections.tabs',
        eyebrow: 'Business Challenges & Solutions',
        heading: 'Targeted Engineering for Real Operational Bottlenecks',
        intro:
          'Every engagement starts by isolating the constraint holding back reliability, speed, or visibility.',
        tabs: [
          {
            label: 'Cloud & Infrastructure',
            title: 'Unify Fragile or Costly Infrastructure',
            content:
              'Legacy servers, manual provisioning, and inconsistent environments slow releases and elevate operational risk. We structure repeatable cloud and hybrid environments with clear observability.',
            highlights:
              'Structured workload migration readiness and phasing\nInfrastructure-as-Code and CI/CD reliability\nManaged IT governance and cost visibility',
            ctaLabel: 'Request Cloud Assessment',
            ctaUrl: '/contact/request-assessment?assessment=cloud-readiness',
            order: 1,
          },
          {
            label: 'Manual Workflows',
            title: 'Automate High-Friction Business Processes',
            content:
              'Disparate tools and repetitive triage consume engineering and operations capacity. We build scoped automation and AI-assisted workflows with explicit guardrails and human review.',
            highlights:
              'Practical workflow orchestration across existing APIs\nGoverned AI agent integration with clear auditability\nFocused on verifiable cycle-time reduction',
            ctaLabel: 'Explore AI & Automation',
            ctaUrl: '/services/ai-and-automation',
            order: 2,
          },
          {
            label: 'Legacy Software',
            title: 'Modernize Aging Applications Without Disruption',
            content:
              'Monolithic or brittle software complicates feature delivery and maintenance. We refactor, re-architect, or replace critical systems incrementally while protecting business continuity.',
            highlights:
              'Maintainable TypeScript, web, mobile, and enterprise architectures\nAutomated test coverage and clean API boundaries\nLong-term support and predictable maintenance',
            ctaLabel: 'Explore Software Engineering',
            ctaUrl: '/services/software-engineering',
            order: 3,
          },
          {
            label: 'Fragmented Data',
            title: 'Turn Siloed Data Into Dependable Decision Support',
            content:
              'Disconnected spreadsheets and inconsistent reporting obscure operational truth. We engineer clean ingestion pipelines, governed warehouses, and clear BI dashboards.',
            highlights:
              'Automated ETL/ELT pipelines with schema validation\nConsistent KPI definitions across teams\nDecision-ready BI and executive visualization',
            ctaLabel: 'Explore Data & Analytics',
            ctaUrl: '/services/data-and-analytics',
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
        eyebrow: 'Service Highlights',
        heading: 'Focused Engagements Across the Stack',
        intro:
          'Modular capabilities designed to integrate seamlessly with your existing engineering and IT teams.',
        gridKind: 'features',
        columns: '3',
        items: [
          {
            eyebrow: 'Cloud',
            title: 'Cloud Migration & Hybrid Readiness',
            description:
              'Dependency mapping, staged workload transitions, and resilient hybrid cloud foundations.',
            href: '/services/cloud-migration',
            ctaLabel: 'View service',
            order: 1,
          },
          {
            eyebrow: 'DevOps',
            title: 'Infrastructure & Delivery Automation',
            description:
              'Reproducible environments, CI/CD verification gates, and observability baselines.',
            href: '/services/infrastructure-and-devops',
            ctaLabel: 'View service',
            order: 2,
          },
          {
            eyebrow: 'Automation',
            title: 'Governed AI Workflow Integration',
            description:
              'Connecting language models and automation agents cleanly into core business systems.',
            href: '/services/ai-integration',
            ctaLabel: 'View service',
            order: 3,
          },
          {
            eyebrow: 'Engineering',
            title: 'Custom Web & Enterprise Platforms',
            description:
              'Accessible, server-first applications built for long-term maintainability.',
            href: '/services/enterprise-applications',
            ctaLabel: 'View service',
            order: 4,
          },
          {
            eyebrow: 'Modernization',
            title: 'Application Modernization & Support',
            description:
              'Incremental upgrades, technical debt reduction, and reliable ongoing maintenance.',
            href: '/services/application-modernization',
            ctaLabel: 'View service',
            order: 5,
          },
          {
            eyebrow: 'Data',
            title: 'Data Pipelines & BI Visualization',
            description:
              'Structured ingestion, analytical modeling, and clear business intelligence reporting.',
            href: '/services/business-intelligence',
            ctaLabel: 'View service',
            order: 6,
          },
        ],
        surface: 'sand',
        spacing: 'default',
        isVisible: true,
        sortOrder: 4,
      },
      {
        __component: 'sections.image-text',
        eyebrow: 'Why NAVOSYS',
        heading: 'Clarity, Security, and Maintainability First',
        body: 'Technology initiatives succeed when architecture stays simple enough to understand, secure enough to trust, and flexible enough to evolve.\n\nWe avoid unnecessary hype and over-engineered complexity—prioritizing documented decisions, clean boundaries, and measurable operational readiness from day one.',
        media: approachMedia?.id ?? null,
        mediaAlt:
          'Layered architectural systems diagram representing structured software delivery',
        mediaPosition: 'left',
        cta: {
          label: 'Learn About NAVOSYS',
          url: '/about',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'ivory',
        spacing: 'default',
        isVisible: true,
        sortOrder: 5,
      },
      {
        __component: 'sections.process-steps',
        eyebrow: 'Our Approach',
        heading: 'Six-Stage Delivery Lifecycle',
        intro:
          'A predictable engagement cadence from initial technical discovery through long-term optimization.',
        layout: 'steps',
        steps: [
          {
            stepNumber: '01 · Discover',
            title: 'Assess Context & Constraints',
            description:
              'Review existing systems, workflows, security boundaries, and target business outcomes.',
            order: 1,
          },
          {
            stepNumber: '02 · Architect',
            title: 'Design Target Systems',
            description:
              'Define clear data flows, component boundaries, infrastructure requirements, and milestones.',
            order: 2,
          },
          {
            stepNumber: '03 · Build',
            title: 'Engineer & Verify',
            description:
              'Deliver typed, tested, accessible software and automated infrastructure iteratively.',
            order: 3,
          },
          {
            stepNumber: '04 · Deploy',
            title: 'Release With Safeguards',
            description:
              'Validate in staging environments with repeatable pipelines, health checks, and rollback paths.',
            order: 4,
          },
          {
            stepNumber: '05 · Optimize',
            title: 'Measure & Refine',
            description:
              'Tune performance, reliability, cost efficiency, and user conversion based on real signals.',
            order: 5,
          },
          {
            stepNumber: '06 · Manage',
            title: 'Sustain Operations',
            description:
              'Provide ongoing support, security updates, monitoring, and structured knowledge handoff.',
            order: 6,
          },
        ],
        surface: 'sand',
        spacing: 'default',
        isVisible: true,
        sortOrder: 6,
      },
      {
        __component: 'sections.card-grid',
        eyebrow: 'Technology Capabilities',
        heading: 'Modern Engineering Foundations',
        intro:
          'We select proven, maintainable open-standard technologies aligned to your team and workload requirements.',
        gridKind: 'technologies',
        columns: '4',
        items: [
          {
            eyebrow: 'Cloud & Infra',
            title: 'Containers & IaC',
            description:
              'Linux, Docker, Kubernetes, Terraform, CI/CD automation, and hybrid cloud networking.',
            order: 1,
          },
          {
            eyebrow: 'Automation',
            title: 'AI & Orchestration',
            description:
              'Tool-augmented LLM workflows, API integrations, document pipelines, and validation guardrails.',
            order: 2,
          },
          {
            eyebrow: 'Applications',
            title: 'Web, Mobile & APIs',
            description:
              'TypeScript, React, Next.js, Node.js, PostgreSQL, REST/GraphQL, and cross-platform mobile.',
            order: 3,
          },
          {
            eyebrow: 'Data',
            title: 'Pipelines & BI',
            description:
              'SQL modeling, ETL/ELT orchestration, analytical warehouses, and executive reporting.',
            order: 4,
          },
        ],
        surface: 'ivory',
        spacing: 'default',
        isVisible: true,
        sortOrder: 7,
      },
      {
        __component: 'sections.card-grid',
        eyebrow: 'Industries',
        heading: 'Solutions Tailored to Sector Demands',
        intro:
          'Architecture patterns designed for compliance-sensitive, operational, and customer-centric industries.',
        gridKind: 'industries',
        columns: '3',
        items: [
          {
            title: 'Financial Services',
            description:
              'Audit-ready workflows, secure data pipelines, and resilient digital platforms.',
            href: '/industries/financial-services',
            ctaLabel: 'Explore sector',
            order: 1,
          },
          {
            title: 'Healthcare',
            description:
              'Interoperable systems, workflow automation, and privacy-conscious data management.',
            href: '/industries/healthcare',
            ctaLabel: 'Explore sector',
            order: 2,
          },
          {
            title: 'Retail & eCommerce',
            description:
              'High-performance storefronts, inventory integrations, and customer analytics.',
            href: '/industries/retail-and-ecommerce',
            ctaLabel: 'Explore sector',
            order: 3,
          },
          {
            title: 'Logistics & Supply Chain',
            description:
              'Operational visibility dashboards, event-driven tracking, and process automation.',
            href: '/industries/logistics-and-supply-chain',
            ctaLabel: 'Explore sector',
            order: 4,
          },
          {
            title: 'Manufacturing',
            description:
              'ERP/plant data integration, quality reporting, and system modernization.',
            href: '/industries/manufacturing',
            ctaLabel: 'Explore sector',
            order: 5,
          },
          {
            title: 'Professional Services',
            description:
              'Client portals, knowledge workflows, and streamlined operational tooling.',
            href: '/industries/professional-services',
            ctaLabel: 'Explore sector',
            order: 6,
          },
        ],
        cta: {
          label: 'Explore All Industries',
          url: '/industries',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'sand',
        spacing: 'default',
        isVisible: true,
        sortOrder: 8,
      },
      {
        __component: 'sections.card-grid',
        eyebrow: 'Insights & Perspectives',
        heading: 'Engineering Notes & Guides',
        intro:
          'Practical perspectives on cloud readiness, AI workflow governance, and maintainable system design.',
        gridKind: 'insights',
        columns: '3',
        items: [
          {
            badge: 'Cloud',
            title: 'Planning Low-Risk Cloud & Infrastructure Modernization',
            description:
              'How to sequence workload migrations, establish rollback readiness, and control ongoing cloud spend.',
            href: '/insights',
            ctaLabel: 'Read insights',
            order: 1,
          },
          {
            badge: 'AI & Automation',
            title: 'Designing Deterministic Guardrails Around AI Workflows',
            description:
              'Practical patterns for validation, human review, and clean system integration in business automation.',
            href: '/insights',
            ctaLabel: 'Read insights',
            order: 2,
          },
          {
            badge: 'Data & BI',
            title: 'From Fragmented Spreadsheets to Trusted Metrics',
            description:
              'Structuring schema validation and clear ownership before investing in executive dashboards.',
            href: '/insights',
            ctaLabel: 'Read insights',
            order: 3,
          },
        ],
        cta: {
          label: 'Visit Insights',
          url: '/insights',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'ivory',
        spacing: 'default',
        isVisible: true,
        sortOrder: 9,
      },
      {
        __component: 'sections.cta-banner',
        eyebrow: 'Start a Conversation',
        heading: 'Ready to Plan Your Next Initiative?',
        body: 'Request a tailored project quote or book a technical consultation to discuss cloud, AI automation, software, or data goals.',
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
        sortOrder: 10,
      },
    ],
  };

  if (currentRoot) {
    await pageService.update({
      documentId: currentRoot.documentId,
      status: 'published',
      data: homepagePayload,
    });
  } else {
    await pageService.create({
      status: 'published',
      data: homepagePayload,
    });
  }
}
