import fs from 'fs';
import path from 'path';
import type { Core } from '@strapi/strapi';

interface BrandAssetSeed {
  fileName: string;
  alternativeText: string;
  caption: string;
}

const BRAND_ASSETS: readonly BrandAssetSeed[] = [
  {
    fileName: 'navosys-logo-light.png',
    alternativeText: 'NAVOSYS logo',
    caption: 'NAVOSYS primary wordmark for light Warm Ivory surfaces',
  },
  {
    fileName: 'navosys-logo-dark.png',
    alternativeText: 'NAVOSYS logo',
    caption: 'NAVOSYS inverted wordmark for Deep Navy surfaces',
  },
  {
    fileName: 'navosys-favicon.png',
    alternativeText: 'NAVOSYS icon',
    caption: 'NAVOSYS square brand icon for favicon and touch metadata',
  },
];

const PUBLIC_READ_ACTIONS = [
  'api::global-setting.global-setting.find',
  'api::navigation-menu.navigation-menu.find',
  'api::navigation-menu.navigation-menu.findOne',
] as const;

async function ensurePublicReadPermissions(strapi: Core.Strapi): Promise<void> {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    return;
  }

  for (const action of PUBLIC_READ_ACTIONS) {
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

async function ensureBrandAsset(
  strapi: Core.Strapi,
  asset: BrandAssetSeed
): Promise<{ id: number } | null> {
  const existing = await strapi.db
    .query('plugin::upload.file')
    .findOne({ where: { name: asset.fileName } });

  if (existing) {
    return { id: existing.id as number };
  }

  const filePath = path.resolve(
    process.cwd(),
    'seed-assets',
    'brand',
    asset.fileName
  );
  if (!fs.existsSync(filePath)) {
    strapi.log.warn(`[seed-p04] Brand asset missing at ${filePath}`);
    return null;
  }

  const stats = fs.statSync(filePath);
  const uploadService = strapi.plugin('upload').service('upload');
  const uploaded = await uploadService.upload({
    data: {
      fileInfo: {
        name: asset.fileName,
        alternativeText: asset.alternativeText,
        caption: asset.caption,
      },
    },
    files: {
      filepath: filePath,
      originalFilename: asset.fileName,
      mimetype: 'image/png',
      size: stats.size,
    },
  });

  if (Array.isArray(uploaded) && uploaded[0]) {
    return { id: uploaded[0].id as number };
  }

  return null;
}

async function ensureGlobalSetting(strapi: Core.Strapi): Promise<void> {
  const existing = await strapi
    .documents('api::global-setting.global-setting')
    .findFirst({ status: 'published' });

  if (existing) {
    return;
  }

  const [logoLight, logoDark, favicon] = await Promise.all(
    BRAND_ASSETS.map((asset) => ensureBrandAsset(strapi, asset))
  );

  await strapi.documents('api::global-setting.global-setting').create({
    status: 'published',
    data: {
      siteName: 'NAVOSYS',
      tagline: "Building What's Next.",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      logoLight: logoLight?.id ?? null,
      logoDark: logoDark?.id ?? null,
      favicon: favicon?.id ?? null,
      announcement: {
        enabled: false,
        text: '',
        ctaLabel: '',
        ctaUrl: '',
        dismissible: true,
      },
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
      contactEmail: 'hello@navosys.in',
      contactPhone: '',
      contactLocation: 'India',
      footerSummary:
        'Enterprise Cloud & IT Solutions, AI & Intelligent Automation, Software Engineering, and Data & Analytics.',
      copyrightText: '© 2026 NAVOSYS. All rights reserved.',
      socialLinks: [
        {
          platform: 'email',
          label: 'Email NAVOSYS',
          url: 'mailto:hello@navosys.in',
          order: 1,
        },
      ],
      legalLinks: [
        {
          label: 'Privacy Policy',
          url: '/privacy',
          isExternal: false,
          openInNewTab: false,
        },
        {
          label: 'Terms of Service',
          url: '/terms',
          isExternal: false,
          openInNewTab: false,
        },
        {
          label: 'Cookie Policy',
          url: '/cookie-policy',
          isExternal: false,
          openInNewTab: false,
        },
      ],
      defaultSeoTitle: "NAVOSYS — Building What's Next.",
      defaultSeoDescription:
        'Enterprise technology services across Cloud & IT Solutions, AI & Intelligent Automation, Software Engineering, and Data & Analytics.',
    },
  });
}

async function ensureNavigationMenus(strapi: Core.Strapi): Promise<void> {
  const navService = strapi.documents('api::navigation-menu.navigation-menu');

  const existingHeader = await navService.findMany({
    filters: { key: 'header' },
    status: 'published',
  });

  if (existingHeader.length === 0) {
    await navService.create({
      status: 'published',
      data: {
        title: 'Primary Header Navigation',
        key: 'header',
        items: [
          {
            label: 'Services',
            url: '/services',
            order: 1,
            isVisible: true,
            isExternal: false,
            children: [
              {
                label: 'Cloud & IT Solutions',
                url: '/services/cloud-and-it',
                description: 'Migration, hybrid cloud, managed IT, and DevOps',
                order: 1,
                isVisible: true,
                isExternal: false,
              },
              {
                label: 'AI & Intelligent Automation',
                url: '/services/ai-and-automation',
                description: 'AI agents, business workflows, and integration',
                order: 2,
                isVisible: true,
                isExternal: false,
              },
              {
                label: 'Software Engineering',
                url: '/services/software-engineering',
                description: 'Web, mobile, enterprise apps, and modernization',
                order: 3,
                isVisible: true,
                isExternal: false,
              },
              {
                label: 'Data & Analytics',
                url: '/services/data-and-analytics',
                description: 'Data engineering, BI, and visualization',
                order: 4,
                isVisible: true,
                isExternal: false,
              },
            ],
          },
          {
            label: 'Industries',
            url: '/industries',
            order: 2,
            isVisible: true,
            isExternal: false,
            children: [],
          },
          {
            label: 'Case Studies',
            url: '/case-studies',
            order: 3,
            isVisible: true,
            isExternal: false,
            children: [],
          },
          {
            label: 'Insights',
            url: '/insights',
            order: 4,
            isVisible: true,
            isExternal: false,
            children: [],
          },
          {
            label: 'About',
            url: '/about',
            order: 5,
            isVisible: true,
            isExternal: false,
            children: [
              {
                label: 'About NAVOSYS',
                url: '/about',
                description: 'Mission, values, and enterprise engineering focus',
                order: 1,
                isVisible: true,
                isExternal: false,
              },
              {
                label: 'Our Approach',
                url: '/approach',
                description: 'Discover, Architect, Build, Deploy, Optimize, Manage',
                order: 2,
                isVisible: true,
                isExternal: false,
              },
            ],
          },
          {
            label: 'Contact',
            url: '/contact',
            order: 6,
            isVisible: true,
            isExternal: false,
            children: [],
          },
        ],
        footerColumns: [],
      },
    });
  }

  const existingFooter = await navService.findMany({
    filters: { key: 'footer' },
    status: 'published',
  });

  if (existingFooter.length === 0) {
    await navService.create({
      status: 'published',
      data: {
        title: 'Primary Footer Navigation',
        key: 'footer',
        items: [],
        footerColumns: [
          {
            title: 'Services',
            order: 1,
            isVisible: true,
            links: [
              {
                label: 'Services Overview',
                url: '/services',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'Cloud & IT Solutions',
                url: '/services/cloud-and-it',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'AI & Intelligent Automation',
                url: '/services/ai-and-automation',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'Software Engineering',
                url: '/services/software-engineering',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'Data & Analytics',
                url: '/services/data-and-analytics',
                isExternal: false,
                openInNewTab: false,
              },
            ],
          },
          {
            title: 'Company',
            order: 2,
            isVisible: true,
            links: [
              {
                label: 'About NAVOSYS',
                url: '/about',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'Our Approach',
                url: '/approach',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'Industries',
                url: '/industries',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'Case Studies',
                url: '/case-studies',
                isExternal: false,
                openInNewTab: false,
              },
            ],
          },
          {
            title: 'Resources & Contact',
            order: 3,
            isVisible: true,
            links: [
              {
                label: 'Insights',
                url: '/insights',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'FAQ',
                url: '/faq',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'Get a Quote',
                url: '/contact/get-quote',
                isExternal: false,
                openInNewTab: false,
              },
              {
                label: 'Book a Consultation',
                url: '/contact/book-consultation',
                isExternal: false,
                openInNewTab: false,
              },
            ],
          },
        ],
      },
    });
  }
}

export async function seedGlobalLayout(strapi: Core.Strapi): Promise<void> {
  await ensurePublicReadPermissions(strapi);
  await ensureGlobalSetting(strapi);
  await ensureNavigationMenus(strapi);
}
