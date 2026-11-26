import type { Core } from '@strapi/strapi';
import { ensureSeedMediaAsset } from './media-helper';
import {
  ensurePublishedService,
  linkRelatedServices,
} from './service-seed-helper';

export async function seedAiAndAutomationServices(
  strapi: Core.Strapi
): Promise<void> {
  const aiArchImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-ai-automation-architecture.png',
    alternativeText:
      'Minimal geometric illustration of structured enterprise AI integration gateways and governed system layers',
    caption: 'NAVOSYS AI & Intelligent Automation Architecture Visual',
  });
  const workflowImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-workflow-orchestration.png',
    alternativeText:
      'Architectural illustration of automated business process steps and human-reviewed workflow gates',
    caption: 'NAVOSYS AI Agents & Workflow Orchestration Visual',
  });

  const aiAgentsId = await ensurePublishedService(strapi, 'ai-agents', {
    title: 'AI Agents',
    pillar: 'ai-and-automation',
    summary:
      'Scoped, tool-calling AI assistants with explicit permission boundaries, human approval checkpoints, structured outputs, and full execution traceability.',
    description:
      'Enterprise teams benefit from multi-step AI assistants only when tool access, failure modes, and escalation rules are engineered carefully.\n\nNAVOSYS builds bounded AI agents designed for concrete operational workflows—such as document triage, structured intake classification, internal knowledge lookup, and draft preparation—keeping critical state changes behind deterministic validation or explicit human approval.',
    featuredImage: workflowImage?.id ?? null,
    featuredImageAlt:
      'Architectural illustration of automated business process steps and human-reviewed workflow gates',
    capabilities: [
      {
        title: 'Scoped Tool & API Permissions',
        description:
          'Restrict every agent action to least-privilege, schema-validated endpoints rather than open system access.',
        order: 1,
      },
      {
        title: 'Human-in-the-Loop Approval Gates',
        description:
          'Require explicit operator confirmation before executing customer-facing messages or transactional writes.',
        order: 2,
      },
      {
        title: 'Evaluation Suites & Fallback Routing',
        description:
          'Test prompts and tool selection against representative test cases and route low-confidence items to queues.',
        order: 3,
      },
    ],
    benefits: [
      {
        title: 'Predictable Guardrails',
        description:
          'Schema enforcement, rate limits, and action allow-lists reduce unpredictable model behavior.',
        order: 1,
      },
      {
        title: 'Clear Audit Trails',
        description:
          'Inspect retrieved sources, tool calls, inputs, and review decisions for every workflow execution.',
        order: 2,
      },
      {
        title: 'Maintainable Scope',
        description:
          'Combine deterministic code for reliable rules with language models strictly where unstructured input demands interpretation.',
        order: 3,
      },
    ],
    deliverables: [
      {
        title: 'Agent Architecture & Boundary Spec',
        description:
          'Documented tool contracts, permission scopes, escalation rules, and data retention policy.',
        order: 1,
      },
      {
        title: 'Orchestration Service & Review Queue UI',
        description:
          'Type-checked execution pipeline integrated with human approval and exception handling.',
        order: 2,
      },
      {
        title: 'Test & Regression Evaluation Harness',
        description:
          'Automated test cases covering happy paths, ambiguous inputs, and refusal scenarios.',
        order: 3,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Scope',
        title: 'Task Decomposition & Risk Classification',
        description:
          'Separate deterministic steps from judgment steps and define read vs. write boundaries.',
        order: 1,
      },
      {
        stepNumber: '02 · Engineer',
        title: 'Tool Contracts & Retrieval Grounding',
        description:
          'Build structured tool interfaces, access controls, and citation-linked context retrieval.',
        order: 2,
      },
      {
        stepNumber: '03 · Verify',
        title: 'Sandbox Testing & Escalation Tuning',
        description:
          'Measure failure cases across real edge examples before controlled rollout.',
        order: 3,
      },
    ],
    useCases: [
      {
        title: 'Support & Operations Triage Assistants',
        description:
          'Categorize incoming requests, attach relevant policy references, and draft responses for staff review.',
        order: 1,
      },
      {
        title: 'Procurement & Compliance Document Review',
        description:
          'Extract key terms and flag missing sections against internal review checklists for human sign-off.',
        order: 2,
      },
    ],
    technologies: [
      { title: 'TypeScript / Python', order: 1 },
      { title: 'Structured JSON Schema Tools', order: 2 },
      { title: 'PostgreSQL / Audit Logs', order: 3 },
      { title: 'REST & Webhook Gateways', order: 4 },
    ],
    faqs: [
      {
        question: 'Can AI agents make changes directly inside our ERP or database?',
        answer:
          'We generally avoid unreviewed autonomous writes to core financial or operational systems. Agents prepare structured payloads or execute read/draft steps behind schema checks and human confirmation unless a narrow action is explicitly safe to automate.',
        order: 1,
      },
      {
        question: 'How do you handle model hallucinations or missing context?',
        answer:
          'We ground responses in authorized internal sources, enforce strict schema validation, allow explicit abstention when evidence is missing, and log citations so reviewers can verify outputs quickly.',
        order: 2,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=ai-agents',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Book a Consultation',
      url: '/contact/book-consultation?service=ai-agents',
      variant: 'outline',
      isVisible: true,
    },
    order: 21,
    isFeatured: false,
    isIndexable: true,
    seo: {
      metaTitle: 'AI Agents | NAVOSYS',
      metaDescription:
        'Scoped, human-supervised enterprise AI agents with strict tool permissions, auditability, and deterministic guardrails.',
      ogImage: workflowImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  const bpaId = await ensurePublishedService(
    strapi,
    'business-process-automation',
    {
      title: 'Business Process Automation',
      pillar: 'ai-and-automation',
      summary:
        'Reliable, event-driven workflow orchestration eliminating repetitive copy-paste work across ERP, CRM, ticketing, and document processes.',
      description:
        'Many operational delays stem from disconnected tools, spreadsheet handoffs, and manual data entry rather than a need for complex AI.\n\nNAVOSYS maps your end-to-end process first, simplifies unnecessary steps, and implements resilient automation combining deterministic rules, idempotent webhooks, retries, and—where unstructured text or documents appear—targeted AI extraction with clear exception queues.',
      featuredImage: workflowImage?.id ?? null,
      featuredImageAlt:
        'Architectural illustration of automated business process steps and human-reviewed workflow gates',
      capabilities: [
        {
          title: 'Cross-System Workflow Orchestration',
          description:
            'Synchronize records cleanly across billing, CRM, inventory, HR onboarding, and ticketing systems.',
          order: 1,
        },
        {
          title: 'Document Intake & Structured Extraction',
          description:
            'Convert PDFs, forms, and email attachments into validated structured data with confidence checks.',
          order: 2,
        },
        {
          title: 'Retry Handling & Exception Queues',
          description:
            'Ensure failed API calls, schema mismatches, or edge cases alert owners instead of failing silently.',
          order: 3,
        },
      ],
      benefits: [
        {
          title: 'Lower Manual Rework',
          description:
            'Remove repetitive multi-system data entry so teams focus on customer and operational judgment.',
          order: 1,
        },
        {
          title: 'Deterministic Reliability First',
          description:
            'Use straightforward rules and API integrations wherever structure exists, keeping automation simple to maintain.',
          order: 2,
        },
        {
          title: 'Full Visibility Across Exceptions',
          description:
            'Track queued items, processing status, and dead-letter errors through clear operational dashboards.',
          order: 3,
        },
      ],
      deliverables: [
        {
          title: 'Process Map & Bottleneck Specification',
          description:
            'Current-state and target-state workflow design highlighting decision rules and ownership.',
          order: 1,
        },
        {
          title: 'Idempotent Automation Services',
          description:
            'Scheduled jobs, webhook workers, validation schemas, and error-recovery pipelines.',
          order: 2,
        },
        {
          title: 'Monitoring & Exception Runbook',
          description:
            'Operational guidance for handling retries, schema updates, and manual overrides.',
          order: 3,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Map',
          title: 'Workflow & Exception Discovery',
          description:
            'Observe actual handoffs, edge cases, and upstream data quality before writing automation code.',
          order: 1,
        },
        {
          stepNumber: '02 · Simplify',
          title: 'Rule & Schema Standardization',
          description:
            'Normalize triggers, payloads, and deduplication keys so workflows remain resilient.',
          order: 2,
        },
        {
          stepNumber: '03 · Automate',
          title: 'Build, Test & Monitor',
          description:
            'Deploy tested workers with retries, alerting, and parallel verification before cutover.',
          order: 3,
        },
      ],
      useCases: [
        {
          title: 'Order-to-Invoice & Onboarding Handoffs',
          description:
            'Trigger provisioning, account setup, and billing records reliably upon contract or order approval.',
          order: 1,
        },
        {
          title: 'Intake Routing & Approval Workflows',
          description:
            'Classify incoming operational forms, verify mandatory fields, and route approvals automatically.',
          order: 2,
        },
      ],
      technologies: [
        { title: 'Node.js / Python Workers', order: 1 },
        { title: 'Message Queues & Webhooks', order: 2 },
        { title: 'PostgreSQL / Idempotency Keys', order: 3 },
        { title: 'Structured OCR & Extraction', order: 4 },
      ],
      faqs: [
        {
          question: 'When should we use deterministic automation instead of AI?',
          answer:
            'Whenever inputs are structured or rules are explicit—such as syncing database records, enforcing approvals, or triggering notifications—deterministic code is faster, cheaper, and completely predictable.',
        order: 1,
        },
        {
          question: 'What happens if a third-party system API is temporarily unavailable?',
          answer:
            'We design workers with idempotency keys, bounded exponential retries, and dead-letter queues so transient outages do not lose or duplicate records.',
          order: 2,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=business-process-automation',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=business-process-automation',
        variant: 'outline',
        isVisible: true,
      },
      order: 22,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Business Process Automation | NAVOSYS',
        metaDescription:
          'Event-driven business process automation connecting core systems with validation, retries, and clean exception handling.',
        ogImage: workflowImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const aiIntegrationId = await ensurePublishedService(strapi, 'ai-integration', {
    title: 'AI Integration',
    pillar: 'ai-and-automation',
    summary:
      'Connect language models, permission-aware internal search (RAG), and evaluation pipelines safely into your existing software and infrastructure.',
    description:
      'Adopting AI effectively inside established products and internal tools requires solid software architecture around the model—covering authorization, retrieval quality, cost controls, and latency budgets.\n\nNAVOSYS engineers production AI integration layers that connect approved model providers or self-hosted endpoints into your applications while respecting tenant permissions, PII rules, and existing deployment standards.',
    featuredImage: aiArchImage?.id ?? null,
    featuredImageAlt:
      'Minimal geometric illustration of structured enterprise AI integration gateways and governed system layers',
    capabilities: [
      {
        title: 'Permission-Aware Retrieval (RAG)',
        description:
          'Index internal documentation cleanly and enforce user/role access permissions at query time.',
        order: 1,
      },
      {
        title: 'Model Gateway & Provider Abstraction',
        description:
          'Keep prompts, model routing, token budgets, and rate limits cleanly decoupled from core business logic.',
        order: 2,
      },
      {
        title: 'Privacy, Logging & Cost Controls',
        description:
          'Scrub sensitive fields before inference, track token usage by workflow, and enforce latency timeouts.',
        order: 3,
      },
    ],
    benefits: [
      {
        title: 'No Vendor Lock-In',
        description:
          'Abstract provider APIs behind clean internal interfaces so models can be swapped as quality or pricing evolves.',
        order: 1,
      },
      {
        title: 'Grounded Internal Answers',
        description:
          'Source retrieval includes clear document references and honors existing access boundaries.',
        order: 2,
      },
      {
        title: 'Built Into Existing Workflows',
        description:
          'Expose AI capabilities directly inside web portals, internal admin tools, and APIs instead of standalone chat silos.',
        order: 3,
      },
    ],
    deliverables: [
      {
        title: 'AI Integration Gateway Service',
        description:
          'Typed backend layer managing prompts, structured parsing, retries, caching, and usage telemetry.',
        order: 1,
      },
      {
        title: 'Document Ingestion & Retrieval Pipeline',
        description:
          'Incremental sync, chunking, metadata filtering, and access-control enforcement for knowledge bases.',
        order: 2,
      },
      {
        title: 'Evaluation & Usage Telemetry Baseline',
        description:
          'Representative test dataset, failure tracking, and per-feature cost observability.',
        order: 3,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Assess',
        title: 'Data Access & Feasibility Review',
        description:
          'Verify data privacy constraints, source cleanliness, latency targets, and build-vs-buy choices.',
        order: 1,
      },
      {
        stepNumber: '02 · Architect',
        title: 'Gateway & Retrieval Design',
        description:
          'Define ingestion synchronization, permission filters, fallback responses, and provider interfaces.',
        order: 2,
      },
      {
        stepNumber: '03 · Integrate',
        title: 'Ship, Evaluate & Monitor',
        description:
          'Embed capabilities into product UI or backend workflows with regression checks and usage alerts.',
        order: 3,
      },
    ],
    useCases: [
      {
        title: 'Internal Knowledge & SOP Search',
        description:
          'Help operations and engineering staff locate policy answers with links to authoritative source pages.',
        order: 1,
      },
      {
        title: 'Smart Form & Search Assist Inside Core Apps',
        description:
          'Translate natural-language queries or uploaded notes into structured filter queries and prefilled drafts.',
        order: 2,
      },
    ],
    technologies: [
      { title: 'TypeScript / Python APIs', order: 1 },
      { title: 'PostgreSQL + pgvector', order: 2 },
      { title: 'Structured Output Validation', order: 3 },
      { title: 'Provider-Agnostic Gateways', order: 4 },
    ],
    faqs: [
      {
        question: 'Does connecting an AI model expose our private company data for training?',
        answer:
          'No when configured properly. We use enterprise API endpoints with zero-data-retention / no-training policies or self-hosted deployments depending on your security and residency requirements.',
        order: 1,
      },
      {
        question: 'Can we switch model providers later without rewriting our application?',
        answer:
          'Yes. By placing a clean gateway and schema contract between your product code and model APIs, underlying models remain straightforward to upgrade or replace.',
        order: 2,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=ai-integration',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Book a Consultation',
      url: '/contact/book-consultation?service=ai-integration',
      variant: 'outline',
      isVisible: true,
    },
    order: 23,
    isFeatured: false,
    isIndexable: true,
    seo: {
      metaTitle: 'AI Integration Services | NAVOSYS',
      metaDescription:
        'Integrate language models, permission-aware retrieval (RAG), and structured evaluation pipelines into core enterprise applications.',
      ogImage: aiArchImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  const aiPillarId = await ensurePublishedService(strapi, 'ai-and-automation', {
    title: 'AI & Intelligent Automation',
    pillar: 'ai-and-automation',
    summary:
      'Practical AI agents, deterministic business process automation, and governed enterprise AI integration built around verifiable operational workflows.',
    description:
      'AI creates real value when grounded in clean processes, dependable data, and clear human accountability—not hype.\n\nNAVOSYS helps organizations identify where deterministic workflow automation solves bottlenecks reliably on its own, and where scoped AI agents or model integration genuinely accelerate triage, extraction, and knowledge retrieval under explicit security and quality guardrails.',
    featuredImage: aiArchImage?.id ?? null,
    featuredImageAlt:
      'Minimal geometric illustration of structured enterprise AI integration gateways and governed system layers',
    capabilities: [
      {
        title: 'AI Agents With Human Oversight',
        description:
          'Task-scoped assistants restricted by tool permissions, structured schemas, and approval checkpoints.',
        href: '/services/ai-agents',
        ctaLabel: 'Explore AI Agents',
        order: 1,
      },
      {
        title: 'Business Process Automation',
        description:
          'Event-driven integrations synchronizing ERP, CRM, onboarding, and document workflows without manual rework.',
        href: '/services/business-process-automation',
        ctaLabel: 'Explore Process Automation',
        order: 2,
      },
      {
        title: 'Enterprise AI Integration',
        description:
          'Model gateways, permission-aware RAG search, PII hygiene, and evaluation harnesses embedded inside existing software.',
        href: '/services/ai-integration',
        ctaLabel: 'Explore AI Integration',
        order: 3,
      },
    ],
    benefits: [
      {
        title: 'Honest Fit-for-Purpose Design',
        description:
          'We recommend simple rule-based automation first whenever AI is unnecessary, avoiding brittle over-engineering.',
        order: 1,
      },
      {
        title: 'Security & Privacy Governance',
        description:
          'Access-controlled retrieval, zero-training API posture or private hosting options, and auditable execution logs.',
        order: 2,
      },
      {
        title: 'Measurable Operational Outcomes',
        description:
          'Start with narrow, high-friction workflows where cycle times, error rates, and review burden can be observed clearly.',
        order: 3,
      },
    ],
    deliverables: [
      {
        title: 'Automation Opportunity & Risk Brief',
        description:
          'Prioritized workflow candidates distinguishing deterministic automation from AI-assisted steps.',
        order: 1,
      },
      {
        title: 'Production Workflow & AI Services',
        description:
          'Type-checked integration gateways, job queues, validation schemas, and exception dashboards.',
        order: 2,
      },
      {
        title: 'Evaluation Dataset & Operations Runbook',
        description:
          'Representative test cases, cost/latency monitoring, and human escalation procedures.',
        order: 3,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Audit',
        title: 'Workflow & Data Readiness Review',
        description:
          'Examine real operational friction, input variability, privacy obligations, and success criteria.',
        order: 1,
      },
      {
        stepNumber: '02 · Design',
        title: 'Deterministic Core & AI Guardrails',
        description:
          'Establish clean orchestration boundaries, permission filters, and human review points.',
        order: 2,
      },
      {
        stepNumber: '03 · Validate',
        title: 'Sandbox Testing & Evaluation',
        description:
          'Test accuracy, refusal behavior, and retry handling on real edge cases prior to rollout.',
        order: 3,
      },
      {
        stepNumber: '04 · Operate',
        title: 'Deploy, Monitor & Refine',
        description:
          'Track exception rates, inference costs, and human feedback continuously in production.',
        order: 4,
      },
    ],
    technologies: [
      { title: 'TypeScript & Python Services', order: 1 },
      { title: 'PostgreSQL / pgvector', order: 2 },
      { title: 'Webhooks & Event Queues', order: 3 },
      { title: 'Schema-Validated Model Gateways', order: 4 },
    ],
    faqs: [
      {
        question: 'Should every workflow use an AI agent?',
        answer:
          'No. Structured system-to-system sync, billing triggers, and strict rule checks are best handled by deterministic business process automation. AI should be applied selectively where unstructured documents or natural-language triage add genuine value.',
        order: 1,
      },
      {
        question: 'How do you keep AI systems safe in regulated or multi-team environments?',
        answer:
          'We enforce document-level authorization prior to retrieval, isolate tool permissions, restrict writes behind human approval gates, and log full audit trails.',
        order: 2,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=ai-and-automation',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Book a Consultation',
      url: '/contact/book-consultation?service=ai-and-automation',
      variant: 'outline',
      isVisible: true,
    },
    order: 20,
    isFeatured: true,
    isIndexable: true,
    seo: {
      metaTitle: 'AI & Intelligent Automation | NAVOSYS',
      metaDescription:
        'Enterprise AI agents, deterministic business process automation, and governed AI integration engineered for real operational reliability.',
      ogImage: aiArchImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
    sections: [
      {
        __component: 'sections.card-grid',
        eyebrow: 'Specialized AI & Automation Services',
        heading: 'Explore AI & Automation Capabilities',
        intro:
          'Select an area below to see how we combine deterministic workflows and governed AI safely inside business operations.',
        gridKind: 'services',
        columns: '3',
        items: [
          {
            title: 'AI Agents',
            description:
              'Bounded multi-step assistants with schema-validated tools and human-in-the-loop review.',
            href: '/services/ai-agents',
            ctaLabel: 'View AI Agents',
            order: 1,
          },
          {
            title: 'Business Process Automation',
            description:
              'Reliable cross-system orchestration, intake validation, and automated exception queues.',
            href: '/services/business-process-automation',
            ctaLabel: 'View Process Automation',
            order: 2,
          },
          {
            title: 'AI Integration',
            description:
              'Model gateways, permission-aware RAG search, and evaluation pipelines built into existing apps.',
            href: '/services/ai-integration',
            ctaLabel: 'View AI Integration',
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
        eyebrow: 'Engineering Guidance',
        heading: 'Deterministic Automation vs. Human-Guided AI Agents',
        primaryColumnLabel: 'Business Process Automation',
        secondaryColumnLabel: 'AI Agents & Integration',
        rows: [
          {
            feature: 'Best Input Type',
            primaryValue: 'Structured records, forms, webhooks, fixed business rules',
            secondaryValue: 'Unstructured emails, PDFs, knowledge lookup, draft synthesis',
            highlight: true,
            order: 1,
          },
          {
            feature: 'Predictability & Control',
            primaryValue: '100% deterministic execution with idempotent retries',
            secondaryValue: 'Bounded by schemas, access permissions, and human sign-off',
            order: 2,
          },
          {
            feature: 'Operating Cost Profile',
            primaryValue: 'Minimal compute cost and predictable sub-second latency',
            secondaryValue: 'Token-budgeted inference backed by semantic caching & evals',
            order: 3,
          },
        ],
        surface: 'sand',
        spacing: 'default',
        isVisible: true,
        sortOrder: 2,
      },
    ],
  });

  await linkRelatedServices(strapi, aiPillarId, [
    aiAgentsId,
    bpaId,
    aiIntegrationId,
  ]);
  await linkRelatedServices(strapi, aiAgentsId, [
    aiIntegrationId,
    bpaId,
    aiPillarId,
  ]);
  await linkRelatedServices(strapi, bpaId, [
    aiIntegrationId,
    aiAgentsId,
    aiPillarId,
  ]);
  await linkRelatedServices(strapi, aiIntegrationId, [
    aiAgentsId,
    bpaId,
    aiPillarId,
  ]);
}
