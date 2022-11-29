const LIMIT = "4";
const SERVER_URL = "https://cache-wc.4yousee.com.br/";
const API_URL = `${SERVER_URL}v1/wc`;
const ENDPOINT = `${API_URL}/upcoming?limit=${LIMIT}&sameDate=true`;
const dateFormat = 'pt-br';


$(document).ready(function () {

    function formatDate(gameDate) {
        let weekday = gameDate.toLocaleDateString(dateFormat, { weekday: 'long' }).replace("-feira", "");
        weekday = weekday[0].toUpperCase() + weekday.slice(1);
        let day = gameDate.toLocaleDateString(dateFormat, { day: 'numeric' });
        let month = gameDate.toLocaleDateString(dateFormat, { month: 'long' });
        let date = `${weekday}, ${day} de ${month}`
        let hour = gameDate.toLocaleTimeString(dateFormat, { hour: '2-digit', minute: '2-digit', hour12: false }).replace(":", "h");
        return {
            date,
            hour
        }
    }

    function showGameInfo(game) {
        let gameDate = new Date(game.date);
        let { date, hour } = formatDate(gameDate);
        $("#date").text(date);
        let stage = game.stage;
        if (game.stage == "Grupos") {
            stage = `Grupo ${game.group}`
        }
        const dataHTML = `
<div class="game-info">
    <div class="center-item-detail">
        <div class="center-container center-container-top">
            <div class="center-item-info">
                <div class="group-game">${stage}</div>
                <div class="hour-game">${hour}</div>
            </div>
        </div>
    </div>
    <div class="game-item">
        <div class="game-teams">
            <div class="team home-team">
                <span class="country-name">${game.home.shortName.toUpperCase()}</span>
                <img src="./img/flags/${game.home.shortName.toUpperCase()}.svg" class="flag-country">
            </div>
            <div class="separator">
                <span>x</span>
            </div>
            <div class="team away-team">
                <img src="./img/flags/${game.away.shortName.toUpperCase()}.svg" class="flag-country">
                <span class="country-name">${game.away.shortName.toUpperCase()}</span>
            </div>
        </div>
    </div>
    <div class="center-item-detail">
        <div class="center-container center-container-bottom">
            <div class="center-item-info">
                <div class="stadium-name">${game.stadium}</div>
            </div>
        </div>
    </div>
</div>`;
        $(".game-container").append(dataHTML);
    }

    $.ajaxSetup({
        headers: {
            'Secret-Token': "Y2MIB91VTUX885GB41CYUEG4AYSLL3"
        }
    });

    $.get(ENDPOINT, function (data) {
        let games = data.response;
        if (games) {
            games.forEach(game => {
                showGameInfo(game);
            });
        }
    });

});
