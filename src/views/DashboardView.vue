<template>
  <div>
    <div class="text-emerald-400 text-3xl font-semibold underline">Kids</div>
    <div class="grid lg:grid-cols-2 gap-4 md:grid-cols-1">
        <div v-for="kid in kids" :key="kid.id" class="border-2 m-2 rounded border-double">
            <router-link :to="`/kid/${kid.id}`" :kid="kid">
                <div class="text-emerald-400 font-bold">
                    <span class="inline-flex">
                        <div v-if="images.includes(kid.name)">
                            <img class="w-7 h-7 rounded-full" :src="require(`../assets/${kid.name}.png`)" alt="image" />
                        </div>
                        <div v-else>
                            <img class="w-7 h-7 rounded-full" :src="require(`../assets/default_profile.png`)" alt="image" />
                        </div>
                        {{kid.name}}
                    </span>
                </div>
                <ul>
                    <li v-for="chore in kid.chores" :key="chore.id" class="list-disc list-inside">
                        <span v-if="`${chore.done}` == 'true'" class="line-through">{{chore.chore}}</span>
                        <span v-else>{{chore.chore}}</span>
                    </li>
                </ul>  
            </router-link>  
        </div>
    </div>
    <form @submit.prevent="addKid">
        <input type="text" ref="name" class="form-input rounded m-2">
        <button class="bg-emerald-400 rounded-full p-2">Add Kid</button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase'
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

export default {
    data() {
        return {
            kids: [],
            images: []
        };
    },
    methods: {
        async fetchKids() {
            let that = this;
            const querySnapshotKids = await getDocs(collection(db, "kids"));
            const choresRef = collection(db, "chores");
            querySnapshotKids.forEach(async (doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                let kidChores = []

                let q = query(choresRef, where("kid", "==", doc.id))
                // console.log(q);
                const querySnapshotChores = await getDocs(q);
                querySnapshotChores.forEach((doc) => {
                    kidChores.push({
                        id: doc.id,
                        chore: doc.data().chore,
                        done: doc.data().done
                    })
                });
                that.kids.push({
                    id: doc.id,
                    name: doc.data().name,
                    chores: kidChores
                });
            });
        },
        async addKid() {
            let that = this;
            await addDoc(collection(db, "kids"), {
                created_date: Date.now(),
                name: that.$refs.name.value
            })
                .then(data => {
                        that.kids.push({
                            id: data.id,
                            name: that.$refs.name.value
                        })
                    });
            this.$refs.name.value = ""
        }
    },
    mounted() {
        this.fetchKids();
        const illustrations = require.context(
            '@/assets',
            true,
            /^.*\.png$/
        );
        const keys = illustrations.keys();
        const regex = /\.\/(.*?)\.png/;
        this.images = keys.map(key => key.match(regex)[1]);
    }
}
</script>

<style>

</style>