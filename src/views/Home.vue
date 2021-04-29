<template>
    <q-page>
        <div class="row bg-grey-5 shadow-3">
            <q-space />
            <div class="col-lg-7 col-md-10 col-sm-10 q-py-sm">
                <div class="row">
                    <div class="col-lg-1 col-md-2 col-sm-2 col-xs-2 flex flex-center">
                        <q-img :src="require('@/assets/logo_2.webp')" style="width: 35px;" />
                    </div>
                    <div class="col-lg-6 col-xs-8 flex flex-center">
                        <div class="text-h5 bb-font w700 full-width text-grey-9">
                            Blue Balloon Inc.
                        </div>
                    </div>
                    <q-space />
                    <div class="col-lg-2 col-xs-2 flex flex-center">
                        <q-btn
                            label="Cerrar sesion"
                            no-caps
                            flat
                            rounded
                            class="w700 text-dark full-width"
                            icon="login"
                            btn-logout-home
                            @click="$store.dispatch('auth/logoutUser')"
                        />
                    </div>
                </div>
            </div>
            <q-space />
        </div>
        <div class="row">
            <q-space />
            <div class="col-lg-7 col-md-10 col-sm-10">
                <div class="row q-px-md q-py-xl">
                    <div class="text-h4 w700 text-grey-9">Inicio</div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pa-md">
                        <router-link to="/clients" style="text-decoration: none;">
                            <div class="home-tile bg-primary q-pa-md rounded-borders">
                                <q-icon
                                    name="fas fa-file-alt"
                                    size="xl"
                                    color="white"
                                    class="q-mb-lg"
                                />
                                <div class="text-h5 bb-font w700 text-white">
                                    Cotizaciones
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pa-md">
                        <router-link to="/invoices" style="text-decoration: none;">
                            <div class="home-tile bg-primary q-pa-md rounded-borders">
                                <q-icon
                                    name="fas fa-file-invoice-dollar"
                                    size="xl"
                                    color="white"
                                    class="q-mb-lg"
                                />
                                <div class="text-h5 bb-font w700 text-white">
                                    Facturas
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pa-md">
                        <router-link to="/clients" style="text-decoration: none;">
                            <div class="home-tile bg-primary q-pa-md rounded-borders">
                                <q-icon
                                    name="fas fa-user-tag"
                                    size="xl"
                                    color="white"
                                    class="q-mb-lg"
                                />
                                <div class="text-h5 bb-font w700 text-white">
                                    Clientes
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <q-space />
        </div>
    </q-page>
</template>

<<<<<<< HEAD
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
=======
<script></script>
>>>>>>> b0f7df2... home layout update

<style>
.menu-tiles {
    text-decoration: none;
}
.home-tile {
    text-align: center;
}
</style>
