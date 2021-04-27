<template>
    <q-page>
        <div class="row" style="height: 100vh">
            <div class="col-lg-7 col-xs-12">
                <div class="flex flex-center" style="height: 100%">
                    <q-img :src="require('@/assets/logo_2.webp')" style="width: 100px" />
                    <div class="text-h4 w700 text-dark q-ml-lg">Blue Balloon Inc.</div>
                </div>
            </div>
            <div class="col-lg-5 col-xs-12 gradient-bg shadow-5">
                <div class="flex flex-center" style="height: 100%">
                    <q-card style="width: 50%" class="login-card">
                        <q-card-section class="q-pa-lg">
                            <div class="text-h5 w700 text-dark">Invoice Manager.</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section class="q-pa-lg">
                            <q-input
                                label="Email"
                                filled
                                class="q-mb-md"
                                v-model="loginData.email"
                                input-email-login
                            />
                            <q-input
                                label="Password"
                                filled
                                type="password"
                                v-model="loginData.password"
                                input-password-login
                            />
                        </q-card-section>
                        <q-separator />
                        <q-card-actions class="q-pa-lg">
                            <q-btn
                                label="Login"
                                no-caps
                                push
                                unelevated
                                rounded
                                btn-login-login
                                class="w700 full-width"
                                color="primary"
                                icon-right="login"
                                @click="$store.dispatch('auth/loginUser', loginData)"
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
            loginData: {
                email: '',
                password: '',
            },
        }
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