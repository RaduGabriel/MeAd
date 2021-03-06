// Template: Base Controller (ApiControllerBase.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

// Do not modify this file. This code was generated by RAML Web Api 2 Scaffolder

namespace MeAd.Raml
{
    [Route("quiz")]
    public partial class QuizController : Controller
    {


        /// <summary>
		/// get a question from quiz
		/// </summary>
        [HttpGet]
        [Route("easy")]
        public virtual IActionResult GetBase()
        {
            // Do not modify this code
            return  ((IQuizController)this).Get();
        }

        /// <summary>
		/// get a question from quiz
		/// </summary>
        [HttpGet]
        [Route("hard")]
        public virtual IActionResult GetHardBase()
        {
            // Do not modify this code
            return  ((IQuizController)this).GetHard();
        }

        /// <summary>
		/// Get top users from quiz - Top
		/// </summary>
        [HttpGet]
        [Route("top")]
        public virtual IActionResult GetTopBase()
        {
            // Do not modify this code
            return  ((IQuizController)this).GetTop();
        }

        /// <summary>
		/// the answer of a question from the user - checkAnswer
		/// </summary>
		/// <param name="questionID"></param>
		/// <param name="answer"></param>
		/// <param name="idUser"></param>
        [HttpGet]
        [Route("checkAnswer/{questionID}/{answer}/{idUser}")]
        public virtual IActionResult GetCheckAnswerByQuestionIDAnswerIdUserBase(string questionID,string answer,string idUser)
        {
            // Do not modify this code
            return  ((IQuizController)this).GetCheckAnswerByQuestionIDAnswerIdUser(questionID,answer,idUser);
        }
    }
}
