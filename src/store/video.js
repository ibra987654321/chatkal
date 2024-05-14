import axios from 'axios'
import { environment } from '@/environments/environment'
import {API, QUESTION, TEST, VIDEO,} from "@/helpers/endPoints";
import {getId, getToken, getCandidateType} from "@/helpers/helpers";

export default {
    state: {
        questionData: []
    },
    mutations: {
        setData(state, data) {
            state.questionData.push(data)
        }
    },
    actions: {
        sendVideo(store, formData) {
            const data = axios.post(`${environment.prodApi + API + VIDEO}/upload/${getId()}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer_${getToken()}`,
                    },
                }
            ).then(r => r.data)
                .catch(e => {
                    store.rootState.snacks.snackbar = true
                    store.rootState.snacks.text = 'Произошла ошибка ' + e.message
                })
            return data
        },
        getQuestion(store) {
            store.rootState.loading = true
            const data = axios(`${environment.prodApi + API + QUESTION}/forVideo/${getCandidateType()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },
            }).then(r => {
                store.commit('setData', r.data)
                return  r.data
            })    .catch(e => {
                store.rootState.snacks.snackbar = true
                store.rootState.snacks.text = 'Произошла ошибка ' + e.message
            })

            return data
        },
            getStage(store) {
            store.rootState.loading = true
            const data = axios(`${environment.prodApi + API + TEST}/stage/${getId()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },
            }).then(r => {
                return  r.data
            })    .catch(e => {
                store.rootState.snacks.snackbar = true
                store.rootState.snacks.text = 'Произошла ошибка ' + e.message
            })

            return data
        }
    },
}
