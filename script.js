var totalInfected = document.getElementById('totalInfected');
var activeCases = document.getElementById('activeCases');
var activeCasesNew = document.getElementById('activeCasesNew');
var recovered = document.getElementById('recovered');
var suspected = document.getElementById('suspected');
var deaths = document.getElementById('deaths');
var deathsNew = document.getElementById('deathsNew');
var deathRate = document.getElementById('deathRate');
var recoveryRate = document.getElementById('recoveryRate');

var activeCases2 = document.getElementById('activeCases-2');
var recovered2 = document.getElementById('recovered-2');
var deaths2 = document.getElementById('deaths-2');
var activeCasesNew2 = document.getElementById('activeCasesNew2');
var deathsNew2 = document.getElementById('deathsNew2');

var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";
// Today
function getCurrentTime() {
  today = new Date();
  dd = String(today.getDate()).padStart(2, '0');
  mm = month[today.getMonth()];
  yyyy = today.getFullYear();
  hrs = today.getHours();
  if (hrs < 12) {
    ap = 'AM';
  } else {
    ap = 'PM';
  }
  if (hrs > 12) {
    hrs -= 12;
  }

  hrs = String(hrs).padStart(2, '0');
  mins = String(today.getMinutes()).padStart(2, '0');
  secs = String(today.getSeconds()).padStart(2, '0');

  today = dd + ' ' + mm + ', ' + yyyy;
  time = hrs + ':' + mins + ':' + secs + ' ' + ap;

  document.getElementById('nowDate').innerHTML = today;
  document.getElementById('nowTime').innerHTML = time;
}

setInterval(getCurrentTime, 1000);

// NewYear
// var countDownDate = new Date("Apr 13, 2020 20:23:00").getTime();
// var x = setInterval(function () {
//   var now = new Date().getTime();
//   var distance = countDownDate - now;

//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   document.getElementById("demo").innerHTML = "There's only, " + hours + "h " +
//     minutes + "m " + seconds + "s " + "remaining for the new year.";

//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML =
//       "A new year has arrived. We wish you a very Happy Sinhala & Tamil New Year!";
//   }
// }, 1000);
// 


// Firebase data load
// docRef.get().then(function (doc) {
//   totalInfectedno = doc.data().total_infected;
//   recoveredno = doc.data().recovered;
//   suspectedno = doc.data().suspected;
//   deathsno = doc.data().deaths;

//   window.document.title = '(' + totalInfectedno + ') ' + window.document.title ; 

//   totalInfected.innerHTML = totalInfectedno;
//   activeCases.innerHTML = totalInfectedno - (recoveredno + deathsno);
//   recovered.innerHTML = recoveredno;
//   suspected.innerHTML = suspectedno;
//   deaths.innerHTML = deathsno;

//   deathsRateno =  (deathsno/totalInfectedno)*100;
//   recoveryRateno = (recoveredno/totalInfectedno)*100;

//   deathRate.innerHTML = (Math.floor(deathsRateno*100)/100) + '%' ;
//   recoveryRate.innerHTML = (Math.floor(recoveryRateno*100)/100) + '%';

//   activeCases2.innerHTML = totalInfectedno - (recoveredno + deathsno);
//   recovered2.innerHTML = recoveredno;
//   deaths2.innerHTML = deathsno;

//   document.getElementById('loading-news').style.display = "none";
//   document.getElementById('myInput').style.display = "block";
//   document.getElementById('see-all').style.display = "block";

// });

// Hospital Data
const api_url = "https://www.hpb.health.gov.lk/api/get-current-statistical";

tableHospitals = document.getElementById('sl-hospitals-details');
LastUpdated = document.getElementById('API_lastUpdated');

function getData() {
  fetch(api_url)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })

    .then(function (json) {
      hospitals = json.data.hospital_data;

      LastUpdatedAPI = json.data.update_date_time;
      LastUpdated.innerHTML = LastUpdatedAPI;

      // automatic data

      totalInfectedno = json.data.local_total_cases;
      recoveredno = json.data.local_recovered;
      casesnewno = json.data.local_new_cases;
      // suspectedno = doc.data().suspected;
      deathsno = json.data.local_deaths;
      deathsnewno = json.data.local_new_deaths;

      window.document.title = '(' + totalInfectedno + ') ' + window.document.title;

      totalInfected.innerHTML = totalInfectedno;
      activeCases.innerHTML = totalInfectedno - (recoveredno + deathsno);
      activeCasesNew.innerHTML = '+' + casesnewno;
      recovered.innerHTML = recoveredno;
      // suspected.innerHTML = suspectedno;
      deaths.innerHTML = deathsno;
      deathsNew.innerHTML = '+' + deathsnewno;

      deathsRateno = (deathsno / totalInfectedno) * 100;
      recoveryRateno = (recoveredno / totalInfectedno) * 100;

      deathRate.innerHTML = (Math.floor(deathsRateno * 100) / 100) + '%';
      recoveryRate.innerHTML = (Math.floor(recoveryRateno * 100) / 100) + '%';

      activeCases2.innerHTML = totalInfectedno - (recoveredno + deathsno);
      recovered2.innerHTML = recoveredno;
      deaths2.innerHTML = deathsno;
      activeCasesNew2.innerHTML = '+' + casesnewno;
      deathsNew2.innerHTML = '+' + deathsnewno;

      // document.getElementById('loading-news').style.display = "none";
      // document.getElementById('myInput').style.display = "block";
      // document.getElementById('see-all').style.display = "block";

      // 

      hospitals.forEach(function (hospital) {

        let tr = document.createElement('tr');
        let hospitalName = document.createElement('td');
        let SLpatientsnum = document.createElement('td');
        let Foreignpatientsnum = document.createElement('td');
        let Totalpatientsnum = document.createElement('td');

        var hospitalNameAPI = hospital.hospital.name;
        var SLpatientsnumAPI = hospital.treatment_local;
        var ForeignpatientsnumAPI = hospital.treatment_foreign;
        var Totalpatientsnumdata = SLpatientsnumAPI + ForeignpatientsnumAPI;

        hospitalName.setAttribute('class', 'hospital-name');
        hospitalName.textContent = hospitalNameAPI;
        SLpatientsnum.setAttribute('class', 'sl-patients');
        SLpatientsnum.textContent = SLpatientsnumAPI;
        Foreignpatientsnum.setAttribute('class', 'foreign-patients');
        Foreignpatientsnum.textContent = ForeignpatientsnumAPI;
        Totalpatientsnum.setAttribute('class', 'total-patients');
        Totalpatientsnum.textContent = Totalpatientsnumdata;

        tr.appendChild(hospitalName);
        tr.appendChild(SLpatientsnum);
        tr.appendChild(Foreignpatientsnum);
        tr.appendChild(Totalpatientsnum);

        tableHospitals.appendChild(tr);
      });
    })

}

getData();


// var news = document.getElementById("news");

// function renderNews(doc) {
//   let carddiv = document.createElement('div');
//   let img = document.createElement('img');
//   let bodydiv = document.createElement('div');
//   let hidediv = document.createElement('div');
//   let title = document.createElement('h2');
//   let contentdiv = document.createElement('div');
//   let description = document.createElement('h5');
//   let channel = document.createElement('p');
//   let button = document.createElement('a');
//   let time = document.createElement('p');
//   let small = document.createElement('small');
//   let i = document.createElement('i');
//   let b = document.createElement('b');

//   var imgDb = doc.img;
//   var captionDb = doc.caption;
//   if (doc.description) {
//     var descriptionDb = doc.description;
//   }
//   var channelDb = doc.channel;
//   var linkDb = doc.link;

//   var dateDb = new Date(doc.time.seconds * 1000);
//   var hrsDb = dateDb.getHours();
//   if (hrsDb == 00) {
//     hrsDb = 12;
//   }
//   if (hrsDb > 12) {
//     hrsDb -= 12;
//   }
//   if (hrsDb < 10) {
//     hrsDb = '0' + hrsDb;
//   }
//   var minsDb = dateDb.getMinutes();
//   if (minsDb < 10) {
//     minsDb = '0' + minsDb;
//   }
//   var hrsUTC = dateDb.getHours();
//   if (hrsUTC < 12) {
//     tmformat = 'AM';
//   } else {
//     tmformat = 'PM';
//   }

//   var timeDb = dateDb.getDate() + ' ' + month[dateDb.getMonth()] + ', ' + dateDb.getFullYear() + ' | ' + hrsDb + ':' + minsDb + ' ' + tmformat;

//   if (channelDb == 'News1st') {
//     carddiv.setAttribute('class', 'card text-white newsfirst');
//   } else if (channelDb == 'AdaDerana') {
//     carddiv.setAttribute('class', 'card text-white adaderana');
//   } else if (channelDb == 'BBC') {
//     carddiv.setAttribute('class', 'card text-white bbc');
//   } else {
//     carddiv.setAttribute('class', 'card text-white other');
//   }

//   if (doc.img) {
//     img.setAttribute('class', 'card-img-top news-image');
//     img.setAttribute('src', imgDb);
//     img.setAttribute('alt', 'img');

//     carddiv.appendChild(img);
//   }

//   ///

//   bodydiv.setAttribute('class', 'card-body news-body');

//   title.setAttribute('class', 'card-title news-title');
//   b.textContent = captionDb;
//   title.appendChild(b);

//   hidediv.setAttribute('class', 'hide-card');
//   hidediv.appendChild(title);

//   if (doc.description) {
//     description.setAttribute('class', 'card-text news-description');
//     description.textContent = descriptionDb;
//   }

//   channel.setAttribute('class', 'card-text');
//   i.textContent = 'Source - ' + channelDb;
//   channel.appendChild(i);

//   if (channelDb == 'News1st') {
//     button.setAttribute('class', 'btn btn-sm btn-warning');
//   } else if (channelDb == 'AdaDerana') {
//     button.setAttribute('class', 'btn btn-sm btn-danger');
//   } else if (channelDb == 'BBC') {
//     button.setAttribute('class', 'btn btn-sm btn-dark');
//   } else {
//     button.setAttribute('class', 'btn btn-sm btn-primary');
//   }
//   button.setAttribute('href', linkDb);
//   button.setAttribute('target', '_blank');
//   button.textContent = 'Visit...';

//   time.setAttribute('class', 'card-text news-time');
//   small.textContent = timeDb;
//   time.appendChild(small);

//   contentdiv.setAttribute('class', 'content-card');
//   if (doc.description) {
//     contentdiv.appendChild(description);
//   }
//   contentdiv.appendChild(channel);
//   contentdiv.appendChild(button);
//   contentdiv.appendChild(time);

//   bodydiv.appendChild(hidediv);
//   bodydiv.appendChild(contentdiv);
//   ///

//   carddiv.appendChild(bodydiv);
//   ///

//   news.appendChild(carddiv);

// };

// newsDb = db.collection("news");

// newsDb.orderBy("time", "desc").limit(15).get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//       renderNews(doc.data());
//     });
//     // var coll = document.getElementsByClassName("hide-card");
//     // var i;

//     // for (i = 0; i < coll.length; i++) {
//     //   coll[i].addEventListener("click", function () {
//     //     this.classList.toggle("active");
//     //     var content = this.nextElementSibling;
//     //     if (content.style.maxHeight) {
//     //       content.style.maxHeight = null;
//     //     } else {
//     //       content.style.maxHeight = content.scrollHeight + "px";
//     //     }
//     //   });
//     // }
//   })
//   .catch(function (error) {
//     console.log("Error getting documents: ", error);
//   });

//search function
function searchFunction() {
  var input, filter, news, card, a, i, txtValue, searchNone, noNews;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  news = document.getElementById("news");
  card = news.getElementsByClassName("card");
  noNews = document.getElementById("noNews");
  searchNone = true;
  noNews.style.display = "none";
  for (i = 0; i < card.length; i++) {
    a = card[i].getElementsByTagName("h2")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
      searchNone = false;
    } else {
      card[i].style.display = "none";
    }
  }
  if (searchNone == true) {
    noNews.style.display = "block";
  }
}

//hide cards | hide animation

var tableDetails, statusAnimation;
tableDetails = document.getElementById('table-sl-details');
statusAnimation = document.getElementById('status-animation');

function hidestatuscard() {
  tableDetails.style.display = "block";
  statusAnimation.style.display = "none";
}

function hidetabledetails() {
  tableDetails.style.display = "none";
  statusAnimation.style.display = "block";
}

function detectBrowser() {
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
    // alert('Opera');
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    // if (window.confirm('We found that you have a browser that does not support our website! You may encounter several problems when data appears. If you click OK You can try our minified version, or you can cancel this and visit the original site.')) {
    //   window.location.href = '/minified.html';
    // };
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    // alert('Safari');
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    // alert('Firefox');
  } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
  {
    tableDetails.style.display = "block";
    tableDetails.style.opacity = "1";
    statusAnimation.style.display = "none";
    statusAnimation.style.opacity = "0";
  } else {
    // alert('unknown');
  }
}

// https://raw.githubusercontent.com/arimacdev/covid19-srilankan-data/master/Daily/covid_lk.csv
const lk_historical_data_csv = 'https://raw.githubusercontent.com/microsoft/Bing-COVID-19-Data/master/data/Bing-COVID19-Data.csv';

// getHistoryData();

async function getHistoryData() {
  const xAxisLabels_lk = [];
  const CasesData = [];
  const DeathsData = [];
  const RecoveriesData = [];

  // const response_his = await fetch('./csv/test.csv');
  const response_lk = await fetch(lk_historical_data_csv);

  const data_lk = await response_lk.text();
  // console.log(data_lk);

  const rows = data_lk.split('\n');
  const rowsLength = rows.length;
  // console.log(rows);
  const headers = rows[0];
  const topics = headers.split(',');
  var rowdata = [];

  headersLength = topics.length;
    // for (a = 0; a < headersLength; a++) {
    //   console.log(topics[a]);
    // }

  for (a = 0; a < rowsLength; a++) {
    rowdata = rows[a].split(',');
    if (rowdata[12] == "Sri Lanka") {
      console.log(true);
      xAxisLabels_lk.push(rowdata[1]);
      CasesData.push(rowdata[2]);
      DeathsData.push(rowdata[4]);
      RecoveriesData.push(rowdata[6]);
    }
  }


  return {
    xAxisLabels_lk,
    CasesData,
    DeathsData,
    RecoveriesData
  };
}

totalCasesCharts();

async function totalCasesCharts() {
  const data = await getHistoryData();
  const ctx = document.getElementById('dataChart');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.xAxisLabels_lk,
      datasets: [{
          label: 'Total Deaths in Sri Lanka',
          data: data.DeathsData,
          borderColor: '#dc3545',
          backgroundColor: '#dc3545aa',
          hoverBackgroundColor: '#fff',
          borderWidth: 3
        },
        {
          label: 'Total Recoveries in Sri Lanka',
          data: data.RecoveriesData,
          borderColor: '#28a745',
          backgroundColor: '#28a745aa',
          hoverBackgroundColor: '#fff',
          borderWidth: 3
        },
        {
          label: 'Total Cases in Sri Lanka',
          data: data.CasesData,
          borderColor: '#007bff',
          backgroundColor: '#007bffaa',
          hoverBackgroundColor: '#fff',
          borderWidth: 3
        },
      ],
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "rgb(190, 190, 190)",
            maxRotation: 90,
            minRotation: 90
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: false,
            fontColor: "rgb(190, 190, 190)",
          }
        }],
        scaleLabel: [{
          scaleTitle: {
            fontColor: '#fff',
          }
        }]
      },
      legend: {
        position: 'left',
        labels: {
          fontColor: '#989898',
        },
      }
    }
  });
}

function changetheme() {
  var element = document.body
  element.classList.toggle("dark-theme");
}
