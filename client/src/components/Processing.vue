<template>
    <div class="processing-bar" v-if="processing"  :style="`width: ${progress}%`"></div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Processing',
    data() {
        return {
            startProcess: true,
            progress: 0,
            done: false
        }
    },
    computed: {
        ...mapGetters(['processing'])
    },
    methods: {
        startProgress() {
            var vm = this
            var width = 20
            var increase = setInterval(() => {
            vm.progress += width
            if(vm.progress >= 100) {
                clearInterval(increase);
                this.done = true
            }
        }, 200)
      }
    },
    mounted() {
      this.startProgress()
    }
}
</script>

<style>
.processing-bar {
    position: absolute;
    background: var(--main);
    height: 7px;
    left: 0;
    top: 0;
    transition: width 1s;
}
</style>
