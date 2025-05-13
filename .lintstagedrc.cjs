module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['pnpm lint:fix', 'pnpm format:fix'],
  '*.{json,md,scss,css,html,yml}': ['pnpm format:fix'],
}
