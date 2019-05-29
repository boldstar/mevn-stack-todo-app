<template>
    <header>
        <Processing v-if="processing" />
        <a href="#" class="logo"><i class="far fa-list-alt"></i>TODOX</a>
        <nav>
            <span class="color-mode">Light | Dark</span>
            <div>
                <label class="switch">
                    <input type="checkbox" v-model="colorMode">
                    <span class="slider round"></span>
                </label>
            </div>
        </nav>
    </header>
</template>

<script>
import {mapGetters} from 'vuex'
import Processing from '@/components/Processing'
export default {
    name: 'Navbar',
    data() {
        return {
            colorMode: true,
            width: 0
        }
    },
    components: {
        Processing
    },
    computed: {
        ...mapGetters(['processing'])
    },
    watch: {
        'colorMode': (val) => {
            if(!val) {
                document.documentElement.style.setProperty('--dark', '#f9f9f9');
                document.documentElement.style.setProperty('--light', '#141414');
            } else {
                document.documentElement.style.setProperty('--dark', '#141414');  
                document.documentElement.style.setProperty('--light', '#f9f9f9');  
            }
        },
    },
}
</script>

<style>


.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-top: 10px;
  margin-right: 5px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 2px;
  background-color: var(--light);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--main);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--main);
}

input:checked + .slider:before {
  -webkit-transform: translateX(18px);
  -ms-transform: translateX(18px);
  transform: translateX(18px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.color-mode {
    margin-top: 5px;
    margin-right: 5px;
}
</style>
