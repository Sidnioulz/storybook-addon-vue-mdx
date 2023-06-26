<template>
  <span class="tag">{{ label }}</span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()

defineOptions({
  name: 'DemoTag',
})
</script>

<style scoped>
.tag {
  background-color: rgb(233, 209, 255);
  border-radius: 4px;
  box-sizing: border-box;
  color: rgb(78, 25, 148);
  display: inline-block;
  font-size: 16px;
  height: 24px;
  line-height: 1;
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  padding: 4px 6px;
  text-overflow: ellipsis;
  overflow-wrap: nowrap;
  white-space: collapse;
}
</style>
