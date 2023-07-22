import { defineStore } from "pinia";

export const useStore = defineStore({
   id: "app",
   state: () => ({
    images: []
   }),
   actions: {
    async fetchAllImages() {
        //replace with import all images from db, maybe not finally see HomePage.vue todo list
        const r = require.context('../assets/v2/images/', false, /\.webp$/);
        const prefix = (process.env.NODE_ENV === 'production') ? '/' : '';
        this.images = r.keys().reduce((json, value) => {json[value] = prefix + r(value); return json; }, {});
    },

    getImgById(id) {
        const idPath = "./" + id + ".webp";
        if (idPath in this.images)
          return this.images[idPath];
        return this.images["./no-photo.webp"];
    }
   }
});