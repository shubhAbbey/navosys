import fs from 'fs';
import path from 'path';
import type { Core } from '@strapi/strapi';

export interface SeedMediaInput {
  folderSegments: string[];
  fileName: string;
  alternativeText: string;
  caption: string;
  mimetype?: string;
}

/**
 * Idempotently uploads a local seed asset into the Strapi Media Library.
 */
export async function ensureSeedMediaAsset(
  strapi: Core.Strapi,
  asset: SeedMediaInput
): Promise<{ id: number } | null> {
  const existing = await strapi.db
    .query('plugin::upload.file')
    .findOne({ where: { name: asset.fileName } });

  if (existing) {
    return { id: existing.id as number };
  }

  const filePath = path.resolve(
    process.cwd(),
    ...asset.folderSegments,
    asset.fileName
  );
  if (!fs.existsSync(filePath)) {
    strapi.log.warn(`[media-helper] Seed asset missing at ${filePath}`);
    return null;
  }

  const stats = fs.statSync(filePath);
  const uploadService = strapi.plugin('upload').service('upload');
  const uploaded = (await uploadService.upload({
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
      mimetype: asset.mimetype ?? 'image/png',
      size: stats.size,
    },
  })) as { id?: number } | Array<{ id?: number }> | null | undefined;

  const first = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  if (first && typeof first.id === 'number') {
    return { id: first.id };
  }

  const fallback = await strapi.db
    .query('plugin::upload.file')
    .findOne({ where: { name: asset.fileName } });
  if (fallback && typeof fallback.id === 'number') {
    return { id: fallback.id };
  }

  return null;
}
