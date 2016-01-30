// Template: Controller Implementation (ApiControllerImplementation.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using VDS.RDF.Query;
using Newtonsoft.Json;
using MeAd.Models;
using MySql.Data.MySqlClient;

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
            Dictionary<string, Countries.CountryDiseases> countrydiseases = new Dictionary<string, Countries.CountryDiseases>();
            string query = "";
            try
            {
                database db = new database(database.maindb);
                MySqlDataReader rd;
              
                rd = db.ExecuteReader("SELECT code,sum(deaths) as nrDeaths FROM `diseasestatistics` where lower(country)=lower('" + countryName + "') group by code order by sum(deaths) desc limit 10");
                while (rd.Read())
                {
                    countrydiseases.Add(rd.GetString("code"), new Countries.CountryDiseases(rd.GetInt32("nrDeaths"), "", "",""));
                }

                SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");
                foreach (KeyValuePair<string, Countries.CountryDiseases> disease in countrydiseases)
                {
                    query = @"SELECT * WHERE {
                            ?url <http://dbpedia.org/ontology/icd10> ?ID.
                            ?url rdfs:label ?name.
                            ?url <http://dbpedia.org/ontology/abstract> ?description.
                            filter regex(str(lcase(?ID)), concat(lcase('" + disease.Key[0] + "'), '[" + disease.Key[1] + "][" + disease.Key[2] + "][.]?[0-9]?') )" +
                            "filter(langMatches(lang(?name), 'EN'))" +
                            "filter(langMatches(lang(?description), 'EN'))" +
                            "} limit 1";
                    SparqlResultSet results = endpoint.QueryWithResultSet(query);
                    if (results.Count > 0)
                    {
                        disease.Value.Description = results[0]["description"].ToString().Remove(results[0]["description"].ToString().Length - 3);
                        if (disease.Value.Description.Length > 300)
                            disease.Value.Description = disease.Value.Description.Remove(300) + " ...";
                        disease.Value.Disease = results[0]["name"].ToString().Remove(results[0]["name"].ToString().Length - 3);
                        disease.Value.Url = disease.Value.Disease.Replace(" ", "_");
                    }
                    else
                    {
                        query = @"SELECT * WHERE {
                            ?url <http://dbpedia.org/ontology/icd10> ?ID.
                            ?url rdfs:label ?name.
                            ?url <http://dbpedia.org/ontology/abstract> ?description.
                            filter regex(str(lcase(?ID)), concat(lcase('" + disease.Key[0] + "'), '[" + disease.Key[1] + "][0-9][.]?[0-9]?') )" +
                           "filter(langMatches(lang(?name), 'EN'))" +
                           "filter(langMatches(lang(?description), 'EN'))" +
                           "} limit 1";
                        results = endpoint.QueryWithResultSet(query);
                        if (results.Count > 0)
                        {
                            disease.Value.Description = results[0]["description"].ToString().Remove(results[0]["description"].ToString().Length - 3);
                            if (disease.Value.Description.Length > 300)
                                disease.Value.Description = disease.Value.Description.Remove(300) + " ...";
                            disease.Value.Disease = results[0]["name"].ToString().Remove(results[0]["name"].ToString().Length - 3);
                        }
                    }
                }
                db.Close();
            }
            catch (Exception e) { return new ObjectResult(countrydiseases); }
            return new ObjectResult(countrydiseases);
        }

        /// <summary>
        /// Search by disease name - Disease
        /// </summary>
        /// <param name="diseaseName"></param>
        public IActionResult GetDiseaseByDiseaseName(string diseaseName)
        {
            Dictionary<string, string> resultsObject = new Dictionary<string, string>();


            SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("https://query.wikidata.org/sparql"), "https://query.wikidata.org");
            SparqlResultSet results = endpoint.QueryWithResultSet(@"
                                                                    PREFIX wd: <http://www.wikidata.org/entity/> 
                                                                    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
                                                                    SELECT ?ID ?disease WHERE {
                                                                    ?ID wdt:P699 ?doid .
                                                                    ?ID rdfs:label ?disease filter (lang(?disease) = 'en').

                                                                                filter regex(str(?disease), '" + diseaseName + "' )}" +
                                                                   " limit 50");
            foreach (SparqlResult result in results)
            {
                string id = result["ID"].ToString();
                id = id.Remove(0, 31);
                string name = result["disease"].ToString();
                name = name.Remove(name.Length - 3);
                resultsObject.Add(id, name);

                // richTextBox1.Text += wikidata_id + "\n";
            }

            // TODO: implement Get - route: search/countries/{countryName}

            return new ObjectResult(resultsObject);
            // TODO: implement GetDiseaseByDiseaseName - route: search/disease/{diseaseName}

        }

    }
}
