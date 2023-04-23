<template>
  <div :style="{ height }" :class="anchorClass">
    <div v-if="title" class="anchor-title">{{ title }}</div>
    <li
      :class="'li-h' + item.level"
      v-for="(item, index) in menuText"
      :key="index"
      :style="style"
    >
      <a
        :class="
          indexActive === index
            ? 'anchor-item anchor-item-active'
            : 'anchor-item'
        "
        @click="indexActive = index"
        :href="'#' + slugify(item.text)"
      >
        {{ item.text }}</a
      >
    </li>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import MarkdownIt from "markdown-it";
import { slugify } from "transliteration";
import { throttle } from "lodash";
const regExe = /<h\d(([\s\S])*?)<\/h\d>/g;
const props = defineProps({
  container:{
    type:String,
    default:''
  },
  content: {
    type: String,
    default: "",
  },
  classes: {
    type: [String, Object],
    default: "",
  },
  style: {
    type: [Object, String],
    default: "",
  },
  target: {
    type: Array,
    default: ["h2", "h3", "h4", "h5"],
  },
  title: {
    type: String,
    default: "内容",
  },
  height: {
    type: String,
    default: "",
  },
});
type MenuText = {
  text: string;
  level: number;
};
const indexActive = ref(0);
const html = ref("");
const menu = ref();
const anchorClass = computed(() => {
  if (typeof props.classes === "string") {
    return {
      "anchor-container": true,
      "anchor-list": !props.classes,
      [`${props.classes}`]: props.classes,
    };
  } else {
    return {
      "anchor-container": true,
      ...props.classes,
    };
  }
});
if(props.container){
  html.value = document.querySelector(props.container)!.innerHTML
}else{
  html.value = MarkdownIt().render(props.content);
}
menu.value = html.value.match(regExe);

let menuText = ref<Array<MenuText>>([]);
menuText.value.pop();
menu.value.forEach((item: string) => {
  let s = "";
  let index;
  let reg = new RegExp(/<h\d(([\s\S])*?)>/, "g");
  s = item.replace(/<\/h\d>/, "").replace(reg, "");
  index = props.target.indexOf(item.split("")[1] + item.split("")[2]);
  if (index === -1) {
    return;
  }
  if (s.indexOf("</span>") !== -1) {
    s = s.replace("</span>", "").replace(/<span(([\s\S])*?)>/g, ""); // 过滤其他标签
  }

  menuText.value.push({ text: s, level: index + 1 });
});
const scrollTop = ref(0);
const winScroll = throttle(() => {
  document.addEventListener("scroll", winScroll, false);
  scrollTop.value =
    document.documentElement.scrollTop || document.body.scrollTop;
  for (let value of menuText.value) {
    if (document.getElementById(slugify(value.text))) {
      const entry = document.getElementById(slugify(value.text)) as HTMLElement;
      if (entry.offsetTop - 1 <= scrollTop.value) {
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
  document.removeEventListener("scroll", winScroll, false);
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 500px) {
  .anchor-list {
    display: none !important;
  }
}
.anchor-title {
  font-weight: 600;
  margin-bottom: 5px;
}
.anchor-container {
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar {
    background-color: #57b2ff;
    height: 0;
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #57b2ff;
    border-radius: 4px;
    height: 0;
    width: 0;
  }
}
.anchor-list {
  margin: 10px;
  padding: 10px;
  position: fixed;
  top: 60px;
  right: 10px;
  user-select: none;
  width: 300px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: #fff;
}
li {
  margin-bottom: 20px;
}
.li-h2 {
  margin-left: 20px;
}
.li-h3 {
  margin-left: 20px;
}
.li-h4 {
  margin-left: 40px;
}
.li-h5 {
  margin-left: 60px;
}
.anchor-item {
  border-radius: 20px;
  //   background-color: #b9e9c6;
  color: #000;
  text-decoration: none;
  &:hover {
    color: #af441a;
  }
  &-active {
    // background-color: #77ce8e;
    color: red;
  }
}
</style>
