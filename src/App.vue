<template>
    <q-layout view="lHh Lpr lFf" id="app" class="bg-grey-4">
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
<script>
// import firebase from 'firebase/app'
// import 'firebase/firebase-auth'

// export default {
//     computed: {
//         user() {
//             return this.$store.getters.user
//         },
//     },
//     mounted() {
//         console.log(`user: ${!this.user}`)
//         console.log(`user: ${this.user}`)
//         if (!this.user) {
//             var user = firebase.auth().currentUser
//             console.log(user)
//             console.log(user.id)
//             this.$store.commit('SET_USER', user)
//             this.$store.commit('SET_UID', user.uid)
//             this.$store.dispatch('getEntities', user.uid)
//         }
//     },
// }
</script>
<style>
#app {
    font-family: 'Nunito', sans-serif;
}
.bb-font {
    font-family: 'Nunito', sans-serif !important;
}
.generic-font {
    font-family: 'Roboto', sans-serif;
}
.w300 {
    font-weight: 300 !important;
}
.w400 {
    font-weight: 400 !important;
}
.w600 {
    font-weight: 600 !important;
}
.w700 {
    font-weight: 700 !important;
}
</style>
