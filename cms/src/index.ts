import type { Core } from '@strapi/strapi';
import { seedGlobalLayout } from './bootstrap/seed-p04';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedGlobalLayout(strapi);
  },
};
