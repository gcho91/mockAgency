angular.module('agencySite', ["ui.router"]).config(function($stateProvider, $urlRouterProvider) {

$stateProvider.state("home", {
  url: "/",
  templateUrl: "public/home/home.html",
  controller: "mainCtrl"
})
.state('about', {
  url: "/about",
  templateUrl: "public/about/about.html"
})
.state('services', {
  url: '/services',
  templateUrl: "public/services/services.html",
  css: "styles.css"
})
.state('blog', {
  url: "/blog",
  templateUrl: "public/blog/blog.html"
})
.state('clients', {
  url: '/clients',
  templateUrl: "public/clients/clients.html"
})
.state('clientform', {
  url: '/clients/form',
  templateUrl: "public/clients/form.html",
  controller: "formCtrl"
})

$urlRouterProvider.otherwise("/")
})
