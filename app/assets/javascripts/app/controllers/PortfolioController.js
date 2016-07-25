function PortfolioController($scope, Auth, StockService){
  var ctrl = this;
  ctrl.stocks = [];

  ctrl.work = function () {
    $(function () {
      $('.modal-trigger').leanModal();
    });
  };

  ctrl.work();

  function getTickers(stocks) {
    return stocks.map(function(s){return s.symbol;}).join('+');
  };

  function setStocks(stocks) {
    StockService.getStocks(getTickers(stocks)).then(function(stocks){
       ctrl.stocks = stocks.length == undefined ? [stocks] : stocks;
    });
  };

  $scope.$on('addStock', function(e, stock) {
    ctrl.displayForm = false;
    StockService.getStocks(stock.symbol).then(function(stock){
      ctrl.stocks.push(stock);
    })
  });

  $scope.$on('removeStock', function(e, stock) {
    ctrl.displayForm = false;
    for(var i = 0; i < ctrl.stocks.length; i++){
      if (ctrl.stocks[i].symbol == stock[0].symbol) { ctrl.stocks.splice(i, 1); }
    };
  });

  Auth.currentUser().then(function(user){
    ctrl.user = user;
    setStocks(user.stocks);
  });
};

angular
  .module('app')
  .controller('PortfolioController', ['$scope', 'Auth', 'StockService', PortfolioController]);
