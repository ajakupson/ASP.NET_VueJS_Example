using ASPNET_VueJS_Example.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nancy.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

namespace ASPNET_VueJS_Example.Controllers
{
    [ApiController]
    [Route("/api/product-list")]
    public class ProductListController : ControllerBase
    {
        private readonly ILogger<ProductListController> _logger;
        public ProductListController(ILogger<ProductListController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public String Get()
        {
            var xDocumentList = XDocument.Load(@"./Data/List.xml");
            string xmlStringList = xDocumentList.Declaration.ToString() + xDocumentList.ToString(SaveOptions.DisableFormatting);
            IEnumerable<XElement> xProductList = XDocument.Parse(xmlStringList).Descendants("Store").Descendants("Product");

            var xDocumentDetail = XDocument.Load(@"./Data/Detail.xml");
            string xmlStringDetail = xDocumentDetail.Declaration.ToString() + xDocumentDetail.ToString(SaveOptions.DisableFormatting);
            IEnumerable<XElement> xProductsDetail = XDocument.Parse(xmlStringDetail).Descendants("Store").Descendants("Product");

            IEnumerable<Product> productList = from xProduct in xProductList
                                            join xDetail in xProductsDetail on xProduct.Attribute("id").Value equals xDetail.Attribute("id").Value
                                            select new Product
                                            {
                                                Id = xProduct.Attribute("id").Value,
                                                Title = xProduct.Element("Title").Value,
                                                Description = xProduct.Element("Description").Value,
                                                Image = xProduct.Element("Image").Value,
                                                Price = Double.Parse(xProduct.Element("Price").Value),
                                                Popular = Int32.Parse(xProduct.Element("Sorting").Element("Popular").Value),
                                                Availability = xDetail.Element("Availability").Value
                                            };

            String jsonResponse = new JavaScriptSerializer().Serialize(productList);
            return jsonResponse;
   
        }
    }
}
    