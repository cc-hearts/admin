import { Popover } from 'ant-design-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IPopover',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => (
      <Popover>
        {{
          content: () => props.content || slots?.content?.(),
          default: () => (
            <span class="flex items-center">{slots?.default?.()}</span>
          ),
        }}
      </Popover>
    )
  },
})
