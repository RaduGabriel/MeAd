// Template: Controller Interface (ApiControllerInterface.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;


namespace MeAd.Raml
{
    public interface IQuizController
    {

        IActionResult Get();
        IActionResult GetHard();
        IActionResult GetTop();
        IActionResult GetCheckAnswerByQuestionIDAnswerIdUser(string questionID,string answer,string idUser);
    }
}
