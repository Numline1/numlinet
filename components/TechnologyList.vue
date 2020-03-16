<template>
  <div class="py-12 text-gray-700">
    <p class="mt-4 text-3xl text-center">
      Tech stack
    </p>

    <div
      class="container mx-auto flex flex-wrap justify-center items-center mt-12 mb-4"
    >
      <technology-list-entry
        v-for="technology in technologies"
        :key="technology.id"
        :technology="technology"
      ></technology-list-entry>
    </div>
  </div>
</template>

<script>
import TechnologyListEntry from '@/components/TechnologyListEntry'

export default {
  components: {
    TechnologyListEntry
  },

  data: () => ({
    technologies: [
      { id: 1, name: 'macOS', icon: 'icons/macos.svg' },
      { id: 2, name: 'VSCode', icon: 'icons/vscode.svg' },
      { id: 3, name: 'Go', icon: 'icons/go.svg' },
      { id: 4, name: 'gRPC', icon: 'icons/grpc.svg' },
      { id: 5, name: 'PHP', icon: 'icons/php.svg' },
      { id: 6, name: 'Laravel', icon: 'icons/laravel.svg' },
      { id: 7, name: 'JavaScript', icon: 'icons/javascript.svg' },
      { id: 8, name: 'NodeJS', icon: 'icons/nodejs.svg' },
      { id: 9, name: 'NuxtJS (VueJS)', icon: 'icons/vuejs.svg' },
      { id: 10, name: 'SQL', icon: 'icons/postgresql.svg' },
      { id: 11, name: 'Docker', icon: 'icons/docker.svg' },
      { id: 12, name: 'Kubernetes', icon: 'icons/kubernetes.svg' },
      { id: 13, name: 'GCP', icon: 'icons/google.svg' },
      { id: 14, name: 'AWS', icon: 'icons/aws.svg' },
      { id: 15, name: 'Git', icon: 'icons/git.svg' },
      { id: 16, name: 'CI/CD', icon: 'icons/gitlab.svg' }
    ]
  })
}
</script>
