import type { Core } from '@strapi/strapi';
import { ensureSeedMediaAsset } from './media-helper';
import {
  ensurePublishedService,
  linkRelatedServices,
} from './service-seed-helper';

export async function seedDataAnalyticsServices(
  strapi: Core.Strapi
): Promise<void> {
  const dataEngImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-data-engineering.png',
    alternativeText:
      'Minimal Swiss architectural diagram showing clean data ingestion streams entering validated warehouse layers',
    caption: 'NAVOSYS Data Engineering Pipeline Visual',
  });
  const biImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-bi-visualization.png',
    alternativeText:
      'Flat architectural editorial graphic depicting analytical charts and executive reporting modules',
    caption: 'NAVOSYS BI & Visualization Visual',
  });

  const dataEngId = await ensurePublishedService(strapi, 'data-engineering', {
    title: 'Data Engineering',
    pillar: 'data-and-analytics',
    summary:
      'Dependable ETL/ELT pipelines, schema validation, PostgreSQL & analytical warehouses, and observable batch/event ingestion.',
    description:
      'Reliable analytics depends completely on clean upstream pipelines. Fragile CSV exports and undocumented SQL scripts create silent metric drift and distrust across leadership teams.\n\nNAVOSYS builds modular, idempotent ingestion pipelines with clear schema checks, lineage documentation, and automated data quality assertions.',
    featuredImage: dataEngImage?.id ?? null,
    featuredImageAlt:
      'Minimal Swiss architectural diagram showing clean data ingestion streams entering validated warehouse layers',
    capabilities: [
      {
        title: 'Idempotent ETL / ELT Ingestion',
        description:
          'Incremental sync from transactional databases, SaaS APIs, and event logs without duplicate rows.',
        order: 1,
      },
      {
        title: 'Dimensional Warehouse Modeling',
        description:
          'Clean staging, intermediate, and curated mart layers modeled explicitly for business queries.',
        order: 2,
      },
      {
        title: 'Automated Data Quality Checks',
        description:
          'Schema assertions, null/uniqueness tests, and freshness alerts before bad data reaches reports.',
        order: 3,
      },
    ],
    benefits: [
      {
        title: 'Trusted Numbers Across Teams',
        description: 'Version-controlled transformations enforce a single definition per metric.',
        order: 1,
      },
      {
        title: 'Recoverable Pipelines',
        description: 'Backfill-safe design lets historical ranges reprocess cleanly when rules change.',
        order: 2,
      },
    ],
    deliverables: [
      {
        title: 'Data Architecture & Lineage Map',
        description: 'Source inventory, warehouse layers, refresh cadence, and ownership matrix.',
        order: 1,
      },
      {
        title: 'Version-Controlled Transformation & QA Suite',
        description: 'Tested SQL/Python transformations and freshness alerting.',
        order: 2,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Audit',
        title: 'Source & Metric Mapping',
        description: 'Catalog authoritative systems, schemas, refresh windows, and governance rules.',
        order: 1,
      },
      {
        stepNumber: '02 · Model',
        title: 'Staging & Warehouse Layers',
        description: 'Structure clean reproducible transformations and primary/foreign keys.',
        order: 2,
      },
      {
        stepNumber: '03 · Verify',
        title: 'Quality Gates & Observability',
        description: 'Enforce schema/null assertions and notify owners cleanly on pipeline failures.',
        order: 3,
      },
    ],
    useCases: [
      {
        title: 'Multi-Source Operations Consolidation',
        description:
          'Unify ERP, billing, CRM, and fulfillment tables into one governed analytical store.',
        order: 1,
      },
    ],
    technologies: [
      { title: 'PostgreSQL / Analytical SQL', order: 1 },
      { title: 'Python & Typed Ingestion Workers', order: 2 },
      { title: 'SQL Modeling & Data Tests', order: 3 },
      { title: 'Incremental Sync Pipelines', order: 4 },
    ],
    faqs: [
      {
        question: 'Do we need a specialized cloud data warehouse on day one?',
        answer:
          'Not always. Many organizations achieve fast, cost-predictable analytics directly on tuned PostgreSQL read replicas or compact cloud warehouses until data volume genuinely requires distributed storage.',
        order: 1,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=data-engineering',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Book a Consultation',
      url: '/contact/book-consultation?service=data-engineering',
      variant: 'outline',
      isVisible: true,
    },
    order: 41,
    isFeatured: false,
    isIndexable: true,
    seo: {
      metaTitle: 'Data Engineering Services | NAVOSYS',
      metaDescription:
        'ETL/ELT pipelines, dimensional data modeling, and automated data quality checks for trustworthy analytics.',
      ogImage: dataEngImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  const biId = await ensurePublishedService(strapi, 'business-intelligence', {
    title: 'Business Intelligence',
    pillar: 'data-and-analytics',
    summary:
      'Consistent KPI semantics, curated analytical data marts, and self-service operational reporting backed by governed definitions.',
    description:
      'When Finance, Operations, and Sales arrive at meetings with three different totals for the same figure, reporting loses credibility.\n\nNAVOSYS bridges data pipelines and leadership decision-making by establishing shared metric definitions, role-appropriate access controls, and scheduled executive and departmental reporting.',
    featuredImage: biImage?.id ?? null,
    featuredImageAlt:
      'Flat architectural editorial graphic depicting analytical charts and executive reporting modules',
    capabilities: [
      {
        title: 'Semantic Metric & KPI Governance',
        description:
          'Define revenue, margin, backlog, SLA, and utilization metrics once in governed SQL models.',
        order: 1,
      },
      {
        title: 'Departmental & Executive Reporting Suites',
        description:
          'Structured operational views for Operations, Finance, Supply Chain, and Leadership.',
        order: 2,
      },
      {
        title: 'Role-Based Access & Export Controls',
        description:
          'Keep sensitive customer, payroll, or margin slices restricted cleanly by team permission.',
        order: 3,
      },
    ],
    benefits: [
      {
        title: 'Single Source of Operational Truth',
        description: 'Eliminate manual Friday spreadsheet stitching and conflicting team totals.',
        order: 1,
      },
      {
        title: 'Actionable Drill-Down Paths',
        description: 'Connect summary metrics directly down to underlying operational exceptions.',
        order: 2,
      },
    ],
    deliverables: [
      {
        title: 'KPI Glossary & Semantic Layer',
        description: 'Documented formulas, filters, grain definitions, and refresh cadence.',
        order: 1,
      },
      {
        title: 'Curated BI Datasets & Core Views',
        description: 'Fast query marts connected to lightweight governed dashboards.',
        order: 2,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Align',
        title: 'Metric & Decision Review',
        description: 'Clarify what decisions each report supports and standardize KPI definitions.',
        order: 1,
      },
      {
        stepNumber: '02 · Model',
        title: 'Curate Fast Reporting Marts',
        description: 'Optimize summary tables and row-level permissions prior to dashboard build.',
        order: 2,
      },
      {
        stepNumber: '03 · Enable',
        title: 'Launch, Validate & Hand Off',
        description: 'Reconcile totals against source systems and train team owners.',
        order: 3,
      },
    ],
    useCases: [
      {
        title: 'Executive Operations & Cash-Cycle Reporting',
        description:
          'Combine billing, backlog, and delivery milestones cleanly without manual spreadsheets.',
        order: 1,
      },
    ],
    technologies: [
      { title: 'SQL Data Marts', order: 1 },
      { title: 'PostgreSQL / Metabase / Open BI', order: 2 },
      { title: 'Row-Level Permissions', order: 3 },
    ],
    faqs: [
      {
        question: 'Can BI sit directly on our existing PostgreSQL or cloud tools?',
        answer:
          'Yes. We design clean semantic SQL views compatible with open-source or commercial BI tools your organization already licenses.',
        order: 1,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=business-intelligence',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Book a Consultation',
      url: '/contact/book-consultation?service=business-intelligence',
      variant: 'outline',
      isVisible: true,
    },
    order: 42,
    isFeatured: false,
    isIndexable: true,
    seo: {
      metaTitle: 'Business Intelligence Services | NAVOSYS',
      metaDescription:
        'Governed KPI definitions, curated analytical marts, and reliable executive & operational BI reporting.',
      ogImage: biImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  const dataVizId = await ensurePublishedService(strapi, 'data-visualization', {
    title: 'Data Visualization',
    pillar: 'data-and-analytics',
    summary:
      'Clear, accessible interactive dashboards and embedded analytical views engineered for fast comprehension rather than visual noise.',
    description:
      'Dashboards fail when overloaded with crowded gauges, low-contrast colors, and slow ad-hoc queries.\n\nNAVOSYS designs calm, crisp visual hierarchy—both inside dedicated BI tools and embedded directly inside custom web portals—so operators identify trends, bottlenecks, and outliers within seconds.',
    featuredImage: biImage?.id ?? null,
    featuredImageAlt:
      'Flat architectural editorial graphic depicting analytical charts and executive reporting modules',
    capabilities: [
      {
        title: 'Decision-Focused Visual Hierarchy',
        description:
          'Prioritize scannable comparisons, exception highlights, and accessible color palettes.',
        order: 1,
      },
      {
        title: 'Embedded Product Analytics Views',
        description:
          'Integrate lightweight SVG charts and filterable tables cleanly inside Next.js applications.',
        order: 2,
      },
      {
        title: 'Query Optimization & Pre-Aggregation',
        description:
          'Back interactive filters with indexed rollups so dashboards stay snappy as tables grow.',
        order: 3,
      },
    ],
    benefits: [
      {
        title: 'Fast Operator Comprehension',
        description: 'Clean typographic balance highlights what changed and what requires attention.',
        order: 1,
      },
      {
        title: 'Accessible Across Devices',
        description: 'Responsive layouts with colorblind-safe contrast and clear keyboard navigation.',
        order: 2,
      },
    ],
    deliverables: [
      {
        title: 'Dashboard Wireframes & Visual System',
        description: 'Standardized chart selection rules and threshold alert formatting.',
        order: 1,
      },
      {
        title: 'Production Dashboards or Embedded Views',
        description: 'Tested views backed by pre-aggregated SQL queries and responsive UI.',
        order: 2,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Structure',
        title: 'Audience & Question Mapping',
        description: 'Define exact operational questions each view must answer.',
        order: 1,
      },
      {
        stepNumber: '02 · Design',
        title: 'Layout & Chart Selection',
        description: 'Select clear bar/line/table formats instead of cluttered decorative widgets.',
        order: 2,
      },
      {
        stepNumber: '03 · Ship',
        title: 'Optimize & Validate Queries',
        description: 'Benchmark response times and verify figures against authoritative records.',
        order: 3,
      },
    ],
    useCases: [
      {
        title: 'Customer Portal & SLA Telemetry Views',
        description:
          'Embed clear multi-tenant usage, fulfillment, and SLA status views inside B2B portals.',
        order: 1,
      },
    ],
    technologies: [
      { title: 'PostgreSQL / Rollup Views', order: 1 },
      { title: 'Lightweight SVG & TypeScript Charts', order: 2 },
      { title: 'Accessible Responsive UI', order: 3 },
    ],
    faqs: [
      {
        question: 'Can analytics views be embedded right inside our customer-facing portal?',
        answer:
          'Yes. Using server-side tenant filtering and lightweight SVG/HTML visualization components, customer portals render crisp analytical views without third-party iframe friction.',
        order: 1,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=data-visualization',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Book a Consultation',
      url: '/contact/book-consultation?service=data-visualization',
      variant: 'outline',
      isVisible: true,
    },
    order: 43,
    isFeatured: false,
    isIndexable: true,
    seo: {
      metaTitle: 'Data Visualization Services | NAVOSYS',
      metaDescription:
        'Clean, accessible dashboards and embedded portal visualizations designed for operational clarity.',
      ogImage: biImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  const dataPillarId = await ensurePublishedService(
    strapi,
    'data-and-analytics',
    {
      title: 'Data & Analytics',
      pillar: 'data-and-analytics',
      summary:
        'Clean ETL/ELT data engineering pipelines, governed business intelligence modeling, and decision-ready visualization.',
      description:
        'Analytical confidence starts beneath the dashboard—with reliable source ingestion, reconciled definitions, and thoughtful visual design.\n\nNAVOSYS helps organizations eliminate spreadsheet bottlenecks and fragmented metrics by engineering clean pipelines, unified data marts, and crisp operational reporting tailored to how teams actually make decisions.',
      featuredImage: dataEngImage?.id ?? null,
      featuredImageAlt:
        'Minimal Swiss architectural diagram showing clean data ingestion streams entering validated warehouse layers',
      capabilities: [
        {
          title: 'Data Engineering Pipelines',
          description:
            'Idempotent ETL/ELT ingestion, schema assertions, and clean warehouse modeling.',
          href: '/services/data-engineering',
          ctaLabel: 'Explore Data Engineering',
          order: 1,
        },
        {
          title: 'Business Intelligence & KPI Governance',
          description:
            'Single-source semantic metrics and permissioned reporting across departments.',
          href: '/services/business-intelligence',
          ctaLabel: 'Explore Business Intelligence',
          order: 2,
        },
        {
          title: 'Data Visualization & Embedded Analytics',
          description:
            'Clear executive dashboards and lightweight in-app customer telemetry views.',
          href: '/services/data-visualization',
          ctaLabel: 'Explore Data Visualization',
          order: 3,
        },
      ],
      benefits: [
        {
          title: 'Consistent KPI Truth',
          description: 'Reconcile numbers across systems before building visual layers.',
          order: 1,
        },
        {
          title: 'Right-Sized Data Stack',
          description: 'Use pragmatic SQL and warehouse architecture aligned to actual data volume.',
          order: 2,
        },
        {
          title: 'Automated Quality Guards',
          description: 'Catch schema changes and stale feeds immediately instead of in board meetings.',
          order: 3,
        },
      ],
      deliverables: [
        {
          title: 'Data Lineage & KPI Dictionary',
          description: 'Documented source-to-metric formulas and refresh expectations.',
          order: 1,
        },
        {
          title: 'Production Pipelines & Curated Marts',
          description: 'Version-controlled ETL jobs, validation tests, and indexed reporting layers.',
          order: 2,
        },
        {
          title: 'Executive & Operational Dashboards',
          description: 'Accessible visual reporting views with reconciliation documentation.',
          order: 3,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Audit',
          title: 'Sources, Metrics & Pain Points',
          description: 'Identify spreadsheet bottlenecks, metric discrepancies, and data quality gaps.',
          order: 1,
        },
        {
          stepNumber: '02 · Engineer',
          title: 'Pipelines & Governed Models',
          description: 'Build repeatable ingestion, staging layers, and semantic KPI tables.',
          order: 2,
        },
        {
          stepNumber: '03 · Visualize',
          title: 'Clarity-First Reporting',
          description: 'Deliver responsive dashboards and reconcile every metric against source records.',
          order: 3,
        },
        {
          stepNumber: '04 · Sustain',
          title: 'Alerting & Schema Governance',
          description: 'Monitor freshness, query speed, and evolving reporting needs.',
          order: 4,
        },
      ],
      technologies: [
        { title: 'PostgreSQL & Analytical SQL', order: 1 },
        { title: 'Python Ingestion Workers', order: 2 },
        { title: 'BI & Semantic Modeling', order: 3 },
        { title: 'Embedded SVG Visualizations', order: 4 },
      ],
      faqs: [
        {
          question: 'Can we clean up our reporting without migrating everything to a new platform?',
          answer:
            'Yes. We routinely build clean staging and semantic SQL layers on existing databases and expose governed views to your current reporting tools.',
          order: 1,
        },
        {
          question: 'How do you handle messy or incomplete historical data?',
          answer:
            'We introduce explicit validation rules, quarantined exception records, and documented normalization steps rather than silently dropping edge-case rows.',
          order: 2,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=data-and-analytics',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=data-and-analytics',
        variant: 'outline',
        isVisible: true,
      },
      order: 40,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Data & Analytics Services | NAVOSYS',
        metaDescription:
          'Data engineering pipelines, business intelligence governance, and clarity-first data visualization.',
        ogImage: dataEngImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
      sections: [
        {
          __component: 'sections.card-grid',
          eyebrow: 'Specialized Data Practices',
          heading: 'Explore Data & Analytics Capabilities',
          intro:
            'Review how we turn raw operational data into dependable pipelines, governed KPIs, and clear visualizations.',
          gridKind: 'services',
          columns: '3',
          items: [
            {
              title: 'Data Engineering',
              description: 'Idempotent ETL/ELT pipelines, schema tests, and warehouse modeling.',
              href: '/services/data-engineering',
              ctaLabel: 'View Data Engineering',
              order: 1,
            },
            {
              title: 'Business Intelligence',
              description: 'Single-source metric governance and departmental reporting views.',
              href: '/services/business-intelligence',
              ctaLabel: 'View Business Intelligence',
              order: 2,
            },
            {
              title: 'Data Visualization',
              description: 'Clear interactive dashboards and embedded portal telemetry.',
              href: '/services/data-visualization',
              ctaLabel: 'View Data Visualization',
              order: 3,
            },
          ],
          surface: 'ivory',
          spacing: 'default',
          isVisible: true,
          sortOrder: 1,
        },
        {
          __component: 'sections.comparison-table',
          eyebrow: 'Architecture Guidance',
          heading: 'Operational Reporting vs. Full Warehouse Pipeline',
          primaryColumnLabel: 'Governed Operational BI',
          secondaryColumnLabel: 'Unified Multi-Source Warehouse',
          rows: [
            {
              feature: 'Data Sources',
              primaryValue: '1–2 core transactional databases with read-replica views',
              secondaryValue: 'ERP, CRM, billing, fulfillment, and external SaaS feeds',
              highlight: true,
              order: 1,
            },
            {
              feature: 'History & Snapshots',
              primaryValue: 'Current operational state & bounded trend windows',
              secondaryValue: 'Full historical SCD snapshots & cross-system reconciliation',
              order: 2,
            },
            {
              feature: 'Time to Value',
              primaryValue: 'Rapid initial KPI alignment and clean executive views',
              secondaryValue: 'Phased pipeline milestones with automated data quality tests',
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

  await linkRelatedServices(strapi, dataPillarId, [
    dataEngId,
    biId,
    dataVizId,
  ]);
  await linkRelatedServices(strapi, dataEngId, [
    biId,
    dataVizId,
    dataPillarId,
  ]);
  await linkRelatedServices(strapi, biId, [
    dataEngId,
    dataVizId,
    dataPillarId,
  ]);
  await linkRelatedServices(strapi, dataVizId, [
    biId,
    dataEngId,
    dataPillarId,
  ]);
}
