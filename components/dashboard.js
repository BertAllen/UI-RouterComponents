(function() {

	var app = angular.module('affiliates');

	app.component('dashboard', {
		templateUrl: '/components/dashboard.html',
		controller: dashboardController,
		controllerAs: 'db'
	});

	dashboardController.$inject = ['dataService'];

	function dashboardController(dataService) {

		var db = this;

		var data = dataService.getData();
		 
		function sale(catagory) {
			return "$" + (catagory / 1000000).toFixed(2) + "M";
		}

		function saleProgress(catagory) {
			return Math.round(catagory / 5000000 * 100);
		}
		
		var sales = data.reduce(function (total, item) {
			return total + parseFloat(item.sales.replace('$', ''));
		}, 0);

		// db.sales = '$' + (sales / 1000000).toFixed(2) + 'M';
		db.sales = sale(sales);
		db.salesProgress = saleProgress(sales);

		// calculate sales by men
		let men = data.reduce(function (total, item) {
			if (item.gender == "Male") {
				total += parseFloat(item.sales.replace("$", ""))
			}
			return total;
		}, 0);

		db.salesByMen = sale(men);
		db.salesProgByMen = saleProgress(men)

		// calculate sales by women
		let women = data.reduce(function (total, item) {
			if (item.gender == "Female") {
				total += parseFloat(item.sales.replace("$", ""))
			}
			return total;
		}, 0);

		db.salesByWomen = sale(women);
		db.salesProgByWomen = saleProgress(women)
		
		// calculate sales by top state

	}

})();