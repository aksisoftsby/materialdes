//var _profileid = 'UA-113558415-1';
// var _profileid = 113558415;
var _profileid = 169111804; // webcepat

function doGet(e) {
	if (e.parameter.g) {
		var profileId = _profileid;
		var tableId = 'ga:' + profileId;
		var startDate = '2018-04-01';   // 2 weeks (a fortnight) ago.
		var endDate = '2018-04-20';      // Today.

		var optArgs = {
			'dimensions': 'ga:eventCategory', // Comma separated list of dimensions.
			// 'sort': '-ga:sessions,ga:keyword', // Sort by sessions descending, then keyword.
			// 'segment': 'dynamic::ga:isMobile==Yes', // Process only mobile traffic.
			// 'filters': 'ga:source==google', // Display only google traffic.
			'start-index': '1',
			'max-results': '250'                     // Display the first 250 results.
		};

// Make a request to the API.
		var results = Analytics.Data.Ga.get(
			tableId, // Table id (format ga:xxxxxx).
			startDate, // Start-date (format yyyy-MM-dd).
			endDate, // End-date (format yyyy-MM-dd).
			'ga:totalEvents', // Comma seperated list of metrics.
			optArgs);

		if (results.getRows()) {
			// return results;
			return ContentService.createTextOutput(JSON.stringify(results)).setMimeType(ContentService.MimeType.JSON);
				
		} else {
			throw new Error('No views (profiles) found');
		}
	} else if (e.parameter.l) {
		listAccounts();
	} else {
		return ContentService.createTextOutput("No G").setMimeType(ContentService.MimeType.TEXT);
	}
}

function listAccounts() {
	var accounts = Analytics.Management.Accounts.list();
	if (accounts.items && accounts.items.length) {
		for (var i = 0; i < accounts.items.length; i++) {
			var account = accounts.items[i];
			Logger.log('Account: name "%s", id "%s".', account.name, account.id);

			// List web properties in the account.
			listWebProperties(account.id);
		}
	} else {
		Logger.log('No accounts found.');
	}
}

function listWebProperties(accountId) {
	var webProperties = Analytics.Management.Webproperties.list(accountId);
	if (webProperties.items && webProperties.items.length) {
		for (var i = 0; i < webProperties.items.length; i++) {
			var webProperty = webProperties.items[i];
			Logger.log('\tWeb Property: name "%s", id "%s".', webProperty.name,
				webProperty.id);

			// List profiles in the web property.
			listProfiles(accountId, webProperty.id);
		}
	} else {
		Logger.log('\tNo web properties found.');
	}
}

function listProfiles(accountId, webPropertyId) {
	// Note: If you experience "Quota Error: User Rate Limit Exceeded" errors
	// due to the number of accounts or profiles you have, you may be able to
	// avoid it by adding a Utilities.sleep(1000) statement here.

	var profiles = Analytics.Management.Profiles.list(accountId,
		webPropertyId);
	if (profiles.items && profiles.items.length) {
		for (var i = 0; i < profiles.items.length; i++) {
			var profile = profiles.items[i];
			Logger.log('\t\tProfile: name "%s", id "%s".', profile.name,
				profile.id);
		}
	} else {
		Logger.log('\t\tNo web properties found.');
	}
}

