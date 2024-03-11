let routeUrl = "https://data.etabus.gov.hk/v1/transport/kmb/route/";
let stopUrl = "https://data.etabus.gov.hk/v1/transport/kmb/stop/";
let routeStopUrl = "https://data.etabus.gov.hk/v1/transport/kmb/route-stop/";

let btn = document.querySelector("button");
let input = document.querySelector("input");
let directCtner = document.querySelector(".directCtner");
let stopCtner = document.querySelector(".stopCtner");
document.addEventListener("DOMContentLoaded", function () {});

btn.addEventListener("click", function () {
  let input = document.querySelector("input").value;
  input = input.toUpperCase();
  directCtner.innerHTML = "";
  stopCtner.innerHTML = "";
  kmbRoute(input);
});

let kmbRoute = async (input) => {
  try {
    const response = await fetch(routeUrl);
    const result = await response.json();
    let info = result.data;

    for (let i = 0; i < info.length; i++) {
      if (info[i].route === input) {
        let directDiv = document.createElement("button");
        directDiv.setAttribute("class", "directBtn");
        directDiv.setAttribute("route", info[i].route);
        directDiv.setAttribute("bound", info[i].bound);
        directDiv.setAttribute("serviceType", info[i].service_type);
        directDiv.textContent = `${info[i].orig_tc}至${info[i].dest_tc}`;
        directCtner.appendChild(directDiv);
      }
    }
    let directBtns = document.querySelectorAll(".directBtn");
    for (let i = 0; i < directBtns.length; i++) {
      directBtns[i].addEventListener("click", function () {
        routeN = directBtns[i].getAttribute("route");
        boundN = directBtns[i].getAttribute("bound");
        serviceType = directBtns[i].getAttribute("serviceType");
        kmbStop(routeN, boundN, serviceType);
      });
    }
    if (directCtner.innerHTML === "") {
      directCtner.textContent = "無此巴士";
    }
  } catch (err) {
    console.log("error");
  }
};

let kmbStop = async (routeN, boundN, serviceType) => {
  try {
    const response = await fetch(routeStopUrl);
    const result = await response.json();
    let info = result.data;
    let stopArr = [];
    for (let i = 0; i < info.length; i++) {
      if (
        info[i].route === routeN &&
        info[i].bound === boundN &&
        info[i].service_type === serviceType
      ) {
        stopArr.push(info[i].stop);
      }
    }
    kmbRouteStop(stopArr);
  } catch (err) {
    console.log("error");
  }
};

let kmbRouteStop = async (stopArr) => {
  try {
    const response = await fetch(stopUrl);
    const result = await response.json();
    let info = result.data;
    stopCtner.innerHTML = "";
    for (let i = 0; i < stopArr.length; i++) {
      for (let j = 0; j < info.length; j++) {
        if (stopArr[i] === info[j].stop) {
          let stopDiv = document.createElement("div");
          stopDiv.setAttribute("class", "stops");
          stopDiv.textContent = `${i + 1}.${info[j].name_tc}`;
          stopCtner.appendChild(stopDiv);
        }
      }
    }
  } catch (err) {
    console.log("error");
  }
};
