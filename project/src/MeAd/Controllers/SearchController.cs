// Template: Controller Implementation (ApiControllerImplementation.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace MeAd.Raml
{
    public partial class SearchController : ISearchController
    {

		/// <summary>
		/// Search by country name - Country
		/// </summary>
		/// <param name="countryName"></param>
        public IActionResult Get(string countryName)
        {

            // TODO: implement Get - route: search/countries/{countryName}
			return new ObjectResult(countryName);
        }

		/// <summary>
		/// Search by disease name - Disease
		/// </summary>
		/// <param name="diseaseName"></param>
        public IActionResult GetDiseaseByDiseaseName(string diseaseName)
        {
            // TODO: implement GetDiseaseByDiseaseName - route: search/disease/{diseaseName}
			return new ObjectResult("");
        }

    }
}
