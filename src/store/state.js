import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: false,

        hotels: [],

        status: [],

        days: 1,

        user: [],

        signedIn: []

    },
    mutations: {
        updateStatus (state, payload) {
            state.status.length = 0 // empties the array
            state.status.push(payload)
        },

        addUser (state, payload) {
            state.signedIn = payload
        },

        signUser (state, payload) {
            state.signedIn = payload
        },

        setLoading (state, payload) {
            state.loading = payload
        },

        storeHotels (state, payload) {
            state.hotels.push(payload)
        },

        setDays (state, payload) {
            state.days = payload
        }
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
            commit('setLoading', true) // Start loading 
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(response => { // authorise user and get auth uid
                    var uid = response.user.uid
                    firebase.database().ref("users/" + uid).once('value')
                        .then(data => {
                            console.log(data.val())
                            commit('signUser', data.val())
                        })
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
                    let uid = response.user.uid
                    const newUser = {
                        name: payload.name,
                        email: payload.email,
                        uid: response.user.uid
                    }
                    firebase.database().ref('users/' + uid).set(newUser)
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
                
            }) //firestore query ends
            commit('setLoading', false)
        },

        calcDays ({commit}, payload) {
            const date1 = new Date(payload.date1);
            const date2 = new Date(payload.date2);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            commit('setDays', diffDays)
        },

    },
    getters: {
        hotelArr (state) {
            return state.hotels
        },

        countHotels (state) {
            return state.hotels.length
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
        },

        getDays (state) {
            return state.days
        }
    }
})

// const date1 = new Date('7/13/2010');
// const date2 = new Date('12/15/2010');
// const diffTime = Math.abs(date2 - date1);
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
// console.log(diffTime + " milliseconds");
// console.log(diffDays + " days");