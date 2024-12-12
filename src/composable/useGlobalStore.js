import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'
import { refreshToken } from '@/api/demo'
import { useQueryClient } from '@tanstack/vue-query'

export const useGlobalState = createGlobalState(() => {
  const token = ref('AABBB')

  const queryClient = useQueryClient()

  const globalErrorHandler = async (error, query) => {
    console.log('error:', error)
    console.log('query:', query)
    if (error.status === 401) {
      const res = await refreshToken()
      token.value = res.data.token
      queryClient.invalidateQueries('workList')
      return false
    } else if (error.message === 'Network Error') {
      console.log('!!!!!!!!!!!!!!!Network Error!!!!!!!!!!!!!!!!!!')
      alert('發生錯誤!')
      return true
    }
    alert('發生錯誤!')
    return true
  }

  return {
    token,
    globalErrorHandler,
  }
})
