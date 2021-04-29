<template>
    <q-page>
        <div class="row">
            <div class="col-lg-7 col-md-6 col-xs-12 sm-hide xs-hide" style="height: 100vh">
                <div class="flex flex-center" style="height: 100%">
                    <q-img :src="require('@/assets/logo_2.webp')" style="width: 100px" />
                    <div class="text-dark q-ml-lg">
                        <span class="text-h5 w700">Invoice Manager</span>
                        <br />
                        <span class="text-subtitle2 w700 q-pl-xl">By Blue Balloon Inc.</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-7 col-md-6 col-xs-12 q-py-lg xl-hide lg-hide md-hide">
                <div class="flex flex-center" style="height: 100%">
                    <q-img :src="require('@/assets/logo_2.webp')" style="width: 50px" />
                    <div class="text-dark q-ml-lg">
                        <span class="text-h5 w700">Invoice Manager</span>
                        <br />
                        <span class="text-subtitle2 w700 q-pl-xl">By Blue Balloon Inc.</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-md-6 col-xs-12 gradient-bg shadow-5" style="height: 100vh">
                <div class="flex flex-center" style="height: 100%">
                    <q-card style="width: 450px; max-width: 80vw" class="login-card">
                        <q-card-section class="q-pa-lg">
                            <div class="text-h5 w700 text-dark">Iniciar sesion.</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section class="q-pa-lg">
                            <q-input
                                label="Email"
                                filled
                                type="email"
                                class="q-mb-md"
                                v-model="loginData.email"
                                input-email-login
                                @keyup.enter="loginUser(loginData)"
                            />
                            <q-input
                                label="Password"
                                filled
                                :type="isPwd ? 'password' : 'text'"
                                v-model="loginData.password"
                                input-password-login
                                @keyup.enter="loginUser(loginData)"
                            >
                                <template v-slot:append>
                                    <q-icon
                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPwd = !isPwd"
                                    />
                                </template>
                            </q-input>
                        </q-card-section>
                        <q-separator />
                        <q-card-actions class="q-pa-lg">
                            <q-btn
                                label="Entrar"
                                no-caps
                                push
                                unelevated
                                rounded
                                btn-login-login
                                class="w700 full-width"
                                color="primary"
                                icon-right="login"
                                @click="loginUser(loginData)"
                            />
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import vuex, {mapActions} from 'vuex'

export default {
    data() {
        return {
            isPwd: true,
            loginData: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        ...mapActions('auth', ['loginUser']),
    },
}
</script>

<style>
.gradient-bg {
    background: rgb(67, 192, 246) !important;
    background: linear-gradient(
        45deg,
        rgba(67, 192, 246, 1) 0%,
        rgba(92, 69, 173, 1) 100%
    ) !important;
}
.login-card {
    border-radius: 20px !important;
}
</style>
