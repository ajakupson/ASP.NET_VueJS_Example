﻿import MainLayout from '../layouts/Main'
import VLink from '../components/VLink'

export default {
    template: '<main-layout><h1>Page You Are Looking For Does Not Exist</h1><p><v-link href="/home">Main Page</v-link></p></main-layout>',
        components: {
        'v-link': VLink,
        'main-layout': MainLayout
    }
}