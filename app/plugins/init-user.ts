import { defineNuxtPlugin } from "#app";
import { useUserStore } from "~/stores/useUserStore";

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();
  if (!userStore.user) {
    await userStore.initUser();
  }
});
