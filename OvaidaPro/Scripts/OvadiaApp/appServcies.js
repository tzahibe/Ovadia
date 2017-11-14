OvadiaApp.service('appServices', ['$http', function ($http) {

    /* Event Services -------------------> */
    var url = '';

    this.getAllEvents = function () {
        return $http({
            url: url + '/event/GetAllEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.GetActiveEvents = function () {
        return $http({
            url: url + '/event/GetActiveEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.getAllFixedEvents = function () {
        return $http({
            url: url + '/event/GetAllFixedEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.GetActiveFixedEvents = function () {
        return $http({
            url: url + '/event/GetActiveFixedEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.GetWeekEvents = function () {
        return $http({
            url: url + '/event/GetWeekEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.updateEvent = function (eventObj) {

        var data = {
            ID: eventObj.ID,
            Full_Date: eventObj.Full_Date,
            Event_Name: eventObj.Event_Name,
            From_Hour: eventObj.From_Hour,
            From_Minutes: eventObj.From_Minutes,
            To_Hour: eventObj.To_Hour,
            To_Minutes: eventObj.To_Minutes,
            Status: eventObj.Status,
            Date: eventObj.Date,
            Comment: eventObj.Comment
        }
        return $http({
            url: url + '/event/UpdateEvent',
            data: JSON.stringify(data) ,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.addEvent = function (eventObj) {
        
        return $http({
            url: url + '/event/AddEvent',
            data: JSON.stringify(eventObj),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }); 
    }

    this.removeEvent = function (idS) {
        var event = {
            eventId: idS
        }
        return $http({
            url: url + '/event/RemoveEvent',
            data: event,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /* Message Services -------------------> */

    this.getAllMembers = function () {
        return $http({
            url: url + '/Message/GetAllMembers',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.AddEmail = function (msgObj) {
        return $http({
            url: url + '/Message/AddEmail',
            data: JSON.stringify(msgObj),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.removeEmail = function (idS) {
        var msg = {
            msgId: idS
        }
        return $http({
            url: url + '/message/RemoveEmail',
            data: msg,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.sendEmail = function (msg) {
        return $http({
            url: url + '/Message/SendMail',
            data: JSON.stringify(msg),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /* TFILOT Services -------------------> */

    this.getAllTfilot = function () {
        return $http({
            url: url + '/tfila/GetAllTfilot',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.AddTfila = function (tfila) {
        return $http({
            url: url + '/tfila/AddTfila',
            data: JSON.stringify(tfila),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.UpdateTfila = function (tfila) {
        return $http({
            url: url + '/tfila/UpdateTfila',
            data: JSON.stringify(tfila),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.RemoveTfila = function (id) {
        var id = {
            ID: id
        }
        return $http({
            url: url + '/tfila/RemoveTfila',
            data: JSON.stringify(id),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /* USER Services -------------------> */
    this.Login = function (username, pass) {
        var param = {
            password: pass,
            UserName: username
        }
        return $http({
            url: url + '/UsersDetails/Login',
            data: JSON.stringify(param),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.IsLogin = function () {
        return $http({
            url: url + '/UsersDetails/IsLogin',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.Logout = function () {
        return $http({
            url: url + '/UsersDetails/Logout',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

     /* Category Services -------------------> */

    this.GetAllActiveCategories = function () {
        return $http({
            url: url + '/CategorySer/GetAllActiveCategories',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllCategories = function (showtags) {
        var param = {
            showTags: showtags
        }
        return $http({
            url: url + '/CategorySer/GetAllCategories',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllActiveCategoriesAcceptId = function (id) {
        var param = {
            Id: id
        }
        return $http({
            url: url + '/CategorySer/GetAllActiveCategoriesAcceptId',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllChildrensCategoriesById = function (id, showtags) {
        var param = {
            catId: id,
            showTags: showtags
        }
        return $http({
            url: url + '/CategorySer/GetAllChildrensCategoriesById',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

     /* Article Services -------------------> */
    this.AddArticle = function (article) {
        return $http({
            url: url + '/ArticleSer/AddArticle',
            method: 'POST',
            data: JSON.stringify(article),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetNewActiveArticles = function () {
        return $http({
            url: url + '/ArticleSer/GetNewActiveArticles',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }
    
    this.GetArticle = function (id) {
        var param = {
            articleId: id
        }
        return $http({
            url: url + '/ArticleSer/GetArticleById',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetArticlesByCategoryId = function (id) {
        var param = {
            categoryId: id
        }
        return $http({
            url: url + '/ArticleSer/GetArticlesByCategoryId',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.AutoCompleteGetCategoriesByName = function (name) {
        return $http({
            url: url + '/ArticleSer/AutoCompleteGetCategoriesByName?name=' + name,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data.Data;
        });
    }

    this.GetAllArticles = function () {
        return $http({
            url: url + '/ArticleSer/GetAllArticles',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllActiveArticles = function () {
        return $http({
            url: url + '/ArticleSer/GetAllActiveArticles',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.UpdateArticleViews = function (article_id) {
        var param = {
            articleId: article_id
        }

        return $http({
            url: url + '/ArticleSer/UpdateArticleViews',
            method: 'Post',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

   /* Comment Services -------------------> */
    this.CommentSave = function (comment) {
        return $http({
            url: url + '/CommentSer/Save',
            method: 'POST',
            data: comment,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetComment = function () {
        return $http({
            url: url + '/CommentSer/GetComment',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

  /* Recommendation Services -------------------> */

    this.AddRecomm = function (article) {
        return $http({
            url: url + '/RecommendationSer/AddRecomm',
            method: 'POST',
            data: JSON.stringify(article),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.EditRecomm = function (article) {
        return $http({
            method: 'POST',
            url: "/RecommendationSer/EditRecomm",
            data: JSON.stringify(article),
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        }).then(function (response) {
            return response.data;
        });
    }

    this.RemoveRecommById = function (id) {
        var param = {
            articleId: id
        }
        return $http({
            url: url + '/RecommendationSer/RemoveRecommById',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetRecommById = function (id) {
        var param = {
            articleId: id
        }
        return $http({
            url: url + '/RecommendationSer/GetRecommById',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllRecomm = function () {
        return $http({
            url: url + '/RecommendationSer/GetAllRecomm',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllActiveRecomm = function () {
        return $http({
            url: url + '/RecommendationSer/GetAllActiveRecomm',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

   /* Tags Services -------------------> */

    this.AddTag = function (tag) {
        var obj = {
            tagName: tag
        }
        return $http({
            url: url + '/CategorySer/AddTag',
            method: 'POST',
            data: JSON.stringify(obj),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    /* Carusel -----------------> */

    this.SaveCaruselArticles = function (articles) {
        
        return $http({
            url: url + '/ArticleSer/SaveCaruselArticles',
            method: 'POST',
            data: JSON.stringify(articles),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetCaruselArticles = function () {
        return $http({
            url: url + '/ArticleSer/GetCaruselArticles',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

     /* TRUMA ---------------------> */

    this.SaveTruma = function (truma) {

        return $http({
            url: url + '/TrumaSer/Save',
            method: 'POST',
            data: JSON.stringify(truma),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllTActiveTruma = function () {
        return $http({
            url: url + '/TrumaSer/GetAllTActiveTruma',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllTTruma = function () {
        return $http({
            url: url + '/TrumaSer/GetAllTTruma',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    /* TRUMA Person-----------------> */
    this.SavePersonTruma = function (truma) {

        return $http({
            url: url + '/TrummaPersonSer/Save',
            method: 'POST',
            data: JSON.stringify(truma),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetPersonTruma = function (id) {
        var param = {
            Id : id
        }
        return $http({
            url: url + '/TrummaPersonSer/Get',
            method: 'POST',
            data: JSON.stringify(param),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.PaySucceed = function (id) {
        var param = {
            Id: id
        }
        return $http({
            url: url + '/TrummaPersonSer/PaySucceed',
            method: 'POST',
            data: JSON.stringify(param),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.SmallGet = function () {
        return $http({
            url: url + '/TrummaPersonSer/SmallGet',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllTormim = function () {
        return $http({
            url: url + '/TrummaPersonSer/GetAllTormim',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

     /* Sidur ----------------------> */
    this.EditSidurCategory = function (sidur) {
        return $http({
            url: url + '/Sidur1/EditCategory',
            method: 'POST',
            data: sidur,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllSidurCateogires = function () {
        return $http({
            url: url + '/Sidur1/GetCateogires',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetsSidurSubCateogires = function (parent_id) {
        var param = {
            parentId : parent_id
        }

        return $http({
            url: url + '/Sidur1/GetsSubCateogires',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.AddSidurCategory = function (sidur) {
        return $http({
            url: url + '/Sidur1/AddCategory',
            method: 'Post',
            data: sidur,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllSidurTfilot = function () {
        return $http({
            url: url + '/Sidur1/GetAllSidurTfilot',
            method: 'Post',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.RemoveSidurCategory = function (id) {
        var param = {
            Id: id
        }
        return $http({
            url: url + '/Sidur1/RemoveSidurCategory',
            method: 'Post',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.Siduer_GetAll = function () {
        return $http({
            url: url + '/Sidur1/GetAll',
            method: 'Post',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }
}]);