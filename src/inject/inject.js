function execScripts(timer = 1000, cmds, indexToEval = 0) {
	if (indexToEval === cmds.length) return;
	setTimeout(() => {
		eval(cmds[indexToEval]);
		console.log('evaluated: ', cmds[indexToEval]);
		execScripts(timer, cmds, indexToEval + 1);
	}, timer)
}


chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		const styles = "position: fixed; z-index: 1000000; right: 20px;background-color: #0547A5; color: white;padding: 10px; border-radius: 2px; border-color: transparent; ";
		
		const approveMergeNode = '<button id="approve-merge" style="' + styles +'">Approve and merge</button>'
		$('body').prepend(approveMergeNode);
		const approveMergeBtn = $('#approve-merge');
		approveMergeBtn.click(() => execScripts(500, [
			"$('.approve-button').click();", //approve
			"$('#fulfill-pullrequest').click()", // start merge process
			"$('#id_merge_strategy').val('squash')", // squash
			"$('#id_close_anchor_branch').prop('checked', true)", // check delete checkbox
			"$('button.button-panel-button').click()" //merge button
		]));

		const developAlphaNode = '<button id="alpha-develop-merge" style="' + styles + ' right: 175px; ">develop -> alpha merge</button>'
		$('body').prepend(developAlphaNode);
		const developAlphaBtn = $('#alpha-develop-merge');
		developAlphaBtn.click(() => execScripts(500, [
			"$('.approve-button').click();",
			"$('#fulfill-pullrequest').click()",
			"$('button.button-panel-button').click()"
		]));
		// ----------------------------------------------------------
	}
	}, 10);
});


