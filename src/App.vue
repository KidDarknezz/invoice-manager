<template>
  <q-layout view="lHh Lpr lFf" id="app" class="bg-grey-4">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("clientsStore", ["getClients"]),
  },
  mounted() {
    this.getClients();
  },
};
</script>

<style>
#app {
  font-family: "Nunito", sans-serif;
}
.w300 {
  font-weight: 300 !important;
}
.w400 {
  font-weight: 400 !important;
}
.w600 {
  font-weight: 600 !important;
}
.w700 {
  font-weight: 700 !important;
}
</style>
