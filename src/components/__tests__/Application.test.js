import React from "react";
import Application from "components/Application";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  getByAltText, 
  getByPlaceholderText, 
  getAllByTestId,
  queryByText,
  prettyDOM
} from "@testing-library/react";


afterEach(cleanup);


describe("Application", () => {
  // @AH82: While Compass ask to delete this test, I kept it for learning purposes. 
  // it("renders without crashing", () => {
  //   render(<Application />);
  // });


  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  
  it.only ("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { debug, container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));

    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    // OR // waitForElementToBeRemoved
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
      );
      
      // debug();
      // console.log(prettyDOM(day));

      // This does not apply to my code! code only reads it from the calculated back-end!
      expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    });


});

// act(() => {
//   /* fire events that update state */
// });
// /* assert on the output */