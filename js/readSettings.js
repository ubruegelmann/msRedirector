"use strict";
var allRules = ["support","azure","learn"];
var enabledRules = [...allRules];
var disabledRules = [];

chrome.storage.onChanged.addListener(function (changes, namespace) {
	allRules.forEach(rule=> 
		{
			if (changes[rule] !==undefined)
			{
				setRuleDisabled(rule,changes[rule].newValue===false);
			}			
		}
	);
});


readSettings();

function setRuleDisabled(rule,disabled)
{
    if (disabled==false && enabledRules.indexOf(rule)<0)
    {
        disabledRules.splice(disabledRules.indexOf(rule),1);
        enabledRules = enabledRules.concat([rule]);
    }
    else
    if (disabled==true && disabledRules.indexOf(rule)<0)
    {
        enabledRules.splice(enabledRules.indexOf(rule),1);
        disabledRules = disabledRules.concat([rule]);
    }
    chrome.declarativeNetRequest.updateEnabledRulesets({"disableRulesetIds":disabledRules,"enableRulesetIds":enabledRules});
}

function readSettings()
{
	allRules.forEach(rule=>
		{
			chrome.storage.sync.get(rule, items=>
				{
				  setRuleDisabled(rule,items[rule] === false)
				}
			);
		}		
	);
};

