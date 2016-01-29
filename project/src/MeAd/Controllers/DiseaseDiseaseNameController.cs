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
            diseaseName = diseaseName.Replace("%20", " ");
            diseaseName = diseaseName.Replace("_", " ");
            resultsObject.Add("name", diseaseName);
            resultsObject.Add("abstract", "na");
            resultsObject.Add("id", "na");
            resultsObject.Add("speciality", "na");
            resultsObject.Add("thumbnail", "http://www.martyranodes.com/sites/default/files/images/kits/no_0.jpg");
            if (diseaseName.Length > 0)
            { 
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
                                              FILTER (SUBSTR(str(?wikiID), 1, 25) = 'https://en.wikipedia.org/')
                                            }

                                    OPTIONAL {
                                            ?wikiID schema:inLanguage 'en' . }
                                            filter regex(str(lcase(?disease)), lcase('^" + diseaseName + "$') ) } " +
                                " limit 1";

                try
                {
                    SparqlResultSet results = endpoint.QueryWithResultSet(query);
                    if (results.Count != 0)
                    {
                        SparqlResult result = results[0];
                        string wikiLink = "";
                        try
                        {
                            string id = result["ID"].ToString().Substring(31);
                            resultsObject["id"] = id;
                        }
                        catch (Exception e) { }

                        try
                        {
                            wikiLink = result["wikiID"].ToString();
                        }
                        catch (Exception e) { }

                      

                        

                        // richTextBox1.Text += wikidata_id + "\n";
                        SparqlRemoteEndpoint endpoint2 = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");
                        int start = wikiLink.LastIndexOf("/");
                        string wikidbname = wikiLink.Substring(start+1,wikiLink.Length-start-1);
                        wikidbname = wikidbname.Replace(" ", "_");
                        wikidbname = wikidbname.Replace("%20", "_");
                        query = @"SELECT ?speciality ?abstract ?thumbnail WHERE {  " +
                                "OPTIONAL { <http://dbpedia.org/resource/" + wikidbname + "> <http://dbpedia.org/property/field> ?specID . " +
                                "?specID rdfs:label ?speciality. }" +
                                "OPTIONAL { <http://dbpedia.org/resource/" + wikidbname + "> <http://dbpedia.org/ontology/abstract> ?abstract. }" +
                                " OPTIONAL { <http://dbpedia.org/resource/" + wikidbname + "> <http://dbpedia.org/ontology/thumbnail> ?thumbnail.  }" +
                                "filter(langMatches(lang(?speciality), 'EN'))  " +
                                "filter(langMatches(lang(?abstract), 'EN'))" +
                                "} limit 1";

                        results = endpoint2.QueryWithResultSet(query);
                        result = results[0];
                        try
                        {
                            string speciality = result["speciality"].ToString();
                            resultsObject["speciality"] = speciality.Substring(0, speciality.Length - 3);
                        }
                        catch (Exception e) { }
                        try
                        {
                            string abstr = result["abstract"].ToString();
                            resultsObject["abstract"] = abstr.Substring(0, abstr.Length - 3);
                        }
                        catch  { }

                        try
                        {
                            string thumbnail = result["thumbnail"].ToString();
                            resultsObject["thumbnail"] = thumbnail;
                        }
                        catch { }
                   
                    }

                }
                catch (Exception e) { return new ObjectResult(resultsObject); }
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
