import { fileURLToPath } from 'node:url'

/**
 * Loads the built addon in this Storybook instance. Preview annotations are
 * registered in `preview.ts` instead, as CSF 4 projects only read them there.
 */
export function managerEntries(entry: string[] = []) {
  return [...entry, fileURLToPath(import.meta.resolve('../dist/manager.js'))]
}

export * from '../dist/preset.js'
