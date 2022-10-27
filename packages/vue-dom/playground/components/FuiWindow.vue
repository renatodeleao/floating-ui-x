<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="fui-window">
    <div class="fui-window__toolbar">
      <div class="fui-window__toolbar-lights">
        <span role="presentation"></span>
        <span role="presentation"></span>
        <span role="presentation"></span>
      </div>
      <h1 class="fui-window__toolbar-title">{{ title }}</h1>
    </div>
    <div class="fui-window__dom">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.fui-window {
  position: relative;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  min-height: 300px;

  &__toolbar {
    flex: none;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    text-align: center;
    align-items: center;
    height: 40px;
    padding: 0 12px;
    background: rgb(220, 223, 236);
  }

  &__toolbar-lights {
    display: flex;
    gap: 4px;

    > * {
      border-radius: 999px;
      height: 16px;
      width: 16px;
      display: block;

      &:nth-child(1) {
        background: rgb(236, 105, 94);
      }
      &:nth-child(2) {
        background: rgb(244, 191, 79);
      }
      &:nth-child(3) {
        background: rgb(97, 198, 83);
      }
    }
  }

  &__toolbar-title {
    font-size: 1rem;
    margin: 0;
    font-weight: 700;
  }

  &__dom {
    padding: 16px;
    flex: 1 0 0%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
