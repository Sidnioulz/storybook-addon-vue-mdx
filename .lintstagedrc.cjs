module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['yarn lint:fix', 'yarn format:fix'],
  '*.{json,md,scss,css,html,yml}': ['yarn format:fix'],
}
