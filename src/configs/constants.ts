import { ref } from "vue";
import { useIsDark } from "@/hooks";
export const defaultNamespace = "cc";

export const isDark = ref(useIsDark());

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const githubUrl = "https://github.com/cc-hearts/vue3-starter.git";
