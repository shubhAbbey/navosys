import type { Core } from '@strapi/strapi';

export async function ensurePublishedService(
  strapi: Core.Strapi,
  slug: string,
  data: Record<string, unknown>
): Promise<string> {
  const serviceDocs = strapi.documents('api::service.service');
  const existing = await serviceDocs.findMany({
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
      const backfill = {
        featuredImage: data.featuredImage,
        ...(data.featuredImageAlt
          ? { featuredImageAlt: data.featuredImageAlt }
          : {}),
      } as Parameters<typeof serviceDocs.update>[0]['data'];
      await serviceDocs.update({
        documentId: current.documentId,
        status: 'published',
        data: backfill,
      });
    }
    return current.documentId;
  }

  const payload = {
    ...data,
    slug,
    fullPath: `/services/${slug}`,
  } as Parameters<typeof serviceDocs.create>[0]['data'];

  const created = await serviceDocs.create({
    status: 'published',
    data: payload,
  });

  return created.documentId;
}

export async function linkRelatedServices(
  strapi: Core.Strapi,
  documentId: string,
  relatedDocumentIds: string[]
): Promise<void> {
  const serviceDocs = strapi.documents('api::service.service');
  const existing = await serviceDocs.findOne({
    documentId,
    status: 'published',
    populate: ['relatedServices'],
  });

  const currentRelated = (
    existing as { relatedServices?: Array<{ documentId: string }> } | null
  )?.relatedServices;

  if (Array.isArray(currentRelated) && currentRelated.length > 0) {
    return;
  }

  const updatePayload = {
    relatedServices: relatedDocumentIds,
  } as Parameters<typeof serviceDocs.update>[0]['data'];

  await serviceDocs.update({
    documentId,
    status: 'published',
    data: updatePayload,
  });
}
