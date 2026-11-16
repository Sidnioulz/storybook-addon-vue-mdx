#!/usr/bin/env node

/**
 * Publishes the built package as a prerelease for a pull request, under the
 * `canary` dist-tag. Expects `pnpm build` to have run beforehand.
 *
 * Required environment variables:
 * - NPM_TOKEN: an npm token allowed to publish the package
 * - PR_NUMBER: the pull request number
 * - PR_SHA: the head commit SHA of the pull request
 */
import { execFileSync } from 'node:child_process'
import { appendFileSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const { NPM_TOKEN, PR_NUMBER, PR_SHA, GITHUB_STEP_SUMMARY } = process.env

if (!NPM_TOKEN || !PR_NUMBER || !PR_SHA) {
  console.error(
    'NPM_TOKEN, PR_NUMBER and PR_SHA must be set to publish a canary release.',
  )
  process.exit(1)
}

const version = `0.0.0-pr-${PR_NUMBER}-sha-${PR_SHA.slice(0, 8)}`
const { name } = JSON.parse(readFileSync('package.json', 'utf8'))

// npm expands ${NPM_TOKEN} itself, so the token is never written to disk.
const userconfig = join(mkdtempSync(join(tmpdir(), 'npmrc-')), '.npmrc')
writeFileSync(userconfig, '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n')

const run = (command, args) =>
  execFileSync(command, args, { stdio: 'inherit' })

run('npm', ['version', version, '--no-git-tag-version'])
run('npm', ['publish', '--tag', 'canary', '--userconfig', userconfig])

if (GITHUB_STEP_SUMMARY) {
  appendFileSync(
    GITHUB_STEP_SUMMARY,
    `### Canary release\n\n\`\`\`sh\npnpm add -D ${name}@${version}\n\`\`\`\n`,
  )
}
