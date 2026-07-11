const db = window.firebaseDB;
const doc = window.firebaseDoc;
const setDoc = window.firebaseSetDoc;

console.log(db);

let balance = Number(localStorage.getItem("balance")) || 0;
let seconds = Number(localStorage.getItem("seconds")) || 0;
let lastReward = Number(localStorage.getItem("lastReward")) || 0;
let miningEndTime = Number(localStorage.getItem("miningEndTime")) || 0;
document.addEventListener("DOMContentLoaded", function () {
    updateBalance();
    updateTimer();

    if (miningEndTime > Date.now()) {
    seconds = Math.ceil((miningEndTime - Date.now()) / 1000);

    document.getElementById("mineBtn").disabled = true;

    let timer = setInterval(function () {

        seconds = Math.ceil((miningEndTime - Date.now()) / 1000);

        updateTimer();

    if (seconds <= 0) {

    clearInterval(timer);

    balance += 0.0009;

    localStorage.setItem("balance", balance);

    updateBalance();

    document.getElementById("timer").innerHTML = "Ready";

    document.getElementById("mineBtn").disabled = false;

    localStorage.removeItem("miningEndTime");

    miningEndTime = 0;
    seconds = 0;

    alert("⛏ Mining Complete!\n\n+0.0009 TON");
    }

    

    }, 1000);
    }
});
    

function startMining() {

    if (miningEndTime > Date.now()) {
        alert("⏳ Mining already running");
        return;
    }

    alert("Ads 1/3");
    alert("Ads 2/3");
    alert("Ads 3/3");

    miningEndTime = Date.now() + (60 * 60 * 1000);
seconds = 60 * 60;

    localStorage.setItem(
        "miningEndTime",
        miningEndTime
    );

    seconds = 60;

    document.getElementById(
        "mineBtn"
    ).disabled = true;

    updateTimer();

    let timer = setInterval(function () {

        seconds = Math.ceil(
            (miningEndTime - Date.now()) / 1000
        );

        updateTimer();

        if (seconds <= 0) {

            clearInterval(timer);

            balance += 0.0009;

            localStorage.setItem(
                "balance",
                balance
            );

            updateBalance();

            localStorage.removeItem(
                "miningEndTime"
            );

            miningEndTime = 0;
            seconds = 0;

            document.getElementById(
                "mineBtn"
            ).disabled = false;

            document.getElementById(
                "timer"
            ).innerHTML = "Ready";

            alert(
                "⛏ Mining Complete!\n\n+0.0009 TON"
            );
        }

    }, 1000);

}

function updateBalance() {
    document.getElementById("balance").innerHTML =
        balance.toFixed(4) + " TON";
}
function updateTimer() {

    if (miningEndTime > 0) {
        seconds = Math.max(
            0,
            Math.ceil((miningEndTime - Date.now()) / 1000)
        );
    }

    if (seconds <= 0) {
        document.getElementById("timer").innerHTML = "Ready";
        document.getElementById("mineBtn").disabled = false;
        return;
    }

    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    document.getElementById("timer").innerHTML = m + "m " + s + "s";
}


function showPage(page) {

    if (page == "home") {

    document.querySelector(".top-card").style.display = "block";

document.getElementById("profilePage").style.display = "none";

document.getElementById("rewardPage").style.display = "none";

    } else if (page == "referral") {

        let userId = localStorage.getItem("userId");

if (!userId) {
    userId = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("userId", userId);
}

let link = "https://tonmining-1.onrender.com/?ref=" + userId;

        let copy = confirm(
    "👥 REFERRAL\n\n" +
    "🎁 Reward: 0.01 TON per friend\n\n" +
    "👥 Total Referrals: 0\n" +
    "💰 Referral Earnings: 0.0000 TON\n\n" +
    "🔗 Your Link:\n\n" +
    link +
    "\n\nPress OK to Copy Link"
);

if (copy) {
    navigator.clipboard.writeText(link);
    alert("✅ Referral Link Copied!");
}

} else if (page == "reward") {

    document.querySelector(".top-card").style.display = "none";

    document.getElementById("profilePage").style.display = "none";

    document.getElementById("rewardPage").style.display = "block";

} else if (page == "task") {
        alert("📋 Task (Coming Soon)");

} else if (page == "profile") {

    document.querySelector(".top-card").style.display = "none";

    document.getElementById("profilePage").style.display = "block";

    let userId =
        localStorage.getItem("userId") || "Guest";

    document.getElementById("username").innerHTML =
        "User ID: " + userId;

    }
}
document.addEventListener("DOMContentLoaded", function () {

    let rewardBtn = document.getElementById("dailyRewardBtn");

    if (rewardBtn) {

        rewardBtn.onclick = function () {

            let now = Date.now();

            if (now - lastReward < 86400000) {

                let remain = Math.ceil(
                    (86400000 - (now - lastReward)) / 3600000
                );

                alert(
                    "⏳ Daily Reward already claimed\n\n" +
                    remain + " hour(s) remaining"
                );

                return;
            }

            balance += 0.001;

            localStorage.setItem(
                "balance",
                balance
            );

            updateBalance();

            lastReward = now;

            localStorage.setItem(
                "lastReward",
                lastReward
            );

            alert(
                "🎁 Daily Reward Claimed!\n\n+0.001 TON"
            );

        };

    }

});
