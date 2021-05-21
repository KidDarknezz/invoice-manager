<template>
    <div>
        <!-- {{ data }} -->
        <div class="text-h6 text-center q-mb-lg text-grey-6">Información de documento</div>
        <div class="row">
            <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">
                {{ data.type == 'quote' ? 'Cotización' : 'Factura' }}
            </div>
            <q-space />
            <div class="text-h6 w700">No. {{ data.number }}</div>
        </div>
        <div class="row">
            <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">Fecha</div>
            <q-space />
            <div class="text-h6 w700">{{ formatDate('DD [de]  MMMM[,] YYYY') }}</div>
        </div>
        <div class="row q-mb-md">
            <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">Cliente</div>
            <q-space />
            <div>
                <div class="text-subtitle2 w700 text-right">{{ data.clientData.name }}</div>
                <div class="text-subtitle2 w700 text-right">{{ data.clientData.email }}</div>
                <div class="text-subtitle2 w700 text-right">{{ data.clientData.phone }}</div>
            </div>
        </div>
        <q-separator />
        <div class="row q-py-md" v-for="(item, i) in data.items" :key="i">
            <div class="col-xs-6">
                <div class="text-subtitle2 w700">{{ item.name ? item.name : '-' }}</div>
                <div class="text-caption">{{ item.description }}</div>
            </div>
            <div class="col-xs-2">
                <div class="text-subtitle2 w700 text-right">
                    {{ item.price ? formatCurrency(item.price) : '-' }}
                </div>
            </div>
            <div class="col-xs-1">
                <div class="text-subtitle2 w700 text-right">
                    {{ item.amount ? item.amount : '-' }}
                </div>
            </div>
            <div class="col-xs-3">
                <div class="text-subtitle2 w700 text-right">
                    {{ item.amount && item.price ? formatCurrency(item.price, item.amount) : '-' }}
                </div>
            </div>
        </div>
        <div class="text-subtitle2 q-mb-md" v-if="data.notes">
            <span class="w700">Notas:</span> {{ data.notes }}
        </div>
        <q-separator />
        <template v-if="entityInfo.collectsTaxes">
            <div class="row q-pt-md">
                <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">Sub-Total</div>
                <q-space />
                <div class="text-h6 w700">{{ formatCurrency(calculateTotal) }}</div>
            </div>
            <div class="row">
                <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">ITBMS</div>
                <q-space />
                <div class="text-h6 w700">{{ formatCurrency(calculateTotal * 0.07) }}</div>
            </div>
            <div class="row q-pb-md">
                <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">Total</div>
                <q-space />
                <div class="text-h6 w700">{{ formatCurrency(calculateTotal * 1.07) }}</div>
            </div>
        </template>
        <template v-else>
            <div class="row q-py-md">
                <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">Total</div>
                <q-space />
                <div class="text-h6 w700">{{ formatCurrency(calculateTotal) }}</div>
            </div>
        </template>
    </div>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'

export default {
    props: ['data'],
    methods: {
        formatDate(format) {
            return moment(this.data.date).locale('es').format(format)
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
        ...mapState('entities', ['logo', 'entityName', 'entityInfo']),

        calculateTotal() {
            let total = 0
            if (this.data.items) {
                this.data.items.forEach(item => {
                    if (item.price != '' && item.amount != '') {
                        total += parseFloat(item.price.replace(',', '')) * parseFloat(item.amount)
                    }
                })
            }
            return total.toFixed(2)
        },
    },
}
</script>
