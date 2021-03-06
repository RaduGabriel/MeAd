// Template: Base Controller (ApiControllerBase.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

// Do not modify this file. This code was generated by RAML Web Api 2 Scaffolder

namespace MeAd.Raml
{
    [Route("disease/{diseaseName}")]
    public partial class DiseaseDiseaseNameController : Controller
    {


        /// <summary>
		/// View more details about a disease - Disease
		/// </summary>
		/// <param name="diseaseName"></param>
        [HttpGet]
        [Route("")]
        public virtual IActionResult GetBase(string diseaseName)
        {
            // Do not modify this code
            return  ((IDiseaseDiseaseNameController)this).Get(diseaseName);
        }

        /// <summary>
		/// Map with countries - Map
		/// </summary>
		/// <param name="searchCriteria"></param>
		/// <param name="value"></param>
		/// <param name="diseaseName"></param>
        [HttpGet]
        [Route("map/{searchCriteria}/{value}")]
        public virtual IActionResult GetMapBySearchCriteriaValueBase(string searchCriteria,string value,string diseaseName)
        {
            // Do not modify this code
            return  ((IDiseaseDiseaseNameController)this).GetMapBySearchCriteriaValue(searchCriteria,value,diseaseName);
        }
    }
}
