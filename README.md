# Interview Scheduler
"Interview Scheduler" is a modern single-page-application (SPA), built in React, which allows students to book interviewers in a week schedule.

*By: Hatem (@AH82)*

![alt text](docs/_title_.webp "Title")

***
## Dynamic preview
------------------
* ### Creating an Appointment
![alt text](docs/1_Create_an_appointment.gif "Creating an appointment")

* ### Deleting an Appointment
![alt text](docs/2_Delete_an_appointment.gif "Deleting an Appointment")

* ### Editing an Appointment
![alt text](docs/3_Edit_an_appointment.gif "Editing an Appointment")

* ### Handling Errors
![alt text](docs/4_Handling_an_error.gif "Handling Errors")

***
## Dependencies
    "axios":          "^0.19.2",
    "classnames":     "^2.2.6",
    "normalize.css":  "^8.0.1",
    "react":          "^16.9.0",
    "react-dom":      "^16.9.0",
    "react-scripts":  "3.0.0"
## DevDependencies
    "@babel/core":                  "^7.4.3",
    "@storybook/addon-actions":     "^5.0.10",
    "@storybook/addon-backgrounds": "^5.0.10",
    "@storybook/addon-links":       "^5.0.10",
    "@storybook/addons":            "^5.0.10",
    "@storybook/react":             "^5.0.10",
    "@testing-library/jest-dom":    "^4.0.0",
    "@testing-library/react":       "^8.0.7",
    "@testing-library/react-hooks": "^3.2.1",
    "babel-loader":                 "^8.0.5",
    "node-sass":                    "^4.11.0",
    "prop-types":                   "^15.7.2",
    "react-test-renderer":          "^16.13.1"

***

## Getting Started 
* This app is configured to work on http://localhost:8000/
* This app interfaces with an API called `scheduler-api` (https://github.com/AH82/scheduler-api) configured on to work on http://localhost:8001/


### Setup

Install dependencies with `npm install` or `npm i`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

***

## User Notes & Tips :
* Follow your instinct!
* ***`Caution!`*** Do not forget to Select an `interviewer` while creating or editing an appointment or the app will fail. While not in the requirements, a validation should have been implemented. but did not meet the deadline.
* *Enjoy!*

***
