import type { Core } from '@strapi/strapi';

type CollectionUid =
  | 'api::service.service'
  | 'api::industry.industry'
  | 'api::case-study.case-study';

export async function ensurePublicReadPermissions(
  strapi: Core.Strapi,
  actions: readonly string[]
): Promise<void> {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    return;
  }

  for (const action of actions) {
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

type GenericDocApi = {
  findMany: (params?: Record<string, unknown>) => Promise<Array<Record<string, unknown>>>;
  findOne: (params?: Record<string, unknown>) => Promise<Record<string, unknown> | null>;
  create: (params: Record<string, unknown>) => Promise<{ documentId: string }>;
  update: (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
};

function getCollectionDocs(strapi: Core.Strapi, uid: CollectionUid): GenericDocApi {
  return strapi.documents(uid) as unknown as GenericDocApi;
}

export async function ensurePublishedCollectionEntry(
  strapi: Core.Strapi,
  uid: CollectionUid,
  basePath: string,
  slug: string,
  data: Record<string, unknown>
): Promise<string> {
  const docs = getCollectionDocs(strapi, uid);
  const existing = await docs.findMany({
    filters: { slug },
    status: 'published',
    populate: ['featuredImage'],
  });

  if (existing.length > 0) {
    const current = existing[0] as {
      documentId: string;
      featuredImage?: unknown;
    };
    if (!current.featuredImage && data.featuredImage) {
      await docs.update({
        documentId: current.documentId,
        status: 'published',
        data: {
          featuredImage: data.featuredImage,
          ...(data.featuredImageAlt
            ? { featuredImageAlt: data.featuredImageAlt }
            : {}),
        },
      });
    }
    return current.documentId;
  }

  const created = await docs.create({
    status: 'published',
    data: {
      ...data,
      slug,
      fullPath: `${basePath}/${slug}`,
    },
  });

  return created.documentId;
}

export async function ensurePublishedRelationField(
  strapi: Core.Strapi,
  uid: CollectionUid,
  documentId: string,
  relationField: string,
  relatedDocumentIds: string[]
): Promise<void> {
  if (relatedDocumentIds.length === 0) {
    return;
  }
  const docs = getCollectionDocs(strapi, uid);
  const existing = await docs.findOne({
    documentId,
    status: 'published',
    populate: [relationField],
  });

  const currentLinks = existing?.[relationField];
  if (Array.isArray(currentLinks) && currentLinks.length > 0) {
    return;
  }

  await docs.update({
    documentId,
    status: 'published',
    data: {
      [relationField]: relatedDocumentIds,
    },
  });
}

export async function ensurePublishedPageEntry(
  strapi: Core.Strapi,
  fullPath: string,
  data: Record<string, unknown>
): Promise<void> {
  const pages = strapi.documents('api::page.page');
  const existing = await pages.findMany({
    filters: { fullPath },
    status: 'published',
    populate: ['sections'],
  });

  if (existing.length > 0) {
    const current = existing[0] as {
      documentId: string;
      sections?: unknown[];
    };
    if (!Array.isArray(current.sections) || current.sections.length === 0) {
      await pages.update({
        documentId: current.documentId,
        status: 'published',
        data: data as Parameters<typeof pages.update>[0]['data'],
      });
    }
    return;
  }

  await pages.create({
    status: 'published',
    data: {
      ...data,
      fullPath,
    } as Parameters<typeof pages.create>[0]['data'],
  });
}

export async function findPublishedIdsBySlugs(
  strapi: Core.Strapi,
  uid: CollectionUid,
  slugs: string[]
): Promise<string[]> {
  const docs = getCollectionDocs(strapi, uid);
  const found = (await docs.findMany({
    filters: { slug: { $in: slugs } },
    status: 'published',
  })) as Array<{ slug?: string; documentId: string }>;

  const map = new Map(found.map((item) => [item.slug, item.documentId]));
  return slugs
    .map((slug) => map.get(slug))
    .filter((id): id is string => Boolean(id));
}
