function getData() {
  return JSON.parse(localStorage.getItem("laundryData")) || [];
}

function saveData(data) {
  localStorage.setItem("laundryData", JSON.stringify(data));
}

/* STUDENT SUBMIT */
function submitLaundry() {
  const nameInput = document.querySelector("input[id='name']");
  const roomInput = document.querySelector("input[id='room']");
  const addressInput = document.querySelector("input[id='address']");
  const bagInput = document.querySelector("input[id='bag']");
  const clothesInput = document.querySelector("textarea[id='clothes']");

  // DEBUG (do not remove until tested)
  console.log("NAME:", nameInput?.value);
  console.log("ROOM:", roomInput?.value);
  console.log("ADDRESS:", addressInput?.value);
  console.log("BAG:", bagInput?.value);
  console.log("CLOTHES:", clothesInput?.value);

  if (!bagInput || !bagInput.value.trim()) {
    alert("Please scan the bag QR first ❌");
    return;
  }

  if (
    !nameInput?.value.trim() ||
    !roomInput?.value.trim() ||
    !addressInput?.value.trim() ||
    !clothesInput?.value.trim()
  ) {
    alert("Please fill all details ❌");
    return;
  }

  const entry = {
    id: Date.now(),
    name: nameInput.value.trim(),
    room: roomInput.value.trim(),
    address: addressInput.value.trim(),
    bag: bagInput.value.trim(),
    clothes: clothesInput.value.trim(),
    status: "Pending",
    pickup: ""
  };

  const data = getData();
  data.push(entry);
  saveData(data);

  alert("Laundry Submitted Successfully 🧺✅");

  nameInput.value = "";
  roomInput.value = "";
  addressInput.value = "";
  clothesInput.value = "";
}


/* STUDENT STATUS */
function showStudentStatus() {
  const data = getData();
  let html = "";

  data.forEach(d => {
    html += `
      <p><b>Bag ${d.bag}</b><br>
      Status: ${d.status}<br>
      Pickup: ${d.pickup || "Not assigned yet"}</p><hr>`;
  });

  document.getElementById("status").innerHTML =
    html || "No uploads yet.";
}

/* MANAGER VIEW */
function loadManagerView() {
  const data = getData();
  document.getElementById("count").innerText = data.length;

  let html = "";
  data.forEach((d, i) => {
    html += `
      <div class="card">
        <b>${d.name}</b> (Bag ${d.bag})<br>
        Clothes: ${d.clothes}<br>
        Status: ${d.status}<br>
        <input type="date" id="date${i}">
        <input type="time" id="time${i}">
        <button onclick="verify(${i})">Verify & Update</button>
      </div>`;
  });

  document.getElementById("requests").innerHTML = html;
}

/* MANAGER VERIFY */
function verify(index) {
  const data = getData();
  const date = document.getElementById("date" + index).value;
  const time = document.getElementById("time" + index).value;

  if (!date || !time) {
    alert("Please select date and time ❌");
    return;
  }

  data[index].status = "Ready for Pickup";
  data[index].pickup = `${date} ${time}`;

  saveData(data);
  alert("Student notified!");
  loadManagerView();
}
