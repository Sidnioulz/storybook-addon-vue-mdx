function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./dist/preview.mjs')]
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/manager.mjs')]
}

function presets() {
  return [require.resolve('./dist/preset.mjs')]
}

module.exports = {
  managerEntries,
  presets,
  previewAnnotations,
}
