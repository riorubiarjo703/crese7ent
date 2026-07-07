import type { User } from '@/payload-types'

/**
 * User document or a narrow auth object from Payload (e.g. plugin `access` hooks) that may
 * not satisfy the full `User` interface (e.g. missing `createdAt` / `updatedAt`) but carries `roles`.
 */
export type CheckRoleUser = User | null | undefined | { roles?: User['roles'] } | null

export const checkRole = (allRoles: string[] = [], user?: CheckRoleUser): boolean => {
  if (!user?.roles) return false

  const userRoles = user.roles
    .map((role) => {
      if (typeof role === 'string') {
        return role
      }
      // Handle both direct slug access and relationship format
      return role.slug || role
    })
    .filter(Boolean)

  return allRoles.some((role) => userRoles.includes(role))
}
