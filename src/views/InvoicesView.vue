<template>
    <q-page>
        <div class="row q-pt-xl">
            <q-space />
            <div class="col-lg-7 col-md-9 col-sm-10 col-xs-12">
                <div class="row q-mb-md q-px-md">
                    <div class="text-h4 w700 text-dark">Facturas</div>
                </div>
                <div class="row q-mb-md q-px-md">
                    <q-btn
                        flat
                        label="Atras"
                        class="w700"
                        icon="fas fa-long-arrow-alt-left"
                        rounded
                        size="sm"
                        to="/"
                        color="dark"
                    />
                    <q-space />
                    <q-btn
                        flat
                        label="Nuevo"
                        class="w700"
                        icon-right="far fa-file"
                        rounded
                        size="sm"
                        to="/document/new/invoice"
                        color="secondary"
                    />
                    <q-btn
                        flat
                        label="De Cot."
                        class="w700"
                        icon-right="fas fa-file-invoice-dollar"
                        rounded
                        size="sm"
                        color="primary"
                        @click="createInvoiceFromQuote()"
                    />
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-md">
                        <div class="row">
                            <q-table
                                class="full-width"
                                :data="allInvoices"
                                :columns="columns"
                                row-key="name"
                                binary-state-sort
                                :pagination="{rowsPerPage: 15}"
                            >
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <q-td key="number" :props="props">{{
                                            props.row.number
                                        }}</q-td>
                                        <q-td key="client" :props="props">{{
                                            props.row.clientData.name
                                        }}</q-td>
                                        <q-td key="total"
                                            >$ {{ calculateInvoiceTotal(props.row.items) }}</q-td
                                        >
                                        <q-td>
                                            <q-btn-group rounded flat>
                                                <q-btn icon="delete" size="sm" flat />
                                                <q-btn
                                                    icon="fas fa-arrow-right"
                                                    size="sm"
                                                    flat
                                                    :to="`/document/${props.row.id}/invoice`"
                                                />
                                            </q-btn-group>
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </div>
                    </div>
                </div>
            </div>
            <q-space />
        </div>

        <q-dialog v-model="fromQuoteDialog">
            <q-card class="bb-font" style="min-width: 500px">
                <q-card-section>
                    <div class="text-h5 text-dark w700">Create invoice from quote</div>
                </q-card-section>
                <q-card-section>
                    <q-input label="Search quote" filled v-model="searchQuote" autofocus />
                </q-card-section>
                <q-card-section v-if="filterQuotes.length > 0 && searchQuote">
                    <div
                        class="row w700 q-pt-md"
                        v-for="quote in filterQuotes"
                        :key="quote.id"
                        style="border-bottom: solid 1px #e6e6e6"
                    >
                        <div class="col-lg-3">{{ quote.number }}</div>
                        <div class="col">{{ quote.clientData.name }}</div>
                        <div class="col-lg-1">
                            <q-btn
                                icon="forward"
                                color="primary"
                                flat
                                round
                                size="sm"
                                @click="
                                    generateInvoiceFromQuote(quote.id)
                                    $router.push('/document/new/invoice')
                                "
                            />
                        </div>
                    </div>
                </q-card-section>
                <q-card-section v-if="filterQuotes.length == 0 && searchQuote">
                    <div class="text-h6 text-grey-4 w700">No results found.</div>
                </q-card-section>
                <q-card-actions>
                    <q-space />
                    <q-btn
                        label="Cancel"
                        flat
                        rounded
                        color="dark"
                        class="w700 bb-font"
                        v-close-popup
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    data() {
        return {
            fromQuoteDialog: false,
            searchQuote: '',
            columns: [
                {
                    name: 'number',
                    label: 'No.',
                    align: 'left',
                    field: 'number',
                    sortable: true,
                },
                {
                    name: 'client',
                    label: 'Cliente',
                    align: 'client',
                    field: 'name',
                    sortable: true,
                    align: 'left',
                },
                {name: 'total', label: 'Total', align: 'left'},
                {name: 'actions', label: 'Acciones', align: 'left'},
            ],
        }
    },
    computed: {
        ...mapState('quotes', ['allQuotes']),
        ...mapState('invoices', ['allInvoices']),
        filterQuotes() {
            let filteredQuotes = []
            this.allQuotes.forEach(quote => {
                if (quote.number.includes(this.searchQuote)) filteredQuotes.push(quote)
            })
            return filteredQuotes
        },
    },
    methods: {
        ...mapActions('invoices', ['getAllInvoices', 'generateInvoiceFromQuote']),
        ...mapActions('quotes', ['getAllQuotes']),
        calculateInvoiceTotal(items) {
            let total = 0
            items.forEach(item => {
                total += item.amount * item.price
            })
            return total.toFixed(2)
        },
        createInvoiceFromQuote() {
            this.fromQuoteDialog = true
            this.getAllQuotes()
        },
    },

    mounted() {
        this.getAllInvoices()
    },
}
</script>
