# ASP.NET_VueJS_Example

```
project_root/
├── Controllers/ -application entry point and api
|   ├── HomeController.cs -- entry point
|   ├── ProductListController.cs -- api
|   └── ProductDetailsController.cs -- api
├── Models
|   └── Product.cs
├── Views
|   └── Home.cshtml -- main view, entry point
├── Data/
|   ├── List.xml
|   └── Details.xml
└── ClientSide/ -- front-end app
    ├── build
    |   └── Main.bundle.js -- compiled JavaScript used in main view 
    ├── layouts/
    |   └── Main.js
    ├── pages/
    |   ├── Home.js
    |   ├── ProductList.js
    |   ├── ProductDetails.js
    |   └── NotFound.js
    ├── components/
    |    ├── VLink.js
    |    └── Product.js
    └── assets/ -- third party libs, custom styles, images and JS utils
        ├── css/
        │   └── ...
        ├── imgs/
        │   └── ...
        └── js/
            └── ...
```

