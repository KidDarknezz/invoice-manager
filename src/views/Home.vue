<template>
    <q-page>
        <div class="absolute-center">
            <div class="row q-mb-lg">
                <q-space />
                <q-img :src="require('@/assets/logo_2.webp')" style="width: 150px" />
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
</script>

<style>
.menu-tiles {
    text-decoration: none;
}
</style>
