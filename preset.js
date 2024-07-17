function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./dist/preview.cjs')]
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/manager.cjs')]
}

function presets() {
  return [require.resolve('./dist/preset.cjs')]
}

module.exports = {
  managerEntries,
  presets,
  previewAnnotations,
}
