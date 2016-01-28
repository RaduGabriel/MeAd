// Template: Controller Interface (ApiControllerInterface.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;


namespace MeAd.Raml
{
    public interface ISearchController
    {

        IActionResult Get(string countryName);
        IActionResult GetDiseaseByDiseaseName(string diseaseName);
    }
}
