function fetchXML(url) {
    return fetch(url).then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "application/xml"));
}

function searchMeetings() {
    const searchDate = document.getElementById("search-date").value;
    fetchXML('data.xml').then(xml => {
        const meetings = xml.getElementsByTagName("Meeting");

        let resultsHtml = `<table border="2" width="100%">
                            <tr bgcolor="LIGHTBLUE">
                                <th>Date</th>
                                <th>Time</th>
                                <th>Person</th>
                                <th>Place</th>
                            </tr>`;
        let found = false;

        for (let meeting of meetings) {
            const date = meeting.getElementsByTagName("Date")[0].textContent;
            if (date === searchDate) {
                found = true;
                const time = meeting.getElementsByTagName("Time")[0].textContent;
                const person = meeting.getElementsByTagName("Person")[0].textContent;
                const place = meeting.getElementsByTagName("Place")[0].textContent;

                resultsHtml += `<tr bgcolor="LIGHTYELLOW">
                                  <td>${date}</td>
                                  <td>${time}</td>
                                  <td>${person}</td>
                                  <td>${place}</td>
                                </tr>`;
            }
        }
        resultsHtml += `</table>`;

        if (!found) {
            resultsHtml = '<p>No meetings found for the selected date.</p>';
        }

        document.getElementById("results").innerHTML = resultsHtml;
    });
}