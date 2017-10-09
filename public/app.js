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

$urlRouterProvider.otherwise("/")
})

// angular.module("sproFinder", ["ui.router"]).config(function($stateProvider, $urlRouterProvider) {
//   $urlRouterProvider.otherwise("/")
//   $stateProvider.state("about", {
//     url: "/",
//     templateUrl: "js/about/aboutTmpl.html"
//   })
//   .state("nearme", {
//     url: "/nearme",
//     templateUrl: "js/nearme/nearmeTmpl.html",
//     controller: "nearmeCtrl"
//   })
//   .state("search", {
//     url: "/search",
//     templateUrl: "js/search/searchTmpl.html",
//     controller: "searchCtrl"
//   })
//   .state("learn", {
//     url: "/learn",
//     templateUrl: "js/learn/learnTmpl.html",
//     controller: "learnCtrl"
//   })
