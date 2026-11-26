import type { Core } from '@strapi/strapi';
import { ensureSeedMediaAsset } from './media-helper';
import {
  ensurePublishedService,
  linkRelatedServices,
} from './service-seed-helper';

export async function seedSoftwareEngineeringServices(
  strapi: Core.Strapi
): Promise<void> {
  const engImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-software-engineering.png',
    alternativeText:
      'Minimal architectural blueprint showing layered web, mobile, and modular API software components',
    caption: 'NAVOSYS Software Engineering Architecture Visual',
  });
  const modImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-application-modernization.png',
    alternativeText:
      'Editorial geometric illustration of incremental monolith-to-modular software modernization',
    caption: 'NAVOSYS Application Modernization Visual',
  });

  const webDevId = await ensurePublishedService(strapi, 'web-development', {
    title: 'Web Development',
    pillar: 'software-engineering',
    summary:
      'Server-first, accessible web applications and customer portals built with strict TypeScript, semantic HTML, and predictable performance.',
    description:
      'Modern web platforms serve as critical operational software—not brochureware. They must load quickly, protect user sessions, meet WCAG accessibility expectations, and integrate cleanly with backend APIs and CMS workflows.\n\nNAVOSYS builds lean web applications using Next.js, React, TypeScript, and PostgreSQL without heavy client-bundle bloat.',
    featuredImage: engImage?.id ?? null,
    featuredImageAlt:
      'Minimal architectural blueprint showing layered web, mobile, and modular API software components',
    capabilities: [
      {
        title: 'App Router & Server-First Architecture',
        description:
          'Render public and authenticated views with crisp Core Web Vitals, clean caching, and SEO readiness.',
        order: 1,
      },
      {
        title: 'Accessible Design System & Forms',
        description:
          'Keyboard navigation, clean contrast ratios, server validation, and structured CMS editing.',
        order: 2,
      },
      {
        title: 'API & CMS Integration Layers',
        description:
          'Strict boundary normalization between frontend components and external APIs or headless CMS schemas.',
        order: 3,
      },
    ],
    benefits: [
      {
        title: 'Maintainable Frontend Codebases',
        description: 'Typed contracts, component tests, and clean lint gates prevent UI regressions.',
        order: 1,
      },
      {
        title: 'Fast Page Loads',
        description: 'Minimal client JavaScript keeps initial rendering crisp across mobile and desktop connections.',
        order: 2,
      },
    ],
    deliverables: [
      {
        title: 'Production Web Application & UI Library',
        description: 'Responsive, WCAG-checked components backed by TypeScript and unit/integration tests.',
        order: 1,
      },
      {
        title: 'Deployment & Monitoring Baseline',
        description: 'Automated lint/type/test/build pipeline, caching rules, and error boundaries.',
        order: 2,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Structure',
        title: 'Information & API Modeling',
        description: 'Define routes, state boundaries, auth rules, and content contracts.',
        order: 1,
      },
      {
        stepNumber: '02 · Build',
        title: 'Component & Backend Delivery',
        description: 'Implement modular views with automated accessibility and contract verification.',
        order: 2,
      },
      {
        stepNumber: '03 · Harden',
        title: 'Performance, Security & Launch',
        description: 'Audit headers, bundle weights, Core Web Vitals, and production cutover.',
        order: 3,
      },
    ],
    technologies: [
      { title: 'Next.js & React', order: 1 },
      { title: 'TypeScript', order: 2 },
      { title: 'Tailwind CSS', order: 3 },
      { title: 'Vitest & Testing Library', order: 4 },
    ],
    faqs: [
      {
        question: 'Do you build custom designs or work with headless CMS backends?',
        answer:
          'Both. We design lightweight bespoke design systems paired cleanly with Strapi or structured backend APIs so content and engineering teams operate independently.',
        order: 1,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=web-development',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Book a Consultation',
      url: '/contact/book-consultation?service=web-development',
      variant: 'outline',
      isVisible: true,
    },
    order: 31,
    isFeatured: false,
    isIndexable: true,
    seo: {
      metaTitle: 'Web Development Services | NAVOSYS',
      metaDescription:
        'Accessible, server-first TypeScript web applications and portals built for performance and maintainability.',
      ogImage: engImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  const mobileDevId = await ensurePublishedService(
    strapi,
    'mobile-app-development',
    {
      title: 'Mobile App Development',
      pillar: 'software-engineering',
      summary:
        'Cross-platform iOS and Android field, customer, and internal workflow applications backed by resilient offline-tolerant APIs.',
      description:
        'Effective mobile software focuses on fast cold starts, reliable connectivity recovery, secure token storage, and clear task flows—not unnecessary native complexity.\n\nNAVOSYS delivers cross-platform mobile applications alongside their supporting APIs and admin consoles as a single cohesive system.',
      featuredImage: engImage?.id ?? null,
      featuredImageAlt:
        'Minimal architectural blueprint showing layered web, mobile, and modular API software components',
      capabilities: [
        {
          title: 'Cross-Platform Client Engineering',
          description:
            'Shared React Native / TypeScript foundations tailored cleanly for iOS and Android conventions.',
          order: 1,
        },
        {
          title: 'Offline Queues & Conflict-Safe Sync',
          description:
            'Keep field service, inspection, and dispatch workflows functioning gracefully across weak mobile networks.',
          order: 2,
        },
        {
          title: 'End-to-End API & Admin Companion',
          description:
            'Build authenticated REST/GraphQL backends, push workflows, and web ops consoles together.',
          order: 3,
        },
      ],
      benefits: [
        {
          title: 'Single Cohesive Engineering Team',
          description: 'Aligned data schemas across mobile client, backend APIs, and operations portal.',
          order: 1,
        },
        {
          title: 'Pragmatic Release Discipline',
          description: 'Automated build signing, versioned API compatibility, and staged store rollouts.',
          order: 2,
        },
      ],
      deliverables: [
        {
          title: 'iOS & Android Application Builds',
          description: 'Typed mobile client configured for automated CI builds and store submission.',
          order: 1,
        },
        {
          title: 'Backend API & Release Runbook',
          description: 'Documented API versioning, push handling, and release checklist.',
          order: 2,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Design',
          title: 'Mobile Flow & Offline Boundaries',
          description: 'Map screen states, auth sessions, local storage, and sync retries.',
          order: 1,
        },
        {
          stepNumber: '02 · Engineer',
          title: 'Build Mobile & Backend Together',
          description: 'Develop shared typed contracts and verify on real physical devices.',
          order: 2,
        },
        {
          stepNumber: '03 · Release',
          title: 'Store Packaging & Telemetry',
          description: 'Prepare store metadata, crash reporting, and staged rollout channels.',
          order: 3,
        },
      ],
      technologies: [
        { title: 'React Native / TypeScript', order: 1 },
        { title: 'REST & Node.js APIs', order: 2 },
        { title: 'Secure Keychain / Token Auth', order: 3 },
      ],
      faqs: [
        {
          question: 'When do you recommend cross-platform mobile vs. responsive web?',
          answer:
            'We recommend responsive web first when offline capability, hardware sensors, or app-store distribution are unnecessary, reserving native/cross-platform mobile strictly where field workflows or mobile UX justify the extra lifecycle cost.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=mobile-app-development',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=mobile-app-development',
        variant: 'outline',
        isVisible: true,
      },
      order: 32,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Mobile App Development | NAVOSYS',
        metaDescription:
          'Cross-platform iOS and Android applications integrated cleanly with backend APIs and operational workflows.',
        ogImage: engImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const enterpriseAppsId = await ensurePublishedService(
    strapi,
    'enterprise-applications',
    {
      title: 'Enterprise Applications',
      pillar: 'software-engineering',
      summary:
        'Bespoke internal platforms, B2B portals, and multi-tenant core systems designed for role-based security, auditability, and scale.',
      description:
        'Off-the-shelf SaaS rarely covers core operational differentiators cleanly once spreadsheets, custom pricing rules, and multi-system approvals accumulate.\n\nNAVOSYS builds structured enterprise platforms centered on clean relational data models, explicit authorization boundaries, audit logs, and dependable ERP/CRM integrations.',
      featuredImage: modImage?.id ?? null,
      featuredImageAlt:
        'Editorial geometric illustration of incremental monolith-to-modular software modernization',
      capabilities: [
        {
          title: 'Domain Data Modeling & PostgreSQL',
          description:
            'Normalized schemas, transactional guarantees, migration discipline, and full audit history.',
          order: 1,
        },
        {
          title: 'RBAC & Organization Multi-Tenancy',
          description:
            'Fine-grained roles, tenant isolation, SSO integration, and least-privilege API guards.',
          order: 2,
        },
        {
          title: 'ERP, Billing & Webhook Integrations',
          description:
            'Resilient adapters synchronizing external accounting, inventory, and identity systems.',
          order: 3,
        },
      ],
      benefits: [
        {
          title: 'Fits Your Real Operations',
          description: 'Eliminate brittle spreadsheet workarounds without bloated unused enterprise suites.',
          order: 1,
        },
        {
          title: 'Auditable & Extensible',
          description: 'Explicit ownership, automated test suites, and documented API boundaries.',
          order: 2,
        },
      ],
      deliverables: [
        {
          title: 'Domain Architecture & ERD',
          description: 'Verified schema design, permission matrix, and integration sequence specs.',
          order: 1,
        },
        {
          title: 'Production Portal & APIs',
          description: 'Tested web console, API services, background workers, and database migrations.',
          order: 2,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Model',
          title: 'Domain & Workflow Discovery',
          description: 'Map entities, approval rules, roles, and integration points.',
          order: 1,
        },
        {
          stepNumber: '02 · Architect',
          title: 'Core Schema & Service Boundaries',
          description: 'Establish database design, auth model, and CI verification suites.',
          order: 2,
        },
        {
          stepNumber: '03 · Deliver',
          title: 'Iterative Rollout by Module',
          description: 'Ship highest-impact workflows first with parallel validation.',
          order: 3,
        },
      ],
      technologies: [
        { title: 'TypeScript & Next.js', order: 1 },
        { title: 'PostgreSQL', order: 2 },
        { title: 'Node.js / Strapi / REST', order: 3 },
        { title: 'Docker', order: 4 },
      ],
      faqs: [
        {
          question: 'Who owns the source code and architecture artifacts?',
          answer:
            'Your organization retains full ownership of source repositories, schemas, Infrastructure-as-Code, and runbooks upon delivery.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=enterprise-applications',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=enterprise-applications',
        variant: 'outline',
        isVisible: true,
      },
      order: 33,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Enterprise Applications | NAVOSYS',
        metaDescription:
          'Custom enterprise platforms, B2B portals, and operational software built on PostgreSQL and TypeScript.',
        ogImage: modImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const maintenanceId = await ensurePublishedService(
    strapi,
    'software-maintenance-and-support',
    {
      title: 'Software Maintenance & Support',
      pillar: 'software-engineering',
      summary:
        'Steady dependency upgrades, bug triage, security patching, test coverage hardening, and long-term codebase stewardship.',
      description:
        'Business software decays quickly when frameworks age out of security support and original institutional knowledge fades.\n\nNAVOSYS provides structured maintenance retainers covering dependency hygiene, root-cause bug resolution, regression test expansion, and controlled minor enhancements—without reckless rewrites.',
      featuredImage: modImage?.id ?? null,
      featuredImageAlt:
        'Editorial geometric illustration of incremental monolith-to-modular software modernization',
      capabilities: [
        {
          title: 'Security & Dependency Lifecycle',
          description:
            'Keep runtime LTS versions, package dependencies, and TLS/auth libraries current.',
          order: 1,
        },
        {
          title: 'Root-Cause Triage & Regression Tests',
          description:
            'Reproduce production issues cleanly and lock in automated tests for every fix.',
          order: 2,
        },
        {
          title: 'Predictable Enhancement Cadence',
          description:
            'Deliver scoped feature refinements and performance tuning in transparent sprints.',
          order: 3,
        },
      ],
      benefits: [
        {
          title: 'Fewer Surprise Outages',
          description: 'Proactive patching and telemetry prevent minor bugs from compounding.',
          order: 1,
        },
        {
          title: 'Protected Engineering Capacity',
          description: 'Free internal teams from legacy upkeep while keeping codebases release-ready.',
          order: 2,
        },
      ],
      deliverables: [
        {
          title: 'Codebase Health & Dependency Audit',
          description: 'Prioritized technical backlog covering CVE exposure, test gaps, and bottlenecks.',
          order: 1,
        },
        {
          title: 'Monthly Changelog & Release Verification',
          description: 'Tracked upgrades, automated check reports, and documented fixes.',
          order: 2,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Baseline',
          title: 'Repository & Environment Onboarding',
          description: 'Verify local/staging builds, CI checks, backups, and secret hygiene.',
          order: 1,
        },
        {
          stepNumber: '02 · Stabilize',
          title: 'High-Priority Fixes & Test Guardrails',
          description: 'Address urgent defects, flaky tests, and overdue runtime updates.',
          order: 2,
        },
        {
          stepNumber: '03 · Sustain',
          title: 'Ongoing Patching & Enhancements',
          description: 'Execute scheduled upgrades and agreed roadmap improvements.',
          order: 3,
        },
      ],
      technologies: [
        { title: 'TypeScript / JavaScript', order: 1 },
        { title: 'PostgreSQL', order: 2 },
        { title: 'CI/CD Quality Gates', order: 3 },
      ],
      faqs: [
        {
          question: 'Can you take over support for an application built by another vendor?',
          answer:
            'Yes. We begin with a brief repository, build, database, and hosting review to document any missing credentials, build steps, or technical risks before taking operational ownership.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=software-maintenance-and-support',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=software-maintenance-and-support',
        variant: 'outline',
        isVisible: true,
      },
      order: 34,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Software Maintenance & Support | NAVOSYS',
        metaDescription:
          'Long-term software maintenance, dependency patching, bug triage, and codebase stabilization.',
        ogImage: modImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const appModId = await ensurePublishedService(
    strapi,
    'application-modernization',
    {
      title: 'Application Modernization',
      pillar: 'software-engineering',
      summary:
        'Incremental refactoring, API decoupling, database cleanup, and UI upgrades transforming aging applications without risky big-bang rewrites.',
      description:
        'Wholesale platform rewrites frequently stall under shifting business priorities and undocumented edge cases.\n\nNAVOSYS modernizes live applications step by step using strangler routing, contract tests, schema cleanup, and modular UI replacements so users see continuous improvements without operational blackout.',
      featuredImage: modImage?.id ?? null,
      featuredImageAlt:
        'Editorial geometric illustration of incremental monolith-to-modular software modernization',
      capabilities: [
        {
          title: 'Strangler-Fig Incremental Replacement',
          description:
            'Route selected modules or endpoints to modernized services while keeping core traffic stable.',
          order: 1,
        },
        {
          title: 'API & Database Boundary Decoupling',
          description:
            'Separate UI presentation cleanly from legacy database couplings and introduce migration scripts.',
          order: 2,
        },
        {
          title: 'Automated Contract & Regression Coverage',
          description:
            'Capture existing business behavior in test suites prior to refactoring internals.',
          order: 3,
        },
      ],
      benefits: [
        {
          title: 'Continuous Business Continuity',
          description: 'Deliver measurable upgrades every milestone instead of waiting months for a risky cutover.',
          order: 1,
        },
        {
          title: 'Reduced Onboarding & Change Friction',
          description: 'Clear module boundaries and TypeScript contracts restore developer velocity.',
          order: 2,
        },
      ],
      deliverables: [
        {
          title: 'Modernization Roadmap & Strangler Plan',
          description: 'Component inventory, sequencing order, and data coexistence strategy.',
          order: 1,
        },
        {
          title: 'Modernized Modules & Decommission Checklist',
          description: 'Tested new modules, parallel sync scripts, and legacy retirement steps.',
          order: 2,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Inspect',
          title: 'Coupling & Risk Mapping',
          description: 'Identify brittle hotspots, undocumented business rules, and shared database tables.',
          order: 1,
        },
        {
          stepNumber: '02 · Wrap',
          title: 'Contract Tests & Routing Layer',
          description: 'Establish characterization tests and safe traffic routing boundaries.',
          order: 2,
        },
        {
          stepNumber: '03 · Refactor',
          title: 'Migrate Module by Module',
          description: 'Verify parity cleanly and retire legacy code paths sequentially.',
          order: 3,
        },
      ],
      technologies: [
        { title: 'Next.js & TypeScript', order: 1 },
        { title: 'PostgreSQL', order: 2 },
        { title: 'REST / Reverse Proxy Routing', order: 3 },
        { title: 'Docker', order: 4 },
      ],
      faqs: [
        {
          question: 'Should we rewrite from scratch or modernize incrementally?',
          answer:
            'Unless a legacy system is tiny or completely broken, incremental modernization lowers schedule and operational risk significantly by preserving working business rules while replacing bottlenecks step by step.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=application-modernization',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=application-modernization',
        variant: 'outline',
        isVisible: true,
      },
      order: 35,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Application Modernization Services | NAVOSYS',
        metaDescription:
          'Incremental refactoring, API decoupling, and UI upgrades that modernize aging software safely.',
        ogImage: modImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const softwarePillarId = await ensurePublishedService(
    strapi,
    'software-engineering',
    {
      title: 'Software Engineering',
      pillar: 'software-engineering',
      summary:
        'Maintainable web platforms, cross-platform mobile apps, custom enterprise applications, ongoing software support, and incremental modernization.',
      description:
        'Dependable software stems from disciplined engineering choices: simple domain models, clear API boundaries, accessible user interfaces, and automated verification.\n\nNAVOSYS builds new custom platforms and stabilizes or modernizes mission-critical legacy codebases so your teams gain predictable velocity without accruing fragile technical debt.',
      featuredImage: engImage?.id ?? null,
      featuredImageAlt:
        'Minimal architectural blueprint showing layered web, mobile, and modular API software components',
      capabilities: [
        {
          title: 'Web & Mobile Product Delivery',
          description:
            'Server-first Next.js portals and cross-platform mobile apps built with TypeScript.',
          href: '/services/web-development',
          ctaLabel: 'Explore Web Development',
          order: 1,
        },
        {
          title: 'Custom Enterprise Systems',
          description:
            'Multi-tenant workflows, RBAC, PostgreSQL foundations, and ERP/CRM API bridges.',
          href: '/services/enterprise-applications',
          ctaLabel: 'Explore Enterprise Apps',
          order: 2,
        },
        {
          title: 'Modernization & Long-Term Stewardship',
          description:
            'Incremental refactoring and structured patching that keep core software healthy.',
          href: '/services/application-modernization',
          ctaLabel: 'Explore Modernization',
          order: 3,
        },
      ],
      benefits: [
        {
          title: 'Strict Engineering Hygiene',
          description: 'Linting, TypeScript strictness, unit/component tests, and clean code review.',
          order: 1,
        },
        {
          title: 'Zero Unnecessary Lock-In',
          description: 'Open-standard frameworks and clean repositories your team can own directly.',
          order: 2,
        },
        {
          title: 'Security & Accessibility Included',
          description: 'Server-side authorization checks, safe validation, and keyboard/screen-reader usability.',
          order: 3,
        },
      ],
      deliverables: [
        {
          title: 'Architecture Blueprint & Schema Design',
          description: 'Documented data models, API contracts, and UI component structure.',
          order: 1,
        },
        {
          title: 'Tested Application Repositories',
          description: 'Clean Git history, automated verification scripts, and reproducible builds.',
          order: 2,
        },
        {
          title: 'Operations & Handoff Documentation',
          description: 'Deployment runbooks, env templates, and maintenance guidelines.',
          order: 3,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Discover',
          title: 'Scope, Constraints & Architecture',
          description: 'Clarify user roles, data boundaries, and critical non-functional requirements.',
          order: 1,
        },
        {
          stepNumber: '02 · Build',
          title: 'Iterative Typed Delivery',
          description: 'Ship verified vertical slices backed by tests and clean UI.',
          order: 2,
        },
        {
          stepNumber: '03 · Harden',
          title: 'Security, Performance & QA',
          description: 'Verify production readiness, accessibility, and automated release pipelines.',
          order: 3,
        },
        {
          stepNumber: '04 · Sustain',
          title: 'Operate & Evolve',
          description: 'Transition smoothly into internal ownership or scheduled maintenance.',
          order: 4,
        },
      ],
      technologies: [
        { title: 'TypeScript', order: 1 },
        { title: 'Next.js & React', order: 2 },
        { title: 'Node.js & PostgreSQL', order: 3 },
        { title: 'Docker & CI/CD', order: 4 },
      ],
      faqs: [
        {
          question: 'Do you work alongside existing in-house software teams?',
          answer:
            'Yes. We regularly co-deliver modules cleanly with internal product owners, frontend/backend engineers, and DevOps teams using shared Git workflows.',
          order: 1,
        },
        {
          question: 'How do you maintain quality on fixed-scope vs. ongoing builds?',
          answer:
            'Every pull request passes automated linting, strict TypeScript compilation, unit/integration tests, and production build checks before deployment.',
          order: 2,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=software-engineering',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=software-engineering',
        variant: 'outline',
        isVisible: true,
      },
      order: 30,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Software Engineering Services | NAVOSYS',
        metaDescription:
          'Web platforms, mobile apps, enterprise applications, maintenance, and incremental application modernization.',
        ogImage: engImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
      sections: [
        {
          __component: 'sections.card-grid',
          eyebrow: 'Specialized Software Practices',
          heading: 'Explore Software Engineering Services',
          intro:
            'Review our five focused software delivery offerings tailored to custom builds and evolving legacy systems.',
          gridKind: 'services',
          columns: '3',
          items: [
            {
              title: 'Web Development',
              description: 'Server-first, accessible web platforms built cleanly with Next.js & TypeScript.',
              href: '/services/web-development',
              ctaLabel: 'View Web Development',
              order: 1,
            },
            {
              title: 'Mobile App Development',
              description: 'Cross-platform iOS & Android apps engineered alongside resilient backends.',
              href: '/services/mobile-app-development',
              ctaLabel: 'View Mobile Apps',
              order: 2,
            },
            {
              title: 'Enterprise Applications',
              description: 'Role-based internal tools, portals, and transactional core systems.',
              href: '/services/enterprise-applications',
              ctaLabel: 'View Enterprise Apps',
              order: 3,
            },
            {
              title: 'Software Maintenance & Support',
              description: 'Structured patching, bug triage, test coverage, and steady evolution.',
              href: '/services/software-maintenance-and-support',
              ctaLabel: 'View Maintenance',
              order: 4,
            },
            {
              title: 'Application Modernization',
              description: 'Incremental strangler refactoring and architectural cleanup.',
              href: '/services/application-modernization',
              ctaLabel: 'View Modernization',
              order: 5,
            },
          ],
          surface: 'ivory',
          spacing: 'default',
          isVisible: true,
          sortOrder: 1,
        },
        {
          __component: 'sections.comparison-table',
          eyebrow: 'Build vs. Evolve Guidance',
          heading: 'Custom Application Build vs. Incremental Modernization',
          primaryColumnLabel: 'New Custom Platform',
          secondaryColumnLabel: 'Incremental Modernization',
          rows: [
            {
              feature: 'Best Starting Scenario',
              primaryValue: 'Greenfield workflows or replacing fragmented spreadsheets',
              secondaryValue: 'Working core product held back by brittle legacy modules',
              highlight: true,
              order: 1,
            },
            {
              feature: 'Delivery Pattern',
              primaryValue: 'Clean domain schema & modern UI shipped in vertical milestones',
              secondaryValue: 'Strangler routing, contract tests, and module-by-module upgrades',
              order: 2,
            },
            {
              feature: 'Operational Risk',
              primaryValue: 'Managed via staged pilot rollout before full adoption',
              secondaryValue: 'Minimal disruption to active daily operations',
              order: 3,
            },
          ],
          surface: 'sand',
          spacing: 'default',
          isVisible: true,
          sortOrder: 2,
        },
      ],
    }
  );

  await linkRelatedServices(strapi, softwarePillarId, [
    webDevId,
    mobileDevId,
    enterpriseAppsId,
    maintenanceId,
    appModId,
  ]);
  await linkRelatedServices(strapi, webDevId, [
    enterpriseAppsId,
    mobileDevId,
    softwarePillarId,
  ]);
  await linkRelatedServices(strapi, mobileDevId, [
    webDevId,
    enterpriseAppsId,
    softwarePillarId,
  ]);
  await linkRelatedServices(strapi, enterpriseAppsId, [
    webDevId,
    appModId,
    maintenanceId,
  ]);
  await linkRelatedServices(strapi, maintenanceId, [
    appModId,
    enterpriseAppsId,
    softwarePillarId,
  ]);
  await linkRelatedServices(strapi, appModId, [
    maintenanceId,
    enterpriseAppsId,
    softwarePillarId,
  ]);
}
