<script setup>
import { ref } from 'vue';
import {
  FuiBox,
  FuiWindow,
  FuiButton,
  FuiTooltip,
  FuiTooltipReference,
  FuiTooltipFloating,
  FuiTooltipArrow,
} from '../components';

function test() {
  window.alert('boo');
}
const dynamicOffset = ref(10);
</script>

<template>
  <FuiBox
    title="Compound component"
    description="Wrapping useFloating under a declarative api"
  >
    <FuiWindow title="Basic">
      <button @click="dynamicOffset++">
        Increase offset {{ dynamicOffset }}
      </button>
      <FuiTooltip>
        <FuiTooltipReference asTemplate #="{ isOpen }">
          <FuiButton @click="test">
            I'm the reference: {{ isOpen ? 'Open' : 'Closed' }}
          </FuiButton>
        </FuiTooltipReference>
        <teleport to="body">
          <FuiTooltipFloating :offset="dynamicOffset" class="fui-floating">
            <FuiTooltipArrow class="fui-arrow" />
            I'm floating
          </FuiTooltipFloating>
        </teleport>
      </FuiTooltip>
    </FuiWindow>
  </FuiBox>
</template>
