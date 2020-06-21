import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: false,

        hotels: [],

        status: [],

        user: [],

        signedIn: []

    },
    mutations: {
        updateStatus (state, payload) {
            state.status.length = 0 // empties the array
            state.status.push(payload)
        },

        addUser (state, payload) {
            state.user.length = 0
            state.user.push(payload)
        },

        signUser (state, payload) {
            state.signedIn.length = 0
            state.signedIn.push(payload)
        },

        setLoading (state, payload) {
            state.loading = payload
        },

        storeHotels (state, payload) {
            state.hotels.push(payload)
        },
    },
    actions: {
        updateStatus ({commit}, payload) {
            commit('setLoading', true)
            const info = {
                location: payload.location,
                children: payload.children,
                adults: payload.adults,
                dateIn: payload.dateIn,
                dateOut: payload.dateOut
            }
            commit('updateStatus', info)
            commit('setLoading', false)
        },

        signIn ({commit}, payload) {
            firebase.firestore().collection('hotels').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    console.log(doc.data())
                })
            })

            commit('setLoading', true) // Start loading 
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(response => { // authorise user and get auth uid
                    var uid = response.user.uid
                    commit('signUser', uid)
                    commit('setLoading', false)
                }).catch(error =>{
                    console.log(error)
                    commit('setLoading', false)
                })
                
        },

        logout ({commit}) {
            firebase.auth().signOut()
            commit('signUser', null)
        },

        addUser ({commit}, payload) {
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(response => {
                    const newUser = {
                        name: payload.name,
                        email: payload.email,
                        uid: response.user.uid
                    }
                    commit('addUser', newUser)
                    commit('setLoading', false)
                }).catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },

        getHotels ({commit}) {
            commit('setLoading', true)
            firebase.firestore().collection('hotels').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const pack = {
                        id: doc.id,
                        imageSrc: doc.data().imageSrc,
                        info: doc.data().info,
                        location: doc.data().location,
                        name: doc.data().name,
                        price: doc.data().price,
                        rating: doc.data().rating,
                        carouselItems: doc.data().carouselItems,
                        amenities: doc.data().amenities
                    }
                    commit('storeHotels', pack)
                })
                commit('setLoading', false)
            }) //firestore query ends
        },
    },
    getters: {
        hotelArr (state) {
            return state.hotels
        },

        countHotels (state) {
            return state.hotels.length
        },

        getUser (state) {
            return state.user
        },

        signed (state) {
            return state.signedIn
        },

        getStatus (state) {
            return state.status
        },

        loading (state) {
            return state.loading
        },

        hotelLoc (state) {
            return (loc) => {
                return state.hotels.filter((hotel) => {
                    const locationMatch = hotel.location.includes(loc)
                    return locationMatch
                })
            }
        },

        singleHotel (state) {
            return (hotelID) => {
                return state.hotels.find((hotel) => {
                    return hotel.id === hotelID
                })
            }
        }
    }
}) 