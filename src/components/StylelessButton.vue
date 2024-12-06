<script setup>
const emit = defineEmits(['click'])
const onClick = () => emit('click')
</script>

<template>
  <button type="button" @click="onClick">
    <slot />
  </button>
</template>
