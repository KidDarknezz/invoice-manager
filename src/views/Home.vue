<template>
    <q-page>
        <div class="row">
            <q-space />
            <div class="col-lg-7 col-md-10 col-sm-10">
                <div class="row q-px-md q-py-xl">
                    <div :class="`text-h4 w700 text-${entityInfo.accentColor}`">Inicio</div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pa-md">
                        <router-link to="/quotes" style="text-decoration: none">
                            <div
                                :class="`home-tile bg-${entityInfo.primaryColor} q-pa-md rounded-borders shadow-3`"
                            >
                                <q-icon
                                    name="fas fa-file-alt"
                                    size="xl"
                                    color="white"
                                    class="q-mb-lg"
                                />
                                <div class="text-h5 bb-font w700 text-white">Cotizaciones</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pa-md">
                        <router-link to="/invoices" style="text-decoration: none">
                            <div
                                :class="`home-tile bg-${entityInfo.primaryColor} q-pa-md rounded-borders shadow-3`"
                            >
                                <q-icon
                                    name="fas fa-file-invoice-dollar"
                                    size="xl"
                                    color="white"
                                    class="q-mb-lg"
                                />
                                <div class="text-h5 bb-font w700 text-white">Facturas</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pa-md">
                        <router-link to="/clients" style="text-decoration: none">
                            <div
                                :class="`home-tile bg-${entityInfo.primaryColor} q-pa-md rounded-borders shadow-3`"
                            >
                                <q-icon
                                    name="fas fa-user-tag"
                                    size="xl"
                                    color="white"
                                    class="q-mb-lg"
                                />
                                <div class="text-h5 bb-font w700 text-white">Clientes</div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <q-space />
        </div>
    </q-page>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    computed: {
        ...mapState('entities', ['entityInfo']),
    },
    methods: {
        ...mapActions('clients', ['getClients']),
        ...mapActions('quotes', ['getAllQuotes']),
        ...mapActions('invoices', ['getAllInvoices']),
    },
    async mounted() {
        await this.getClients()
        await this.getAllQuotes()
        await this.getAllInvoices()
    },
}
</script>

<style>
.home-tile {
    text-align: center;
}
</style>
