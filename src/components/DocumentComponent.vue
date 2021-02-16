<template>
  <div class="bg-white q-pt-lg bb-font">
    <div class="upper-document q-mx-lg q-px-xl q-pt-xl">
      <div class="row q-mb-xl">
        <div class="col-lg-6">
          <div
            class="text-h4 w700 text-dark q-mb-sm"
            v-if="this.$route.params.documentType == 'invoice'"
          >
            FACTURA
          </div>
          <div
            class="text-h4 w700 text-dark q-mb-xs"
            v-if="this.$route.params.documentType == 'quote'"
          >
            COTIZACION
          </div>
          <div class="text-subtitle2">
            <span
              class="text-white bg-dark w700 text-center q-py-xs q-px-md invoice-no"
            >
              <span v-if="data.type == 'invoice'">Factura</span>
              <span v-if="data.type == 'quote'">Cotizacion</span>
              No. 123
            </span>
          </div>
        </div>
        <q-space />
        <div class="col-lg-3 column flex-center">
          <div class="text-h6 w700 text-dark text-right full-width on-left">
            Blue Balloon Inc.
          </div>
        </div>
        <div class="col-lg-1">
          <q-img
            :src="require('@/assets/logo_2.webp')"
            style="width: 50px; float: right"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8">
          <div class="text-subtitle2 w700 text-secondary">CLIENTE</div>
          <div class="text-h6 w700 text-dark">
            {{ data.clientData ? data.clientData.name : "" }}
          </div>
          <div class="text-body w600">
            Tel. {{ data.clientData ? data.clientData.phone : "" }}
          </div>
          <div class="text-body w600">
            Email. {{ data.clientData ? data.clientData.email : "" }}
          </div>
        </div>
        <div class="col-lg-4 text-right">
          <q-separator />
          <div class="text-subitle2 w700 q-mt-sm text-secondary">Balance</div>
          <div class="text-h6 w700 text-dark">$ {{ calculateTotal }}</div>
          <div class="text-subtitle2 w700">MARTES</div>
          <div class="text-subtitle2 w600 q-mb-sm">7 de mayo, 2020</div>
          <q-separator />
        </div>
      </div>
      <div class="row text-center q-mt-lg q-mb-md">
        <div class="col-lg-5 q-pr-md">
          <div
            class="text-subtitle2 w700 bg-dark text-white q-py-xs table-header"
          >
            DESCRIPCION
          </div>
        </div>
        <q-space />
        <div class="col-lg-2 q-px-md">
          <div
            class="text-subtitle2 w700 bg-dark text-white q-py-xs table-header"
          >
            COSTO
          </div>
        </div>
        <div class="col-lg-3 q-px-md">
          <div
            class="text-subtitle2 w700 bg-dark text-white q-py-xs table-header"
          >
            CANTIDAD
          </div>
        </div>
        <div class="col-lg-2 q-pl-md">
          <div
            class="text-subtitle2 w700 bg-secondary text-white q-py-xs table-header"
          >
            SUB TOTAL
          </div>
        </div>
      </div>
      <div class="row q-mb-sm" v-for="(item, i) in data.items" :key="i">
        <div class="col-lg-5">
          <div class="text-subtitle2 w700">
            {{ item.name.toUpperCase() }}
          </div>
          <div class="text-body">{{ item.description }}</div>
        </div>
        <q-space />
        <div class="col-lg-2 text-center">
          <div class="text-subtitle2">
            $ {{ item.price == "" ? "" : parseFloat(item.price).toFixed(2) }}
          </div>
        </div>
        <div class="col-lg-3 text-center">
          <div class="text-subtitle2">
            {{ item.price == "" ? "" : item.amount }}
          </div>
        </div>
        <div class="col-lg-2 text-center">
          <div class="text-subtitle2">
            $
            {{
              item.price == ""
                ? ""
                : (parseFloat(item.price) * parseFloat(item.amount)).toFixed(2)
            }}
          </div>
        </div>
      </div>
    </div>
    <q-separator class="q-my-lg bg-dark" style="height: 3px;" />
    <div class="row middle-document q-mx-lg q-px-xl q-py-lg">
      <div class="col-lg-6">
        <div class="text-h6 w700">Total:</div>
      </div>
      <div class="col-lg-6">
        <div class="text-h6 w700 text-right">$ {{ calculateTotal }}</div>
      </div>
    </div>
    <div class="bg-grey-3 q-pb-lg">
      <div class="bottom-document q-mx-lg q-px-xl">
        <div class="row q-py-lg">
          <div class="col-lg-6">
            <div class="text-subtitle2 w700 q-mb-sm">INFORMACION DE PAGO</div>
            <div class="text-body">
              <span class="w700">No. Cuenta:</span> 40-456123-461-01
            </div>
            <div class="text-body">
              <span class="w700">Nombre:</span> Diego Rodriguez
            </div>
            <div class="text-body"><span class="w700">Tipo:</span> Ahorros</div>
            <div class="text-body">
              <span class="w700">Banco:</span> Banco General
            </div>
          </div>
          <div class="col-lg-6">
            <div class="text-subtitle2 w700 q-mb-sm">NOTAS:</div>
            <div class="text-body">
              {{ data.notes }}
            </div>
          </div>
        </div>

        <q-separator />
        <div class="row text-center q-py-lg">
          <div class="col-lg-4">
            <div class="text-caption w600">
              <q-icon name="r_phone" /> (507) 6480-6774
            </div>
          </div>
          <div class="col-lg-4">
            <div class="text-caption w600">
              <q-icon name="r_language" /> www.blueblalloon.io
            </div>
          </div>
          <div class="col-lg-4">
            <div class="text-caption w600">
              <q-icon name="r_email" /> contacto@blueballoon.io
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          type: this.$route.params.documentType,
          number: "",
          clientData: {
            name: "",
            phone: "",
            email: "",
          },
          date: "",
          items: [
            {
              name: "",
              description: "",
              price: "",
              amount: "",
            },
          ],
        };
      },
    },
  },
  methods: {},
  computed: {
    calculateTotal() {
      let total = 0;
      if (this.data.items) {
        this.data.items.forEach((item) => {
          if (item.price != "" && item.amount != "") {
            total += parseFloat(item.price) * parseInt(item.amount);
          }
        });
      }
      return total.toFixed(2);
    },
  },
};
</script>

<style>
.bb-font {
  font-family: "Nunito", sans-serif;
}
.upper-document {
  border-left: 4px #43c0f6 solid;
  border-right: 4px #43c0f6 solid;
  border-top: 4px #43c0f6 solid;
}
.middle-document {
  border-left: 4px #3f3164 solid;
  border-right: 4px #3f3164 solid;
}

.bottom-document {
  border-left: 4px #3f3164 solid;
  border-right: 4px #3f3164 solid;
  border-bottom: 4px #3f3164 solid;
}
.invoice-no {
  border-radius: 20px;
}
.table-header {
  border-radius: 20px;
}
</style>
