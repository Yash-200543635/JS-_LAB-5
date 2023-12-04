/* Variables
-------------------------------------------------- */
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

/* Functions
-------------------------------------------------- */
function updateBatteryStatus(battery) {
    // Update the charging status
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    
    // Update the charge level
    const chargePercentage = Math.round(battery.level * 100);
    chargeLevel.textContent = chargePercentage + "%";
    chargeMeter.value = chargePercentage;

    // Fetch image from the 3rd party API
    const robohashUrl = `https://robohash.org/${chargePercentage}.png`;
    const image = new Image();
    image.src = robohashUrl;

    // Display the image on the HTML page
    image.onload = () => {
        const robohashContainer = document.getElementById('robohash-container');
        robohashContainer.innerHTML = ''; // Clear previous images
        robohashContainer.appendChild(image);
    };
}

navigator.getBattery().then(battery => {
    console.log(battery);
    updateBatteryStatus(battery);

    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });

    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});
