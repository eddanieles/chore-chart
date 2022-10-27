<template>
  <div>
    <div>Dashboard</div>
    <div>Kids</div>

    <div class="grid grid-rows-1 grid-flow-col gap-4">
        <div v-for="kid in this.kids" :key="kid.id" class="border-2 m-2">
            <div>{{kid.name}}</div>
            <ul>
                <li v-for="chore in kid.chores" :key="chore.id" class="list-disc list-inside">
                    <span v-if="`${chore.done}` == 'true'" class="line-through">{{chore.chore}}</span>
                    <span v-else>{{chore.chore}}</span>
                </li>
            </ul>    
        </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import { collection, getDocs, query, where } from "firebase/firestore";

export default {
    data() {
        return {
            kids: []
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
                        done: doc.data().done ? true : false
                    })
                });
                that.kids.push({
                    id: doc.id,
                    name: doc.data().name,
                    chores: kidChores
                })
            });
        }
    },
    mounted() {
        this.fetchKids();
    }
}
</script>

<style>

</style>