import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
// import { z } from 'zod';
import fetch from 'node-fetch';
import { Config } from '@backstage/config';


function extractPipelineIdFromUrl(url: string): string {
  const regex = /\/pipelines\/(\d+)/;
  const match = url.match(regex);
  if (!match || match.length < 2) {
    throw new Error('Invalid pipeline URL, could not extract pipeline ID');
  }
  return match[1];
}


export function createGitlabPipelineStatusAction({ config }: { config: Config }) {

  return createTemplateAction({
    id: 'custom:gitlab-pipeline-status',
    description: 'Check GitLab pipeline status and return success or failure',
    schema: {
      input: (z) =>
        z.object({
        projectId: z.string().describe('GitLab project ID or URL-encoded path'),
        pipelineUrl: z.string().describe('GitLab Full pipeline URL'),
      }),
    },
    async handler(ctx) {
      const projectId = ctx.input.projectId;
      const pipelineId = extractPipelineIdFromUrl(ctx.input.pipelineUrl);
      const logger = ctx.logger;

      // Read GitLab token from app config
      const gitlabIntegrations = config.getConfigArray('integrations.gitlab');
      const integration = gitlabIntegrations.find(
        i => i.getString('host') === 'gitlab.com'
      );
      const gitlabToken = integration?.getOptionalString('token');

      const timeout = 10 * 60 * 1000; // 10 minutes
      const interval = 15 * 1000; // 15 seconds
      const startTime = Date.now();

      logger.info(`Checking GitLab pipeline status for project ${projectId}, pipeline ${pipelineId}`);

      while (true) {
        const url = `https://gitlab.com/api/v4/projects/${encodeURIComponent(projectId)}/pipelines/${pipelineId}`;

        if (!gitlabToken) {
          throw new Error('Missing GitLab token');
        }
        
        const res = await fetch(url, {
          headers: {
            'PRIVATE-TOKEN': gitlabToken,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch pipeline status: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        const status = data.status;

        logger.info(`Pipeline status: ${status}`);

        if (status === 'success') {
          logger.info(`Pipeline completed successfully ✅`);
          return;
        } else if (status === 'failed' || status === 'canceled') {
          throw new Error(`Pipeline failed or was canceled ❌`);
        }

        if (Date.now() - startTime > timeout) {
          throw new Error(`Timeout exceeded while waiting for pipeline status ❌`);
        }

        logger.info(`Waiting ${interval / 1000}s before next status check...`);
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    },
  });
}

