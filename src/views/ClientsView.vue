<template>
    <q-page>
        <div class="row q-pt-xl">
            <q-space />
            <div class="col-lg-7 col-md-9 col-sm-10 col-xs-12">
                <div class="row q-mb-md q-px-md">
                    <div :class="`text-h4 w700 text-${entityInfo.accentColor}`">Clientes</div>
                </div>
                <div class="row q-mb-md q-px-md">
                    <q-btn
                        flat
                        label="Atras"
                        class="w700"
                        icon="fas fa-long-arrow-alt-left"
                        rounded
                        size="sm"
                        to="/"
                        :color="entityInfo.accentColor"
                    />
                </div>
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-md q-mb-lg">
                        <div class="row">
                            <q-table
                                class="full-width"
                                :data="allClients"
                                :columns="columns"
                                row-key="name"
                                binary-state-sort
                                :pagination="{rowsPerPage: 15}"
                            >
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                                        <q-td key="email" :props="props">{{
                                            props.row.email
                                        }}</q-td>
                                        <q-td key="phone" :props="props">{{
                                            props.row.phone
                                        }}</q-td>
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
                        <q-form @submit="submitNewClient()">
                            <q-card>
                                <q-card-section>
                                    <div :class="`text-h6 w700 text-${entityInfo.accentColor}`">
                                        Nuevo cliente
                                    </div>
                                </q-card-section>
                                <q-card-section>
                                    <q-input
                                        label="Nombre"
                                        filled
                                        :color="entityInfo.primaryColor"
                                        class="q-mb-md"
                                        v-model="newClient.name"
                                        :rules="[val => !!val || 'Campo requerido']"
                                    />
                                    <q-input
                                        label="Correo"
                                        filled
                                        :color="entityInfo.primaryColor"
                                        class="q-mb-md"
                                        v-model="newClient.email"
                                        :rules="[val => !!val || 'Campo requerido']"
                                    />
                                    <q-input
                                        label="Telefono"
                                        filled
                                        :color="entityInfo.primaryColor"
                                        v-model="newClient.phone"
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
    </q-page>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    data() {
        return {
            newClient: {
                name: '',
                email: '',
                phone: '',
            },
            columns: [
                {
                    name: 'name',
                    label: 'Nombre',
                    align: 'left',
                    field: 'name',
                    sortable: true,
                },
                {
                    name: 'email',
                    label: 'Correo',
                    field: 'email',
                    sortable: true,
                    align: 'left',
                },
                {
                    name: 'phone',
                    label: 'Telefono',
                    field: 'phone',
                    sortable: true,
                    align: 'left',
                },
                {name: 'actions', label: 'Acciones', align: 'left'},
            ],
        }
    },
    computed: {
        ...mapState('clients', ['allClients']),
        ...mapState('auth', ['user']),
        ...mapState('entities', ['entityInfo']),
    },
    methods: {
        ...mapActions('clients', ['getClients', 'createClient']),
        async submitNewClient() {
            await this.createClient(this.newClient)
            this.getClients(this.entities)
            this.clearForm()
        },
        clearForm() {
            this.newClient.name = ''
            this.newClient.email = ''
            this.newClient.phone = ''
        },
    },

    mounted() {
        this.getClients()
    },
}
</script>
