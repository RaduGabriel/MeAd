// Template: Base Controller (ApiControllerBase.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

// Do not modify this file. This code was generated by RAML Web Api 2 Scaffolder

namespace MeAd.Raml
{
    [Route("search")]
    public partial class SearchController : Controller
    {


        /// <summary>
		/// Search by country name or disease name - Country
		/// </summary>
		/// <param name="objectName"></param>
		/// <param name="type"></param>
        [HttpGet]
        [Route("name/{objectName}/{type}")]
        public virtual IActionResult GetBase(string objectName,string type)
        {
            // Do not modify this code
            return  ((ISearchController)this).Get(objectName,type);
        }
    }
}
