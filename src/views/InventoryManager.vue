<template>
    <q-page>
        <div class="row q-pt-xl">
            <q-space />
            <div class="col-lg-7 col-md-9 col-sm-10 col-xs-12">
                <div class="row q-mb-md q-px-md">
                    <div :class="`text-h4 w700 text-${entityInfo.accentColor}`">Inventario</div>
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
                        label="Conf. de inventario"
                        class="w700"
                        icon-right="fas fa-cogs"
                        rounded
                        size="sm"
                        @click="configDialog = true"
                        :color="entityInfo.primaryColor"
                    />
                </div>
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-md q-mb-lg">
                        <div class="row">
                            <q-table
                                class="full-width"
                                :data="data"
                                :columns="columns"
                                row-key="name"
                                binary-state-sort
                                :pagination="{rowsPerPage: 15}"
                            >
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <q-td key="ean" :props="props">{{ props.row.ean }}</q-td>
                                        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                                        <q-td key="price" :props="props"
                                            >$ {{ props.row.price.toFixed(2) }}</q-td
                                        >
                                        <q-td>
                                            <q-btn-group rounded flat>
                                                <q-btn icon="edit" size="sm" flat />
                                                <q-btn
                                                    icon="delete"
                                                    size="sm"
                                                    flat
                                                    @click="
                                                        $store.dispatch(
                                                            'clients/deleteClient',
                                                            props.row.id
                                                        )
                                                    "
                                                />
                                            </q-btn-group>
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-md q-mb-lg">
                        <q-form @submit="submitNewItem()">
                            <q-card>
                                <q-card-section>
                                    <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">
                                        Nuevo actículo
                                    </div>
                                </q-card-section>
                                <q-card-section>
                                    <q-input
                                        label="EAN (Codigo de barra)"
                                        filled
                                        :color="entityInfo.ean"
                                        class="q-mb-sm"
                                        v-model="newItem.ean"
                                        :rules="[val => !!val || 'Campo requerido']"
                                    />
                                    <q-input
                                        label="Nombre"
                                        filled
                                        :color="entityInfo.name"
                                        class="q-mb-sm"
                                        v-model="newItem.name"
                                        :rules="[val => !!val || 'Campo requerido']"
                                    />
                                    <q-input
                                        label="Precio"
                                        filled
                                        :color="entityInfo.primaryColor"
                                        v-model="newItem.price"
                                        :rules="[val => !!val || 'Campo requerido']"
                                    />
                                </q-card-section>
                                <q-card-actions>
                                    <q-space />
                                    <q-btn
                                        label="Guardar"
                                        flat
                                        :color="entityInfo.accentColor"
                                        class="w700"
                                        rounded
                                        type="submit"
                                    />
                                </q-card-actions>
                            </q-card>
                        </q-form>
                    </div>
                </div>
            </div>
            <q-space />
        </div>
        <q-dialog v-model="configDialog">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div :class="`text-h6 bb-font w700 text-${entityInfo.accentColor}`">
                        Configuracion de inventario
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <div class="col q-px-sm">
                            <q-input label="Nombre" filled />
                        </div>
                        <div class="col q-px-sm">
                            <q-select label="Tipo" :options="['Texto', 'Numerico']" filled />
                        </div>
                        <div class="flex flex-center">
                            <q-btn icon="delete" round flat color="red-5" size="sm" />
                        </div>
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="Guardar" rounded flat color="green-5" size="sm" />
                    <q-btn
                        label="Agregar campo"
                        rounded
                        flat
                        :color="entityInfo.secondaryColor"
                        size="sm"
                    />
                    <q-btn
                        label="Cerrar"
                        rounded
                        flat
                        :color="entityInfo.primaryColor"
                        size="sm"
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
            configDialog: false,
            newItem: {
                ean: '',
                name: '',
                price: '',
            },
            columns: [
                {
                    name: 'ean',
                    label: 'EAN',
                    align: 'left',
                    field: 'ean',
                    sortable: true,
                },
                {
                    name: 'name',
                    label: 'Nombre',
                    field: 'name',
                    sortable: true,
                    align: 'left',
                },
                {
                    name: 'price',
                    label: 'Precio',
                    field: 'price',
                    sortable: true,
                    align: 'left',
                },
                {
                    name: 'actions',
                    label: 'Acciones',
                    align: 'left',
                },
            ],
            data: [
                {
                    ean: '65965486566',
                    name: 'LG 32" Display',
                    price: 120,
                },
            ],
        }
    },
    computed: {
        ...mapState('auth', ['user']),
        ...mapState('entities', ['entityInfo']),
    },
    methods: {
        submitNewItem() {
            console.log(`new item ${this.newItem.ean}`)
        },
        clearForm() {
            this.newClient.name = ''
            this.newClient.email = ''
            this.newClient.phone = ''
        },
    },
}
</script>
