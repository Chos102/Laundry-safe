function getData() {
  return JSON.parse(localStorage.getItem("laundryData")) || [];
}

function saveData(data) {
  localStorage.setItem("laundryData", JSON.stringify(data));
}

/* STUDENT SUBMIT */
function submitLaundry() {
  if (!bag.value) {
    alert("Please scan the bag QR first ❌");
    return;
  }

  if (!name.value || !room.value || !address.value || !clothes.value) {
    alert("Please fill all details ❌");
    return;
  }

  const data = {
    id: Date.now(),
    name: name.value,
    room: room.value,
    address: address.value,
    bag: bag.value,
    clothes: clothes.value,
    status: "Pending"
  };

  let list = JSON.parse(localStorage.getItem("laundryData")) || [];
  list.push(data);
  localStorage.setItem("laundryData", JSON.stringify(list));

  alert("Laundry Submitted Successfully 🧺✅");

  name.value = room.value = address.value = clothes.value = "";
}


  data.push(entry);
  saveData(data);

  alert("Laundry submitted successfully!");
  location.reload();
}

/* STUDENT STATUS */
function showStudentStatus() {
  const data = getData();
  let html = "";

  data.forEach(d => {
    html += `
      <p><b>Bag ${d.bag}</b><br>
      Status: ${d.status}<br>
      Pickup: ${d.pickup}</p><hr>`;
  });

  document.getElementById("status").innerHTML = html || "No uploads yet.";
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
  const date = document.getElementById("date"+index).value;
  const time = document.getElementById("time"+index).value;

  data[index].status = "Ready for Pickup";
  data[index].pickup = `${date} ${time}`;

  saveData(data);
  alert("Student notified!");
  loadManagerView();
}
