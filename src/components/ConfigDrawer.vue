<script setup lang="ts">
import { computed, h, defineComponent } from 'vue'
import { Settings, CircleCheck, RotateCcw } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables/use-theme'
import { useLayout, type Collapsible } from '@/composables/use-layout'
import { useDirection } from '@/composables/use-direction'
import { useSidebar } from '@/composables/use-sidebar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import IconThemeLight from '@/assets/custom/IconThemeLight.vue'
import IconThemeDark from '@/assets/custom/IconThemeDark.vue'
import IconThemeSystem from '@/assets/custom/IconThemeSystem.vue'
import IconSidebarInset from '@/assets/custom/IconSidebarInset.vue'
import IconSidebarFloating from '@/assets/custom/IconSidebarFloating.vue'
import IconSidebarSidebar from '@/assets/custom/IconSidebarSidebar.vue'
import IconLayoutDefault from '@/assets/custom/IconLayoutDefault.vue'
import IconLayoutCompact from '@/assets/custom/IconLayoutCompact.vue'
import IconLayoutFull from '@/assets/custom/IconLayoutFull.vue'
import IconDir from '@/assets/custom/IconDir.vue'

const sidebar = useSidebar()
const theme = useTheme()
const layout = useLayout()
const dirApi = useDirection()

const radioLayoutValue = computed(() =>
  sidebar?.open?.value ? 'default' : layout.collapsible.value,
)

function handleReset() {
  sidebar?.setOpen?.(true)
  dirApi.resetDir()
  theme.resetTheme()
  layout.resetLayout()
}

const SectionTitle = defineComponent({
  name: 'SectionTitle',
  props: {
    title: { type: String, required: true },
    showReset: { type: Boolean, default: false },
    onReset: { type: Function as unknown as () => void, required: false },
    class: { type: String, required: false },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          class: cn(
            'mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground',
            props.class,
          ),
        },
        [
          props.title,
          props.showReset && props.onReset
            ? h(
                'button',
                {
                  class:
                    'inline-flex size-4 items-center justify-center rounded-full border bg-secondary text-secondary-foreground',
                  onClick: props.onReset as any,
                  'aria-label': 'Reset',
                },
                [h(RotateCcw, { class: 'size-3' })],
              )
            : null,
        ],
      )
  },
})
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <button
        class="inline-flex size-8 w-[32px] h-[32px] p-[6px] items-center justify-center rounded-full hover:bg-muted"
        aria-label="Open theme settings"
        aria-describedby="config-drawer-description"
      >
        <Settings aria-hidden="true" />
      </button>
    </SheetTrigger>
    <SheetContent class="flex flex-col">
      <SheetHeader class="pb-0 text-start">
        <SheetTitle>Theme Settings</SheetTitle>
        <SheetDescription id="config-drawer-description">
          Adjust the appearance and layout to suit your preferences.
        </SheetDescription>
      </SheetHeader>

      <div class="space-y-6 overflow-y-auto px-4">
        <!-- Theme -->
        <SectionTitle
          :title="'Theme'"
          :showReset="theme.theme.value !== theme.defaultTheme"
          @reset="
            () => {
              theme.setTheme(theme.defaultTheme)
            }
          "
        />
        <div class="grid w-full max-w-md grid-cols-3 gap-4">
          <button
            class="group outline-none transition duration-200 ease-in"
            aria-label="Select system"
            aria-describedby="system-description"
            @click="theme.setTheme('system')"
          >
            <div
              class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
              :class="
                theme.theme.value === 'system' ? 'shadow-2xl ring-primary' : ''
              "
            >
              <CircleCheck
                class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                :class="theme.theme.value !== 'system' ? 'hidden' : ''"
              />
              <IconThemeSystem aria-hidden="true" />
            </div>
            <div class="mt-1 text-xs" id="system-description">System</div>
          </button>

          <button
            class="group outline-none transition duration-200 ease-in"
            aria-label="Select light"
            aria-describedby="light-description"
            @click="theme.setTheme('light')"
          >
            <div
              class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
              :class="
                theme.theme.value === 'light' ? 'shadow-2xl ring-primary' : ''
              "
            >
              <CircleCheck
                class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                :class="theme.theme.value !== 'light' ? 'hidden' : ''"
              />
              <IconThemeLight aria-hidden="true" />
            </div>
            <div class="mt-1 text-xs" id="light-description">Light</div>
          </button>

          <button
            class="group outline-none transition duration-200 ease-in"
            aria-label="Select dark"
            aria-describedby="dark-description"
            @click="theme.setTheme('dark')"
          >
            <div
              class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
              :class="
                theme.theme.value === 'dark' ? 'shadow-2xl ring-primary' : ''
              "
            >
              <CircleCheck
                class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                :class="theme.theme.value !== 'dark' ? 'hidden' : ''"
              />
              <IconThemeDark aria-hidden="true" />
            </div>
            <div class="mt-1 text-xs" id="dark-description">Dark</div>
          </button>
        </div>

        <!-- Sidebar variant -->
        <div class="max-md:hidden">
          <SectionTitle
            :title="'Sidebar'"
            :showReset="layout.defaultVariant !== layout.variant.value"
            @reset="
              () => {
                layout.setVariant(layout.defaultVariant)
              }
            "
          />
          <div class="grid w-full max-w-md grid-cols-3 gap-4">
            <button
              class="group outline-none transition duration-200 ease-in"
              @click="layout.setVariant('inset')"
            >
              <div
                class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
                :class="
                  layout.variant.value === 'inset'
                    ? 'shadow-2xl ring-primary'
                    : ''
                "
              >
                <CircleCheck
                  class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  :class="layout.variant.value !== 'inset' ? 'hidden' : ''"
                />
                <IconSidebarInset aria-hidden="true" />
              </div>
              <div class="mt-1 text-xs">Inset</div>
            </button>
            <button
              class="group outline-none transition duration-200 ease-in"
              @click="layout.setVariant('floating')"
            >
              <div
                class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
                :class="
                  layout.variant.value === 'floating'
                    ? 'shadow-2xl ring-primary'
                    : ''
                "
              >
                <CircleCheck
                  class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  :class="layout.variant.value !== 'floating' ? 'hidden' : ''"
                />
                <IconSidebarFloating aria-hidden="true" />
              </div>
              <div class="mt-1 text-xs">Floating</div>
            </button>
            <button
              class="group outline-none transition duration-200 ease-in"
              @click="layout.setVariant('sidebar')"
            >
              <div
                class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
                :class="
                  layout.variant.value === 'sidebar'
                    ? 'shadow-2xl ring-primary'
                    : ''
                "
              >
                <CircleCheck
                  class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  :class="layout.variant.value !== 'sidebar' ? 'hidden' : ''"
                />
                <IconSidebarSidebar aria-hidden="true" />
              </div>
              <div class="mt-1 text-xs">Sidebar</div>
            </button>
          </div>
        </div>

        <!-- Layout collapsible -->
        <div class="max-md:hidden">
          <SectionTitle
            :title="'Layout'"
            :showReset="radioLayoutValue !== 'default'"
            @reset="
              () => {
                sidebar?.setOpen?.(true)
                layout.setCollapsible(layout.defaultCollapsible)
              }
            "
          />
          <div class="grid w-full max-w-md grid-cols-3 gap-4">
            <button
              class="group outline-none transition duration-200 ease-in"
              @click="sidebar?.setOpen?.(true)"
            >
              <div
                class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
                :class="
                  radioLayoutValue === 'default'
                    ? 'shadow-2xl ring-primary'
                    : ''
                "
              >
                <CircleCheck
                  class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  :class="radioLayoutValue !== 'default' ? 'hidden' : ''"
                />
                <IconLayoutDefault aria-hidden="true" />
              </div>
              <div class="mt-1 text-xs">Default</div>
            </button>
            <button
              class="group outline-none transition duration-200 ease-in"
              @click="
                () => {
                  sidebar?.setOpen?.(false)
                  layout.setCollapsible('icon' as Collapsible)
                }
              "
            >
              <div
                class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
                :class="
                  radioLayoutValue === 'icon' ? 'shadow-2xl ring-primary' : ''
                "
              >
                <CircleCheck
                  class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  :class="radioLayoutValue !== 'icon' ? 'hidden' : ''"
                />
                <IconLayoutCompact aria-hidden="true" />
              </div>
              <div class="mt-1 text-xs">Compact</div>
            </button>
            <button
              class="group outline-none transition duration-200 ease-in"
              @click="
                () => {
                  sidebar?.setOpen?.(false)
                  layout.setCollapsible('offcanvas' as Collapsible)
                }
              "
            >
              <div
                class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
                :class="
                  radioLayoutValue === 'offcanvas'
                    ? 'shadow-2xl ring-primary'
                    : ''
                "
              >
                <CircleCheck
                  class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  :class="radioLayoutValue !== 'offcanvas' ? 'hidden' : ''"
                />
                <IconLayoutFull aria-hidden="true" />
              </div>
              <div class="mt-1 text-xs">Full layout</div>
            </button>
          </div>
        </div>

        <!-- Direction -->
        <SectionTitle
          :title="'Direction'"
          :showReset="dirApi.defaultDir !== dirApi.dir.value"
          @reset="() => dirApi.setDir(dirApi.defaultDir)"
        />
        <div class="grid w-full max-w-md grid-cols-3 gap-4">
          <button
            class="group outline-none transition duration-200 ease-in"
            @click="dirApi.setDir('ltr')"
          >
            <div
              class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
              :class="
                dirApi.dir.value === 'ltr' ? 'shadow-2xl ring-primary' : ''
              "
            >
              <CircleCheck
                class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                :class="dirApi.dir.value !== 'ltr' ? 'hidden' : ''"
              />
              <IconDir dir="ltr" aria-hidden="true" />
            </div>
            <div class="mt-1 text-xs">Left to Right</div>
          </button>
          <button
            class="group outline-none transition duration-200 ease-in"
            @click="dirApi.setDir('rtl')"
          >
            <div
              class="relative rounded-[6px] ring-[1px] ring-border group-focus-visible:ring-2"
              :class="
                dirApi.dir.value === 'rtl' ? 'shadow-2xl ring-primary' : ''
              "
            >
              <CircleCheck
                class="size-6 fill-primary stroke-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                :class="dirApi.dir.value !== 'rtl' ? 'hidden' : ''"
              />
              <IconDir dir="rtl" aria-hidden="true" />
            </div>
            <div class="mt-1 text-xs">Right to Left</div>
          </button>
        </div>
      </div>

      <SheetFooter class="gap-2">
        <button
          class="inline-flex justify-center text-white cursor-pointer items-center gap-2 rounded-md bg-destructive px-3 py-2 text-destructive-foreground"
          @click="handleReset"
          aria-label="Reset all settings to default values"
        >
          Reset
        </button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
