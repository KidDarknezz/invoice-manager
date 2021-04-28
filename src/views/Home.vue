<template>
    <q-page>
        <div class="absolute-center">
            <div class="row q-mb-lg">
                <q-space />
                <q-img :src="logo" style="width: 150px" :entityName="entityName" />
                <q-space />
            </div>
            <div class="row q-mb-lg">
                <q-btn
                    label="Quotes"
                    push
                    class="w700 q-py-md q-mx-md"
                    color="secondary"
                    icon="fas fa-file-alt"
                    to="/quotes"
                    rounded
                />
                <q-btn
                    label="Invoices"
                    push
                    class="w700 q-py-md q-mx-md"
                    color="secondary"
                    icon="fas fa-file-invoice-dollar"
                    to="/invoices"
                    rounded
                />
                <q-btn
                    label="Clients"
                    class="w700 q-py-md q-mx-md"
                    push
                    color="secondary"
                    icon="fas fa-user-tag"
                    to="/clients"
                    rounded
                />
            </div>
            <div class="row">
                <q-space />
                <q-btn
                    label="Logout"
                    no-caps
                    flat
                    rounded
                    class="w700 text-dark"
                    icon="login"
                    btn-logout-home
                    @click="$store.dispatch('auth/logoutUser')"
                />

                <q-space />
            </div>
        </div>
    </q-page>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState('entities', ['logo', 'entityName']),
    },
    mounted() {
        console.log(`entity name:${this.entityName}`)
        console.log(`logo:${this.logo}`)
    },
}
</script>

<style>
.menu-tiles {
    text-decoration: none;
}
</style>
