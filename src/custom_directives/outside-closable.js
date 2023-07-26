import { toRef } from "vue";

export const ClosableDirective = {
    mounted(el, binding) {
        const handleOutsideClick = (e) => {
            e.stopPropagation();
            const { handler, exclude } = binding.value;

            let clickedOnExcludedEl = false;
            exclude.forEach((refName) => {
                if (!clickedOnExcludedEl) {
                    const excludedEl = toRef(refName);
                    clickedOnExcludedEl = e.target.outerHTML.includes(excludedEl.value)
                }
            });

            if (!el.contains(e.target) && !clickedOnExcludedEl) {
                binding.instance[handler]();
            }
        };

        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('touchstart', handleOutsideClick);

        el._handleOutsideClick = handleOutsideClick
    },
    beforeUnmount(el) {
        window.removeEventListener('click', el._handleOutsideClick);
        window.removeEventListener('touchstart', el._handleOutsideClick);
    },    
};