import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let reservationDetails = config.backendEndpoint + "reservations";
    let data = await fetch(reservationDetails);
    let res = await data.json();
    console.log(res);
    return res;
  } catch {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  let noReservationBanner = document.getElementById("no-reservation-banner");
  let reservationTable = document.getElementById("reservation-table-parent");
  if (reservations.length) {
    noReservationBanner.style.display = "none";
    reservationTable.style.display = "block";
  } else {
    noReservationBanner.style.display = "block";
    reservationTable.style.display = "none";
  }

  let table = document.getElementById("reservation-table");
  reservations.forEach((ele) => {
    console.log(ele);
    // Create a new row at the end of the table
    const newRow = table.insertRow(-1);
    //let adventureDetail = "frontend/pages/adventures/detail/?adventure=" + reservation.adventure;
    // Add the reservation details to the new row
    newRow.innerHTML = `
      <td><strong>${ele.id}</strong></td>
      <td>${ele.name}</td>
      <td>${ele.adventureName}</td>
      <td>${ele.person}</td>
      <td>${new Date(ele.date).toLocaleDateString("en-IN")}</td>
      <td>${ele.price}</td>
      <td>${new Date(ele.time).toLocaleString("en-IN", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).replace(" at",",")}</td>
      <td id=${ele.id}><a href="/frontend/pages/adventures/detail/?adventure=${
      ele.adventure
    }" class="reservation-visit-button" id="${
      ele.adventure
    }">Visit Adventure</a></td>    
      `;
  });
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
