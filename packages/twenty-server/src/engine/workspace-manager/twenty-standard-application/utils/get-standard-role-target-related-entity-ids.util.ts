import { v4 } from 'uuid';

import { STANDARD_ROLE_TARGET } from 'src/engine/workspace-manager/twenty-standard-application/constants/standard-role-target.constant';
import { type AllStandardRoleTargetName } from 'src/engine/workspace-manager/twenty-standard-application/types/all-standard-role-target-name.type';
import { type AllStandardRoleTargetTypeName } from 'src/engine/workspace-manager/twenty-standard-application/types/all-standard-role-target-type-name.type';
import { type StandardRoleTargetRelatedEntityIds } from 'src/engine/workspace-manager/twenty-standard-application/utils/role-target-metadata/create-standard-role-target-flat-metadata.util';

export const getStandardRoleTargetRelatedEntityIds =
  (): StandardRoleTargetRelatedEntityIds => {
    const result = {} as StandardRoleTargetRelatedEntityIds;

    for (const roleTargetTypeName of Object.keys(
      STANDARD_ROLE_TARGET,
    ) as AllStandardRoleTargetTypeName[]) {
      result[roleTargetTypeName] = {} as Record<
        AllStandardRoleTargetName<typeof roleTargetTypeName>,
        { id: string }
      >;

      for (const roleTargetName of Object.keys(
        STANDARD_ROLE_TARGET[roleTargetTypeName],
      ) as AllStandardRoleTargetName<typeof roleTargetTypeName>[]) {
        result[roleTargetTypeName][roleTargetName] = { id: v4() };
      }
    }

    return result;
  };

