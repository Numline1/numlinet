<template>
  <div class="grid w-1/3 grid-cols-5 gap-2 mx-auto">
    <nuxt-link
      :to="{ name: 'blog-page-page', params: { page: 1 } }"
      class="p-2 text-center text-gray-100 bg-primary-gray"
      :class="{ 'bg-gray-500': currentPage === 1 }"
    >
      First
    </nuxt-link>

    <nuxt-link
      :to="{ name: 'blog-page-page', params: { page: prevPage } }"
      class="p-2 text-center text-gray-100 bg-primary-gray"
      :class="{ 'bg-gray-500': currentPage === 1 }"
    >
      Previous
    </nuxt-link>

    <div class="p-2 text-center">{{ currentPage }} / {{ totalPages }}</div>

    <nuxt-link
      :to="{ name: 'blog-page-page', params: { page: nextPage } }"
      class="p-2 text-center text-gray-100 bg-primary-gray"
      :class="{ 'bg-gray-500': currentPage === totalPages }"
    >
      Next
    </nuxt-link>

    <nuxt-link
      :to="{ name: 'blog-page-page', params: { page: totalPages } }"
      class="p-2 text-center text-gray-100 bg-primary-gray"
      :class="{ 'bg-gray-500': currentPage === totalPages }"
    >
      Last
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    articleCount: {
      type: Number,
      default: 0,
    },
    articlesPerPage: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.articleCount / this.articlesPerPage)
    },
    currentPage() {
      return parseInt(this.$route.params.page) || 1
    },
    prevPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : 1
    },
    nextPage() {
      return this.currentPage < this.totalPages
        ? this.currentPage + 1
        : this.totalPages
    },
  },
}
</script>
