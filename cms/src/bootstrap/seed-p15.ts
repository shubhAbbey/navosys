import type { Core } from '@strapi/strapi';
import {
  ensurePublicReadPermissions,
  ensurePublishedCollectionEntry,
  ensurePublishedPageEntry,
  ensurePublishedRelationField,
  findPublishedIdsBySlugs,
} from './collection-seed-helper';
import { ensureSeedMediaAsset } from './media-helper';

const PUBLIC_CASE_STUDY_ACTIONS = [
  'api::case-study.case-study.find',
  'api::case-study.case-study.findOne',
] as const;

export async function seedCaseStudies(strapi: Core.Strapi): Promise<void> {
  await ensurePublicReadPermissions(strapi, PUBLIC_CASE_STUDY_ACTIONS);

  const caseStudyImg = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'case-studies'],
    fileName: 'navosys-case-study-architecture.png',
    alternativeText:
      'Editorial geometric schematic illustrating enterprise system architecture blueprints',
    caption: 'NAVOSYS Reference Architecture Study Visual',
  });
  const cloudImg = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-cloud-architecture.png',
    alternativeText:
      'Minimal geometric illustration of hybrid cloud architecture and interconnected infrastructure nodes',
    caption: 'NAVOSYS Cloud Migration Architecture Visual',
  });
  const workflowImg = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-workflow-orchestration.png',
    alternativeText:
      'Architectural illustration of automated business process steps and human-reviewed workflow gates',
    caption: 'NAVOSYS Governed Workflow Visual',
  });

  await ensurePublishedPageEntry(strapi, '/case-studies', {
    title: 'Case Studies & Reference Architectures',
    slug: 'case-studies',
    pageType: 'case_studies_overview',
    summary:
      'Reference implementation blueprints illustrating how NAVOSYS decomposes complex cloud, AI automation, software, and data challenges.',
    showBreadcrumbs: true,
    isIndexable: true,
    seo: {
      metaTitle: 'Case Studies & Reference Architectures | NAVOSYS',
      metaDescription:
        'Explore NAVOSYS reference architecture case studies demonstrating structured challenge-to-solution engineering across cloud, AI, software, and data.',
      noIndex: false,
      noFollow: false,
      structuredDataType: 'CollectionPage',
    },
    sections: [
      {
        __component: 'sections.hero',
        eyebrow: 'Portfolio & Reference Blueprints',
        heading: 'How Complex Systems Are Designed & Delivered',
        subheading:
          'Each entry below is clearly labelled as a Conceptual Reference Architecture unless representing an explicitly verified client engagement—never fabricated results or invented testimonials.',
        alignment: 'left',
        primaryCta: {
          label: 'Book a Consultation',
          url: '/contact/book-consultation',
          variant: 'primary',
          isVisible: true,
        },
        secondaryCta: {
          label: 'Explore Our Approach',
          url: '/approach',
          variant: 'outline',
          isVisible: true,
        },
        surface: 'ivory',
        spacing: 'default',
        isVisible: true,
        sortOrder: 1,
      },
      {
        __component: 'sections.cta-banner',
        eyebrow: 'Discuss Your Architecture',
        heading: 'Looking for a Blueprint Tailored to Your Constraints?',
        body: 'Share your infrastructure, workflow bottlenecks, or modernization goals for a grounded technical review.',
        variant: 'footer_cta',
        primaryCta: {
          label: 'Get a Quote',
          url: '/contact/get-quote',
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
        sortOrder: 99,
      },
    ],
  });

  const csCloudId = await ensurePublishedCollectionEntry(
    strapi,
    'api::case-study.case-study',
    '/case-studies',
    'multi-region-cloud-migration-blueprint',
    {
      title: 'Cloud Migration & IaC Cutover Blueprint',
      isConceptual: true,
      categoryLabel: 'Cloud & DevOps',
      engagementType: 'Conceptual Reference Architecture',
      summary:
        'Reference wave-migration and Terraform landing-zone blueprint moving tightly coupled legacy virtual machines into repeatable containerized infrastructure.',
      challenge:
        'Organizations running monolithic services on manually configured hosts struggle with unrepeatable staging setups, risky overnight cutovers, and unclear rollback steps whenever production releases fail.',
      solution:
        'We model a staged landing-zone foundation via Infrastructure-as-Code, containerize stateless application tiers alongside managed PostgreSQL backups, and sequence database replication and DNS cutover in rehearsed low-risk waves.',
      approach:
        'Executed across four structured stages: dependency inventory & latency mapping, isolated VPC & IAM landing zone provisioning, shadow-traffic staging validation, and documented blue/green cutover runbooks.',
      featuredImage: cloudImg?.id ?? null,
      featuredImageAlt:
        'Minimal geometric illustration of hybrid cloud architecture and interconnected infrastructure nodes',
      architectureHighlights: [
        {
          title: 'Versioned IaC Landing Zone',
          description: 'Network segmentation, private DB subnets, and least-privilege roles codified cleanly.',
          order: 1,
        },
        {
          title: 'Rehearsed Rollback Runbooks',
          description: 'Pre-validated database replication checkpoints and rapid DNS fallback procedures.',
          order: 2,
        },
        {
          title: 'Automated Verification Gates',
          description: 'Health checks, build smoke tests, and centralized structured logging prior to traffic shift.',
          order: 3,
        },
      ],
      outcomes: [
        {
          title: 'Eliminates Snowflake Servers',
          description: 'Environments reproduce consistently across staging and production without console drift.',
          order: 1,
        },
        {
          title: 'Bounded Cutover Risk',
          description: 'Wave sequencing decouples stateful databases from application tier upgrades.',
          order: 2,
        },
      ],
      technologies: [
        { title: 'Terraform / IaC', order: 1 },
        { title: 'Docker & Reverse Proxy', order: 2 },
        { title: 'PostgreSQL', order: 3 },
        { title: 'CI/CD Pipelines', order: 4 },
      ],
      primaryCta: {
        label: 'Request Cloud Assessment',
        url: '/contact/request-assessment?assessment=cloud-readiness',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?caseStudy=multi-region-cloud-migration-blueprint',
        variant: 'outline',
        isVisible: true,
      },
      order: 1,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Cloud Migration & IaC Blueprint (Conceptual Case Study) | NAVOSYS',
        metaDescription:
          'Conceptual reference architecture illustrating wave-based cloud migration, IaC landing zones, and verified rollback design.',
        ogImage: cloudImg?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const csAiId = await ensurePublishedCollectionEntry(
    strapi,
    'api::case-study.case-study',
    '/case-studies',
    'governed-document-triage-automation',
    {
      title: 'Human-Supervised AI Document Triage Workflow',
      isConceptual: true,
      categoryLabel: 'AI & Automation',
      engagementType: 'Conceptual Reference Architecture',
      summary:
        'Reference workflow architecture combining deterministic validation queues with bounded AI extraction and mandatory human review for unstructured operational packets.',
      challenge:
        'Operations teams spend hours manually reading emailed PDFs, extracting reference IDs, checking mandatory compliance fields, and re-keying records across ticketing and ERP systems—while unguarded AI auto-writes risk silent data errors.',
      solution:
        'We separate deterministic routing (idempotent webhook queues, schema validation, deduplication) from model-assisted document extraction, routing low-confidence or exception fields into a fast operator review UI before ERP commit.',
      approach:
        'Built with explicit JSON schema contracts, citation highlighting back to source page snippets, automated regression evaluations on edge-case documents, and immutable review audit trails.',
      featuredImage: workflowImg?.id ?? null,
      featuredImageAlt:
        'Architectural illustration of automated business process steps and human-reviewed workflow gates',
      architectureHighlights: [
        {
          title: 'Deterministic Core + Bounded AI Step',
          description: 'Models only classify and extract unstructured text; strict schemas gate downstream state changes.',
          order: 1,
        },
        {
          title: 'Source-Linked Review Queue',
          description: 'Reviewers inspect extracted fields side-by-side with source snippets before approval.',
          order: 2,
        },
        {
          title: 'Token & Retry Observability',
          description: 'Dead-letter recovery and per-workflow inference telemetry built in from day one.',
          order: 3,
        },
      ],
      outcomes: [
        {
          title: 'Zero Unreviewed System Writes',
          description: 'Transactional ERP and ledger entries remain protected behind explicit approval or deterministic validation.',
          order: 1,
        },
        {
          title: 'Clear Exception Visibility',
          description: 'Malformed packets surface cleanly to owners instead of getting buried in shared inboxes.',
          order: 2,
        },
      ],
      technologies: [
        { title: 'TypeScript & Queue Workers', order: 1 },
        { title: 'JSON Schema Validation', order: 2 },
        { title: 'PostgreSQL Audit Logs', order: 3 },
        { title: 'Structured Model Gateway', order: 4 },
      ],
      primaryCta: {
        label: 'Book AI Consultation',
        url: '/contact/book-consultation?service=ai-and-automation',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?caseStudy=governed-document-triage-automation',
        variant: 'outline',
        isVisible: true,
      },
      order: 2,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Human-Supervised Document Triage (Conceptual Case Study) | NAVOSYS',
        metaDescription:
          'Conceptual reference architecture for combining deterministic process automation with bounded AI extraction and human review.',
        ogImage: workflowImg?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const csPlatformId = await ensurePublishedCollectionEntry(
    strapi,
    'api::case-study.case-study',
    '/case-studies',
    'unified-operations-platform-and-bi',
    {
      title: 'Modernized Order Platform & Operational BI Pipeline',
      isConceptual: true,
      categoryLabel: 'Software & Data',
      engagementType: 'Conceptual Reference Architecture',
      summary:
        'Reference blueprint uniting incremental strangler application modernization with governed PostgreSQL data marts for real-time order and inventory clarity.',
      challenge:
        'Growing mid-market operators often run on brittle legacy portals paired with Friday CSV exports stitched manually across order, warehouse, and billing spreadsheets—making live backlog visibility difficult.',
      solution:
        'We deploy a strangler reverse proxy introducing a Next.js + TypeScript operational portal module-by-module alongside incremental ETL pipelines loading reconciled fulfillment & margin data marts.',
      approach:
        'Deliver high-friction order intake and approval workflows first behind contract tests while standing up versioned SQL transformations and data freshness assertions in parallel.',
      featuredImage: caseStudyImg?.id ?? null,
      featuredImageAlt:
        'Editorial geometric schematic illustrating enterprise system architecture blueprints',
      architectureHighlights: [
        {
          title: 'Zero-Disruption Strangler Replacement',
          description: 'New Next.js operational workflows coexist cleanly with legacy tables during phased cutover.',
          order: 1,
        },
        {
          title: 'Unified KPI Dictionary',
          description: 'Reconciles order fulfillment, returns, and invoicing definitions inside versioned SQL marts.',
          order: 2,
        },
        {
          title: 'Role-Based Customer & Ops Views',
          description: 'RBAC isolation separates customer portal reads from internal margin reporting.',
          order: 3,
        },
      ],
      outcomes: [
        {
          title: 'Consistent Cross-Team Reporting',
          description: 'Eliminates manual CSV reconciliation across fulfillment and finance owners.',
          order: 1,
        },
        {
          title: 'Maintainable Modular Codebase',
          description: 'Strict TypeScript contracts and test coverage replace undocumented legacy coupling.',
          order: 2,
        },
      ],
      technologies: [
        { title: 'Next.js & TypeScript', order: 1 },
        { title: 'PostgreSQL', order: 2 },
        { title: 'ETL Pipelines & SQL Tests', order: 3 },
        { title: 'Docker', order: 4 },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?caseStudy=unified-operations-platform-and-bi',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=software-engineering',
        variant: 'outline',
        isVisible: true,
      },
      order: 3,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Modernized Operations & BI (Conceptual Case Study) | NAVOSYS',
        metaDescription:
          'Conceptual reference architecture unifying incremental software modernization with governed ETL and BI reporting.',
        ogImage: caseStudyImg?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const linkCaseStudyRelations = async (
    csId: string,
    serviceSlugs: string[],
    industrySlugs: string[]
  ) => {
    const svcIds = await findPublishedIdsBySlugs(strapi, 'api::service.service', serviceSlugs);
    await ensurePublishedRelationField(
      strapi,
      'api::case-study.case-study',
      csId,
      'relatedServices',
      svcIds
    );
    const indIds = await findPublishedIdsBySlugs(strapi, 'api::industry.industry', industrySlugs);
    await ensurePublishedRelationField(
      strapi,
      'api::case-study.case-study',
      csId,
      'relatedIndustries',
      indIds
    );
  };

  await linkCaseStudyRelations(
    csCloudId,
    ['cloud-migration', 'infrastructure-and-devops'],
    ['financial-services', 'professional-services']
  );
  await linkCaseStudyRelations(
    csAiId,
    ['ai-agents', 'business-process-automation', 'ai-integration'],
    ['healthcare', 'logistics-and-supply-chain']
  );
  await linkCaseStudyRelations(
    csPlatformId,
    ['enterprise-applications', 'application-modernization', 'data-engineering', 'business-intelligence'],
    ['retail-and-ecommerce', 'manufacturing']
  );
}
