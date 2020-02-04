<template>
  <div id="app" class="pt-16 px-6 md:p-24 md:mx-auto md:max-w-3xl">
    <div class="text-xl md:text-3xl font-light">
      <span
        v-html="emoji"
        class="inline-block text-center mr-1"
        style="min-width: 44px"
      ></span>
      <span class="text-white text-normal">Emojicon</span>: use any emoji as
      favicon.
    </div>
    <div class="mt-6">
      <Prism language="javascript">{{ code }}</Prism>
    </div>
    <div class="mt-8">
      <canvas
        ref="canvas"
        width="32"
        height="32"
        style="width: 64px; height: 64px; background-color: beige"
      ></canvas>
    </div>
    <div class="mt-8">
      <button
        class="inline-block px-4 py-2 border border-yellow-500 bg-yellow-500 text-black mr-2 active:bg-yellow-700"
        @click="setRandomEmoji"
      >
        Random emoji
      </button>
      <a
        class="inline-block px-4 py-2 border border-yellow-500 text-yellow-500 mr-2"
        >Documentation</a
      >
    </div>
    <div class="mt-6 text-gray-700 text-sm">
      Created by
      <a
        class="underline hover:text-yellow-500 focus:text-yellow-500"
        href="https://twitter.com/JosephusPaye"
        target="_blank"
        rel="noopener"
        >Josephus Paye II</a
      >
      for
      <a
        class="underline hover:text-yellow-500 focus:text-yellow-500"
        href="https://twitter.com/JosephusPaye/status/1214853295023411200"
        target="_blank"
        rel="noopener"
        >#CreateWeekly</a
      >. Available on
      <a
        class="underline hover:text-yellow-500 focus:text-yellow-500"
        href="https://github.com/JosephusPaye/emojicon"
        target="_blank"
        rel="noopener"
        >GitHub</a
      >.
    </div>
  </div>
</template>

<script>
import 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import Prism from 'vue-prism-component';

import * as emojicon from '../lib/index.js';

const codeToEmoji = (function() {
  let div;
  return code => {
    div = div === undefined ? document.createElement('div') : div;
    div.innerHTML = `&#${code};`;
    return div.innerHTML;
  };
})();

export default {
  name: 'app',

  components: {
    Prism,
  },

  data() {
    return {
      emoji: '🔥',
      emojiRange: [
        [128513, 128591],
        [9986, 10160],
        [128640, 128704],
      ],
    };
  },

  computed: {
    code() {
      return `import emojicon from 'emojicon';\n\nemojicon.set('${this.emoji}');`;
    },
  },

  watch: {
    emoji: {
      handler(emoji) {
        emojicon.set(emoji, {
          canvas: this.canvas,
          color: this.getEmojiColor(),
        });
      },
      immediate: true,
    },
  },

  mounted() {
    this.canvas = this.$refs.canvas;
    emojicon.set(this.emoji, { canvas: this.canvas });
  },

  methods: {
    setRandomEmoji() {
      this.emoji = this.randomEmoji();
    },

    getEmojiColor() {
      if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? '#fff'
          : '#000';
      }
      return '#000';
    },

    randomEmoji() {
      const [lower, upper] = this.emojiRange[
        this.randomNumber(0, this.emojiRange.length - 1)
      ];
      const emojiCode = this.randomNumber(lower, upper);
      return codeToEmoji(emojiCode);
    },

    randomNumber(min, max) {
      return Math.floor(Math.random() * (1 + max - min)) + min;
    },
  },
};
</script>

<style lang="scss">
@import './assets/tailwind.css';

body {
  color: rgba(255, 255, 255, 0.8);
  background-color: #000;
}

pre[class*='language-'] {
  border-radius: 0;
  box-shadow: none;
  border: 2px solid hsl(0, 0%, 10%);
  margin: 0;
}

pre[class*='language-'],
code[class*='language-'] {
  font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  font-size: 14px;

  @screen md {
    font-size: 1em;
  }
}
</style>
