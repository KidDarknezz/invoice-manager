<template>
    <q-page>
        <div class="row q-pt-xl">
            <q-space />
            <div class="col-lg-7 col-md-9 col-sm-10 col-xs-12">
                <div class="row q-mb-md q-px-md">
                    <div :class="`text-h4 w700 text-${entityInfo.accentColor}`">Cotizaciones</div>
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
                        to="/document/new/quote"
                        :color="entityInfo.primaryColor"
                    />
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-md">
                        <div class="row">
                            <q-table
                                class="full-width"
                                :data="allQuotes"
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
                                                <q-btn
                                                    icon="delete"
                                                    size="sm"
                                                    flat
                                                    @click="deleteQuote(props.row.id)"
                                                />
                                                <q-btn
                                                    icon="fas fa-edit"
                                                    size="sm"
                                                    flat
                                                    :to="`/document/${props.row.id}/quote/edit`"
                                                />
                                                <q-btn
                                                    icon="fas fa-arrow-right"
                                                    size="sm"
                                                    flat
                                                    :to="`/document/${props.row.id}/quote`"
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
    </q-page>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    data() {
        return {
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
    methods: {
        ...mapActions('quotes', ['getAllQuotes', 'deleteQuote']),
        calculateInvoiceTotal(items) {
            let total = 0
            items.forEach(item => {
                total += parseFloat(item.price.replace(',', '')) * parseFloat(item.amount)
            })
            return total.toFixed(2)
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
    computed: {
        ...mapState('quotes', ['allQuotes']),
        ...mapState('entities', ['entityInfo']),
    },
    mounted() {
        this.getAllQuotes()
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
