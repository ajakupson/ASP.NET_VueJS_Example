import MainLayout from '../layouts/Main';
import VLink from '../components/VLink';
import axios from 'axios';

export default {
    template: '<main-layout><h1>Product Deatils</h1><p><v-link href="/product-list">Back</v-link></p>\
                <div class="product-details-container-2">\
                    <div class="product-general-info">\
                        <div class="product-image-container">\
                            <p>{{ productDetails.title }}</p>\
                            <img src="./../ClientSide/assets/imgs/product-thumbnail.png"/>\
                        </div>\
                        <div class="product-description-and-price">\
                            <div class="product-description" v-html="productDetails.description">\
                                {{ productDetails.description }}\
                            </div>\
                            <div class="product-price"><p>Price: {{ productDetails.price }} EUR</p></div>\
                        </div>\
                    </div>\
                    <div class="product-specifications">\
                        <p>Specifications</p>\
                        <p v-for="spec in productDetails.listOfSpecs" class="product-details-spec">{{ spec }}</p>\
                    </div>\
                </div>\
               </main-layout>',
    components: {
        'v-link': VLink,
        'main-layout': MainLayout
    },
    data() {
        return {
            productDetails: {}
        }
    },
    mounted(createElement) {
        console.log("Product Details view was rendered");

        var productId = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1);
        console.log("productId", productId);
        axios
            .get('/api/product-details/' + productId)
            .then(response => {
                console.log("response.data", response.data);
                this.productDetails = response.data;
            })
            .catch(error => console.log(error));
    },
    watch: {

    },
    methods: {

    }
}