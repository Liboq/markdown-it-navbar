<template>
  <div :class="anchorClass">
    <a
      :class="
        indexActive === index ? 'anchor-item anchor-item-active' : 'anchor-item'
      "
      :style="style"
      @click="indexActive = index"
      v-for="(item, index) in menuText"
      :key="index"
      :href="'#' + slugify(item)"
    >
      {{ item }}</a
    >
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import MarkdownIt from 'markdown-it';
import { slugify } from 'transliteration';
import { throttle } from 'lodash';
const regExe = /<h2(([\s\S])*?)<\/h2>/g;
const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  classes: {
    type: String,
    default: ''
  },
  style: {
    type: [Object, String],
    default: ''
  },
  target:{
    type:String,
    default:'h2'
  }
});
const indexActive = ref(0);
const anchorClass = computed((a) => {
  return {
    'anchor-list': !props.classes,
    [`${props.classes}`]: props.classes
  };
});
const html = ref('');
const menu = ref();
html.value = MarkdownIt().render(props.content);
menu.value = html.value.match(regExe);
let menuText = ref(['']);
menuText.value.pop();
menu.value.forEach((item: any) => {
  let s = '';
  let reg = new RegExp(`<${props.target}(([\s\S])*?)>`,'g');
  console.log(reg);
  s = item.replace(`</${props.target}>`, '').replace(reg, '');
  if (s.indexOf('</span>') !== -1)
    s = s.replace('</span>', '').replace(/<span(([\s\S])*?)>/g, ''); // 过滤其他标签
  menuText.value.push(s);
});
const scrollTop = ref(0);
const winScroll = throttle(() => {
  document.addEventListener('scroll', winScroll, false);
  scrollTop.value =
    document.documentElement.scrollTop || document.body.scrollTop;
  for (let value of menuText.value) {
    if (document.getElementById(slugify(value))) {
      const entry = document.getElementById(slugify(value)) as HTMLElement;
      if (entry.offsetTop <= scrollTop.value) {
        indexActive.value = menuText.value.indexOf(value);
      }
    }
  }
}, 10);
const getActiveIndex = () => {
  winScroll();
};

onMounted(() => {
  getActiveIndex();
});
onUnmounted(() => {
  document.removeEventListener('scroll', winScroll, false);
});
</script>

<style lang="scss">
.anchor-list  {
  margin: 10px;
  padding: 10px;
  position: fixed;
  transform: translateY(-50%);
  top: 50%;
  right: 10px;
  user-select: none;
  width: 300px;
  display: flex;
  flex-direction: column;
   .anchor-item {
    border-radius: 20px;
    padding: 10px 20px;
    margin: 10px;
    background-color: #b9e9c6;
    color: #000;
    text-decoration: none;
    &:hover {
      color: #af441a;
    }
    &-active {
      background-color: #77ce8e;
    }
  }
}
</style>
