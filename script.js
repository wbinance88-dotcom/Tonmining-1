const db = window.firebaseDB;
const doc = window.firebaseDoc;
const setDoc = window.firebaseSetDoc;
const getDoc = window.firebaseGetDoc;

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

        const userId =
localStorage.getItem("userId");

if(userId){

    setDoc(
        doc(db,"users",userId),
        {
            balance: balance
        }
    );

}
        
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

    let text = balance.toFixed(4) + " TON";

    if(document.getElementById("balance")){
        document.getElementById("balance").innerHTML = text;
    }

    if(document.getElementById("profileBalance")){
        document.getElementById("profileBalance").innerHTML = text;
    }
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


function showPage(page){

document.querySelector(".container").style.display = "none";
document.getElementById("profilePage").style.display = "none";
document.getElementById("rewardPage").style.display = "none";
document.getElementById("referralPage").style.display = "none";
document.getElementById("taskPage").style.display = "none";

if(page=="home"){
    document.querySelector(".container").style.display = "block";
}

if(page=="referral"){
    document.getElementById("referralPage").style.display = "block";
}

if(page=="reward"){
    document.getElementById("rewardPage").style.display = "block";
}

if(page=="task"){
    document.getElementById("taskPage").style.display = "block";
}

if(page=="profile"){

    document.getElementById("profilePage").style.display = "block";

    let userId =
    localStorage.getItem("userId") || "Guest";

    document.getElementById("username").innerHTML =
    "User ID: " + userId;

    const userRef = doc(db, "users", userId);

    getDoc(userRef).then((snap) => {

        if (snap.exists()) {

            let data = snap.data();

            balance = data.balance || 0;

            updateBalance();
        }

    });

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

document.addEventListener("DOMContentLoaded", function () {

    let withdrawBtn = document.getElementById("withdrawBtn");

    if (withdrawBtn) {

        withdrawBtn.onclick = function () {

            let box =
                document.getElementById("withdrawPage");

            if (box.style.display == "none") {
                box.style.display = "block";
            } else {
                box.style.display = "none";
            }

        };

    }

});
let rewardTimer = document.getElementById("rewardTimer");

function updateRewardTimer() {

    let lastReward =
        parseInt(localStorage.getItem("lastReward")) || 0;

    let now = Date.now();

    let diff = 86400000 - (now - lastReward);

    if (diff <= 0) {

        rewardTimer.innerHTML = "✅ Ready to Claim";

        return;
    }

    let hours =
        Math.floor(diff / 3600000);

    let minutes =
        Math.floor((diff % 3600000) / 60000);

    let seconds =
        Math.floor((diff % 60000) / 1000);

    rewardTimer.innerHTML =
        `⏳ ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateRewardTimer, 1000);

updateRewardTimer();
