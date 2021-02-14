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
            to="/document"
            color="primary"
          />
        </div>
        <div class="row">
          <div class="col-lg-12 q-px-md">
            <div class="row">
              <q-table
                class="full-width"
                :data="invoices"
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
                      props.row.client
                    }}</q-td>
                    <q-td key="total">$ 20.50</q-td>
                    <q-td>
                      <q-btn-group rounded flat>
                        <q-btn icon="edit" size="sm" flat />
                        <q-btn icon="fas fa-arrow-right" size="sm" flat />
                        <q-btn icon="delete" size="sm" flat />
                      </q-btn-group>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>
          <!-- <div class="col-lg-4 q-px-md">
            <q-card>
              <q-card-section>
                <div class="text-h6 w700 text-dark">
                  New invoice
                </div>
              </q-card-section>
              <q-card-section>
                <q-select
                  label="Client"
                  filled
                  class="q-mb-md"
                  :options="['a', 'b']"
                />
                <q-input
                  label="Email"
                  filled
                  color="secondary"
                  class="q-mb-md"
                />
                <q-input
                  label="Phone"
                  filled
                  color="secondary"
                  class="q-mb-md"
                />
              </q-card-section>
              <q-card-actions>
                <q-space />
                <q-btn label="Save" flat color="dark" class="w700" rounded />
              </q-card-actions>
            </q-card>
          </div> -->
        </div>
      </div>
      <q-space />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      invoices: [
        {
          number: "002-2021",
          client: "ASDF QWER",
          date: "20-12-20",
        },
      ],
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
};
</script>
