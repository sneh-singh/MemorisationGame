let game_coin = [];
let coin_result = 0;
function count(count_coin) {  //clicking of coin and count
	if(game_coin.indexOf(parseInt(count_coin.id)) != -1){
		coin_result ++;
		let coin_id = document.getElementById(count_coin.id);
		coin_id.innerHTML = "<img src='images/coin_icon.jpg' alt='coin_icon.png' />";
		coin_id.setAttribute("disabled", "true");
	}
} 
	
window.onload = function() {                             //creating divs and cells for the game
	alert('Memory Game will start in 5 seconds!');
    var output = document.getElementsByTagName("body");
	let cover_board = document.createElement("div");
	cover_board.setAttribute("class", "cover_board");
	output[0].appendChild(cover_board);
	var coin_board = '<div class="coin_board" id="row">';
	coin_board += '<div class="timer_div" id="timer_div">Left Time: 30</div>';
	let coin_row;
	let coin_col;
	let id_value = 1;
    for(coin_row = 1; coin_row <= 8; coin_row++)
    {
		coin_board += '<div class="first_row" id="cell_row'+ coin_row +'">';
		for(coin_col = 1; coin_col <= 8; coin_col ++)
		{
			coin_board += '<div class="coin_cell" id="'+ id_value +'" disabled="true" onclick="count(this)">';
			coin_board += "<img src='images/github_icon.png' alt='github_icon.png' /></div>";
			id_value ++;
		}
		coin_board +='</div>';
	} 
	 
	coin_board += '<button type="button" class="reset_button" name="reset_button" id="reset_button" onclick="window.location.reload();">Reset</button></div>';
	cover_board.innerHTML = coin_board;
	for(let random_row = 1; random_row <= 64; random_row ++) {
		let which_cell = Math.round(Math.random() * (65 - 1));
		let check = true;
		for(let random_col = 0; random_col < game_coin.length; random_col ++) {
			if(parseInt(game_coin[random_col]) == parseInt(which_cell)) {
			check = false;
			}
		}
		
		if(check) {
			game_coin.push(which_cell);
			let cell_place = document.getElementById(which_cell);
			if(which_cell <= 64 && which_cell > 0) {
			cell_place.innerHTML = "<img src='images/coin_icon.jpg' alt='coin_icon.png' />";
			}
		}
	}
	
	let total_time = 30;
	function startTimer() {
		divs_class = document.getElementsByClassName("coin_cell");
			[].slice.call(divs_class).forEach( function(div) {
			   div.setAttribute("disabled", "false");
			   div.innerHTML = "<img src='images/github_icon.png' alt='github_icon.png' />";
			});
			
		let timer = setInterval(function() {                                            // Timer function
			document.getElementById("timer_div").innerHTML ="Left Time: " + total_time;
			total_time = total_time - 1;
			if (total_time < 0) {
				clearInterval(timer);
				alert("Time Out!");
				let res_comment;
				let result_div = document.createElement("div");
				result_div.setAttribute("class", "result_div");
				//condition for result rating....
				(coin_result >= 20 && coin_result < 30) ? coin_resultcount("PASS") 
				: (coin_result >= 30 && coin_result < 40) ? coin_resultcount("GREAT") 
				: (coin_result >= 40) ? coin_resultcount("EXECELENT") 
				: coin_resultcount("FAIL");
				function coin_resultcount(comment_value) {
					res_comment = comment_value;
				}
				result_div.innerHTML = "RESULT: <span class='rate'>" + res_comment + "</span> You matched " + coin_result + " Coins";
				cover_board.appendChild(result_div);
			}
		}, 1000); 
		
		alert('Start Playing Game');
	}
	
	setTimeout(startTimer, 5000);
};//end cells