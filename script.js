const db = window.firebaseDB;
const doc = window.firebaseDoc;
const setDoc = window.firebaseSetDoc;

console.log(db);

let balance = Number(localStorage.getItem("balance")) || 0;
let seconds = Number(localStorage.getItem("seconds")) || 0;
let lastReward = Number(localStorage.getItem("lastReward")) || 0;
localStorage.setItem("seconds", 0);
seconds = 0;
document.addEventListener("DOMContentLoaded", function () {
    updateBalance();
    updateTimer();

    if (seconds > 0) {
        document.getElementById("mineBtn").disabled = true;

        let timer = setInterval(function () {

            seconds--;
            localStorage.setItem("seconds", seconds);

            updateTimer();

            if (seconds <= 0) {
                clearInterval(timer);
                document.getElementById("timer").innerHTML = "Ready";
                document.getElementById("mineBtn").disabled = false;
                localStorage.setItem("seconds", 0);
            }

        }, 1000);
    }
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
localStorage.setItem("balance", balance);

// Save balance to Firestore
const userId = localStorage.getItem("userId") || "test";

setDoc(
    doc(db, "users", userId),
    {
        balance: balance
    },
    { merge: true }
)
.then(() => {
    alert("✅ Firestore Save Success");
})
.catch((error) => {
    alert("❌ Firestore Error: " + error.message);
});

    seconds = 60;
    document.getElementById("mineBtn").disabled = true;

    let timer = setInterval(function () {

        seconds--;
        localStorage.setItem("seconds", seconds);

        updateTimer();

        if (seconds <= 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "Ready";
            document.getElementById("mineBtn").disabled = false;
            localStorage.setItem("seconds", 0);
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

    let now = Date.now();

    if (now - lastReward < 86400000) {
        let remain = Math.ceil((86400000 - (now - lastReward)) / 3600000);

        alert("⏳ Daily Reward already claimed.\n\nCome back in " + remain + " hour(s).");
        return;
    }

    balance += 0.001;
    updateBalance();
    localStorage.setItem("balance", balance);

    lastReward = now;
    localStorage.setItem("lastReward", lastReward);

    alert(
        "🎁 Daily Reward Claimed!\n\n" +
        "You received: 0.001 TON"
    );

} else if (page == "task") {
        alert("📋 Task (Coming Soon)");

} else if (page == "profile") {

    let wallet = prompt("Enter your TON Wallet Address:");

    if (wallet == null || wallet == "") {
        return;
    }

    if (balance < 0.05) {

        alert(
            "❌ Withdraw Failed\n\n" +
            "Minimum Withdraw is 0.05 TON"
        );

        return;
    }

    alert(
        "✅ Withdraw Request Sent!\n\n" +
        "Wallet:\n" + wallet + "\n\n" +
        "Amount: " + balance.toFixed(4) + " TON"
    );

    }
}
