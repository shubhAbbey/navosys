import type { Core } from '@strapi/strapi';
import {
  ensurePublicReadPermissions,
  ensurePublishedCollectionEntry,
  ensurePublishedPageEntry,
  ensurePublishedRelationField,
  findPublishedIdsBySlugs,
} from './collection-seed-helper';
import { ensureSeedMediaAsset } from './media-helper';

const PUBLIC_INDUSTRY_ACTIONS = [
  'api::industry.industry.find',
  'api::industry.industry.findOne',
] as const;

export async function seedIndustries(strapi: Core.Strapi): Promise<void> {
  await ensurePublicReadPermissions(strapi, PUBLIC_INDUSTRY_ACTIONS);

  const regulatedImg = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'industries'],
    fileName: 'navosys-industry-regulated.png',
    alternativeText:
      'Minimal architectural geometric illustration symbolizing layered security boundaries and regulated enterprise governance',
    caption: 'NAVOSYS Regulated Industry Architecture Visual',
  });
  const commerceOpsImg = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'industries'],
    fileName: 'navosys-industry-commerce-ops.png',
    alternativeText:
      'Editorial geometric graphic showing interconnected logistics, inventory, and operations flow channels',
    caption: 'NAVOSYS Commerce & Operations Architecture Visual',
  });

  await ensurePublishedPageEntry(strapi, '/industries', {
    title: 'Industries',
    slug: 'industries',
    pageType: 'industries_overview',
    summary:
      'Sector-focused architecture patterns across Financial Services, Healthcare, Retail & eCommerce, Logistics & Supply Chain, Manufacturing, and Professional Services.',
    showBreadcrumbs: true,
    isIndexable: true,
    seo: {
      metaTitle: 'Industries & Domain Capabilities | NAVOSYS',
      metaDescription:
        'Explore how NAVOSYS applies cloud, AI automation, software engineering, and data analytics patterns across six key industries.',
      noIndex: false,
      noFollow: false,
      structuredDataType: 'CollectionPage',
    },
    sections: [
      {
        __component: 'sections.hero',
        eyebrow: 'Domain Capabilities',
        heading: 'Engineering Patterns Adapted to Sector Reality',
        subheading:
          'Each industry page outlines typical architectural constraints, compliance awareness, and applicable NAVOSYS technical capabilities—distinct from verified client delivery claims.',
        alignment: 'left',
        primaryCta: {
          label: 'Book a Consultation',
          url: '/contact/book-consultation',
          variant: 'primary',
          isVisible: true,
        },
        secondaryCta: {
          label: 'View Services Overview',
          url: '/services',
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
        eyebrow: 'Sector Inquiry',
        heading: 'Planning a Sector-Specific Platform or Modernization?',
        body: 'Discuss your regulatory boundaries, existing tools, and phased technical roadmap.',
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

  const finId = await ensurePublishedCollectionEntry(
    strapi,
    'api::industry.industry',
    '/industries',
    'financial-services',
    {
      title: 'Financial Services',
      summary:
        'Capability blueprint for audit-ready enterprise systems, role-segregated portals, cloud landing zones, and reconciled financial reporting.',
      overview:
        'Financial operations demand deterministic accounting integrity, strong tenant isolation, explicit audit logging, and resilient infrastructure baselines.\n\nNAVOSYS supports financial and fintech teams through disciplined architecture, automated verification, and security-by-default engineering practices.',
      featuredImage: regulatedImg?.id ?? null,
      featuredImageAlt:
        'Minimal architectural geometric illustration symbolizing layered security boundaries and regulated enterprise governance',
      keyChallenges: [
        {
          title: 'Reconciling Legacy Ledgers & Spreadsheets',
          description: 'Disconnected billing and reporting tables slow month-end visibility and elevate audit risk.',
          order: 1,
        },
        {
          title: 'Strict Role & Data Access Boundaries',
          description: 'Internal portals require clear segregation of duties, encryption, and action logs.',
          order: 2,
        },
      ],
      solutionPatterns: [
        {
          title: 'Immutable Audit Trails & Typed Ledger Workflows',
          description: 'Append-only event tracking with deterministic validation rules and dual-review states.',
          order: 1,
        },
        {
          title: 'Hardened Cloud Landing Zones & Data Marts',
          description: 'Private networking, secret hygiene, and single-source semantic reporting views.',
          order: 2,
        },
      ],
      useCases: [
        {
          title: 'Automated Statement & Document Intake',
          description: 'Structured extraction paired with mandatory human exception approval queues.',
          order: 1,
        },
        {
          title: 'Multi-Entity Financial Consolidation BI',
          description: 'Clean SQL transformations standardizing daily treasury and operations KPIs.',
          order: 2,
        },
      ],
      complianceConsiderations: [
        {
          title: 'Architecture Aligned for Auditability',
          description: 'Designs prioritize least-privilege access, encrypted transit/storage, and documented change logs.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?industry=financial-services',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?industry=financial-services',
        variant: 'outline',
        isVisible: true,
      },
      order: 1,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Financial Services Capabilities | NAVOSYS',
        metaDescription:
          'Cloud security baselines, reconciled financial BI pipelines, and audit-ready enterprise application patterns.',
        ogImage: regulatedImg?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const healthId = await ensurePublishedCollectionEntry(
    strapi,
    'api::industry.industry',
    '/industries',
    'healthcare',
    {
      title: 'Healthcare',
      summary:
        'Capability blueprint for privacy-aware portals, human-in-the-loop operational triage, and reliable administrative workflow integration.',
      overview:
        'Healthcare operations balance sensitive patient/administrative information with high manual scheduling, intake, and coordination workloads.\n\nNAVOSYS focuses on administrative workflow modernization, strict access-controlled data handling, and deterministic reliability—while avoiding unverified clinical or automated-diagnosis claims.',
      featuredImage: regulatedImg?.id ?? null,
      featuredImageAlt:
        'Minimal architectural geometric illustration symbolizing layered security boundaries and regulated enterprise governance',
      keyChallenges: [
        {
          title: 'Manual Referral & Document Triage',
          description: 'Administrative teams process fragmented forms, PDFs, and multi-system scheduling updates.',
          order: 1,
        },
        {
          title: 'Sensitive Data Access & Retention Hygiene',
          description: 'Integrations and AI tools require strict data minimization, masking, and authorization checks.',
          order: 2,
        },
      ],
      solutionPatterns: [
        {
          title: 'Zero-Retention & Access-Controlled Automation',
          description: 'Permission-scoped retrieval and human-reviewed triage workflows keeping PHI exposure tightly bounded.',
          order: 1,
        },
        {
          title: 'Interoperable Scheduling & Portal APIs',
          description: 'Clean middleware connecting modern web/mobile intake experiences to core records.',
          order: 2,
        },
      ],
      useCases: [
        {
          title: 'Intake Packet Classification & Checklist Verification',
          description: 'Flag incomplete administrative forms cleanly for staff follow-up.',
          order: 1,
        },
        {
          title: 'Staff Capacity & Utilization Dashboards',
          description: 'Clear operational reporting without exposing unnecessary sensitive patient fields.',
          order: 2,
        },
      ],
      complianceConsiderations: [
        {
          title: 'Privacy-By-Design Scoping',
          description: 'Data residency, RBAC isolation, and zero-training model boundaries are evaluated prior to build.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?industry=healthcare',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?industry=healthcare',
        variant: 'outline',
        isVisible: true,
      },
      order: 2,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Healthcare Technology Capabilities | NAVOSYS',
        metaDescription:
          'Privacy-aware healthcare administrative automation, portal engineering, and governed analytics capabilities.',
        ogImage: regulatedImg?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const retailId = await ensurePublishedCollectionEntry(
    strapi,
    'api::industry.industry',
    '/industries',
    'retail-and-ecommerce',
    {
      title: 'Retail & eCommerce',
      summary:
        'Capability blueprint for fast storefronts, resilient order-to-ERP sync, omnichannel inventory visibility, and margin analytics.',
      overview:
        'Retail teams depend on fast storefront responsiveness, reliable checkout/fulfillment webhooks, and accurate multi-channel stock and margin reporting.\n\nNAVOSYS builds server-first commerce experiences and behind-the-scenes automation keeping inventory, pricing, and BI aligned.',
      featuredImage: commerceOpsImg?.id ?? null,
      featuredImageAlt:
        'Editorial geometric graphic showing interconnected logistics, inventory, and operations flow channels',
      keyChallenges: [
        {
          title: 'Inventory Desync Across Channels',
          description: 'Delayed webhooks between storefronts, warehouses, and accounting lead to overselling.',
          order: 1,
        },
        {
          title: 'Heavy Frontends Hurting Conversion',
          description: 'Bloated client scripts slow mobile product discovery and checkout completion.',
          order: 2,
        },
      ],
      solutionPatterns: [
        {
          title: 'Server-First Web & Idempotent Order Sync',
          description: 'Fast Next.js product experiences paired with retry-safe ERP/WMS workers.',
          order: 1,
        },
        {
          title: 'Unified SKU Margin & Return Analytics',
          description: 'Consolidate storefront, fulfillment cost, and return metrics cleanly.',
          order: 2,
        },
      ],
      useCases: [
        {
          title: 'B2B Ordering Portals & Account Pricing',
          description: 'Custom negotiated catalogs, order history, and ERP invoice integration.',
          order: 1,
        },
        {
          title: 'Support Order-Lookup Assistants',
          description: 'Human-reviewed order status drafting connected safely to tracking APIs.',
          order: 2,
        },
      ],
      complianceConsiderations: [
        {
          title: 'Checkout & PII Isolation',
          description: 'Keep tokenized payment flows delegated strictly to compliant gateways.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?industry=retail-and-ecommerce',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?industry=retail-and-ecommerce',
        variant: 'outline',
        isVisible: true,
      },
      order: 3,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Retail & eCommerce Engineering | NAVOSYS',
        metaDescription:
          'Fast web commerce storefronts, ERP/WMS automation, and omnichannel BI reporting.',
        ogImage: commerceOpsImg?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const logisticsId = await ensurePublishedCollectionEntry(
    strapi,
    'api::industry.industry',
    '/industries',
    'logistics-and-supply-chain',
    {
      title: 'Logistics & Supply Chain',
      summary:
        'Capability blueprint for offline-tolerant dispatch apps, carrier EDI/API automation, and real-time SLA exception visibility.',
      overview:
        'Logistics networks span warehouses, mobile field drivers, and external carrier systems where network drops, manifest errors, and late updates stall throughput.\n\nNAVOSYS builds reliable integration hubs, offline-capable mobile companions, and crisp exception dashboards.',
      featuredImage: commerceOpsImg?.id ?? null,
      featuredImageAlt:
        'Editorial geometric graphic showing interconnected logistics, inventory, and operations flow channels',
      keyChallenges: [
        {
          title: 'Fragmented Carrier Feeds & Paper PODs',
          description: 'Teams chase status across portals, email attachments, and spreadsheets.',
          order: 1,
        },
        {
          title: 'Intermittent Yard & Field Connectivity',
          description: 'Warehouse and driver tools fail if built purely as fragile always-online pages.',
          order: 2,
        },
      ],
      solutionPatterns: [
        {
          title: 'Offline-Resilient Dispatch Mobile Apps',
          description: 'Local queue persistence with conflict-safe reconciliation upon reconnect.',
          order: 1,
        },
        {
          title: 'Normalized Tracking & Exception Data Pipelines',
          description: 'Unify EDI/webhook milestones into clear SLA delay alerts.',
          order: 2,
        },
      ],
      useCases: [
        {
          title: 'Automated Bill-of-Lading Intake & Matching',
          description: 'Extract shipment references cleanly into exception review queues.',
          order: 1,
        },
        {
          title: 'On-Time Performance & Lane Cost BI',
          description: 'Compare carrier turnaround times and route exceptions consistently.',
          order: 2,
        },
      ],
      complianceConsiderations: [
        {
          title: 'High-Availability Cutover & Telemetry',
          description: 'Design integration queues with dead-letter recovery so shipments never go untracked.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?industry=logistics-and-supply-chain',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?industry=logistics-and-supply-chain',
        variant: 'outline',
        isVisible: true,
      },
      order: 4,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Logistics & Supply Chain Solutions | NAVOSYS',
        metaDescription:
          'Dispatch apps, carrier/WMS integration automation, and supply-chain operational analytics.',
        ogImage: commerceOpsImg?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const mfgId = await ensurePublishedCollectionEntry(
    strapi,
    'api::industry.industry',
    '/industries',
    'manufacturing',
    {
      title: 'Manufacturing',
      summary:
        'Capability blueprint for hybrid plant-to-cloud infrastructure, ERP modernization, quality inspection portals, and production BI.',
      overview:
        'Manufacturing environments often combine aging on-premises ERP or floor applications with distributed plant connectivity and tight shift tolerances.\n\nNAVOSYS emphasizes incremental IT/app modernization and pragmatic hybrid architectures that respect factory continuity.',
      featuredImage: commerceOpsImg?.id ?? null,
      featuredImageAlt:
        'Editorial geometric graphic showing interconnected logistics, inventory, and operations flow channels',
      keyChallenges: [
        {
          title: 'End-of-Life Plant Servers & Legacy Portals',
          description: 'Critical scheduling and quality tools depend on fragile local machines.',
          order: 1,
        },
        {
          title: 'Disconnected Shop-Floor & ERP Reporting',
          description: 'Scrap, downtime, and order backlog require manual spreadsheet consolidation.',
          order: 2,
        },
      ],
      solutionPatterns: [
        {
          title: 'Hybrid Cloud & Staged Application Refactoring',
          description: 'Bridge local plant systems reliably with containerized modern modules.',
          order: 1,
        },
        {
          title: 'Production & Quality Telemetry Pipelines',
          description: 'Ingest shift inspection logs into unified KPI reporting views.',
          order: 2,
        },
      ],
      useCases: [
        {
          title: 'Supplier Portal & Quality Non-Conformance Workflows',
          description: 'Digitize supplier Corrective Action tracking with clean approval states.',
          order: 1,
        },
        {
          title: 'Preventative Maintenance & Spares Visibility',
          description: 'Surface machine maintenance windows and critical spares levels clearly.',
          order: 2,
        },
      ],
      complianceConsiderations: [
        {
          title: 'Network Segmentation Between Plant & Cloud',
          description: 'Protect local operational environments behind strict gateway boundaries.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?industry=manufacturing',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?industry=manufacturing',
        variant: 'outline',
        isVisible: true,
      },
      order: 5,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Manufacturing Technology Solutions | NAVOSYS',
        metaDescription:
          'Hybrid cloud architecture, legacy plant application modernization, and production analytics.',
        ogImage: commerceOpsImg?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const profServId = await ensurePublishedCollectionEntry(
    strapi,
    'api::industry.industry',
    '/industries',
    'professional-services',
    {
      title: 'Professional Services',
      summary:
        'Capability blueprint for client delivery portals, permissioned internal knowledge search, billing automation, and utilization BI.',
      overview:
        'Advisory, legal, accounting, and consulting organizations run on institutional knowledge, repeatable client onboarding, and accurate utilization tracking.\n\nNAVOSYS helps service firms streamline onboarding workflows, modernize client portals, and deploy governed internal knowledge retrieval.',
      featuredImage: regulatedImg?.id ?? null,
      featuredImageAlt:
        'Minimal architectural geometric illustration symbolizing layered security boundaries and regulated enterprise governance',
      keyChallenges: [
        {
          title: 'Slow Client Onboarding & Document Collection',
          description: 'Manual email follow-ups delay kickoff milestones across CRM, billing, and PM tools.',
          order: 1,
        },
        {
          title: 'Searching Precedents Without Client Data Leakage',
          description: 'Internal knowledge search must isolate client matter boundaries strictly.',
          order: 2,
        },
      ],
      solutionPatterns: [
        {
          title: 'Permission-Scoped Enterprise RAG & Portals',
          description: 'Access-controlled knowledge lookup plus structured client document portals.',
          order: 1,
        },
        {
          title: 'CRM-to-Delivery-to-Invoice Orchestration',
          description: 'Deterministic workflow triggers keeping engagement setup and utilization synced.',
          order: 2,
        },
      ],
      useCases: [
        {
          title: 'Client Engagement Hub & Deliverable Portal',
          description: 'Clean branded portal organizing project milestones, approvals, and files.',
          order: 1,
        },
        {
          title: 'Realization, Backlog & Utilization BI',
          description: 'Single-source dashboards aligning time logs with billing milestones.',
          order: 2,
        },
      ],
      complianceConsiderations: [
        {
          title: 'Strict Client-Tenant Isolation',
          description: 'Enforce organization and engagement permissions prior to every search or portal read.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?industry=professional-services',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?industry=professional-services',
        variant: 'outline',
        isVisible: true,
      },
      order: 6,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Professional Services Solutions | NAVOSYS',
        metaDescription:
          'Client portals, engagement workflow automation, governed RAG search, and utilization analytics.',
        ogImage: regulatedImg?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const linkServices = async (industryId: string, slugs: string[]) => {
    const svcIds = await findPublishedIdsBySlugs(strapi, 'api::service.service', slugs);
    await ensurePublishedRelationField(
      strapi,
      'api::industry.industry',
      industryId,
      'relatedServices',
      svcIds
    );
  };

  await linkServices(finId, ['cloud-migration', 'enterprise-applications', 'business-intelligence']);
  await linkServices(healthId, ['ai-integration', 'business-process-automation', 'enterprise-applications']);
  await linkServices(retailId, ['web-development', 'business-process-automation', 'data-visualization']);
  await linkServices(logisticsId, ['mobile-app-development', 'data-engineering', 'ai-agents']);
  await linkServices(mfgId, ['hybrid-cloud', 'application-modernization', 'data-engineering']);
  await linkServices(profServId, ['ai-integration', 'web-development', 'business-intelligence']);
}
