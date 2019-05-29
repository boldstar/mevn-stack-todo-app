<template>
    <div class="default-layout">
        <Navbar />
        <main class="default-container">
            <slot />
        </main>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
    name: 'Default',
    components: {
        Navbar
    }
}
</script>