import routes from './routes'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'

var app = new Vue({
    el: '#app',
    components: {
        'Home': Home,
        'ProductList': ProductList,
        'ProductDetails': ProductDetails,
        'NotFound': NotFound
    },
    created: function () {
        console.log("this.currentRoute", this.currentRoute);
    },
    data: {
        currentRoute: window.location.pathname,
        globalVars: {
            productList: {
                sortBy: "",
                sortOrder: "ASC"
            }
        }
    },
    computed: {
        ViewComponent() {
            var apiRoute = this.currentRoute.slice(0, this.currentRoute.lastIndexOf("/") + 1) + "*";
            var isApiRoute = apiRoute in routes;
            if (isApiRoute) return routes[apiRoute];
            else return routes[this.currentRoute] || NotFound
        }
    },
    render(h) { return h(this.ViewComponent) }
})

window.addEventListener('popstate', () => {
    app.currentRoute = window.location.pathname;
})