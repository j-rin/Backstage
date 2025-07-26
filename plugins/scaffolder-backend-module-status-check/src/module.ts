import { createBackendModule, coreServices} from "@backstage/backend-plugin-api";
import { scaffolderActionsExtensionPoint  } from '@backstage/plugin-scaffolder-node/alpha';
import { createGitlabPipelineStatusAction} from "./actions/gitlabPipelineStatusAction";

/**
 * A backend module that registers the action into the scaffolder
 */
export const scaffolderModule = createBackendModule({
  moduleId: 'gitlab-custom-action',
  pluginId: 'scaffolder',
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolderActions: scaffolderActionsExtensionPoint,
        config: coreServices.rootConfig,
      },
      async init({ scaffolderActions, config}) {
        scaffolderActions.addActions(createGitlabPipelineStatusAction({ config: config}));
      }
    });
  },
})
