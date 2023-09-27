"use strict";
$(function () 
{
	$('input[type=checkbox]').each((index,checkBox)=>
		{
		  chrome.storage.sync.get(checkBox.id,items=>
			  {
				  $(checkBox).prop('checked',items[checkBox.id]);
				  checkBox.onchange= function(checkBox)
					  {
						  saveValue(checkBox.target.id,checkBox.target.checked);
					  }
			  }
		  )
		}
	)
});


function saveValue(key,value) {
// Setting the value raises the setting's change event in the background worker to actualy enable or disable the ruleset in question	
    chrome.storage.sync.set({[key]: value}); 
}

