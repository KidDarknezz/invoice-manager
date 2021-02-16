<template>
  <q-page>
    <div class="row">
      <q-space />
      <div class="col-lg-6 q-ma-xl">
        <div class="row q-mb-md">
          <q-btn
            flat
            label="Back"
            class="w700"
            icon="fas fa-long-arrow-alt-left"
            rounded
            size="sm"
            @click="$router.go(-1)"
            color="dark"
          />
          <q-space />
          <q-btn
            no-caps
            label="Exportar a PDF"
            icon="far fa-file-pdf"
            class="w700"
            push
            rounded
            color="primary"
            @click="generateReport()"
          />
        </div>

        <DocumentComponent class="shadow-3" :data="documentData" />
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="2000"
          filename="hee hee"
          :pdf-quality="2"
          :manual-pagination="false"
          :pdf-format="returnPaperSize()"
          pdf-orientation="portrait"
          pdf-content-width="100%"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <DocumentComponent :data="documentData" />
          </section>
        </vue-html2pdf>
      </div>
      <div class="col-lg-4 q-ma-xl" v-if="$route.params.documentId == 'new'">
        <div class="row q-mb-md">
          <q-space />
          <q-btn
            push
            no-caps
            label="Save"
            class="w700"
            icon-right="far fa-save"
            rounded
            color="dark"
            @click="printDocData()"
          />
        </div>
        <q-card>
          <q-card-section>
            <div class="text-h6 w700 text-dark">New invoice</div>
          </q-card-section>
          <q-card-section>
            <q-select
              label="Client"
              color="primary"
              :options="mapClients"
              filled
              class="q-mb-md"
              v-model="documentData.clientData"
              map-options
              emit-value
            />
            <q-separator class="q-my-md" />
            <div
              class="q-mb-md"
              v-for="(item, i) in documentData.items"
              :key="i"
            >
              <div class="text-caption w700 q-mb-sm">Item {{ i + 1 }}</div>
              <q-input
                label="Item name"
                filled
                color="primary"
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
                label="Item description (optional)"
                filled
                color="primary"
                class="q-mb-md"
                v-model="documentData.items[i].description"
              />
              <div class="row">
                <div class="col on-left">
                  <q-input
                    label="Price"
                    filled
                    color="primary"
                    v-model="documentData.items[i].price"
                  />
                </div>
                <div class="col on-right">
                  <q-input
                    label="Amount"
                    filled
                    color="primary"
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
                color="primary"
                @click="addNewItem()"
              />
            </div>

            <q-separator class="q-my-md" />
            <q-input
              type="textarea"
              rows="4"
              label="Notes"
              filled
              color="primary"
              v-model="documentData.notes"
            />
          </q-card-section>
        </q-card>
      </div>
      <q-space />
    </div>
  </q-page>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import DocumentComponent from "@/components/DocumentComponent";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      documentData: {},
    };
  },
  methods: {
    ...mapActions("invoicesStore", ["getInvoice"]),

    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    returnPaperSize() {
      try {
        if (this.documentData.items.length <= 5) return "letter";
        if (this.documentData.items.length > 5) return "a4";
      } catch (e) {}
    },
    addNewItem() {
      this.documentData.items.push({
        name: "",
        description: "",
        price: "",
        amount: "",
      });
    },
    removeItem(index) {
      this.documentData.items.splice(index, 1);
    },
  },
  computed: {
    ...mapState("clientsStore", ["allClients"]),
    ...mapState("invoicesStore", ["existingInvoice"]),

    mapClients() {
      let clients = [];
      this.allClients.forEach((client) => {
        let c = {};
        c.label = client.name;
        c.value = client;
        clients.push(c);
      });
      return clients;
    },
  },

  mounted() {
    // console.log(this.$route.params.documentId);
    // console.log(this.$route.params.documentType);
    if (this.$route.params.documentId == "new") {
      this.documentData = {
        type: this.$route.params.documentType,
        number: "",
        clientData: "",
        date: "",
        items: [
          {
            name: "",
            description: "",
            price: "",
            amount: "",
          },
        ],
        notes: "",
      };
    } else {
      this.getInvoice(this.$route.params.documentId);
      setTimeout(() => {
        this.documentData = this.existingInvoice;
      }, 500);
    }
  },
  components: {
    VueHtml2pdf,
    DocumentComponent,
  },
};
</script>
