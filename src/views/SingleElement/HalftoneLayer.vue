<template>
    <div class="halftone"></div>
</template>

<script>
    export default {
        name: "HalftoneLayer",
        props: [
            'color',
            'size',
            'repeat',
            'borderRadius',
            'width',
            'height',
            'transform',
            'top', 'right', 'bottom', 'left'
        ]
    }
</script>

<style scoped>
    .halftone {
        position: absolute;
        z-index: 90;

        min-width: v-bind(width);
        max-width: v-bind(width);
        min-height: v-bind(height);
        max-height: v-bind(height);
        transform: v-bind(transform);

        top: v-bind(top);
        right: v-bind(right);
        bottom: v-bind(bottom);
        left: v-bind(left);

        border-radius: v-bind(borderRadius);

        -webkit-mask-image: url("@/assets/icons/halftone.png");
        mask-image: url("@/assets/icons/halftone.png");
        -webkit-mask-size: v-bind(size);
        mask-size: v-bind(size);
        -webkit-mask-repeat: v-bind(repeat);
        mask-repeat: v-bind(repeat);

        background-color: v-bind(color);

        transition: all 250ms cubic-bezier(0.33, 1, 0.6, 1);
    }
</style>