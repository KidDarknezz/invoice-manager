<template>
    <q-page>
        <div class="row q-pt-xl">
            <q-space />
            <div class="col-lg-7 col-md-9 col-sm-10 col-xs-12">
                <div class="row q-mb-md q-px-md">
                    <div :class="`text-h4 w700 text-${entityInfo.accentColor}`">Facturas</div>
                </div>
                <div class="row q-mb-md q-px-md">
                    <q-btn
                        flat
                        label="Atrás"
                        class="w700"
                        icon="fas fa-long-arrow-alt-left"
                        rounded
                        size="sm"
                        to="/"
                        :color="entityInfo.accentColor"
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
                        :color="entityInfo.primaryColor"
                    />
                    <q-btn
                        flat
                        label="De Cot."
                        class="w700"
                        icon-right="fas fa-file-invoice-dollar"
                        rounded
                        size="sm"
                        :color="entityInfo.secondaryColor"
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
                                :pagination="initialPagination"
                            >
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <q-td key="number" :props="props">{{
                                            props.row.number
                                        }}</q-td>
                                        <q-td key="client" :props="props">{{
                                            props.row.clientData.name
                                        }}</q-td>
                                        <q-td key="monto">
                                            {{
                                                formatCurrency(
                                                    calculateInvoiceTotal(props.row.items)
                                                )
                                            }}</q-td
                                        >
                                        <q-td key="ibms" v-if="entityInfo.collectsTaxes">
                                            {{
                                                formatCurrency(
                                                    calculateInvoiceTotal(props.row.items) * 0.07
                                                )
                                            }}</q-td
                                        >
                                        <q-td key="total" v-if="entityInfo.collectsTaxes">
                                            {{
                                                formatCurrency(
                                                    calculateInvoiceTotal(props.row.items) * 1.07
                                                )
                                            }}</q-td
                                        >
                                        <q-td>
                                            <q-btn-group rounded flat>
                                                <!-- <q-btn icon="delete" size="sm" flat /> -->
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
            <q-card class="bb-font" style="width: 700px; max-width: 99vw">
                <q-card-section>
                    <div class="text-h5 text-dark w700">Crear factura de cotización</div>
                </q-card-section>
                <q-card-section>
                    <q-input label="Buscar cotización" filled v-model="searchQuote" autofocus />
                </q-card-section>
                <q-card-section v-if="filterQuotes.length > 0 && searchQuote">
                    <div
                        class="row w700 q-pt-md"
                        v-for="quote in filterQuotes"
                        :key="quote.id"
                        style="border-bottom: solid 1px #e6e6e6"
                    >
                        <div class="col-lg-5 col-xs-3">{{ quote.number }}</div>
                        <div class="col-lg-5 col-xs-7">{{ quote.clientData.name }}</div>
                        <div class="col-lg-2 col-xs-2">
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
                        label="Cancelar"
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
            initialPagination: {
                sortBy: 'number',
                descending: true,
                rowsPerPage: 15,
            },
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
            ],
        }
    },
    computed: {
        ...mapState('quotes', ['allQuotes']),
        ...mapState('invoices', ['allInvoices']),
        ...mapState('entities', ['entityInfo']),
        filterQuotes() {
            let filteredQuotes = []
            this.allQuotes.forEach(quote => {
                if (quote.number.includes(this.searchQuote)) filteredQuotes.push(quote)
            })
            return filteredQuotes
        },
    },
    methods: {
        ...mapActions('invoices', ['getAllInvoices', 'generateInvoiceFromQuote', 'deleteQuote']),
        ...mapActions('quotes', ['getAllQuotes']),
        calculateInvoiceTotal(items) {
            let total = 0
            items.forEach(item => {
                total += parseFloat(item.price.replace(',', '')) * parseFloat(item.amount)
            })
            return total.toFixed(2)
        },
        createInvoiceFromQuote() {
            this.fromQuoteDialog = true
            this.getAllQuotes()
        },
        formatCurrency(money, amount = null) {
            if (typeof money === 'string') money = money.replace(',', '')
            if (amount) money = parseFloat(money) * parseFloat(amount)
            let formatedMoney = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(money)
            return formatedMoney
        },
    },
    mounted() {
        this.getAllInvoices()
        if (this.entityInfo.collectTaxes) {
            this.columns.push(
                {name: 'monto', label: 'Monto', align: 'left'},
                {name: 'itbms', label: 'Itbms', align: 'left'},
                {name: 'total', label: 'Total', align: 'left'},
                {name: 'actions', label: 'Acciones', align: 'left'}
            )
            return
        }
        this.columns.push(
            {name: 'monto', label: 'Total', align: 'left'},
            {name: 'actions', label: 'Acciones', align: 'left'}
        )
    },
}
</script>
