<template>
  <q-page>
    <div class="row q-pt-xl">
      <q-space />
      <div class="col-lg-7">
        <div class="row q-mb-md q-px-md">
          <div class="text-h4 w700 text-dark">Invoices</div>
        </div>
        <div class="row q-mb-md q-px-md">
          <q-btn
            flat
            label="Back"
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
            label="New"
            class="w700"
            icon-right="far fa-file"
            rounded
            size="sm"
            to="/document/new/invoice"
            color="secondary"
          />
          <q-btn
            flat
            label="From quote"
            class="w700"
            icon-right="far fa-file"
            rounded
            size="sm"
            color="primary"
            @click="createInvoiceFromQuote()"
          />
        </div>
        <div class="row">
          <div class="col-lg-12 q-px-md">
            <div class="row">
              <q-table
                class="full-width"
                :data="allInvoices"
                :columns="columns"
                row-key="name"
                binary-state-sort
                :pagination="{ rowsPerPage: 15 }"
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
      <q-card>
        <q-card-section>
          <div class="text-h5 text-dark w700 bb-font">
            Create invoice from quote
          </div>
        </q-card-section>
        <q-card-section> asdf </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

export default {
  data() {
    return {
      fromQuoteDialog: false,
      columns: [
        {
          name: "number",
          label: "No.",
          align: "left",
          field: "number",
          sortable: true,
        },
        {
          name: "client",
          label: "Client",
          align: "client",
          field: "name",
          sortable: true,
          align: "left",
        },
        { name: "total", label: "Total", align: "left" },
        { name: "actions", label: "Actions", align: "left" },
      ],
    };
  },
  methods: {
    ...mapActions("invoicesStore", ["getAllInvoices"]),
    ...mapActions("quotesStore", ["getAllQuotes"]),

    calculateInvoiceTotal(items) {
      let total = 0;
      items.forEach((item) => {
        total += item.amount * item.price;
      });
      return total.toFixed(2);
    },
    createInvoiceFromQuote() {
      this.fromQuoteDialog = true;
      if (this.allQuotes.length == 0) this.getAllQuotes();
    },
  },
  computed: {
    ...mapState("invoicesStore", ["allInvoices"]),
    ...mapState("quotesStore", ["allQuotes"]),
  },
  mounted() {
    this.getAllInvoices();
  },
};
</script>
