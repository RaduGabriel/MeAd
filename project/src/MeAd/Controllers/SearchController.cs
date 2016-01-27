// Template: Controller Implementation (ApiControllerImplementation.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using VDS.RDF.Query;
using Newtonsoft.Json;

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
            Dictionary<string, string> diseases = new Dictionary<string, string>();
            SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("https://query.wikidata.org/sparql"), "https://query.wikidata.org");
            SparqlResultSet results = endpoint.QueryWithResultSet(@"
                                                                    PREFIX wd: <http://www.wikidata.org/entity/> 
                                                                    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
                                                                    SELECT ?ID ?disease WHERE {
                                                                    ?ID wdt:P699 ?doid .
                                                                    ?ID rdfs:label ?disease filter (lang(?disease) = 'en').

                                                                                filter regex(str(?disease), '" + countryName + "' )}"+
                                                                   " limit 5");
            foreach (SparqlResult result in results)
            {
                string id = result["ID"].ToString();
                id = id.Remove(0, 31);
                string name = result["disease"].ToString();
                name = name.Remove(name.Length - 3);
                diseases.Add(id, name);
               
                // richTextBox1.Text += wikidata_id + "\n";
            }
            // TODO: implement Get - route: search/countries/{countryName}

            return new ObjectResult(diseases);
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
