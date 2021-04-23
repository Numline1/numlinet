<template>
  <div class="container px-4 mx-auto">
    <h1 class="mb-8 text-3xl">Blog</h1>
    <article-list
      :articles="paginatedArticles"
      :article-count="articleCount"
      :articles-per-page="articlesPerPage"
    />
  </div>
</template>

<script>
import ArticleList from '@/components/blog/ArticleList'

export default {
  components: {
    ArticleList,
  },
  async asyncData({ $content, app, params, error }) {
    const page = parseInt(params.page)

    const articlesPerPage = 6

    const allArticles = await $content('articles').fetch()

    const articleCount = allArticles.length

    const articlesToSkip = () => {
      if (page === 1) {
        return 0
      }
      if (page === lastPage) {
        return articleCount - lastPageCount
      }

      return (page - 1) * articlesPerPage
    }

    const lastPage = Math.ceil(articleCount / articlesPerPage)

    const lastPageCount = articleCount % articlesPerPage

    const paginatedArticles = await $content('articles')
      .only(['title', 'slug', 'description', 'imgSmall', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .skip(articlesToSkip())
      .limit(articlesPerPage)
      .fetch()

    return {
      articlesPerPage,
      articleCount,
      paginatedArticles,
    }
  },
  head: {
    title: 'Blog | Numlinet',
  },
}
</script>
