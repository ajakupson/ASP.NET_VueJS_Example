using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNET_VueJS_Example.Models
{
    public class Product
    {

        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public int Popular { get; set; }
        public List<string> ListOfSpecs { get; set; }
        public string Availability { get; set; }
    }
}
