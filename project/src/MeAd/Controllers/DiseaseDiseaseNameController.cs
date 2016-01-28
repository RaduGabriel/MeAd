// Template: Controller Implementation (ApiControllerImplementation.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using VDS.RDF.Query;

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
            Dictionary<string, string> resultsObject = new Dictionary<string, string>();
            if (diseaseName.Length > 0)
            {
                diseaseName = diseaseName.Replace("%20", " ");
                diseaseName = diseaseName.Replace("_", " ");

                SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("https://query.wikidata.org/sparql"), "https://query.wikidata.org");

                string query = @" PREFIX entity: <http://www.wikidata.org/entity/> 
                                    PREFIX p: <http://www.wikidata.org/prop/direct/>
                                    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
                                    prefix schema: <http://schema.org/>

                                    SELECT ?ID ?disease ?wikiID WHERE {
                                    ?ID wdt:P699 ?doid .
                                    ?ID rdfs:label ?disease filter (lang(?disease) = 'en').
                                                                    
                                     OPTIONAL {
                                              ?wikiID schema:about ?ID.
                                              ?wikiID schema:inLanguage 'en' .
                                              FILTER (SUBSTR(str(?wikiID), 1, 25) = 'https://en.wikipedia.org/')
                                            }

                                        filter regex(str(?disease), '^" + diseaseName + "$' )}" +
                                "ORDER by ASC((?disease)) limit 1";
                try
                {
                    SparqlResultSet results = endpoint.QueryWithResultSet(query);
                    if (results.Count != 0)
                    {
                        SparqlResult result = results[0];
                        string wikiLink = "";
                        string id = result["ID"].ToString().Substring(31);
                        try
                        {
                            wikiLink = result["wikiID"].ToString();
                        }
                        catch { }
                        string name = diseaseName;
                        if (wikiLink.Length > 0 && wikiLink.Contains("/"))
                        {
                            name = wikiLink.Substring(wikiLink.LastIndexOf("/") + 1, wikiLink.Length - wikiLink.LastIndexOf("/") - 1);
                            resultsObject.Add("name", name);
                        }
                        resultsObject.Add("id", id);


                        // richTextBox1.Text += wikidata_id + "\n";
                        SparqlRemoteEndpoint endpoint2 = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");

                        string wikidbname = name.Replace("%20", "_");
                        wikidbname = wikidbname.Replace(" ", "_");
                        query = @"SELECT ?speciality ?abstract WHERE {  " +
                                "OPTIONAL { <http://dbpedia.org/resource/" + wikidbname + "> <http://dbpedia.org/property/field> ?specID . " +
                                "?specID rdfs:label ?speciality. }" +
                                "OPTIONAL { <http://dbpedia.org/resource/" + wikidbname + "> <http://dbpedia.org/ontology/abstract> ?abstract. }" +
                                "filter(langMatches(lang(?speciality), 'EN'))  " +
                                "filter(langMatches(lang(?abstract), 'EN'))" +
                                "} limit 1";


                        try
                        {
                            results = endpoint2.QueryWithResultSet(query);
                        }
                        catch { return new ObjectResult(query); }
                        try
                        {
                            result = results[0];
                        }
                        catch
                        {
                            return new ObjectResult("Query inexistent" + query);
                        }
                        try
                        {
                            string speciality = result["speciality"].ToString();
                            resultsObject.Add("speciality", speciality.Substring(0, speciality.Length - 3));
                        }
                        catch
                        {
                            resultsObject.Add("speciality", "na");
                        }

                        try
                        {
                            string abstr = result["abstract"].ToString();
                            resultsObject.Add("abstract", abstr.Substring(0, abstr.Length - 3));
                        }
                        catch
                        {
                            resultsObject.Add("abstract", "na");
                        }
                    }


                }
                catch(Exception e) { return new ObjectResult(e.ToString()); }
                }
            
            // TODO: implement Get - route: search/countries/{countryName}

            return new ObjectResult(resultsObject);
            // TODO: implement Get - route: disease/{diseaseName}/

        }

        /// <summary>
        /// Map with countries - Map
        /// </summary>
        /// <param name="searchCriteria"></param>
        /// <param name="value"></param>
        /// <param name="diseaseName"></param>
        public IActionResult GetMapBySearchCriteriaValue(string searchCriteria, string value, string diseaseName)
        {
            // TODO: implement GetMapBySearchCriteriaValue - route: disease/{diseaseName}/map/{searchCriteria}/{value}
            return new ObjectResult("");
        }

    }
}
