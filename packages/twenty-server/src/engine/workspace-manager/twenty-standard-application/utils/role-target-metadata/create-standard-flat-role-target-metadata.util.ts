import { type FlatRoleTarget } from 'src/engine/metadata-modules/flat-role-target/types/flat-role-target.type';
import { type AllStandardAgentName } from 'src/engine/workspace-manager/twenty-standard-application/types/all-standard-agent-name.type';
import { type AllStandardRoleName } from 'src/engine/workspace-manager/twenty-standard-application/types/all-standard-role-name.type';
import { type AllStandardRoleTargetName } from 'src/engine/workspace-manager/twenty-standard-application/types/all-standard-role-target-name.type';
import { type AllStandardRoleTargetTypeName } from 'src/engine/workspace-manager/twenty-standard-application/types/all-standard-role-target-type-name.type';
import {
  type CreateStandardRoleTargetArgs,
  createStandardRoleTargetFlatMetadata,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/role-target-metadata/create-standard-role-target-flat-metadata.util';

const AGENT_TO_ROLE_MAPPING: Partial<
  Record<AllStandardAgentName, AllStandardRoleName>
> = {
  dashboardBuilder: 'dashboardManager',
  dataManipulator: 'dataManipulator',
  metadataBuilder: 'dataModelManager',
  workflowBuilder: 'workflowManager',
};

const createAgentRoleTargetBuilder = <
  A extends AllStandardRoleTargetName<'agent'>,
>(
  agentName: A,
): ((
  args: Omit<CreateStandardRoleTargetArgs<'agent'>, 'context'>,
) => FlatRoleTarget | null) => {
  const roleName = AGENT_TO_ROLE_MAPPING[agentName];

  if (!roleName) {
    return () => null;
  }

  return (args) =>
    createStandardRoleTargetFlatMetadata({
      ...args,
      context: {
        roleTargetTypeName: 'agent',
        roleTargetName: agentName,
        roleName,
        agentName,
      },
    });
};

export const STANDARD_FLAT_ROLE_TARGET_METADATA_BUILDERS = {
  agent: {
    dashboardBuilder: createAgentRoleTargetBuilder('dashboardBuilder'),
    dataManipulator: createAgentRoleTargetBuilder('dataManipulator'),
    helper: createAgentRoleTargetBuilder('helper'),
    metadataBuilder: createAgentRoleTargetBuilder('metadataBuilder'),
    researcher: createAgentRoleTargetBuilder('researcher'),
    workflowBuilder: createAgentRoleTargetBuilder('workflowBuilder'),
  },
} satisfies {
  [T in AllStandardRoleTargetTypeName]: {
    [N in AllStandardRoleTargetName<T>]: (
      args: Omit<CreateStandardRoleTargetArgs<'agent'>, 'context'>,
    ) => FlatRoleTarget | null;
  };
};
