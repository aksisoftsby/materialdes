var pub_adsense = "pub-8797559827267652";
// query parameter 
// start = 
// end = 
// format = yyyy-mm-dd

function doGet(e) {
	// listAdClients();
	if (e.parameter.start && e.parameter.end) {
		rep = json_report(pub_adsense, e.parameter.start, e.parameter.end);
		return ContentService.createTextOutput(JSON.stringify(rep)).setMimeType(ContentService.MimeType.JSON);
	} else {
		return ContentService.createTextOutput(JSON.stringify({
			error: true, msg: "Start and End ?"
		})).setMimeType(ContentService.MimeType.JSON);
	}

	/*if (rep.rows) {
		return ContentService.createTextOutput(JSON.stringify(rep)).setMimeType(ContentService.MimeType.JSON);
		} else {
		return ContentService.createTextOutput("No rows return").setMimeType(ContentService.MimeType.TEXT);
		// Logger.log('No rows returned.');
		}*/
}

function listAdClients() {
	// Retrieve ad client list in pages and log data as we receive it.
	var pageToken, adClients;
	do {
		adClients = AdSense.Adclients.list({
			maxResults: 50,
			pageToken: pageToken
		});
		if (adClients.items) {
			for (var i = 0; i < adClients.items.length; i++) {
				var adClient = adClients.items[i];
				Logger.log('Ad client for product "%s" with ID "%s" was found.',
					adClient.productCode, adClient.id);
				Logger.log('Supports reporting: %s',
					adClient.supportsReporting ? 'Yes' : 'No');
			}
		} else {
			Logger.log('No ad clients found.');
		}
		pageToken = adClients.nextPageToken;
	} while (pageToken);

	// output log :: 
//[18-04-24 07:28:53:051 ICT] Ad client for product "GMOB" with ID "ca-app-pub-8797559827267652" was found.
//[18-04-24 07:28:53:052 ICT] Supports reporting: Yes
//[18-04-24 07:28:53:052 ICT] Ad client for product "AFC" with ID "ca-pub-8797559827267652" was found.
//[18-04-24 07:28:53:053 ICT] Supports reporting: Yes
}

function json_report(adClientId, startDate, endDate) {
	// Prepare report.
	// var today = new Date();
	// var oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

	// var timezone = Session.getTimeZone();
	// var startDate = Utilities.formatDate(oneWeekAgo, timezone, 'yyyy-MM-dd');
	// var endDate = Utilities.formatDate(today, timezone, 'yyyy-MM-dd');

	var report = AdSense.Reports.generate(startDate, endDate, {
		// Specify the desired ad client using a filter.
		accountId: escapeFilterParameter(adClientId),
		// filter: ['AD_CLIENT_ID==' + escapeFilterParameter(adClientId)],
		metric: [
			'PAGE_VIEWS',
			'AD_REQUESTS',
			'AD_REQUESTS_COVERAGE',
			'CLICKS',
			'AD_REQUESTS_CTR',
			'COST_PER_CLICK',
			'AD_REQUESTS_RPM',
			'EARNINGS',
		],
		dimension: ['DATE'],
		// Sort by ascending date.
		sort: ['+DATE'],
		useTimezoneReporting: true // timezone sesuai dengan +7
	});
	// Logger.log(escapeFilterParameter(adClientId));
	return report;
}

/**
	function generateReport(adClientId) {
	// Prepare report.
	var today = new Date();
	var oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
	
	var timezone = Session.getTimeZone();
	var startDate = Utilities.formatDate(oneWeekAgo, timezone, 'yyyy-MM-dd');
	var endDate = Utilities.formatDate(today, timezone, 'yyyy-MM-dd');
	
	var report = AdSense.Reports.generate(startDate, endDate, {
	// Specify the desired ad client using a filter.
	filter: ['AD_CLIENT_ID==' + escapeFilterParameter(adClientId)],
	metric: ['PAGE_VIEWS', 'AD_REQUESTS', 'AD_REQUESTS_COVERAGE', 'CLICKS',
	'AD_REQUESTS_CTR', 'COST_PER_CLICK', 'AD_REQUESTS_RPM',
	'EARNINGS'],
	dimension: ['DATE'],
	// Sort by ascending date.
	sort: ['+DATE']
	});
	
	if (report.rows) {
	var spreadsheet = SpreadsheetApp.create('AdSense Report');
	var sheet = spreadsheet.getActiveSheet();
	
	// Append the headers.
	var headers = report.headers.map(function (header) {
	return header.name;
	});
	sheet.appendRow(headers);
	
	// Append the results.
	sheet.getRange(2, 1, report.rows.length, headers.length)
	.setValues(report.rows);
	
	Logger.log('Report spreadsheet created: %s',
	spreadsheet.getUrl());
	} else {
	Logger.log('No rows returned.');
	}
	}
	**/
/**
	* Escape special characters for a parameter being used in a filter.
	* @param parameter the parameter to be escaped.
	* @return the escaped parameter.
	*/
function escapeFilterParameter(parameter) {
	return parameter.replace('\\', '\\\\').replace(',', '\\,');
}