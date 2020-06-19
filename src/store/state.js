import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: false,
        hotels: [
            // {location: 'Johannesburg', rating: 2, price: 400,  name: 'Raddison Hotel', info: 'blah blah blah', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '01', carouselItems: [
            //     {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
            //     {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
            //     {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            // ]},
            // {location: 'Johannesburg', rating: 2.5, price: 350, name: 'Sun International', info: 'more blahdieblie blah', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '02', carouselItems: [
            //     {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
            //     {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
            //     {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            // ]},
            // {location: 'Cape Town', rating: 3, price: 220, name: 'Some weird hotel name', info: 'some bla text that should actually be from firebase', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '03', carouselItems: [
            //     {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
            //     {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
            //     {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            // ]},
            // {location: 'Bloemfontein', rating: 4, price: 420, name: 'Hotelliee', info: 'some bla text that should actually be from firebase', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '04', carouselItems: [
            //     {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
            //     {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
            //     {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            // ]},
            // {location: 'Bloemfontein', rating: 3.5, price: 300, name: 'Broom broom', info: 'some bla text that should actually be from firebase', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '05', carouselItems: [
            //     {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
            //     {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
            //     {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            // ]}
        ], // Hotels array ENDS

        carouselItems: [],

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

        storeItems(state, payload) {
            state.carouselItems.push(payload)
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

        getHotels ({commit}, payload) {
            firebase.firestore().collection('hotels').where('location', '==', payload).get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const pack = {
                        id: doc.id,
                        imageSrc: doc.data().imageSrc,
                        info: doc.data().info,
                        location: doc.data().location,
                        name: doc.data().name,
                        price: doc.data().price,
                        rating: doc.data().rating
                    }
                    commit('storeHotels', pack)
                })
            })
        },

        getCarousel ({commit}, payload) {
            console.log(payload)
            firebase.firestore().collection('hotels').doc(payload).collection('carousel').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    commit('storeItems', doc.data())
                })
            })
        }
    },
    getters: {
        hotelArr (state) {
            return state.hotels
        },

        carousel (state) {
            return state.carouselItems
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