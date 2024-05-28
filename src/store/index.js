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
     toast: {
         show: false,
         message: ''
     },
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
                x: rect.left + 60,
                y:  rect.top -60
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

