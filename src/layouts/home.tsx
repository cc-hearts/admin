import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <main class=" flex-1 min-h-0 text-gray-700 dark:text-gray-200 flex-1 flex flex-col min-h-0">
        <router-view />
      </main>
    )
  },
})
