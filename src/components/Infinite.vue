<script setup>
import { ref } from 'vue'
import { postToGetDemo } from '@/api/demo'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { useGlobalState } from '@/composable/useGlobalStore'

const pageNum = ref(1)
const workType = ref('MM')
const { globalErrorHandler } = useGlobalState()

// const getDemo = async (data) => {
//   try {
//     const res = await postToGetDemo(data)
//     return res.data.data
//   } catch (error) {
//     console.log(error)
//   }
// }

const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isPending } =
  useInfiniteQuery({
    queryKey: ['projects', { page: pageNum, type: workType }],
    queryFn: postToGetDemo({ page: pageNum, type: workType }),
    getNextPageParam: (lastPage, pages) => {
      console.log('lastPage:', lastPage)
      console.log('pages:', pages)
      console.log('lastPage.nextCursor:', lastPage.nextCursor)
      return lastPage.nextCursor
    },
    throwOnError: globalErrorHandler,
  })
</script>

<template>
  <span v-if="isPending">Loading...</span>
  <div v-else-if="data">
    <span v-if="isFetching && !isFetchingNextPage">Fetching...</span>
    <ul v-for="(group, index) in data.pages" :key="index">
      <li v-for="project in group.projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
    <button @click="() => fetchNextPage()" :disabled="!hasNextPage || isFetchingNextPage">
      <span v-if="isFetchingNextPage">Loading more...</span>
      <span v-else-if="hasNextPage">Load More</span>
      <span v-else>Nothing more to load</span>
    </button>
  </div>
</template>
