import type { Core } from '@strapi/strapi';
import { seedGlobalLayout } from './bootstrap/seed-p04';
import { seedRoutingFoundation } from './bootstrap/seed-p05';
import { seedSectionBuilderFixture } from './bootstrap/seed-p06';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedGlobalLayout(strapi);
    await seedRoutingFoundation(strapi);
    await seedSectionBuilderFixture(strapi);
  },
};
