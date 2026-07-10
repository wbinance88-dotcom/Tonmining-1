let balance = 0;
let seconds = 0;

document.addEventListener("DOMContentLoaded", function () {
    updateBalance();
    updateTimer();
});

function startMining() {

    if (seconds > 0) {
        alert("Please wait 1 hour.");
        return;
    }

    alert("Ads 1/3");
    alert("Ads 2/3");
    alert("Ads 3/3");

    balance += 0.0009;
    updateBalance();

    seconds = 3600;
    document.getElementById("mineBtn").disabled = true;

    let timer = setInterval(function () {

        seconds--;

        updateTimer();

        if (seconds <= 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "Ready";
            document.getElementById("mineBtn").disabled = false;
        }

    }, 1000);

}

function updateBalance() {
    document.getElementById("balance").innerHTML =
        balance.toFixed(4) + " TON";
}

function updateTimer() {

    if (seconds <= 0) {
        document.getElementById("timer").innerHTML = "Ready";
        return;
    }

    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    document.getElementById("timer").innerHTML = m + "m " + s + "s";
}

function showPage(page) {

    if (page == "home") {
        alert("🏠 Home");

    } else if (page == "referral") {

        let link = "https://tonmining-1.onrender.com/?ref=123456";

        alert(
            "👥 REFERRAL\n\n" +
            "🎁 Reward: 0.01 TON per friend\n\n" +
            "👥 Total Referrals: 0\n" +
            "💰 Referral Earnings: 0.0000 TON\n\n" +
            "🔗 Your Link:\n" +
            link
        );

    } else if (page == "reward") {

        alert("🎁 Daily Reward (Coming Soon)");

    } else if (page == "task") {

        alert("📋 Task (Coming Soon)");

    } else if (page == "profile") {

        alert(
            "👤 Profile\n\n" +
            "Balance: " + balance.toFixed(4) + " TON\n" +
            "Minimum Withdraw: 0.05 TON"
        );

    }

}
