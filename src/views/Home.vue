<template>
    <router-view v-if="!userLoading"/>
    <div v-else>...Loading</div>
</template>
<script setup>
import { computed, onMounted } from "vue";
// import {auth, onAuthStateChanged } from "firebase/auth";
import {useGraphStore} from "../store";
import {auth,onAuthStateChanged} from '../auth/firebase';
import {fetchUserData} from "../services/DbQueries";

const store= useGraphStore();
const userLoading= computed(()=> store.userLoading);

onMounted(()=> {
    fetchUserDataFromDB();
})

const fetchUserDataFromDB =async()=> {
    // loading icon show
    store.setUserLodingStatus(true);
    onAuthStateChanged(auth,async(user)=> {
        if(!user) {
            store.setUserLodingStatus(false);
            return;
        }
        try {
            const userData= await fetchUserData(user);
            if(userData.length>0) {
                store.setUserdata(userData[0]);
            }
        } catch(e) {
            console.log('error in fetching user data', e)
        }
       
    })
    store.setUserLodingStatus(false);

}
</script>