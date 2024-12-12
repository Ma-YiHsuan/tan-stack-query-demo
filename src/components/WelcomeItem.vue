<template>
  <div class="item">
    <h3>TanStack Query Demo</h3>
    <p>Current Page: {{ pageNum }} | Previous data: {{ isPlaceholderData }}</p>
    <div v-show="isLoading" class="load">Loading...</div>
    <div v-show="isPending" class="load">isPending...</div>
    <div v-show="!isLoading" v-for="work in workList" :key="work.workId">
      <div>{{ work.theme }}</div>
    </div>
    <div class="page-btn">
      <a @click="() => (pageNum = 1)">1</a>
      <a @click="() => (pageNum = 2)">2</a>
    </div>
    <div>
      <button @click="() => (workType = 'all')">ALL</button>
      <button @click="() => (workType = 'MM')">MM</button>
      <button @click="() => (workType = 'WT')">WT</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import { postToGetDemo } from '@/api/demo'
import { useGlobalState } from '@/composable/useGlobalStore'

// const getWorkList = async () => {
//   try {
//     const res = await postToGetDemo({ page: 1, type: 'MM' })
//     console.log(res)
//     workList.value = res.data.data.workList
//   } catch (error) {
//     console.log(error)
//   }
// }
// getWorkList()

const pageNum = ref(1)
const workType = ref('MM')
const { globalErrorHandler } = useGlobalState()

const { data, isFetching, isLoading, isPending, isPlaceholderData } = useQuery({
  queryKey: ['workList', { page: pageNum, type: workType }],
  queryFn: () => postToGetDemo({ page: pageNum.value, type: workType.value }),
  // placeholderData: keepPreviousData,
  throwOnError: globalErrorHandler,
})

const workList = computed(() => {
  // console.log('觸發！', data.value?.data?.data?.workList)
  return data.value?.data?.data?.workList || []
})

watch(isFetching, (newVal) => {
  console.log('isFetching:', newVal)
})
</script>

<style scoped>
.item {
  position: relative;
  color: white;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

p {
  margin-bottom: 1rem;
}

.page-btn {
  margin-top: 1rem;
}
.page-btn:hover {
  cursor: pointer;
}
.load {
  margin-bottom: 3rem;
}
</style>
