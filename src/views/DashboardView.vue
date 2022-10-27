<template>
  <div>
    <div>Dashboard</div>
    <ul>
        <li v-for="kid in this.kids" :key="kid.name">{{kid.name}}</li>
    </ul>
  </div>
</template>

<script>
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore";

export default {
    data() {
        return {
            kids: []
        };
    },
    methods: {
        async fetchKids() {
            let that = this;
            const querySnapshot = await getDocs(collection(db, "kids"));
            querySnapshot.forEach((doc) => {
                that.kids.push(doc.data())
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