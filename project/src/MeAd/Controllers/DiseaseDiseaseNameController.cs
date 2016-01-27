// Template: Controller Implementation (ApiControllerImplementation.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace MeAd.Raml
{
    public partial class DiseaseDiseaseNameController : IDiseaseDiseaseNameController
    {

		/// <summary>
		/// View more details about a disease - Disease
		/// </summary>
		/// <param name="diseaseName"></param>
        public IActionResult Get(string diseaseName)
        {
            // TODO: implement Get - route: disease/{diseaseName}/
			return new ObjectResult("");
        }

		/// <summary>
		/// Map with countries - Map
		/// </summary>
		/// <param name="searchCriteria"></param>
		/// <param name="value"></param>
		/// <param name="diseaseName"></param>
        public IActionResult GetMapBySearchCriteriaValue(string searchCriteria,string value,string diseaseName)
        {
            // TODO: implement GetMapBySearchCriteriaValue - route: disease/{diseaseName}/map/{searchCriteria}/{value}
			return new ObjectResult("");
        }

    }
}
