<template>
  <div class="mx-auto p-4 md:p-8 max-w-4xl">
    <ContentDoc class="dark:prose-invert max-w-none prose">
      <template #not-found>
        <h1>Document not found</h1>
      </template>
    </ContentDoc>
  </div>
</template>

<script setup>
// The ContentDoc component will automatically render the content/index.md file
</script>

<style>
.prose {
  @apply text-gray-900 dark:text-gray-100;
}

.prose h1 {
  @apply mb-8 font-bold text-3xl;
}

.prose h2 {
  @apply mt-8 mb-4 font-bold text-2xl;
}

.prose h3 {
  @apply mt-6 mb-3 font-bold text-xl;
}

.prose ul {
  @apply list-disc list-inside;
}

.prose p {
  @apply mb-4;
}

.dark .prose {
  @apply prose-invert;
}
</style> 