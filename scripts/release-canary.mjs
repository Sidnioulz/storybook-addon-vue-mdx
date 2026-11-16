#!/usr/bin/env node

/**
 * Publishes the built package as a prerelease for a pull request, under the
 * `canary` dist-tag. Expects `pnpm build` to have run beforehand.
 *
 * The version is `<next patch>--canary.<PR number>.<run id>.0`, based on the
 * latest published version.
 *
 * npm authenticates through trusted publishing, so this must run in the
 * GitHub Actions workflow registered as the package's trusted publisher, with
 * the `id-token: write` permission.
 *
 * Required environment variables:
 * - PR_NUMBER: the pull request number
 * - GITHUB_RUN_ID: the workflow run id, set by GitHub Actions
 *
 * Set DRY_RUN to any value to run `npm publish --dry-run`.
 */
import { execFileSync } from 'node:child_process'
import { appendFileSync, readFileSync } from 'node:fs'

const { PR_NUMBER, GITHUB_RUN_ID, GITHUB_STEP_SUMMARY, DRY_RUN } = process.env

if (!PR_NUMBER || !GITHUB_RUN_ID) {
  console.error(
    'PR_NUMBER and GITHUB_RUN_ID must be set to publish a canary release.',
  )
  process.exit(1)
}

const { name } = JSON.parse(readFileSync('package.json', 'utf8'))

const latest = execFileSync('npm', ['view', name, 'version'], {
  encoding: 'utf8',
}).trim()

if (!/^\d+\.\d+\.\d+$/.test(latest)) {
  console.error(`Unexpected latest version for ${name}: ${latest}`)
  process.exit(1)
}

const [major, minor, patch] = latest.split('.').map(Number)
const version = `${major}.${minor}.${patch + 1}--canary.${PR_NUMBER}.${GITHUB_RUN_ID}.0`

const run = (command, args) =>
  execFileSync(command, args, { stdio: 'inherit' })

run('npm', ['version', version, '--no-git-tag-version'])
run('npm', ['publish', '--tag', 'canary', ...(DRY_RUN ? ['--dry-run'] : [])])

if (GITHUB_STEP_SUMMARY) {
  appendFileSync(
    GITHUB_STEP_SUMMARY,
    `### Canary release\n\n\`\`\`sh\npnpm add -D ${name}@${version}\n\`\`\`\n`,
  )
}
