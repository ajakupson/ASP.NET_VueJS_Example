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
    [Route("/api/product-details/{productId}")]
    public class ProductDetailsController : ControllerBase
    {
        private readonly ILogger<ProductDetailsController> _logger;
        public ProductDetailsController(ILogger<ProductDetailsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public String Get(string productId)
        {
            var xDocumentList = XDocument.Load(@"./Data/List.xml");
            string xmlStringList = xDocumentList.Declaration.ToString() + xDocumentList.ToString(SaveOptions.DisableFormatting);
            IEnumerable<XElement> xProductList = XDocument.Parse(xmlStringList).Descendants("Store").Descendants("Product");

            var xDocumentDetail = XDocument.Load(@"./Data/Detail.xml");
            string xmlStringDetail = xDocumentDetail.Declaration.ToString() + xDocumentDetail.ToString(SaveOptions.DisableFormatting);
            IEnumerable<XElement> xProductsDetail = XDocument.Parse(xmlStringDetail).Descendants("Store").Descendants("Product");

            IEnumerable<Product> productDetail = from xProduct in xProductList
                                                 join xDetail in xProductsDetail on xProduct.Attribute("id").Value equals xDetail.Attribute("id").Value
                                                 where xProduct.Attribute("id").Value.Equals(productId)
                                                 select new Product
                                                 {
                                                    Id = xProduct.Attribute("id").Value,
                                                    Title = xProduct.Element("Title").Value,
                                                    Description = xProduct.Element("Description").Value,
                                                    Image = xProduct.Element("Image").Value,
                                                    Price = Double.Parse(xProduct.Element("Price").Value),
                                                    Popular = Int32.Parse(xProduct.Element("Sorting").Element("Popular").Value),
                                                    ListOfSpecs = xDetail.Descendants("Specs").Descendants("Spec").
                                                        Select(spec => (string)spec.Value).
                                                        ToList(),
                                                    Availability = xDetail.Element("Availability").Value
                                                 };

            String jsonResponse = new JavaScriptSerializer().Serialize(productDetail.FirstOrDefault());
            return jsonResponse;

        }
    }
}
