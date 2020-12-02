<template>
  <div class="flex flex-col space-y-4">
    <div
      v-for="article in articles"
      :key="article.slug"
      class="border border-gray-300 rounded-lg"
    >
      <nuxt-link :to="{ name: 'blog-slug', params: { slug: article.slug } }">
        <div class="flex flex-col w-full md:flex-row">
          <img
            class="h-48 rounded-tl-lg rounded-tr-lg md:rounded-bl-lg md:rounded-tr-none"
            :src="article.imgSmall"
            :alt="article.title"
          />
          <div class="p-4">
            <h2 class="text-2xl">{{ article.title }}</h2>
            <p class="mb-8 text-sm text-gray-700">
              Created at: {{ humanDate(article.createdAt) }}
            </p>
            <p>{{ article.description }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>
    <pagination
      v-if="articleCount > articlesPerPage"
      :article-count="articleCount"
      :articles-per-page="articlesPerPage"
    />
  </div>
</template>

<script>
import Pagination from '@/components/blog/Pagination'
export default {
  components: {
    Pagination,
  },
  props: {
    articles: {
      type: Array,
      default: Array,
    },
    articleCount: {
      type: Number,
      default: 0,
    },
    articlesPerPage: {
      type: Number,
      default: 5,
    },
  },
  methods: {
    humanDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
