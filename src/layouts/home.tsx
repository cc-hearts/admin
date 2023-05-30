import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (<main class="m-auto text-gray-700 dark:text-gray-200">
      <router-view />
    </main>)
  }
})