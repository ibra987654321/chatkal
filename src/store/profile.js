import axios from "axios";
import { environment } from '@/environments/environment'
import {API, CANDIDATE_TYPE, KNOWLEDGE_TYPE} from "@/helpers/endPoints";
import {getCandidateType} from "@/helpers/helpers";
export default {
    state: {

    },
    mutations: {},
    actions: {
        getKnowledge(store, id) {
            const data = axios(`${environment.prodApi + API + KNOWLEDGE_TYPE}/all/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(r => r.data)
                .catch(e => {
                    store.rootState.snacks.snackbar = true
                    store.rootState.snacks.text = 'Произошла ошибка ' + e.message
                })
            return data
        },
        submitForm(store, payload) {
            function navigate() {
                store.rootState.modals.popup = false
                store.rootState.modals.type.login = true
            }
            axios({
                method: 'POST',
                url: `${environment.prodApi + API}/candidate/save`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    ...payload
                }
            }).then(res => {
                store.rootState.modals.type.action = true
                store.rootState.modals.type.withRoute = false
                store.rootState.modals.type.default = false
                store.rootState.modals.type.withOutBtn = false
                store.rootState.modals.type.description = false
                store.rootState.modals.type.withList = false
                store.rootState.modals.popup = true
                store.rootState.modals.title = 'Подтверждение'
                store.rootState.modals.text = `Мы отправили на почту код, подтвердите пожалуйста!`
                store.rootState.modals.btnText = 'Войти';
                store.rootState.modals.img = require('');
                store.commit('setAction', navigate)

            })    .catch(e => {
                store.rootState.snacks.snackbar = true
                store.rootState.snacks.text = 'Произошла ошибка ' + e.message
            })
        },
        getName() {
            const date = axios(`${environment.prodApi + API + CANDIDATE_TYPE}/nameById/${getCandidateType()}`, {
                method: 'GET',
            }).then(r => r.data)

            return date
        },
    },
}
