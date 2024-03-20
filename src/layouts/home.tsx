import { defineComponent } from 'vue'
import SideMenu from '@/layouts/menu'
import Headers from './headers/headers.vue'
import IPopover from '@/components/i-popover/IPopover'
import Module from '@/icons/module.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    return () => (
      <div class="h-full">
        <div class="flex h-full">
          <SideMenu />
          <div class="flex-1 flex flex-col">
            <Headers>
              {{
                'right-icon': () => (
                  <IPopover content={t('common.config')}>
                    <Module />
                  </IPopover>
                ),
              }}
            </Headers>
            <div class="flex-1">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    )
  },
})
