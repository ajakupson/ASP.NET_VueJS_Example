import MainLayout from '../layouts/Main'
import VLink from '../components/VLink'

export default {
        template: '<main-layout><h1>This is application entry point</h1><p><v-link href="/product-list">Product List</v-link></p></main-layout>',
        components: {
        'v-link': VLink,
        'main-layout': MainLayout
    }
}