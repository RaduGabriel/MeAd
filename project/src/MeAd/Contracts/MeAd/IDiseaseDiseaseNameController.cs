// Template: Controller Interface (ApiControllerInterface.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;


namespace MeAd.Raml
{
    public interface IDiseaseDiseaseNameController
    {

        IActionResult Get(string diseaseName);
        IActionResult GetMapBySearchCriteriaValue(string searchCriteria,string value,string diseaseName);
    }
}
