<template>
    <q-page>
        <div class="row">
            <q-space />
            <div class="col-lg-7 col-md-9 col-sm-10 col-xs-12">
                <div class="row q-my-lg">
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 flex flex-center">
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
                    </div>
                    <q-space />
                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 flex flex-center">
                        <q-btn
                            no-caps
                            label="Descargar PDF"
                            icon="far fa-file-pdf"
                            class="w700"
                            push
                            rounded
                            :color="entityInfo.primaryColor"
                            @click="generateReport()"
                            v-if="
                                $route.params.documentId != 'new' || $route.params.edit === 'edit'
                            "
                        />
                    </div>
                </div>
                <div class="q-pa-md" v-if="hideForMobile">
                    <DocumentComponent
                        class="shadow-3"
                        :data="documentData"
                        v-if="entityInfo.id == 'SLUiKLonGGCn3xgBLkWa'"
                    />
                    <GenericDocumentComponent class="shadow-3" :data="documentData" v-else />
                </div>
                <div class="q-px-md" v-else>
                    <MobileDocumentPreview :data="documentData" v-if="documentData.number" />
                </div>

                <vue-html2pdf
                    :show-layout="false"
                    :float-layout="true"
                    :enable-download="true"
                    :preview-modal="false"
                    :paginate-elements-by-height="2000"
                    :filename="`${$route.params.documentType}-${documentData.number}`"
                    :pdf-quality="2"
                    :manual-pagination="false"
                    :pdf-format="returnPaperSize()"
                    pdf-orientation="portrait"
                    pdf-content-width="100%"
                    ref="html2Pdf"
                >
                    <section slot="pdf-content">
                        <DocumentComponent
                            :data="documentData"
                            v-if="entityInfo.id == 'SLUiKLonGGCn3xgBLkWa'"
                        />
                        <GenericDocumentComponent :data="documentData" v-else />
                    </section>
                </vue-html2pdf>
            </div>
            <div
                class="col-lg-4"
                v-if="$route.params.documentId == 'new' || $route.params.edit === 'edit'"
            >
                <div class="row q-my-lg q-px-md">
                    <q-space />
                    <q-btn
                        push
                        no-caps
                        label="Guardar"
                        class="w700"
                        icon-right="far fa-save"
                        size="sm"
                        rounded
                        :color="entityInfo.primaryColor"
                        @click="saveDocument(documentData)"
                    />
                </div>
                <div class="q-pa-md">
                    <q-card>
                        <q-card-section>
                            <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">Nuevo</div>
                        </q-card-section>
                        <q-card-section>
                            <q-select
                                label="Cliente"
                                :color="entityInfo.primaryColor"
                                :options="mapClients"
                                filled
                                class="q-mb-md"
                                v-model="documentData.clientData"
                                map-options
                                emit-value
                            />
                            <q-separator class="q-my-md" />
                            <div class="q-mb-md" v-for="(item, i) in documentData.items" :key="i">
                                <div class="text-caption w700 q-mb-sm">Item {{ i + 1 }}</div>
                                <q-input
                                    label="Nombre del item"
                                    filled
                                    :color="entityInfo.primaryColor"
                                    class="q-mb-md"
                                    v-model="documentData.items[i].name"
                                >
                                    <template v-slot:after>
                                        <q-btn
                                            round
                                            dense
                                            flat
                                            icon="delete"
                                            @click="removeItem(i)"
                                            :disable="documentData.items.length > 1 ? false : true"
                                        />
                                    </template>
                                </q-input>
                                <q-input
                                    label="Descripción del item (opcional)"
                                    filled
                                    :color="entityInfo.primaryColor"
                                    class="q-mb-md"
                                    v-model="documentData.items[i].description"
                                />
                                <div class="row">
                                    <div class="col on-left">
                                        <q-input
                                            label="Precio"
                                            filled
                                            :color="entityInfo.primaryColor"
                                            v-model="documentData.items[i].price"
                                        />
                                    </div>
                                    <div class="col on-right">
                                        <q-input
                                            label="Cantidad"
                                            filled
                                            :color="entityInfo.primaryColor"
                                            v-model="documentData.items[i].amount"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <q-space />
                                <q-btn
                                    flat
                                    label="Add item"
                                    icon="add"
                                    no-caps
                                    rounded
                                    :color="entityInfo.primaryColor"
                                    @click="addNewItem()"
                                />
                            </div>
                            <q-separator class="q-my-md" />
                            <q-input
                                type="textarea"
                                rows="4"
                                label="Notes"
                                filled
                                :color="entityInfo.primaryColor"
                                v-model="documentData.notes"
                            />
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <q-space />
        </div>
    </q-page>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import DocumentComponent from '@/components/DocumentComponent'
import GenericDocumentComponent from '@/components/GenericDocumentComponent'
import MobileDocumentPreview from '@/components/MobileDocumentPreview'
import {mapState, mapActions} from 'vuex'
import {Platform} from 'quasar'

export default {
    data() {
        return {
            documentData: {},
        }
    },
    methods: {
        ...mapActions('documents', ['getDocument', 'saveDocument', 'getGeneralInfo']),
        ...mapActions('invoices', ['generateInvoiceFromQuote']),
        ...mapActions('clients', ['getClients']),
        generateReport() {
            this.$refs.html2Pdf.generatePdf()
        },
        returnPaperSize() {
            try {
                if (this.documentData.items.length <= 5) return 'letter'
                if (this.documentData.items.length > 5) return 'a4'
            } catch (e) {}
        },
        addNewItem() {
            this.documentData.items.push({
                name: '',
                description: '',
                price: '',
                amount: '',
            })
        },
        removeItem(index) {
            this.documentData.items.splice(index, 1)
        },
    },
    computed: {
        ...mapState('clients', ['allClients']),
        ...mapState('documents', ['existingDocument', 'newInvoice', 'newQuote']),
        ...mapState('invoices', ['selectedQuoteToInvoice']),
        ...mapState('quotes', ['getQuote']),
        ...mapState('entities', ['entityInfo']),

        mapClients() {
            let clients = []
            this.allClients.forEach(client => {
                let c = {}
                c.label = client.name
                c.value = client
                clients.push(c)
            })
            return clients
        },
        returnDocumentNumber() {
            if (this.$route.params.documentType == 'invoice') return this.newInvoice
            if (this.$route.params.documentType == 'quote') return this.newQuote
        },
        hideForMobile() {
            if (Platform.is.iphone || Platform.is.android) return false
            else return true
        },
    },

    async mounted() {
        if (this.allClients.length == 0) this.getClients()
        await this.getGeneralInfo()
        if (this.$route.params.documentId == 'new' && !this.selectedQuoteToInvoice) {
            setTimeout(() => {
                this.documentData = {
                    type: this.$route.params.documentType,
                    number: this.returnDocumentNumber,
                    clientData: '',
                    date: Date.now(),
                    items: [
                        {
                            name: '',
                            description: '',
                            price: '',
                            amount: '',
                        },
                    ],
                    notes: '',
                }
            }, 1000)
        } else if (this.selectedQuoteToInvoice) {
            this.getDocument({
                id: this.selectedQuoteToInvoice,
                type: 'quote',
            })
            setTimeout(() => {
                this.documentData = this.existingDocument
                this.documentData.number = this.returnDocumentNumber
                this.documentData.type = 'invoice'
                this.documentData.date = Date.now()
                this.documentData.id = this.$route.params.documentId
            }, 1000)
        } else {
            this.getDocument({
                id: this.$route.params.documentId,
                type: this.$route.params.documentType,
            })
            setTimeout(() => {
                this.documentData = this.existingDocument
                this.documentData.id = this.$route.params.documentId
                this.$route.params.edit === 'edit' ? (this.documentData.edit = true) : null
                this.documentData.date = this.documentData.edit
                    ? Date.now()
                    : this.documentData.date
            }, 1000)
        }
    },
    beforeDestroy() {
        this.generateInvoiceFromQuote('')
    },
    components: {
        VueHtml2pdf,
        DocumentComponent,
        GenericDocumentComponent,
        MobileDocumentPreview,
    },
}
</script>
