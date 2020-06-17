import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        hotels: [
            {location: 'Johannesburg', rating: 2, price: 400,  name: 'Raddison Hotel', info: 'blah blah blah', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '01', carouselItems: [
                {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
                {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
                {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            ]},
            {location: 'Johannesburg', rating: 2.5, price: 350, name: 'Sun International', info: 'more blahdieblie blah', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '02', carouselItems: [
                {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
                {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
                {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            ]},
            {location: 'Cape Town', rating: 3, price: 220, name: 'Some weird hotel name', info: 'some bla text that should actually be from firebase', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '03', carouselItems: [
                {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
                {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
                {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            ]},
            {location: 'Bloemfontein', rating: 4, price: 420, name: 'Hotelliee', info: 'some bla text that should actually be from firebase', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '04', carouselItems: [
                {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
                {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
                {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            ]},
            {location: 'Bloemfontein', rating: 3.5, price: 300, name: 'Broom broom', info: 'some bla text that should actually be from firebase', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '05', carouselItems: [
                {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
                {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
                {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
            ]}
        ], // Hotels array ENDS

        status: []

    },
    mutations: {
        updateStatus (state, payload) {
            state.status.length = 0 // empties the array
            state.status.push(payload)
        }
    },
    actions: {
        updateStatus ({commit}, payload) {
            const info = {
                location: payload.location,
                children: payload.children,
                adults: payload.adults,
                dateIn: payload.dateIn,
                dateOut: payload.dateOut
            }

            commit('updateStatus', info)
        }
    },
    getters: {
        hotelArr (state) {
            return state.hotels
        },

        getStatus (state) {
            return state.status
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