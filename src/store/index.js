import {createStore} from "vuex";
import axios from "axios";
import {environment} from "@/environments/environment";
import {getToken} from "@/helpers/helpers";
export default createStore({
 state: {
     isOpen: false,
     tooltip: false,
     loading: false,
     text: null,
     tooltipPosition: {},
     snacks: {
         snackbar: false,
         text: ``,
         data: {
             sector: {},
             house: [],
             family: [],
             person: [],
         }
     },
 },
    mutations: {
        setTooltip(state, val) {
            state.tooltip = true
            state.text = val.target.id
            const rect = val.currentTarget.getBoundingClientRect();
            state.tooltipPosition = {
                x: rect.left + 20,
                y:  rect.top -20
            };
            axios({
                method: 'GET',
                url: `${environment.authAPI}/api/sector/findAllById/${val.target.id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
            }).then(r => {
                state.snacks.data.sector = r.data
                axios({
                    method: 'GET',
                    url: `${environment.authAPI}/api/house/findAllBySectorId/${r.data.id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`,
                    },
                }).then(t => {
                    state.snacks.data.house = t.data
                    t.data.forEach(house => {
                        axios({
                            method: 'GET',
                            url: `${environment.authAPI}/api/family/findAllByHouseId/${house.id}`,
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }).then(y => {
                            state.snacks.data.family = y.data
                            y.data.forEach(family => {
                                axios({
                                    method: 'GET',
                                    url: `${environment.authAPI}/api/person/findAllByFamilyId/${family.id}`,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${getToken()}`,
                                    },
                                }).then(u => {
                                    state.snacks.data.person = u.data
                                })
                            })
                        })
                    })

                })
            })
        },
        closeTooltip(state) {
            state.tooltip = false
            state.snacks.data = {
                sector: {},
                house: [],
                family: [],
                person: [],
            }
            // state.text = null
        },
        setOpen(state, val) {
            if (typeof val !== 'boolean') {
                state.text = val.event.target.id
                state.isOpen = val.boolean
                return
            }
            state.isOpen = val.boolean
        },
        setSnackBars(state, data) {
            state.snacks.snackbar = true
            state.snacks.text = data
        },
        setLoading(state, bool) {
            state.loading = bool
        }
    }
})
//     state: {
//         error: null,
//         landing: router,
//         loading: false,
//         modals: {
//             img: '',
//             popup: false,
//             title: '',
//             text:'',
//             btnText: '',
//             route: '',
//             routeTitle: '',
//             action: '',
//             actionTitle: '',
//             list: [],
//             description: '',
//             type: {
//                 strong: false,
//                 default: false,
//                 login: false,
//                 description: false,
//                 withOutBtn: false,
//                 withList: false,
//                 withRoute: false,
//                 action: false
//             },
//         },
//         snacks: {
//             snackbar: false,
//             text: ``,
//         },
//         successData: '',
//         candidateType: '',
//         candidateId: '',
//         iterator: 0
//     },
//     mutations: {
//         setError(state, error) {
//             state.error = error;
//         },
//         clearError(state) {
//             state.error = null;
//         },
//         setCandidate(state, data) {
//             state.candidateType = data
//         },
//         setCandidateId(state, data) {
//             state.candidateId = data
//         },
//         setAction(state, func) {
//             state.modals.action = func
//         },
//         setIterator(state, count) {
//             setVideoPosition(count)
//         },
//         setSuccess(state, data) {
//             state.successData = data
//         },
//         setSnackBars(state, data) {
//             state.snacks.snackbar = true
//             state.snacks.text = data
//         }
//     },
//     actions: {
//         candidateType({commit}) {
//             const candidateTypes = axios(`${environment.prodApi + API + CANDIDATE_TYPE}/allActiveAndExternal`, {
//                 method: 'GET',
//             }).then(r => {
//                 commit('setCandidate', r.data)
//                 return r.data
//             })
//
//             return candidateTypes
//         },
//         login({state, commit}, payload) {
//             state.loading = true
//             axios({
//                 method: 'POST',
//                 url: `${environment.prodApi + API + USER}/login`,
//                 data: {
//                     ...payload
//                 }
//             }).then(res => {
//                 if (res.data.token) {
//                     if (res.data.stage === 'completed') {
//                        axios(`${environment.prodApi + API + CANDIDATE}/success/${res.data.candidateId}`, {
//                             method: 'GET',
//                         }).then(r => {
//                             state.modals.popup = true
//                             state.modals.type.default = false
//                             state.modals.type.action = false
//                             state.modals.type.withRoute = false
//                             state.modals.type.strong = false
//                             state.modals.type.description = false
//                             state.modals.type.withList = false
//                             state.modals.type.withOutBtn = true
//                             state.modals.img = require('')
//                             state.modals.description = 'Еще раз спасибо, данные рекрутера'
//                             state.modals.title = r.data.title
//                             state.modals.text = r.data.text
//                         })
//                     } else if (res.data.stage === 'failed') {
//                         state.modals.popup = true
//                         state.modals.type.default = false
//                         state.modals.type.action = false
//                         state.modals.type.withRoute = false
//                         state.modals.type.strong = false
//                         state.modals.type.description = false
//                         state.modals.type.withList = false
//                         state.modals.type.withOutBtn = true
//                         state.modals.img = require('')
//                         state.modals.title = 'Сожалеем,Вы не набрали проходной балл'
//                         state.modals.text = 'Никогда не отчаивайтесь. Если план "А" не сработал, у Вас есть еще 32 буквы, чтобы попробовать'
//                     } else {
//                         commit('setIterator', res.data.index)
//                         setToken(res.data.token)
//                         setId(res.data.candidateId)
//                         setCandidateType(res.data.candidateTypeId)
//                         router.push({ name: res.data.stage })
//                     }
//
//                 }
//             }).catch(e => {
//                 state.loading = false
//                 state.modals.popup = true
//                 state.modals.btnText = "Вернуться назад"
//                 state.modals.type.default = true
//                 state.modals.type.action = false
//                 state.modals.type.withRoute = false
//                 state.modals.type.strong = false
//                 state.modals.type.description = false
//                 state.modals.type.withList = false
//                 state.modals.type.withOutBtn = false
//                 if (e.response.status === 403 || 401) {
//                     state.modals.title = e.response.data
//                 } else {
//                     state.modals.title = 'Произошла серверная ошибка'
//                 }
//             })
//         },
//         getSuccess() {
//             const date = axios(`${environment.prodApi + API + CANDIDATE}/success/${getId()}`, {
//                 method: 'GET',
//             }).then(r => r.data)
//
//             return date
//         },
//         postComment(_, payload) {
//           const data = axios(`${environment.prodApi + API}/feedback/save`, {
//               method: 'POST',
//               data: {
//                   ...payload
//               }
//           }).then(r => r.data)
//
//             return data
//         },
//     },
//     getters: {
//         error: state => state.error
//     },
//     modules: {
//         testing,
//         video
//     }
// });
