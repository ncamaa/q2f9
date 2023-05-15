<template>
  <q-item clickable tag="a" @click="handleClick">
    <q-item-section v-if="icon" avatar>
      <q-icon
        :color="routeName === $route.name ? 'primary' : 'inherit'"
        :name="icon"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    routeName: {
      type: String,
      default: '',
    },

    icon: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick() {
      if (this.routeName) {
        this.$router.push({ name: this.routeName });
        return;
      }
      window.location.href = this.link;
    },
  },
});
</script>
