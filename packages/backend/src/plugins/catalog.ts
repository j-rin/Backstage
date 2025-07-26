// packages/backend/src/plugins/catalog.ts
// import { GitlabFillerProcessor } from '@immobiliarelabs/backstage-plugin-gitlab-backend';
// import { GitLabDiscoveryProcessor } from '@backstage/plugin-catalog-backend-module-gitlab';
// import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
// import { Router } from 'express';
// import { PluginEnvironment } from '../types';

// export default async function createPlugin(
//     env: PluginEnvironment
// ): Promise<Router> {
//     const builder = await CatalogBuilder.create(env);
//     builder.addProcessor(
//         GitLabDiscoveryProcessor.fromConfig(env.config, { logger: env.logger }),
//       );
//     //...
//     // Add this line
//     builder.addProcessor(new GitlabFillerProcessor(env.config));
//     //...
//     const { processingEngine, router } = await builder.build();
//     await processingEngine.start();
//     return router;
// }

// import { GitlabDiscoveryEntityProvider } from '@backstage/plugin-catalog-backend-module-gitlab';
// import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
// import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
// import { Router } from 'express';
// import { PluginEnvironment } from '../types';

// export default async function createPlugin(
//   env: PluginEnvironment,
// ): Promise<Router> {
//   const builder = await CatalogBuilder.create(env);

//   builder.addEntityProvider(
//     ...GitlabDiscoveryEntityProvider.fromConfig(env.config, {
//       logger: env.logger,
//       scheduler: env.scheduler,
//     }),
//   );
  
//   builder.addProcessor(new ScaffolderEntitiesProcessor());
//   const {processingEngine, router } = await builder.build();
//   await processingEngine.start();
//   return router;
// }

// import { GitlabDiscoveryEntityProvider } from '@backstage/plugin-catalog-backend-module-gitlab';
// import { Router } from 'express';
// import { PluginEnvironment } from '../types';


// export default async function createPlugin(
//   env: PluginEnvironment,
// ): Promise<Router> {
//   const builder = await CatalogBuilder.create(env);
//   builder.addEntityProvider(
//     ...GitlabDiscoveryEntityProvider.fromConfig(env.config, {
//       logger: env.logger,
//       // optional: alternatively, use scheduler with schedule defined in app-config.yaml
//       schedule: env.scheduler.createScheduledTaskRunner({
//         frequency: { minutes: 30 },
//         timeout: { minutes: 3 },
//       }),
//       // optional: alternatively, use schedule
//       scheduler: env.scheduler,
//     }),
//   );
//   // ..
// }


// import { Router } from 'express';
// import { PluginEnvironment } from '../types';
// import { GitlabDiscoveryEntityProvider } from '@backstage/plugin-catalog-backend-module-gitlab';
// import { CatalogBuilder } from '@backstage/plugin-catalog-backend';

// export default async function createPlugin(
//   env: PluginEnvironment,
// ): Promise<Router> {
//   const builder = await CatalogBuilder.create(env);

//   const gitlabProviders = await GitlabDiscoveryEntityProvider.fromConfig(env.config, {
//     logger: env.logger,
//     schedule: env.scheduler.createScheduledTaskRunner({
//       frequency: { minutes: 30 },
//       timeout: { minutes: 3 },
//     }),
//     scheduler: env.scheduler,
//   });

//   builder.addEntityProvider(...gitlabProviders);

//   const { router } = await builder.build();
//   return router;
// }

// import { GitlabFillerProcessor } from '@immobiliarelabs/backstage-plugin-gitlab-backend';

// export default async function createPlugin(
//     env: PluginEnvironment
// ): Promise<Router> {
//     const builder = await CatalogBuilder.create(env);
//     //...
//     // Add this line
//     builder.addProcessor(new GitlabFillerProcessor(env.config));
//     //...
//     const { processingEngine, router } = await builder.build();
//     await processingEngine.start();
//     return router;
// }