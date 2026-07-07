/**
 * Global teardown for Playwright tests
 * Nothing to clean up — the e2e MongoDB database is ephemeral in CI
 * and wiped between runs by the fresh service container.
 */
async function globalTeardown() {
  // No-op: CI uses a fresh MongoDB container per run.
  // Local dev: test data persists intentionally for re-runs.
}

export default globalTeardown
