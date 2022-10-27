<template>
  <div>
    {{this.name}}
    <ul>
        <li v-for="chore in this.chores" :key="chore.id" class="list-disc list-inside">
            <span v-if="`${chore.done}` == 'true'" class="line-through">{{chore.chore}}</span>
            <span v-else>{{chore.chore}}</span>
        </li>
    </ul>  
  </div>
</template>

<script>
import { db } from '../firebase'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export default {
    data() {
        return {
            name: "",
            chores: []
        }
    },
    methods: {
        async fetchName(id) {
            let that = this;
            const docRef = doc(db, "kids", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                that.name = docSnap.data().name
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        },
        async fetchChores() {
            let that = this;
            const choresRef = collection(db, "chores");
            let q = query(choresRef, where("kid", "==", this.$route.params.id))
            // console.log(q);
            const querySnapshotChores = await getDocs(q);
            querySnapshotChores.forEach((doc) => {
                that.chores.push({
                    id: doc.id,
                    chore: doc.data().chore,
                    done: doc.data().done
                })
            });
        }
    },
    mounted() {
        this.fetchName(this.$route.params.id);
        this.fetchChores();
    }
}
</script>

<style>

</style>