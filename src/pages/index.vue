<script setup>
import Parent from '../components/one-way/parent.vue';
import ParentModel from '../components/model/parent.vue';
import ParentModelHandmade from '../components/model-handmade/parent.vue';
import FancyButton from '../components/slot/FancyButton.vue';
import { ref } from 'vue';
import Drawer from '../components/Drawer.vue';

const showDrawer = ref(false);
const placement = ref('right');
function openDrawer(_placement) {
  placement.value = _placement;
  showDrawer.value = true;
}
</script>

<template>
  <!-- <h1>use prop + event</h1>
  <Parent />
  <h1>use model</h1>
  <ParentModel />
  <h1>use model handmade</h1>
  <ParentModelHandmade />

  <FancyButton> Log In </FancyButton> -->

  <button @click="openDrawer('top')">Top</button>
  <button @click="openDrawer('right')">Right</button>
  <button @click="openDrawer('bottom')">Bottom</button>
  <button @click="openDrawer('left')">Left</button>
  <Drawer
    v-model="showDrawer"
    :placement="placement"
  >
    Drawer {{ placement }}
  </Drawer>
</template>
