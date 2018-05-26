(function() {
  var queryParams = parseQuery(location.search);
  var loggedInUser = getLoggedInUser();

  renderHeaderMenu(loggedInUser);

  if (/\/thankyou/.test(location.pathname)) {
    renderThankYouPage(queryParams);
  }

  function renderHeaderMenu(user) {
    var templateParams = {};
    if (user) {
      templateParams.username = user.nickname;

      // Only show the link to the hosted Chargebee customer billing portal if the logged-in
      // user is a paid subscriber. We can tell this if there is at least one role since each
      // role corresponds to a paid Chargebee subscription plan. The `/paywall` is the
      // path where the paywall plugin is mounted in aerobatic.yml. The return_url is where
      // the user should be redirected to when they exit the portal. Most of the time you probably
      // want to return to the current page.
      if (user.authorization && user.authorization.roles.length) {
        templateParams.billingPortalUrl =
          "/paywall?mode=billing_portal&return_url=" + location.pathname;
      }

      templateParams.logOutUrl = "/members?__logout=1";
    } else {
      // If the user is not logged-in, show a "Sign Up" link in the header
      templateParams.signUpUrl = "/members?initial_screen=signUp";
    }

    bindTemplateContent("menu_template", templateParams, "menu");
  }

  // The thankyou page is called with the following query parameters:
  // plan_id - the Chargebee Plan ID, i.e. "premium-lesson-1" that the user just subscribed to
  // plan_name - the Chargebee Plan name, i.e. "Premium Lesson 1"
  // subscription_id - not that important, but in case you want to display for the customer's own reference
  // return_url - the url to the premium content that the customer just paid to access
  function renderThankYouPage() {
    bindTemplateContent("thankyou_template", queryParams, "thankyou_content");
  }

  function getLoggedInUser() {
    // If there is a logged in user show their name linking to the my account page
    // If the user is anonymous, show a sign up link
    // Parse the user object from the document.cookie
    var user;

    // Just a hacky way to test when running jekyll locally
    // outside of Aerobatic
    if (/127.0.0.1/.test(location.hostname)) {
      user = {
        name: "David",
        authorization: {
          roles: ["basic-plan"]
        }
      };
    } else {
      var userMatch = document.cookie.match(/[; ]?user=([^\s;]*)/);
      if (userMatch && userMatch.length > 1) {
        user = JSON.parse(unescape(userMatch[1]));
      }
    }
    return user;
  }

  function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === "?"
      ? queryString.substr(1)
      : queryString
    ).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
  }

  // Simple helper function for binding params to a template and injecting
  // the result into a DOM element.
  function bindTemplateContent(templateId, templateParams, contentElemId) {
    var template = document.getElementById(templateId).innerHTML;

    // Need to specify custom mustache delimiters to avoid
    // conflicting with the server side jekyll liquid tags
    Mustache.parse(template, ["<%", "%>"]);

    var rendered = Mustache.render(template, templateParams);

    document.getElementById(contentElemId).innerHTML = rendered;
  }
})();
