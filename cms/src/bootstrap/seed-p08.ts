import type { Core } from '@strapi/strapi';

const PUBLIC_SERVICE_ACTIONS = [
  'api::service.service.find',
  'api::service.service.findOne',
] as const;

async function ensurePublicServicePermissions(
  strapi: Core.Strapi
): Promise<void> {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    return;
  }

  for (const action of PUBLIC_SERVICE_ACTIONS) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({
        where: {
          action,
          role: publicRole.id,
        },
      });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      });
    }
  }
}

async function ensureServicesOverviewPage(strapi: Core.Strapi): Promise<void> {
  const pageService = strapi.documents('api::page.page');
  const existing = await pageService.findMany({
    filters: { fullPath: '/services' },
    status: 'published',
  });

  if (existing.length > 0) {
    return;
  }

  await pageService.create({
    status: 'published',
    data: {
      title: 'Services Overview',
      slug: 'services',
      fullPath: '/services',
      pageType: 'services_overview',
      summary:
        'End-to-end engineering services across Cloud & IT Solutions, AI & Intelligent Automation, Software Engineering, and Data & Analytics.',
      showBreadcrumbs: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Services | NAVOSYS — Enterprise Technology Capabilities',
        metaDescription:
          'Explore NAVOSYS services across Cloud & IT Solutions, AI & Intelligent Automation, Software Engineering, and Data & Analytics.',
        noIndex: false,
        noFollow: false,
        structuredDataType: 'CollectionPage',
      },
      sections: [
        {
          __component: 'sections.hero',
          eyebrow: 'Service Catalog',
          heading: 'Technology Services Built for Dependable Delivery',
          subheading:
            'Explore our four core engineering pillars—from resilient cloud infrastructure and governed AI automation to custom software and decision-ready analytics.',
          alignment: 'left',
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
          surface: 'ivory',
          spacing: 'default',
          isVisible: true,
          sortOrder: 1,
        },
        {
          __component: 'sections.cta-banner',
          eyebrow: 'Need Guidance?',
          heading: 'Not Sure Which Engagement Model Fits Best?',
          body: 'Schedule a consultation to review your current architecture, constraints, and practical next steps.',
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
          sortOrder: 99,
        },
      ],
    },
  });
}

async function ensureBaselineFeaturedServices(
  strapi: Core.Strapi
): Promise<void> {
  const serviceDoc = strapi.documents('api::service.service');
  const existing = await serviceDoc.findMany({ status: 'published' });

  if (existing.length > 0) {
    return;
  }

  const readiness = await serviceDoc.create({
    status: 'published',
    data: {
      title: 'Cloud & Architecture Readiness Assessment',
      slug: 'cloud-readiness-assessment',
      fullPath: '/services/cloud-readiness-assessment',
      pillar: 'cloud-and-it',
      summary:
        'Structured baseline evaluation of infrastructure reliability, security posture, and cloud migration sequencing.',
      description:
        'Our Cloud & Architecture Readiness Assessment establishes a clear, documented technical baseline before major infrastructure transitions or platform investments.',
      capabilities: [
        {
          title: 'Infrastructure & Dependency Inventory',
          description: 'Map workloads, data stores, network boundaries, and operational risks.',
          order: 1,
        },
        {
          title: 'Phased Modernization Roadmap',
          description: 'Sequence low-risk transition milestones with rollback safeguards.',
          order: 2,
        },
      ],
      benefits: [
        {
          title: 'Reduced Migration Uncertainty',
          description: 'Identify bottlenecks and compatibility constraints prior to cutover.',
          order: 1,
        },
      ],
      deliverables: [
        {
          title: 'Architecture Readiness Brief',
          description: 'Documented findings, target topology options, and prioritized action plan.',
          order: 1,
        },
      ],
      processSteps: [
        {
          stepNumber: '01',
          title: 'Discovery Review',
          description: 'Review existing environments, telemetry, and reliability goals.',
          order: 1,
        },
        {
          stepNumber: '02',
          title: 'Architecture Blueprint',
          description: 'Deliver target options, sequencing, and operational recommendations.',
          order: 2,
        },
      ],
      technologies: [
        { title: 'Docker & Containers', order: 1 },
        { title: 'Infrastructure as Code', order: 2 },
      ],
      useCases: [
        {
          title: 'Pre-Migration Baseline',
          description: 'Organizations preparing legacy workloads for hybrid or public cloud.',
          order: 1,
        },
      ],
      faqs: [
        {
          question: 'How does the assessment integrate with existing IT teams?',
          answer:
            'We work alongside your internal engineering and operations owners so all findings and documentation transfer cleanly.',
          order: 1,
        },
      ],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=cloud-readiness-assessment',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=cloud-readiness-assessment',
        variant: 'outline',
        isVisible: true,
      },
      order: 1,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Cloud & Architecture Readiness Assessment | NAVOSYS',
        metaDescription:
          'Structured evaluation of cloud readiness, infrastructure reliability, and phased modernization.',
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    },
  });

  await serviceDoc.create({
    status: 'published',
    data: {
      title: 'Technical Advisory & Solution Architecture',
      slug: 'technical-advisory',
      fullPath: '/services/technical-advisory',
      pillar: 'software-engineering',
      summary:
        'Independent system design, technology selection, and architecture reviews for software, AI, and data initiatives.',
      description:
        'Technical Advisory & Solution Architecture helps leadership and engineering teams align system design, security boundaries, and delivery milestones before committing full build capacity.',
      capabilities: [
        {
          title: 'System & API Architecture Design',
          description: 'Clean service boundaries, data modeling, and integration patterns.',
          order: 1,
        },
      ],
      deliverables: [
        {
          title: 'Architecture Decision Records',
          description: 'Clear trade-off documentation and implementation milestones.',
          order: 1,
        },
      ],
      relatedServices: [readiness.documentId],
      primaryCta: {
        label: 'Get a Quote',
        url: '/contact/get-quote?service=technical-advisory',
        variant: 'primary',
        isVisible: true,
      },
      secondaryCta: {
        label: 'Book a Consultation',
        url: '/contact/book-consultation?service=technical-advisory',
        variant: 'outline',
        isVisible: true,
      },
      order: 2,
      isFeatured: true,
      isIndexable: true,
      seo: {
        metaTitle: 'Technical Advisory & Solution Architecture | NAVOSYS',
        metaDescription:
          'Independent system design and architecture reviews across software, AI, and data platforms.',
        noIndex: false,
        noFollow: false,
        structuredDataType: 'WebPage',
      },
    },
  });
}

export async function seedServicesOverview(strapi: Core.Strapi): Promise<void> {
  await ensurePublicServicePermissions(strapi);
  await ensureServicesOverviewPage(strapi);
  await ensureBaselineFeaturedServices(strapi);
}
