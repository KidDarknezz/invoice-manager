<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <div class="row bg-grey-5 shadow-3">
                <q-space />
                <div class="col-lg-7 col-md-10 col-sm-10 q-py-sm">
                    <div class="row">
                        <div class="col-lg-1 col-md-2 col-sm-2 col-xs-2 flex flex-center">
                            <q-img :src="require('@/assets/logo_2.webp')" style="width: 35px;" />
                        </div>
                        <div class="col-lg-6 col-xs-8 flex flex-center">
                            <div class="text-h5 bb-font w700 full-width text-grey-9">
                                Blue Balloon Inc.
                            </div>
                        </div>
                        <q-space />
                        <div class="col-lg-2 col-xs-2 flex flex-center">
                            <q-btn
                                label="Salir"
                                no-caps
                                flat
                                rounded
                                class="w700 text-dark full-width"
                                icon="login"
                                btn-logout-home
                                @click="$store.dispatch('auth/logoutUser')"
                            />
                        </div>
                    </div>
                </div>
                <q-space />
            </div>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
