/** Shared helpers for optional globals updates during seed scripts. */

export function shouldUpdateSeedGlobals(): boolean {
  return process.env.SEED_UPDATE_GLOBALS === '1' || process.argv.includes('--globals')
}
