import type { Core } from '@strapi/strapi';
import { ensureSeedMediaAsset } from './media-helper';
import {
  ensurePublishedService,
  linkRelatedServices,
} from './service-seed-helper';

export async function seedCloudAndItServices(
  strapi: Core.Strapi
): Promise<void> {
  const cloudImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-cloud-architecture.png',
    alternativeText:
      'Minimal geometric illustration of hybrid cloud architecture and interconnected infrastructure nodes',
    caption: 'NAVOSYS Cloud & IT Architecture Visual',
  });
  const devopsImage = await ensureSeedMediaAsset(strapi, {
    folderSegments: ['seed-assets', 'services'],
    fileName: 'navosys-devops-operations.png',
    alternativeText:
      'Architectural illustration of automated infrastructure pipelines and managed IT operations',
    caption: 'NAVOSYS DevOps & Managed IT Visual',
  });

  const cloudMigrationId = await ensurePublishedService(
    strapi,
    'cloud-migration',
    {
      title: 'Cloud Migration',
      pillar: 'cloud-and-it',
      summary:
        'Phased workload assessment, landing-zone architecture, data cutover, and post-migration validation without operational surprises.',
      description:
        'Moving business-critical systems to the cloud requires clear dependency mapping and disciplined cutover planning.\n\nNAVOSYS sequences migrations in manageable waves—establishing identity boundaries, network isolation, backups, and rollback paths before moving production traffic.',
      featuredImage: cloudImage?.id ?? null,
      featuredImageAlt:
        'Minimal geometric illustration of hybrid cloud architecture and interconnected infrastructure nodes',
      capabilities: [
        {
          title: 'Workload Readiness & Dependency Mapping',
          description:
            'Catalog application components, data flows, latency constraints, and licensing factors.',
          order: 1,
        },
        {
          title: 'Secure Landing Zone Foundation',
          description:
            'Standardize IAM roles, VPC segmentation, encryption defaults, and logging baselines.',
          order: 2,
        },
        {
          title: 'Staged Cutover & Rollback Planning',
          description:
            'Rehearse data replication, DNS transitions, and fallback runbooks prior to production cutover.',
          order: 3,
        },
      ],
      benefits: [
        {
          title: 'Controlled Cutover Risk',
          description:
            'Incremental migration waves minimize business disruption and clarify rollback criteria.',
          order: 1,
        },
        {
          title: 'Transparent Cost Baseline',
          description:
            'Right-size compute and storage tiers early instead of replicating oversized legacy footprints.',
          order: 2,
        },
        {
          title: 'Repeatable Environments',
          description:
            'Provision landing zones via Infrastructure-as-Code rather than manual console setup.',
          order: 3,
        },
      ],
      deliverables: [
        {
          title: 'Migration Wave Plan',
          description: 'Prioritized workload sequence, dependency graph, and risk register.',
          order: 1,
        },
        {
          title: 'IaC Landing Zone Templates',
          description: 'Version-controlled networking, IAM, and observability modules.',
          order: 2,
        },
        {
          title: 'Cutover & Verification Runbook',
          description: 'Step-by-step transition checklist and post-migration health checks.',
          order: 3,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Assess',
          title: 'Inventory & Readiness',
          description: 'Evaluate workloads, data gravity, compliance rules, and target options.',
          order: 1,
        },
        {
          stepNumber: '02 · Design',
          title: 'Landing Zone & Wave Plan',
          description: 'Architect target cloud networking, IAM, and staged migration waves.',
          order: 2,
        },
        {
          stepNumber: '03 · Migrate',
          title: 'Rehearse & Cut Over',
          description: 'Execute staging rehearsals, incremental data sync, and controlled cutover.',
          order: 3,
        },
        {
          stepNumber: '04 · Stabilize',
          title: 'Observe & Optimize',
          description: 'Validate telemetry, backup integrity, and ongoing resource sizing.',
          order: 4,
        },
      ],
      useCases: [
        {
          title: 'Data Center Exit or Colocation Consolidation',
          description:
            'Transition legacy virtual machines and internal line-of-business apps to managed cloud infrastructure.',
          order: 1,
        },
        {
          title: 'Database & Storage Modernization',
          description:
            'Move self-hosted databases to managed PostgreSQL with automated backups and private networking.',
          order: 2,
        },
      ],
      technologies: [
        { title: 'Terraform / OpenTofu', order: 1 },
        { title: 'Docker & Containers', order: 2 },
        { title: 'PostgreSQL', order: 3 },
        { title: 'Linux & Nginx', order: 4 },
      ],
      faqs: [
        {
          question: 'Do we need to rewrite every application before migrating?',
          answer:
            'No. We evaluate each workload individually—combining rehosting, managed service adoption, and targeted refactoring where it delivers practical value.',
          order: 1,
        },
        {
          question: 'How is downtime minimized during cutover?',
          answer:
            'We use staging cutover rehearsals, incremental database replication, and pre-validated rollback plans before shifting production DNS.',
          order: 2,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=cloud-migration',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Request Cloud Assessment',
        url: '/contact/request-assessment?assessment=cloud-readiness',
        variant: 'outline',
        isVisible: true,
      },
      order: 11,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Cloud Migration Services | NAVOSYS',
        metaDescription:
          'Structured cloud migration, landing-zone architecture, and low-risk workload transitions.',
        ogImage: cloudImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const hybridCloudId = await ensurePublishedService(strapi, 'hybrid-cloud', {
    title: 'Hybrid Cloud',
    pillar: 'cloud-and-it',
    summary:
      'Consistent networking, identity, workload portability, and governance spanning on-premises systems and public cloud environments.',
    description:
      'Many organizations operate workloads across both on-premises infrastructure and cloud providers for regulatory, latency, or capital-planning reasons.\n\nNAVOSYS designs unified hybrid cloud topologies with clear security perimeters, reliable interconnectivity, and consistent deployment automation.',
    featuredImage: cloudImage?.id ?? null,
    featuredImageAlt:
      'Minimal geometric illustration of hybrid cloud architecture and interconnected infrastructure nodes',
    capabilities: [
      {
        title: 'Cross-Environment Networking & Identity',
        description:
          'Establish encrypted site-to-site connectivity, private DNS resolution, and federated access.',
        order: 1,
      },
      {
        title: 'Containerized Workload Portability',
        description:
          'Standardize build and runtime packaging so services operate consistently across environments.',
        order: 2,
      },
      {
        title: 'Unified Observability & Policy Guardrails',
        description:
          'Centralize logs, health checks, and configuration baselines across on-prem and cloud.',
        order: 3,
      },
    ],
    benefits: [
      {
        title: 'Data Residency Alignment',
        description:
          'Keep sensitive systems local where required while scaling elastic services in the cloud.',
        order: 1,
      },
      {
        title: 'Consistent Operations',
        description:
          'Reduce environment drift with shared automation and deployment workflows.',
        order: 2,
      },
    ],
    deliverables: [
      {
        title: 'Hybrid Network & Security Topology',
        description: 'Documented routing, segmentation, and identity architecture.',
        order: 1,
      },
      {
        title: 'Standardized Deployment Pipeline',
        description: 'Automated build and release patterns spanning target environments.',
        order: 2,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Map',
        title: 'Boundary & Latency Audit',
        description: 'Determine which workloads remain on-premises vs. cloud.',
        order: 1,
      },
      {
        stepNumber: '02 · Connect',
        title: 'Network & Identity Integration',
        description: 'Implement encrypted tunnels, routing rules, and access governance.',
        order: 2,
      },
      {
        stepNumber: '03 · Unify',
        title: 'Automation & Monitoring',
        description: 'Consolidate CI/CD deployment and unified alerting.',
        order: 3,
      },
    ],
    useCases: [
      {
        title: 'Regulated Data With Cloud Application Tiers',
        description:
          'Serve external digital channels in the cloud while retaining core records on controlled infrastructure.',
        order: 1,
      },
    ],
    technologies: [
      { title: 'WireGuard / IPsec VPN', order: 1 },
      { title: 'Docker & Kubernetes', order: 2 },
      { title: 'Terraform', order: 3 },
      { title: 'Prometheus & OpenTelemetry', order: 4 },
    ],
    faqs: [
      {
        question: 'Can hybrid cloud work without complex multi-cluster orchestration?',
        answer:
          'Yes. We match tooling complexity to actual team size and workload needs—favoring simple, maintainable Docker/VM or managed setups where Kubernetes is unnecessary.',
          order: 1,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=hybrid-cloud',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Book a Consultation',
      url: '/contact/book-consultation?service=hybrid-cloud',
      variant: 'outline',
      isVisible: true,
    },
    order: 12,
    isFeatured: false,
    isIndexable: true,
    seo: {
      metaTitle: 'Hybrid Cloud Architecture | NAVOSYS',
      metaDescription:
        'Secure connectivity, workload portability, and unified operations across on-premises and cloud environments.',
      ogImage: cloudImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  const managedItId = await ensurePublishedService(strapi, 'managed-it', {
    title: 'Managed IT',
    pillar: 'cloud-and-it',
    summary:
      'Structured system administration, proactive monitoring, patching discipline, backup verification, and operational support.',
    description:
      'Reliable day-to-day IT operations depend on disciplined maintenance rather than reactive firefighting.\n\nNAVOSYS provides documented system administration, automated health monitoring, security patching, and verified backup/restore routines tailored to your environment.',
    featuredImage: devopsImage?.id ?? null,
    featuredImageAlt:
      'Architectural illustration of automated infrastructure pipelines and managed IT operations',
    capabilities: [
      {
        title: 'Proactive Health & Availability Monitoring',
        description:
          'Track service uptime, certificate renewals, disk/CPU pressure, and error budgets.',
        order: 1,
      },
      {
        title: 'Patch Management & Hardening',
        description:
          'Scheduled OS, container, and dependency updates validated in staging before rollout.',
        order: 2,
      },
      {
        title: 'Backup Verification & Restore Drills',
        description:
          'Automated backup scheduling paired with periodic restore testing—not untested snapshots.',
        order: 3,
      },
    ],
    benefits: [
      {
        title: 'Predictable Operational Hygiene',
        description: 'Eliminate silent certificate expirations, stale patches, and unverified backups.',
        order: 1,
      },
      {
        title: 'Clear Runbooks & Ownership',
        description: 'Every environment ships with living documentation and escalation procedures.',
        order: 2,
      },
    ],
    deliverables: [
      {
        title: 'Operations Runbook & Escalation Matrix',
        description: 'Documented recovery steps, maintenance windows, and contact procedures.',
        order: 1,
      },
      {
        title: 'Periodic Health & Patch Summary',
        description: 'Regular status reporting on updates, capacity, and backup checks.',
        order: 2,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Baseline',
        title: 'Environment Audit & Hardening',
        description: 'Document hosts, access controls, backups, and monitoring gaps.',
        order: 1,
      },
      {
        stepNumber: '02 · Instrument',
        title: 'Alerts & Backup Automation',
        description: 'Implement meaningful alerts and verified backup schedules.',
        order: 2,
      },
      {
        stepNumber: '03 · Sustain',
        title: 'Scheduled Maintenance & Review',
        description: 'Execute recurring patching, audits, and capacity tuning.',
        order: 3,
      },
    ],
    useCases: [
      {
        title: 'Lean Teams Needing Operational Continuity',
        description:
          'Keep production applications and internal IT reliable without building a large 24/7 internal sysadmin desk.',
        order: 1,
      },
    ],
    technologies: [
      { title: 'Linux Administration', order: 1 },
      { title: 'Nginx & TLS/HTTPS', order: 2 },
      { title: 'PostgreSQL Backups', order: 3 },
      { title: 'Automated Monitoring', order: 4 },
    ],
    faqs: [
      {
        question: 'Do we retain full ownership of our servers and cloud accounts?',
        answer:
          'Always. Infrastructure accounts, repositories, and credentials remain under your organization’s ownership with role-scoped access.',
        order: 1,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=managed-it',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Book a Consultation',
      url: '/contact/book-consultation?service=managed-it',
      variant: 'outline',
      isVisible: true,
    },
    order: 13,
    isFeatured: false,
    isIndexable: true,
    seo: {
      metaTitle: 'Managed IT Operations | NAVOSYS',
      metaDescription:
        'Proactive infrastructure administration, patching discipline, monitoring, and verified backups.',
      ogImage: devopsImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  const devopsId = await ensurePublishedService(
    strapi,
    'infrastructure-and-devops',
    {
      title: 'Infrastructure & DevOps',
      pillar: 'cloud-and-it',
      summary:
        'Reproducible Infrastructure-as-Code, containerization, automated CI/CD gates, and safe release/rollback workflows.',
      description:
        'Manual deployments and undocumented server configuration slow down engineering teams and introduce avoidable production regressions.\n\nNAVOSYS builds clean, version-controlled CI/CD pipelines and Infrastructure-as-Code templates so every release is repeatable and verifiable.',
      featuredImage: devopsImage?.id ?? null,
      featuredImageAlt:
        'Architectural illustration of automated infrastructure pipelines and managed IT operations',
      capabilities: [
        {
          title: 'Infrastructure-as-Code (IaC)',
          description:
            'Declarative provisioning for networks, compute, managed databases, and TLS reverse proxies.',
          order: 1,
        },
        {
          title: 'CI/CD Quality & Security Gates',
          description:
            'Automated lint, typecheck, test, container build, and dependency audit steps prior to deploy.',
          order: 2,
        },
        {
          title: 'Zero-Downtime Release & Rollback',
          description:
            'Health-checked deployments, environment parity across staging/production, and fast rollbacks.',
          order: 3,
        },
      ],
      benefits: [
        {
          title: 'Faster, Safer Releases',
          description: 'Catch build, schema, and configuration issues before changes reach users.',
          order: 1,
        },
        {
          title: 'Eliminate Configuration Drift',
          description: 'Staging and production environments stay consistent through code.',
          order: 2,
        },
      ],
      deliverables: [
        {
          title: 'CI/CD Workflow Definitions',
          description: 'Clean pipeline configurations for build, test, and staged deployment.',
          order: 1,
        },
        {
          title: 'Container & Reverse Proxy Blueprints',
          description: 'Production-hardened Dockerfiles, Compose/orchestration, and Nginx configs.',
          order: 2,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Inspect',
          title: 'Delivery Bottleneck Review',
          description: 'Identify manual release steps, fragile scripts, and environment gaps.',
          order: 1,
        },
        {
          stepNumber: '02 · Codify',
          title: 'IaC & Container Packaging',
          description: 'Standardize runtime images, secrets injection, and provisioning modules.',
          order: 2,
        },
        {
          stepNumber: '03 · Automate',
          title: 'Pipeline & Rollback Verification',
          description: 'Roll out automated CI checks, staging promotion, and tested rollbacks.',
          order: 3,
        },
      ],
      useCases: [
        {
          title: 'Replacing Manual SSH Deployments',
          description:
            'Move from manual server edits to automated, auditable Git-triggered releases.',
          order: 1,
        },
      ],
      technologies: [
        { title: 'Docker & Compose', order: 1 },
        { title: 'GitHub Actions / CI', order: 2 },
        { title: 'Terraform', order: 3 },
        { title: 'Nginx & Let’s Encrypt', order: 4 },
      ],
      faqs: [
        {
          question: 'Can you improve our CI/CD without replacing our entire hosting setup?',
          answer:
            'Yes. We regularly introduce containerized builds, automated verification, and clean rollback scripts on existing VPS or cloud servers.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=infrastructure-and-devops',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=infrastructure-and-devops',
        variant: 'outline',
        isVisible: true,
      },
      order: 14,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'Infrastructure & DevOps Engineering | NAVOSYS',
        metaDescription:
          'Infrastructure-as-Code, CI/CD automation, containerization, and reliable deployment pipelines.',
        ogImage: devopsImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const itModernizationId = await ensurePublishedService(
    strapi,
    'it-modernization',
    {
      title: 'IT Modernization',
      pillar: 'cloud-and-it',
      summary:
        'Incremental replacement of legacy infrastructure, brittle authentication, and aging operational tooling with modern standards.',
      description:
        'Aging servers, unsupported operating systems, and ad-hoc integrations increase security exposure and maintenance cost.\n\nNAVOSYS modernizes core IT foundations step by step—upgrading identity, storage, networking, and runtime platforms without disruptive big-bang rewrites.',
      featuredImage: devopsImage?.id ?? null,
      featuredImageAlt:
        'Architectural illustration of automated infrastructure pipelines and managed IT operations',
      capabilities: [
        {
          title: 'Legacy Platform Remediation',
          description:
            'Retire end-of-life OS/runtime versions and consolidate fragmented infrastructure.',
          order: 1,
        },
        {
          title: 'Identity & Access Modernization',
          description:
            'Centralize SSO, least-privilege roles, and secret management out of hardcoded configs.',
          order: 2,
        },
      ],
      benefits: [
        {
          title: 'Reduced Security & EOL Exposure',
          description: 'Bring infrastructure onto actively supported, auditable software baselines.',
          order: 1,
        },
        {
          title: 'Lower Maintenance Friction',
          description: 'Replace fragile bespoke setups with standard documented tooling.',
          order: 2,
        },
      ],
      deliverables: [
        {
          title: 'Modernization Roadmap & Risk Matrix',
          description: 'Sequenced retirement plan for legacy components.',
          order: 1,
        },
        {
          title: 'Updated Platform & Runbooks',
          description: 'Hardened infrastructure baselines and team handoff documentation.',
          order: 2,
        },
      ],
      processSteps: [
        {
          stepNumber: '01 · Audit',
          title: 'EOL & Risk Assessment',
          description: 'Inventory legacy components, dependencies, and single points of failure.',
          order: 1,
        },
        {
          stepNumber: '02 · Sequence',
          title: 'Incremental Upgrade Plan',
          description: 'Prioritize high-risk or high-friction components first.',
          order: 2,
        },
        {
          stepNumber: '03 · Transition',
          title: 'Modernize & Verify',
          description: 'Upgrade, test, and decommission legacy assets cleanly.',
          order: 3,
        },
      ],
      useCases: [
        {
          title: 'Retiring End-of-Life Servers & Hardcoded Credentials',
          description:
            'Upgrade legacy hosts into containerized, environment-configured, monitored services.',
          order: 1,
        },
      ],
      technologies: [
        { title: 'Containers & Linux LTS', order: 1 },
        { title: 'PostgreSQL', order: 2 },
        { title: 'TLS & Secrets Management', order: 3 },
        { title: 'Reverse Proxy / WAF', order: 4 },
      ],
      faqs: [
        {
          question: 'How do you modernize systems that still serve daily operations?',
          answer:
            'We introduce parallel staging environments, strangler/proxy routing where needed, and staged cutovers with rollback checkpoints.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=it-modernization',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Request Assessment',
        url: '/contact/request-assessment?assessment=modernization',
        variant: 'outline',
        isVisible: true,
      },
      order: 15,
      isFeatured: false,
      isIndexable: true,
      seo: {
        metaTitle: 'IT Modernization Services | NAVOSYS',
        metaDescription:
          'Incremental modernization of legacy infrastructure, identity, and operational platforms.',
        ogImage: devopsImage?.id ?? null,
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    }
  );

  const cloudPillarId = await ensurePublishedService(strapi, 'cloud-and-it', {
    title: 'Cloud & IT Solutions',
    pillar: 'cloud-and-it',
    summary:
      'Resilient cloud migration, hybrid infrastructure, managed IT operations, DevOps automation, and pragmatic IT modernization.',
    description:
      'NAVOSYS Cloud & IT Solutions helps organizations build dependable infrastructure foundations—balancing security, cost clarity, and operational simplicity.\n\nWhether migrating legacy workloads, integrating hybrid environments, or automating deployment pipelines, our focus stays on maintainable systems your team can operate with confidence.',
    featuredImage: cloudImage?.id ?? null,
    featuredImageAlt:
      'Minimal geometric illustration of hybrid cloud architecture and interconnected infrastructure nodes',
    capabilities: [
      {
        title: 'Cloud Migration & Landing Zones',
        description:
          'Structured workload transitions with IAM, networking, and rollback discipline.',
        href: '/services/cloud-migration',
        ctaLabel: 'Explore Cloud Migration',
        order: 1,
      },
      {
        title: 'Hybrid Cloud Connectivity',
        description:
          'Unified networking, identity, and container portability across on-prem and cloud.',
        href: '/services/hybrid-cloud',
        ctaLabel: 'Explore Hybrid Cloud',
        order: 2,
      },
      {
        title: 'Managed IT & Infrastructure/DevOps',
        description:
          'IaC provisioning, CI/CD quality gates, patching, and verified backup routines.',
        href: '/services/infrastructure-and-devops',
        ctaLabel: 'Explore DevOps',
        order: 3,
      },
      {
        title: 'IT Modernization',
        description:
          'Incremental upgrades replacing aging servers and manual operational tooling.',
        href: '/services/it-modernization',
        ctaLabel: 'Explore Modernization',
        order: 4,
      },
    ],
    benefits: [
      {
        title: 'Security by Default',
        description:
          'Least-privilege networking, loopback-restricted databases, HTTPS, and secret hygiene.',
        order: 1,
      },
      {
        title: 'Repeatable Automation',
        description:
          'Infrastructure and release pipelines codified in Git rather than manual checklists.',
        order: 2,
      },
      {
        title: 'Right-Sized Complexity',
        description:
          'Choose simple, maintainable topologies aligned to actual team capacity.',
        order: 3,
      },
    ],
    deliverables: [
      {
        title: 'Architecture & Security Blueprints',
        description: 'Documented target topology, IAM boundaries, and network diagrams.',
        order: 1,
      },
      {
        title: 'IaC & CI/CD Repositories',
        description: 'Version-controlled provisioning and automated deployment workflows.',
        order: 2,
      },
      {
        title: 'Operations & Backup Runbooks',
        description: 'Tested recovery procedures, monitoring rules, and team handoff.',
        order: 3,
      },
    ],
    processSteps: [
      {
        stepNumber: '01 · Discover',
        title: 'Infrastructure & Risk Audit',
        description: 'Review current hosting, dependencies, uptime needs, and cost drivers.',
        order: 1,
      },
      {
        stepNumber: '02 · Architect',
        title: 'Target Topology & Sequencing',
        description: 'Design network, identity, and phased transition waves.',
        order: 2,
      },
      {
        stepNumber: '03 · Build & Deploy',
        title: 'Automate & Validate',
        description: 'Provision IaC, CI/CD, and observability with staging verification.',
        order: 3,
      },
      {
        stepNumber: '04 · Manage',
        title: 'Sustain & Optimize',
        description: 'Maintain patches, backups, and cost/performance reviews.',
        order: 4,
      },
    ],
    technologies: [
      { title: 'Linux & Nginx', order: 1 },
      { title: 'Docker & Containers', order: 2 },
      { title: 'Terraform / IaC', order: 3 },
      { title: 'PostgreSQL', order: 4 },
    ],
    faqs: [
      {
        question: 'Can we start with a focused assessment before committing to migration?',
        answer:
          'Yes. Our Cloud & Architecture Readiness Assessment scopes dependencies, risks, and phasing options up front.',
        order: 1,
      },
      {
        question: 'Do you support hybrid environments as well as cloud-only setups?',
        answer:
          'Yes. We design architectures spanning on-premises servers and public cloud providers when regulatory or operational requirements call for it.',
        order: 2,
      },
    ],
    primaryCta: {
      label: 'Get a Quote',
      url: '/contact/get-quote?service=cloud-and-it',
      variant: 'primary',
      isVisible: true,
    },
    secondaryCta: {
      label: 'Request Cloud Assessment',
      url: '/contact/request-assessment?assessment=cloud-readiness',
      variant: 'outline',
      isVisible: true,
    },
    order: 10,
    isFeatured: true,
    isIndexable: true,
    seo: {
      metaTitle: 'Cloud & IT Solutions | NAVOSYS',
      metaDescription:
        'Cloud migration, hybrid cloud, managed IT, infrastructure/DevOps, and IT modernization services.',
      ogImage: cloudImage?.id ?? null,
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
    sections: [
      {
        __component: 'sections.card-grid',
        eyebrow: 'Specialized Cloud & IT Services',
        heading: 'Explore Cloud & IT Practices',
        intro:
          'Select an area below to review specific deliverables, execution workflows, and representative use cases.',
        gridKind: 'services',
        columns: '3',
        items: [
          {
            title: 'Cloud Migration',
            description: 'Phased workload transitions and secure landing zones.',
            href: '/services/cloud-migration',
            ctaLabel: 'View Cloud Migration',
            order: 1,
          },
          {
            title: 'Hybrid Cloud',
            description: 'Consistent networking and portability across on-prem and cloud.',
            href: '/services/hybrid-cloud',
            ctaLabel: 'View Hybrid Cloud',
            order: 2,
          },
          {
            title: 'Managed IT',
            description: 'Proactive patching, monitoring, and verified backup routines.',
            href: '/services/managed-it',
            ctaLabel: 'View Managed IT',
            order: 3,
          },
          {
            title: 'Infrastructure & DevOps',
            description: 'Infrastructure-as-Code, containerization, and CI/CD pipelines.',
            href: '/services/infrastructure-and-devops',
            ctaLabel: 'View DevOps',
            order: 4,
          },
          {
            title: 'IT Modernization',
            description: 'Incremental upgrades retiring brittle legacy infrastructure.',
            href: '/services/it-modernization',
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
        eyebrow: 'Architecture Guidance',
        heading: 'Choosing the Right Transition Strategy',
        primaryColumnLabel: 'Staged Cloud Migration',
        secondaryColumnLabel: 'Incremental IT Modernization',
        rows: [
          {
            feature: 'Primary Driver',
            primaryValue: 'Data center exit, scalability, or managed services adoption',
            secondaryValue: 'Retiring EOL platforms, manual ops, or fragmented security',
            highlight: true,
            order: 1,
          },
          {
            feature: 'Environment Footprint',
            primaryValue: 'Public cloud or hybrid landing zone',
            secondaryValue: 'Existing hosting, hybrid, or containerized target',
            order: 2,
          },
          {
            feature: 'Cutover Approach',
            primaryValue: 'Wave-based migration with staging rehearsal',
            secondaryValue: 'Component-by-component replacement without disruption',
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

  await linkRelatedServices(strapi, cloudPillarId, [
    cloudMigrationId,
    hybridCloudId,
    managedItId,
    devopsId,
    itModernizationId,
  ]);
  await linkRelatedServices(strapi, cloudMigrationId, [
    hybridCloudId,
    devopsId,
    itModernizationId,
  ]);
  await linkRelatedServices(strapi, hybridCloudId, [
    cloudMigrationId,
    managedItId,
    devopsId,
  ]);
  await linkRelatedServices(strapi, managedItId, [
    devopsId,
    itModernizationId,
    hybridCloudId,
  ]);
  await linkRelatedServices(strapi, devopsId, [
    cloudMigrationId,
    managedItId,
    itModernizationId,
  ]);
  await linkRelatedServices(strapi, itModernizationId, [
    cloudMigrationId,
    devopsId,
    managedItId,
  ]);
}
