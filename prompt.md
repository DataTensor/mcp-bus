# User Prompts Log

This document records the user prompts and requirements used to construct and deploy the **SG BusWatch Live** application.

---

### Prompt 1
```text
Build me an app with screens that look like this. You can hotlink images from the html
```
**Context & Attachments:**
- Uploaded application screen mockup (`screen.png`) featuring **SG BusWatch Live**:
  - LTA DataMall Active status
  - Nearest stop overview (Stamford Court, Stop `04121`)
  - Live corridor radar with map positioning
  - Real-time arrival telemetry for Service `147` (Arriving, 7m, 16m with capacity & WAB indicators)
  - Other bus services grid (190, 124, 166, 174)
  - Live route progression tracker (Dhoby Ghaut → Clarke Quay)
  - Multi-tab navigation (Nearby Stops, Favorites, Route Search, MRT Interchange, Service Alerts)

---

### Prompt 2
```text
git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/DataTensor/mcp-bus.git
```
**Action Taken:**
- Initialized local Git repository, committed application source code, and pushed to `main` branch on `https://github.com/DataTensor/mcp-bus.git`.

---

### Prompt 3
```text
1) create a /api folder under the project main to store all the apis
2) create a /api/health.js to monitor if the apis are working
3) integrate the LTA bus information api endpoint GET
GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121
Header:  AccountKey: [your key from the email]

# BusStopCode is the only required parameter.
# Add &ServiceNo=7 to ask about one service only.
# Refreshes every 20 seconds. JSON comes back by default.
i will add the LTA_ACCOUNT_KEY in verce environment variables later
```
**Action Taken:**
- Created `/api` directory.
- Created `/api/health.js` monitoring system health and `LTA_ACCOUNT_KEY` status.
- Created `/api/bus-arrival.js` (and `/api/busArrival.js`) proxying `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival`.
- Added support for `BusStopCode` and optional `ServiceNo` query parameters.
- Provided fallback simulation telemetry when `LTA_ACCOUNT_KEY` is not yet configured.
- Connected the frontend via `src/services/ltaApi.ts` and updated `src/App.tsx`.
- Updated `.env.example` with `LTA_ACCOUNT_KEY`.
- Pushed changes to GitHub repository.

---

### Prompt 4
```text
create a prompt.md containing all my prompts located at project main
```
**Action Taken:**
- Created `/prompt.md` recording all user prompts and actions.
