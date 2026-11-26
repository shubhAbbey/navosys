import type { Core } from '@strapi/strapi';
import { seedGlobalLayout } from './bootstrap/seed-p04';
import { seedRoutingFoundation } from './bootstrap/seed-p05';
import { seedSectionBuilderFixture } from './bootstrap/seed-p06';
import { seedHomepage } from './bootstrap/seed-p07';
import { seedServicesOverview } from './bootstrap/seed-p08';
import { seedCloudAndItServices } from './bootstrap/seed-p09';
import { seedAiAndAutomationServices } from './bootstrap/seed-p10';
import { seedSoftwareEngineeringServices } from './bootstrap/seed-p11';
import { seedDataAnalyticsServices } from './bootstrap/seed-p12';
import { seedAboutAndApproach } from './bootstrap/seed-p13';
import { seedIndustries } from './bootstrap/seed-p14';
import { seedCaseStudies } from './bootstrap/seed-p15';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedGlobalLayout(strapi);
    await seedRoutingFoundation(strapi);
    await seedSectionBuilderFixture(strapi);
    await seedHomepage(strapi);
    await seedServicesOverview(strapi);
    await seedCloudAndItServices(strapi);
    await seedAiAndAutomationServices(strapi);
    await seedSoftwareEngineeringServices(strapi);
    await seedDataAnalyticsServices(strapi);
    await seedAboutAndApproach(strapi);
    await seedIndustries(strapi);
    await seedCaseStudies(strapi);
  },
};
