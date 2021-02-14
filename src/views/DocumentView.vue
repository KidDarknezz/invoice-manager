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
          :paginate-elements-by-height="1400"
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
      <div class="col-lg-4 q-ma-xl">
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
              :options="['a', 'b']"
              filled
              class="q-mb-md"
            />
            <q-separator class="q-my-md" />
            <div class="text-caption w700 q-mb-sm">Item 1</div>
            <q-input label="Item name" filled color="primary" class="q-mb-md">
              <template v-slot:after>
                <q-btn round dense flat icon="add" />
              </template>
            </q-input>
            <q-input
              label="Item description (optional)"
              filled
              color="primary"
              class="q-mb-md"
            />
            <div class="row">
              <div class="col on-left">
                <q-input label="Price" filled color="primary" />
              </div>
              <div class="col on-right">
                <q-input label="Amount" filled color="primary" />
              </div>
            </div>
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

export default {
  data() {
    return {
      documentData: {
        type: "quote",
        number: "002-2021",
        clientName: "Pedro Picapiedra",
        clientPhone: "6565-6565",
        clientEmail: "pedropicapiedra@gmail.com",
        date: "23-5-2020",
        items: [
          {
            name: "Item name 1",
            description: "Lorem ipsum dolor sit amet.",
            price: 10.25,
            amount: 2,
          },
          {
            name: "Item name 2",
            description: "Lorem ipsum dolor sit amet.",
            price: 10.25,
            amount: 1,
          },
          {
            name: "Item name 3",
            description: "Lorem ipsum dolor sit amet.",
            price: 10.25,
            amount: 4,
          },
        ],
      },
    };
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    returnPaperSize() {
      if (this.documentData.items.length <= 5) return "letter";
      if (this.documentData.items.length > 5) return "a4";
    },
  },
  components: {
    VueHtml2pdf,
    DocumentComponent,
  },
};
</script>
