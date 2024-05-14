import axios from 'axios'
import { environment } from '@/environments/environment'
import {API, QUESTION, SAVE, TEST, USER} from "@/helpers/endPoints";
import {getId, getToken, getCandidateType} from "@/helpers/helpers";

export default {
    state: {
        iterator: 0
    },
    mutations: {},
    actions: {
        sendAnswer(store, payload) {
            axios({
                method: 'POST',
                url: `${environment.prodApi + API + TEST}/save/${getId()}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },

                data: [
                    ...payload
                ]
            })
                .then(r => r)
                .catch(e => {
                    store.rootState.snacks.snackbar = true
                    store.rootState.snacks.text = 'Произошла ошибка ' + e.message
                })
        },
        getQuestions(store) {
            store.rootState.loading = true
            const questions = axios(`${environment.prodApi + API + QUESTION}/forTest/${getCandidateType()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },
            }).then(r => {
                return r.data
            }).catch(e => {
                store.rootState.snacks.snackbar = true
                store.rootState.snacks.text = 'Произошла ошибка ' + e.message
            })

            return questions
        }
    },
}
