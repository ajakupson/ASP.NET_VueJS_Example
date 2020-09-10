import MainLayout from '../layouts/Main';
import VLink from '../components/VLink';
import Product from '../components/Product';
import axios from 'axios';

export default {
    template: '<main-layout><h1>Product List</h1><p><v-link href="/home">Back</v-link></p>\
                <div class="product-sort-by-container">\
                <label for="product-sort-by">Sort by:</label>\
                <select id="product-sort-by" name="product-sort-by" v-model="sortBy">\
                    <option value="price">Price</option>\
                    <option value="popular">Popularity</option>\
                </select>\
                <label for="product-sort-order">Order:</label>\
                <select id="product-sort-order" name="product-sort-order" v-model="sortOrder">\
                    <option value="ASC" selected>ASC</option>\
                    <option value="DESC">DESC</option>\
                </select>\
                </div>\
                <div class="product-list"><product v-for="(product, productIndex) in productList" :product="product" :key="product.id + productIndex"></product></div>\
               </main-layout>',
        components: {
        'v-link': VLink,
        'main-layout': MainLayout,
        'product': Product
    },
    data() {
        return {
            productList: [],
            // TODO: cookies or session variables...?
            sortBy: this.$root.globalVars.productList.sortBy,
            sortOrder: this.$root.globalVars.productList.sortOrder
        }
    },
    mounted() {
        console.log("Product List view was rendered");

        axios
            .get('/api/product-list')
            .then(response => {
                console.log("response.data", response.data);
                this.productList = response.data;
                if (this.sortBy != "") {
                    this.sortProducts();
                }
            })
            .catch(error => console.log(error));
    },
    watch: {
        sortBy: function (newVal, oldVal) {
            console.log("product-sort-by was changed");
            this.sortProducts();
            this.$root.globalVars.productList.sortBy = newVal;

        },
        sortOrder: function (newVal, oldVal) {
            console.log("product-sort-order was changed");
            this.sortProducts();
            this.$root.globalVars.productList.sortOrder = newVal;
        }
    },
    methods: {
        sortProducts: function() {
            console.log("sortProducts call");
            var _this = this;
            function dynamicSort(property, sortOrder) {
                var sortOrder = 1;
                if (_this.sortOrder == "DESC") {
                    sortOrder = -1;
                }
                return function(a, b) {
                    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
            }

            this.productList.sort(dynamicSort(this.sortBy));
        }
    }
}