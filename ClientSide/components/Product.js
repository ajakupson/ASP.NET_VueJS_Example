import VLink from '../components/VLink'

export default {
    template: '<div class="product" v-bind:product="product">\
                <div class="product-image-container"><img src="./../ClientSide/assets/imgs/product-thumbnail.png"/></div>\
                <div class="product-details-container">\
                    <p>{{ product.title }}</p>\
                    <p v-html="updatedProductDescription">{{ updatedProductDescription }}</p>\
                    <p>Popularity: {{ product.popular }}</p>\
                    <v-link :href="productDetailsUrl" customClass="product-more-details-link-button">More details</v-link>\
                </div>\
                <div class="product-price-container">\
                    <p>Price: {{ product.price }} EUR</p>\
                    <p>Availability: <span class="product-availability">{{ product.availability }}</span></p>\
                </div>\
               </div>',
    components: {
        'v-link': VLink
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            productDetailsUrl: "/product-details/" + this.product.id,
        }
    },
    computed: {
        updatedProductDescription: function () {
            var newDescription = this.product.description.slice(0, this.product.description.lastIndexOf(">") + 1) + " " +
                this.product.id + " " + this.product.description.slice(this.product.description.lastIndexOf(">") + 1);
            //console.log("newDescription", newDescription);
            return newDescription;
        }

    },
    methods: {

    }
}
